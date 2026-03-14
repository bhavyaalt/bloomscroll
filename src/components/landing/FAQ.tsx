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
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 md:px-20 lg:px-40 py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-instrument-serif text-2xl md:text-4xl font-medium tracking-tight text-slate-900">
            Frequently asked{" "}
            <span className="font-instrument-serif italic text-brand font-normal">
              questions
            </span>
          </h2>
          <p className="text-slate-500 text-base mt-3 max-w-xl mx-auto">
            Quick answers to help you get set up, understand us better, and choose the right path as your usage grows.
          </p>
        </div>
        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-slate-200">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center py-5 text-left group"
              >
                <span className={`font-medium pr-4 ${openIndex === i ? "text-brand" : "text-slate-900"}`}>
                  {faq.question}
                </span>
                <span className={`size-9 sm:size-8 rounded-full flex items-center justify-center shrink-0 border transition-all text-lg ${
                  openIndex === i
                    ? "bg-brand text-white border-brand rotate-45"
                    : "border-slate-200 text-slate-400 group-hover:border-brand group-hover:text-brand"
                }`}>
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
