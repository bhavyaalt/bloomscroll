import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCardById } from "@/lib/content-library";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ref?: string }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { ref } = await searchParams;
  const card = getCardById(id);
  if (!card) return { title: "Card not found — Scrollbliss" };

  const title = `"${card.quote.slice(0, 60)}${card.quote.length > 60 ? "..." : ""}" — ${card.author}`;
  const description = `${card.insight} | From "${card.book}" by ${card.author}`;
  const url = `https://scrollbliss.com/card/${id}${ref ? `?ref=${ref}` : ""}`;
  const ogImageUrl = `https://scrollbliss.com/api/og/${id}${ref ? `?ref=${ref}` : ""}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Scrollbliss",
      type: "article",
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function CardPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { ref } = await searchParams;
  const card = getCardById(id);

  if (!card) notFound();

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col">
      {/* Header */}
      <header className="px-4 h-14 flex items-center justify-between max-w-2xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🌱</span>
          <span className="font-impact text-lg uppercase tracking-tight text-[#007A5E]">
            Scrollbliss
          </span>
        </Link>
      </header>

      {/* Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          <div className="bg-gradient-to-b from-[#EACCD4] to-[#e0bfc8] text-[#007A5E] rounded-2xl overflow-hidden shadow-2xl p-8 sm:p-10">
            {/* Topics */}
            <div className="flex flex-wrap gap-2 mb-6">
              {card.topic.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-[#007A5E]/10 text-xs font-bold uppercase tracking-wide"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl sm:text-2xl font-serif leading-relaxed mb-6">
              <span className="text-[#007A5E]/30 text-3xl">&ldquo;</span>
              {card.quote}
              <span className="text-[#007A5E]/30 text-3xl">&rdquo;</span>
            </blockquote>

            {/* Author */}
            <div className="mb-6">
              <p className="font-bold text-xl tracking-wide">{card.author}</p>
              <p className="text-[#007A5E]/70 italic">{card.book}</p>
            </div>

            {/* Insight */}
            <p className="text-sm text-[#007A5E]/70 leading-relaxed mb-6">
              {card.insight}
            </p>

            {/* Attribution */}
            {ref && (
              <p className="text-xs text-[#007A5E]/50 mb-4">
                Shared by @{ref}
              </p>
            )}
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link
              href="/app"
              className="inline-block px-8 py-3 rounded-full bg-[#007A5E] text-white font-bold text-lg hover:bg-[#005a46] transition-all shadow-lg"
            >
              See more on Scrollbliss
            </Link>
            <p className="text-white/40 text-sm mt-3">
              Replace mindless scrolling with meaningful wisdom
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
