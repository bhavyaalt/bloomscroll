import Link from "next/link";
import { Navigation } from "@/components/landing/Navigation";
import { FAQ } from "@/components/landing/FAQ";
import { EmailCapture } from "@/components/landing/EmailCapture";

/* ─── Hero ─── */
const Hero = () => (
  <section className="px-6 md:px-20 lg:px-40 py-16 md:py-24">
    <div className="flex flex-col gap-10 lg:flex-row items-center lg:gap-16">
      {/* Left copy */}
      <div className="flex flex-col gap-8 lg:w-1/2">
        <div className="flex flex-col gap-4">
          <span className="text-primary font-bold tracking-widest text-xs uppercase bg-primary/10 w-fit px-3 py-1 rounded-full">
            Daily Curated Wisdom
          </span>
          <h1 className="text-slate-900 text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
            Turn Scrolling into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">
              Growing
            </span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl font-normal leading-relaxed max-w-[540px]">
            Replace mindless doomscrolling with 60-second wisdom cards from Seneca, Marcus Aurelius, and history&apos;s greatest minds. Designed for your peace of mind.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/app"
            className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary text-bgdark text-lg font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            Start Reading Free
          </Link>
          <Link
            href="#how-it-works"
            className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 border-2 border-sage text-slate-700 text-lg font-semibold hover:bg-sage/20 transition-all"
          >
            See How It Works
          </Link>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <div className="flex -space-x-2">
            <div className="size-8 rounded-full border-2 border-bglight bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">S</div>
            <div className="size-8 rounded-full border-2 border-bglight bg-lavender flex items-center justify-center text-[10px] font-bold text-slate-500">J</div>
            <div className="size-8 rounded-full border-2 border-bglight bg-sage flex items-center justify-center text-[10px] font-bold text-slate-600">P</div>
          </div>
          <span>Joined by 10,000+ mindful readers</span>
        </div>
      </div>

      {/* Right — hero card */}
      <div className="lg:w-1/2 w-full relative">
        <div className="absolute -top-10 -right-10 size-64 bg-lavender/40 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-10 -left-10 size-64 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="w-full aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden border border-sage/30 p-4 max-w-lg mx-auto">
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-sage/30 to-lavender/40 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl max-w-xs text-center border border-primary/20">
              <span className="text-primary text-4xl mb-2 block">✦</span>
              <p className="italic text-lg text-slate-800 leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
                &ldquo;It is not that we have a short time to live, but that we waste a lot of it.&rdquo;
              </p>
              <p className="text-xs text-slate-400 mt-3 uppercase tracking-widest font-semibold">— Seneca</p>
              <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-2/3" />
              </div>
              <p className="text-[10px] uppercase tracking-widest mt-2 text-slate-400">
                Daily Bloom Progress: 65%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─── Social Proof Stats ─── */
const SocialProof = () => (
  <section className="px-6 md:px-20 lg:px-40 py-8 bg-white">
    <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 text-center">
      <div className="flex flex-col items-center gap-1">
        <span className="text-3xl font-black text-slate-900">1,000+</span>
        <span className="text-sm text-slate-500">Wisdom Cards</span>
      </div>
      <div className="hidden sm:block w-px h-10 bg-sage/40" />
      <div className="flex flex-col items-center gap-1">
        <span className="text-3xl font-black text-slate-900">4.9★</span>
        <span className="text-sm text-slate-500">Reader Rating</span>
      </div>
      <div className="hidden sm:block w-px h-10 bg-sage/40" />
      <div className="flex flex-col items-center gap-1">
        <span className="text-3xl font-black text-slate-900">50+</span>
        <span className="text-sm text-slate-500">Curated Books</span>
      </div>
    </div>
  </section>
);

/* ─── How It Works ─── */
const HowItWorks = () => (
  <section id="how-it-works" className="px-6 md:px-20 lg:px-40 py-20 bg-white">
    <div className="flex flex-col gap-16">
      <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Three simple steps to mindful reading
        </h2>
        <p className="text-slate-500 text-lg">
          We&apos;ve distilled the world&apos;s best books into a beautiful, bite-sized experience.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-6 p-8 rounded-2xl bg-bglight border border-sage/20 hover:border-primary/50 transition-all group">
          <div className="size-16 rounded-2xl bg-sage/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-bgdark transition-all">
            <svg className="size-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-slate-900">Choose Your Topics</h3>
            <p className="text-slate-500 leading-relaxed">
              Pick what resonates — philosophy, science, psychology, leadership, or creativity. Your feed, your focus.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 p-8 rounded-2xl bg-bglight border border-sage/20 hover:border-primary/50 transition-all group">
          <div className="size-16 rounded-2xl bg-lavender flex items-center justify-center text-indigo-500 group-hover:bg-primary group-hover:text-bgdark transition-all">
            <svg className="size-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-slate-900">Swipe Through Wisdom</h3>
            <p className="text-slate-500 leading-relaxed">
              Each card is a 60-second insight from a great book. Swipe to explore, save what inspires you.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 p-8 rounded-2xl bg-bglight border border-sage/20 hover:border-primary/50 transition-all group">
          <div className="size-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-primary group-hover:text-bgdark transition-all">
            <svg className="size-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-slate-900">Track Your Growth</h3>
            <p className="text-slate-500 leading-relaxed">
              Build streaks, take quizzes, and watch your wisdom library grow. Real progress, one card at a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─── Features Grid ─── */
const Features = () => (
  <section id="features" className="px-6 md:px-20 lg:px-40 py-24">
    <div className="text-center max-w-2xl mx-auto flex flex-col gap-4 mb-16">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
        Everything you need to bloom
      </h2>
      <p className="text-slate-500 text-lg">
        A complete system for replacing doomscrolling with something meaningful.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {[
        { icon: "📚", title: "1000+ Wisdom Cards", desc: "Curated insights from 50+ of the greatest books ever written." },
        { icon: "⏱", title: "60-Second Reads", desc: "Distilled wisdom that fits your commute, coffee break, or morning ritual." },
        { icon: "🔥", title: "Daily Streaks", desc: "Build consistency with streak tracking and gentle daily reminders." },
        { icon: "🧠", title: "Quiz Mode", desc: "Test your knowledge with \"Who said this?\" challenges every 10 cards." },
        { icon: "💾", title: "Save & Collect", desc: "Bookmark favorites and browse curated collections anytime." },
        { icon: "📤", title: "Share as Stories", desc: "Generate beautiful share images to inspire your friends." },
      ].map((f, i) => (
        <div key={i} className="p-6 rounded-2xl bg-white border border-sage/20 hover:border-primary/50 hover:-translate-y-1 transition-all">
          <span className="text-2xl mb-3 block">{f.icon}</span>
          <h3 className="font-bold text-slate-900 mb-1">{f.title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

/* ─── Testimonials ─── */
const testimonials = [
  {
    quote: "BloomScroll completely changed my relationship with my phone. Instead of feeling drained after an hour on social media, I feel inspired by the gentle affirmations.",
    name: "Sarah Jenkins",
    role: "Content Creator",
  },
  {
    quote: "The AI detection is surprisingly accurate. It knows exactly when I'm doomscrolling and redirects my focus with just the right message. I've gained back 2 hours daily.",
    name: "David Chen",
    role: "Software Engineer",
  },
  {
    quote: "Visualizing my progress as a growing garden makes mindfulness feel rewarding. It's the only app that has actually helped me stick to my digital detox goals.",
    name: "Elena Rodriguez",
    role: "Student",
  },
];

const Testimonials = () => (
  <section className="px-6 md:px-20 lg:px-40 py-24 bg-bglight">
    <div className="text-center mb-14">
      <p className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-4">
        Community Impact
      </p>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "Georgia, serif" }}>
        Real Stories from our Garden
      </h2>
      <p className="text-slate-500 text-lg mt-4 max-w-xl mx-auto">
        See how BloomScroll is helping people reclaim their attention and find digital peace.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {testimonials.map((t, i) => (
        <div
          key={i}
          className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="size-12 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex-shrink-0" />
            <div>
              <p className="font-bold text-sm text-slate-900">{t.name}</p>
              <p className="text-xs text-primary font-semibold uppercase tracking-wider">{t.role}</p>
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm" style={{ fontFamily: "Georgia, serif" }}>
            &ldquo;{t.quote}&rdquo;
          </p>
        </div>
      ))}
    </div>
  </section>
);

/* ─── Before / After ─── */
const BeforeAfter = () => (
  <section className="px-6 md:px-20 lg:px-40 py-24">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
        Your Scrolling, Reimagined
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div className="p-8 rounded-2xl border-2 border-slate-200 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-300" />
        <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wide mb-6">Doomscrolling</h3>
        <ul className="space-y-4 text-slate-500">
          <li className="flex items-start gap-3">
            <span className="text-xl shrink-0">😵</span>
            <span>Anxiety after scrolling</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl shrink-0">⏰</span>
            <span>2 hours wasted daily</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl shrink-0">📉</span>
            <span>Brain rot &amp; regret</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl shrink-0">🔄</span>
            <span>Endless, addictive feed</span>
          </li>
        </ul>
      </div>
      <div className="p-8 rounded-2xl border-2 border-primary bg-bglight relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
        <h3 className="text-lg font-bold text-primary uppercase tracking-wide mb-6">Bloomscrolling</h3>
        <ul className="space-y-4 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="text-xl shrink-0">🧘</span>
            <span>Calm, centered mind</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl shrink-0">⏰</span>
            <span>5 minutes invested</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl shrink-0">📈</span>
            <span>Growth &amp; insight</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl shrink-0">✅</span>
            <span>Curated, finite wisdom</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

/* ─── Pricing ─── */
const Pricing = () => (
  <section id="pricing" className="px-6 md:px-20 lg:px-40 py-24">
    <div className="text-center flex flex-col gap-3 mb-12">
      <h2 className="text-3xl md:text-5xl font-black text-slate-900">Choose Your Path to Growth</h2>
      <p className="text-slate-500">Flexible plans to support your wisdom journey.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto w-full gap-8">
      {/* Free */}
      <div className="flex flex-col p-8 rounded-3xl border-2 border-sage bg-white relative overflow-hidden">
        <div className="flex flex-col gap-6 h-full">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-slate-900">Seedling Plan</h3>
            <p className="text-slate-500 text-sm">Everything you need to start blooming.</p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900">$0</span>
            <span className="text-slate-400 font-medium">/forever</span>
          </div>
          <ul className="flex flex-col gap-4 mt-4 flex-grow">
            <li className="flex items-center gap-3 text-sm text-slate-700">
              <span className="text-primary text-lg">✓</span>
              5 daily wisdom cards
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-700">
              <span className="text-primary text-lg">✓</span>
              Daily streak tracking
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-700">
              <span className="text-primary text-lg">✓</span>
              Save &amp; share cards
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-400">
              <span className="text-slate-300 text-lg">✕</span>
              Unlimited access
            </li>
          </ul>
          <Link
            href="/app"
            className="w-full py-4 rounded-xl border-2 border-sage font-bold text-center hover:bg-sage/10 transition-colors mt-8 text-slate-700 block"
          >
            Start Free
          </Link>
        </div>
      </div>

      {/* Pro */}
      <div className="flex flex-col p-8 rounded-3xl border-2 border-primary bg-bglight shadow-2xl shadow-primary/10 relative overflow-hidden transform md:scale-105 z-10">
        <div className="absolute top-0 right-0 bg-primary text-bgdark font-bold text-[10px] uppercase tracking-widest px-6 py-2 rounded-bl-xl">
          Best Value
        </div>
        <div className="flex flex-col gap-6 h-full">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-slate-900">Pro Garden</h3>
            <p className="text-slate-500 text-sm">Unlock the full power of daily wisdom.</p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-primary">$5</span>
            <span className="text-slate-400 font-medium">/month</span>
          </div>
          <ul className="flex flex-col gap-4 mt-4 flex-grow">
            <li className="flex items-center gap-3 text-sm font-semibold text-slate-900">
              <span className="text-primary text-lg font-bold">✓</span>
              Unlimited wisdom cards
            </li>
            <li className="flex items-center gap-3 text-sm font-semibold text-slate-900">
              <span className="text-primary text-lg font-bold">✓</span>
              Spaced repetition learning
            </li>
            <li className="flex items-center gap-3 text-sm font-semibold text-slate-900">
              <span className="text-primary text-lg font-bold">✓</span>
              All 8 curated collections
            </li>
            <li className="flex items-center gap-3 text-sm font-semibold text-slate-900">
              <span className="text-primary text-lg font-bold">✓</span>
              Advanced quiz &amp; stats
            </li>
            <li className="flex items-center gap-3 text-sm font-semibold text-slate-900">
              <span className="text-primary text-lg font-bold">✓</span>
              Offline reading mode
            </li>
          </ul>
          <Link
            href="/subscribe"
            className="w-full py-4 rounded-xl bg-primary text-bgdark font-black shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all mt-8 text-center block"
          >
            Grow Now
          </Link>
        </div>
      </div>
    </div>
  </section>
);

/* ─── CTA ─── */
const CTA = () => (
  <section className="px-6 md:px-20 lg:px-40 py-24 mb-20">
    <div className="bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-12 md:p-20 text-center flex flex-col items-center gap-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 botanical-pattern pointer-events-none" />
      <div className="absolute -top-24 -left-24 size-64 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute -bottom-24 -right-24 size-64 bg-emerald-500/20 rounded-full blur-[100px]" />
      <div className="relative z-10 flex flex-col gap-6 max-w-3xl">
        <h2 className="text-white text-4xl md:text-6xl font-black leading-tight">
          Ready to let your mind bloom?
        </h2>
        <p className="text-slate-400 text-lg md:text-xl">
          Join over 10,000 readers who replaced doomscrolling with wisdom and reclaimed their time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link
            href="/app"
            className="flex items-center justify-center gap-3 rounded-2xl h-16 px-10 bg-primary text-bgdark text-xl font-bold transition-transform hover:scale-105"
          >
            Get Started Free
            <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

/* ─── Trust Badges ─── */
const TrustBadges = () => (
  <section className="px-6 md:px-20 lg:px-40 py-8">
    <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-400">
      <span className="flex items-center gap-2">🔒 No Ads</span>
      <span className="flex items-center gap-2">🛡️ No Tracking</span>
      <span className="flex items-center gap-2">📱 Works Offline</span>
      <span className="flex items-center gap-2">💚 Open Source Friendly</span>
    </div>
  </section>
);

/* ─── Footer ─── */
const Footer = () => (
  <footer className="px-6 md:px-20 lg:px-40 py-12 border-t border-sage/20">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="size-6 flex items-center justify-center bg-primary rounded text-bgdark">
            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9ZM5.6 10.25c0 1.64 1.33 2.97 2.97 2.97h.86c1.97 0 3.56-1.6 3.56-3.57v-5.4C12.99 2.56 11.43 1 9.43 1c-2 0-3.56 1.56-3.56 3.56v5.4c0 .1 0 .2-.27.29ZM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9Z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-slate-900">BloomScroll</span>
        </div>
        <p className="text-sm text-slate-500">Transforming digital habits through wisdom and growth.</p>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="font-bold text-slate-900">Product</h4>
        <Link href="/app" className="text-sm text-slate-500 hover:text-primary transition-colors">Web Reader</Link>
        <a href="#features" className="text-sm text-slate-500 hover:text-primary transition-colors">Features</a>
        <Link href="/subscribe" className="text-sm text-slate-500 hover:text-primary transition-colors">Pricing</Link>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="font-bold text-slate-900">Company</h4>
        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">About Us</a>
        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">Community</a>
        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">Privacy Policy</a>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="font-bold text-slate-900">Newsletter</h4>
        <p className="text-xs text-slate-500">Get weekly wisdom tips.</p>
        <EmailCapture />
      </div>
    </div>
    <div className="flex flex-col md:flex-row justify-between items-center border-t border-sage/10 pt-8 gap-4">
      <p className="text-xs text-slate-400">&copy; 2025 BloomScroll. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="https://twitter.com/bloomscroll" className="text-slate-400 hover:text-primary transition-colors text-sm">Twitter</a>
        <a href="https://instagram.com/bloomscroll" className="text-slate-400 hover:text-primary transition-colors text-sm">Instagram</a>
      </div>
    </div>
  </footer>
);

/* ─── Page ─── */
export default function HomePage() {
  return (
    <div className="bg-bglight text-slate-900 min-h-screen flex flex-col botanical-pattern" style={{ fontFamily: "'Lexend', sans-serif" }}>
      <Navigation />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <Features />
      <Testimonials />
      <BeforeAfter />
      <Pricing />
      <FAQ />
      <TrustBadges />
      <CTA />
      <Footer />
    </div>
  );
}
