// Bloomscroll Card Data
// This will eventually come from Supabase

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

export const cards: Card[] = [
  // SENECA
  {
    id: "1",
    author: "Seneca",
    book: "On the Shortness of Life",
    topic: ["philosophy", "stoicism", "time"],
    insight: "It is not that we have a short time to live, but that we waste a lot of it. Life is long enough, and a sufficiently generous amount has been given to us for the highest achievements if it were all well invested.",
    quote: "It is not that we have a short time to live, but that we waste a lot of it.",
    image_url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800",
    read_time_seconds: 45
  },
  {
    id: "2",
    author: "Seneca",
    book: "Letters from a Stoic",
    topic: ["philosophy", "stoicism", "wisdom"],
    insight: "We suffer more often in imagination than in reality. The mind creates problems that don't exist, fears outcomes that may never happen. Master your thoughts, and you master your life.",
    quote: "We suffer more often in imagination than in reality.",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    read_time_seconds: 40
  },
  {
    id: "3",
    author: "Seneca",
    book: "On the Happy Life",
    topic: ["philosophy", "stoicism", "happiness"],
    insight: "True happiness is to enjoy the present, without anxious dependence upon the future. It's not about what you have, but how you relate to what you have. Contentment comes from within.",
    quote: "True happiness is to enjoy the present, without anxious dependence upon the future.",
    image_url: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800",
    read_time_seconds: 45
  },

  // MARCUS AURELIUS
  {
    id: "4",
    author: "Marcus Aurelius",
    book: "Meditations",
    topic: ["philosophy", "stoicism", "mindset"],
    insight: "You have power over your mind — not outside events. Realize this, and you will find strength. The world will throw chaos at you; your response is the only thing you control.",
    quote: "You have power over your mind — not outside events. Realize this, and you will find strength.",
    image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800",
    read_time_seconds: 40
  },
  {
    id: "5",
    author: "Marcus Aurelius",
    book: "Meditations",
    topic: ["philosophy", "stoicism", "action"],
    insight: "Waste no more time arguing about what a good man should be. Be one. Philosophy is not about words — it's about action. Stop debating virtue and start living it.",
    quote: "Waste no more time arguing about what a good man should be. Be one.",
    image_url: "https://images.unsplash.com/photo-1490730141103-6cac27abb37f?w=800",
    read_time_seconds: 35
  },
  {
    id: "6",
    author: "Marcus Aurelius",
    book: "Meditations",
    topic: ["philosophy", "stoicism", "perspective"],
    insight: "The object of life is not to be on the side of the majority, but to escape finding oneself in the ranks of the insane. Think independently. Question consensus. Find your own truth.",
    quote: "The object of life is not to be on the side of the majority.",
    image_url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800",
    read_time_seconds: 40
  },
  {
    id: "7",
    author: "Marcus Aurelius",
    book: "Meditations",
    topic: ["philosophy", "stoicism", "mortality"],
    insight: "Think of yourself as dead. You have lived your life. Now take what's left and live it properly. Death gives life meaning. Use this awareness to cut through the trivial and focus on what matters.",
    quote: "Think of yourself as dead. You have lived your life. Now take what's left and live it properly.",
    image_url: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800",
    read_time_seconds: 45
  },

  // EPICTETUS
  {
    id: "8",
    author: "Epictetus",
    book: "Enchiridion",
    topic: ["philosophy", "stoicism", "control"],
    insight: "Some things are within our power, while others are not. Within our power are opinion, motivation, desire, aversion — whatever is our own doing. Not within our power are body, property, reputation, office.",
    quote: "Some things are within our power, while others are not.",
    image_url: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800",
    read_time_seconds: 50
  },
  {
    id: "9",
    author: "Epictetus",
    book: "Discourses",
    topic: ["philosophy", "stoicism", "resilience"],
    insight: "It's not what happens to you, but how you react to it that matters. The same event can devastate one person and strengthen another. You choose your response.",
    quote: "It's not what happens to you, but how you react to it that matters.",
    image_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800",
    read_time_seconds: 35
  },

  // PLATO
  {
    id: "10",
    author: "Plato",
    book: "The Republic",
    topic: ["philosophy", "knowledge", "truth"],
    insight: "We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light. Truth can be uncomfortable, but ignorance is far more dangerous.",
    quote: "The real tragedy of life is when men are afraid of the light.",
    image_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800",
    read_time_seconds: 40
  },
  {
    id: "11",
    author: "Plato",
    book: "Allegory of the Cave",
    topic: ["philosophy", "perception", "reality"],
    insight: "Most people live in shadows, mistaking them for reality. Breaking free means questioning everything you've been told, even when the light hurts your eyes at first.",
    quote: "Most people live in shadows, mistaking them for reality.",
    image_url: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=800",
    read_time_seconds: 40
  },

  // ARISTOTLE
  {
    id: "12",
    author: "Aristotle",
    book: "Nicomachean Ethics",
    topic: ["philosophy", "habits", "excellence"],
    insight: "We are what we repeatedly do. Excellence, then, is not an act, but a habit. Your character is the sum of your daily choices. Small actions, repeated, become your destiny.",
    quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    image_url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
    read_time_seconds: 40
  },
  {
    id: "13",
    author: "Aristotle",
    book: "Politics",
    topic: ["philosophy", "purpose", "humanity"],
    insight: "Man is by nature a social animal. Anyone who either cannot lead the common life or is so self-sufficient as not to need to is either a beast or a god.",
    quote: "Man is by nature a social animal.",
    image_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    read_time_seconds: 35
  },

  // NIETZSCHE
  {
    id: "14",
    author: "Friedrich Nietzsche",
    book: "Thus Spoke Zarathustra",
    topic: ["philosophy", "meaning", "struggle"],
    insight: "He who has a why to live can bear almost any how. Purpose transforms suffering into strength. Find your why, and obstacles become stepping stones.",
    quote: "He who has a why to live can bear almost any how.",
    image_url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800",
    read_time_seconds: 35
  },
  {
    id: "15",
    author: "Friedrich Nietzsche",
    book: "Beyond Good and Evil",
    topic: ["philosophy", "growth", "adversity"],
    insight: "That which does not kill us makes us stronger. But only if we choose to learn from it. Trauma without reflection creates bitterness; trauma with wisdom creates resilience.",
    quote: "That which does not kill us makes us stronger.",
    image_url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
    read_time_seconds: 40
  },

  // MODERN THINKERS
  {
    id: "16",
    author: "Richard Feynman",
    book: "The Pleasure of Finding Things Out",
    topic: ["science", "learning", "curiosity"],
    insight: "The first principle is that you must not fool yourself — and you are the easiest person to fool. Question your assumptions. Test your beliefs. Stay curious, stay humble.",
    quote: "The first principle is that you must not fool yourself — and you are the easiest person to fool.",
    image_url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800",
    read_time_seconds: 45
  },
  {
    id: "17",
    author: "Carl Sagan",
    book: "Pale Blue Dot",
    topic: ["science", "perspective", "humanity"],
    insight: "Look at that dot. That's here. That's home. That's us. Everyone you love, everyone you know, every human being who ever was, lived out their lives on a mote of dust suspended in a sunbeam.",
    quote: "Everyone you love lived out their lives on a mote of dust suspended in a sunbeam.",
    image_url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
    read_time_seconds: 50
  },
  {
    id: "18",
    author: "Naval Ravikant",
    book: "The Almanack of Naval Ravikant",
    topic: ["business", "wealth", "wisdom"],
    insight: "Seek wealth, not money or status. Wealth is having assets that earn while you sleep. Money is how we transfer time and wealth. Status is your place in the social hierarchy.",
    quote: "Seek wealth, not money or status. Wealth is having assets that earn while you sleep.",
    image_url: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800",
    read_time_seconds: 40
  },
  {
    id: "19",
    author: "Naval Ravikant",
    book: "The Almanack of Naval Ravikant",
    topic: ["business", "leverage", "success"],
    insight: "Learn to sell. Learn to build. If you can do both, you will be unstoppable. Most people can do one or the other. The rare combination creates extraordinary outcomes.",
    quote: "Learn to sell. Learn to build. If you can do both, you will be unstoppable.",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    read_time_seconds: 35
  },

  // PSYCHOLOGY
  {
    id: "20",
    author: "Daniel Kahneman",
    book: "Thinking, Fast and Slow",
    topic: ["psychology", "decisions", "bias"],
    insight: "Nothing in life is as important as you think it is while you are thinking about it. The focusing illusion creates a cognitive mirage. Step back. Gain perspective. Then decide.",
    quote: "Nothing in life is as important as you think it is while you are thinking about it.",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    read_time_seconds: 45
  },
  {
    id: "21",
    author: "Viktor Frankl",
    book: "Man's Search for Meaning",
    topic: ["psychology", "meaning", "suffering"],
    insight: "Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom. This is the last human freedom.",
    quote: "Between stimulus and response there is a space. In that space is our power to choose.",
    image_url: "https://images.unsplash.com/photo-1489533119213-66a5cd877091?w=800",
    read_time_seconds: 50
  },

  // HISTORY
  {
    id: "22",
    author: "Sun Tzu",
    book: "The Art of War",
    topic: ["history", "strategy", "conflict"],
    insight: "The supreme art of war is to subdue the enemy without fighting. True victory is not won through force, but through superior positioning and understanding. Win before the battle begins.",
    quote: "The supreme art of war is to subdue the enemy without fighting.",
    image_url: "https://images.unsplash.com/photo-1555679427-1f6dfcce943b?w=800",
    read_time_seconds: 40
  },
  {
    id: "23",
    author: "Machiavelli",
    book: "The Prince",
    topic: ["history", "power", "leadership"],
    insight: "It is better to be feared than loved, if you cannot be both. But never be hated. Fear commands respect; love invites exploitation. Hatred breeds destruction.",
    quote: "It is better to be feared than loved, if you cannot be both.",
    image_url: "https://images.unsplash.com/photo-1519764622345-23439dd774f7?w=800",
    read_time_seconds: 40
  },
  {
    id: "24",
    author: "Miyamoto Musashi",
    book: "The Book of Five Rings",
    topic: ["history", "mastery", "discipline"],
    insight: "There is nothing outside of yourself that can ever enable you to get better, stronger, richer, quicker, or smarter. Everything is within. Everything exists. Seek nothing outside of yourself.",
    quote: "There is nothing outside of yourself that can ever enable you to get better.",
    image_url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800",
    read_time_seconds: 45
  },

  // CREATIVITY
  {
    id: "25",
    author: "Leonardo da Vinci",
    book: "Notebooks",
    topic: ["creativity", "learning", "curiosity"],
    insight: "Learning never exhausts the mind. The more you learn, the more connections you make, the more creative you become. Curiosity is the engine of achievement.",
    quote: "Learning never exhausts the mind.",
    image_url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
    read_time_seconds: 35
  },
  {
    id: "26",
    author: "Steve Jobs",
    book: "Stanford Commencement",
    topic: ["creativity", "intuition", "life"],
    insight: "You can't connect the dots looking forward; you can only connect them looking backwards. Trust that the dots will somehow connect in your future. Trust your gut, your destiny, your karma.",
    quote: "You can't connect the dots looking forward; you can only connect them looking backwards.",
    image_url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
    read_time_seconds: 45
  },

  // PRODUCTIVITY
  {
    id: "27",
    author: "Peter Drucker",
    book: "The Effective Executive",
    topic: ["productivity", "focus", "management"],
    insight: "There is nothing so useless as doing efficiently that which should not be done at all. Effectiveness is about doing the right things. Efficiency is about doing things right. Choose wisely.",
    quote: "There is nothing so useless as doing efficiently that which should not be done at all.",
    image_url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800",
    read_time_seconds: 40
  },
  {
    id: "28",
    author: "Cal Newport",
    book: "Deep Work",
    topic: ["productivity", "focus", "success"],
    insight: "The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable. Those who cultivate this skill will thrive.",
    quote: "Deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable.",
    image_url: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800",
    read_time_seconds: 40
  },

  // BONUS
  {
    id: "29",
    author: "Lao Tzu",
    book: "Tao Te Ching",
    topic: ["philosophy", "wisdom", "simplicity"],
    insight: "Nature does not hurry, yet everything is accomplished. The greatest wisdom comes from patience and following the natural flow of things. Force nothing. Allow everything.",
    quote: "Nature does not hurry, yet everything is accomplished.",
    image_url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800",
    read_time_seconds: 35
  },
  {
    id: "30",
    author: "Buddha",
    book: "Dhammapada",
    topic: ["philosophy", "mind", "peace"],
    insight: "The mind is everything. What you think you become. Your thoughts shape your reality. Guard your mind with vigilance, for it is the source of all suffering and all liberation.",
    quote: "The mind is everything. What you think you become.",
    image_url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    read_time_seconds: 40
  }
];

export const topics = [
  "philosophy",
  "stoicism", 
  "psychology",
  "business",
  "science",
  "history",
  "productivity",
  "creativity"
];

export function getCardsByTopic(topic: string): Card[] {
  return cards.filter(card => card.topic.includes(topic));
}

export function shuffleCards(cardsToShuffle: Card[]): Card[] {
  return [...cardsToShuffle].sort(() => Math.random() - 0.5);
}
