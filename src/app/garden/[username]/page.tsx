import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getProfileByUsername, getPinnedCards } from "@/lib/pinned-cards";
import { getAnyCardById } from "@/lib/card-resolver";
import { UserProfile } from "@/lib/supabase";
import GardenClient from "@/components/app/GardenClient";

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="font-instrument-serif italic text-lg sm:text-xl text-slate-900">BloomScroll</span>
          </Link>
          <Link
            href="/app"
            className="px-4 py-2 rounded-full bg-brand text-white text-sm font-medium hover:bg-brand-dark transition-colors"
          >
            Open App
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* Profile hero */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-brand/20 overflow-hidden bg-brand-light flex items-center justify-center">
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl text-brand font-medium">
                {displayName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-medium font-instrument-serif text-slate-900 mb-1">
            {displayName}&apos;s Garden
          </h1>
          <p className="text-slate-500 text-sm mb-4">
            {pins.length} quote{pins.length !== 1 ? "s" : ""} planted
          </p>
          <GardenClient targetUserId={profile.id} />
        </div>

        {/* Masonry grid */}
        {pins.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🌱</div>
            <p className="text-slate-400">This garden is still being planted...</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 gap-3">
            {pins.map((pin) => {
              const card = getAnyCardById(pin.card_id);
              if (!card) return null;
              return (
                <div
                  key={pin.id}
                  className="break-inside-avoid mb-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Topics */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {card.topic.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full bg-brand-light text-brand text-[10px] font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-sm text-slate-900 leading-relaxed mb-3 italic font-instrument-serif">
                    &ldquo;{card.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <p className="text-xs font-medium text-brand">
                    {card.author}
                  </p>
                  <p className="text-[11px] text-slate-400 italic">{card.book}</p>

                  {/* Note */}
                  {pin.note && (
                    <>
                      <div className="w-full h-px bg-slate-200 my-3" />
                      <p className="text-xs text-slate-500 leading-relaxed">
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
          <p className="text-slate-400 text-sm mb-4">
            Discover more wisdom on Bloomscroll
          </p>
          <Link
            href="/app"
            className="inline-block px-6 py-3 rounded-full bg-brand text-white font-medium hover:bg-brand-dark transition-colors"
          >
            Start Your Garden
          </Link>
        </div>
      </main>
    </div>
  );
}
