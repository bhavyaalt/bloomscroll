const STATS = [
  {
    value: "1000+",
    label: "Wisdom Cards",
    desc: "Curated insights from the world\u2019s greatest books, thinkers, and philosophies.",
  },
  {
    value: "4.8",
    label: "Reader Ratings",
    desc: "Loved by readers who replaced mindless scrolling with meaningful growth.",
  },
  {
    value: "50+",
    label: "Curated Books",
    desc: "From Seneca to Sapiens, hand-picked books distilled into bite-sized wisdom.",
  },
];

export function SocialProof() {
  return (
    <section className="px-6 md:px-20 lg:px-40 py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2">
            <span className="font-instrument-serif text-3xl md:text-6xl text-brand">
              {stat.value}
            </span>
            <span className="text-base font-medium text-slate-900">
              {stat.label}
            </span>
            <p className="text-sm text-slate-500 max-w-[240px]">{stat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
