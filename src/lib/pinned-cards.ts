import { supabase } from "@/lib/supabase";

export interface PinnedCard {
  id: string;
  user_id: string;
  card_id: string;
  note: string | null;
  sort_order: number;
  pinned_at: string;
}

export async function getPinnedCards(userId: string): Promise<PinnedCard[]> {
  const { data, error } = await supabase
    .from("bloomscroll_pinned_cards")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching pinned cards:", error);
    return [];
  }
  return data || [];
}

export async function pinCard(userId: string, cardId: string, note?: string): Promise<void> {
  // Get current count for sort_order
  const { count } = await supabase
    .from("bloomscroll_pinned_cards")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  const { error } = await supabase
    .from("bloomscroll_pinned_cards")
    .upsert(
      {
        user_id: userId,
        card_id: cardId,
        note: note || null,
        sort_order: count || 0,
      },
      { onConflict: "user_id,card_id" }
    );

  if (error) console.error("Error pinning card:", error);
}

export async function unpinCard(userId: string, cardId: string): Promise<void> {
  const { error } = await supabase
    .from("bloomscroll_pinned_cards")
    .delete()
    .eq("user_id", userId)
    .eq("card_id", cardId);

  if (error) console.error("Error unpinning card:", error);
}

export async function updatePinNote(userId: string, cardId: string, note: string | null): Promise<void> {
  const { error } = await supabase
    .from("bloomscroll_pinned_cards")
    .update({ note })
    .eq("user_id", userId)
    .eq("card_id", cardId);

  if (error) console.error("Error updating pin note:", error);
}

export async function reorderPins(userId: string, orderedCardIds: string[]): Promise<void> {
  const updates = orderedCardIds.map((cardId, index) =>
    supabase
      .from("bloomscroll_pinned_cards")
      .update({ sort_order: index })
      .eq("user_id", userId)
      .eq("card_id", cardId)
  );

  await Promise.all(updates);
}

export async function getPinnedCardCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from("bloomscroll_pinned_cards")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) return 0;
  return count || 0;
}

export async function getProfileByUsername(username: string) {
  // Try fc_username first
  const { data: fcProfile } = await supabase
    .from("bloomscroll_profiles")
    .select("*")
    .eq("fc_username", username)
    .single();

  if (fcProfile) return fcProfile;

  // Fallback: match email prefix
  const { data: profiles } = await supabase
    .from("bloomscroll_profiles")
    .select("*")
    .like("email", `${username}@%`);

  return profiles?.[0] || null;
}
