// Podcast & Audiobook snippets

export interface AudioSnippet {
  id: string;
  type: "podcast" | "audiobook";
  title: string;
  source: string; // Podcast name or book title
  speaker: string;
  quote: string;
  insight: string;
  topic: string[];
  duration: number; // seconds of the original clip
  audioUrl?: string; // optional hosted audio
  episodeUrl?: string; // link to full episode
  timestamp?: string; // "12:34" where quote appears
  coverImage?: string;
}

// Curated podcast/audiobook snippets
export const audioContent: AudioSnippet[] = [
  // Tim Ferriss Show
  {
    id: "audio_1",
    type: "podcast",
    title: "On Fear-Setting",
    source: "The Tim Ferriss Show",
    speaker: "Tim Ferriss",
    quote: "We suffer more often in imagination than in reality. Define your fears instead of your goals, and you'll see they're usually manageable.",
    insight: "Fear-setting is the antidote to fear. Name it, define the worst case, and plan the recovery.",
    topic: ["productivity", "psychology", "stoicism"],
    duration: 45,
    episodeUrl: "https://tim.blog/podcast/",
    coverImage: "https://i.scdn.co/image/ab6765630000ba8adf833cdf86cc3f94a4ebf6f4",
  },
  {
    id: "audio_2",
    type: "podcast",
    title: "The Power of Saying No",
    source: "The Tim Ferriss Show",
    speaker: "Derek Sivers",
    quote: "If it's not a 'Hell yes!' it's a no. We say yes to too many things we don't actually want to do.",
    insight: "Protect your time fiercely. Every yes to something mediocre is a no to something great.",
    topic: ["productivity", "decision-making"],
    duration: 30,
    episodeUrl: "https://tim.blog/podcast/",
    coverImage: "https://i.scdn.co/image/ab6765630000ba8adf833cdf86cc3f94a4ebf6f4",
  },
  
  // Huberman Lab
  {
    id: "audio_3",
    type: "podcast",
    title: "Morning Sunlight Protocol",
    source: "Huberman Lab",
    speaker: "Andrew Huberman",
    quote: "Getting 10-30 minutes of sunlight in your eyes within the first hour of waking sets your circadian rhythm and improves sleep, mood, and focus.",
    insight: "Your morning light exposure determines your evening sleep quality. It's free and evidence-based.",
    topic: ["health", "science", "productivity"],
    duration: 60,
    episodeUrl: "https://hubermanlab.com/",
    coverImage: "https://i.scdn.co/image/ab6765630000ba8a7eb74a4f3f7bc0c9a36f5b5d",
  },
  {
    id: "audio_4",
    type: "podcast",
    title: "Dopamine & Motivation",
    source: "Huberman Lab",
    speaker: "Andrew Huberman",
    quote: "Dopamine is not about pleasure, it's about pursuit. The anticipation of reward drives behavior more than the reward itself.",
    insight: "Hack your dopamine by celebrating the effort, not just the outcome.",
    topic: ["psychology", "science", "productivity"],
    duration: 55,
    episodeUrl: "https://hubermanlab.com/",
    coverImage: "https://i.scdn.co/image/ab6765630000ba8a7eb74a4f3f7bc0c9a36f5b5d",
  },
  
  // Lex Fridman
  {
    id: "audio_5",
    type: "podcast",
    title: "On Meaning and Suffering",
    source: "Lex Fridman Podcast",
    speaker: "Jordan Peterson",
    quote: "You can't have meaning without responsibility. The antidote to the suffering of life is to take on as much responsibility as you can.",
    insight: "Meaning comes from burden voluntarily accepted, not from comfort and ease.",
    topic: ["philosophy", "psychology"],
    duration: 40,
    episodeUrl: "https://lexfridman.com/podcast/",
    coverImage: "https://i.scdn.co/image/ab6765630000ba8a7f4d7d76c7e97e7f5c4a3f4c",
  },
  {
    id: "audio_6",
    type: "podcast",
    title: "First Principles Thinking",
    source: "Lex Fridman Podcast",
    speaker: "Elon Musk",
    quote: "Don't reason by analogy. Break things down to fundamental truths and reason up from there.",
    insight: "First principles thinking lets you see solutions others miss because they're trapped in conventional wisdom.",
    topic: ["innovation", "thinking", "business"],
    duration: 35,
    episodeUrl: "https://lexfridman.com/podcast/",
    coverImage: "https://i.scdn.co/image/ab6765630000ba8a7f4d7d76c7e97e7f5c4a3f4c",
  },
  
  // Naval Ravikant
  {
    id: "audio_7",
    type: "podcast",
    title: "Specific Knowledge",
    source: "The Knowledge Project",
    speaker: "Naval Ravikant",
    quote: "Specific knowledge is knowledge that you cannot be trained for. If society can train you, it can replace you.",
    insight: "Build skills at the intersection of your curiosity and talent. That's your unfair advantage.",
    topic: ["wealth", "career", "self-improvement"],
    duration: 50,
    episodeUrl: "https://nav.al/",
    coverImage: "https://i.scdn.co/image/ab6765630000ba8a4d5c3f8c2e5c7e9f6b3c1e5d",
  },
  {
    id: "audio_8",
    type: "podcast",
    title: "Happiness is a Skill",
    source: "The Joe Rogan Experience",
    speaker: "Naval Ravikant",
    quote: "Happiness is not something you achieve. It's something you practice. It's a skill like any other.",
    insight: "You can train your mind for happiness the same way you train your body for fitness.",
    topic: ["happiness", "mindfulness", "psychology"],
    duration: 45,
    episodeUrl: "https://nav.al/",
    coverImage: "https://i.scdn.co/image/ab6765630000ba8a4d5c3f8c2e5c7e9f6b3c1e5d",
  },
  
  // Audiobook excerpts
  {
    id: "audio_9",
    type: "audiobook",
    title: "The Obstacle is the Way",
    source: "The Obstacle Is the Way",
    speaker: "Ryan Holiday",
    quote: "The impediment to action advances action. What stands in the way becomes the way.",
    insight: "Every obstacle contains within it the seeds of its own solution. Look for the opportunity hidden in adversity.",
    topic: ["stoicism", "resilience", "philosophy"],
    duration: 40,
    coverImage: "https://images-na.ssl-images-amazon.com/images/I/51KgeQ-HJ6L._SX330_BO1,204,203,200_.jpg",
  },
  {
    id: "audio_10",
    type: "audiobook",
    title: "Deep Work Definition",
    source: "Deep Work",
    speaker: "Cal Newport",
    quote: "Deep work is the ability to focus without distraction on a cognitively demanding task. It's a skill that allows you to quickly master complicated information.",
    insight: "In an economy that rewards expertise, deep work is becoming both rare and valuable at exactly the same time.",
    topic: ["productivity", "focus", "career"],
    duration: 35,
    coverImage: "https://images-na.ssl-images-amazon.com/images/I/417yjuJ-hQL._SX331_BO1,204,203,200_.jpg",
  },
  {
    id: "audio_11",
    type: "audiobook",
    title: "The Compound Effect",
    source: "The Compound Effect",
    speaker: "Darren Hardy",
    quote: "Small, seemingly insignificant steps completed consistently over time will create a radical difference.",
    insight: "Success is not about grand gestures but about daily disciplines. 1% better every day compounds to 37x better in a year.",
    topic: ["success", "habits", "self-improvement"],
    duration: 30,
    coverImage: "https://images-na.ssl-images-amazon.com/images/I/51IXRW2G3eL._SX331_BO1,204,203,200_.jpg",
  },
  {
    id: "audio_12",
    type: "audiobook",
    title: "Ego is the Enemy",
    source: "Ego Is the Enemy",
    speaker: "Ryan Holiday",
    quote: "At any given time in life, you're either aspiring, succeeding, or failing. Ego is the enemy at every stage.",
    insight: "Ego prevents learning when aspiring, blinds us when succeeding, and embitters us when failing.",
    topic: ["stoicism", "leadership", "self-awareness"],
    duration: 45,
    coverImage: "https://images-na.ssl-images-amazon.com/images/I/41lVYGhrJgL._SX331_BO1,204,203,200_.jpg",
  },
  
  // More podcasts
  {
    id: "audio_13",
    type: "podcast",
    title: "The 4 Types of Luck",
    source: "The Knowledge Project",
    speaker: "Naval Ravikant",
    quote: "Luck comes in four forms: blind luck, luck from persistence, luck from skill, and luck from your unique character attracting opportunities.",
    insight: "You can manufacture luck by becoming so skilled and authentic that opportunities find you.",
    topic: ["success", "luck", "career"],
    duration: 55,
    episodeUrl: "https://nav.al/",
    coverImage: "https://i.scdn.co/image/ab6765630000ba8a4d5c3f8c2e5c7e9f6b3c1e5d",
  },
  {
    id: "audio_14",
    type: "podcast",
    title: "Non-Sleep Deep Rest",
    source: "Huberman Lab",
    speaker: "Andrew Huberman",
    quote: "NSDR protocols can restore mental and physical vigor, enhance learning, and reduce anxiety—all without the commitment of meditation.",
    insight: "20 minutes of NSDR is like a reset button for your brain. It's meditation for non-meditators.",
    topic: ["health", "productivity", "science"],
    duration: 50,
    episodeUrl: "https://hubermanlab.com/",
    coverImage: "https://i.scdn.co/image/ab6765630000ba8a7eb74a4f3f7bc0c9a36f5b5d",
  },
  {
    id: "audio_15",
    type: "podcast",
    title: "Writing as Thinking",
    source: "The Tim Ferriss Show",
    speaker: "Morgan Housel",
    quote: "Writing is not a way to express what you think. It's a way to figure out what you think. The act of writing forces clarity.",
    insight: "If you can't write it clearly, you don't understand it clearly. Writing is thinking made visible.",
    topic: ["writing", "thinking", "creativity"],
    duration: 40,
    episodeUrl: "https://tim.blog/podcast/",
    coverImage: "https://i.scdn.co/image/ab6765630000ba8adf833cdf86cc3f94a4ebf6f4",
  },
];

// Get all audio content as cards (for mixing into main feed)
export function getAudioAsCards() {
  return audioContent.map(a => ({
    id: `audio_${a.id}`,
    quote: a.quote,
    author: a.speaker,
    book: a.source,
    insight: a.insight,
    topic: a.topic,
    genre: "non-fiction" as const,
    image_url: a.coverImage || "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800",
    read_time_seconds: a.duration,
    isAudio: true,
    audioType: a.type,
    episodeUrl: a.episodeUrl,
    coverImage: a.coverImage,
    duration: a.duration,
  }));
}

// Get by type
export function getPodcasts() {
  return audioContent.filter(a => a.type === "podcast");
}

export function getAudiobooks() {
  return audioContent.filter(a => a.type === "audiobook");
}

// Get by speaker
export function getBySpeaker(speaker: string) {
  return audioContent.filter(a => a.speaker.toLowerCase().includes(speaker.toLowerCase()));
}

// Get by source
export function getBySource(source: string) {
  return audioContent.filter(a => a.source.toLowerCase().includes(source.toLowerCase()));
}
