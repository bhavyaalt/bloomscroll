"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Preferences } from "@/components/app/types";

const PREFERENCES_KEY = "bloomscroll_preferences";

const TOPICS = [
  { id: "philosophy", label: "Philosophy", emoji: "🏛️" },
  { id: "stoicism", label: "Stoicism", emoji: "🗿" },
  { id: "psychology", label: "Psychology", emoji: "🧠" },
  { id: "business", label: "Business", emoji: "📈" },
  { id: "science", label: "Science", emoji: "🔬" },
  { id: "history", label: "History", emoji: "📜" },
  { id: "productivity", label: "Productivity", emoji: "⚡" },
  { id: "creativity", label: "Creativity", emoji: "✨" },
  { id: "mindfulness", label: "Mindfulness", emoji: "🧘" },
  { id: "leadership", label: "Leadership", emoji: "👑" },
  { id: "finance", label: "Finance", emoji: "💰" },
];

const GOALS = [
  { id: "daily-wisdom", label: "Get daily wisdom", emoji: "📖" },
  { id: "build-habit", label: "Build a reading habit", emoji: "🔥" },
  { id: "learn-new", label: "Learn something new", emoji: "🎓" },
  { id: "reduce-scrolling", label: "Reduce mindless scrolling", emoji: "📱" },
  { id: "personal-growth", label: "Personal growth", emoji: "🌱" },
  { id: "find-quotes", label: "Find great quotes", emoji: "💬" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleTopic = (id: string) => {
    setSelectedTopics(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const finish = () => {
    const prefs: Preferences = {
      topics: selectedTopics,
      goals: selectedGoals,
      completedAt: new Date().toISOString(),
    };
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
    router.push("/app");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#102219] to-[#0a1610] text-white flex flex-col">
      {/* Progress */}
      <div className="px-6 pt-6">
        <div className="flex gap-2 mb-2">
          <div className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-white/10"}`} />
          <div className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-white/10"}`} />
        </div>
        <p className="text-xs text-white/40">Step {step} of 2</p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="topics"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-md"
            >
              <div className="text-center mb-8">
                <div className="text-4xl mb-3">🌱</div>
                <h1 className="text-3xl font-bold tracking-tight uppercase text-primary mb-2">
                  What interests you?
                </h1>
                <p className="text-white/50 text-sm">Pick topics to personalize your feed</p>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-8">
                {TOPICS.map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => toggleTopic(topic.id)}
                    className={`p-3 rounded-xl text-center transition-all ${
                      selectedTopics.includes(topic.id)
                        ? "bg-primary text-white border-2 border-primary"
                        : "bg-white/5 text-white/70 border-2 border-transparent hover:bg-white/10"
                    }`}
                  >
                    <div className="text-2xl mb-1">{topic.emoji}</div>
                    <div className="text-xs font-medium">{topic.label}</div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 text-white/40 text-sm"
                >
                  Skip
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 bg-primary rounded-full font-bold text-sm"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-md"
            >
              <div className="text-center mb-8">
                <div className="text-4xl mb-3">🎯</div>
                <h1 className="text-3xl font-bold tracking-tight uppercase text-primary mb-2">
                  What are your goals?
                </h1>
                <p className="text-white/50 text-sm">Help us tailor your experience</p>
              </div>

              <div className="space-y-3 mb-8">
                {GOALS.map(goal => (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`w-full p-4 rounded-xl text-left flex items-center gap-3 transition-all ${
                      selectedGoals.includes(goal.id)
                        ? "bg-primary text-white border-2 border-primary"
                        : "bg-white/5 text-white/70 border-2 border-transparent hover:bg-white/10"
                    }`}
                  >
                    <span className="text-2xl">{goal.emoji}</span>
                    <span className="font-medium">{goal.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={finish}
                  className="flex-1 py-3 text-white/40 text-sm"
                >
                  Skip
                </button>
                <button
                  onClick={finish}
                  className="flex-1 py-3 bg-primary rounded-full font-bold text-sm"
                >
                  Start Reading
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
