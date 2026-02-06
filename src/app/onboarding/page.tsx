"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const ONBOARDING_KEY = "bloomscroll_onboarding_complete";
const PREFERENCES_KEY = "bloomscroll_preferences";

// Topics with emojis and descriptions
const topicOptions = [
  { id: "philosophy", emoji: "🏛️", name: "Philosophy", desc: "Big questions, deep thinking" },
  { id: "stoicism", emoji: "🗿", name: "Stoicism", desc: "Seneca, Marcus Aurelius, Epictetus" },
  { id: "psychology", emoji: "🧠", name: "Psychology", desc: "Mind, behavior, decisions" },
  { id: "business", emoji: "💼", name: "Business", desc: "Wealth, strategy, entrepreneurship" },
  { id: "science", emoji: "🔬", name: "Science", desc: "Discovery, curiosity, wonder" },
  { id: "history", emoji: "📜", name: "History", desc: "Lessons from the past" },
  { id: "productivity", emoji: "⚡", name: "Productivity", desc: "Habits, focus, systems" },
  { id: "creativity", emoji: "🎨", name: "Creativity", desc: "Art, innovation, ideas" },
  { id: "mindfulness", emoji: "🧘", name: "Mindfulness", desc: "Peace, presence, awareness" },
  { id: "leadership", emoji: "👑", name: "Leadership", desc: "Influence, service, vision" },
  { id: "relationships", emoji: "💝", name: "Relationships", desc: "Connection, love, communication" },
];

