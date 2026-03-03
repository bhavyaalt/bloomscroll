import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getProfileByUsername, getPinnedCards } from "@/lib/pinned-cards";
import { getCardById } from "@/lib/content-library";
import { UserProfile } from "@/lib/supabase";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const profile = await getProfileByUsername(username) as UserProfile | null;
  if (!profile) return { title: "Garden Not Found" };

  const pins = await getPinnedCards(profile.id);
  const displayName = profile.fc_display_name || profile.fc_username || profile.email?.split("@")[0] || "A Reader";

  return {
    title: `${displayName}'s Garden — Bloomscroll`,
    description: `${pins.length} quotes planted. Explore ${displayName}'s curated wisdom.`,
    openGraph: {
      title: `${displayName}'s Garden — Bloomscroll`,
      description: `${pins.length} quotes planted. Explore ${displayName}'s curated wisdom.`,
      images: [`/api/og/garden/${username}`],
    },
    twitter: {
      card: "summary_large_image",
      title: `${displayName}'s Garden — Bloomscroll`,
      description: `${pins.length} quotes planted.`,
      images: [`/api/og/garden/${username}`],
    },
  };
}

export default async function GardenPage({ params }: PageProps) {
  const { username } = await params;
  const profile = await getProfileByUsername(username) as UserProfile | null;

  if (!profile) notFound();

  const pins = await getPinnedCards(profile.id);
  const displayName = profile.fc_display_name || profile.fc_username || profile.email?.split("@")[0] || "A Reader";
  const avatarUrl = profile.fc_pfp_url;

  return (
    <div className="min-h-screen bg-[#FBF5F0]" style={{ fontFamily: "'Lexend', system-ui, sans-serif" }}>
      {/* Header */}
      <header className="border-b border-[#007A5E]/10 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg className="size-5 text-[#007A5E]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9ZM5.6 10.25c0 1.64 1.33 2.97 2.97 2.97h.86c1.97 0 3.56-1.6 3.56-3.57v-5.4C12.99 2.56 11.43 1 9.43 1c-2 0-3.56 1.56-3.56 3.56v5.4c0 .1 0 .2-.27.29ZM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9Z" />
            </svg>
            <span className="text-lg font-bold text-[#007A5E]" style={{ fontFamily: "Georgia, serif" }}>
              Bloomscroll
            </span>
          </Link>
          <Link
            href="/app"
            className="px-4 py-2 rounded-full bg-[#007A5E] text-white text-sm font-medium hover:bg-[#004a39] transition-colors"
          >
            Open App
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* Profile hero */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-[#007A5E]/20 overflow-hidden bg-[#007A5E]/10 flex items-center justify-center">
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl text-[#007A5E] font-bold">
                {displayName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <h1
            className="text-3xl font-bold text-[#004a39] mb-1"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {displayName}&apos;s Garden
          </h1>
          <p className="text-[#007A5E]/60 text-sm">
            {pins.length} quote{pins.length !== 1 ? "s" : ""} planted
          </p>
        </div>

        {/* Masonry grid */}
        {pins.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🌱</div>
            <p className="text-[#007A5E]/50">This garden is still being planted...</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 gap-3">
            {pins.map((pin) => {
              const card = getCardById(pin.card_id);
              if (!card) return null;
              return (
                <div
                  key={pin.id}
                  className="break-inside-avoid mb-3 bg-white border border-[#007A5E]/10 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Topics */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {card.topic.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full bg-[#007A5E]/10 text-[#007A5E] text-[10px] font-bold uppercase tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote
                    className="text-sm text-[#004a39] leading-relaxed mb-3 italic"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    &ldquo;{card.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <p className="text-xs font-bold text-[#007A5E] uppercase tracking-wider">
                    {card.author}
                  </p>
                  <p className="text-[11px] text-[#007A5E]/50 italic">{card.book}</p>

                  {/* Note */}
                  {pin.note && (
                    <>
                      <div className="w-full h-px bg-[#007A5E]/10 my-3" />
                      <p className="text-xs text-[#004a39]/70 leading-relaxed">
                        {pin.note}
                      </p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Footer CTA */}
        <div className="text-center mt-16 mb-8">
          <p className="text-[#007A5E]/40 text-sm mb-4">
            Discover more wisdom on Bloomscroll
          </p>
          <Link
            href="/app"
            className="inline-block px-6 py-3 rounded-full bg-[#007A5E] text-white font-medium hover:bg-[#004a39] transition-colors"
          >
            Start Your Garden
          </Link>
        </div>
      </main>
    </div>
  );
}
