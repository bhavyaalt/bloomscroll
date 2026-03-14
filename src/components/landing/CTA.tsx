import Link from "next/link";

export function CTA({ ctaHref, isAuthenticated, displayName }: { ctaHref: string; isAuthenticated?: boolean; displayName?: string | null }) {
  return (
    <section className="relative w-full pt-16 md:pt-20 pb-40 md:pb-56 overflow-hidden">
      <div
        className="absolute left-0 right-0 bottom-0"
        style={{ top: "20%" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/landing/cta-bg.svg"
          alt="Serene landscape"
          className="w-full h-full object-cover object-top"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-white via-white/30 to-transparent"
          style={{ height: "40%" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-6">
        <h2 className="font-instrument-serif text-xl sm:text-2xl md:text-5xl lg:text-6xl font-medium text-black leading-tight md:whitespace-nowrap">
          Still doomscrolling?{" "}
          <span className="font-instrument-serif italic text-brand font-normal">
            Try bloomscrolling.
          </span>
        </h2>
        <p className="text-slate-700 text-xs md:text-lg max-w-xl">
          Join over 10,000 readers who replaced doomscrolling with wisdom and
          reclaimed their time.
        </p>
        <Link
          href={ctaHref}
          className="flex items-center justify-center rounded-full h-11 md:h-14 px-6 sm:px-8 md:px-10 bg-white/30 backdrop-blur-md border border-white/40 text-white text-sm sm:text-base md:text-lg font-medium shadow-lg hover:bg-white/40 transition-all mt-2"
        >
          {isAuthenticated ? (displayName ? `Keep Reading, ${displayName}` : "Keep Reading") : "Start Now !"}
        </Link>
      </div>
    </section>
  );
}
