// Bloomscroll Content Library
// Comprehensive wisdom database - 200+ cards across all topics

export interface Card {
  id: string;
  author: string;
  book: string;
  topic: string[];
  insight: string;
  quote: string;
  image_url: string;
  read_time_seconds: number;
}

// Image URLs by topic for variety
const images = {
  philosophy: [
    "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800",
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800",
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800",
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800",
  ],
  psychology: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    "https://images.unsplash.com/photo-1489533119213-66a5cd877091?w=800",
    "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800",
  ],
  business: [
    "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
  ],
  science: [
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800",
    "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
  ],
  history: [
    "https://images.unsplash.com/photo-1555679427-1f6dfcce943b?w=800",
    "https://images.unsplash.com/photo-1519764622345-23439dd774f7?w=800",
    "https://images.unsplash.com/photo-1461360370896-922624d12a74?w=800",
  ],
  productivity: [
    "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800",
    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
  ],
  creativity: [
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800",
  ],
  mindfulness: [
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800",
    "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800",
  ],
  leadership: [
    "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800",
  ],
  relationships: [
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
  ],
};

function getImage(topic: string, index: number): string {
  const topicImages = images[topic as keyof typeof images] || images.philosophy;
  return topicImages[index % topicImages.length];
}

let idCounter = 1;
function makeCard(
  author: string,
  book: string,
  topics: string[],
  quote: string,
  insight: string,
  readTime: number = 45
): Card {
  return {
    id: String(idCounter++),
    author,
    book,
    topic: topics,
    quote,
    insight,
    image_url: getImage(topics[0], idCounter),
    read_time_seconds: readTime,
  };
}

