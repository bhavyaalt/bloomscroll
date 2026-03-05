const TAG_ROWS = [
  { left: "Growth & insight", right: "Curated, finite wisdom" },
  { left: "Calm, centered mind", right: "5 minutes of investment" },
];

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-white/80 backdrop-blur-sm text-slate-700 text-xs md:text-sm px-4 md:px-5 py-1.5 md:py-2 rounded-full shadow-sm whitespace-nowrap">
      {children}
    </span>
  );
}

export function BeforeAfter() {
  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="absolute left-0 right-0 bottom-0"
        style={{ top: "25%" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/landing/center-chair.svg"
          alt="Serene landscape with flowers"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/20 to-transparent" />
      </div>

      <div className="relative z-10 px-6 md:px-16 lg:px-32 pt-16 md:pt-20 pb-48 md:pb-64">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8 mb-12 md:mb-16">
          <p className="font-instrument-serif italic text-xl md:text-4xl lg:text-5xl text-brand leading-snug max-w-md">
            Everyday is a chance to be a better version of you....
          </p>
          <p className="font-instrument-serif text-xl md:text-4xl lg:text-5xl text-brand leading-snug max-w-md text-right self-end md:self-start">
            Maybe that can start with a{" "}
            <span className="italic">better scroll ?</span>
          </p>
        </div>

        <div className="relative flex flex-col items-center gap-4 md:gap-8">
          <Tag>Escape from doomscrolling</Tag>

          {TAG_ROWS.map((row) => (
            <div
              key={row.left}
              className="flex justify-between w-full max-w-md md:max-w-2xl"
            >
              <Tag>{row.left}</Tag>
              <Tag>{row.right}</Tag>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
