"use client";

import Image from "next/image";
import { useState } from "react";

const topics = [
  { name: "Philosophy", emoji: "🏛️", count: "240+ ideas" },
  { name: "Psychology", emoji: "🧠", count: "180+ ideas" },
  { name: "Business", emoji: "💼", count: "320+ ideas" },
  { name: "Science", emoji: "🔬", count: "150+ ideas" },
  { name: "History", emoji: "📜", count: "200+ ideas" },
  { name: "Productivity", emoji: "⚡", count: "280+ ideas" },
  { name: "Stoicism", emoji: "🗿", count: "120+ ideas" },
  { name: "Creativity", emoji: "🎨", count: "90+ ideas" },
];

const sampleCards = [
  {
    topic: "Philosophy",
    author: "SENECA",
    book: "On Shortness of Life",
    quote: "\"It is not that we have a short time to live, but that we waste a lot of it. Life is long enough if the whole of it is well invested.\"",
  },
  {
    topic: "Psychology",
    author: "DANIEL KAHNEMAN",
    book: "Thinking, Fast and Slow",
    quote: "\"Nothing in life is as important as you think it is while you are thinking about it.\"",
  },
  {
    topic: "Business",
    author: "PETER THIEL",
    book: "Zero to One",
    quote: "\"The most contrarian thing of all is not to oppose the crowd but to think for yourself.\"",
  },
];