// Goals
const goalOptions = [
  { id: "learn", emoji: "📚", name: "Learn something new daily", desc: "Expand your knowledge" },
  { id: "reflect", emoji: "🪞", name: "Reflect & think deeper", desc: "Gain perspective on life" },
  { id: "grow", emoji: "🌱", name: "Personal growth", desc: "Become a better version of yourself" },
  { id: "inspire", emoji: "✨", name: "Find inspiration", desc: "Fuel your creativity and motivation" },
  { id: "calm", emoji: "🌊", name: "Find calm & clarity", desc: "Replace anxiety with wisdom" },
  { id: "decide", emoji: "🎯", name: "Make better decisions", desc: "Mental models & frameworks" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [isExiting, setIsExiting] = useState(false);

  // Check if already onboarded
  useEffect(() => {
    const completed = localStorage.getItem(ONBOARDING_KEY);
    if (completed === "true") {
      router.push("/app");
    }
  }, [router]);

  const toggleTopic = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((t) => t !== topicId)
        : [...prev, topicId]
    );
  };

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((g) => g !== goalId)
        : [...prev, goalId]
    );
  };

  const handleNext = () => {
    if (step === 1 && selectedTopics.length > 0) {
      setStep(2);
    }
  };

  const handleComplete = () => {
    // Save preferences
    const preferences = {
      topics: selectedTopics,
      goals: selectedGoals,
      completedAt: new Date().toISOString(),
    };
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
    localStorage.setItem(ONBOARDING_KEY, "true");

    // Animate exit and redirect
    setIsExiting(true);
    setTimeout(() => {
      router.push("/app");
    }, 500);
  };

  const handleSkip = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    router.push("/app");
  };

  return (
    <div className="min-h-screen bg-[#EACCD4] text-[#007A5E] overflow-hidden">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[#007A5E]/20">
        <motion.div
          className="h-full bg-[#007A5E]"
          initial={{ width: "0%" }}
          animate={{ width: step === 1 ? "50%" : "100%" }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="fixed top-6 right-6 z-50 text-sm font-bold uppercase tracking-wide opacity-60 hover:opacity-100 transition-opacity"
      >
        Skip
      </button>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isExiting ? 0 : 1, x: isExiting ? -50 : 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col"
          >
            {/* Header */}
            <div className="pt-16 pb-8 px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="inline-block py-1 px-3 border border-[#007A5E] rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                  Step 1 of 2
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-impact text-4xl md:text-5xl uppercase mb-4"
              >
                What fascinates you?
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-times italic text-xl opacity-80 max-w-md mx-auto"
              >
                Pick topics you want to explore. We&apos;ll curate your feed around them.
              </motion.p>
            </div>

            {/* Topics Grid */}
            <div className="flex-1 px-4 pb-32 overflow-auto">
              <div className="max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3">
                {topicOptions.map((topic, i) => (
                  <motion.button
                    key={topic.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() => toggleTopic(topic.id)}
                    className={`p-4 rounded-xl text-left transition-all border-2 ${
                      selectedTopics.includes(topic.id)
                        ? "bg-[#007A5E] text-[#EACCD4] border-[#007A5E] scale-[1.02]"
                        : "bg-white/50 border-transparent hover:border-[#007A5E]/30"
                    }`}
                  >
                    <span className="text-2xl block mb-2">{topic.emoji}</span>
                    <span className="font-bold block">{topic.name}</span>
                    <span className={`text-xs ${selectedTopics.includes(topic.id) ? "opacity-80" : "opacity-60"}`}>
                      {topic.desc}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#EACCD4] via-[#EACCD4] to-transparent">
              <div className="max-w-md mx-auto">
                <button
                  onClick={handleNext}
                  disabled={selectedTopics.length === 0}
                  className={`w-full py-4 rounded-full font-bold uppercase tracking-widest transition-all ${
                    selectedTopics.length > 0
                      ? "bg-[#007A5E] text-[#EACCD4] hover:bg-[#004a39] shadow-lg"
                      : "bg-[#007A5E]/30 text-[#007A5E]/50 cursor-not-allowed"
                  }`}
                >
                  Continue ({selectedTopics.length} selected)
                </button>
                <p className="text-center text-xs opacity-60 mt-3">
                  Select at least 1 topic
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isExiting ? 0 : 1, x: isExiting ? -50 : 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col"
          >
            {/* Header */}
            <div className="pt-16 pb-8 px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="inline-block py-1 px-3 border border-[#007A5E] rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                  Step 2 of 2
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-impact text-4xl md:text-5xl uppercase mb-4"
              >
                What&apos;s your goal?
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-times italic text-xl opacity-80 max-w-md mx-auto"
              >
                Why are you here? This helps us personalize your experience.
              </motion.p>
            </div>

            {/* Goals Grid */}
            <div className="flex-1 px-4 pb-32 overflow-auto">
              <div className="max-w-lg mx-auto space-y-3">
                {goalOptions.map((goal, i) => (
                  <motion.button
                    key={goal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    onClick={() => toggleGoal(goal.id)}
                    className={`w-full p-5 rounded-xl text-left transition-all border-2 flex items-center gap-4 ${
                      selectedGoals.includes(goal.id)
                        ? "bg-[#007A5E] text-[#EACCD4] border-[#007A5E]"
                        : "bg-white/50 border-transparent hover:border-[#007A5E]/30"
                    }`}
                  >
                    <span className="text-3xl">{goal.emoji}</span>
                    <div className="flex-1">
                      <span className="font-bold block text-lg">{goal.name}</span>
                      <span className={`text-sm ${selectedGoals.includes(goal.id) ? "opacity-80" : "opacity-60"}`}>
                        {goal.desc}
                      </span>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedGoals.includes(goal.id)
                          ? "bg-[#EACCD4] border-[#EACCD4]"
                          : "border-[#007A5E]/40"
                      }`}
                    >
                      {selectedGoals.includes(goal.id) && (
                        <span className="text-[#007A5E] text-sm">✓</span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#EACCD4] via-[#EACCD4] to-transparent">
              <div className="max-w-md mx-auto">
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-4 rounded-full font-bold uppercase tracking-widest border-2 border-[#007A5E] text-[#007A5E] hover:bg-[#007A5E]/10 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleComplete}
                    className="flex-1 py-4 rounded-full font-bold uppercase tracking-widest bg-[#007A5E] text-[#EACCD4] hover:bg-[#004a39] shadow-lg transition-all"
                  >
                    Start Bloomscrolling →
                  </button>
                </div>
                {selectedGoals.length === 0 && (
                  <p className="text-center text-xs opacity-60 mt-3">
                    You can skip goals or select multiple
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
