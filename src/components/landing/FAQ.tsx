"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is BloomScroll really free?",
    answer:
      "Yes, 5 cards per day are free forever. Pro unlocks unlimited access plus spaced repetition to help you retain what you learn.",
  },
  {
    question: "How is this different from Blinkist?",
    answer:
      "Blinkist gives you 15-minute book summaries. BloomScroll gives you 60-second wisdom cards designed for the scroll habit. We\u2019re not a replacement for reading \u2014 we\u2019re a replacement for doomscrolling.",
  },
  {
    question: "What if I miss a day?",
    answer:
      "Your streak resets but your saved cards and progress don\u2019t. No guilt, just wisdom when you\u2019re ready.",
  },
  {
    question: "What topics do you cover?",
    answer:
      "Philosophy, psychology, history, science, leadership, creativity, mental models, and more. 1,000+ cards from 50+ books and counting.",
  },
  {
    question: "Can I use it on my phone?",
    answer:
      "Yes! BloomScroll is a PWA \u2014 add it to your home screen for a native app experience. Works on iOS, Android, and desktop.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 md:px-20 lg:px-40 py-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-lg mt-3">
            Everything you need to know about BloomScroll.
          </p>
        </div>
        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-sage/30">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center py-5 text-left group"
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                <span className={`size-8 rounded-lg flex items-center justify-center shrink-0 border border-sage/30 text-slate-400 group-hover:bg-primary group-hover:text-bgdark group-hover:border-primary transition-all text-lg ${openIndex === i ? "bg-primary text-bgdark border-primary rotate-45" : ""}`}>
                  +
                </span>
              </button>
              {openIndex === i && (
                <div className="pb-5 pr-12">
                  <p className="text-slate-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