const steps = [
  {
    number: "01",
    title: "Pick Your Topics",
    description: "Choose what fascinates you — philosophy, psychology, business, or all of it.",
  },
  {
    number: "02",
    title: "Scroll With Purpose",
    description: "Every swipe reveals a new idea. Bite-sized wisdom that sticks.",
  },
  {
    number: "03",
    title: "Save & Grow",
    description: "Bookmark favorites. Build your personal library of powerful ideas.",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-cream)]/90 backdrop-blur-md border-b border-[var(--color-pink-dark)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              <span className="text-[var(--color-green)]">BLOOM</span>
              <span className="font-serif italic text-[var(--color-text)]">scroll</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#topics" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-green)] transition">
              Topics
            </a>
            <a href="#how-it-works" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-green)] transition">
              How it works
            </a>
            <a href="#pricing" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-green)] transition">
              Pricing
            </a>
            <button className="bg-[var(--color-green)] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[var(--color-green-dark)] transition">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-[var(--color-pink)] to-[var(--color-cream)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-block bg-[var(--color-green)]/10 text-[var(--color-green)] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                ✨ Replace doomscrolling with growth
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Turn scroll time into{" "}
                <span className="gradient-text">grow time</span>
              </h1>
              <p className="text-xl text-[var(--color-text-muted)] mb-8 leading-relaxed">
                Swipe through bite-sized wisdom from books, thinkers, and life lessons. 
                5 minutes of scrolling = 1 idea that sticks. No ads. No noise. Just growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 rounded-full border-2 border-[var(--color-pink-dark)] focus:border-[var(--color-green)] outline-none transition bg-white"
                  />
                </div>
                <button className="bg-[var(--color-green)] text-white px-8 py-4 rounded-full font-semibold hover:bg-[var(--color-green-dark)] transition shadow-lg shadow-[var(--color-green)]/20">
                  Start Free Trial →
                </button>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] mt-4">
                7-day free trial • Then $5/month in USDC • Cancel anytime
              </p>
            </div>
            
            {/* Phone Mockup */}
            <div className="relative animate-fade-in-up animation-delay-200">
              <div className="absolute inset-0 bg-[var(--color-green)]/10 rounded-3xl blur-3xl"></div>
              <div className="relative bg-[var(--color-pink)] rounded-[2.5rem] p-4 shadow-2xl max-w-sm mx-auto border-8 border-gray-900">
                <div className="bg-white rounded-[2rem] overflow-hidden">
                  {/* Phone Header */}
                  <div className="bg-[var(--color-pink)] px-4 py-3 flex items-center justify-between">
                    <span className="text-lg font-bold">
                      <span className="text-[var(--color-green)]">BLOOM</span>
                      <span className="font-serif italic">scroll</span>
                    </span>
                    <span className="text-xs bg-white text-[var(--color-green)] px-2 py-1 rounded-full font-medium">
                      ◆ $5/MO
                    </span>
                  </div>
                  
                  {/* Card Preview */}
                  <div className="p-4">
                    <div className="text-xs text-[var(--color-green)] font-medium mb-3">
                      ◆ DAILY CURATED · PHILOSOPHY
                    </div>
                    <div className="h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      <div className="text-4xl opacity-30">📚</div>
                    </div>
                    <h3 className="text-[var(--color-green)] text-2xl font-bold mb-1">SENECA</h3>
                    <p className="font-serif italic text-xl mb-3">On Shortness of Life</p>
                    <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                      "It is not that we have a short time to live, but that we waste a lot of it."
                    </p>
                    <div className="flex gap-3 mt-4">
                      <button className="bg-[var(--color-green)] text-white px-5 py-2 rounded-full text-sm font-medium">
                        Read 60s
                      </button>
                      <button className="border-2 border-[var(--color-green)] text-[var(--color-green)] px-5 py-2 rounded-full text-sm font-medium">
                        ◆ Save
                      </button>
                    </div>
                  </div>
                  
                  {/* Bottom Nav */}
                  <div className="border-t border-gray-100 px-8 py-3 flex justify-between text-center">
                    <div className="text-[var(--color-green)]">
                      <div className="font-bold text-sm">B</div>
                      <div className="text-xs">HOME</div>
                    </div>
                    <div className="text-[var(--color-text-muted)]">
                      <div className="font-serif italic text-sm">I</div>
                      <div className="text-xs">IDEAS</div>
                    </div>
                    <div className="text-[var(--color-text-muted)]">
                      <div className="text-sm">◆</div>
                      <div className="text-xs">SAVED</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-6 bg-white border-y border-[var(--color-pink-dark)]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[var(--color-text-muted)] mb-6">Built for curious minds who want more from their screen time</p>
          <div className="flex flex-wrap justify-center gap-8 text-[var(--color-text-muted)]">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <span className="font-semibold">500+ Books</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💡</span>
              <span className="font-semibold">2,000+ Ideas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <span className="font-semibold">8 Topics</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="font-semibold">60-sec reads</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Scrolling, but make it <span className="gradient-text">meaningful</span>
            </h2>
            <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
              Same addictive swipe. Completely different outcome.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 card-hover border border-[var(--color-pink-dark)]">
                <div className="text-5xl font-bold text-[var(--color-pink-dark)] mb-4">{step.number}</div>
                <h3 className="text-xl font-bold mb-3 text-[var(--color-green)]">{step.title}</h3>
                <p className="text-[var(--color-text-muted)]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section id="topics" className="py-24 px-6 bg-[var(--color-pink)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Subscribe to what <span className="gradient-text">fascinates</span> you
            </h2>
            <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
              Your feed, your interests. Philosophy? Psychology? Business? All of it? You decide.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topics.map((topic, i) => (
              <div 
                key={i} 
                className="bg-white rounded-xl p-6 text-center card-hover cursor-pointer border-2 border-transparent hover:border-[var(--color-green)]"
              >
                <div className="text-4xl mb-3">{topic.emoji}</div>
                <h3 className="font-bold text-lg mb-1">{topic.name}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{topic.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Cards */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              A taste of <span className="gradient-text">Bloomscroll</span>
            </h2>
            <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
              Ideas that make you pause, think, and grow.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {sampleCards.map((card, i) => (
              <div key={i} className="bg-[var(--color-pink)] rounded-2xl p-6 card-hover">
                <div className="text-xs text-[var(--color-green)] font-medium mb-4">
                  ◆ {card.topic.toUpperCase()}
                </div>
                <h3 className="text-[var(--color-green)] text-xl font-bold mb-1">{card.author}</h3>
                <p className="font-serif italic text-lg mb-4">{card.book}</p>
                <p className="text-[var(--color-text-muted)] leading-relaxed">{card.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-[var(--color-green)]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-xl opacity-90 mb-12">
            Less than a coffee. More than a library.
          </p>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 text-[var(--color-text)] max-w-lg mx-auto">
            <div className="inline-block bg-[var(--color-pink)] text-[var(--color-green)] px-4 py-1 rounded-full text-sm font-semibold mb-6">
              MOST POPULAR
            </div>
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-5xl font-bold">$5</span>
              <span className="text-[var(--color-text-muted)]">/month</span>
            </div>
            <p className="text-[var(--color-text-muted)] mb-8">Paid in USDC on Base</p>
            
            <ul className="text-left space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <span className="text-[var(--color-green)]">✓</span>
                Unlimited access to all ideas
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[var(--color-green)]">✓</span>
                All topics included
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[var(--color-green)]">✓</span>
                Save & organize favorites
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[var(--color-green)]">✓</span>
                New ideas added daily
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[var(--color-green)]">✓</span>
                7-day free trial
              </li>
            </ul>
            
            <button className="w-full bg-[var(--color-green)] text-white py-4 rounded-full font-semibold text-lg hover:bg-[var(--color-green-dark)] transition">
              Start Your Free Trial
            </button>
            <p className="text-sm text-[var(--color-text-muted)] mt-4">
              Cancel anytime. No questions asked.
            </p>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-4 opacity-80">
            <span className="text-sm">Powered by</span>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
              <span className="font-bold">Base</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to <span className="gradient-text">bloom</span>?
          </h2>
          <p className="text-xl text-[var(--color-text-muted)] mb-8 max-w-2xl mx-auto">
            Join thousands of curious minds who turned their scroll habit into a superpower.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-4 rounded-full border-2 border-[var(--color-pink-dark)] focus:border-[var(--color-green)] outline-none transition"
            />
            <button className="bg-[var(--color-green)] text-white px-8 py-4 rounded-full font-semibold hover:bg-[var(--color-green-dark)] transition">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[var(--color-text)] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">
                <span className="text-[var(--color-green-light)]">BLOOM</span>
                <span className="font-serif italic">scroll</span>
              </span>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Contact</a>
            </div>
            <p className="text-sm text-gray-400">
              © 2026 Bloomscroll. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
