import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAnyCardById } from "@/lib/card-resolver";
import Logo from "@/components/Logo";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ref?: string }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { ref } = await searchParams;
  const card = getAnyCardById(id);
  if (!card) return { title: "Card not found — BloomScroll" };

  const title = `"${card.quote.slice(0, 60)}${card.quote.length > 60 ? "..." : ""}" — ${card.author}`;
  const description = `${card.insight} | From "${card.book}" by ${card.author}`;
  const url = `https://bloomscroll.club/card/${id}${ref ? `?ref=${ref}` : ""}`;
  const ogImageUrl = `https://bloomscroll.club/api/og/${id}${ref ? `?ref=${ref}` : ""}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "BloomScroll",
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
  const card = getAnyCardById(id);

  if (!card) notFound();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Header */}
      <header className="px-4 h-14 flex items-center justify-between max-w-2xl mx-auto w-full">
        <Link href="/" className="flex items-center">
          <Logo size="md" />
        </Link>
      </header>

      {/* Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          <div className="bg-white border border-slate-200 text-slate-900 rounded-2xl overflow-hidden shadow-2xl p-5 sm:p-8 md:p-10">
            {/* Topics */}
            <div className="flex flex-wrap gap-2 mb-6">
              {card.topic.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-brand-light text-brand text-xs font-medium"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-lg sm:text-xl md:text-2xl font-instrument-serif leading-relaxed mb-6">
              <span className="text-brand/30 text-3xl">&ldquo;</span>
              {card.quote}
              <span className="text-brand/30 text-3xl">&rdquo;</span>
            </blockquote>

            {/* Author */}
            <div className="mb-6">
              <p className="font-medium text-lg sm:text-xl font-instrument-serif">{card.author}</p>
              <p className="text-slate-500 italic">{card.book}</p>
            </div>

            {/* Insight */}
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              {card.insight}
            </p>

            {/* Attribution */}
            {ref && (
              <p className="text-xs text-slate-400 mb-4">
                Shared by @{ref}
              </p>
            )}
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link
              href="/app"
              className="inline-block px-8 py-3 rounded-full bg-brand text-white font-medium text-lg hover:bg-brand-dark transition-all shadow-lg"
            >
              See more on BloomScroll
            </Link>
            <p className="text-slate-400 text-sm mt-3">
              Replace mindless scrolling with meaningful wisdom
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
