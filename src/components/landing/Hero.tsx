import Link from "next/link";

const GRADIENT = "linear-gradient(180deg, #ECF0F8 0%, #F1F3F9 40%, #F5F5FA 100%)";
const FEATHER = "linear-gradient(180deg, #F5F5FA 0%, rgba(245,245,250,0) 100%)";

const AVATARS = ["B", "Y", "M"];

export function Hero({ ctaHref, isAuthenticated, displayName }: { ctaHref: string; isAuthenticated?: boolean; displayName?: string | null }) {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden"
      style={{ background: GRADIENT }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/landing/hero-bg.svg"
        alt="Person sitting on hilltop overlooking a field of flowers"
        className="absolute bottom-0 left-0 w-full h-[75%] object-cover object-top"
      />
      <div
        className="absolute left-0 w-full h-48 pointer-events-none"
        style={{ top: "25%", background: FEATHER }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-20 md:pt-28">
        <h1 className="font-instrument-serif text-3xl md:text-7xl lg:text-8xl text-slate-900 leading-[1.05] tracking-tight">
          Turn Scrolling into <span className="italic text-brand">Growing</span>
        </h1>
        <p className="mt-4 text-slate-700 text-xs md:text-base max-w-xl leading-relaxed">
          Replace mindless doomscrolling with 60-second wisdom cards from Seneca,
          Marcus Aurelius, and history&apos;s greatest minds. Designed for your
          peace of mind.
        </p>
      </div>

      <div className="absolute bottom-[15%] md:bottom-[18%] left-0 right-0 z-10 flex flex-col items-center gap-4 px-6">
        <Link
          href={ctaHref}
          className="flex items-center justify-center rounded-full h-12 md:h-14 px-10 bg-white/30 backdrop-blur-md border border-white/40 text-white text-base md:text-lg font-medium shadow-lg hover:bg-white/40 transition-all"
        >
          {isAuthenticated ? (displayName ? `Continue Reading, ${displayName}` : "Continue Reading") : "Start for Free"}
        </Link>
        {!isAuthenticated && (
          <div className="flex flex-col items-center gap-2">
            <div className="flex -space-x-2">
              {AVATARS.map((letter) => (
                <div
                  key={letter}
                  className="size-7 rounded-full border-2 border-white/60 bg-white/30 backdrop-blur-sm flex items-center justify-center text-[10px] font-medium text-white"
                >
                  {letter}
                </div>
              ))}
            </div>
            <span className="text-sm text-white/90 font-medium">
              Joined by 100+ mindful readers
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
