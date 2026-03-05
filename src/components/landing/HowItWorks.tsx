const STEPS = [
  {
    title: "Choose Your Topics",
    image: "/landing/step-topics.svg",
    desc: "We've distilled the world's best books into a beautiful, bite-sized experience.",
  },
  {
    title: "Swipe Through Wisdom",
    image: "/landing/step-swipe.svg",
    desc: "Each card is a 60-second insight from a great book. Swipe to explore, save what inspires you.",
  },
  {
    title: "Track Your Growth",
    image: "/landing/step-track.svg",
    desc: "Build streaks, take quizzes, and watch your wisdom library grow. Real progress, one card at a time.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="px-6 md:px-20 lg:px-40 py-16 md:py-20 bg-white"
    >
      <div className="flex flex-col gap-12">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <h2 className="font-instrument-serif text-2xl md:text-4xl font-medium tracking-tight text-slate-900">
            Three simple steps to{" "}
            <span className="font-instrument-serif italic text-brand font-normal">
              mindful reading
            </span>
          </h2>
          <p className="text-slate-500 text-xs md:text-base">
            We&apos;ve distilled the world&apos;s best books into a beautiful,
            bite-sized experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center text-center gap-6 rounded-2xl p-8"
              style={{ backgroundColor: "#FFF5FE" }}
            >
              <h3 className="font-instrument-serif text-lg md:text-2xl font-medium text-black">
                {step.title}
              </h3>
              <div className="w-full flex justify-center ml-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={step.image}
                  alt={step.title}
                  className="h-80 object-contain"
                />
              </div>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[280px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