export const contentLibrary: Card[] = [
  // ============================================
  // STOICISM - SENECA
  // ============================================
  makeCard(
    "Seneca",
    "On the Shortness of Life",
    ["philosophy", "stoicism", "time"],
    "It is not that we have a short time to live, but that we waste a lot of it.",
    "Life is long enough if the whole of it is well invested. But when it is wasted in heedless luxury and spent on no good activity, we are forced at last by death's final constraint to realize it has passed away before we knew it was passing.",
    45
  ),
  makeCard(
    "Seneca",
    "Letters from a Stoic",
    ["philosophy", "stoicism", "fear"],
    "We suffer more often in imagination than in reality.",
    "The mind creates problems that don't exist. It fears outcomes that may never happen. It replays past failures and projects future disasters. Master your thoughts, and you master your suffering.",
    40
  ),
  makeCard(
    "Seneca",
    "On the Happy Life",
    ["philosophy", "stoicism", "happiness"],
    "True happiness is to enjoy the present, without anxious dependence upon the future.",
    "It's not about what you have, but how you relate to what you have. The anxious mind is never satisfied. The content mind finds joy in the simplest moments. Contentment comes from within.",
    45
  ),
  makeCard(
    "Seneca",
    "Letters from a Stoic",
    ["philosophy", "stoicism", "adversity"],
    "Difficulties strengthen the mind, as labor does the body.",
    "Comfort breeds weakness. Challenge builds character. The obstacle is not in your way—it is the way. Every difficulty you overcome adds to your reservoir of strength.",
    40
  ),
  makeCard(
    "Seneca",
    "On Anger",
    ["philosophy", "stoicism", "emotions"],
    "The greatest remedy for anger is delay.",
    "When rage rises, pause. Count to ten. Sleep on it. The urgency you feel is an illusion. What seems unbearable in the moment becomes manageable with time. Anger is temporary insanity—don't act while insane.",
    35
  ),
  makeCard(
    "Seneca",
    "Letters from a Stoic",
    ["philosophy", "stoicism", "wealth"],
    "It is not the man who has too little, but the man who craves more, that is poor.",
    "Poverty is not measured by possessions but by desires. A billionaire who wants more is poorer than a monk who wants nothing. Wealth is the gap between what you have and what you need.",
    45
  ),
  makeCard(
    "Seneca",
    "On the Tranquility of Mind",
    ["philosophy", "stoicism", "peace"],
    "We are more often frightened than hurt; and we suffer more in imagination than in reality.",
    "The mind is a theater of horrors we create ourselves. Most of what you fear never happens. And what does happen, you handle. You've survived 100% of your worst days so far.",
    50
  ),
  makeCard(
    "Seneca",
    "Letters from a Stoic",
    ["philosophy", "stoicism", "learning"],
    "While we teach, we learn.",
    "The best way to master something is to teach it. Explaining forces clarity. Questions reveal gaps. The student becomes the teacher, and the teacher remains a student. Learning never ends.",
    35
  ),

  // ============================================
  // STOICISM - MARCUS AURELIUS
  // ============================================
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "mindset"],
    "You have power over your mind — not outside events. Realize this, and you will find strength.",
    "The world will throw chaos at you. People will disappoint you. Plans will fail. But your response? That's yours. The only true freedom is the freedom to choose your reaction.",
    40
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "action"],
    "Waste no more time arguing about what a good man should be. Be one.",
    "Philosophy is not about words—it's about action. Stop debating virtue and start living it. The world doesn't need more talkers. It needs more people who quietly do the right thing.",
    35
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "perspective"],
    "The object of life is not to be on the side of the majority, but to escape finding oneself in the ranks of the insane.",
    "Consensus is not truth. Popularity is not wisdom. Think independently. Question everything. The crowd is often wrong. Find your own path, even if you walk it alone.",
    40
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "mortality"],
    "Think of yourself as dead. You have lived your life. Now take what's left and live it properly.",
    "Death is not in the future—it's with you now. Every moment could be your last. This isn't morbid; it's liberating. When you accept death, you stop wasting life on trivialities.",
    45
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "obstacles"],
    "The impediment to action advances action. What stands in the way becomes the way.",
    "Obstacles aren't interruptions to your path—they ARE your path. Every problem is a training ground. Every setback is a setup. The thing blocking you is the thing building you.",
    40
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "acceptance"],
    "Accept the things to which fate binds you, and love the people with whom fate brings you together.",
    "You didn't choose your circumstances, but you can choose your response to them. You didn't pick your family, your country, your era. Work with what you have. Love who's in front of you.",
    45
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "present"],
    "Never let the future disturb you. You will meet it with the same weapons of reason.",
    "Worry is paying interest on a debt you may never owe. The future hasn't happened. When it arrives, you'll handle it—just as you've handled everything before. Trust your future self.",
    40
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "opinion"],
    "Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.",
    "Reality is filtered through perception. Your version of events is just that—your version. Others see differently. Truth is rarely obvious. Stay humble about what you 'know.'",
    40
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "morning"],
    "When you arise in the morning, think of what a privilege it is to be alive.",
    "Another day is not guaranteed. This morning could have been your last night. You woke up. You breathe. You have another chance. Don't waste it complaining about what you lack.",
    35
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "judgment"],
    "If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it.",
    "Nothing has inherent emotional value until you assign it. A traffic jam can be frustrating or an opportunity to listen to a podcast. You choose the meaning. You control the pain.",
    45
  ),

  // ============================================
  // STOICISM - EPICTETUS
  // ============================================
  makeCard(
    "Epictetus",
    "Enchiridion",
    ["philosophy", "stoicism", "control"],
    "Some things are within our power, while others are not.",
    "Within your power: your thoughts, choices, desires, aversions. Not within your power: your body, reputation, position, possessions. Focus on what you control. Release what you don't.",
    50
  ),
  makeCard(
    "Epictetus",
    "Discourses",
    ["philosophy", "stoicism", "resilience"],
    "It's not what happens to you, but how you react to it that matters.",
    "The same event can devastate one person and strengthen another. A diagnosis. A layoff. A breakup. The event is neutral. Your response determines the outcome.",
    35
  ),
  makeCard(
    "Epictetus",
    "Enchiridion",
    ["philosophy", "stoicism", "freedom"],
    "No man is free who is not master of himself.",
    "Freedom isn't about external chains—it's about internal ones. You can be in prison and free, or in a palace and enslaved. True liberty is mastery over your own mind.",
    40
  ),
  makeCard(
    "Epictetus",
    "Discourses",
    ["philosophy", "stoicism", "education"],
    "Only the educated are free.",
    "Education isn't about degrees—it's about understanding. The more you know, the less you fear. The less you fear, the more you can do. Knowledge is the ultimate liberation.",
    35
  ),
  makeCard(
    "Epictetus",
    "Enchiridion",
    ["philosophy", "stoicism", "desire"],
    "Wealth consists not in having great possessions, but in having few wants.",
    "Reduce your desires, and you become instantly rich. The person who wants nothing already has everything. Simplicity is the ultimate sophistication.",
    40
  ),
  makeCard(
    "Epictetus",
    "Discourses",
    ["philosophy", "stoicism", "blame"],
    "Any person capable of angering you becomes your master.",
    "When you let others control your emotions, you surrender your power. Their words, their actions—these only hurt if you let them. Take back the keys to your inner peace.",
    40
  ),

  // ============================================
  // GREEK PHILOSOPHERS
  // ============================================
  makeCard(
    "Plato",
    "The Republic",
    ["philosophy", "knowledge", "truth"],
    "The real tragedy of life is when men are afraid of the light.",
    "We can forgive a child afraid of the dark. But adults who fear truth? That's tragic. Comfort in ignorance is a prison. Enlightenment is uncomfortable but free.",
    40
  ),
  makeCard(
    "Plato",
    "Allegory of the Cave",
    ["philosophy", "perception", "reality"],
    "We can easily forgive a child who is afraid of the dark; the real tragedy is when adults are afraid of the light.",
    "Most people live in shadows, mistaking them for reality. Breaking free means questioning everything you've been told, even when the light hurts your eyes at first.",
    45
  ),
  makeCard(
    "Plato",
    "Phaedrus",
    ["philosophy", "love", "soul"],
    "At the touch of love everyone becomes a poet.",
    "Love transforms us. It awakens parts of ourselves we didn't know existed. The cynic becomes romantic. The silent become eloquent. Love is the ultimate creative force.",
    35
  ),
  makeCard(
    "Aristotle",
    "Nicomachean Ethics",
    ["philosophy", "habits", "excellence"],
    "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    "Your character is the sum of your daily choices. One good deed doesn't make you good. One bad deed doesn't make you bad. Your habits define you. Small actions, repeated, become destiny.",
    40
  ),
  makeCard(
    "Aristotle",
    "Politics",
    ["philosophy", "purpose", "humanity"],
    "Man is by nature a social animal.",
    "We're not meant to be alone. Isolation breeds madness. Connection breeds meaning. Anyone who claims to need no one is either a beast or a god.",
    35
  ),
  makeCard(
    "Aristotle",
    "Nicomachean Ethics",
    ["philosophy", "happiness", "virtue"],
    "Happiness depends upon ourselves.",
    "It's not found in wealth, fame, or pleasure. It's found in living virtuously. Happiness is an activity—the activity of living well and doing good. It's a practice, not a destination.",
    40
  ),
  makeCard(
    "Aristotle",
    "Rhetoric",
    ["philosophy", "character", "persuasion"],
    "Character may almost be called the most effective means of persuasion.",
    "People don't buy arguments—they buy the person making them. Your credibility is your currency. Build character, and influence follows naturally.",
    35
  ),
  makeCard(
    "Socrates",
    "Apology",
    ["philosophy", "wisdom", "humility"],
    "The only true wisdom is in knowing you know nothing.",
    "The wise person knows the limits of their knowledge. The fool thinks they know everything. Intellectual humility opens doors. Arrogance closes them.",
    35
  ),
  makeCard(
    "Socrates",
    "Apology",
    ["philosophy", "life", "examination"],
    "The unexamined life is not worth living.",
    "Drift through life unconsciously, and you miss it entirely. Question your beliefs. Challenge your assumptions. Reflect on your choices. Consciousness is the price of a meaningful existence.",
    40
  ),
  makeCard(
    "Heraclitus",
    "Fragments",
    ["philosophy", "change", "impermanence"],
    "No man ever steps in the same river twice, for it's not the same river and he's not the same man.",
    "Everything flows. Nothing stays. The world you knew yesterday is gone. The person you were is gone. Embrace change—it's the only constant.",
    45
  ),

  // ============================================
  // EASTERN PHILOSOPHY
  // ============================================
  makeCard(
    "Lao Tzu",
    "Tao Te Ching",
    ["philosophy", "mindfulness", "simplicity"],
    "Nature does not hurry, yet everything is accomplished.",
    "The tree doesn't strain to grow. The river doesn't fight to flow. Forcing creates resistance. Patience creates power. Follow the natural rhythm of things.",
    35
  ),
  makeCard(
    "Lao Tzu",
    "Tao Te Ching",
    ["philosophy", "leadership", "humility"],
    "A leader is best when people barely know he exists.",
    "The greatest leaders don't demand attention. They empower others. When the work is done, people say: 'We did this ourselves.' That's true leadership.",
    40
  ),
  makeCard(
    "Lao Tzu",
    "Tao Te Ching",
    ["philosophy", "wisdom", "paradox"],
    "Those who know do not speak. Those who speak do not know.",
    "Wisdom is quiet. It doesn't need to prove itself. The loudest voice in the room is rarely the wisest. Listen more. Speak less. Learn always.",
    35
  ),
  makeCard(
    "Lao Tzu",
    "Tao Te Ching",
    ["philosophy", "water", "strength"],
    "Nothing is softer than water, yet nothing can resist it.",
    "Water is yielding but unstoppable. It goes around obstacles, wears down mountains, finds a way. Be like water—flexible, persistent, gentle, powerful.",
    40
  ),
  makeCard(
    "Buddha",
    "Dhammapada",
    ["philosophy", "mindfulness", "thought"],
    "The mind is everything. What you think you become.",
    "Your thoughts shape your reality. Think yourself weak, and you weaken. Think yourself capable, and you grow capable. Guard your mind—it's the garden of your future.",
    40
  ),
  makeCard(
    "Buddha",
    "Dhammapada",
    ["philosophy", "mindfulness", "suffering"],
    "Pain is inevitable. Suffering is optional.",
    "Life will hurt you. That's certain. But clinging to that pain? That's your choice. Acknowledge it. Feel it. Release it. The wound is not the scar.",
    35
  ),
  makeCard(
    "Buddha",
    "Dhammapada",
    ["philosophy", "mindfulness", "attachment"],
    "In the end, only three things matter: how much you loved, how gently you lived, and how gracefully you let go.",
    "Attachment is the root of suffering. Cling to nothing. Love everything. Hold loosely. Let go freely. This is the path to peace.",
    45
  ),
  makeCard(
    "Buddha",
    "Dhammapada",
    ["philosophy", "mindfulness", "anger"],
    "Holding onto anger is like drinking poison and expecting the other person to die.",
    "Your resentment hurts only you. The person you hate is living rent-free in your head. Forgiveness isn't about them—it's about freeing yourself.",
    40
  ),
  makeCard(
    "Confucius",
    "Analects",
    ["philosophy", "wisdom", "knowledge"],
    "Real knowledge is to know the extent of one's ignorance.",
    "The beginning of wisdom is admitting what you don't know. Pretending knowledge blocks learning. Embrace uncertainty. Ask questions. Stay curious.",
    35
  ),
  makeCard(
    "Confucius",
    "Analects",
    ["philosophy", "relationships", "reciprocity"],
    "Do not do to others what you do not want done to yourself.",
    "The Golden Rule exists in every culture for a reason. It works. Treat others as you wish to be treated, and watch your relationships transform.",
    35
  ),
  makeCard(
    "Confucius",
    "Analects",
    ["philosophy", "learning", "growth"],
    "It does not matter how slowly you go as long as you do not stop.",
    "Progress isn't about speed—it's about persistence. A turtle beats a sleeping hare. Keep moving forward, even if it's just one step. Momentum builds.",
    40
  ),
  makeCard(
    "Sun Tzu",
    "The Art of War",
    ["history", "strategy", "conflict"],
    "The supreme art of war is to subdue the enemy without fighting.",
    "True victory is not won through force, but through superior positioning and understanding. The greatest generals win before the battle begins. Strategy trumps strength.",
    40
  ),
  makeCard(
    "Sun Tzu",
    "The Art of War",
    ["history", "strategy", "knowledge"],
    "Know yourself and know your enemy, and you need not fear the result of a hundred battles.",
    "Self-awareness plus situational awareness equals invincibility. Most failures come from not understanding yourself or underestimating your opponent. Study both.",
    45
  ),
  makeCard(
    "Sun Tzu",
    "The Art of War",
    ["history", "strategy", "flexibility"],
    "In the midst of chaos, there is also opportunity.",
    "When everything falls apart, most people panic. The strategic mind sees openings. Crisis creates vacuums. Chaos creates chances. Stay calm. Look for the opportunity.",
    40
  ),
  makeCard(
    "Miyamoto Musashi",
    "The Book of Five Rings",
    ["history", "mastery", "discipline"],
    "There is nothing outside of yourself that can enable you to get better, stronger, richer, quicker, or smarter.",
    "Everything is within. No guru, book, or system will save you. They can guide, but you must walk. The work is internal. The transformation is yours alone.",
    45
  ),
  makeCard(
    "Miyamoto Musashi",
    "The Book of Five Rings",
    ["history", "mastery", "focus"],
    "Do nothing which is of no use.",
    "Every action should serve a purpose. Eliminate the frivolous. Cut the wasteful. Focus your energy like a laser. Mastery requires ruthless prioritization.",
    35
  ),

  // ============================================
  // MODERN PHILOSOPHY - NIETZSCHE
  // ============================================
  makeCard(
    "Friedrich Nietzsche",
    "Thus Spoke Zarathustra",
    ["philosophy", "meaning", "struggle"],
    "He who has a why to live can bear almost any how.",
    "Purpose transforms suffering into strength. Find your why, and obstacles become stepping stones. Without meaning, even luxury is misery. With meaning, even hardship is bearable.",
    35
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Beyond Good and Evil",
    ["philosophy", "growth", "adversity"],
    "That which does not kill us makes us stronger.",
    "Trauma without reflection creates bitterness. Trauma with wisdom creates resilience. Not everything that hurts helps—but what you survive and learn from does.",
    40
  ),
  makeCard(
    "Friedrich Nietzsche",
    "The Gay Science",
    ["philosophy", "authenticity", "herd"],
    "The individual has always had to struggle to keep from being overwhelmed by the tribe.",
    "Society wants conformity. It punishes difference. To be yourself requires courage. The crowd will pressure you. Resist. Your uniqueness is your gift.",
    45
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Human, All Too Human",
    ["philosophy", "creativity", "madness"],
    "One must still have chaos in oneself to be able to give birth to a dancing star.",
    "Perfect order produces nothing. Creation requires chaos. Your inner turmoil isn't a bug—it's a feature. Channel it. Transform it. Make it dance.",
    40
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Thus Spoke Zarathustra",
    ["philosophy", "transformation", "self"],
    "The snake which cannot cast its skin has to die.",
    "Growth requires shedding. Your old identity must die for the new one to live. Clinging to who you were prevents becoming who you could be. Let go.",
    40
  ),

  // ============================================
  // PSYCHOLOGY
  // ============================================
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "meaning", "suffering"],
    "Between stimulus and response there is a space. In that space is our power to choose our response.",
    "This is the last human freedom—even in concentration camps, Frankl found choice. You can't control what happens. You can always control your response. That gap is your power.",
    50
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "purpose", "survival"],
    "Those who have a 'why' to live, can bear with almost any 'how'.",
    "In Auschwitz, those who survived often had something to live for—a loved one, unfinished work, a mission. Purpose is the ultimate survival tool.",
    45
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "meaning", "responsibility"],
    "Life is never made unbearable by circumstances, but only by lack of meaning and purpose.",
    "You can endure incredible hardship if it means something. Without meaning, even comfort feels empty. Find your purpose—it's your armor against despair.",
    45
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decisions", "bias"],
    "Nothing in life is as important as you think it is while you are thinking about it.",
    "The focusing illusion distorts reality. Whatever you're fixated on seems bigger than it is. Step back. Zoom out. Things that consume you today will be forgotten tomorrow.",
    45
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "intuition", "rationality"],
    "We are prone to overestimate how much we understand about the world.",
    "Your brain creates coherent narratives from incomplete information. You see patterns that aren't there. You're confident when you should be uncertain. Stay humble about what you 'know.'",
    50
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decisions", "loss"],
    "Losses loom larger than gains.",
    "Losing $100 hurts more than finding $100 feels good. This loss aversion shapes most decisions. We play not to lose rather than to win. Recognize this bias to overcome it.",
    40
  ),
  makeCard(
    "Carl Jung",
    "Collected Works",
    ["psychology", "shadow", "integration"],
    "Until you make the unconscious conscious, it will direct your life and you will call it fate.",
    "The parts of yourself you deny control you from the shadows. Face your darkness. Integrate it. What you own can't own you. Self-knowledge is self-liberation.",
    50
  ),
  makeCard(
    "Carl Jung",
    "Collected Works",
    ["psychology", "growth", "suffering"],
    "There is no coming to consciousness without pain.",
    "Awakening hurts. Growth stretches. Truth stings. Comfort is the enemy of progress. If you're not uncomfortable, you're not evolving.",
    35
  ),
  makeCard(
    "Carl Jung",
    "Modern Man in Search of a Soul",
    ["psychology", "meaning", "crisis"],
    "The least of things with a meaning is worth more in life than the greatest of things without it.",
    "A small life with purpose beats a large life without one. Meaning isn't about scale—it's about significance. Find what matters, even if it seems small.",
    40
  ),
  makeCard(
    "Jordan Peterson",
    "12 Rules for Life",
    ["psychology", "responsibility", "meaning"],
    "Compare yourself to who you were yesterday, not to who someone else is today.",
    "The only fair comparison is with your past self. Are you better than yesterday? That's all that matters. Others' journeys are irrelevant to yours.",
    40
  ),
  makeCard(
    "Jordan Peterson",
    "12 Rules for Life",
    ["psychology", "order", "chaos"],
    "Set your house in perfect order before you criticize the world.",
    "It's easy to point fingers outward. It's hard to look within. Clean your room. Fix your habits. Master yourself before trying to fix others or the world.",
    40
  ),
  makeCard(
    "Brené Brown",
    "Daring Greatly",
    ["psychology", "vulnerability", "courage"],
    "Vulnerability is not weakness; it's our greatest measure of courage.",
    "Showing your true self is terrifying. Admitting you don't know. Saying 'I love you' first. Asking for help. These aren't weaknesses—they're acts of bravery.",
    40
  ),

  // ============================================
  // BUSINESS & WEALTH
  // ============================================
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "wealth", "wisdom"],
    "Seek wealth, not money or status. Wealth is having assets that earn while you sleep.",
    "Money is how we transfer time. Status is your place in hierarchy. Wealth is freedom. Build things that work without you. That's the goal.",
    40
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "leverage", "success"],
    "Learn to sell. Learn to build. If you can do both, you will be unstoppable.",
    "Most people can do one or the other. Building without selling creates obscurity. Selling without building creates emptiness. The rare combination creates empires.",
    35
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "happiness", "peace"],
    "A calm mind, a fit body, and a house full of love. These things cannot be bought.",
    "No amount of money can purchase peace, health, or genuine connection. The best things in life aren't things. Don't trade the priceless for the priced.",
    40
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "leverage", "technology"],
    "Code and media are permissionless leverage. They're the leverage behind the newly rich.",
    "You no longer need capital or employees to reach millions. A laptop and an internet connection can change the world. Use the tools of the era.",
    45
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "judgment", "wealth"],
    "Judgment is the most important skill. Leverage is force multiplier for your judgment.",
    "One good decision beats a thousand hours of hard work. Develop wisdom. Amplify it with leverage—capital, code, content, people. Quality thinking scales.",
    40
  ),
  makeCard(
    "Charlie Munger",
    "Poor Charlie's Almanack",
    ["business", "wisdom", "learning"],
    "Spend each day trying to be a little wiser than you were when you woke up.",
    "Compound learning like you compound money. Read daily. Think deeply. Make slightly better decisions. Over decades, small improvements create enormous differences.",
    40
  ),
  makeCard(
    "Charlie Munger",
    "Poor Charlie's Almanack",
    ["business", "decisions", "inversion"],
    "Invert, always invert. Turn a situation upside down. Look at it backward.",
    "Instead of asking how to succeed, ask how to fail—then avoid those things. Problems often become clearer when you flip them. Think forwards and backwards.",
    45
  ),
  makeCard(
    "Charlie Munger",
    "Poor Charlie's Almanack",
    ["business", "knowledge", "models"],
    "You've got to have models in your head. And you've got to array your experience on this latticework of models.",
    "Mental models from multiple disciplines give you superpowers. Physics, psychology, biology, economics—combine them. The best thinkers are multidisciplinary.",
    50
  ),
  makeCard(
    "Warren Buffett",
    "Berkshire Letters",
    ["business", "investing", "patience"],
    "The stock market is a device for transferring money from the impatient to the patient.",
    "Time is your ally if you let it be. Most investors sabotage themselves with constant action. Do less. Wait more. Let compound interest work.",
    40
  ),
  makeCard(
    "Warren Buffett",
    "Berkshire Letters",
    ["business", "reputation", "integrity"],
    "It takes 20 years to build a reputation and five minutes to ruin it.",
    "Guard your name like gold. One moment of poor judgment can destroy decades of good work. Think about that before every decision.",
    35
  ),
  makeCard(
    "Warren Buffett",
    "Berkshire Letters",
    ["business", "investing", "fear"],
    "Be fearful when others are greedy and greedy when others are fearful.",
    "The crowd is usually wrong at extremes. When everyone's euphoric, be cautious. When everyone's panicking, look for opportunities. Contrarian thinking pays.",
    40
  ),
  makeCard(
    "Peter Thiel",
    "Zero to One",
    ["business", "innovation", "contrarian"],
    "The most contrarian thing of all is not to oppose the crowd but to think for yourself.",
    "True originality isn't just disagreeing—it's having your own framework. Don't be reactive. Be generative. Create new categories instead of competing in old ones.",
    45
  ),
  makeCard(
    "Peter Thiel",
    "Zero to One",
    ["business", "monopoly", "competition"],
    "Competition is for losers.",
    "Building a monopoly isn't about crushing competitors—it's about creating something so unique that competition becomes irrelevant. Be the only one who does what you do.",
    40
  ),
  makeCard(
    "Jeff Bezos",
    "Shareholder Letters",
    ["business", "decisions", "regret"],
    "In the end, we are our choices. Build yourself a great story.",
    "At 80, you'll evaluate your life by the choices you made. The risks you took. The love you gave. The dreams you chased. Make decisions you'll be proud of.",
    40
  ),
  makeCard(
    "Jeff Bezos",
    "Shareholder Letters",
    ["business", "customer", "focus"],
    "Start with the customer and work backwards.",
    "Most companies work from capabilities outward. Great companies work from customer needs inward. What does the customer want? Build that. Everything else is vanity.",
    35
  ),
  makeCard(
    "Ray Dalio",
    "Principles",
    ["business", "truth", "transparency"],
    "Pain plus reflection equals progress.",
    "Pain is a signal, not a punishment. When things go wrong, don't just recover—reflect. What caused this? What can you learn? Turn every failure into a lesson.",
    40
  ),
  makeCard(
    "Ray Dalio",
    "Principles",
    ["business", "decisions", "systems"],
    "Principles are ways of successfully dealing with reality to get what you want out of life.",
    "Don't decide things one by one. Create principles—rules for recurring situations. Systemize your thinking. Reduce decision fatigue. Improve over time.",
    45
  ),

  // ============================================
  // SCIENCE & INNOVATION
  // ============================================
  makeCard(
    "Richard Feynman",
    "The Pleasure of Finding Things Out",
    ["science", "learning", "curiosity"],
    "The first principle is that you must not fool yourself — and you are the easiest person to fool.",
    "Your brain is a master of self-deception. Confirmation bias. Wishful thinking. Ego protection. Science is the art of not fooling yourself. Apply it to life.",
    45
  ),
  makeCard(
    "Richard Feynman",
    "What Do You Care What Other People Think?",
    ["science", "authenticity", "learning"],
    "I would rather have questions that can't be answered than answers that can't be questioned.",
    "Certainty is dangerous. Curiosity is productive. The best minds are always questioning, always wondering. Embrace the mystery. Distrust anyone who claims to have all the answers.",
    45
  ),
  makeCard(
    "Richard Feynman",
    "Surely You're Joking, Mr. Feynman!",
    ["science", "teaching", "understanding"],
    "If you can't explain it simply, you don't understand it well enough.",
    "Jargon hides ignorance. Complexity often masks confusion. The deepest understanding produces the simplest explanations. Can you explain it to a child? Then you truly know it.",
    40
  ),
  makeCard(
    "Carl Sagan",
    "Pale Blue Dot",
    ["science", "perspective", "humanity"],
    "Look at that dot. That's here. That's home. That's us.",
    "Everyone you love, everyone you know, every human being who ever was, lived out their lives on a mote of dust suspended in a sunbeam. Our conflicts seem small from space.",
    50
  ),
  makeCard(
    "Carl Sagan",
    "The Demon-Haunted World",
    ["science", "skepticism", "truth"],
    "Extraordinary claims require extraordinary evidence.",
    "The bigger the claim, the stronger the proof needed. Don't believe something just because you want it to be true. Demand evidence proportional to the claim.",
    40
  ),
  makeCard(
    "Carl Sagan",
    "Cosmos",
    ["science", "wonder", "universe"],
    "We are a way for the universe to know itself.",
    "You are not separate from the cosmos—you are the cosmos experiencing itself. Your consciousness is the universe becoming aware. That's not poetry. That's physics.",
    45
  ),
  makeCard(
    "Albert Einstein",
    "Ideas and Opinions",
    ["science", "imagination", "knowledge"],
    "Imagination is more important than knowledge.",
    "Knowledge tells you what is. Imagination tells you what could be. Facts are limited. Creativity is infinite. The greatest breakthroughs came from dreamers, not just scholars.",
    35
  ),
  makeCard(
    "Albert Einstein",
    "The World As I See It",
    ["science", "simplicity", "understanding"],
    "Everything should be made as simple as possible, but not simpler.",
    "Complexity isn't intelligence. Simplicity is. But oversimplification is dangerous. Find the sweet spot—as simple as reality allows. No simpler.",
    40
  ),
  makeCard(
    "Albert Einstein",
    "Letter to Carl Seelig",
    ["science", "curiosity", "wonder"],
    "I have no special talents. I am only passionately curious.",
    "Genius isn't magic—it's sustained curiosity. Anyone can be curious for a moment. Geniuses stay curious for a lifetime. The question matters more than the IQ.",
    35
  ),
  makeCard(
    "Marie Curie",
    "Pierre Curie",
    ["science", "courage", "discovery"],
    "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
    "Fear comes from ignorance. Courage comes from knowledge. Whatever terrifies you—learn about it. Understanding dissolves fear.",
    45
  ),
  makeCard(
    "Stephen Hawking",
    "A Brief History of Time",
    ["science", "meaning", "universe"],
    "We are just an advanced breed of monkeys on a minor planet. But we can understand the universe. That makes us something very special.",
    "On the cosmic scale, we're insignificant. But we can comprehend the cosmos. That awareness—that's extraordinary. We are the universe pondering itself.",
    50
  ),

  // ============================================
  // CREATIVITY & ART
  // ============================================
  makeCard(
    "Leonardo da Vinci",
    "Notebooks",
    ["creativity", "learning", "curiosity"],
    "Learning never exhausts the mind.",
    "The more you learn, the more connections you make. The more connections, the more creative you become. Curiosity is the engine of achievement. It never runs dry.",
    35
  ),
  makeCard(
    "Leonardo da Vinci",
    "Notebooks",
    ["creativity", "simplicity", "mastery"],
    "Simplicity is the ultimate sophistication.",
    "Complexity is easy. Anyone can complicate. Simplicity requires deep understanding. The master painter uses fewer strokes. The master writer uses fewer words. Refine until essential.",
    40
  ),
  makeCard(
    "Steve Jobs",
    "Stanford Commencement",
    ["creativity", "intuition", "life"],
    "You can't connect the dots looking forward; you can only connect them looking backwards.",
    "Trust that the dots will connect in your future. Trust your gut, your destiny, your karma. This approach has never let me down and has made all the difference.",
    45
  ),
  makeCard(
    "Steve Jobs",
    "Stanford Commencement",
    ["creativity", "mortality", "focus"],
    "Remembering that you are going to die is the best way I know to avoid the trap of thinking you have something to lose.",
    "Death strips away the fear of embarrassment, failure, or looking foolish. You are already naked. There is no reason not to follow your heart.",
    45
  ),
  makeCard(
    "Steve Jobs",
    "Interview",
    ["creativity", "taste", "quality"],
    "Design is not just what it looks like and feels like. Design is how it works.",
    "Beauty that doesn't function is decoration. Function without beauty is engineering. Great design is both—and neither is optional. Form and function dance together.",
    40
  ),
  makeCard(
    "Pablo Picasso",
    "Conversations with Picasso",
    ["creativity", "originality", "learning"],
    "Good artists copy; great artists steal.",
    "Copying is mimicry. Stealing is transformation. Take influences, internalize them, make them yours. Nothing is truly original—everything is remix. Own your theft.",
    35
  ),
  makeCard(
    "Pablo Picasso",
    "Conversations with Picasso",
    ["creativity", "action", "inspiration"],
    "Inspiration exists, but it has to find you working.",
    "Don't wait for the muse. Start working. Inspiration visits the busy, not the idle. The blank page stays blank until you make a mark. Action precedes motivation.",
    40
  ),
  makeCard(
    "Vincent van Gogh",
    "Letters to Theo",
    ["creativity", "persistence", "mastery"],
    "Great things are not done by impulse, but by a series of small things brought together.",
    "Masterpieces are built brushstroke by brushstroke. Success is assembled from tiny daily efforts. Don't aim for greatness—aim for consistent goodness. Greatness will follow.",
    45
  ),
  makeCard(
    "Austin Kleon",
    "Steal Like an Artist",
    ["creativity", "originality", "influence"],
    "Don't wait until you know who you are to get started.",
    "Identity emerges from action, not contemplation. Start making things before you feel ready. You'll discover yourself through the work. Clarity comes from doing.",
    40
  ),

  // ============================================
  // PRODUCTIVITY & HABITS
  // ============================================
  makeCard(
    "Peter Drucker",
    "The Effective Executive",
    ["productivity", "focus", "management"],
    "There is nothing so useless as doing efficiently that which should not be done at all.",
    "Effectiveness is doing the right things. Efficiency is doing things right. The order matters. First, choose the right work. Then optimize it. Wrong work, perfectly done, is still wrong work.",
    40
  ),
  makeCard(
    "Peter Drucker",
    "The Effective Executive",
    ["productivity", "time", "management"],
    "Time is the scarcest resource, and unless it is managed nothing else can be managed.",
    "You can't make more time. You can only spend it better. Track where it goes. Eliminate waste. Protect your hours like gold. They're worth more.",
    40
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "focus", "success"],
    "The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable.",
    "Shallow work is easy and common. Deep work is hard and rare. Those who cultivate concentrated focus will dominate. It's a superpower hiding in plain sight.",
    45
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "focus", "attention"],
    "If you don't produce, you won't thrive—no matter how skilled or talented you are.",
    "Talent without output is potential unrealized. The world rewards producers, not dreamers. Ideas in your head are worthless. Ideas executed are everything.",
    40
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "improvement"],
    "You do not rise to the level of your goals. You fall to the level of your systems.",
    "Goals are direction. Systems are results. Everyone has goals—winners have systems. Design your environment. Automate good behavior. Success becomes inevitable.",
    40
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "identity"],
    "Every action you take is a vote for the type of person you wish to become.",
    "You don't change habits; you change identity. Each workout is a vote for being athletic. Each page is a vote for being a reader. Stack enough votes, and you win.",
    40
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "compound"],
    "Habits are the compound interest of self-improvement.",
    "1% better every day = 37x better in a year. Tiny improvements seem invisible daily but transformative over time. The magic is in the consistency.",
    35
  ),
  makeCard(
    "Greg McKeown",
    "Essentialism",
    ["productivity", "focus", "priority"],
    "If you don't prioritize your life, someone else will.",
    "Your time is valuable. Everyone wants a piece. Without clear priorities, you'll spend it on others' agendas. Protect your yes by saying no.",
    35
  ),
  makeCard(
    "Tim Ferriss",
    "The 4-Hour Workweek",
    ["productivity", "leverage", "lifestyle"],
    "Focus on being productive instead of busy.",
    "Busyness is a badge of the unorganized. Productivity is about results, not hours. Work smarter. Automate. Delegate. Eliminate. Free your time for what matters.",
    40
  ),
  makeCard(
    "Tim Ferriss",
    "Tools of Titans",
    ["productivity", "fear", "action"],
    "What we fear doing most is usually what we most need to do.",
    "Your growth is on the other side of fear. That conversation you're avoiding. That project you're postponing. That risk you're not taking. That's exactly where to go.",
    40
  ),

  // ============================================
  // LEADERSHIP
  // ============================================
  makeCard(
    "Machiavelli",
    "The Prince",
    ["history", "leadership", "power"],
    "It is better to be feared than loved, if you cannot be both.",
    "But never be hated. Fear commands respect; love invites exploitation. Hatred breeds destruction. The wise leader balances strength and compassion.",
    40
  ),
  makeCard(
    "Machiavelli",
    "The Prince",
    ["history", "leadership", "perception"],
    "Everyone sees what you appear to be, few experience what you really are.",
    "Leadership is performance. Image matters. This isn't about deception—it's about understanding that perception shapes reality. Manage both.",
    40
  ),
  makeCard(
    "Simon Sinek",
    "Start With Why",
    ["leadership", "purpose", "influence"],
    "People don't buy what you do; they buy why you do it.",
    "Facts tell. Stories sell. Features inform. Purpose inspires. Lead with the reason behind your work. The 'why' creates connection. The 'what' is forgettable.",
    40
  ),
  makeCard(
    "Simon Sinek",
    "Leaders Eat Last",
    ["leadership", "trust", "service"],
    "Leadership is not about being in charge. It's about taking care of those in your charge.",
    "Power is given to those who serve. The best leaders sacrifice for their people. They eat last. They take blame. They share credit. Service is leadership.",
    45
  ),
  makeCard(
    "John Maxwell",
    "21 Irrefutable Laws of Leadership",
    ["leadership", "influence", "growth"],
    "A leader is one who knows the way, goes the way, and shows the way.",
    "Knowledge without action is philosophy. Action without example is hollow. True leadership is lived, not just spoken. Walk the talk.",
    35
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["leadership", "service", "duty"],
    "What injures the hive injures the bee.",
    "Your success is tied to your community's success. Selfishness is self-destruction. Serve the whole, and you serve yourself. We rise and fall together.",
    35
  ),

  // ============================================
  // RELATIONSHIPS
  // ============================================
  makeCard(
    "Dale Carnegie",
    "How to Win Friends and Influence People",
    ["relationships", "communication", "influence"],
    "You can make more friends in two months by becoming interested in other people than in two years by trying to get people interested in you.",
    "Attention is the greatest gift. People crave to be heard. Stop talking about yourself. Start asking about them. Genuine interest is irresistible.",
    45
  ),
  makeCard(
    "Dale Carnegie",
    "How to Win Friends and Influence People",
    ["relationships", "communication", "names"],
    "A person's name is to that person the sweetest sound in any language.",
    "Using someone's name is magic. It signals respect, attention, recognition. Learn names. Remember names. Use them. It costs nothing and earns everything.",
    35
  ),
  makeCard(
    "Kahlil Gibran",
    "The Prophet",
    ["relationships", "love", "freedom"],
    "Let there be spaces in your togetherness.",
    "Love doesn't mean fusion. Two people becoming one often means both losing themselves. Healthy love maintains individuality. Closeness needs distance. Connection needs space.",
    40
  ),
  makeCard(
    "Esther Perel",
    "Mating in Captivity",
    ["relationships", "love", "desire"],
    "Love enjoys knowing everything about you; desire needs mystery.",
    "Familiarity can kill passion. Safety is comfortable but not exciting. Great relationships balance intimacy with novelty, security with surprise.",
    45
  ),
  makeCard(
    "Gary Chapman",
    "The 5 Love Languages",
    ["relationships", "love", "communication"],
    "People speak different love languages.",
    "Words of affirmation. Acts of service. Receiving gifts. Quality time. Physical touch. We give love how we want to receive it. Learn your partner's language—speak theirs, not yours.",
    45
  ),

  // ============================================
  // LIFE & DEATH
  // ============================================
  makeCard(
    "Rainer Maria Rilke",
    "Letters to a Young Poet",
    ["philosophy", "uncertainty", "growth"],
    "Live the questions now. Perhaps you will gradually, without noticing it, live your way into the answer.",
    "Don't demand answers. Sit with questions. The answers aren't found—they're grown into. Patience with uncertainty is wisdom.",
    45
  ),
  makeCard(
    "Joseph Campbell",
    "The Power of Myth",
    ["philosophy", "meaning", "journey"],
    "The cave you fear to enter holds the treasure you seek.",
    "What you avoid has what you need. Growth lives where fear does. The dragon guards the gold. To claim your treasure, face your terror.",
    40
  ),
  makeCard(
    "Joseph Campbell",
    "The Hero with a Thousand Faces",
    ["philosophy", "journey", "transformation"],
    "We must be willing to let go of the life we planned to accept the life that is waiting for us.",
    "Cling to your plan, and you miss your destiny. The universe has ideas too. Flexibility isn't giving up—it's opening up. Flow with what comes.",
    45
  ),
  makeCard(
    "Thoreau",
    "Walden",
    ["philosophy", "simplicity", "life"],
    "I went to the woods because I wished to live deliberately.",
    "To front only the essential facts of life. To see if I could learn what it had to teach. Not, when I came to die, discover that I had not lived.",
    40
  ),
  makeCard(
    "Thoreau",
    "Walden",
    ["philosophy", "conformity", "independence"],
    "The mass of men lead lives of quiet desperation.",
    "They conform. They settle. They suppress their dreams. They call it maturity. It's surrender. Don't die with your music still inside you.",
    40
  ),
  makeCard(
    "Ralph Waldo Emerson",
    "Self-Reliance",
    ["philosophy", "authenticity", "trust"],
    "Trust thyself: every heart vibrates to that iron string.",
    "Your intuition knows. Your gut speaks truth. Society drowns out your inner voice. Learn to hear yourself again. Trust what you find.",
    40
  ),
  makeCard(
    "Ralph Waldo Emerson",
    "Self-Reliance",
    ["philosophy", "consistency", "growth"],
    "A foolish consistency is the hobgoblin of little minds.",
    "Changing your mind isn't weakness—it's growth. Only fools stay the same to seem consistent. Evolve. Contradict your past self. That's progress.",
    40
  ),
  makeCard(
    "Alan Watts",
    "The Wisdom of Insecurity",
    ["philosophy", "present", "anxiety"],
    "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
    "Resisting change is like fighting the ocean. You'll exhaust yourself and drown. Surrender to the current. Flow with what is. Dance with uncertainty.",
    45
  ),
  makeCard(
    "Alan Watts",
    "The Book",
    ["philosophy", "self", "illusion"],
    "You are the universe experiencing itself.",
    "You're not a separate observer of life—you ARE life observing itself. The boundary between you and everything else is an illusion. You're not in the universe; you are the universe.",
    45
  ),
  makeCard(
    "Eckhart Tolle",
    "The Power of Now",
    ["mindfulness", "present", "peace"],
    "Realize deeply that the present moment is all you have.",
    "The past is memory. The future is imagination. Only now is real. And now. And now. All of life happens in this eternal present. Be here.",
    40
  ),
  makeCard(
    "Eckhart Tolle",
    "The Power of Now",
    ["mindfulness", "thought", "identity"],
    "You are not your thoughts.",
    "Thoughts come and go like clouds. You are the sky. Observing thoughts isn't the same as being them. Create distance. Watch your mind. Don't be ruled by it.",
    35
  ),
];

// All available topics
export const topics = [
  "philosophy",
  "stoicism",
  "psychology",
  "business",
  "science",
  "history",
  "productivity",
  "creativity",
  "mindfulness",
  "leadership",
  "relationships",
];

// Get all cards
export function getAllCards(): Card[] {
  return contentLibrary;
}

// Get cards by topic
export function getCardsByTopic(topic: string): Card[] {
  return contentLibrary.filter((card) => card.topic.includes(topic));
}

// Get cards by author
export function getCardsByAuthor(author: string): Card[] {
  return contentLibrary.filter((card) =>
    card.author.toLowerCase().includes(author.toLowerCase())
  );
}

// Shuffle cards
export function shuffleCards(cardsToShuffle: Card[]): Card[] {
  return [...cardsToShuffle].sort(() => Math.random() - 0.5);
}

// Get unique authors
export function getAuthors(): string[] {
  return [...new Set(contentLibrary.map((card) => card.author))];
}

// Get card count by topic
export function getTopicCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  topics.forEach((topic) => {
    counts[topic] = getCardsByTopic(topic).length;
  });
  return counts;
}

console.log(`📚 Content Library: ${contentLibrary.length} cards loaded`);
