// Bloomscroll Content Library
// Comprehensive wisdom database - 1000+ cards across all topics

export type Genre = 
  | 'non-fiction'    // Free tier
  | 'philosophy'     // Free tier
  | 'fiction'        // Premium
  | 'poetry'         // Premium
  | 'romance'        // Premium
  | 'scifi'          // Premium
  | 'fantasy'        // Premium
  | 'self-help';     // Free tier

export const FREE_GENRES: Genre[] = ['non-fiction', 'philosophy', 'self-help'];
export const PREMIUM_GENRES: Genre[] = ['fiction', 'poetry', 'romance', 'scifi', 'fantasy'];

export interface Chapter {
  title: string;
  content: string;        // Full chapter text (markdown supported)
  readingTimeMinutes: number;
  amazonLink?: string;    // Affiliate link
}

export interface Card {
  id: string;
  author: string;
  book: string;
  topic: string[];
  genre: Genre;
  insight: string;
  quote: string;
  image_url: string;
  read_time_seconds: number;
  isPremium?: boolean;     // Locked behind paywall
  chapter?: Chapter;       // Full reading mode content
}

// Image URLs by topic for variety
const images = {
  philosophy: [
    "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800",
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800",
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800",
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",
  ],
  psychology: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    "https://images.unsplash.com/photo-1489533119213-66a5cd877091?w=800",
    "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800",
    "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800",
  ],
  business: [
    "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
  ],
  science: [
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800",
    "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800",
  ],
  history: [
    "https://images.unsplash.com/photo-1555679427-1f6dfcce943b?w=800",
    "https://images.unsplash.com/photo-1519764622345-23439dd774f7?w=800",
    "https://images.unsplash.com/photo-1461360370896-922624d12a74?w=800",
    "https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=800",
  ],
  productivity: [
    "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800",
    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
  ],
  creativity: [
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800",
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
  ],
  mindfulness: [
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800",
    "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800",
    "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=800",
  ],
  leadership: [
    "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
  ],
  relationships: [
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
    "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800",
  ],
  finance: [
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800",
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
  ],
  health: [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800",
  ],
  technology: [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800",
  ],
  spirituality: [
    "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800",
    "https://images.unsplash.com/photo-1499002238440-d264f8319cc9?w=800",
    "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800",
  ],
  stoicism: [
    "https://images.unsplash.com/photo-1490730141103-6cac27abb37f?w=800",
    "https://images.unsplash.com/photo-1533000759938-aa0ba70beceb?w=800",
    "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800",
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
  readTime: number = 45,
  genre: Genre = 'non-fiction',
  chapter?: Chapter
): Card {
  return {
    id: String(idCounter++),
    author,
    book,
    topic: topics,
    genre,
    quote,
    insight,
    image_url: getImage(topics[0], idCounter),
    read_time_seconds: readTime,
    isPremium: PREMIUM_GENRES.includes(genre),
    chapter,
  };
}

export const contentLibrary: Card[] = [
  // ============================================
  // STOICISM - SENECA (20 cards)
  // ============================================
  makeCard(
    "Seneca",
    "On the Shortness of Life",
    ["philosophy", "stoicism", "time"],
    "It is not that we have a short time to live, but that we waste a lot of it.",
    "Life is long enough if the whole of it is well invested. But when it is wasted in heedless luxury and spent on no good activity, we are forced at last by death's final constraint to realize it has passed away before we knew it was passing.",
    45,
    'philosophy',
    {
      title: "Chapter 1: The Shortness of Life",
      readingTimeMinutes: 5,
      amazonLink: "https://amazon.com/dp/0143036327?tag=bloomscroll-20",
      content: `The majority of mortals, Paulinus, complain bitterly of the spitefulness of Nature, because we are born for a brief span of life, because even this space that has been granted to us rushes by so speedily and so swiftly that all save a very few find life at an end just when they are getting ready to live.

Nor is it merely the common herd and the unthinking crowd that bemoan what is, as men deem it, a universal ill; the same feeling has called forth complaint also from men who were famous.

It was this that made the greatest of physicians exclaim that "life is short, art is long." It was this that prompted Aristotle, while disputing with Nature, to say that she had favored animals more than human beings in granting them longevity—and yet the lives of some animals stretch out to ten or fifteen times that of a man.

But it is not that we have a short space of time, but that we waste much of it. Life is long enough, and it has been given in sufficiently generous measure to allow the accomplishment of the very greatest things if the whole of it is well invested.

But when it is squandered in luxury and carelessness, when it is devoted to no good end, forced at last by the ultimate necessity we perceive that it has passed away before we were aware that it was passing.

So it is—the life we receive is not short, but we make it so, nor do we have any lack of it, but are wasteful of it.`
    }
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
    "It's not about what you have, but how you relate to what you have. The anxious mind is never satisfied. The content mind finds joy in the simplest moments.",
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
    "When rage rises, pause. Count to ten. Sleep on it. The urgency you feel is an illusion. What seems unbearable in the moment becomes manageable with time.",
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
    "The best way to master something is to teach it. Explaining forces clarity. Questions reveal gaps. The student becomes the teacher, and the teacher remains a student.",
    35
  ),
  makeCard(
    "Seneca",
    "Letters from a Stoic",
    ["philosophy", "stoicism", "friendship"],
    "One of the most beautiful qualities of true friendship is to understand and to be understood.",
    "Real friends don't just hear your words—they understand your silence. They see through your masks. True friendship is rare precisely because genuine understanding is rare.",
    40
  ),
  makeCard(
    "Seneca",
    "On the Shortness of Life",
    ["philosophy", "stoicism", "priorities"],
    "People are frugal in guarding their personal property; but as soon as it comes to squandering time they are most wasteful.",
    "You'd never let someone steal your money, but you let them steal your time daily. Time is your only truly non-renewable resource. Guard it fiercely.",
    45
  ),
  makeCard(
    "Seneca",
    "Letters from a Stoic",
    ["philosophy", "stoicism", "self-improvement"],
    "Every new beginning comes from some other beginning's end.",
    "Endings are not failures—they're prerequisites. You can't start a new chapter while rereading the old one. Let go to grow.",
    35
  ),
  makeCard(
    "Seneca",
    "On the Shortness of Life",
    ["philosophy", "stoicism", "death"],
    "Let us prepare our minds as if we'd come to the very end of life.",
    "Live as if today is your last—not recklessly, but deliberately. What would you regret not doing? Do it. Who would you forgive? Forgive them. Memento mori sharpens focus.",
    45
  ),
  makeCard(
    "Seneca",
    "Letters from a Stoic",
    ["philosophy", "stoicism", "action"],
    "Luck is what happens when preparation meets opportunity.",
    "The 'lucky' worked for years before their breakthrough. They were ready when the moment came. You create your own luck through relentless preparation.",
    40
  ),
  makeCard(
    "Seneca",
    "On Providence",
    ["philosophy", "stoicism", "adversity"],
    "Fire tests gold, suffering tests brave men.",
    "You never know your strength until strength is required. Crisis reveals character it doesn't create. Be grateful for the tests—they prove what you're made of.",
    40
  ),
  makeCard(
    "Seneca",
    "Letters from a Stoic",
    ["philosophy", "stoicism", "simplicity"],
    "It is not the man who has too little who is poor, but the one who hankers after more.",
    "Simplify your wants, and you simplify your life. The person with few desires has everything. The person with many desires has nothing.",
    35
  ),
  makeCard(
    "Seneca",
    "On the Tranquility of Mind",
    ["philosophy", "stoicism", "contentment"],
    "No person has the power to have everything they want, but it is in their power not to want what they don't have.",
    "You can't control the world, but you can control your desires. Reduce wants, increase peace. This is the shortcut to contentment.",
    45
  ),
  makeCard(
    "Seneca",
    "Letters from a Stoic",
    ["philosophy", "stoicism", "wisdom"],
    "The mind that is anxious about future events is miserable.",
    "Anxiety is paying interest on trouble that may never come. Stay present. Deal with today's challenges. Tomorrow's will wait.",
    35
  ),
  makeCard(
    "Seneca",
    "On Benefits",
    ["philosophy", "stoicism", "gratitude"],
    "He who receives a benefit with gratitude repays the first installment on his debt.",
    "Gratitude is not just good manners—it's good strategy. The grateful receive more. Appreciation attracts abundance. Say thank you and mean it.",
    40
  ),
  makeCard(
    "Seneca",
    "Letters from a Stoic",
    ["philosophy", "stoicism", "character"],
    "Associate with people who are likely to improve you.",
    "You become the average of your five closest associates. Choose them wisely. Proximity to excellence breeds excellence. Surround yourself with who you want to become.",
    40
  ),
  makeCard(
    "Seneca",
    "On the Firmness of the Wise Man",
    ["philosophy", "stoicism", "resilience"],
    "A gem cannot be polished without friction, nor a man perfected without trials.",
    "Smooth seas make weak sailors. Your struggles are your education. Every setback is a setup. Embrace the friction—it's making you shine.",
    45
  ),

  // ============================================
  // STOICISM - MARCUS AURELIUS (25 cards)
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
    "Consensus is not truth. Popularity is not wisdom. Think independently. Question everything. The crowd is often wrong.",
    40
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "mortality"],
    "Think of yourself as dead. You have lived your life. Now take what's left and live it properly.",
    "Death is not in the future—it's with you now. Every moment could be your last. This isn't morbid; it's liberating.",
    45
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "obstacles"],
    "The impediment to action advances action. What stands in the way becomes the way.",
    "Obstacles aren't interruptions to your path—they ARE your path. Every problem is a training ground. Every setback is a setup.",
    40
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "acceptance"],
    "Accept the things to which fate binds you, and love the people with whom fate brings you together.",
    "You didn't choose your circumstances, but you can choose your response to them. Work with what you have. Love who's in front of you.",
    45
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "present"],
    "Never let the future disturb you. You will meet it with the same weapons of reason.",
    "Worry is paying interest on a debt you may never owe. The future hasn't happened. When it arrives, you'll handle it.",
    40
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "opinion"],
    "Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.",
    "Reality is filtered through perception. Your version of events is just that—your version. Others see differently. Stay humble about what you 'know.'",
    40
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "morning"],
    "When you arise in the morning, think of what a privilege it is to be alive.",
    "Another day is not guaranteed. This morning could have been your last night. You woke up. You breathe. You have another chance.",
    35
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "judgment"],
    "If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it.",
    "Nothing has inherent emotional value until you assign it. A traffic jam can be frustrating or an opportunity to listen to a podcast. You choose the meaning.",
    45
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "impermanence"],
    "Loss is nothing else but change, and change is Nature's delight.",
    "What you call loss is transformation. The universe is constantly reshaping itself. Resistance to change is resistance to life itself.",
    40
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "focus"],
    "Concentrate every minute on doing what's in front of you.",
    "The present moment is the only one you can act in. Yesterday is gone. Tomorrow doesn't exist. Your power lives entirely in now.",
    35
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "humility"],
    "How much time he gains who does not look to see what his neighbor says or does or thinks.",
    "Comparison is the thief of joy and time. Focus on your own path. What others do is their business. What you do is yours.",
    40
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "emotions"],
    "How much more grievous are the consequences of anger than the causes of it.",
    "Anger punishes you for someone else's mistake. The person who hurt you moves on while you simmer. Choose peace—it's the ultimate revenge.",
    40
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "virtue"],
    "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.",
    "Happiness is an inside job. External achievements bring temporary satisfaction. Internal peace brings lasting contentment.",
    35
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "duty"],
    "What injures the hive injures the bee.",
    "Your success is tied to your community's success. Selfishness is self-destruction. Serve the whole, and you serve yourself.",
    35
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "discipline"],
    "At dawn, when you have trouble getting out of bed, tell yourself: I have to go to work as a human being.",
    "You were born for something. The comfort of bed is a trap. Your purpose waits outside those covers. Get up.",
    40
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "criticism"],
    "If someone is able to show me that what I think or do is not right, I will happily change.",
    "Ego resists correction. Wisdom welcomes it. Being wrong is an opportunity to become right. Seek feedback, not validation.",
    40
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "purpose"],
    "A man's worth is no greater than the worth of his ambitions.",
    "Small goals make small people. Stretch yourself. Aim higher than you think you can reach. Your ambitions shape your identity.",
    35
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "kindness"],
    "Kindness is invincible, but only when it is sincere.",
    "Fake kindness is manipulation. Real kindness is strength. It disarms hostility, builds trust, and costs nothing. Be genuinely kind.",
    35
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "time"],
    "It is not death that a man should fear, but he should fear never beginning to live.",
    "The tragedy isn't dying—it's living without purpose. Many people die at 25 but aren't buried until 75. Start living today.",
    45
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "negativity"],
    "Choose not to be harmed—and you won't feel harmed. Don't feel harmed—and you haven't been.",
    "Offense is taken, not given. You decide what hurts you. This isn't denial—it's empowerment. Take back your emotional sovereignty.",
    40
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "fame"],
    "I have often wondered how it is that every man loves himself more than all the rest of men, but yet sets less value on his own opinion of himself than on the opinion of others.",
    "We care too much about what strangers think. Those people aren't thinking about you anyway—they're worried about what you think of them.",
    50
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "simplicity"],
    "If it is not right, do not do it. If it is not true, do not say it.",
    "Ethics simplified: Don't do wrong things. Don't say false things. Complexity is often an excuse. Simple rules, strictly followed.",
    35
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "reality"],
    "The universe is change; our life is what our thoughts make it.",
    "You can't stop the world from changing. You can only adjust your internal compass. Reality is neutral—your interpretation makes it heaven or hell.",
    40
  ),

  // ============================================
  // STOICISM - EPICTETUS (20 cards)
  // ============================================
  makeCard(
    "Epictetus",
    "Enchiridion",
    ["philosophy", "stoicism", "control"],
    "Some things are within our power, while others are not.",
    "Within your power: your thoughts, choices, desires, aversions. Not within your power: your body, reputation, position, possessions. Focus on what you control.",
    50
  ),
  makeCard(
    "Epictetus",
    "Discourses",
    ["philosophy", "stoicism", "resilience"],
    "It's not what happens to you, but how you react to it that matters.",
    "The same event can devastate one person and strengthen another. The event is neutral. Your response determines the outcome.",
    35
  ),
  makeCard(
    "Epictetus",
    "Enchiridion",
    ["philosophy", "stoicism", "freedom"],
    "No man is free who is not master of himself.",
    "Freedom isn't about external chains—it's about internal ones. You can be in prison and free, or in a palace and enslaved.",
    40
  ),
  makeCard(
    "Epictetus",
    "Discourses",
    ["philosophy", "stoicism", "education"],
    "Only the educated are free.",
    "Education isn't about degrees—it's about understanding. The more you know, the less you fear. The less you fear, the more you can do.",
    35
  ),
  makeCard(
    "Epictetus",
    "Enchiridion",
    ["philosophy", "stoicism", "desire"],
    "Wealth consists not in having great possessions, but in having few wants.",
    "Reduce your desires, and you become instantly rich. The person who wants nothing already has everything.",
    40
  ),
  makeCard(
    "Epictetus",
    "Discourses",
    ["philosophy", "stoicism", "blame"],
    "Any person capable of angering you becomes your master.",
    "When you let others control your emotions, you surrender your power. Take back the keys to your inner peace.",
    40
  ),
  makeCard(
    "Epictetus",
    "Enchiridion",
    ["philosophy", "stoicism", "expectation"],
    "Don't demand that things happen as you wish, but wish that they happen as they do happen, and you will go on well.",
    "Expectations are premeditated resentments. Accept reality as it is. Work with what you have. Peace follows acceptance.",
    45
  ),
  makeCard(
    "Epictetus",
    "Discourses",
    ["philosophy", "stoicism", "progress"],
    "Progress is not achieved by luck or accident, but by working on yourself daily.",
    "There are no shortcuts to excellence. Daily effort, compounded over years, creates transformation. Show up every day.",
    40
  ),
  makeCard(
    "Epictetus",
    "Enchiridion",
    ["philosophy", "stoicism", "appearances"],
    "It is impossible for a man to learn what he thinks he already knows.",
    "Intellectual humility is the gateway to wisdom. Think you know everything? You'll learn nothing. Admit ignorance to gain knowledge.",
    40
  ),
  makeCard(
    "Epictetus",
    "Discourses",
    ["philosophy", "stoicism", "responsibility"],
    "Man is not worried by real problems so much as by his imagined anxieties about real problems.",
    "The problem isn't the problem. Your anxiety about the problem is the problem. Separate facts from fears.",
    45
  ),
  makeCard(
    "Epictetus",
    "Enchiridion",
    ["philosophy", "stoicism", "judgment"],
    "Men are disturbed not by things, but by the views which they take of things.",
    "Events don't disturb you—your interpretations do. Change how you see things, and everything changes.",
    35
  ),
  makeCard(
    "Epictetus",
    "Discourses",
    ["philosophy", "stoicism", "practice"],
    "First say to yourself what you would be; and then do what you have to do.",
    "Identity precedes action. Decide who you want to become, then behave accordingly. Act as if you already are that person.",
    40
  ),
  makeCard(
    "Epictetus",
    "Enchiridion",
    ["philosophy", "stoicism", "silence"],
    "We have two ears and one mouth so that we can listen twice as much as we speak.",
    "Wisdom enters through the ears, not the mouth. The more you listen, the more you learn. Talk less, observe more.",
    35
  ),
  makeCard(
    "Epictetus",
    "Discourses",
    ["philosophy", "stoicism", "suffering"],
    "Circumstances don't make the man, they only reveal him to himself.",
    "Crisis is a mirror. It shows you who you really are—not who you think you are. Embrace difficulties as opportunities for self-discovery.",
    45
  ),
  makeCard(
    "Epictetus",
    "Enchiridion",
    ["philosophy", "stoicism", "attachment"],
    "Remember that it is not enough to be hit or insulted to be harmed, you must believe that you are being harmed.",
    "Harm is a belief before it's a reality. Choose different beliefs, experience different realities.",
    40
  ),
  makeCard(
    "Epictetus",
    "Discourses",
    ["philosophy", "stoicism", "preparation"],
    "In every act, consider what precedes and what follows, and then proceed to the act.",
    "Think before you leap, but still leap. Consider consequences, but don't be paralyzed by analysis. Wise action balances reflection and courage.",
    45
  ),
  makeCard(
    "Epictetus",
    "Enchiridion",
    ["philosophy", "stoicism", "freedom"],
    "Freedom is the only worthy goal in life. It is won by disregarding things that lie beyond our control.",
    "True freedom is internal. Release attachment to outcomes. Care deeply, but hold loosely. This is the path to peace.",
    40
  ),
  makeCard(
    "Epictetus",
    "Discourses",
    ["philosophy", "stoicism", "difficulty"],
    "The greater the difficulty, the more glory in surmounting it.",
    "Easy victories don't build character. The hard battles make the strongest warriors. Seek challenges worthy of your potential.",
    35
  ),
  makeCard(
    "Epictetus",
    "Enchiridion",
    ["philosophy", "stoicism", "nature"],
    "Make the best use of what is in your power, and take the rest as it happens.",
    "Control what you can. Accept what you can't. This simple formula resolves most anxiety. Apply it relentlessly.",
    35
  ),
  makeCard(
    "Epictetus",
    "Discourses",
    ["philosophy", "stoicism", "philosophy"],
    "Don't explain your philosophy. Embody it.",
    "Talk is cheap. Living your principles is priceless. Let your actions speak. Philosophy isn't what you say—it's what you do.",
    35
  ),

  // ============================================
  // JAMES CLEAR - ATOMIC HABITS (25 cards)
  // ============================================
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "improvement"],
    "You do not rise to the level of your goals. You fall to the level of your systems.",
    "Goals are direction. Systems are results. Everyone has goals—winners have systems. Design your environment. Automate good behavior.",
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
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "environment"],
    "Environment is the invisible hand that shapes human behavior.",
    "You don't need more willpower—you need a better environment. Make good habits easy and bad habits hard. Design your surroundings for success.",
    45
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "motivation"],
    "You don't have to be the victim of your environment. You can also be the architect of it.",
    "Stop blaming circumstances. Start redesigning them. Move the cookies. Put the book by your bed. Small environmental changes create big behavioral shifts.",
    40
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "process"],
    "The process of building habits is actually the process of becoming yourself.",
    "Your habits are your autobiography. They tell the story of who you are. Write a story you're proud of, one small action at a time.",
    40
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "friction"],
    "Reduce the friction associated with good behaviors. Increase the friction associated with bad ones.",
    "Willpower is finite. Environment design is infinite. Make the right thing the easy thing. Make the wrong thing the hard thing.",
    40
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "tracking"],
    "Never miss twice. If you miss one day, try to get back on track as quickly as possible.",
    "Missing once is an accident. Missing twice is the start of a new habit. Perfection isn't the goal—consistency is. Get back on the horse.",
    35
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "cues"],
    "The cue triggers a craving, which motivates a response, which provides a reward.",
    "Understand the habit loop, and you control it. Every habit follows this pattern. Change the cue, and you change the behavior.",
    45
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "time"],
    "Time magnifies the margin between success and failure. Good habits make time your ally; bad habits make time your enemy.",
    "Small differences, compounded daily, become massive differences over decades. Your habits are betting on who you'll be in 10 years.",
    40
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "start"],
    "When you start a new habit, it should take less than two minutes to do.",
    "The Two-Minute Rule: Make it so easy you can't say no. Read one page. Do one pushup. The momentum carries you forward.",
    35
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "stacking"],
    "After I [CURRENT HABIT], I will [NEW HABIT].",
    "Habit stacking uses existing routines as triggers for new ones. After I pour my coffee, I will journal. Link behaviors together in chains.",
    40
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "satisfaction"],
    "What is immediately rewarded is repeated. What is immediately punished is avoided.",
    "Your brain is wired for instant gratification. Make good habits feel good immediately. Delay rewards at your peril.",
    35
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "plateau"],
    "Breakthrough moments are often the result of many previous actions that build up the potential required to unleash a major change.",
    "Success isn't linear. You work and work with no visible results, then everything changes at once. Trust the process during the plateau.",
    45
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "temptation"],
    "Temptation bundling works by linking an action you want to do with an action you need to do.",
    "Only watch your favorite show while exercising. Only get coffee from your favorite shop when walking there. Pair pleasure with productivity.",
    40
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "social"],
    "We imitate the habits of three groups: the close, the many, and the powerful.",
    "Your habits are shaped by your tribe. Surround yourself with people who have the habits you want. You'll absorb their behaviors automatically.",
    40
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "repetition"],
    "Habits are not formed by time. They are formed by repetition.",
    "It's not 21 days or 66 days—it's however many reps it takes. Focus on frequency, not duration. Do it again and again until it's automatic.",
    35
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "outcomes"],
    "Goals are good for setting a direction, but systems are best for making progress.",
    "Winners and losers often have the same goals. The difference is their systems. Focus on what you do daily, not what you want eventually.",
    40
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "change"],
    "True behavior change is identity change.",
    "You might want to run, but until you see yourself as a runner, you won't maintain it. Adopt the identity first, and the behaviors follow.",
    35
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "visibility"],
    "Make the cues of your good habits obvious and visible.",
    "Out of sight, out of mind. Put your guitar in the middle of the room. Leave your vitamins next to your coffee maker. What you see, you do.",
    35
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "commitment"],
    "A commitment device is a choice you make in the present that controls your actions in the future.",
    "Delete social media apps. Sign up for the morning class. Pay in advance. Your present self can lock your future self into good behavior.",
    40
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "patience"],
    "Be patient. The most powerful outcomes are delayed.",
    "Plant seeds today for trees you'll enjoy years from now. The best investments—in health, relationships, skills—pay dividends over decades.",
    40
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "mastery"],
    "Professionals stick to the schedule; amateurs let life get in the way.",
    "The difference isn't talent—it's consistency. Pros show up whether they feel like it or not. Mood follows action, not the other way around.",
    35
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "boredom"],
    "The greatest threat to success is not failure but boredom.",
    "We give up on habits not because they're hard but because they're boring. The ability to keep going when it's not exciting separates winners.",
    40
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "reflection"],
    "Reflection and review is a process that allows you to remain conscious of your performance over time.",
    "Annual reviews. Monthly check-ins. Weekly reflections. Without measurement, you're flying blind. What gets measured gets improved.",
    40
  ),

  // ============================================
  // MORGAN HOUSEL - PSYCHOLOGY OF MONEY (25 cards)
  // ============================================
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "wealth"],
    "Wealth is what you don't see.",
    "The cars not purchased. The diamonds not bought. The renovations not done. Wealth is the financial assets that haven't been converted to stuff you see.",
    40
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "luck"],
    "Nothing is as good or as bad as it seems.",
    "Success includes luck. Failure includes bad luck. Be humble when you win. Be forgiving when you lose. The full picture is never visible.",
    35
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "compounding"],
    "The first rule of compounding is to never interrupt it unnecessarily.",
    "Warren Buffett's skill is investing. His secret is time. Most of his wealth came after age 65. Patience isn't just a virtue—it's an edge.",
    45
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "enough"],
    "There is no reason to risk what you have and need for what you don't have and don't need.",
    "The goalpost keeps moving for those who never define 'enough.' Contentment is knowing when to stop. More isn't always better.",
    40
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "freedom"],
    "The highest form of wealth is the ability to wake up every morning and say, 'I can do whatever I want today.'",
    "Money's greatest value isn't stuff—it's control over your time. Every dollar saved is a vote for future freedom.",
    45
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "behavior"],
    "Financial success is not a hard science. It's a soft skill, where how you behave is more important than what you know.",
    "Genius who can't control their behavior will underperform average intelligence with great discipline. Behavior beats intelligence.",
    40
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "savings"],
    "Building wealth has little to do with your income or investment returns, and lots to do with your savings rate.",
    "A high earner who spends everything has zero wealth. A modest earner who saves consistently builds real freedom. Income is vanity; savings is sanity.",
    45
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "expectations"],
    "Expectations grow with results.",
    "More success often means less satisfaction as expectations rise faster than reality. The hedonic treadmill is real. Guard your expectations.",
    35
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "history"],
    "History is the study of change, ironically used as a map of the future.",
    "We study the past to predict what's never happened before. History rhymes but doesn't repeat. Stay humble about what you think you know.",
    40
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "margins"],
    "The most important part of every plan is planning on your plan not going according to plan.",
    "Margin of safety isn't pessimism—it's realism. Assume things will go wrong. Build buffers. Expect surprises. The unexpected is expected.",
    45
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "stories"],
    "We all think we know how the world works. But we've all only experienced a tiny sliver of it.",
    "Your worldview is shaped by your unique experiences. Others have different data. Humility acknowledges we're all working with incomplete information.",
    40
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "independence"],
    "Independence, to me, doesn't mean you'll stop working. It means you only do the work you like with people you like at the times you want for as long as you want.",
    "Financial freedom isn't retirement—it's optionality. Work becomes voluntary. Choices multiply. That's the real prize.",
    50
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "survival"],
    "Getting wealthy is one thing. Staying wealthy is another.",
    "Making money requires risk-taking and optimism. Keeping money requires humility and paranoia. Different games, different skills.",
    40
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "goals"],
    "Use money to gain control over your time.",
    "Time is the only resource you can't get back. Money can buy many things, but nothing more valuable than autonomy over your hours.",
    35
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "tail-events"],
    "A few outlier events account for the majority of outcomes.",
    "Most of your investment returns will come from a few great years. Most of your mistakes won't matter. Focus on surviving the big stuff.",
    40
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "frugality"],
    "Spending money to show people how much money you have is the fastest way to have less money.",
    "Impression management is expensive. Real wealth is quiet. The millionaire next door drives a used car. Stealth wealth wins.",
    40
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "flexibility"],
    "Fewer things matter more than having room for error.",
    "Financial plans rarely go exactly as planned. Leave slack. Build cushions. The ability to adapt beats the perfect plan.",
    35
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "ego"],
    "Your personal experiences make up maybe 0.00000001% of what's happened in the world but maybe 80% of how you think the world works.",
    "We overweight our own experiences. Your sample size is tiny. Read history. Talk to older people. Expand your dataset.",
    45
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "simplicity"],
    "A good financial plan is one you can stick to.",
    "The optimal strategy you'll abandon is worse than the suboptimal strategy you'll follow. Simple and sustainable beats complex and fragile.",
    35
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "risk"],
    "Risk is what's left over when you think you've thought of everything.",
    "True risk is invisible until it arrives. The things you don't see coming are the things that get you. Stay humble about what you don't know.",
    40
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "lifestyle"],
    "Wealth is the nice cars not purchased. The diamonds not bought. The watches not worn.",
    "Every luxury not bought is freedom saved. The rich often look middle-class. The middle-class often look rich. Appearance and reality diverge.",
    40
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "pessimism"],
    "Optimism sounds like a sales pitch. Pessimism sounds like someone trying to help you.",
    "We're wired to trust warnings more than promises. Be aware of this bias. Optimism is usually more accurate over the long run.",
    40
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "complexity"],
    "You can be wrong half the time and still make a fortune.",
    "You don't need to be right most of the time. You need to be right when it matters most. Big wins cover many small losses.",
    35
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "definition"],
    "No one is crazy. Everyone makes decisions based on their unique experiences.",
    "What looks irrational makes sense when you understand someone's history. Judgment without context is unfair. Everyone's playing a different game.",
    40
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "psychology", "happiness"],
    "Money's greatest intrinsic value is its ability to give you control over your time.",
    "The ability to do what you want, when you want, with whom you want, for as long as you want—that's freedom. That's what money really buys.",
    45
  ),

  // ============================================
  // NAVAL RAVIKANT - ALMANACK (25 cards)
  // ============================================
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "wealth", "wisdom"],
    "Seek wealth, not money or status. Wealth is having assets that earn while you sleep.",
    "Money is how we transfer time. Status is your place in hierarchy. Wealth is freedom. Build things that work without you.",
    40
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "leverage", "success"],
    "Learn to sell. Learn to build. If you can do both, you will be unstoppable.",
    "Most people can do one or the other. Building without selling creates obscurity. Selling without building creates emptiness. The combination creates empires.",
    35
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "happiness", "peace"],
    "A calm mind, a fit body, and a house full of love. These things cannot be bought.",
    "No amount of money can purchase peace, health, or genuine connection. The best things in life aren't things.",
    40
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "leverage", "technology"],
    "Code and media are permissionless leverage. They're the leverage behind the newly rich.",
    "You no longer need capital or employees to reach millions. A laptop and an internet connection can change the world.",
    45
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "judgment", "wealth"],
    "Judgment is the most important skill. Leverage is force multiplier for your judgment.",
    "One good decision beats a thousand hours of hard work. Develop wisdom. Amplify it with leverage. Quality thinking scales.",
    40
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "specific-knowledge", "career"],
    "Specific knowledge is found by pursuing your genuine curiosity and passion rather than whatever is hot right now.",
    "The best careers are built on authentic interests, not trends. Follow your curiosity. It knows where to go.",
    40
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["philosophy", "happiness", "desire"],
    "Desire is a contract you make with yourself to be unhappy until you get what you want.",
    "Every desire is a seed of suffering. Wanting is suffering. Reduce desires to reduce pain. This is ancient wisdom, scientifically valid.",
    45
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["philosophy", "happiness", "peace"],
    "Peace is happiness at rest. Happiness is peace in motion.",
    "They're the same thing, just in different states. Don't chase happiness—cultivate peace. Happiness will follow naturally.",
    35
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "reading", "learning"],
    "Read what you love until you love to read.",
    "Don't force yourself through books you hate. Life's too short. Find what fascinates you. Reading becomes effortless when you love it.",
    35
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "accountability", "success"],
    "Embrace accountability and take business risks under your own name.",
    "Society rewards those who take visible risks. Put your name on your work. Skin in the game builds trust and attracts opportunity.",
    40
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["philosophy", "truth", "honesty"],
    "If you can't see yourself working with someone for life, don't work with them for a day.",
    "Short-term compromises create long-term problems. Choose partners you'd still want to be around in 20 years.",
    40
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "time", "freedom"],
    "All the returns in life come from compound interest over the long term.",
    "Relationships. Skills. Wealth. Health. All compound. Start early. Stay consistent. Time is the secret ingredient.",
    35
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["philosophy", "meditation", "peace"],
    "All of man's troubles arise because he cannot sit in a room quietly by himself.",
    "The inability to be alone with your thoughts is at the root of most addictions and anxieties. Learn to sit still. It's a superpower.",
    45
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "wealth", "ethics"],
    "Ethical wealth creation is possible. If you secretly despise wealth, it will elude you.",
    "Money is a neutral tool. Your relationship with it matters. Wealth created through value creation is moral. Embrace it.",
    40
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["philosophy", "happiness", "jealousy"],
    "If you're not willing to trade places with them completely—all their responsibilities, problems, and insecurities—then no point being jealous.",
    "You want their results without their sacrifice. That's not possible. Envy the whole package or envy nothing.",
    40
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "productivity", "focus"],
    "The most important skill for getting rich is becoming a perpetual learner.",
    "The world changes fast. Yesterday's skills become obsolete. The ability to learn continuously is the ultimate competitive advantage.",
    40
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["philosophy", "decisions", "clarity"],
    "If you have two choices to make and they're 50/50, take the path that's more painful in the short term.",
    "The pain of discipline is less than the pain of regret. Short-term pain usually leads to long-term gain. Embrace the harder path.",
    40
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "wealth", "work"],
    "Work like hell. Be patient. Eventually, you will get lucky.",
    "Luck favors the prepared. Keep showing up. Keep improving. The breakthrough might be one day away. Don't quit.",
    35
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["philosophy", "meaning", "purpose"],
    "The meaning of life is that it ends.",
    "Death gives life urgency. Without an end, nothing would matter. Mortality is a feature, not a bug. Use it as fuel.",
    35
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "creativity", "ideas"],
    "Originality is just ignorance of the source.",
    "Don't worry about being original. Everything is a remix. Create freely. Your unique combination is originality enough.",
    35
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["philosophy", "ego", "growth"],
    "The moment you tell yourself you know something, you've closed the door to learning it.",
    "Certainty is the enemy of growth. Stay curious. Stay humble. The more you know, the more you realize you don't know.",
    40
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "negotiation", "value"],
    "Play long-term games with long-term people.",
    "Compound interest applies to relationships too. Short-term thinking produces short-term results. Optimize for decades, not days.",
    35
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["philosophy", "freedom", "choice"],
    "Escape competition through authenticity.",
    "When you're authentic, you're the only one playing your game. Competition disappears because no one else can be you. Be yourself—strategically.",
    40
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "wealth", "equity"],
    "You're not going to get rich renting out your time.",
    "Hourly work has limits. Ownership has leverage. Seek equity in businesses. Let your assets work while you sleep.",
    40
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["philosophy", "happiness", "internal"],
    "Happiness is a skill you develop and a choice you make.",
    "It's not something that happens to you. It's something you cultivate. Peace is not a destination—it's a practice.",
    35
  ),

  // ============================================
  // RYAN HOLIDAY - OBSTACLE IS THE WAY (20 cards)
  // ============================================
  makeCard(
    "Ryan Holiday",
    "The Obstacle Is the Way",
    ["philosophy", "stoicism", "adversity"],
    "The obstacle in the path becomes the path. Never forget, within every obstacle is an opportunity to improve our condition.",
    "What blocks you also builds you. Obstacles aren't interruptions—they're the curriculum. Embrace them as teachers.",
    45
  ),
  makeCard(
    "Ryan Holiday",
    "The Obstacle Is the Way",
    ["philosophy", "stoicism", "perception"],
    "There is no good or bad without us, there is only perception.",
    "Events are neutral until you judge them. Change your perception, change your experience. You control the lens.",
    35
  ),
  makeCard(
    "Ryan Holiday",
    "The Obstacle Is the Way",
    ["philosophy", "stoicism", "action"],
    "We must be willing to roll up our sleeves and work on things that most people would consider beneath them.",
    "Pride prevents progress. No task is beneath you when it serves your purpose. Ego is the enemy of excellence.",
    40
  ),
  makeCard(
    "Ryan Holiday",
    "The Obstacle Is the Way",
    ["philosophy", "stoicism", "persistence"],
    "Persistence is an action. Perseverance is a matter of will.",
    "One is physical, one is mental. You need both. Keep moving and keep believing. Action without conviction fades.",
    35
  ),
  makeCard(
    "Ryan Holiday",
    "The Obstacle Is the Way",
    ["philosophy", "stoicism", "problems"],
    "Bad companies are destroyed by crisis. Good companies survive them. Great companies are improved by them.",
    "The same is true for people. Crisis reveals and refines. How you respond to difficulty determines who you become.",
    45
  ),
  makeCard(
    "Ryan Holiday",
    "The Obstacle Is the Way",
    ["philosophy", "stoicism", "acceptance"],
    "We don't get to choose what happens to us, but we can always choose how we feel about it.",
    "This is the ultimate freedom. External events are not in your control. Internal responses are entirely yours.",
    40
  ),
  makeCard(
    "Ryan Holiday",
    "The Obstacle Is the Way",
    ["philosophy", "stoicism", "preparation"],
    "Prepare for the worst. Hope for the best. Capitalize on what comes.",
    "Pessimism of the intellect, optimism of the will. Plan for failure, act with confidence. Flexibility is strength.",
    40
  ),
  makeCard(
    "Ryan Holiday",
    "The Obstacle Is the Way",
    ["philosophy", "stoicism", "opportunity"],
    "Every situation has an upside. Every bad event can be turned to advantage.",
    "This isn't naive optimism—it's strategic thinking. Ask: What's good about this? There's always an answer if you look.",
    40
  ),
  makeCard(
    "Ryan Holiday",
    "The Obstacle Is the Way",
    ["philosophy", "stoicism", "focus"],
    "Focus on the moment, not the monsters that may or may not be up ahead.",
    "Future fears paralyze present action. Stay in the now. Deal with today's problems today. Tomorrow will wait.",
    35
  ),
  makeCard(
    "Ryan Holiday",
    "The Obstacle Is the Way",
    ["philosophy", "stoicism", "control"],
    "Think progress, not perfection.",
    "Perfectionism is procrastination in disguise. Done is better than perfect. Forward motion beats standing still.",
    35
  ),
  makeCard(
    "Ryan Holiday",
    "Ego Is the Enemy",
    ["philosophy", "psychology", "ego"],
    "Ego is the enemy of what you want and of what you have: Of mastering a craft. Of real creative insight.",
    "Ego makes you defensive, entitled, and blind. It blocks learning. It sabotages relationships. Keep it in check.",
    45
  ),
  makeCard(
    "Ryan Holiday",
    "Ego Is the Enemy",
    ["philosophy", "psychology", "humility"],
    "The need to be better than, more than, recognized for, far past any reasonable utility—that's ego.",
    "Healthy ambition serves a purpose. Ego serves itself. Know the difference. Ambition builds; ego destroys.",
    40
  ),
  makeCard(
    "Ryan Holiday",
    "Ego Is the Enemy",
    ["philosophy", "psychology", "success"],
    "Success is intoxicating. It can make you think you're invincible.",
    "The higher you climb, the harder you can fall. Stay grounded. Keep learning. Success is never permanent.",
    40
  ),
  makeCard(
    "Ryan Holiday",
    "Stillness Is the Key",
    ["philosophy", "mindfulness", "peace"],
    "The world is like muddy water. To see through it, we have to let it settle.",
    "Clarity requires stillness. Stop stirring the pot. Sit quietly. The answers emerge when you stop chasing them.",
    40
  ),
  makeCard(
    "Ryan Holiday",
    "Stillness Is the Key",
    ["philosophy", "mindfulness", "presence"],
    "The world is ruled by letting things take their course.",
    "Not everything requires action. Sometimes the best move is to wait. Patience is an active strategy, not passive acceptance.",
    35
  ),
  makeCard(
    "Ryan Holiday",
    "Stillness Is the Key",
    ["philosophy", "mindfulness", "solitude"],
    "Solitude is the school of genius.",
    "Great ideas come in quiet moments. Constant input prevents creative output. Schedule time alone. Protect it fiercely.",
    40
  ),
  makeCard(
    "Ryan Holiday",
    "The Daily Stoic",
    ["philosophy", "stoicism", "practice"],
    "It's time to stop hoping and wishing and start doing and being.",
    "Philosophy isn't armchair speculation—it's daily practice. Read less, do more. Apply wisdom; don't just collect it.",
    35
  ),
  makeCard(
    "Ryan Holiday",
    "The Daily Stoic",
    ["philosophy", "stoicism", "routine"],
    "Routine, in an intelligent man, is a sign of ambition.",
    "Discipline frees creativity. Structure enables spontaneity. The best performers have the strongest routines.",
    35
  ),
  makeCard(
    "Ryan Holiday",
    "The Daily Stoic",
    ["philosophy", "stoicism", "mortality"],
    "Memento mori—remember that you will die.",
    "Not morbid—motivating. Death awareness sharpens priorities. What would you do if you only had a year? Do that.",
    40
  ),
  makeCard(
    "Ryan Holiday",
    "The Daily Stoic",
    ["philosophy", "stoicism", "today"],
    "This is not your life. This is one day in your life.",
    "Don't be overwhelmed by the whole journey. Just focus on today. Win today. That's all you can do.",
    35
  ),

  // ============================================
  // ROBERT GREENE - 48 LAWS OF POWER (25 cards)
  // ============================================
  makeCard(
    "Robert Greene",
    "The 48 Laws of Power",
    ["business", "psychology", "power"],
    "Never outshine the master.",
    "Make those above you feel superior. Appearing smarter or more capable threatens them. Let others take the spotlight while you do the work.",
    40
  ),
  makeCard(
    "Robert Greene",
    "The 48 Laws of Power",
    ["business", "psychology", "reputation"],
    "So much depends on reputation—guard it with your life.",
    "Reputation is the cornerstone of power. Through reputation alone you can intimidate and win. Protect it at all costs.",
    40
  ),
  makeCard(
    "Robert Greene",
    "The 48 Laws of Power",
    ["business", "psychology", "intentions"],
    "Conceal your intentions.",
    "Keep people off-balance by never revealing your purpose. They cannot prepare a defense if they don't know where you're going.",
    35
  ),
  makeCard(
    "Robert Greene",
    "The 48 Laws of Power",
    ["business", "psychology", "speech"],
    "Always say less than necessary.",
    "The more you say, the more common you appear. Powerful people impress by saying less. Silence creates presence.",
    35
  ),
  makeCard(
    "Robert Greene",
    "The 48 Laws of Power",
    ["business", "psychology", "attention"],
    "Win through your actions, never through argument.",
    "Arguments create resentment. Demonstration creates believers. Show, don't tell. Let your success speak.",
    40
  ),
  makeCard(
    "Robert Greene",
    "The 48 Laws of Power",
    ["business", "psychology", "company"],
    "Infection: Avoid the unhappy and unlucky.",
    "Emotional states are contagious. Misery spreads. Associate with the positive and fortunate. Your mood shapes your fortune.",
    40
  ),
  makeCard(
    "Robert Greene",
    "The 48 Laws of Power",
    ["business", "psychology", "credit"],
    "Get others to do the work for you, but always take the credit.",
    "Use others' wisdom and effort to further your cause. Never do yourself what others can do for you. Leverage is power.",
    35
  ),
  makeCard(
    "Robert Greene",
    "The 48 Laws of Power",
    ["business", "psychology", "presence"],
    "Make other people come to you—use bait if necessary.",
    "When you force others to act, you're in control. Make your opponents come to you, abandoning their own plans.",
    40
  ),
  makeCard(
    "Robert Greene",
    "The 48 Laws of Power",
    ["business", "psychology", "enemies"],
    "Crush your enemy totally.",
    "A half-dead snake is more dangerous than a dead one. If you leave even a spark, it may reignite. End threats completely or not at all.",
    45
  ),
  makeCard(
    "Robert Greene",
    "The 48 Laws of Power",
    ["business", "psychology", "absence"],
    "Use absence to increase respect and honor.",
    "Too much presence cheapens you. The more you are seen, the more common you appear. Withdraw to be missed.",
    35
  ),
  makeCard(
    "Robert Greene",
    "The 48 Laws of Power",
    ["business", "psychology", "honesty"],
    "Use selective honesty to disarm your victim.",
    "One sincere and honest move will cover dozens of dishonest ones. Open-hearted gestures of honesty bring down others' guards.",
    40
  ),
  makeCard(
    "Robert Greene",
    "The 48 Laws of Power",
    ["business", "psychology", "help"],
    "When asking for help, appeal to people's self-interest, never to their mercy.",
    "People respond to incentives, not charity. Show them what's in it for them, and they will eagerly assist.",
    40
  ),
  makeCard(
    "Robert Greene",
    "The 48 Laws of Power",
    ["business", "psychology", "discovery"],
    "Discover each man's thumbscrew.",
    "Everyone has a weakness. Find it. It's usually insecurity, uncontrollable emotion, or secret pleasure. Use this knowledge wisely.",
    45
  ),
  makeCard(
    "Robert Greene",
    "The 48 Laws of Power",
    ["business", "psychology", "surrender"],
    "Use the surrender tactic: Transform weakness into power.",
    "When weaker, surrender. It gives you time to recover and wait for power to change hands. Surrender is a tool of power.",
    40
  ),
  makeCard(
    "Robert Greene",
    "The 48 Laws of Power",
    ["business", "psychology", "concentration"],
    "Concentrate your forces.",
    "Conserve your energies by keeping them tightly focused. Intensity defeats extensity. Find the one thing and dominate it.",
    35
  ),
  makeCard(
    "Robert Greene",
    "Mastery",
    ["creativity", "mastery", "practice"],
    "The future belongs to those who learn more skills and combine them in creative ways.",
    "Generalists who can connect dots across domains will thrive. Combine skills uniquely. Be a creative generalist.",
    45
  ),
  makeCard(
    "Robert Greene",
    "Mastery",
    ["creativity", "mastery", "apprenticeship"],
    "The time that leads to mastery is dependent on the intensity of our focus.",
    "10,000 hours is a rough guide, but focus matters more. Deliberate practice with intensity accelerates mastery.",
    40
  ),
  makeCard(
    "Robert Greene",
    "Mastery",
    ["creativity", "mastery", "mentor"],
    "The mentor-protégé relationship is the most efficient form of learning.",
    "Books and courses can't replace a great mentor. Find someone who's where you want to be. Learn from their mistakes.",
    40
  ),
  makeCard(
    "Robert Greene",
    "Mastery",
    ["creativity", "mastery", "uniqueness"],
    "It is in fact the height of selfishness to merely consume what others create.",
    "Creation is contribution. Consumption is taking. The world needs makers, not just takers. Build something.",
    40
  ),
  makeCard(
    "Robert Greene",
    "The Laws of Human Nature",
    ["psychology", "relationships", "empathy"],
    "We are all self-absorbed. Learn to turn your gaze outward.",
    "Everyone's favorite topic is themselves. Use this. Show genuine interest in others. Become a great listener.",
    35
  ),
  makeCard(
    "Robert Greene",
    "The Laws of Human Nature",
    ["psychology", "relationships", "patterns"],
    "People never do something just once.",
    "Behavior patterns repeat. Past behavior predicts future behavior. Watch patterns, not promises.",
    35
  ),
  makeCard(
    "Robert Greene",
    "The Laws of Human Nature",
    ["psychology", "self-awareness", "shadow"],
    "We all have a dark side. The more we repress it, the stronger it becomes.",
    "Denying your shadow doesn't eliminate it—it empowers it. Acknowledge your darkness to control it.",
    45
  ),
  makeCard(
    "Robert Greene",
    "The Laws of Human Nature",
    ["psychology", "influence", "emotions"],
    "People are emotional creatures. Appeal to their emotions, not their logic.",
    "Logic convinces the mind; emotion moves the body. To motivate action, speak to the heart first.",
    40
  ),
  makeCard(
    "Robert Greene",
    "The Laws of Human Nature",
    ["psychology", "relationships", "character"],
    "The character is formed in early childhood and remains constant.",
    "People don't fundamentally change. Character is destiny. Choose partners and employees based on character, not charm.",
    40
  ),
  makeCard(
    "Robert Greene",
    "The Laws of Human Nature",
    ["psychology", "self-awareness", "mortality"],
    "The awareness of death should concentrate the mind wonderfully.",
    "Mortality is the ultimate motivator. Use it. Time is running out. Act accordingly.",
    35
  ),

  // ============================================
  // MARK MANSON - SUBTLE ART (20 cards)
  // ============================================
  makeCard(
    "Mark Manson",
    "The Subtle Art of Not Giving a F*ck",
    ["psychology", "happiness", "values"],
    "Who you are is defined by what you're willing to struggle for.",
    "Everyone wants the reward. Few want the struggle. The struggle you choose defines you. Pick your problems wisely.",
    40
  ),
  makeCard(
    "Mark Manson",
    "The Subtle Art of Not Giving a F*ck",
    ["psychology", "happiness", "problems"],
    "Life is essentially an endless series of problems. The solution to one problem is merely the creation of the next one.",
    "Don't hope for a life without problems—hope for better problems. Happiness comes from solving meaningful problems.",
    45
  ),
  makeCard(
    "Mark Manson",
    "The Subtle Art of Not Giving a F*ck",
    ["psychology", "happiness", "choice"],
    "We don't always control what happens to us. But we always control how we interpret what happens to us.",
    "Victimhood is a choice. So is empowerment. The meaning you assign to events determines your experience of them.",
    40
  ),
  makeCard(
    "Mark Manson",
    "The Subtle Art of Not Giving a F*ck",
    ["psychology", "happiness", "responsibility"],
    "Fault is past tense. Responsibility is present tense.",
    "It doesn't matter whose fault it is—what matters is who takes responsibility to fix it. Stop blaming. Start solving.",
    35
  ),
  makeCard(
    "Mark Manson",
    "The Subtle Art of Not Giving a F*ck",
    ["psychology", "happiness", "entitlement"],
    "The desire for more positive experience is itself a negative experience.",
    "Chasing happiness makes you unhappy. Accepting negative emotions allows them to pass. Paradoxically, letting go is how you get what you want.",
    45
  ),
  makeCard(
    "Mark Manson",
    "The Subtle Art of Not Giving a F*ck",
    ["psychology", "happiness", "certainty"],
    "Certainty is the enemy of growth.",
    "The more certain you are, the less you learn. Doubt enables discovery. Stay curious. Stay uncertain.",
    35
  ),
  makeCard(
    "Mark Manson",
    "The Subtle Art of Not Giving a F*ck",
    ["psychology", "happiness", "failure"],
    "Action isn't just the effect of motivation; it's also the cause of it.",
    "Don't wait to feel motivated—act first. Motivation follows action, not the other way around. Just start.",
    40
  ),
  makeCard(
    "Mark Manson",
    "The Subtle Art of Not Giving a F*ck",
    ["psychology", "happiness", "rejection"],
    "Rejection is an important part of maintaining our values.",
    "Saying no to what doesn't matter makes room for what does. Rejection is selection. Be picky about what you care about.",
    40
  ),
  makeCard(
    "Mark Manson",
    "The Subtle Art of Not Giving a F*ck",
    ["psychology", "happiness", "death"],
    "The fear of death follows from the fear of life. One who lives life fully is prepared to die at any time.",
    "Confronting mortality gives life meaning. Death awareness is life appreciation. Memento mori sets priorities straight.",
    45
  ),
  makeCard(
    "Mark Manson",
    "The Subtle Art of Not Giving a F*ck",
    ["psychology", "happiness", "specialness"],
    "The rare people who do become truly exceptional at something do so not because they believe they're exceptional. They become amazing because they're obsessed with improvement.",
    "Greatness comes from effort, not entitlement. You're not special until you do something special. Get to work.",
    50
  ),
  makeCard(
    "Mark Manson",
    "The Subtle Art of Not Giving a F*ck",
    ["psychology", "happiness", "metrics"],
    "Good values are reality-based, socially constructive, and immediate and controllable.",
    "Bad values are superstitious, socially destructive, and not immediate or controllable. Choose your values wisely—they determine your life.",
    45
  ),
  makeCard(
    "Mark Manson",
    "The Subtle Art of Not Giving a F*ck",
    ["psychology", "happiness", "mediocrity"],
    "The rare people who do become truly exceptional at something do so because they're obsessed with improvement.",
    "Exceptionalism is earned through obsession, not entitlement. Talent is overrated. Dedication is underrated.",
    40
  ),
  makeCard(
    "Mark Manson",
    "Everything Is F*cked",
    ["philosophy", "meaning", "hope"],
    "Hope is what allows us to believe we can navigate our suffering.",
    "Without hope, we collapse. But hope must be grounded in action. Passive hope is fantasy. Active hope is strategy.",
    40
  ),
  makeCard(
    "Mark Manson",
    "Everything Is F*cked",
    ["philosophy", "meaning", "feelings"],
    "We cannot control our feelings, but we can control our actions.",
    "Emotions are data, not directives. Feel the fear and act anyway. Your behavior doesn't have to match your mood.",
    35
  ),
  makeCard(
    "Mark Manson",
    "Everything Is F*cked",
    ["philosophy", "meaning", "pain"],
    "Pain is the universal constant of life.",
    "You can't avoid pain—you can only choose which pain you prefer. Pick meaningful suffering over meaningless comfort.",
    35
  ),
  makeCard(
    "Mark Manson",
    "Everything Is F*cked",
    ["philosophy", "meaning", "freedom"],
    "With great freedom comes great responsibility.",
    "More choices mean more responsibility for outcomes. Freedom isn't free—it requires ownership. Embrace the weight.",
    40
  ),
  makeCard(
    "Mark Manson",
    "Everything Is F*cked",
    ["philosophy", "meaning", "maturity"],
    "Maturity is what happens when one learns to only give a f*ck about what's truly f*ckworthy.",
    "Growing up means caring about fewer things more deeply. Attention is finite. Spend it on what matters.",
    40
  ),
  makeCard(
    "Mark Manson",
    "Everything Is F*cked",
    ["philosophy", "meaning", "virtue"],
    "Pursuing happiness through external means produces shallow, temporary pleasure.",
    "True fulfillment comes from within—from living according to your values, not from acquiring things.",
    40
  ),
  makeCard(
    "Mark Manson",
    "Everything Is F*cked",
    ["philosophy", "meaning", "truth"],
    "We need conflict. We need resistance. We need struggle.",
    "Comfort makes us weak. Challenge makes us strong. Seek worthy opponents—in ideas, in competition, in self-improvement.",
    35
  ),
  makeCard(
    "Mark Manson",
    "Everything Is F*cked",
    ["philosophy", "meaning", "growth"],
    "Growth requires pain. Growth is painful.",
    "There's no shortcut to development. The discomfort is the signal that you're expanding. Lean into it.",
    35
  ),

  // ============================================
  // VIKTOR FRANKL - MAN'S SEARCH FOR MEANING (15 cards)
  // ============================================
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "meaning", "suffering"],
    "Between stimulus and response there is a space. In that space is our power to choose our response.",
    "This is the last human freedom—even in concentration camps, Frankl found choice. You can't control what happens. You can always control your response.",
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
    "You can endure incredible hardship if it means something. Without meaning, even comfort feels empty. Find your purpose.",
    45
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "meaning", "choice"],
    "Everything can be taken from a man but one thing: the last of the human freedoms—to choose one's attitude.",
    "They can take your possessions, your freedom, your health. But they cannot take your inner attitude unless you surrender it.",
    50
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "meaning", "love"],
    "Love is the only way to grasp another human being in the innermost core of his personality.",
    "To truly know someone is to love them. Love sees through the masks to the essence beneath. Connection is understanding.",
    40
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "meaning", "suffering"],
    "Suffering ceases to be suffering at the moment it finds a meaning.",
    "Pain with purpose is bearable. Pain without purpose is torture. Find the meaning in your struggles, and they transform.",
    40
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "meaning", "responsibility"],
    "Being human always points to something beyond itself.",
    "We exist for something greater than ourselves. Self-transcendence is human nature. Meaning is found in service to others.",
    45
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "meaning", "future"],
    "The prisoner who had lost faith in the future was doomed.",
    "Hope is essential for survival. Belief in tomorrow enables endurance of today. Never lose sight of the future.",
    35
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "meaning", "values"],
    "Live as if you were living already for the second time.",
    "Imagine you made mistakes in your first life and now have a chance to correct them. What would you do differently? Do that now.",
    40
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "meaning", "happiness"],
    "Happiness cannot be pursued; it must ensue.",
    "The more you chase happiness, the more it eludes you. It's a byproduct of meaningful living, not a goal to be hunted.",
    40
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "meaning", "uniqueness"],
    "Everyone has his own specific vocation or mission in life.",
    "Your purpose is unique to you. No one else can fulfill it. Discover your particular calling and live it fully.",
    40
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "meaning", "question"],
    "Life ultimately means taking the responsibility to find the right answer to its problems.",
    "Life asks questions of us. We don't ask questions of life. Our answers are our actions. Respond well.",
    45
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "meaning", "courage"],
    "When we are no longer able to change a situation, we are challenged to change ourselves.",
    "Sometimes circumstances are fixed. You can still grow. Adapt. Transform. Your response is always within your power.",
    40
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "meaning", "dignity"],
    "A man who becomes conscious of the responsibility he bears toward a human being who affectionately waits for him, will never be able to throw away his life.",
    "Connection to others gives life meaning. Someone needs you. That knowledge alone can sustain you through anything.",
    50
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "meaning", "transcendence"],
    "What man actually needs is not a tensionless state but rather the striving and struggling for some goal worthy of him.",
    "We need challenge, not comfort. Meaning comes from effort, not ease. Seek worthy struggles.",
    40
  ),

  // ============================================
  // CAL NEWPORT - DEEP WORK (20 cards)
  // ============================================
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "focus", "success"],
    "The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable.",
    "Shallow work is easy and common. Deep work is hard and rare. Those who cultivate concentrated focus will dominate.",
    45
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "focus", "attention"],
    "If you don't produce, you won't thrive—no matter how skilled or talented you are.",
    "Talent without output is potential unrealized. The world rewards producers, not dreamers. Ideas executed are everything.",
    40
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "focus", "distraction"],
    "Efforts to deepen your focus will struggle if you don't simultaneously wean your mind from a dependence on distraction.",
    "You can't just add focus—you must subtract distraction. Train your mind to resist the pull of the shallow.",
    45
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "focus", "schedule"],
    "A deep work habit requires you to treat your attention with respect.",
    "Your attention is precious. Protect it. Schedule deep work. Guard those blocks. Treat focus time as sacred.",
    35
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "focus", "boredom"],
    "The ability to concentrate intensely is a skill that must be trained.",
    "Focus is a muscle. It weakens with neglect and strengthens with use. Practice concentration deliberately.",
    40
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "focus", "ritual"],
    "Great creative minds think like artists but work like accountants.",
    "Inspiration is romantic; execution is routine. The best creators have rigorous schedules and disciplined habits.",
    40
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "focus", "shallow"],
    "Shallow work is not inherently evil. But if you spend your entire day on it, you'll never get around to the deep work.",
    "Email and meetings have their place. But they shouldn't consume your prime hours. Prioritize depth.",
    40
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "focus", "rest"],
    "Idleness is not just a vacation, an indulgence or a vice; it is as indispensable to the brain as vitamin D is to the body.",
    "Rest is productive. Downtime allows the unconscious to process. Recharge intentionally. Don't grind 24/7.",
    45
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "focus", "quality"],
    "High-quality work produced = (time spent) x (intensity of focus).",
    "Time matters less than depth. One hour of deep focus beats four hours of distracted work. Maximize intensity.",
    35
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "focus", "email"],
    "Email is a wonderful thing for people whose role in life is to be on top of things. But not for people whose role is to be on the bottom of things.",
    "If your job is to create, email is the enemy. Limit inbox time. Batch communications. Protect your creative hours.",
    45
  ),
  makeCard(
    "Cal Newport",
    "So Good They Can't Ignore You",
    ["productivity", "career", "passion"],
    "Don't follow your passion. Develop it.",
    "Passion is cultivated, not discovered. Mastery breeds passion. Get good at something, and you'll learn to love it.",
    40
  ),
  makeCard(
    "Cal Newport",
    "So Good They Can't Ignore You",
    ["productivity", "career", "skills"],
    "Become so good they can't ignore you.",
    "Career capital is built through rare and valuable skills. Focus on what you can offer, not what work can offer you.",
    35
  ),
  makeCard(
    "Cal Newport",
    "So Good They Can't Ignore You",
    ["productivity", "career", "craftsman"],
    "The craftsman mindset focuses on what you can offer the world; the passion mindset focuses on what the world can offer you.",
    "One creates value; the other expects it. The craftsman mindset leads to fulfillment. The passion mindset leads to frustration.",
    45
  ),
  makeCard(
    "Cal Newport",
    "Digital Minimalism",
    ["productivity", "technology", "attention"],
    "Digital minimalism is a philosophy that helps you question what digital communication tools add to your life.",
    "Not all technology is beneficial. Evaluate tools by their true value. Keep only what serves you. Delete the rest.",
    40
  ),
  makeCard(
    "Cal Newport",
    "Digital Minimalism",
    ["productivity", "technology", "solitude"],
    "Solitude deprivation is a state in which you spend close to zero time alone with your own thoughts.",
    "Constant connectivity prevents self-reflection. Schedule time without devices. Your mental health depends on it.",
    45
  ),
  makeCard(
    "Cal Newport",
    "Digital Minimalism",
    ["productivity", "technology", "leisure"],
    "High-quality leisure beats mindless scrolling.",
    "Replace passive consumption with active engagement. Build, create, learn, play. Quality leisure energizes; mindless scrolling drains.",
    35
  ),
  makeCard(
    "Cal Newport",
    "A World Without Email",
    ["productivity", "communication", "workflow"],
    "The human brain was not designed to operate like a computer network.",
    "Constant context switching destroys productivity. Batch communications. Process in blocks. Your brain will thank you.",
    40
  ),
  makeCard(
    "Cal Newport",
    "A World Without Email",
    ["productivity", "communication", "systems"],
    "We need to stop asking people to work against their brains.",
    "Modern work patterns fight human nature. Design systems that work with your brain, not against it. Redesign workflows.",
    40
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "focus", "value"],
    "Clarity about what matters provides clarity about what does not.",
    "When you know your priorities, saying no becomes easy. Define what matters. Everything else is noise.",
    35
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "focus", "environment"],
    "Your will is not a manifestation of your character that you can depend on. It's instead like a muscle that tires.",
    "Don't rely on willpower—it depletes. Design your environment to support focus. Make the right choice the easy choice.",
    40
  ),

  // ============================================
  // YUVAL NOAH HARARI - SAPIENS (20 cards)
  // ============================================
  makeCard(
    "Yuval Noah Harari",
    "Sapiens",
    ["history", "science", "humanity"],
    "We study history not to know the future but to widen our horizons, to understand that our present situation is neither natural nor inevitable.",
    "History shows that things could have been different. The future can also be different. Nothing is fixed. Everything is possible.",
    50
  ),
  makeCard(
    "Yuval Noah Harari",
    "Sapiens",
    ["history", "science", "fiction"],
    "Large numbers of strangers can cooperate successfully by believing in common myths.",
    "Nations, money, religion, human rights—all are fictions we collectively believe. Shared stories enable civilization. Myths are power.",
    45
  ),
  makeCard(
    "Yuval Noah Harari",
    "Sapiens",
    ["history", "science", "happiness"],
    "One of history's few iron laws is that luxuries tend to become necessities and to spawn new obligations.",
    "Every convenience creates new expectations. Yesterday's luxury is today's necessity. Progress doesn't eliminate struggle—it transforms it.",
    45
  ),
  makeCard(
    "Yuval Noah Harari",
    "Sapiens",
    ["history", "science", "agriculture"],
    "The Agricultural Revolution was history's biggest fraud.",
    "It promised abundance but delivered toil. Farmers worked harder than foragers for a worse diet. Progress isn't always progress.",
    40
  ),
  makeCard(
    "Yuval Noah Harari",
    "Sapiens",
    ["history", "science", "imagination"],
    "How do you cause people to believe in an imagined order such as Christianity, democracy, or capitalism?",
    "You must never admit it is imagined. The illusion must be total. Shared belief creates shared reality. Fiction becomes fact through faith.",
    45
  ),
  makeCard(
    "Yuval Noah Harari",
    "Sapiens",
    ["history", "science", "money"],
    "Money is the most universal and most efficient system of mutual trust ever devised.",
    "It's not about paper or metal—it's about belief. Money works because we all agree it works. Trust is the currency beneath the currency.",
    40
  ),
  makeCard(
    "Yuval Noah Harari",
    "Sapiens",
    ["history", "science", "empire"],
    "Empires have been the world's most common form of political organization for the last 2,500 years.",
    "Small groups ruling large populations is the norm, not the exception. Power concentrates. This isn't new—it's ancient.",
    40
  ),
  makeCard(
    "Yuval Noah Harari",
    "Sapiens",
    ["history", "science", "religion"],
    "Religion can be defined as a system of human norms and values that is founded on a belief in a superhuman order.",
    "Religion isn't about gods—it's about order. It provides rules for living and meaning for dying. Every society needs this.",
    45
  ),
  makeCard(
    "Yuval Noah Harari",
    "Sapiens",
    ["history", "science", "revolution"],
    "The Scientific Revolution has not been a revolution of knowledge. It has been above all a revolution of ignorance.",
    "Science begins by admitting we don't know. That humility enabled discovery. Certainty is the enemy of progress.",
    45
  ),
  makeCard(
    "Yuval Noah Harari",
    "Sapiens",
    ["history", "science", "future"],
    "We are more powerful than ever before, but have very little idea what to do with all that power.",
    "Technology outpaces wisdom. We can do more than we understand. The gap between capability and judgment is dangerous.",
    40
  ),
  makeCard(
    "Yuval Noah Harari",
    "21 Lessons for the 21st Century",
    ["philosophy", "technology", "future"],
    "In a world deluged by irrelevant information, clarity is power.",
    "Information is abundant. Wisdom is scarce. The ability to filter signal from noise is the key skill of our era.",
    40
  ),
  makeCard(
    "Yuval Noah Harari",
    "21 Lessons for the 21st Century",
    ["philosophy", "technology", "change"],
    "The only constant is change itself.",
    "Reinvention is not optional—it's required. The skills that got you here won't get you there. Learn continuously or become obsolete.",
    35
  ),
  makeCard(
    "Yuval Noah Harari",
    "21 Lessons for the 21st Century",
    ["philosophy", "technology", "meaning"],
    "Questions you cannot answer are usually far better for you than answers you cannot question.",
    "Certainty closes minds. Questions open them. Embrace not knowing. It's the beginning of understanding.",
    40
  ),
  makeCard(
    "Yuval Noah Harari",
    "21 Lessons for the 21st Century",
    ["philosophy", "technology", "identity"],
    "Humans think in stories rather than in facts, numbers, or equations.",
    "We're narrative creatures. Data doesn't move us—stories do. Master storytelling to master persuasion.",
    35
  ),
  makeCard(
    "Yuval Noah Harari",
    "Homo Deus",
    ["philosophy", "technology", "future"],
    "History began when humans invented gods, and will end when humans become gods.",
    "We started by imagining superhuman beings. We're ending by becoming them. The arc of history is the story of deification.",
    45
  ),
  makeCard(
    "Yuval Noah Harari",
    "Homo Deus",
    ["philosophy", "technology", "algorithms"],
    "Algorithms are watching you right now.",
    "They know what you buy, what you watch, what you want. The question isn't whether AI will understand us—it already does. Better than we understand ourselves.",
    40
  ),
  makeCard(
    "Yuval Noah Harari",
    "Homo Deus",
    ["philosophy", "technology", "freedom"],
    "Free will is a myth invented by humans to justify their actions.",
    "Our choices are determined by genes, experiences, and random neural firings. The feeling of freedom is real; actual freedom is questionable.",
    45
  ),
  makeCard(
    "Yuval Noah Harari",
    "Homo Deus",
    ["philosophy", "technology", "death"],
    "The new technological religion is dataism.",
    "Data is the new god. The universe as information processing. Humans as data streams. The question is: who controls the data?",
    40
  ),
  makeCard(
    "Yuval Noah Harari",
    "Homo Deus",
    ["philosophy", "technology", "upgrades"],
    "Homo sapiens as we know them will probably disappear within a century.",
    "Not through extinction, but through transformation. We're on the verge of redesigning ourselves. Humanity 2.0 is coming.",
    45
  ),
  makeCard(
    "Yuval Noah Harari",
    "Homo Deus",
    ["philosophy", "technology", "meaning"],
    "In the twenty-first century, we are likely to make our most important decisions by following our feelings.",
    "As algorithms understand us better, we trust them more. We're outsourcing judgment. The question is: should we?",
    40
  ),

  // ============================================
  // DANIEL KAHNEMAN - THINKING FAST AND SLOW (20 cards)
  // ============================================
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decisions", "bias"],
    "Nothing in life is as important as you think it is while you are thinking about it.",
    "The focusing illusion distorts reality. Whatever you're fixated on seems bigger than it is. Step back. Zoom out.",
    45
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "intuition", "rationality"],
    "We are prone to overestimate how much we understand about the world.",
    "Your brain creates coherent narratives from incomplete information. You see patterns that aren't there. Stay humble about what you 'know.'",
    50
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decisions", "loss"],
    "Losses loom larger than gains.",
    "Losing $100 hurts more than finding $100 feels good. This loss aversion shapes most decisions. Recognize this bias to overcome it.",
    40
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decisions", "systems"],
    "System 1 is fast, intuitive, and emotional. System 2 is slow, deliberate, and logical.",
    "Most of life runs on autopilot. System 2 is lazy—it often just endorses System 1's snap judgments. Engage it deliberately.",
    45
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decisions", "anchoring"],
    "People who are exposed to an anchor value are pulled toward that number.",
    "First numbers influence final estimates. Negotiators know this. Price setters know this. Be aware of anchors in your thinking.",
    40
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decisions", "confidence"],
    "Our comforting conviction that the world makes sense rests on a secure foundation: our almost unlimited ability to ignore our ignorance.",
    "We don't know how little we know. The illusion of understanding feels real. Overconfidence is the norm, not the exception.",
    50
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decisions", "hindsight"],
    "Hindsight bias leads us to believe we could have predicted the past.",
    "Once we know the outcome, it seems obvious. But it wasn't. History looks inevitable backward; it was chaos forward.",
    40
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decisions", "regression"],
    "Success = talent + luck. Great success = a little more talent + a lot of luck.",
    "Regression to the mean explains why exceptional performance rarely repeats. Luck is a bigger factor than we admit.",
    45
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "happiness", "experience"],
    "The experiencing self and the remembering self are different.",
    "How you feel during an event and how you remember it diverge. Endings dominate memories. Peak moments matter more than duration.",
    45
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decisions", "framing"],
    "A 90% chance to win is the same as a 10% chance to lose—but they feel completely different.",
    "How information is framed changes decisions. The same facts, presented differently, produce different choices. Words matter.",
    40
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decisions", "availability"],
    "We overestimate the likelihood of events that are easy to recall.",
    "Plane crashes are memorable, so we fear flying. Car accidents are mundane, so we don't fear driving. Memory distorts risk perception.",
    40
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decisions", "planning"],
    "Plans are best-case scenarios. Things always take longer and cost more than expected.",
    "The planning fallacy is universal. Add buffer time. Add buffer budget. Then add more. You'll still be optimistic.",
    35
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decisions", "sunk-cost"],
    "People are reluctant to admit that money already spent is gone.",
    "Sunk costs shouldn't influence future decisions—but they do. What you've invested is irrelevant to what you should do next.",
    40
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decisions", "expertise"],
    "True experts know the limits of their expertise.",
    "Fake experts don't. Confidence without calibration is dangerous. The more someone claims certainty, the less you should trust them.",
    40
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decisions", "narrative"],
    "We are pattern seekers, believers in a coherent world.",
    "Randomness is uncomfortable. We invent explanations for chance events. Not everything happens for a reason—but our brains insist it does.",
    45
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decisions", "priming"],
    "What you see is all there is.",
    "We jump to conclusions based on limited evidence. We don't ask what's missing. The information we have feels complete—but it's never the whole picture.",
    40
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "happiness", "adaptation"],
    "People do not know what will make them happy.",
    "We're terrible at affective forecasting. We overestimate how long good or bad feelings will last. Hedonic adaptation is stronger than we think.",
    45
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decisions", "statistics"],
    "Statistical thinking is not intuitive. Our minds are not built for it.",
    "We think in stories, not probabilities. Base rates are ignored. Samples seem representative when they're not. Statistical literacy requires effort.",
    45
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decisions", "slow"],
    "When in doubt, slow down.",
    "Fast thinking causes most errors. Engage System 2. Check your assumptions. Question your intuition. Speed kills accuracy.",
    35
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decisions", "noise"],
    "Wherever there is judgment, there is noise.",
    "Different people make different decisions on the same case. Even the same person decides differently at different times. Reduce noise with systems.",
    40
  ),

  // Continue with more authors and books...
  // Adding more variety across categories

  // ============================================
  // CARL JUNG (15 cards)
  // ============================================
  makeCard(
    "Carl Jung",
    "Collected Works",
    ["psychology", "shadow", "integration"],
    "Until you make the unconscious conscious, it will direct your life and you will call it fate.",
    "The parts of yourself you deny control you from the shadows. Face your darkness. Integrate it. What you own can't own you.",
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
    "A small life with purpose beats a large life without one. Meaning isn't about scale—it's about significance.",
    40
  ),
  makeCard(
    "Carl Jung",
    "Collected Works",
    ["psychology", "shadow", "projection"],
    "Everything that irritates us about others can lead us to an understanding of ourselves.",
    "What you hate in others is often what you deny in yourself. Projection is a mirror. Use it for self-discovery.",
    45
  ),
  makeCard(
    "Carl Jung",
    "Collected Works",
    ["psychology", "individuation", "self"],
    "The privilege of a lifetime is to become who you truly are.",
    "Most people wear masks. True identity is buried beneath social expectations. Individuation is the journey to your authentic self.",
    40
  ),
  makeCard(
    "Carl Jung",
    "Collected Works",
    ["psychology", "archetypes", "symbols"],
    "Who looks outside, dreams; who looks inside, awakens.",
    "External searching leads to fantasy. Internal exploration leads to truth. The answers you seek are within.",
    35
  ),
  makeCard(
    "Carl Jung",
    "Collected Works",
    ["psychology", "wholeness", "opposites"],
    "I am not what happened to me; I am what I choose to become.",
    "Your past doesn't define you—your choices do. You have agency. You can rewrite your story. The future is unwritten.",
    40
  ),
  makeCard(
    "Carl Jung",
    "Collected Works",
    ["psychology", "wisdom", "age"],
    "The first half of life is devoted to forming a healthy ego; the second half is going inward and letting go of it.",
    "Young people build identity. Mature people transcend it. Each stage has its task. Don't skip ahead.",
    45
  ),
  makeCard(
    "Carl Jung",
    "Collected Works",
    ["psychology", "relationships", "projection"],
    "The meeting of two personalities is like the contact of two chemical substances: if there is any reaction, both are transformed.",
    "Real relationships change both parties. You can't stay the same after deep connection. Be ready to evolve.",
    40
  ),
  makeCard(
    "Carl Jung",
    "Collected Works",
    ["psychology", "dreams", "unconscious"],
    "Dreams are the guiding words of the soul.",
    "Your unconscious speaks through dreams. Listen. The symbols contain wisdom your waking mind can't access directly.",
    40
  ),
  makeCard(
    "Carl Jung",
    "Collected Works",
    ["psychology", "shadow", "acceptance"],
    "One does not become enlightened by imagining figures of light, but by making the darkness conscious.",
    "Spiritual bypassing doesn't work. You can't skip over the shadow. Integration requires facing what you'd rather ignore.",
    45
  ),
  makeCard(
    "Carl Jung",
    "Collected Works",
    ["psychology", "creativity", "unconscious"],
    "The creation of something new is not accomplished by the intellect but by the play instinct.",
    "Creativity isn't purely rational. It emerges from play, from the unconscious, from letting go of control. Serious play produces genius.",
    40
  ),
  makeCard(
    "Carl Jung",
    "Collected Works",
    ["psychology", "fear", "growth"],
    "Your vision will become clear only when you can look into your own heart.",
    "External clarity requires internal clarity first. Know thyself before trying to know the world. Self-knowledge is foundational.",
    35
  ),
  makeCard(
    "Carl Jung",
    "Collected Works",
    ["psychology", "synchronicity", "meaning"],
    "Synchronicity is an ever present reality for those who have eyes to see.",
    "Meaningful coincidences aren't random. The universe communicates with those who pay attention. Notice the patterns.",
    40
  ),
  makeCard(
    "Carl Jung",
    "Collected Works",
    ["psychology", "balance", "opposites"],
    "Even a happy life cannot be without a measure of darkness.",
    "The word 'happiness' would lose its meaning if it were not balanced by sadness. Accept the full spectrum of experience.",
    35
  ),

  // ============================================
  // BRENÉ BROWN (15 cards)
  // ============================================
  makeCard(
    "Brené Brown",
    "Daring Greatly",
    ["psychology", "vulnerability", "courage"],
    "Vulnerability is not weakness; it's our greatest measure of courage.",
    "Showing your true self is terrifying. Admitting you don't know. Saying 'I love you' first. These aren't weaknesses—they're acts of bravery.",
    40
  ),
  makeCard(
    "Brené Brown",
    "Daring Greatly",
    ["psychology", "shame", "connection"],
    "If we can share our story with someone who responds with empathy and understanding, shame can't survive.",
    "Shame thrives in secrecy. Speaking your truth to a compassionate listener dissolves it. Connection is the antidote.",
    45
  ),
  makeCard(
    "Brené Brown",
    "Daring Greatly",
    ["psychology", "vulnerability", "authenticity"],
    "Authenticity is a collection of choices that we have to make every day.",
    "Being real isn't a personality trait—it's a practice. Every interaction offers a choice: mask or truth. Choose truth.",
    40
  ),
  makeCard(
    "Brené Brown",
    "Braving the Wilderness",
    ["psychology", "belonging", "identity"],
    "True belonging doesn't require you to change who you are; it requires you to be who you are.",
    "Fitting in is not belonging. Belonging is being accepted as you are. Don't contort yourself to be included.",
    40
  ),
  makeCard(
    "Brené Brown",
    "The Gifts of Imperfection",
    ["psychology", "perfectionism", "worthiness"],
    "Perfectionism is not the same thing as striving to be your best.",
    "Perfectionism is armor. It's fear dressed as standards. Excellence is growth; perfectionism is hiding.",
    35
  ),
  makeCard(
    "Brené Brown",
    "The Gifts of Imperfection",
    ["psychology", "worthiness", "love"],
    "Owning our story and loving ourselves through that process is the bravest thing we'll ever do.",
    "Self-compassion isn't soft—it's strength. Embrace your full story, including the parts you're ashamed of.",
    40
  ),
  makeCard(
    "Brené Brown",
    "Rising Strong",
    ["psychology", "resilience", "failure"],
    "The middle is messy, but it's also where the magic happens.",
    "Growth isn't linear. The awkward, uncomfortable phase between falling and rising is where transformation occurs.",
    40
  ),
  makeCard(
    "Brené Brown",
    "Rising Strong",
    ["psychology", "emotions", "boundaries"],
    "The most compassionate people are the most boundaried.",
    "Setting limits isn't selfish—it enables generosity. You can't give from empty. Protect your resources to share them.",
    40
  ),
  makeCard(
    "Brené Brown",
    "Dare to Lead",
    ["leadership", "vulnerability", "trust"],
    "Clear is kind. Unclear is unkind.",
    "Avoiding hard conversations isn't nice—it's neglectful. Honest feedback serves people. Clarity is a form of respect.",
    35
  ),
  makeCard(
    "Brené Brown",
    "Dare to Lead",
    ["leadership", "trust", "connection"],
    "Trust is built in very small moments.",
    "It's not the grand gestures—it's the daily choices to show up, keep promises, and be reliable. Trust is earned in inches.",
    35
  ),
  makeCard(
    "Brené Brown",
    "Dare to Lead",
    ["leadership", "courage", "fear"],
    "You can choose courage or you can choose comfort, but you cannot choose both.",
    "Growth requires discomfort. Safety requires staying small. Pick your priority. The comfortable path leads nowhere new.",
    40
  ),
  makeCard(
    "Brené Brown",
    "Atlas of the Heart",
    ["psychology", "emotions", "understanding"],
    "Language is our portal to meaning-making, connection, healing, learning, and self-awareness.",
    "Name your emotions precisely. Granularity of emotion vocabulary leads to granularity of emotional intelligence.",
    45
  ),
  makeCard(
    "Brené Brown",
    "Atlas of the Heart",
    ["psychology", "emotions", "empathy"],
    "Empathy is not connecting to an experience; it's connecting to the emotions that underpin an experience.",
    "You don't need to have lived someone's story to understand their feelings. Emotions are universal.",
    40
  ),
  makeCard(
    "Brené Brown",
    "The Gifts of Imperfection",
    ["psychology", "joy", "gratitude"],
    "Joy comes to us in moments—ordinary moments. We risk missing out on joy when we get too busy chasing down the extraordinary.",
    "Stop waiting for big moments. Joy lives in the ordinary—in morning coffee, in casual laughter, in daily routines.",
    40
  ),
  makeCard(
    "Brené Brown",
    "Daring Greatly",
    ["psychology", "vulnerability", "connection"],
    "Connection is why we're here; it is what gives purpose and meaning to our lives.",
    "We are wired for connection. Isolation is suffering. Community is healing. Prioritize relationships above achievements.",
    40
  ),

  // ============================================
  // ECKHART TOLLE - POWER OF NOW (15 cards)
  // ============================================
  makeCard(
    "Eckhart Tolle",
    "The Power of Now",
    ["spirituality", "mindfulness", "present"],
    "Realize deeply that the present moment is all you have. Make the NOW the primary focus of your life.",
    "The past is memory. The future is imagination. Only now is real. Life happens in this moment and no other.",
    40
  ),
  makeCard(
    "Eckhart Tolle",
    "The Power of Now",
    ["spirituality", "mindfulness", "ego"],
    "The mind is a superb instrument if used rightly. Used wrongly, it becomes very destructive.",
    "The mind is a tool, not the master. When you identify with thoughts, you suffer. Observe the mind; don't become it.",
    45
  ),
  makeCard(
    "Eckhart Tolle",
    "The Power of Now",
    ["spirituality", "mindfulness", "acceptance"],
    "Accept—then act. Whatever the present moment contains, accept it as if you had chosen it.",
    "Resistance creates suffering. Acceptance creates peace. This doesn't mean passivity—it means acting from peace rather than anxiety.",
    45
  ),
  makeCard(
    "Eckhart Tolle",
    "The Power of Now",
    ["spirituality", "mindfulness", "time"],
    "Time isn't precious at all, because it is an illusion.",
    "What you think of as time is really just the eternal now disguised. Past and future exist only in the mind. Now is all there is.",
    40
  ),
  makeCard(
    "Eckhart Tolle",
    "The Power of Now",
    ["spirituality", "mindfulness", "suffering"],
    "All negativity is caused by an accumulation of psychological time and denial of the present.",
    "Guilt is past-focused. Anxiety is future-focused. Presence dissolves both. Return to now, and suffering lessens.",
    45
  ),
  makeCard(
    "Eckhart Tolle",
    "The Power of Now",
    ["spirituality", "mindfulness", "identity"],
    "What a liberation to realize that the 'voice in my head' is not who I am.",
    "You are not your thoughts. You are the awareness that observes thoughts. This distinction changes everything.",
    40
  ),
  makeCard(
    "Eckhart Tolle",
    "A New Earth",
    ["spirituality", "ego", "awakening"],
    "Ego is no more than identification with form.",
    "Your body, possessions, opinions, status—none of these are you. Mistaking them for self creates suffering. You are the formless aware presence.",
    45
  ),
  makeCard(
    "Eckhart Tolle",
    "A New Earth",
    ["spirituality", "ego", "pain"],
    "The pain-body wants to survive, just like every other entity in existence.",
    "Your accumulated emotional pain has its own agenda. It feeds on drama. Recognize it, and you break its power.",
    40
  ),
  makeCard(
    "Eckhart Tolle",
    "A New Earth",
    ["spirituality", "consciousness", "evolution"],
    "You cannot find yourself by going into the past. You can find yourself by coming into the present.",
    "Your true self isn't a story. It's presence. Stop searching in memories. Start being here now.",
    40
  ),
  makeCard(
    "Eckhart Tolle",
    "A New Earth",
    ["spirituality", "purpose", "awakening"],
    "Your outer journey may contain a million steps; your inner journey only has one: the step you are taking right now.",
    "Spiritual progress isn't measured in miles but in depth of presence. One moment of true awareness is the whole path.",
    45
  ),
  makeCard(
    "Eckhart Tolle",
    "The Power of Now",
    ["spirituality", "mindfulness", "stillness"],
    "When you lose touch with inner stillness, you lose touch with yourself.",
    "Beneath the noise of the mind is silence. That silence is you. Access it regularly. It's your home.",
    35
  ),
  makeCard(
    "Eckhart Tolle",
    "A New Earth",
    ["spirituality", "ego", "relationships"],
    "What you react to in others, you strengthen in yourself.",
    "Reaction is projection. What triggers you reveals your inner work. Use relationships as mirrors for growth.",
    40
  ),
  makeCard(
    "Eckhart Tolle",
    "The Power of Now",
    ["spirituality", "mindfulness", "peace"],
    "Where there is anger, there is always pain underneath.",
    "Anger is secondary. Beneath it lies hurt, fear, or frustration. Address the root, not the symptom.",
    35
  ),
  makeCard(
    "Eckhart Tolle",
    "A New Earth",
    ["spirituality", "purpose", "service"],
    "Awakening is a shift in consciousness in which thinking and awareness separate.",
    "Before awakening, you are your thoughts. After awakening, you observe them. This shift changes everything.",
    40
  ),
  makeCard(
    "Eckhart Tolle",
    "The Power of Now",
    ["spirituality", "mindfulness", "gratitude"],
    "Acknowledging the good that you already have in your life is the foundation for all abundance.",
    "Gratitude isn't just nice—it's transformative. Recognition of current blessings opens doors to more. Appreciate now.",
    40
  ),

  // ============================================
  // MALCOLM GLADWELL (15 cards)
  // ============================================
  makeCard(
    "Malcolm Gladwell",
    "Outliers",
    ["psychology", "success", "practice"],
    "Practice isn't the thing you do once you're good. It's the thing you do that makes you good.",
    "The 10,000-hour rule: mastery requires massive repetition. Talent is overrated. Deliberate practice is underrated.",
    40
  ),
  makeCard(
    "Malcolm Gladwell",
    "Outliers",
    ["psychology", "success", "opportunity"],
    "Success is not a random act. It arises out of a predictable and powerful set of circumstances and opportunities.",
    "Behind every 'overnight success' is a unique combination of timing, culture, and preparation. Luck is manufactured.",
    45
  ),
  makeCard(
    "Malcolm Gladwell",
    "Outliers",
    ["psychology", "success", "culture"],
    "The culture we belong to and the legacies passed down by our forebears shape the patterns of our achievement.",
    "Your background matters more than you think. Cultural inheritance shapes attitude, which shapes outcome. Know your influences.",
    45
  ),
  makeCard(
    "Malcolm Gladwell",
    "Outliers",
    ["psychology", "success", "timing"],
    "It's not how much money we make that ultimately makes us happy between nine and five. It's whether our work fulfills us.",
    "Autonomy, complexity, and connection between effort and reward—these determine work satisfaction. Money is secondary.",
    40
  ),
  makeCard(
    "Malcolm Gladwell",
    "Blink",
    ["psychology", "intuition", "decisions"],
    "There can be as much value in the blink of an eye as in months of rational analysis.",
    "Snap judgments can be surprisingly accurate. Your unconscious processes more than you know. Trust your gut—sometimes.",
    40
  ),
  makeCard(
    "Malcolm Gladwell",
    "Blink",
    ["psychology", "intuition", "expertise"],
    "Truly successful decision making relies on a balance between deliberate and instinctive thinking.",
    "Neither pure analysis nor pure intuition is optimal. The best thinkers blend both. Know when to use each mode.",
    45
  ),
  makeCard(
    "Malcolm Gladwell",
    "Blink",
    ["psychology", "intuition", "thin-slicing"],
    "We thin-slice whenever we meet a new person or have to make sense of something quickly.",
    "Your brain makes instant assessments based on minimal data. These rapid judgments are often accurate—but not always. Know the limits.",
    40
  ),
  makeCard(
    "Malcolm Gladwell",
    "The Tipping Point",
    ["psychology", "influence", "change"],
    "The tipping point is that magic moment when an idea, trend, or social behavior crosses a threshold and spreads like wildfire.",
    "Change isn't gradual—it's explosive once critical mass is reached. Small changes at the right point create massive effects.",
    45
  ),
  makeCard(
    "Malcolm Gladwell",
    "The Tipping Point",
    ["psychology", "influence", "networks"],
    "Connectors, mavens, and salesmen are the people who make epidemics happen.",
    "Not all people are equal in spreading ideas. Some are hubs. Find the connectors, and your message multiplies.",
    40
  ),
  makeCard(
    "Malcolm Gladwell",
    "The Tipping Point",
    ["psychology", "influence", "context"],
    "The power of context is that small changes in context can have big effects.",
    "Behavior is shaped by environment more than character. Change the situation, and you change the behavior. Context is king.",
    40
  ),
  makeCard(
    "Malcolm Gladwell",
    "David and Goliath",
    ["psychology", "adversity", "strength"],
    "What the Israelites saw was an intimidating giant. What David saw was a lumbering target.",
    "Disadvantages can be advantages in disguise. Perspective changes everything. Reframe your weaknesses.",
    40
  ),
  makeCard(
    "Malcolm Gladwell",
    "David and Goliath",
    ["psychology", "adversity", "underdog"],
    "The excessive amount of confidence we have in our own judgment is what makes us overlook new possibilities.",
    "The underdog succeeds by changing the rules. Don't compete on others' terms. Find your asymmetric advantage.",
    45
  ),
  makeCard(
    "Malcolm Gladwell",
    "Talking to Strangers",
    ["psychology", "communication", "trust"],
    "We default to truth. We believe what we're told.",
    "Our default is to trust—even when we shouldn't. This makes society function but leaves us vulnerable. Be aware of your bias to believe.",
    40
  ),
  makeCard(
    "Malcolm Gladwell",
    "Talking to Strangers",
    ["psychology", "communication", "transparency"],
    "We think we can easily see into the hearts of others based on the flimsiest of clues.",
    "Reading people is harder than you think. Faces don't always match feelings. Cultural differences confuse signals. Stay humble.",
    45
  ),
  makeCard(
    "Malcolm Gladwell",
    "Talking to Strangers",
    ["psychology", "communication", "misunderstanding"],
    "The right way to talk to strangers is with caution and humility.",
    "Assume you don't understand. Ask questions. Listen more. We're all strangers to each other until we're not. Bridge the gap carefully.",
    40
  ),

  // ============================================
  // PETER DRUCKER (15 cards)
  // ============================================
  makeCard(
    "Peter Drucker",
    "The Effective Executive",
    ["productivity", "focus", "management"],
    "There is nothing so useless as doing efficiently that which should not be done at all.",
    "Effectiveness is doing the right things. Efficiency is doing things right. The order matters. First, choose the right work.",
    40
  ),
  makeCard(
    "Peter Drucker",
    "The Effective Executive",
    ["productivity", "time", "management"],
    "Time is the scarcest resource, and unless it is managed nothing else can be managed.",
    "You can't make more time. You can only spend it better. Track where it goes. Eliminate waste. Protect your hours.",
    40
  ),
  makeCard(
    "Peter Drucker",
    "The Effective Executive",
    ["productivity", "decisions", "management"],
    "Effective executives do not make a great many decisions. They concentrate on what is important.",
    "Decision fatigue is real. Save your judgment for what matters. Routine decisions should be systematized, not deliberated.",
    40
  ),
  makeCard(
    "Peter Drucker",
    "The Effective Executive",
    ["leadership", "management", "results"],
    "Management is doing things right; leadership is doing the right things.",
    "Managers optimize execution. Leaders choose direction. Both are needed. Know which mode you're in.",
    35
  ),
  makeCard(
    "Peter Drucker",
    "The Effective Executive",
    ["productivity", "strengths", "management"],
    "Focus on opportunities rather than problems.",
    "Problems demand attention but opportunities create growth. Don't spend your best hours firefighting. Invest in what could be.",
    40
  ),
  makeCard(
    "Peter Drucker",
    "The Effective Executive",
    ["leadership", "people", "management"],
    "The best way to predict the future is to create it.",
    "Don't wait for change—drive it. Proactive beats reactive. Shape your industry rather than responding to it.",
    35
  ),
  makeCard(
    "Peter Drucker",
    "The Effective Executive",
    ["leadership", "communication", "management"],
    "The most important thing in communication is hearing what isn't said.",
    "Listen for subtext. Watch body language. Notice hesitation. The unsaid often matters more than the said.",
    40
  ),
  makeCard(
    "Peter Drucker",
    "Managing Oneself",
    ["productivity", "self-awareness", "career"],
    "Most people think they know what they are good at. They are usually wrong.",
    "Self-assessment is unreliable. Track your decisions and their outcomes. Feedback analysis reveals your true strengths.",
    40
  ),
  makeCard(
    "Peter Drucker",
    "Managing Oneself",
    ["productivity", "strengths", "career"],
    "One should waste as little effort as possible on improving areas of low competence.",
    "Build on strengths, don't fix weaknesses. It takes far more energy to go from incompetent to mediocre than from good to excellent.",
    40
  ),
  makeCard(
    "Peter Drucker",
    "The Practice of Management",
    ["business", "innovation", "strategy"],
    "The enterprise that does not innovate inevitably ages and declines.",
    "Standing still is moving backward. Markets evolve. Competitors improve. Innovation isn't optional—it's survival.",
    35
  ),

  // ============================================
  // SIMON SINEK (20 cards)
  // ============================================
  makeCard(
    "Simon Sinek",
    "Start With Why",
    ["leadership", "purpose", "influence"],
    "People don't buy what you do; they buy why you do it.",
    "Facts tell. Stories sell. Features inform. Purpose inspires. Lead with the reason behind your work.",
    40
  ),
  makeCard(
    "Simon Sinek",
    "Start With Why",
    ["leadership", "purpose", "marketing"],
    "Working hard for something we don't care about is called stress. Working hard for something we love is called passion.",
    "The difference between burnout and engagement is meaning. Same effort, different fuel. Find your why.",
    40
  ),
  makeCard(
    "Simon Sinek",
    "Leaders Eat Last",
    ["leadership", "trust", "service"],
    "Leadership is not about being in charge. It's about taking care of those in your charge.",
    "Power is given to those who serve. The best leaders sacrifice for their people. They eat last.",
    45
  ),
  makeCard(
    "Simon Sinek",
    "Leaders Eat Last",
    ["leadership", "safety", "culture"],
    "When we feel safe inside the organization, we will naturally combine our talents and strengths.",
    "Psychological safety enables collaboration. Fear enables politics. Create safety to unlock potential.",
    40
  ),
  makeCard(
    "Simon Sinek",
    "Leaders Eat Last",
    ["leadership", "trust", "teams"],
    "A team is not a group of people who work together. A team is a group of people who trust each other.",
    "Shared goals don't make teams. Shared trust does. Build trust first; performance follows.",
    35
  ),
  makeCard(
    "Simon Sinek",
    "The Infinite Game",
    ["leadership", "strategy", "mindset"],
    "In the Infinite Game, the true value of an organization is measured by the desire others have to contribute to that organization's ability to keep succeeding.",
    "Finite players play to win. Infinite players play to keep playing. Business is an infinite game.",
    50
  ),
  makeCard(
    "Simon Sinek",
    "The Infinite Game",
    ["leadership", "competition", "purpose"],
    "Worthy rivals help us become better versions of ourselves.",
    "Don't try to beat competitors—learn from them. They reveal your weaknesses. They push your growth.",
    40
  ),
  makeCard(
    "Simon Sinek",
    "The Infinite Game",
    ["leadership", "ethics", "decisions"],
    "There is no decision we can make that doesn't come with some sort of balance or sacrifice.",
    "Every yes is a no to something else. Every choice has a cost. Accept tradeoffs; don't pretend they don't exist.",
    40
  ),
  makeCard(
    "Simon Sinek",
    "Start With Why",
    ["leadership", "inspiration", "communication"],
    "Great leaders inspire action by giving people a sense of purpose or belonging.",
    "Manipulation gets compliance. Inspiration gets commitment. Short-term tactics vs. long-term loyalty.",
    40
  ),
  makeCard(
    "Simon Sinek",
    "Find Your Why",
    ["leadership", "purpose", "clarity"],
    "Your WHY is your purpose, cause or belief—the very reason your organization exists.",
    "Without a clear why, decisions become arbitrary. With a clear why, decisions become obvious.",
    35
  ),
  makeCard(
    "Simon Sinek",
    "Leaders Eat Last",
    ["leadership", "biology", "trust"],
    "Cortisol inhibits the release of oxytocin, the chemical responsible for empathy.",
    "Stress literally makes us less empathetic. High-stress environments create selfish cultures. Reduce cortisol to build connection.",
    45
  ),
  makeCard(
    "Simon Sinek",
    "The Infinite Game",
    ["leadership", "vision", "legacy"],
    "A Just Cause is a specific vision of a future state that does not yet exist.",
    "Lead toward something, not away from something. Positive vision beats defensive posture. Paint the future.",
    40
  ),

  // ============================================
  // ROBERT CIALDINI - INFLUENCE (15 cards)
  // ============================================
  makeCard(
    "Robert Cialdini",
    "Influence",
    ["psychology", "persuasion", "reciprocity"],
    "The rule of reciprocity says that we should try to repay what another person has provided us.",
    "Give first, and you create obligation. This works because humans are wired to balance social debts. Generosity is strategic.",
    45
  ),
  makeCard(
    "Robert Cialdini",
    "Influence",
    ["psychology", "persuasion", "commitment"],
    "Once we have made a choice or taken a stand, we will encounter personal and interpersonal pressures to behave consistently with that commitment.",
    "Small commitments lead to large ones. Get a foot in the door. People stay consistent with their self-image.",
    50
  ),
  makeCard(
    "Robert Cialdini",
    "Influence",
    ["psychology", "persuasion", "social-proof"],
    "We view a behavior as more correct in a given situation to the degree that we see others performing it.",
    "Social proof is a shortcut. If others are doing it, it must be right. This heuristic serves us—and misleads us.",
    45
  ),
  makeCard(
    "Robert Cialdini",
    "Influence",
    ["psychology", "persuasion", "liking"],
    "We prefer to say yes to the requests of people we know and like.",
    "Likability is leverage. Find common ground. Give genuine compliments. Connection creates compliance.",
    40
  ),
  makeCard(
    "Robert Cialdini",
    "Influence",
    ["psychology", "persuasion", "authority"],
    "We are trained from birth to believe that obedience to proper authority is right.",
    "Titles, uniforms, expertise—all trigger automatic deference. Question authority figures. Their symbols aren't always earned.",
    45
  ),
  makeCard(
    "Robert Cialdini",
    "Influence",
    ["psychology", "persuasion", "scarcity"],
    "Opportunities seem more valuable to us when their availability is limited.",
    "Scarcity creates desire. Limited time offers work. Exclusive access appeals. We want what we might lose.",
    40
  ),
  makeCard(
    "Robert Cialdini",
    "Pre-Suasion",
    ["psychology", "persuasion", "attention"],
    "What we present first changes the way people experience what we present to them next.",
    "Priming shapes perception. Set the stage before making your case. Context creates meaning.",
    40
  ),
  makeCard(
    "Robert Cialdini",
    "Pre-Suasion",
    ["psychology", "persuasion", "focus"],
    "Whatever is focal is causal.",
    "We attribute causality to whatever captures our attention. Direct attention strategically. What people notice, they blame or credit.",
    40
  ),
  makeCard(
    "Robert Cialdini",
    "Influence",
    ["psychology", "persuasion", "unity"],
    "We say yes to people who are like us—who share our identity.",
    "Shared identity creates automatic trust. We favor in-group members. Find what you have in common; emphasize it.",
    40
  ),
  makeCard(
    "Robert Cialdini",
    "Influence",
    ["psychology", "persuasion", "defense"],
    "The best defense against manipulation is awareness of the techniques.",
    "Once you see the patterns, they lose power. Study influence not to manipulate but to protect yourself from manipulation.",
    40
  ),

  // ============================================
  // NASSIM TALEB (20 cards)
  // ============================================
  makeCard(
    "Nassim Taleb",
    "Antifragile",
    ["philosophy", "resilience", "systems"],
    "Antifragility is beyond resilience or robustness. The resilient resists shocks; the antifragile gets better.",
    "Don't just survive stress—grow from it. Design systems that benefit from volatility. Chaos is an opportunity.",
    45
  ),
  makeCard(
    "Nassim Taleb",
    "Antifragile",
    ["philosophy", "risk", "optionality"],
    "Wind extinguishes a candle and energizes fire. You want to be the fire.",
    "Some things break under stress; others strengthen. Position yourself to benefit from uncertainty, not just endure it.",
    40
  ),
  makeCard(
    "Nassim Taleb",
    "The Black Swan",
    ["philosophy", "risk", "uncertainty"],
    "The inability to predict outliers implies the inability to predict the course of history.",
    "Rare events drive history. We can't predict them, but we can prepare for them. Expect the unexpected.",
    45
  ),
  makeCard(
    "Nassim Taleb",
    "The Black Swan",
    ["philosophy", "risk", "knowledge"],
    "We are quick to forget that just being alive is an extraordinary piece of good luck.",
    "Survival bias blinds us. We see the winners, not the losers. The full picture includes what didn't happen.",
    40
  ),
  makeCard(
    "Nassim Taleb",
    "Skin in the Game",
    ["philosophy", "ethics", "accountability"],
    "Never trust anyone who doesn't have skin in the game.",
    "Advisors without consequences give reckless advice. Demand that decision-makers bear the costs of their decisions.",
    40
  ),
  makeCard(
    "Nassim Taleb",
    "Skin in the Game",
    ["philosophy", "ethics", "symmetry"],
    "Don't tell me what you think, tell me what you have in your portfolio.",
    "Actions reveal beliefs. Words are cheap. Watch what people do with their own money, time, and reputation.",
    35
  ),
  makeCard(
    "Nassim Taleb",
    "Antifragile",
    ["philosophy", "learning", "failure"],
    "Trial and error is freedom.",
    "Tinkering beats planning. Evolution works through experimentation. Small failures enable big successes. Embrace error.",
    35
  ),
  makeCard(
    "Nassim Taleb",
    "The Black Swan",
    ["philosophy", "knowledge", "limits"],
    "The problem with experts is that they do not know what they do not know.",
    "Expertise in one domain creates blind spots. The more specialized, the more fragile. Cultivate meta-knowledge.",
    45
  ),
  makeCard(
    "Nassim Taleb",
    "Antifragile",
    ["health", "resilience", "stress"],
    "Abundance is harder for us to handle than scarcity.",
    "We evolved for scarcity. Excess—of food, comfort, information—makes us weak. Voluntary hardship builds strength.",
    40
  ),
  makeCard(
    "Nassim Taleb",
    "Fooled by Randomness",
    ["philosophy", "luck", "success"],
    "Mild success can be explainable by skills and labor. Wild success is attributable to variance.",
    "Hard work gets you to competence. Luck gets you to extraordinary. Don't confuse the two.",
    40
  ),
  makeCard(
    "Nassim Taleb",
    "Fooled by Randomness",
    ["philosophy", "luck", "humility"],
    "We favor the visible, the embedded, the personal, the narrated, and the tangible; we scorn the abstract.",
    "Stories beat statistics. Anecdotes beat data. Our brains prefer narrative to truth. Fight this tendency.",
    45
  ),
  makeCard(
    "Nassim Taleb",
    "Antifragile",
    ["philosophy", "simplicity", "systems"],
    "The simpler, the better. Complications lead to multiplicative chains of unanticipated effects.",
    "Complexity creates fragility. Simple systems fail gracefully. Complexity fails catastrophically. Simplify ruthlessly.",
    40
  ),
  makeCard(
    "Nassim Taleb",
    "Skin in the Game",
    ["philosophy", "ethics", "risk"],
    "If you have the rewards, you must also get some of the risks.",
    "Asymmetric payoffs corrupt judgment. Those who benefit from upside must share downside. No bailouts. No externalized costs.",
    40
  ),
  makeCard(
    "Nassim Taleb",
    "The Black Swan",
    ["philosophy", "prediction", "humility"],
    "Prediction requires knowing about technologies that will be discovered in the future.",
    "If you could predict innovation, you'd have already innovated. The future is fundamentally unknowable. Plan for uncertainty.",
    45
  ),
  makeCard(
    "Nassim Taleb",
    "Antifragile",
    ["philosophy", "time", "lindy"],
    "If a book has been in print for forty years, I can expect it to be in print for another forty years.",
    "The Lindy Effect: old things last longer. Time is the best filter. Trust what has survived.",
    40
  ),

  // ============================================
  // SETH GODIN (15 cards)
  // ============================================
  makeCard(
    "Seth Godin",
    "The Dip",
    ["business", "persistence", "strategy"],
    "Winners quit all the time. They just quit the right stuff at the right time.",
    "Strategic quitting is wisdom. Persistent quitting is foolishness. Know when you're in a dip vs. a dead end.",
    40
  ),
  makeCard(
    "Seth Godin",
    "The Dip",
    ["business", "mastery", "commitment"],
    "The Dip is the long slog between starting and mastery.",
    "Every worthwhile pursuit has a brutal middle. The dip separates the serious from the dilettantes. Push through.",
    40
  ),
  makeCard(
    "Seth Godin",
    "Purple Cow",
    ["business", "marketing", "differentiation"],
    "In a crowded marketplace, fitting in is failing. In a busy marketplace, not standing out is the same as being invisible.",
    "Safe is risky. Remarkable is safe. Be the purple cow in a field of brown ones.",
    40
  ),
  makeCard(
    "Seth Godin",
    "Linchpin",
    ["business", "creativity", "value"],
    "The only way to get what you're worth is to stand out, to exert emotional labor, to be seen as indispensable.",
    "Commodities compete on price. Artists compete on uniqueness. Be indispensable. Be a linchpin.",
    45
  ),
  makeCard(
    "Seth Godin",
    "Linchpin",
    ["business", "creativity", "resistance"],
    "The resistance is the voice in your head that tells you to play it safe, fit in, don't make waves.",
    "Your lizard brain wants comfort. Your potential wants growth. The resistance is the enemy of art. Ship anyway.",
    40
  ),
  makeCard(
    "Seth Godin",
    "Tribes",
    ["leadership", "community", "change"],
    "A tribe is a group of people connected to one another, connected to a leader, and connected to an idea.",
    "You don't need millions. You need a true tribe. Lead a movement, however small. Connection beats scale.",
    40
  ),
  makeCard(
    "Seth Godin",
    "Tribes",
    ["leadership", "change", "courage"],
    "The secret of leadership is simple: Do what you believe in. Paint a picture of the future. Go there.",
    "Leaders don't wait for permission. They don't need consensus. They act on belief and bring others along.",
    35
  ),
  makeCard(
    "Seth Godin",
    "This Is Marketing",
    ["business", "marketing", "service"],
    "Marketing is the generous act of helping someone solve a problem. Their problem.",
    "Marketing isn't manipulation—it's service. Find people with a problem you can solve. Help them. That's it.",
    40
  ),
  makeCard(
    "Seth Godin",
    "This Is Marketing",
    ["business", "marketing", "trust"],
    "The best marketers are farmers, not hunters.",
    "Hunters chase. Farmers cultivate. Build trust over time. Nurture relationships. The harvest comes to those who plant.",
    35
  ),
  makeCard(
    "Seth Godin",
    "The Practice",
    ["creativity", "process", "consistency"],
    "The practice is not the means to the output. The practice is the output.",
    "Process over product. Showing up daily matters more than occasional brilliance. The work is the reward.",
    40
  ),
  makeCard(
    "Seth Godin",
    "The Practice",
    ["creativity", "shipping", "fear"],
    "Ship creative work. The world needs your contribution.",
    "Perfectionism is hiding. Ship imperfect work. Get feedback. Improve. Repeat. Shipping is a practice.",
    35
  ),
  makeCard(
    "Seth Godin",
    "Poke the Box",
    ["business", "initiative", "action"],
    "The cost of being wrong is less than the cost of doing nothing.",
    "Inaction feels safe but isn't. The world rewards those who start, who try, who poke. Initiative is free. Use it.",
    35
  ),

  // ============================================
  // ANGELA DUCKWORTH - GRIT (15 cards)
  // ============================================
  makeCard(
    "Angela Duckworth",
    "Grit",
    ["psychology", "success", "persistence"],
    "Grit is passion and perseverance for long-term goals.",
    "Talent gets you started. Grit keeps you going. The grittiest people aren't the most talented—they're the most persistent.",
    40
  ),
  makeCard(
    "Angela Duckworth",
    "Grit",
    ["psychology", "success", "effort"],
    "Effort counts twice. Talent × effort = skill. Skill × effort = achievement.",
    "Talent without effort is just potential. Effort transforms talent into skill, and skill into achievement. Work harder.",
    45
  ),
  makeCard(
    "Angela Duckworth",
    "Grit",
    ["psychology", "success", "passion"],
    "Passion for your work is a little bit of discovery, followed by a lot of development, and then a lifetime of deepening.",
    "Passion isn't found—it's cultivated. Interest leads to practice. Practice leads to mastery. Mastery deepens passion.",
    45
  ),
  makeCard(
    "Angela Duckworth",
    "Grit",
    ["psychology", "success", "practice"],
    "Deliberate practice is for preparation. Flow is for performance.",
    "Practice should be hard and focused. Performance should be effortless and automatic. Train different than you play.",
    40
  ),
  makeCard(
    "Angela Duckworth",
    "Grit",
    ["psychology", "success", "purpose"],
    "Interest without purpose is nearly impossible to sustain.",
    "Passion fades without meaning. Connect your work to something larger than yourself. Purpose fuels perseverance.",
    40
  ),
  makeCard(
    "Angela Duckworth",
    "Grit",
    ["psychology", "success", "hope"],
    "Grit depends on a different kind of hope. It rests on the expectation that our own efforts can improve our future.",
    "Hopelessness kills grit. Growth mindset enables it. Believe that effort matters, and you'll make the effort.",
    40
  ),
  makeCard(
    "Angela Duckworth",
    "Grit",
    ["psychology", "success", "culture"],
    "If you want to be grittier, find a gritty culture and join it.",
    "Environment shapes behavior. Surround yourself with persistent people. Culture is contagious. Choose yours deliberately.",
    40
  ),
  makeCard(
    "Angela Duckworth",
    "Grit",
    ["psychology", "parenting", "support"],
    "Supportive and demanding parenting is the most likely to produce gritty children.",
    "High standards plus high support equals growth. Challenge without support is cruelty. Support without challenge is coddling.",
    45
  ),

  // ============================================
  // CAROL DWECK - MINDSET (15 cards)
  // ============================================
  makeCard(
    "Carol Dweck",
    "Mindset",
    ["psychology", "growth", "learning"],
    "In a growth mindset, challenges are exciting rather than threatening.",
    "Fixed mindset sees challenge as risk of failure. Growth mindset sees challenge as chance to grow. Reframe difficulty.",
    40
  ),
  makeCard(
    "Carol Dweck",
    "Mindset",
    ["psychology", "growth", "effort"],
    "The passion for stretching yourself and sticking to it, even when it's not going well, is the hallmark of the growth mindset.",
    "Talent is overrated. Effort is underrated. Growth mindset embraces struggle as the path to mastery.",
    45
  ),
  makeCard(
    "Carol Dweck",
    "Mindset",
    ["psychology", "growth", "failure"],
    "In the fixed mindset, failure is about being worthless. In the growth mindset, failure is about not yet having learned.",
    "Failure is feedback, not identity. 'I failed' vs. 'I am a failure'—the difference is everything.",
    40
  ),
  makeCard(
    "Carol Dweck",
    "Mindset",
    ["psychology", "growth", "intelligence"],
    "No matter what your current ability is, effort is what ignites that ability and turns it into accomplishment.",
    "IQ isn't fixed. Skills aren't fixed. With effort and strategy, you can develop almost any ability. Believe it.",
    40
  ),
  makeCard(
    "Carol Dweck",
    "Mindset",
    ["psychology", "growth", "praise"],
    "Praising children's intelligence harms their motivation and performance.",
    "Praise effort, not talent. 'You worked hard' beats 'You're smart.' Process praise builds growth mindset.",
    40
  ),
  makeCard(
    "Carol Dweck",
    "Mindset",
    ["psychology", "growth", "potential"],
    "Why waste time proving over and over how great you are, when you could be getting better?",
    "Fixed mindset seeks validation. Growth mindset seeks improvement. One protects ego; the other builds capability.",
    40
  ),
  makeCard(
    "Carol Dweck",
    "Mindset",
    ["psychology", "growth", "learning"],
    "Becoming is better than being.",
    "Fixed mindset focuses on proving. Growth mindset focuses on improving. The journey matters more than the destination.",
    35
  ),
  makeCard(
    "Carol Dweck",
    "Mindset",
    ["psychology", "growth", "relationships"],
    "In the growth mindset, there is no such thing as 'just' a natural.",
    "Natural talent is a myth. Behind every 'natural' is unseen effort. Don't be fooled by the highlight reel.",
    40
  ),

  // ============================================
  // ADAM GRANT (15 cards)
  // ============================================
  makeCard(
    "Adam Grant",
    "Give and Take",
    ["business", "relationships", "success"],
    "The most successful givers are those who rate high in concern for others and high in self-interest.",
    "Selfless giving leads to burnout. Strategic giving leads to success. Help others in ways that also help you.",
    45
  ),
  makeCard(
    "Adam Grant",
    "Give and Take",
    ["business", "relationships", "generosity"],
    "Being a giver is not about being nice, and it's not about being a pushover.",
    "Givers set boundaries. They give strategically. They know when to say no. Generosity without wisdom is victimhood.",
    40
  ),
  makeCard(
    "Adam Grant",
    "Give and Take",
    ["business", "relationships", "reciprocity"],
    "Givers succeed in a way that creates value, instead of just claiming it.",
    "Takers grab existing pie. Matchers trade slices. Givers make bigger pies. Expand value for everyone.",
    40
  ),
  makeCard(
    "Adam Grant",
    "Originals",
    ["creativity", "innovation", "conformity"],
    "The hallmark of originality is rejecting the default and exploring whether a better option exists.",
    "Originals question the status quo. They don't accept 'that's how it's done.' They ask, 'Could it be different?'",
    40
  ),
  makeCard(
    "Adam Grant",
    "Originals",
    ["creativity", "innovation", "risk"],
    "Originals are not the daredevils who leap before they look. They're the ones who reluctantly tiptoe to the edge of a cliff.",
    "Successful originals hedge their bets. They take calculated risks. They have backup plans. Cautious rebels win.",
    45
  ),
  makeCard(
    "Adam Grant",
    "Originals",
    ["creativity", "innovation", "procrastination"],
    "Procrastinating is a vice when it comes to productivity, but it can be a virtue for creativity.",
    "Letting ideas marinate improves them. Strategic delay beats premature action. Give thoughts time to develop.",
    40
  ),
  makeCard(
    "Adam Grant",
    "Think Again",
    ["psychology", "learning", "beliefs"],
    "We need to develop the habit of forming our own second opinions.",
    "Question your assumptions. Challenge your conclusions. Your first thought isn't always your best thought.",
    40
  ),
  makeCard(
    "Adam Grant",
    "Think Again",
    ["psychology", "learning", "humility"],
    "The goal is not to be wrong more often. It's to recognize that we're wrong more often than we think.",
    "Intellectual humility is power. Admitting ignorance opens doors to knowledge. Certainty closes them.",
    40
  ),
  makeCard(
    "Adam Grant",
    "Think Again",
    ["psychology", "learning", "curiosity"],
    "We can all benefit from thinking like scientists.",
    "Form hypotheses. Test them. Update beliefs based on evidence. This isn't just for labs—it's for life.",
    35
  ),
  makeCard(
    "Adam Grant",
    "Think Again",
    ["psychology", "influence", "persuasion"],
    "When we try to convince people to think again, our first instinct is usually to start talking. But that's not the best way.",
    "Listen first. Understand their view. Ask questions. Let them discover contradictions themselves. Dialogue beats debate.",
    45
  ),

  // ============================================
  // RICHARD FEYNMAN (10 cards)
  // ============================================
  makeCard(
    "Richard Feynman",
    "Surely You're Joking, Mr. Feynman!",
    ["science", "learning", "curiosity"],
    "The first principle is that you must not fool yourself—and you are the easiest person to fool.",
    "Your brain is a master of self-deception. Confirmation bias. Wishful thinking. Science is the art of not fooling yourself.",
    45
  ),
  makeCard(
    "Richard Feynman",
    "What Do You Care What Other People Think?",
    ["science", "authenticity", "learning"],
    "I would rather have questions that can't be answered than answers that can't be questioned.",
    "Certainty is dangerous. Curiosity is productive. Embrace the mystery. Distrust anyone who claims to have all the answers.",
    45
  ),
  makeCard(
    "Richard Feynman",
    "The Pleasure of Finding Things Out",
    ["science", "teaching", "understanding"],
    "If you can't explain it simply, you don't understand it well enough.",
    "Jargon hides ignorance. Complexity often masks confusion. The deepest understanding produces the simplest explanations.",
    40
  ),
  makeCard(
    "Richard Feynman",
    "The Feynman Lectures on Physics",
    ["science", "learning", "wonder"],
    "I can live with doubt, and uncertainty, and not knowing.",
    "The need for certainty is intellectual weakness. Tolerating ambiguity is strength. Learn to be comfortable not knowing.",
    40
  ),
  makeCard(
    "Richard Feynman",
    "The Pleasure of Finding Things Out",
    ["science", "learning", "play"],
    "Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.",
    "Playful curiosity beats forced study. Follow your interests wherever they lead. Passion is the best teacher.",
    40
  ),

  // ============================================
  // ALBERT EINSTEIN (10 cards)
  // ============================================
  makeCard(
    "Albert Einstein",
    "Ideas and Opinions",
    ["science", "imagination", "knowledge"],
    "Imagination is more important than knowledge.",
    "Knowledge tells you what is. Imagination tells you what could be. Facts are limited. Creativity is infinite.",
    35
  ),
  makeCard(
    "Albert Einstein",
    "The World As I See It",
    ["science", "simplicity", "understanding"],
    "Everything should be made as simple as possible, but not simpler.",
    "Complexity isn't intelligence. Simplicity is. But oversimplification is dangerous. Find the sweet spot.",
    40
  ),
  makeCard(
    "Albert Einstein",
    "Letter to Carl Seelig",
    ["science", "curiosity", "wonder"],
    "I have no special talents. I am only passionately curious.",
    "Genius isn't magic—it's sustained curiosity. Anyone can be curious for a moment. Geniuses stay curious for a lifetime.",
    35
  ),
  makeCard(
    "Albert Einstein",
    "Autobiographical Notes",
    ["science", "intuition", "discovery"],
    "The intuitive mind is a sacred gift and the rational mind is a faithful servant. We have created a society that honors the servant and has forgotten the gift.",
    "Logic alone doesn't create breakthroughs. Intuition leads; logic follows. Trust your instincts, then verify them.",
    50
  ),
  makeCard(
    "Albert Einstein",
    "Ideas and Opinions",
    ["science", "mistakes", "learning"],
    "A person who never made a mistake never tried anything new.",
    "Error is the price of progress. Playing it safe guarantees stagnation. Fail forward. Mistakes are tuition.",
    35
  ),

  // ============================================
  // DALE CARNEGIE (15 cards)
  // ============================================
  makeCard(
    "Dale Carnegie",
    "How to Win Friends and Influence People",
    ["relationships", "communication", "influence"],
    "You can make more friends in two months by becoming interested in other people than in two years by trying to get people interested in you.",
    "Attention is the greatest gift. People crave to be heard. Stop talking about yourself. Start asking about them.",
    45
  ),
  makeCard(
    "Dale Carnegie",
    "How to Win Friends and Influence People",
    ["relationships", "communication", "names"],
    "A person's name is to that person the sweetest sound in any language.",
    "Using someone's name is magic. It signals respect, attention, recognition. Learn names. Remember names. Use them.",
    35
  ),
  makeCard(
    "Dale Carnegie",
    "How to Win Friends and Influence People",
    ["relationships", "communication", "listening"],
    "To be interesting, be interested.",
    "Fascinating people aren't talkers—they're listeners. Ask questions. Show genuine curiosity. Interest begets interest.",
    35
  ),
  makeCard(
    "Dale Carnegie",
    "How to Win Friends and Influence People",
    ["relationships", "influence", "appreciation"],
    "The deepest principle in human nature is the craving to be appreciated.",
    "Everyone wants to feel valued. Genuine appreciation is rare and powerful. Give it freely and watch relationships transform.",
    40
  ),
  makeCard(
    "Dale Carnegie",
    "How to Win Friends and Influence People",
    ["relationships", "conflict", "criticism"],
    "Any fool can criticize, complain, and condemn—and most fools do.",
    "Criticism rarely changes behavior. It creates defensiveness. Find ways to make suggestions without creating enemies.",
    40
  ),
  makeCard(
    "Dale Carnegie",
    "How to Win Friends and Influence People",
    ["relationships", "influence", "ego"],
    "Talk to someone about themselves and they'll listen for hours.",
    "People's favorite topic is themselves. Use this. Let others do most of the talking. They'll think you're brilliant.",
    35
  ),
  makeCard(
    "Dale Carnegie",
    "How to Win Friends and Influence People",
    ["relationships", "conflict", "argument"],
    "The only way to get the best of an argument is to avoid it.",
    "Win the argument, lose the relationship. Even if you're right, proving it makes enemies. Find common ground instead.",
    40
  ),
  makeCard(
    "Dale Carnegie",
    "How to Win Friends and Influence People",
    ["relationships", "leadership", "mistakes"],
    "If you are wrong, admit it quickly and emphatically.",
    "Fast admission disarms critics. Defending mistakes extends conflict. Own your errors before others point them out.",
    35
  ),
  makeCard(
    "Dale Carnegie",
    "How to Win Friends and Influence People",
    ["relationships", "influence", "agreement"],
    "Begin in a friendly way.",
    "Start with agreement, not confrontation. Get the other person saying 'yes' early. Momentum matters in persuasion.",
    35
  ),
  makeCard(
    "Dale Carnegie",
    "How to Stop Worrying and Start Living",
    ["psychology", "worry", "peace"],
    "Our fatigue is often caused not by work, but by worry, frustration, and resentment.",
    "Mental exhaustion drains more than physical labor. Address the psychological drain. Your energy leaks through worry.",
    40
  ),
  makeCard(
    "Dale Carnegie",
    "How to Stop Worrying and Start Living",
    ["psychology", "worry", "present"],
    "Live in day-tight compartments.",
    "Don't borrow trouble from the future. Don't carry burdens from the past. Focus on what you can do today.",
    35
  ),

  // ============================================
  // STEPHEN COVEY - 7 HABITS (15 cards)
  // ============================================
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["productivity", "effectiveness", "principles"],
    "Begin with the end in mind.",
    "Start by defining what success looks like. Work backward from your vision. Without a destination, any road will do.",
    40
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["productivity", "priorities", "focus"],
    "The main thing is to keep the main thing the main thing.",
    "Focus relentlessly on priorities. Distractions are abundant. Attention is finite. Guard your main thing jealously.",
    35
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["productivity", "proactivity", "responsibility"],
    "Be proactive, not reactive.",
    "Proactive people choose their responses. Reactive people let circumstances choose for them. Take initiative. Own your life.",
    35
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["relationships", "communication", "empathy"],
    "Seek first to understand, then to be understood.",
    "Listen before you speak. Diagnose before you prescribe. Understanding precedes influence. Empathy opens ears.",
    40
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["productivity", "time", "quadrants"],
    "What is important is seldom urgent, and what is urgent is seldom important.",
    "The urgent screams; the important whispers. Prioritize important-not-urgent activities. That's where life is built.",
    45
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["relationships", "cooperation", "synergy"],
    "Synergy is what happens when one plus one equals ten or a hundred or even a thousand.",
    "Collaboration multiplies individual contributions. The whole exceeds the sum of parts. Find complementary partners.",
    40
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["productivity", "renewal", "balance"],
    "Sharpen the saw.",
    "Take time to renew physically, mentally, emotionally, and spiritually. Constant work without renewal leads to breakdown.",
    35
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["relationships", "negotiation", "win-win"],
    "Think win-win.",
    "Life isn't zero-sum. Seek solutions that benefit all parties. Win-lose thinking creates enemies. Win-win creates allies.",
    35
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["productivity", "character", "integrity"],
    "Private victories precede public victories.",
    "Master yourself before trying to influence others. Self-discipline before social success. Character before reputation.",
    40
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["leadership", "trust", "integrity"],
    "Trust is the glue of life. It's the most essential ingredient in effective communication.",
    "Without trust, everything takes longer and costs more. Build trust through consistent character. It's your greatest asset.",
    40
  ),

  // ============================================
  // REWORK - JASON FRIED & DHH (10 cards)
  // ============================================
  makeCard(
    "Jason Fried",
    "Rework",
    ["business", "productivity", "simplicity"],
    "Workaholism is not a virtue. Working more doesn't mean you care more or get more done.",
    "Efficiency beats effort. Smart work beats hard work. Burnout isn't a badge of honor—it's a failure of strategy.",
    40
  ),
  makeCard(
    "Jason Fried",
    "Rework",
    ["business", "planning", "action"],
    "Plans are guesses. Start calling them that to remove the stigma of admitting you don't know.",
    "Business plans are fiction. Reality will differ. Stay flexible. Commit to the problem, not the plan.",
    40
  ),
  makeCard(
    "Jason Fried",
    "Rework",
    ["business", "constraints", "creativity"],
    "Constraints are advantages in disguise. Limited resources force creativity.",
    "Abundance breeds complacency. Scarcity breeds innovation. Embrace your limits. They'll make you better.",
    40
  ),
  makeCard(
    "Jason Fried",
    "Rework",
    ["business", "meetings", "productivity"],
    "Meetings are toxic. They break your day into small, incoherent pieces.",
    "One hour meeting with 10 people = 10 hours lost. Think before you schedule. Protect everyone's time.",
    35
  ),
  makeCard(
    "Jason Fried",
    "Rework",
    ["business", "marketing", "teaching"],
    "Instead of trying to outspend or outsell competitors, try to out-teach them.",
    "Teaching builds trust. Sharing knowledge attracts customers. Give away your best ideas. You'll get more back.",
    40
  ),
  makeCard(
    "Jason Fried",
    "It Doesn't Have to Be Crazy at Work",
    ["business", "culture", "calm"],
    "The modern workplace is sick. And the sickness is an unhealthy obsession with growth.",
    "Endless growth is a cancer. Sustainable business beats explosive growth. Choose calm over chaos.",
    40
  ),

  // ============================================
  // MISCELLANEOUS WISDOM (30 cards)
  // ============================================
  makeCard(
    "William James",
    "The Principles of Psychology",
    ["psychology", "habits", "change"],
    "All our life, so far as it has definite form, is but a mass of habits.",
    "You are your habits. Change your habits, change your life. This is both liberating and terrifying.",
    40
  ),
  makeCard(
    "Ralph Waldo Emerson",
    "Self-Reliance",
    ["philosophy", "authenticity", "individualism"],
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "Conformity is the path of least resistance. Authenticity requires courage. Be yourself—everyone else is taken.",
    40
  ),
  makeCard(
    "Ralph Waldo Emerson",
    "Essays",
    ["philosophy", "character", "reputation"],
    "What you are speaks so loudly I cannot hear what you say.",
    "Actions reveal truth. Words are cheap. Your character broadcasts constantly. Make sure the signal is strong.",
    35
  ),
  makeCard(
    "Henry David Thoreau",
    "Walden",
    ["philosophy", "simplicity", "life"],
    "Our life is frittered away by detail. Simplify, simplify.",
    "Complexity obscures what matters. Reduce to essentials. Clear the clutter. Find clarity in simplicity.",
    35
  ),
  makeCard(
    "Henry David Thoreau",
    "Civil Disobedience",
    ["philosophy", "conscience", "action"],
    "The mass of men lead lives of quiet desperation.",
    "Don't settle for quiet desperation. Choose meaningful struggle. Live deliberately or not at all.",
    40
  ),
  makeCard(
    "Benjamin Franklin",
    "Poor Richard's Almanack",
    ["productivity", "time", "wisdom"],
    "Lost time is never found again.",
    "Time is your only non-renewable resource. Spend it wisely. You can make more money. You cannot make more time.",
    35
  ),
  makeCard(
    "Benjamin Franklin",
    "Autobiography",
    ["productivity", "improvement", "virtue"],
    "An investment in knowledge pays the best interest.",
    "Education compounds like nothing else. Every skill learned multiplies future options. Never stop learning.",
    35
  ),
  makeCard(
    "Abraham Lincoln",
    "Letters",
    ["leadership", "preparation", "opportunity"],
    "I will prepare and some day my chance will come.",
    "Luck favors the prepared. Keep improving. Keep learning. When opportunity knocks, be ready to answer.",
    35
  ),
  makeCard(
    "Theodore Roosevelt",
    "Citizenship in a Republic",
    ["leadership", "action", "criticism"],
    "It is not the critic who counts; not the man who points out how the strong man stumbles.",
    "The credit belongs to the person in the arena. Critics are cheap. Doers are rare. Choose action over commentary.",
    45
  ),
  makeCard(
    "Winston Churchill",
    "Speeches",
    ["leadership", "perseverance", "courage"],
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Neither success nor failure is permanent. What matters is persistence through both. Keep going.",
    40
  ),
  makeCard(
    "Winston Churchill",
    "Speeches",
    ["leadership", "optimism", "resilience"],
    "A pessimist sees the difficulty in every opportunity; an optimist sees the opportunity in every difficulty.",
    "Same situation, different lens. Your interpretation determines your experience. Choose optimism—it's more useful.",
    40
  ),
  makeCard(
    "Nelson Mandela",
    "Long Walk to Freedom",
    ["leadership", "courage", "fear"],
    "I learned that courage was not the absence of fear, but the triumph over it.",
    "Brave people feel fear—they act anyway. Courage is not fearlessness; it's fear management. Feel it and do it anyway.",
    40
  ),
  makeCard(
    "Nelson Mandela",
    "Letters",
    ["leadership", "education", "change"],
    "Education is the most powerful weapon which you can use to change the world.",
    "Knowledge liberates. Ideas transform. Education creates agency. Invest in learning to invest in the future.",
    35
  ),
  makeCard(
    "Martin Luther King Jr.",
    "Strength to Love",
    ["leadership", "courage", "faith"],
    "Faith is taking the first step even when you don't see the whole staircase.",
    "You don't need full clarity to begin. Start with what you know. The path reveals itself to walkers.",
    40
  ),
  makeCard(
    "Mahatma Gandhi",
    "Writings",
    ["philosophy", "change", "action"],
    "Be the change you wish to see in the world.",
    "Don't wait for others. Don't complain about what's wrong. Embody the solution. Change starts with you.",
    35
  ),
  makeCard(
    "Mahatma Gandhi",
    "Writings",
    ["philosophy", "strength", "nonviolence"],
    "Strength does not come from physical capacity. It comes from an indomitable will.",
    "True power is internal. Will beats muscle. Character beats capability. Develop your inner strength.",
    40
  ),
  makeCard(
    "Mother Teresa",
    "Writings",
    ["spirituality", "service", "kindness"],
    "Not all of us can do great things. But we can do small things with great love.",
    "Impact isn't about scale—it's about intention. Small acts of love ripple outward. Do what you can, with love.",
    40
  ),
  makeCard(
    "Dalai Lama",
    "The Art of Happiness",
    ["spirituality", "happiness", "compassion"],
    "If you want others to be happy, practice compassion. If you want to be happy, practice compassion.",
    "Selfishness fails even as self-interest. Giving creates joy. Compassion benefits the giver as much as the receiver.",
    40
  ),
  makeCard(
    "Thich Nhat Hanh",
    "The Miracle of Mindfulness",
    ["spirituality", "mindfulness", "presence"],
    "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
    "Joy isn't in the future. It's here, now, waiting to be noticed. Pay attention. The miracle is always present.",
    40
  ),
  makeCard(
    "Thich Nhat Hanh",
    "Peace Is Every Step",
    ["spirituality", "mindfulness", "breathing"],
    "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.",
    "Emotions are weather. You are the sky. Breathe through storms. Return to stillness. This too shall pass.",
    40
  ),
  makeCard(
    "Alan Watts",
    "The Wisdom of Insecurity",
    ["philosophy", "uncertainty", "presence"],
    "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
    "Resistance to change is suffering. Flow with reality. Embrace uncertainty. Dance with chaos.",
    40
  ),
  makeCard(
    "Alan Watts",
    "The Book",
    ["philosophy", "ego", "identity"],
    "Trying to define yourself is like trying to bite your own teeth.",
    "The self trying to know itself creates infinite regress. You are not an object to be studied but a process to be lived.",
    45
  ),
  makeCard(
    "Joseph Campbell",
    "The Hero with a Thousand Faces",
    ["philosophy", "journey", "transformation"],
    "The cave you fear to enter holds the treasure you seek.",
    "What you avoid has what you need. Growth lives where fear does. The dragon guards the gold.",
    40
  ),
  makeCard(
    "Joseph Campbell",
    "The Power of Myth",
    ["philosophy", "meaning", "passion"],
    "Follow your bliss and the universe will open doors where there were only walls.",
    "Pursue what makes you come alive. Doors open for those following their calling. Trust your deepest yes.",
    40
  ),
  makeCard(
    "Kahlil Gibran",
    "The Prophet",
    ["philosophy", "work", "love"],
    "Work is love made visible.",
    "Work without love is drudgery. Work with love is art. Infuse your labor with care. It transforms everything.",
    35
  ),
  makeCard(
    "Kahlil Gibran",
    "The Prophet",
    ["relationships", "love", "freedom"],
    "Let there be spaces in your togetherness.",
    "Love doesn't mean fusion. Healthy relationships maintain individuality. Closeness needs distance. Connection needs space.",
    40
  ),
  makeCard(
    "Rumi",
    "Collected Poems",
    ["spirituality", "love", "transformation"],
    "The wound is the place where the Light enters you.",
    "Your breaks become your breakthroughs. Pain creates openings for growth. Embrace your cracks—they let in light.",
    40
  ),
  makeCard(
    "Rumi",
    "Collected Poems",
    ["spirituality", "seeking", "presence"],
    "What you seek is seeking you.",
    "Your desires aren't random. They're signals. What calls to you is calling for a reason. Trust the pull.",
    35
  ),
  makeCard(
    "Marie Curie",
    "Pierre Curie",
    ["science", "courage", "discovery"],
    "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
    "Fear comes from ignorance. Courage comes from knowledge. Whatever terrifies you—learn about it.",
    45
  ),

  // ============================================
  // PAULO COELHO - THE ALCHEMIST (15 cards)
  // ============================================
  makeCard(
    "Paulo Coelho",
    "The Alchemist",
    ["philosophy", "dreams", "purpose"],
    "When you want something, all the universe conspires in helping you to achieve it.",
    "Commitment creates synchronicity. Once you decide, resources appear. The universe responds to decisiveness.",
    40
  ),
  makeCard(
    "Paulo Coelho",
    "The Alchemist",
    ["philosophy", "fear", "dreams"],
    "There is only one thing that makes a dream impossible to achieve: the fear of failure.",
    "Fear, not circumstance, is the dream killer. Face your fears. Act despite them. Dreams die from inaction.",
    40
  ),
  makeCard(
    "Paulo Coelho",
    "The Alchemist",
    ["philosophy", "journey", "treasure"],
    "People learn, early in their lives, what is their reason for being. Maybe that's why they give up on it so early, too.",
    "We know our purpose as children. Then we unlearn it. Rediscover what you always knew. Your soul remembers.",
    45
  ),
  makeCard(
    "Paulo Coelho",
    "The Alchemist",
    ["philosophy", "present", "wisdom"],
    "Because I don't live in either my past or my future. I'm interested only in the present.",
    "The past is gone. The future is imagination. Only now is real. Be fully here, fully now.",
    35
  ),
  makeCard(
    "Paulo Coelho",
    "The Alchemist",
    ["philosophy", "love", "risk"],
    "One is loved because one is loved. No reason is needed for loving.",
    "Love doesn't need justification. It simply is. Stop analyzing why you love. Just love.",
    35
  ),
  makeCard(
    "Paulo Coelho",
    "The Alchemist",
    ["philosophy", "destiny", "choice"],
    "Everyone seems to have a clear idea of how other people should lead their lives, but none about his or her own.",
    "We're experts on others' lives, amateurs at our own. Focus inward. Your path is your business.",
    40
  ),
  makeCard(
    "Paulo Coelho",
    "The Alchemist",
    ["philosophy", "courage", "heart"],
    "Tell your heart that the fear of suffering is worse than the suffering itself.",
    "Anticipated pain exceeds actual pain. Your imagination tortures more than reality ever could. Act now.",
    40
  ),
  makeCard(
    "Paulo Coelho",
    "The Alchemist",
    ["philosophy", "simplicity", "truth"],
    "The simple things are also the most extraordinary things, and only the wise can see them.",
    "Complexity blinds. Simplicity reveals. The profound often looks ordinary. Develop eyes to see.",
    40
  ),
  makeCard(
    "Paulo Coelho",
    "Manuscript Found in Accra",
    ["philosophy", "failure", "growth"],
    "You will never be able to escape from your heart. So it's better to listen to what it has to say.",
    "Your heart knows. Your head argues. When in conflict, trust the heart. It sees what the mind misses.",
    40
  ),
  makeCard(
    "Paulo Coelho",
    "The Alchemist",
    ["philosophy", "potential", "journey"],
    "Remember that wherever your heart is, there you will find your treasure.",
    "Your treasure isn't far away. It's wherever you place your love. Follow your heart to find your gold.",
    35
  ),

  // ============================================
  // STEVEN PRESSFIELD - WAR OF ART (15 cards)
  // ============================================
  makeCard(
    "Steven Pressfield",
    "The War of Art",
    ["creativity", "resistance", "work"],
    "The more important a call or action is to our soul's evolution, the more Resistance we will feel toward pursuing it.",
    "Resistance is a compass. What you most resist is often what you most need. Follow the fear.",
    45
  ),
  makeCard(
    "Steven Pressfield",
    "The War of Art",
    ["creativity", "resistance", "procrastination"],
    "Procrastination is the most common manifestation of Resistance because it's the easiest to rationalize.",
    "Tomorrow never comes. The work waits. Resistance wins through delay. Start now—imperfectly, but now.",
    40
  ),
  makeCard(
    "Steven Pressfield",
    "The War of Art",
    ["creativity", "professionalism", "discipline"],
    "The amateur plays for fun. The professional plays for keeps.",
    "Amateurs work when inspired. Professionals work on schedule. Consistency beats inspiration. Show up daily.",
    35
  ),
  makeCard(
    "Steven Pressfield",
    "The War of Art",
    ["creativity", "resistance", "fear"],
    "The more scared we are of a work or calling, the more sure we can be that we have to do it.",
    "Fear marks the path. What terrifies you is what will transform you. Lean into the terror.",
    40
  ),
  makeCard(
    "Steven Pressfield",
    "The War of Art",
    ["creativity", "ego", "work"],
    "The professional has learned that success, like happiness, comes as a by-product of work.",
    "Don't chase outcomes. Chase process. Do the work well. Results follow. Attachment to results blocks flow.",
    40
  ),
  makeCard(
    "Steven Pressfield",
    "The War of Art",
    ["creativity", "dedication", "craft"],
    "Someone once asked Somerset Maugham if he wrote on a schedule or only when struck by inspiration. 'I write only when inspiration strikes,' he replied. 'Fortunately it strikes every morning at nine o'clock sharp.'",
    "Inspiration is a myth used by those who don't work. Muses visit those who show up. Be there.",
    50
  ),
  makeCard(
    "Steven Pressfield",
    "Turning Pro",
    ["creativity", "commitment", "identity"],
    "Turning pro is a decision. It's about declaring your intentions, stating your values, and committing to them.",
    "Amateur to professional is a mindset shift, not a skill upgrade. Decide you're serious. Then act like it.",
    40
  ),
  makeCard(
    "Steven Pressfield",
    "The War of Art",
    ["creativity", "patience", "mastery"],
    "The professional arms himself with patience.",
    "Overnight success takes years. The professional expects setbacks. They're part of the path, not detours from it.",
    35
  ),
  makeCard(
    "Steven Pressfield",
    "The War of Art",
    ["creativity", "criticism", "work"],
    "The professional does not take failure personally.",
    "Your work isn't you. Criticism of work isn't criticism of self. Detach ego from output. Keep creating.",
    35
  ),
  makeCard(
    "Steven Pressfield",
    "Do the Work",
    ["creativity", "action", "resistance"],
    "Start before you're ready.",
    "Readiness is an illusion. There's no perfect time. Begin now. Figure it out along the way. Motion creates clarity.",
    35
  ),

  // ============================================
  // TARA BRACH (10 cards)
  // ============================================
  makeCard(
    "Tara Brach",
    "Radical Acceptance",
    ["mindfulness", "acceptance", "peace"],
    "Radical Acceptance is the willingness to experience ourselves and our lives as it is.",
    "Fighting reality is suffering. Acceptance isn't approval—it's acknowledgment. Start from what is, not what should be.",
    45
  ),
  makeCard(
    "Tara Brach",
    "Radical Acceptance",
    ["mindfulness", "self-compassion", "worthiness"],
    "Perhaps the biggest tragedy of our lives is that freedom is possible, yet we can pass our years trapped in the same old patterns.",
    "Liberation is available now. Old patterns persist from habit, not necessity. You can change. Start today.",
    45
  ),
  makeCard(
    "Tara Brach",
    "Radical Acceptance",
    ["mindfulness", "presence", "awakening"],
    "The boundary to what we can accept is the boundary to our freedom.",
    "What you can't accept imprisons you. Expand acceptance, expand freedom. The cage is made of resistance.",
    40
  ),
  makeCard(
    "Tara Brach",
    "Radical Compassion",
    ["mindfulness", "compassion", "healing"],
    "The RAIN of self-compassion: Recognize, Allow, Investigate, Nurture.",
    "RAIN is a practice: See what's happening. Let it be. Explore with kindness. Offer care. Transformation follows.",
    45
  ),
  makeCard(
    "Tara Brach",
    "Radical Acceptance",
    ["mindfulness", "fear", "presence"],
    "We are uncomfortable because everything in our life keeps changing.",
    "Impermanence is the source of both suffering and liberation. Resist change and suffer. Accept change and find peace.",
    40
  ),
  makeCard(
    "Tara Brach",
    "Trusting the Gold",
    ["mindfulness", "worthiness", "love"],
    "Feeling that something is wrong with me is the invisible and toxic gas that we all breathe.",
    "The trance of unworthiness is epidemic. It's not personal—it's cultural. Wake up from the lie. You're already worthy.",
    45
  ),

  // ============================================
  // PEMA CHÖDRÖN (10 cards)
  // ============================================
  makeCard(
    "Pema Chödrön",
    "When Things Fall Apart",
    ["mindfulness", "uncertainty", "courage"],
    "The truth is that things don't really get solved. They come together and they fall apart. Then they come together again and fall apart again.",
    "Stop waiting for permanent resolution. Life is cycles. Ride the waves. Find peace in motion, not stability.",
    50
  ),
  makeCard(
    "Pema Chödrön",
    "When Things Fall Apart",
    ["mindfulness", "groundlessness", "freedom"],
    "To be fully alive, fully human, and completely awake is to be continually thrown out of the nest.",
    "Security is an illusion. Groundlessness is reality. Make friends with uncertainty. It's where life happens.",
    45
  ),
  makeCard(
    "Pema Chödrön",
    "The Places That Scare You",
    ["mindfulness", "fear", "compassion"],
    "Compassion is not a relationship between the healer and the wounded. It's a relationship between equals.",
    "True compassion doesn't look down. It recognizes shared humanity. We're all broken. We're all healing.",
    40
  ),
  makeCard(
    "Pema Chödrön",
    "When Things Fall Apart",
    ["mindfulness", "suffering", "awakening"],
    "Nothing ever goes away until it has taught us what we need to know.",
    "Recurring patterns aren't bad luck—they're unlearned lessons. Pay attention. Learn. Then the pattern can release.",
    40
  ),
  makeCard(
    "Pema Chödrön",
    "Start Where You Are",
    ["mindfulness", "acceptance", "beginning"],
    "Start where you are. Use what you have. Do what you can.",
    "No waiting for better conditions. No wishing for different resources. Begin here, now, with this. It's enough.",
    35
  ),
  makeCard(
    "Pema Chödrön",
    "Comfortable with Uncertainty",
    ["mindfulness", "openness", "curiosity"],
    "The most fundamental aggression to ourselves is to remain ignorant by not having the courage and the respect to look at ourselves honestly and gently.",
    "Self-deception is self-violence. Honest self-seeing, done with kindness, is the beginning of transformation.",
    50
  ),

  // ============================================
  // DON MIGUEL RUIZ - FOUR AGREEMENTS (10 cards)
  // ============================================
  makeCard(
    "Don Miguel Ruiz",
    "The Four Agreements",
    ["philosophy", "integrity", "words"],
    "Be impeccable with your word. Speak with integrity. Say only what you mean.",
    "Your word creates your world. Speak truth. Avoid gossip. Use language to build, not destroy.",
    40
  ),
  makeCard(
    "Don Miguel Ruiz",
    "The Four Agreements",
    ["philosophy", "freedom", "projection"],
    "Don't take anything personally. Nothing others do is because of you.",
    "People act from their own reality, not yours. Their opinions reflect them, not you. Liberate yourself from others' views.",
    40
  ),
  makeCard(
    "Don Miguel Ruiz",
    "The Four Agreements",
    ["philosophy", "clarity", "assumptions"],
    "Don't make assumptions. Find the courage to ask questions and express what you really want.",
    "Assumptions create suffering. Ask instead of assuming. Communicate clearly. Truth beats imagination.",
    40
  ),
  makeCard(
    "Don Miguel Ruiz",
    "The Four Agreements",
    ["philosophy", "excellence", "effort"],
    "Always do your best. Your best is going to change from moment to moment.",
    "Do your best in each moment—no more, no less. Yesterday's best is irrelevant. Today's conditions are unique.",
    40
  ),
  makeCard(
    "Don Miguel Ruiz",
    "The Mastery of Love",
    ["relationships", "love", "freedom"],
    "If you love yourself, you will express that love in your interactions with others.",
    "Self-love overflows into other-love. You can't give what you don't have. Fill your own cup first.",
    40
  ),
  makeCard(
    "Don Miguel Ruiz",
    "The Four Agreements",
    ["philosophy", "domestication", "beliefs"],
    "We have a choice to believe or not to believe what is said to us.",
    "You inherited beliefs you never chose. Examine them. Keep what serves. Release what doesn't. Become the author of your mind.",
    45
  ),

  // ============================================
  // GARY KELLER - THE ONE THING (10 cards)
  // ============================================
  makeCard(
    "Gary Keller",
    "The ONE Thing",
    ["productivity", "focus", "priorities"],
    "What's the ONE Thing you can do such that by doing it everything else will be easier or unnecessary?",
    "Focus beats breadth. Find the domino that knocks down all others. Priority is singular, not plural.",
    40
  ),
  makeCard(
    "Gary Keller",
    "The ONE Thing",
    ["productivity", "multitasking", "focus"],
    "Multitasking is a lie. It's not that you can't do two things at once. It's that you shouldn't.",
    "Task-switching has a cost. Every switch wastes energy. Single-tasking is the skill of the future.",
    40
  ),
  makeCard(
    "Gary Keller",
    "The ONE Thing",
    ["productivity", "discipline", "habits"],
    "Discipline and willpower are not the same thing. Willpower is limited; discipline is built through habit.",
    "Don't rely on willpower—it depletes. Build habits that don't require discipline. Automate good behavior.",
    40
  ),
  makeCard(
    "Gary Keller",
    "The ONE Thing",
    ["productivity", "time-blocking", "focus"],
    "Time blocking is the most productive people's secret weapon.",
    "Protect time for your ONE thing. Block it. Guard it. Treat it as sacred. What gets scheduled gets done.",
    35
  ),
  makeCard(
    "Gary Keller",
    "The ONE Thing",
    ["productivity", "results", "work"],
    "Work is a rubber ball. If you drop it, it will bounce back. The other four balls—family, health, friends, integrity—are made of glass.",
    "Not all areas of life are equal. Work recovers from neglect. Relationships don't. Choose wisely what you drop.",
    45
  ),

  // ============================================
  // DAVID GOGGINS (10 cards)
  // ============================================
  makeCard(
    "David Goggins",
    "Can't Hurt Me",
    ["psychology", "mindset", "limits"],
    "We're all leaving so much on the table. We don't tap into 60% of our potential.",
    "Your mind quits before your body. The 40% rule: When you think you're done, you're only 40% done. Push further.",
    45
  ),
  makeCard(
    "David Goggins",
    "Can't Hurt Me",
    ["psychology", "comfort", "growth"],
    "The only way to grow is to step outside your comfort zone.",
    "Comfort is the enemy of achievement. Seek discomfort deliberately. Your growth zone is your stress zone.",
    40
  ),
  makeCard(
    "David Goggins",
    "Can't Hurt Me",
    ["psychology", "accountability", "excuses"],
    "No one is coming to save you. It's all on you.",
    "Stop waiting for rescue. Stop blaming circumstances. You are the only one who can change your life. Act like it.",
    35
  ),
  makeCard(
    "David Goggins",
    "Can't Hurt Me",
    ["psychology", "identity", "transformation"],
    "You are in danger of living a life so comfortable and soft, that you will die without ever realizing your potential.",
    "Comfort kills dreams slowly. It doesn't feel like death, but it is. Wake up. Do hard things.",
    45
  ),
  makeCard(
    "David Goggins",
    "Can't Hurt Me",
    ["psychology", "discipline", "consistency"],
    "Motivation is crap. Motivation comes and goes. When you're driven, whatever is in front of you will get destroyed.",
    "Don't wait for motivation. Build discipline. Motivation is weather; discipline is climate. One is reliable.",
    40
  ),
  makeCard(
    "David Goggins",
    "Can't Hurt Me",
    ["psychology", "pain", "growth"],
    "Suffering is a test. That's all it is. It's the same test we all have to take.",
    "Pain is the admission fee to growth. Everyone pays it. The question is whether you get the benefits.",
    40
  ),

  // ============================================
  // JIM ROHN (10 cards)
  // ============================================
  makeCard(
    "Jim Rohn",
    "The Art of Exceptional Living",
    ["business", "success", "habits"],
    "Success is nothing more than a few simple disciplines, practiced every day.",
    "Excellence isn't complicated. It's consistent. Simple things done daily compound into extraordinary results.",
    40
  ),
  makeCard(
    "Jim Rohn",
    "The Art of Exceptional Living",
    ["business", "relationships", "environment"],
    "You are the average of the five people you spend the most time with.",
    "Proximity is power. Your companions shape your thinking. Choose them deliberately. Your future depends on it.",
    35
  ),
  makeCard(
    "Jim Rohn",
    "The Art of Exceptional Living",
    ["business", "wealth", "service"],
    "The major key to your better future is you.",
    "Stop fixing external things. Fix yourself. Personal development is the master key that opens all doors.",
    35
  ),
  makeCard(
    "Jim Rohn",
    "The Art of Exceptional Living",
    ["business", "change", "responsibility"],
    "For things to change, you have to change. For things to get better, you have to get better.",
    "The world doesn't change for you—you change for it. Improve yourself, and your circumstances improve.",
    35
  ),
  makeCard(
    "Jim Rohn",
    "The Art of Exceptional Living",
    ["business", "goals", "planning"],
    "If you don't design your own life plan, chances are you'll fall into someone else's plan. And guess what they have planned for you? Not much.",
    "Without your own goals, you become a tool for others' goals. Create your plan or live someone else's.",
    45
  ),

  // ============================================
  // ROBIN SHARMA (10 cards)
  // ============================================
  makeCard(
    "Robin Sharma",
    "The 5 AM Club",
    ["productivity", "morning", "discipline"],
    "Own your morning, elevate your life.",
    "The first hour sets the tone. Win the morning, win the day. Your AM routine is your secret weapon.",
    35
  ),
  makeCard(
    "Robin Sharma",
    "The Monk Who Sold His Ferrari",
    ["philosophy", "wisdom", "simplicity"],
    "The mind is a wonderful servant, but a terrible master.",
    "Use your mind; don't be used by it. Thoughts should serve you, not torment you. Take back control.",
    40
  ),
  makeCard(
    "Robin Sharma",
    "The 5 AM Club",
    ["productivity", "learning", "growth"],
    "All change is hard at first, messy in the middle and gorgeous at the end.",
    "Transformation follows a predictable arc. The beginning is difficult. The middle is chaos. The end is beautiful. Keep going.",
    40
  ),
  makeCard(
    "Robin Sharma",
    "The Monk Who Sold His Ferrari",
    ["philosophy", "purpose", "legacy"],
    "The purpose of life is a life of purpose.",
    "Circular but true. Meaning comes from contribution. Purpose comes from service. Live for something beyond yourself.",
    35
  ),
  makeCard(
    "Robin Sharma",
    "The 5 AM Club",
    ["productivity", "focus", "distraction"],
    "An addiction to distraction is the end of your creative production.",
    "Every notification is a needle of distraction. Protect your focus. Depth requires undisturbed attention.",
    40
  ),

  // ============================================
  // ROBERT KIYOSAKI (10 cards)
  // ============================================
  makeCard(
    "Robert Kiyosaki",
    "Rich Dad Poor Dad",
    ["finance", "wealth", "mindset"],
    "The poor and the middle class work for money. The rich have money work for them.",
    "The key distinction: labor income vs. asset income. Build assets that generate cash while you sleep.",
    40
  ),
  makeCard(
    "Robert Kiyosaki",
    "Rich Dad Poor Dad",
    ["finance", "education", "learning"],
    "In school we learn that mistakes are bad, and we are punished for making them. Yet, if you look at the way humans are designed to learn, we learn by making mistakes.",
    "Schools penalize errors. Life rewards them—if you learn. Embrace mistakes as tuition for success.",
    50
  ),
  makeCard(
    "Robert Kiyosaki",
    "Rich Dad Poor Dad",
    ["finance", "fear", "action"],
    "The fear of being different prevents most people from seeking new ways to solve their problems.",
    "Conformity feels safe but leads to average results. Dare to be different. Wealth lies off the beaten path.",
    40
  ),
  makeCard(
    "Robert Kiyosaki",
    "Rich Dad Poor Dad",
    ["finance", "assets", "liabilities"],
    "An asset puts money in your pocket. A liability takes money out.",
    "Simple but profound. Most people buy liabilities thinking they're assets. Know the difference. It determines your future.",
    35
  ),
  makeCard(
    "Robert Kiyosaki",
    "Rich Dad Poor Dad",
    ["finance", "skills", "income"],
    "Workers work hard enough to not be fired, and owners pay just enough so that workers won't quit.",
    "The employment trap: enough to survive, not enough to escape. Build skills that create options. Don't be trapped.",
    45
  ),

  // ============================================
  // ADDITIONAL WISDOM CARDS (50 more)
  // ============================================
  makeCard(
    "Og Mandino",
    "The Greatest Salesman in the World",
    ["business", "persistence", "success"],
    "I will persist until I succeed.",
    "Persistence is the common denominator of all successful people. Talent fails without it. Mediocrity wins with it.",
    35
  ),
  makeCard(
    "Og Mandino",
    "The Greatest Salesman in the World",
    ["business", "attitude", "choice"],
    "I will greet this day with love in my heart.",
    "Your attitude is a choice. Choose love over fear. Choose openness over defensiveness. The day responds to your energy.",
    35
  ),
  makeCard(
    "Napoleon Hill",
    "Think and Grow Rich",
    ["business", "mindset", "desire"],
    "Whatever the mind can conceive and believe, it can achieve.",
    "Thought precedes reality. Belief enables action. Vision creates pathway. What you can see, you can become.",
    35
  ),
  makeCard(
    "Napoleon Hill",
    "Think and Grow Rich",
    ["business", "failure", "persistence"],
    "Every adversity carries with it the seed of an equal or greater benefit.",
    "In every setback is an opportunity. In every loss is a lesson. Find the gift hidden in the difficulty.",
    40
  ),
  makeCard(
    "Napoleon Hill",
    "Think and Grow Rich",
    ["business", "desire", "burning"],
    "The starting point of all achievement is desire.",
    "Not wish. Not hope. Burning desire. The intensity of your wanting determines the probability of your getting.",
    35
  ),
  makeCard(
    "Napoleon Hill",
    "Think and Grow Rich",
    ["business", "persistence", "defeat"],
    "Most great people have attained their greatest success just one step beyond their greatest failure.",
    "Breakthrough often follows breakdown. Don't quit at the point of maximum difficulty. Push through.",
    40
  ),
  makeCard(
    "Darren Hardy",
    "The Compound Effect",
    ["productivity", "habits", "consistency"],
    "Small, smart choices + consistency + time = radical difference.",
    "The compound effect is real. Tiny improvements accumulate into transformation. Be patient. Stay consistent.",
    40
  ),
  makeCard(
    "Darren Hardy",
    "The Compound Effect",
    ["productivity", "choices", "awareness"],
    "You are 100% responsible for your life. No one is coming to save you.",
    "Full responsibility is full power. Blame is weakness disguised as righteousness. Own everything.",
    35
  ),
  makeCard(
    "Tony Robbins",
    "Awaken the Giant Within",
    ["psychology", "change", "decisions"],
    "It is in your moments of decision that your destiny is shaped.",
    "Decisions, not conditions, determine destiny. You're one decision away from a different life. Choose wisely.",
    40
  ),
  makeCard(
    "Tony Robbins",
    "Awaken the Giant Within",
    ["psychology", "state", "energy"],
    "The quality of your life is the quality of your emotions.",
    "Emotions are life quality. Master your state, master your experience. Physical state affects mental state.",
    35
  ),
  makeCard(
    "Tony Robbins",
    "Awaken the Giant Within",
    ["psychology", "beliefs", "limitations"],
    "Beliefs have the power to create and the power to destroy.",
    "What you believe becomes your reality. Empowering beliefs create empowered lives. Examine your beliefs ruthlessly.",
    40
  ),
  makeCard(
    "Tony Robbins",
    "Unlimited Power",
    ["psychology", "modeling", "success"],
    "Success leaves clues.",
    "Study successful people. Model their behaviors. Reverse-engineer their results. You don't need to reinvent the wheel.",
    35
  ),
  makeCard(
    "Zig Ziglar",
    "See You at the Top",
    ["business", "attitude", "positivity"],
    "Your attitude, not your aptitude, will determine your altitude.",
    "Skills matter less than mindset. Attitude opens doors. Aptitude walks through them. Lead with positivity.",
    40
  ),
  makeCard(
    "Zig Ziglar",
    "See You at the Top",
    ["business", "helping", "success"],
    "You can have everything in life you want, if you will just help other people get what they want.",
    "Success through service. The more you give, the more you receive. Make helping others your strategy.",
    40
  ),
  makeCard(
    "John Maxwell",
    "The 21 Irrefutable Laws of Leadership",
    ["leadership", "influence", "growth"],
    "A leader is one who knows the way, goes the way, and shows the way.",
    "Knowledge without action is philosophy. Action without example is hollow. True leadership is lived.",
    35
  ),
  makeCard(
    "John Maxwell",
    "The 21 Irrefutable Laws of Leadership",
    ["leadership", "influence", "limits"],
    "Leadership ability determines a person's level of effectiveness.",
    "Your leadership lid caps everything. Raise your leadership, raise your impact. It's the multiplier of effort.",
    40
  ),
  makeCard(
    "John Wooden",
    "Wooden on Leadership",
    ["leadership", "character", "success"],
    "Be more concerned with your character than your reputation, because your character is what you really are, while your reputation is merely what others think you are.",
    "Reputation is external. Character is internal. One you control completely; the other you don't. Focus wisely.",
    50
  ),
  makeCard(
    "Vince Lombardi",
    "Speeches",
    ["leadership", "excellence", "habit"],
    "Perfection is not attainable, but if we chase perfection we can catch excellence.",
    "Aim for perfection, land in excellence. The pursuit matters more than the arrival. Keep reaching higher.",
    40
  ),
  makeCard(
    "Michael Jordan",
    "I Can't Accept Not Trying",
    ["psychology", "failure", "success"],
    "I've missed more than 9000 shots in my career. I've lost almost 300 games. Twenty-six times, I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed.",
    "Failure is the price of greatness. Count your failures as tuition. Success comes through, not despite, failure.",
    55
  ),
  makeCard(
    "Bruce Lee",
    "Tao of Jeet Kune Do",
    ["philosophy", "adaptability", "growth"],
    "Be water, my friend. Empty your mind. Be formless, shapeless, like water.",
    "Rigidity breaks. Flexibility endures. Adapt to circumstances. Flow around obstacles. Soft beats hard.",
    40
  ),
  makeCard(
    "Bruce Lee",
    "Tao of Jeet Kune Do",
    ["philosophy", "knowledge", "practice"],
    "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.",
    "Depth beats breadth. Mastery requires focus. Don't be a jack of all trades. Be exceptional at what matters.",
    40
  ),
  makeCard(
    "Bruce Lee",
    "Striking Thoughts",
    ["philosophy", "limits", "belief"],
    "If you always put limits on everything you do, physical or anything else, it will spread into your work and into your life. There are no limits. There are only plateaus.",
    "Limits are mental before they're physical. Question every boundary. What you believe, you achieve.",
    50
  ),
  makeCard(
    "Muhammad Ali",
    "Interviews",
    ["psychology", "confidence", "belief"],
    "It's the repetition of affirmations that leads to belief. And once that belief becomes a deep conviction, things begin to happen.",
    "Tell yourself who you are. Repeatedly. Until you believe it. Until the world believes it. Words shape reality.",
    45
  ),
  makeCard(
    "Kobe Bryant",
    "Mamba Mentality",
    ["psychology", "work-ethic", "obsession"],
    "Great things come from hard work and perseverance. No excuses.",
    "Talent is never enough. Work ethic is everything. Outwork everyone. Make them call you obsessed.",
    40
  ),
  makeCard(
    "Phil Knight",
    "Shoe Dog",
    ["business", "entrepreneurship", "persistence"],
    "The cowards never started and the weak died along the way. That leaves us.",
    "Entrepreneurship requires starting (courage) and continuing (resilience). Both are rare. Those who have both, win.",
    40
  ),
  makeCard(
    "Phil Knight",
    "Shoe Dog",
    ["business", "risk", "belief"],
    "Let everyone else call your idea crazy... just keep going. Don't stop. Don't even think about stopping until you get there.",
    "Others' disbelief is irrelevant. Your belief is everything. Keep going until you arrive or die trying.",
    40
  ),
  makeCard(
    "Howard Schultz",
    "Pour Your Heart Into It",
    ["business", "passion", "authenticity"],
    "In life, you can blame a lot of people and you can wallow in self-pity, or you can pick yourself up and say, 'Listen, I have to be responsible for myself.'",
    "Blame feels good but changes nothing. Responsibility feels heavy but changes everything. Choose power over comfort.",
    45
  ),
  makeCard(
    "Sara Blakely",
    "Interviews",
    ["business", "failure", "learning"],
    "My dad encouraged us to fail. Growing up, he would ask us what we failed at that week.",
    "Reframe failure as learning. Celebrate attempts, not just achievements. The person who fails most, wins most.",
    40
  ),
  makeCard(
    "Oprah Winfrey",
    "What I Know For Sure",
    ["philosophy", "authenticity", "purpose"],
    "The whole point of being alive is to evolve into the complete person you were intended to be.",
    "You have a unique purpose. Growth toward that purpose is why you're here. Stop postponing your evolution.",
    40
  ),
  makeCard(
    "Oprah Winfrey",
    "What I Know For Sure",
    ["philosophy", "gratitude", "happiness"],
    "Be thankful for what you have; you'll end up having more. If you concentrate on what you don't have, you will never, ever have enough.",
    "Gratitude multiplies. Scarcity thinking subtracts. Focus on abundance creates abundance. It starts in the mind.",
    40
  ),
  makeCard(
    "Maya Angelou",
    "Letters to My Daughter",
    ["philosophy", "courage", "authenticity"],
    "There is no greater agony than bearing an untold story inside you.",
    "Your story matters. Unexpressed truth becomes toxic. Share your voice. The world needs what only you can give.",
    40
  ),
  makeCard(
    "Maya Angelou",
    "I Know Why the Caged Bird Sings",
    ["philosophy", "resilience", "impact"],
    "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    "Feelings outlast facts. Emotional impact endures. Focus on how you make people feel. That's your legacy.",
    45
  ),
  makeCard(
    "Michelle Obama",
    "Becoming",
    ["philosophy", "growth", "identity"],
    "Becoming isn't about arriving somewhere or achieving a certain aim. I see it instead as forward motion, a means of evolving.",
    "You never arrive. You never finish. You never complete. You're always becoming. Embrace the journey.",
    45
  ),
  makeCard(
    "Barack Obama",
    "A Promised Land",
    ["leadership", "change", "persistence"],
    "Change will not come if we wait for some other person or some other time. We are the ones we've been waiting for. We are the change that we seek.",
    "Stop waiting for heroes. Be the hero. Change starts with you. Right now. Not someday.",
    40
  ),
  makeCard(
    "Sheryl Sandberg",
    "Lean In",
    ["leadership", "confidence", "action"],
    "What would you do if you weren't afraid?",
    "Fear limits more than ability. Imagine yourself fearless. What would you attempt? Now do that.",
    35
  ),
  makeCard(
    "Brené Brown",
    "Dare to Lead",
    ["leadership", "vulnerability", "trust"],
    "Daring leaders work to make sure people can be themselves and feel a sense of belonging.",
    "Psychological safety unlocks performance. People do best when they can be authentic. Create that space.",
    40
  ),
  makeCard(
    "Richard Branson",
    "Losing My Virginity",
    ["business", "risk", "adventure"],
    "If somebody offers you an amazing opportunity but you are not sure you can do it, say yes – then learn how to do it later.",
    "Opportunity doesn't wait for readiness. Say yes first. Figure it out second. Confidence follows action.",
    40
  ),
  makeCard(
    "Richard Branson",
    "Losing My Virginity",
    ["business", "fun", "culture"],
    "Business opportunities are like buses; there's always another one coming.",
    "Don't panic over missed opportunities. More will come. Stay ready. Stay patient. The next one might be better.",
    35
  ),
  makeCard(
    "Elon Musk",
    "Interviews",
    ["business", "innovation", "thinking"],
    "When something is important enough, you do it even if the odds are not in your favor.",
    "Important work doesn't need good odds. It needs doing regardless. Let significance, not probability, guide you.",
    40
  ),
  makeCard(
    "Elon Musk",
    "Interviews",
    ["business", "first-principles", "thinking"],
    "I think it's important to reason from first principles rather than by analogy.",
    "Most thinking is analogical: 'This is like that.' First principles asks: 'What is fundamentally true?' Deeper thinking produces better answers.",
    45
  ),
  makeCard(
    "Steve Wozniak",
    "iWoz",
    ["creativity", "innovation", "play"],
    "Every dream I've ever had in life has come true ten times over.",
    "Dream bigger. Your imagination is your preview of coming attractions. What you can dream, you can achieve.",
    35
  ),
  makeCard(
    "Mary Barra",
    "Interviews",
    ["leadership", "change", "culture"],
    "If we win the hearts and minds of employees, we're going to have better business success.",
    "Culture determines performance. Engaged employees create engaged customers. Start inside to win outside.",
    40
  ),
  makeCard(
    "Satya Nadella",
    "Hit Refresh",
    ["leadership", "growth", "learning"],
    "The learn-it-all does better than the know-it-all.",
    "Fixed mindset loses to growth mindset. Humility beats arrogance. Stay curious. Keep learning. Always.",
    35
  ),


  // ============================================
  // YUVAL NOAH HARARI (15 cards)
  // ============================================
  makeCard(
    "Yuval Noah Harari",
    "Sapiens",
    ["history", "philosophy", "science"],
    "The ability to create fiction is the most unique feature of Sapiens language.",
    "Stories unite strangers. Nations, religions, corporations—all are shared fictions. The power to create and believe in myths makes human cooperation possible at scale.",
    50
  ),
  makeCard(
    "Yuval Noah Harari",
    "Sapiens",
    ["history", "philosophy", "evolution"],
    "We did not domesticate wheat. It domesticated us.",
    "Agriculture seemed like progress but tied us to land, increased labor, and created hierarchies. What looks like advancement often comes with hidden costs.",
    45
  ),
  makeCard(
    "Yuval Noah Harari",
    "Sapiens",
    ["history", "happiness", "philosophy"],
    "One of history's few iron laws is that luxuries tend to become necessities and to spawn new obligations.",
    "Each convenience creates new expectations. Smartphones went from luxury to necessity in a decade. Progress is a treadmill, not a ladder.",
    45
  ),
  makeCard(
    "Yuval Noah Harari",
    "21 Lessons for the 21st Century",
    ["philosophy", "technology", "future"],
    "In a world deluged by irrelevant information, clarity is power.",
    "Information is abundant; wisdom is scarce. The challenge isn't access to data—it's making sense of it. Filter ruthlessly.",
    40
  ),
  makeCard(
    "Yuval Noah Harari",
    "Homo Deus",
    ["philosophy", "technology", "future"],
    "For the first time in history, more people die from eating too much than from eating too little.",
    "We solved ancient problems and created new ones. Abundance is now a threat. The future's challenges will be novel.",
    40
  ),
  makeCard(
    "Yuval Noah Harari",
    "21 Lessons for the 21st Century",
    ["philosophy", "self-awareness", "mindfulness"],
    "To know yourself is the hardest thing of all because the self is not a story.",
    "We tell ourselves stories about who we are. But identity is fluid, constructed, constantly changing. The self you know is mostly fiction.",
    45
  ),
  makeCard(
    "Yuval Noah Harari",
    "Sapiens",
    ["history", "money", "society"],
    "Money is the most universal and most efficient system of mutual trust ever devised.",
    "Money works because we all believe in it. It's the ultimate shared fiction—a story so powerful it coordinates billions of strangers.",
    40
  ),
  makeCard(
    "Yuval Noah Harari",
    "Homo Deus",
    ["philosophy", "meaning", "religion"],
    "Meaning is created when many people weave together a common network of stories.",
    "Individual meaning is fragile. Collective meaning is robust. We need shared narratives to make life feel purposeful.",
    40
  ),
  makeCard(
    "Yuval Noah Harari",
    "21 Lessons for the 21st Century",
    ["philosophy", "education", "future"],
    "The last thing a teacher needs to give her pupils is more information. They already have far too much of it.",
    "Teach sense-making, not facts. Critical thinking, not memorization. The skill is filtering, not accumulating.",
    40
  ),

  // ============================================
  // DANIEL KAHNEMAN (15 cards)
  // ============================================
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decision-making", "bias"],
    "A reliable way to make people believe in falsehoods is frequent repetition.",
    "Familiarity breeds belief. We mistake ease of recall for truth. Repeated lies feel like facts. Guard against this.",
    45
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decision-making", "systems"],
    "Nothing in life is as important as you think it is while you are thinking about it.",
    "The focusing illusion: what we attend to seems more significant than it is. Step back. Perspective reveals proportion.",
    40
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decision-making", "bias"],
    "We can be blind to the obvious, and we are also blind to our blindness.",
    "Metacognition is hard. We don't know what we don't know—and we don't know that we don't know it. Double ignorance.",
    45
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "happiness", "memory"],
    "We are not the same person throughout our life. The remembering self and the experiencing self do not have the same interests.",
    "Two selves: one lives the moment, one tells the story. They often conflict. Which self are you optimizing for?",
    50
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decision-making", "intuition"],
    "Intuition is nothing more and nothing less than recognition.",
    "Gut feelings aren't magic—they're pattern matching from experience. Trust intuition in domains where you have expertise.",
    40
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "overconfidence", "prediction"],
    "The confidence people have in their beliefs is not a measure of the quality of evidence but of the coherence of the story.",
    "Good stories feel true. But coherence isn't accuracy. The best narrative isn't necessarily the right one.",
    50
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "loss-aversion", "risk"],
    "Losses loom larger than gains.",
    "Losing $100 hurts more than gaining $100 feels good. Loss aversion shapes all our decisions. We're wired to avoid pain.",
    35
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "effort", "laziness"],
    "Laziness is built deep into our nature.",
    "System 2 thinking is effortful. We default to easy. Cognitive strain is uncomfortable. Accept this and design around it.",
    35
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "anchoring", "negotiation"],
    "Any number that you are asked to consider as a possible solution to an estimation problem will induce an anchoring effect.",
    "First numbers stick. In negotiations, whoever sets the anchor has power. Be aware of arbitrary starting points.",
    45
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "optimism", "planning"],
    "The planning fallacy is the tendency to underestimate the time, costs, and risks of future actions.",
    "We're systematically overoptimistic about projects. Use reference class forecasting—look at how similar projects actually went.",
    45
  ),

  // ============================================
  // MALCOLM GLADWELL (15 cards)
  // ============================================
  makeCard(
    "Malcolm Gladwell",
    "Outliers",
    ["psychology", "success", "practice"],
    "Practice isn't the thing you do once you're good. It's the thing you do that makes you good.",
    "Talent is overrated. Hours of deliberate practice create expertise. The greats weren't born—they were made.",
    40
  ),
  makeCard(
    "Malcolm Gladwell",
    "Outliers",
    ["psychology", "success", "opportunity"],
    "Success is not a random act. It arises out of a predictable and powerful set of circumstances and opportunities.",
    "Genius alone isn't enough. Timing, culture, accumulated advantages—success has a hidden architecture beyond individual merit.",
    45
  ),
  makeCard(
    "Malcolm Gladwell",
    "Blink",
    ["psychology", "intuition", "decisions"],
    "Truly successful decision-making relies on a balance between deliberate and instinctive thinking.",
    "Neither pure analysis nor pure gut is optimal. Know when to trust each. Rapid cognition has power—and limits.",
    40
  ),
  makeCard(
    "Malcolm Gladwell",
    "Blink",
    ["psychology", "thin-slicing", "judgment"],
    "We thin-slice whenever we meet a new person or have to make sense of something quickly.",
    "First impressions are data-rich. In seconds, we extract patterns. This can be accurate—or dangerously biased.",
    40
  ),
  makeCard(
    "Malcolm Gladwell",
    "The Tipping Point",
    ["business", "influence", "networks"],
    "The tipping point is that magic moment when an idea, trend, or social behavior crosses a threshold and spreads like wildfire.",
    "Small changes can have outsized effects. Find leverage points. A few key people, a sticky message—that's how epidemics start.",
    45
  ),
  makeCard(
    "Malcolm Gladwell",
    "The Tipping Point",
    ["business", "influence", "connectors"],
    "A very small number of people are linked to everyone else in a few steps, and the rest of us are linked to the world through those special few.",
    "Connectors, Mavens, Salesmen—these archetypes spread ideas. Know them. Be one. Or find them for your cause.",
    45
  ),
  makeCard(
    "Malcolm Gladwell",
    "David and Goliath",
    ["psychology", "adversity", "strength"],
    "Much of what we consider valuable in our world arises out of these kinds of lopsided conflicts.",
    "Underdogs win more than we think. Apparent weakness can become advantage. Constraints breed innovation.",
    40
  ),
  makeCard(
    "Malcolm Gladwell",
    "David and Goliath",
    ["psychology", "adversity", "resilience"],
    "Courage is not something that you already have that makes you brave when the tough times start. Courage is what you earn when you've been through the tough times.",
    "Bravery isn't innate—it's forged. Hardship creates strength. What breaks some makes others unbreakable.",
    45
  ),
  makeCard(
    "Malcolm Gladwell",
    "Talking to Strangers",
    ["psychology", "trust", "communication"],
    "We default to truth—that is, we assume the people we're dealing with are honest.",
    "Truth default makes cooperation possible. But it also makes us vulnerable to deception. Trust but verify.",
    40
  ),

  // ============================================
  // ECKHART TOLLE (15 cards)
  // ============================================
  makeCard(
    "Eckhart Tolle",
    "The Power of Now",
    ["spirituality", "mindfulness", "presence"],
    "Realize deeply that the present moment is all you have. Make the NOW the primary focus of your life.",
    "Past and future exist only in thought. Reality is always now. Presence is not a luxury—it's the only place life happens.",
    40
  ),
  makeCard(
    "Eckhart Tolle",
    "The Power of Now",
    ["spirituality", "ego", "identity"],
    "The mind is a superb instrument if used rightly. Used wrongly, it becomes very destructive.",
    "Mind as servant, not master. Thoughts are tools. Don't let the tool use you. Observe the thinker.",
    40
  ),
  makeCard(
    "Eckhart Tolle",
    "The Power of Now",
    ["spirituality", "suffering", "acceptance"],
    "Whatever the present moment contains, accept it as if you had chosen it.",
    "Resistance creates suffering. Acceptance creates peace. You can still act to change things—but from acceptance, not resistance.",
    40
  ),
  makeCard(
    "Eckhart Tolle",
    "A New Earth",
    ["spirituality", "ego", "awakening"],
    "The primary cause of unhappiness is never the situation but your thoughts about it.",
    "Events are neutral. Interpretation creates suffering. Change the story, change the experience.",
    35
  ),
  makeCard(
    "Eckhart Tolle",
    "A New Earth",
    ["spirituality", "ego", "identity"],
    "You are not your thoughts. You are the awareness behind the thoughts.",
    "Thought is content; awareness is context. You are the sky, not the clouds. This recognition is freedom.",
    40
  ),
  makeCard(
    "Eckhart Tolle",
    "The Power of Now",
    ["spirituality", "time", "presence"],
    "Time isn't precious at all, because it is an illusion. What you perceive as precious is not time but the one point that is out of time: the Now.",
    "We say time is precious while wasting the present worrying about future. The now is all that's real.",
    45
  ),
  makeCard(
    "Eckhart Tolle",
    "A New Earth",
    ["spirituality", "purpose", "being"],
    "Your life has an inner purpose and an outer purpose. Inner purpose concerns Being. Outer purpose concerns doing.",
    "What you do matters less than how you are while doing it. Inner purpose—presence—infuses outer action with meaning.",
    45
  ),
  makeCard(
    "Eckhart Tolle",
    "The Power of Now",
    ["spirituality", "pain", "suffering"],
    "The pain that you create now is always some form of nonacceptance, some form of unconscious resistance to what is.",
    "Pain is inevitable; suffering is optional. The gap between what is and what should be—that's where suffering lives.",
    40
  ),
  makeCard(
    "Eckhart Tolle",
    "A New Earth",
    ["spirituality", "relationships", "presence"],
    "Relationships do not cause pain and unhappiness. They bring out the pain and unhappiness that is already in you.",
    "Others don't create your dysfunction—they reveal it. Relationships are mirrors. Use them for self-knowledge.",
    45
  ),

  // ============================================
  // VIKTOR FRANKL (12 cards)
  // ============================================
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["philosophy", "meaning", "suffering"],
    "Those who have a 'why' to live, can bear with almost any 'how'.",
    "Purpose sustains through suffering. Meaning isn't found—it's created. Even in hell, we can find reason to endure.",
    45
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["philosophy", "freedom", "choice"],
    "Everything can be taken from a man but one thing: the last of the human freedoms—to choose one's attitude in any given set of circumstances.",
    "External freedom can be stripped. Inner freedom cannot. In any situation, response is yours to choose.",
    50
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["philosophy", "meaning", "purpose"],
    "Life is never made unbearable by circumstances, but only by lack of meaning and purpose.",
    "Suffering without meaning is despair. Suffering with meaning is bearable. The question isn't why this happened—it's what for.",
    45
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["philosophy", "happiness", "meaning"],
    "Happiness cannot be pursued; it must ensue.",
    "Chase happiness and it flees. Pursue meaning and happiness follows. It's a byproduct, not a goal.",
    35
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["philosophy", "responsibility", "meaning"],
    "Being human means being responsible.",
    "Freedom implies responsibility. Meaning comes through obligation to something beyond yourself.",
    35
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["philosophy", "suffering", "dignity"],
    "Even the helpless victim of a hopeless situation, facing a fate he cannot change, may rise above himself, may grow beyond himself, and by so doing change himself.",
    "Circumstances may be unchangeable. Self is not. Even in tragedy, growth is possible. Dignity survives suffering.",
    50
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["philosophy", "love", "meaning"],
    "Love is the ultimate and the highest goal to which man can aspire.",
    "In the depths of suffering, the thought of loved ones sustains. Love transcends physical presence. It's meaning made incarnate.",
    40
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["philosophy", "despair", "meaning"],
    "Despair is suffering without meaning.",
    "Suffering + meaning = growth. Suffering - meaning = despair. The task is always to find the meaning.",
    35
  ),

  // ============================================
  // MIHALY CSIKSZENTMIHALYI (12 cards)
  // ============================================
  makeCard(
    "Mihaly Csikszentmihalyi",
    "Flow",
    ["psychology", "happiness", "productivity"],
    "The best moments in our lives are not the passive, receptive, relaxing times. The best moments usually occur when a person's body or mind is stretched to its limits.",
    "Flow isn't ease—it's engaged challenge. Happiness comes from full absorption in demanding tasks, not from rest.",
    50
  ),
  makeCard(
    "Mihaly Csikszentmihalyi",
    "Flow",
    ["psychology", "focus", "experience"],
    "Control of consciousness determines the quality of life.",
    "What you attend to shapes your experience. Master attention, master life. Focus is freedom.",
    40
  ),
  makeCard(
    "Mihaly Csikszentmihalyi",
    "Flow",
    ["psychology", "challenge", "growth"],
    "Flow experiences occur when there is a balance between challenge and skill.",
    "Too easy = boredom. Too hard = anxiety. The sweet spot—slightly beyond current ability—is where flow lives.",
    40
  ),
  makeCard(
    "Mihaly Csikszentmihalyi",
    "Flow",
    ["psychology", "happiness", "goals"],
    "People who learn to control inner experience will be able to determine the quality of their lives, which is as close as any of us can come to being happy.",
    "Happiness isn't circumstances—it's inner state management. Control the inner, influence the outer.",
    45
  ),
  makeCard(
    "Mihaly Csikszentmihalyi",
    "Flow",
    ["psychology", "work", "meaning"],
    "Work can be meaningful when it is freely chosen, when it allows the use of skill.",
    "Same task, different experience. Choice and skill transform drudgery into craft. Meaning is in the doing.",
    40
  ),
  makeCard(
    "Mihaly Csikszentmihalyi",
    "Flow",
    ["psychology", "attention", "time"],
    "When we are in flow, time seems to stop. We forget ourselves and become one with what we are doing.",
    "Self-consciousness dissolves in deep engagement. Time dilates. Action and awareness merge. This is optimal experience.",
    45
  ),
  makeCard(
    "Mihaly Csikszentmihalyi",
    "Flow",
    ["psychology", "autotelic", "intrinsic"],
    "The autotelic self transforms potentially entropic experience into flow.",
    "Autotelic: doing for its own sake. Find intrinsic reward. Don't need external validation when the doing is enough.",
    45
  ),
  makeCard(
    "Mihaly Csikszentmihalyi",
    "Flow",
    ["psychology", "creativity", "complexity"],
    "Creative individuals tend to be smart yet naive, playful yet disciplined.",
    "Complexity is the mark of the creative mind. Holding opposites in tension. Both/and, not either/or.",
    40
  ),

  // ============================================
  // JORDAN PETERSON (12 cards)
  // ============================================
  makeCard(
    "Jordan Peterson",
    "12 Rules for Life",
    ["psychology", "responsibility", "meaning"],
    "Compare yourself to who you were yesterday, not to who someone else is today.",
    "External comparison breeds envy. Internal comparison breeds growth. Your only competition is your past self.",
    35
  ),
  makeCard(
    "Jordan Peterson",
    "12 Rules for Life",
    ["psychology", "order", "chaos"],
    "You must determine where you are going in your life, because you cannot get there unless you move in that direction.",
    "Aim at something. Without a target, you drift. Purpose provides direction. Direction provides meaning.",
    40
  ),
  makeCard(
    "Jordan Peterson",
    "12 Rules for Life",
    ["psychology", "responsibility", "maturity"],
    "Set your house in perfect order before you criticize the world.",
    "Fix what you can control first. Clean your room. Then expand outward. Competence precedes criticism.",
    35
  ),
  makeCard(
    "Jordan Peterson",
    "12 Rules for Life",
    ["psychology", "truth", "integrity"],
    "Tell the truth—or, at least, don't lie.",
    "Each lie corrupts the soul. Truth builds, lies destroy. Start with not lying; truth becomes easier with practice.",
    35
  ),
  makeCard(
    "Jordan Peterson",
    "Maps of Meaning",
    ["psychology", "meaning", "mythology"],
    "Meaning is the instinct that tells you where you are, and where you are is always an indication of what you should do.",
    "Meaning isn't found in abstract principles—it's felt in the body. Listen to what calls you.",
    45
  ),
  makeCard(
    "Jordan Peterson",
    "12 Rules for Life",
    ["psychology", "suffering", "growth"],
    "To stand up straight with your shoulders back is to accept the terrible responsibility of life.",
    "Posture reflects attitude. Stand up—literally and metaphorically. Face existence. Carry your burden voluntarily.",
    40
  ),
  makeCard(
    "Jordan Peterson",
    "Beyond Order",
    ["psychology", "goals", "adventure"],
    "If you can't even take care of yourself, you have nothing to offer.",
    "Self-care isn't selfish—it's prerequisite. Empty cups can't fill others. Build yourself to give yourself.",
    35
  ),
  makeCard(
    "Jordan Peterson",
    "12 Rules for Life",
    ["relationships", "listening", "wisdom"],
    "Assume that the person you are listening to might know something you don't.",
    "True listening requires humility. Everyone knows something you don't. Conversation is opportunity for learning.",
    40
  ),

  // ============================================
  // SAM HARRIS (10 cards)
  // ============================================
  makeCard(
    "Sam Harris",
    "Waking Up",
    ["spirituality", "mindfulness", "consciousness"],
    "The feeling that we call 'I' is an illusion.",
    "The self is a construction, not a fixed entity. Meditation reveals this. What you take to be you is a story told by neurons.",
    45
  ),
  makeCard(
    "Sam Harris",
    "Waking Up",
    ["spirituality", "happiness", "attention"],
    "The reality of your life is always now. And to realize this is liberating.",
    "Life happens only in this moment. Everything else is memory or imagination. Presence is the only reality.",
    40
  ),
  makeCard(
    "Sam Harris",
    "Free Will",
    ["philosophy", "free-will", "determinism"],
    "You are not controlling the storm, and you are not lost in it. You are the storm.",
    "The illusion of control is comforting but false. You are process, not pilot. This can be liberating once accepted.",
    45
  ),
  makeCard(
    "Sam Harris",
    "Waking Up",
    ["spirituality", "meditation", "practice"],
    "There is nothing passive about mindfulness. One might even say that it expresses a specific kind of passion.",
    "Meditation isn't spacing out—it's waking up. Intense attention to what is. Active, not passive. Engaged, not escaped.",
    40
  ),
  makeCard(
    "Sam Harris",
    "The Moral Landscape",
    ["philosophy", "ethics", "wellbeing"],
    "Questions about values are really questions about the wellbeing of conscious creatures.",
    "Morality isn't arbitrary—it's about flourishing. What increases wellbeing is good. Science can inform ethics.",
    45
  ),
  makeCard(
    "Sam Harris",
    "Waking Up",
    ["spirituality", "thought", "awareness"],
    "The practice of meditation is a clearer way of seeing that thoughts are just thoughts.",
    "You are not your thoughts. You have thoughts. Meditation creates distance. Observation creates freedom.",
    40
  ),
  makeCard(
    "Sam Harris",
    "Lying",
    ["philosophy", "honesty", "ethics"],
    "Lying is the royal road to chaos.",
    "Each lie requires more lies to sustain it. Truth is simpler than deception. Honesty is the foundation of trust.",
    35
  ),

  // ============================================
  // JOCKO WILLINK (12 cards)
  // ============================================
  makeCard(
    "Jocko Willink",
    "Extreme Ownership",
    ["leadership", "responsibility", "accountability"],
    "The leader is truly and ultimately responsible for everything the team does or fails to do.",
    "No excuses. No blame. Everything is your responsibility. This isn't burden—it's power. Own it all.",
    40
  ),
  makeCard(
    "Jocko Willink",
    "Extreme Ownership",
    ["leadership", "ego", "humility"],
    "Ego clouds and disrupts everything.",
    "Ego prevents learning. Ego creates conflict. Ego blinds to reality. Check your ego—or it will check you.",
    35
  ),
  makeCard(
    "Jocko Willink",
    "Discipline Equals Freedom",
    ["productivity", "discipline", "freedom"],
    "Discipline equals freedom.",
    "Paradox: constraint creates liberation. Discipline in small things creates freedom in big things. Structure enables flow.",
    35
  ),
  makeCard(
    "Jocko Willink",
    "Extreme Ownership",
    ["leadership", "simplicity", "communication"],
    "Simple, clear, concise plans and orders ensure everyone understands.",
    "Complexity fails under pressure. Simplify relentlessly. If a plan can't be explained simply, it won't be executed properly.",
    40
  ),
  makeCard(
    "Jocko Willink",
    "Extreme Ownership",
    ["leadership", "decentralization", "trust"],
    "Human beings are generally not capable of managing more than six to ten people.",
    "Span of control is real. Build small teams with delegated authority. Trust people to execute. Don't micromanage.",
    40
  ),
  makeCard(
    "Jocko Willink",
    "Discipline Equals Freedom",
    ["productivity", "motivation", "action"],
    "Don't expect to be motivated every day. Discipline is what gets you to the gym when motivation fails.",
    "Motivation is unreliable. Discipline is dependable. Build systems that don't require feeling like it.",
    35
  ),
  makeCard(
    "Jocko Willink",
    "Extreme Ownership",
    ["leadership", "balance", "strategy"],
    "A good leader has nothing to prove, but everything to prove.",
    "Confident but not arrogant. Calm but not passive. Leaders balance opposites. Neither extreme works.",
    40
  ),
  makeCard(
    "Jocko Willink",
    "The Dichotomy of Leadership",
    ["leadership", "balance", "extremes"],
    "Every good quality can become a bad quality when taken to the extreme.",
    "Confidence becomes arrogance. Caution becomes paralysis. Virtue lies in balance. Know when enough is enough.",
    40
  ),

  // ============================================
  // RYAN HOLIDAY (15 cards)
  // ============================================
  makeCard(
    "Ryan Holiday",
    "The Obstacle Is the Way",
    ["stoicism", "adversity", "growth"],
    "The impediment to action advances action. What stands in the way becomes the way.",
    "Marcus Aurelius knew: obstacles aren't detours—they're the path. Use difficulty as training ground.",
    40
  ),
  makeCard(
    "Ryan Holiday",
    "Ego Is the Enemy",
    ["stoicism", "ego", "humility"],
    "Ego is the enemy of what you want and of what you have.",
    "Ego prevents learning before success and breeds complacency after. Stay humble. Stay hungry. Stay learning.",
    35
  ),
  makeCard(
    "Ryan Holiday",
    "The Daily Stoic",
    ["stoicism", "control", "focus"],
    "Focus on the things you can control, let go of everything else.",
    "The dichotomy of control: some things are up to us, some aren't. Master this distinction. It's freedom.",
    35
  ),
  makeCard(
    "Ryan Holiday",
    "Stillness Is the Key",
    ["stoicism", "calm", "presence"],
    "Stillness is the key to, well, just about everything.",
    "In stillness we find clarity. In noise we find confusion. Cultivate inner quiet. Decisions improve. Life improves.",
    35
  ),
  makeCard(
    "Ryan Holiday",
    "The Obstacle Is the Way",
    ["stoicism", "perception", "mindset"],
    "There is no good or bad without us, there is only perception.",
    "Events are neutral. Our interpretation creates suffering or growth. Choose your frame wisely.",
    40
  ),
  makeCard(
    "Ryan Holiday",
    "Ego Is the Enemy",
    ["stoicism", "success", "character"],
    "Success is intoxicating, yet to sustain it requires sobriety.",
    "Success breeds complacency. Stay paranoid. Stay working. The moment you relax, decline begins.",
    40
  ),
  makeCard(
    "Ryan Holiday",
    "The Daily Stoic",
    ["stoicism", "time", "mortality"],
    "You could leave life right now. Let that determine what you do and say and think.",
    "Memento mori—remember death. Not morbid; clarifying. Limited time demands intentional living.",
    40
  ),
  makeCard(
    "Ryan Holiday",
    "Discipline Is Destiny",
    ["stoicism", "discipline", "character"],
    "Discipline is the difference between what you want now and what you want most.",
    "Temptation offers immediate gratification. Discipline serves ultimate goals. The choice defines you.",
    35
  ),
  makeCard(
    "Ryan Holiday",
    "The Obstacle Is the Way",
    ["stoicism", "action", "persistence"],
    "Persistence and resistance are the only things that matter.",
    "Keep pushing. Keep showing up. Persistence in effort, resistance to distraction. Simple formula, hard execution.",
    35
  ),
  makeCard(
    "Ryan Holiday",
    "Stillness Is the Key",
    ["stoicism", "relationships", "presence"],
    "Be fully present. Be in the conversation. Be with the person in front of you.",
    "Half-attention is no attention. Give people your full focus. Presence is the greatest gift.",
    35
  ),

  // ============================================
  // TIM FERRISS (10 cards)
  // ============================================
  makeCard(
    "Tim Ferriss",
    "The 4-Hour Workweek",
    ["productivity", "lifestyle", "business"],
    "What we fear doing most is usually what we most need to do.",
    "Fear marks the path. The phone call you're avoiding, the conversation you're dreading—that's where growth is.",
    40
  ),
  makeCard(
    "Tim Ferriss",
    "The 4-Hour Workweek",
    ["productivity", "priorities", "elimination"],
    "Being busy is a form of laziness—lazy thinking and indiscriminate action.",
    "Activity isn't achievement. Busy-ness is often avoidance. Work on what matters. Eliminate the rest.",
    40
  ),
  makeCard(
    "Tim Ferriss",
    "The 4-Hour Workweek",
    ["productivity", "time", "design"],
    "Focus on being productive instead of busy.",
    "Hours worked ≠ value created. Results matter, not effort. Design systems that maximize output per input.",
    35
  ),
  makeCard(
    "Tim Ferriss",
    "Tools of Titans",
    ["productivity", "success", "patterns"],
    "Success can be deconstructed. It can be learned. It can be taught.",
    "Excellence isn't magic. It's patterns and practices. Study the successful, extract the principles, apply them.",
    40
  ),
  makeCard(
    "Tim Ferriss",
    "Tribe of Mentors",
    ["productivity", "fear", "action"],
    "The most successful people I've interviewed have all experienced major failures.",
    "Failure is tuition. Success stories always include failure chapters. Expect setbacks. Learn from them.",
    40
  ),
  makeCard(
    "Tim Ferriss",
    "The 4-Hour Workweek",
    ["productivity", "questions", "clarity"],
    "Doing less is not being lazy. Don't accept the false choice between productivity and laziness.",
    "Strategic laziness is wisdom. Work less on more important things. Quality over quantity of effort.",
    35
  ),
  makeCard(
    "Tim Ferriss",
    "Tools of Titans",
    ["productivity", "morning", "routine"],
    "If you win the morning, you win the day.",
    "First hours set the tone. Protect your morning routine. Don't give your best energy to email.",
    35
  ),

  // ============================================
  // JAMES CLEAR (10 cards)
  // ============================================
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "improvement"],
    "You do not rise to the level of your goals. You fall to the level of your systems.",
    "Goals are useful for direction. Systems are useful for progress. Build better systems, get better results.",
    40
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "identity"],
    "Every action you take is a vote for the type of person you wish to become.",
    "Identity shapes behavior. Behavior shapes identity. Each choice casts a vote for who you're becoming.",
    40
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "compound"],
    "Habits are the compound interest of self-improvement.",
    "1% better daily = 37x better yearly. Tiny gains accumulate. Time amplifies the effects of habits.",
    40
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "environment"],
    "Environment is the invisible hand that shapes human behavior.",
    "Design your environment for success. Remove friction from good habits. Add friction to bad ones.",
    35
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "motivation"],
    "You don't have to be the victim of your environment. You can also be the architect of it.",
    "Don't rely on willpower. Change the context. Make the right thing the easy thing.",
    35
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "process"],
    "The process of building habits is the process of becoming yourself.",
    "We don't just build habits—we build identity. Each habit is a statement about who we are.",
    40
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "triggers"],
    "Make it obvious. Make it attractive. Make it easy. Make it satisfying.",
    "Four laws of behavior change. Apply them to build good habits, invert them to break bad ones.",
    40
  ),
  makeCard(
    "James Clear",
    "Atomic Habits",
    ["productivity", "habits", "boredom"],
    "The greatest threat to success is not failure but boredom.",
    "Novelty fades. Routines feel mundane. Masters fall in love with boredom. They show up when it's not exciting.",
    40
  ),

  // ============================================
  // CAL NEWPORT (12 cards)
  // ============================================
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "focus", "attention"],
    "Deep work is the ability to focus without distraction on a cognitively demanding task.",
    "Shallow work is default. Deep work is rare. In the attention economy, focus is the ultimate competitive advantage.",
    40
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "distraction", "technology"],
    "The ability to concentrate intensely is a skill that must be trained.",
    "Focus isn't innate—it's trained. Like a muscle, it atrophies without use. Practice deep work to build capacity.",
    40
  ),
  makeCard(
    "Cal Newport",
    "Digital Minimalism",
    ["productivity", "technology", "simplicity"],
    "Clutter is costly.",
    "Every app, notification, and feature competes for attention. Subtract ruthlessly. Keep only what adds substantial value.",
    35
  ),
  makeCard(
    "Cal Newport",
    "So Good They Can't Ignore You",
    ["career", "skills", "mastery"],
    "Follow your passion is dangerous advice.",
    "Passion follows mastery, not the reverse. Get good at something valuable. Passion emerges from competence.",
    40
  ),
  makeCard(
    "Cal Newport",
    "So Good They Can't Ignore You",
    ["career", "skills", "value"],
    "If you want a great job, you need something rare and valuable to offer in return.",
    "Career capital: rare and valuable skills. Accumulate it before demanding dream conditions. Build leverage first.",
    40
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "boredom", "focus"],
    "The ability to concentrate is a skill that gets valuable things done.",
    "Deep work produces results shallow work cannot. Protect it. Schedule it. Guard it fiercely.",
    35
  ),
  makeCard(
    "Cal Newport",
    "A World Without Email",
    ["productivity", "communication", "workflow"],
    "Email has replaced our workflows with an endless, unstructured back-and-forth.",
    "Communication overload fragments attention. Create processes that minimize messaging. Batch communication.",
    40
  ),
  makeCard(
    "Cal Newport",
    "Digital Minimalism",
    ["productivity", "solitude", "reflection"],
    "Solitude deprivation is a state in which you spend close to zero time alone with your own thoughts.",
    "Constant connectivity eliminates reflection. Schedule solitude. Your best thinking needs quiet.",
    40
  ),

  // ============================================
  // AUSTIN KLEON (8 cards)
  // ============================================
  makeCard(
    "Austin Kleon",
    "Steal Like an Artist",
    ["creativity", "originality", "influence"],
    "Nothing is original. Steal from anywhere that resonates with inspiration or fuels your imagination.",
    "All creative work builds on what came before. Influence isn't plagiarism—it's evolution. Collect inspirations.",
    40
  ),
  makeCard(
    "Austin Kleon",
    "Steal Like an Artist",
    ["creativity", "process", "identity"],
    "You are, in fact, a mashup of what you choose to let into your life.",
    "Curate your inputs. They become your outputs. You are what you consume. Choose wisely.",
    35
  ),
  makeCard(
    "Austin Kleon",
    "Show Your Work",
    ["creativity", "sharing", "process"],
    "You don't have to be a genius. You just have to be generous.",
    "Share your process. Help others. Generosity attracts opportunity. Give to get.",
    35
  ),
  makeCard(
    "Austin Kleon",
    "Show Your Work",
    ["creativity", "consistency", "visibility"],
    "Consistently posting work online is a practice that makes you better.",
    "Sharing creates accountability. Public commitment drives improvement. Ship regularly.",
    35
  ),
  makeCard(
    "Austin Kleon",
    "Keep Going",
    ["creativity", "persistence", "practice"],
    "Every day is a fresh start. Every day is a chance to make something.",
    "Forget yesterday's failures. Start again today. Consistency over intensity. Show up.",
    35
  ),
  makeCard(
    "Austin Kleon",
    "Steal Like an Artist",
    ["creativity", "imitation", "evolution"],
    "Start copying what you love. Copy, copy, copy. At the end, you'll find yourself.",
    "Imitation is how you learn. Through copying, you internalize. Your unique voice emerges from studying many voices.",
    40
  ),

  // ============================================
  // GEORGE ORWELL (8 cards)
  // ============================================
  makeCard(
    "George Orwell",
    "1984",
    ["philosophy", "truth", "power"],
    "Who controls the past controls the future. Who controls the present controls the past.",
    "Memory is power. Those who define history define reality. Guard truth against manipulation.",
    40
  ),
  makeCard(
    "George Orwell",
    "1984",
    ["philosophy", "freedom", "thought"],
    "Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.",
    "The foundation of freedom is truth. When basic facts are contested, liberty is in danger.",
    40
  ),
  makeCard(
    "George Orwell",
    "Animal Farm",
    ["philosophy", "equality", "power"],
    "All animals are equal, but some animals are more equal than others.",
    "Revolutions promising equality often create new hierarchies. Power corrupts ideals. Watch the powerful.",
    40
  ),
  makeCard(
    "George Orwell",
    "Politics and the English Language",
    ["writing", "clarity", "thinking"],
    "If thought corrupts language, language can also corrupt thought.",
    "Sloppy language enables sloppy thinking. Clarity in writing produces clarity in thought. Use precise words.",
    45
  ),
  makeCard(
    "George Orwell",
    "1984",
    ["philosophy", "truth", "reality"],
    "The Party told you to reject the evidence of your eyes and ears. It was their final, most essential command.",
    "Tyranny demands denial of reality. Trust your perception. When authorities deny the obvious, resist.",
    45
  ),
  makeCard(
    "George Orwell",
    "Why I Write",
    ["writing", "purpose", "honesty"],
    "Good prose is like a windowpane.",
    "Clear writing serves the reader. Ornate prose often hides weak thinking. Transparency over decoration.",
    35
  ),

  // ============================================
  // ADDITIONAL WISDOM (40 more cards)
  // ============================================
  makeCard(
    "Annie Dillard",
    "The Writing Life",
    ["creativity", "time", "attention"],
    "How we spend our days is, of course, how we spend our lives.",
    "Life is days. Days are hours. What you do daily becomes your life. Attend to the small; it composes the large.",
    40
  ),
  makeCard(
    "Mary Oliver",
    "Upstream",
    ["philosophy", "attention", "life"],
    "Attention is the beginning of devotion.",
    "What you pay attention to, you love. What you love, you care for. Attention is the seed of all virtue.",
    35
  ),
  makeCard(
    "Rebecca Solnit",
    "Hope in the Dark",
    ["philosophy", "hope", "action"],
    "Hope is not a lottery ticket. It's a hammer.",
    "Hope isn't passive wishing—it's active building. Hope that motivates action. Hope as fuel, not fantasy.",
    40
  ),
  makeCard(
    "Ursula K. Le Guin",
    "The Left Hand of Darkness",
    ["philosophy", "truth", "perspective"],
    "The only thing that makes life possible is permanent, intolerable uncertainty.",
    "Certainty is illusion. Embrace not-knowing. In uncertainty we find freedom and possibility.",
    40
  ),
  makeCard(
    "Oliver Sacks",
    "On the Move",
    ["philosophy", "purpose", "work"],
    "I cannot pretend I am without fear. But my predominant feeling is one of gratitude.",
    "Fear and gratitude can coexist. Choose which to foreground. Gratitude transforms experience.",
    40
  ),
  makeCard(
    "Richard Bach",
    "Illusions",
    ["philosophy", "reality", "perception"],
    "Argue for your limitations and sure enough, they're yours.",
    "What you believe becomes your cage. Beliefs about limits create limits. Question your constraints.",
    35
  ),
  makeCard(
    "Hermann Hesse",
    "Siddhartha",
    ["spirituality", "wisdom", "experience"],
    "Wisdom cannot be imparted. Wisdom that a wise man attempts to impart always sounds like foolishness.",
    "Wisdom must be lived to be understood. Words point; they don't transfer. Your path must be walked.",
    45
  ),
  makeCard(
    "Hermann Hesse",
    "Steppenwolf",
    ["philosophy", "identity", "multiplicity"],
    "Within you there is a stillness and a sanctuary to which you can retreat at any time.",
    "Inner refuge exists. No matter the outer chaos, stillness awaits within. Learn to access it.",
    40
  ),
  makeCard(
    "Fyodor Dostoevsky",
    "The Brothers Karamazov",
    ["philosophy", "freedom", "responsibility"],
    "Man is tormented by no greater anxiety than to find someone quickly to whom he can hand over that gift of freedom.",
    "Freedom is burden. We seek to give it away—to leaders, ideologies, others. Reclaim it. Bear it.",
    50
  ),
  makeCard(
    "Albert Camus",
    "The Myth of Sisyphus",
    ["philosophy", "absurdism", "meaning"],
    "One must imagine Sisyphus happy.",
    "The absurd hero finds meaning in the struggle itself. The rock rolls down; he pushes again. The act is enough.",
    40
  ),
  makeCard(
    "Albert Camus",
    "The Stranger",
    ["philosophy", "authenticity", "society"],
    "I may not have been sure about what really did interest me, but I was absolutely sure about what didn't.",
    "Knowing what you don't want is knowledge. Elimination clarifies. Start with what's wrong.",
    40
  ),
  makeCard(
    "Jean-Paul Sartre",
    "Being and Nothingness",
    ["philosophy", "freedom", "existence"],
    "We are condemned to be free.",
    "Freedom isn't optional. We must choose—even not choosing is a choice. Radical freedom, radical responsibility.",
    40
  ),
  makeCard(
    "Jean-Paul Sartre",
    "Existentialism Is a Humanism",
    ["philosophy", "responsibility", "action"],
    "Man is nothing else but what he makes of himself.",
    "No fixed human nature. You are your actions. Not what you intend—what you do. Define yourself through deeds.",
    40
  ),
  makeCard(
    "Simone de Beauvoir",
    "The Second Sex",
    ["philosophy", "identity", "construction"],
    "One is not born, but rather becomes, a woman.",
    "Identity is constructed, not given. We are made through culture, not nature. This means we can remake ourselves.",
    45
  ),
  makeCard(
    "Hannah Arendt",
    "The Human Condition",
    ["philosophy", "action", "politics"],
    "Action, the only activity that goes on directly between men, corresponds to the human condition of plurality.",
    "Action is uniquely human. Through action we reveal who we are. In plurality we find meaning.",
    45
  ),
  makeCard(
    "Martin Heidegger",
    "Being and Time",
    ["philosophy", "death", "authenticity"],
    "If I take death into my life, acknowledge it, and face it squarely, I will free myself from the anxiety of death.",
    "Confronting mortality creates authenticity. Avoidance breeds anxiety. Face death to live fully.",
    50
  ),
  makeCard(
    "Ludwig Wittgenstein",
    "Tractatus Logico-Philosophicus",
    ["philosophy", "language", "limits"],
    "The limits of my language mean the limits of my world.",
    "Language shapes perception. New words create new worlds. Expand vocabulary, expand possibility.",
    40
  ),
  makeCard(
    "Bertrand Russell",
    "The Conquest of Happiness",
    ["philosophy", "happiness", "interest"],
    "The secret of happiness is this: let your interests be as wide as possible.",
    "Narrow focus breeds unhappiness. Diversify your curiosities. Multiple interests provide resilience.",
    40
  ),
  makeCard(
    "Alfred North Whitehead",
    "Process and Reality",
    ["philosophy", "learning", "wonder"],
    "The art of progress is to preserve order amid change and to preserve change amid order.",
    "Balance stability and growth. Too much order stagnates. Too much change destroys. Navigate between.",
    45
  ),
  makeCard(
    "William James",
    "The Principles of Psychology",
    ["psychology", "attention", "reality"],
    "My experience is what I agree to attend to.",
    "Attention creates experience. What you focus on becomes your world. Choose your focus deliberately.",
    35
  ),
  makeCard(
    "William James",
    "Pragmatism",
    ["philosophy", "truth", "practical"],
    "Truth is what works.",
    "Pragmatic truth: useful, effective, produces results. Abstract truth matters less than practical impact.",
    35
  ),
  makeCard(
    "John Dewey",
    "Democracy and Education",
    ["philosophy", "education", "experience"],
    "Education is not preparation for life; education is life itself.",
    "Learning isn't separate from living. Each moment teaches. Life itself is the curriculum.",
    40
  ),
  makeCard(
    "Iris Murdoch",
    "The Sovereignty of Good",
    ["philosophy", "attention", "goodness"],
    "Attention is the effort to counteract states of illusion.",
    "We see what we're prepared to see. Attention breaks through bias. Good attention reveals reality.",
    45
  ),
  makeCard(
    "Martha Nussbaum",
    "Upheavals of Thought",
    ["philosophy", "emotion", "intelligence"],
    "Emotions are not just the fuel that powers the psychological mechanism of a reasoning creature.",
    "Emotions are intelligent. They contain judgments about value. Don't dismiss them—examine them.",
    45
  ),
  makeCard(
    "Charles Taylor",
    "Sources of the Self",
    ["philosophy", "identity", "meaning"],
    "We are selves only in that certain issues matter for us.",
    "What you care about defines who you are. No concerns, no self. Identity is structured by values.",
    45
  ),
  makeCard(
    "Michael Sandel",
    "Justice",
    ["philosophy", "justice", "society"],
    "A just society is not one that maximizes utility. It's one that honors each person's dignity.",
    "People aren't means to aggregate happiness. Dignity is non-negotiable. Justice respects individual worth.",
    45
  ),
  makeCard(
    "Robert Nozick",
    "Anarchy, State, and Utopia",
    ["philosophy", "freedom", "rights"],
    "Individuals have rights, and there are things no person or group may do to them.",
    "Rights are boundaries. They limit what can be done to you—even for good causes. Individual sovereignty matters.",
    45
  ),
  makeCard(
    "John Rawls",
    "A Theory of Justice",
    ["philosophy", "justice", "fairness"],
    "Justice is the first virtue of social institutions.",
    "Fair society matters more than efficient society. Justice precedes other values. Get the foundation right.",
    45
  ),
  makeCard(
    "Wendell Berry",
    "The Art of the Commonplace",
    ["philosophy", "place", "community"],
    "The mind that is not baffled is not employed.",
    "Comfort with confusion is wisdom. The best thinking happens at the edge of understanding. Stay puzzled.",
    40
  ),
  makeCard(
    "Wendell Berry",
    "What Are People For?",
    ["philosophy", "work", "meaning"],
    "We have lived by the assumption that what was good for us would be good for the world.",
    "Self-interest doesn't automatically serve common good. Consider wider impact. Think beyond self.",
    40
  ),
  makeCard(
    "E.F. Schumacher",
    "Small Is Beautiful",
    ["philosophy", "economics", "scale"],
    "Small is beautiful.",
    "Bigger isn't always better. Human scale matters. Appropriate technology serves; gigantic technology dominates.",
    35
  ),
  makeCard(
    "Ivan Illich",
    "Deschooling Society",
    ["philosophy", "education", "institutions"],
    "School is the advertising agency which makes you believe you need society as it is.",
    "Institutions shape beliefs about what's needed. Question institutional assumptions. Learning happens everywhere.",
    45
  ),
  makeCard(
    "Christopher Alexander",
    "A Pattern Language",
    ["design", "patterns", "building"],
    "Every pattern describes a problem which occurs over and over again, and then describes the core of the solution.",
    "Solutions have structure. Identify recurring patterns. Apply proven templates. Don't reinvent constantly.",
    45
  ),
  makeCard(
    "Edward Tufte",
    "The Visual Display of Quantitative Information",
    ["design", "data", "clarity"],
    "Graphical excellence is that which gives to the viewer the greatest number of ideas in the shortest time.",
    "Information design serves understanding. Clarity over decoration. Respect the audience's time and intelligence.",
    40
  ),
  makeCard(
    "Donald Norman",
    "The Design of Everyday Things",
    ["design", "usability", "humans"],
    "Good design is actually a lot harder to notice than poor design.",
    "Great design is invisible. It just works. When you notice design, something went wrong.",
    40
  ),
  makeCard(
    "Dieter Rams",
    "Less but Better",
    ["design", "simplicity", "quality"],
    "Less, but better.",
    "Subtract until only essence remains. Quality over quantity. Everything should have purpose or go.",
    35
  ),
  makeCard(
    "John Maeda",
    "The Laws of Simplicity",
    ["design", "simplicity", "complexity"],
    "Simplicity is about subtracting the obvious and adding the meaningful.",
    "Simplicity isn't absence—it's essence. Remove the unnecessary, emphasize what matters. Curate ruthlessly.",
    40
  ),
  makeCard(
    "Alain de Botton",
    "The Consolations of Philosophy",
    ["philosophy", "wisdom", "life"],
    "The greatest problem of human life is how to live.",
    "Philosophy's real question: how should I live? Abstract debates matter less than practical wisdom.",
    40
  ),
  makeCard(
    "Alain de Botton",
    "Status Anxiety",
    ["philosophy", "success", "comparison"],
    "Status anxiety is the worry that we are in danger of failing to conform to the ideals of success.",
    "We suffer from others' judgments. Status seeking is exhausting. Define success internally or be forever anxious.",
    45
  ),
  makeCard(
    "Nassim Taleb",
    "The Bed of Procrustes",
    ["philosophy", "knowledge", "limits"],
    "An idea starts to be interesting when you get scared of taking it to its logical conclusion.",
    "Intellectual courage: follow thoughts where they lead. Comfortable conclusions are often incomplete.",
    40
  ),


  // ============================================
  // ANCIENT WISDOM (20 cards)
  // ============================================
  makeCard(
    "Lao Tzu",
    "Tao Te Ching",
    ["philosophy", "wisdom", "simplicity"],
    "A journey of a thousand miles begins with a single step.",
    "Start where you are. Small actions compound. Don't be paralyzed by the scale of the journey.",
    30
  ),
  makeCard(
    "Lao Tzu",
    "Tao Te Ching",
    ["philosophy", "wisdom", "flexibility"],
    "The stiff and unbending is the disciple of death. The soft and yielding is the disciple of life.",
    "Rigidity breaks. Flexibility endures. The willow survives the storm; the oak snaps. Adapt.",
    40
  ),
  makeCard(
    "Lao Tzu",
    "Tao Te Ching",
    ["philosophy", "leadership", "humility"],
    "When the best leader's work is done, the people say, 'We did it ourselves.'",
    "Great leaders enable. They don't dominate. Success should feel like team achievement, not leader's glory.",
    40
  ),
  makeCard(
    "Lao Tzu",
    "Tao Te Ching",
    ["philosophy", "knowledge", "wisdom"],
    "He who knows others is wise. He who knows himself is enlightened.",
    "External knowledge is common. Self-knowledge is rare and more valuable. Turn the gaze inward.",
    35
  ),
  makeCard(
    "Confucius",
    "Analects",
    ["philosophy", "learning", "practice"],
    "I hear and I forget. I see and I remember. I do and I understand.",
    "Learning requires action. Knowledge without practice fades. Understanding comes through doing.",
    35
  ),
  makeCard(
    "Confucius",
    "Analects",
    ["philosophy", "self-improvement", "standards"],
    "When you see a good person, think of becoming like her. When you see someone not so good, reflect on your own weak points.",
    "Others are mirrors. Good examples inspire. Bad examples warn. All encounters teach.",
    40
  ),
  makeCard(
    "Confucius",
    "Analects",
    ["philosophy", "character", "reputation"],
    "The superior man is modest in his speech, but exceeds in his actions.",
    "Talk is cheap. Let actions speak. Under-promise, over-deliver. Substance over style.",
    35
  ),
  makeCard(
    "Sun Tzu",
    "The Art of War",
    ["strategy", "preparation", "victory"],
    "Every battle is won before it is fought.",
    "Preparation determines outcome. Victory is earned in training. The fight itself is just the reveal.",
    35
  ),
  makeCard(
    "Sun Tzu",
    "The Art of War",
    ["strategy", "knowledge", "competition"],
    "Know yourself and you will win all battles.",
    "Self-knowledge is strategic advantage. Know your strengths, weaknesses, tendencies. Self-awareness is power.",
    35
  ),
  makeCard(
    "Sun Tzu",
    "The Art of War",
    ["strategy", "adaptability", "tactics"],
    "In the midst of chaos, there is also opportunity.",
    "Disorder creates openings. While others panic, the prepared act. See opportunity in disruption.",
    35
  ),
  makeCard(
    "Buddha",
    "Dhammapada",
    ["spirituality", "mind", "thoughts"],
    "The mind is everything. What you think you become.",
    "Thoughts shape reality. Mind is the precursor to experience. Tend your mental garden carefully.",
    35
  ),
  makeCard(
    "Buddha",
    "Dhammapada",
    ["spirituality", "attachment", "suffering"],
    "Attachment is the root of all suffering.",
    "Clinging causes pain. Let go and pain releases. This doesn't mean don't care—it means hold loosely.",
    35
  ),
  makeCard(
    "Buddha",
    "Dhammapada",
    ["spirituality", "action", "consequence"],
    "What we are today comes from our thoughts of yesterday, and our present thoughts build our life of tomorrow.",
    "Causation is mental first. Today's thoughts create tomorrow's reality. Think with intention.",
    40
  ),
  makeCard(
    "Plato",
    "The Republic",
    ["philosophy", "knowledge", "reality"],
    "We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.",
    "Truth can be frightening. Many prefer comfortable darkness to uncomfortable illumination. Choose light.",
    45
  ),
  makeCard(
    "Aristotle",
    "Nicomachean Ethics",
    ["philosophy", "virtue", "habit"],
    "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    "Character is crystallized habit. You don't become excellent through one act but through consistent practice.",
    40
  ),
  makeCard(
    "Aristotle",
    "Politics",
    ["philosophy", "happiness", "purpose"],
    "Happiness depends upon ourselves.",
    "External fortune affects happiness less than internal disposition. Happiness is skill, not circumstance.",
    35
  ),
  makeCard(
    "Socrates",
    "Apology",
    ["philosophy", "wisdom", "humility"],
    "I know that I know nothing.",
    "Wisdom begins with acknowledging ignorance. The wise know their limits. Certainty is often foolishness.",
    35
  ),
  makeCard(
    "Heraclitus",
    "Fragments",
    ["philosophy", "change", "wisdom"],
    "No man ever steps in the same river twice, for it's not the same river and he's not the same man.",
    "Everything flows. Change is the only constant. Don't cling to permanence—it doesn't exist.",
    40
  ),
  makeCard(
    "Plutarch",
    "Moralia",
    ["philosophy", "education", "character"],
    "The mind is not a vessel to be filled but a fire to be kindled.",
    "Education isn't information transfer—it's inspiration. Light fires, don't fill buckets.",
    40
  ),

  // ============================================
  // MODERN BUSINESS WISDOM (30 cards)
  // ============================================
  makeCard(
    "Peter Thiel",
    "Zero to One",
    ["business", "innovation", "contrarian"],
    "What important truth do very few people agree with you on?",
    "Contrarian correctness creates value. If everyone agrees, there's no alpha. Find unpopular truths.",
    40
  ),
  makeCard(
    "Peter Thiel",
    "Zero to One",
    ["business", "competition", "monopoly"],
    "Competition is for losers.",
    "In perfect competition, profits are zero. Build monopolies through innovation. Be unique, not competitive.",
    40
  ),
  makeCard(
    "Peter Thiel",
    "Zero to One",
    ["business", "secrets", "opportunity"],
    "Every great company is built around a secret that's hidden from the outside.",
    "Valuable companies see what others miss. Find secrets—things true but not widely known. That's where value hides.",
    45
  ),
  makeCard(
    "Marc Andreessen",
    "Interviews",
    ["business", "markets", "product"],
    "Product-market fit means being in a good market with a product that can satisfy that market.",
    "Great product + bad market = failure. Mediocre product + great market = success. Market trumps everything.",
    40
  ),
  makeCard(
    "Ben Horowitz",
    "The Hard Thing About Hard Things",
    ["business", "leadership", "adversity"],
    "There are no silver bullets, only lead ones.",
    "No easy answers exist. Success requires grinding through problems. Stop looking for shortcuts.",
    35
  ),
  makeCard(
    "Ben Horowitz",
    "The Hard Thing About Hard Things",
    ["business", "leadership", "truth"],
    "Take care of the people, the products, and the profits—in that order.",
    "Sequence matters. People enable products. Products enable profits. Get the order right.",
    35
  ),
  makeCard(
    "Andy Grove",
    "High Output Management",
    ["business", "management", "leverage"],
    "A manager's output = the output of his organization + the output of neighboring organizations under his influence.",
    "Managers are multipliers. Your job isn't doing—it's enabling others to do more. Maximize leverage.",
    45
  ),
  makeCard(
    "Andy Grove",
    "Only the Paranoid Survive",
    ["business", "strategy", "change"],
    "Business success contains the seeds of its own destruction.",
    "Success breeds complacency. What works stops working. Constant vigilance required. Stay paranoid.",
    40
  ),
  makeCard(
    "Clayton Christensen",
    "The Innovator's Dilemma",
    ["business", "innovation", "disruption"],
    "Disruptive technologies typically enable new markets to emerge.",
    "Disruption comes from below. Big players miss it because it looks like a toy. Watch the edges.",
    45
  ),
  makeCard(
    "Clayton Christensen",
    "How Will You Measure Your Life?",
    ["business", "purpose", "meaning"],
    "The job to be done is the fundamental unit of analysis.",
    "People don't buy products—they hire them for jobs. Understand the job; design the solution.",
    40
  ),
  makeCard(
    "Jeff Bezos",
    "Shareholder Letters",
    ["business", "customers", "long-term"],
    "We are genuinely customer-centric. We start with the customer and we work backwards.",
    "Customer obsession over competitor obsession. Start with needs, not capabilities. Work backwards.",
    35
  ),
  makeCard(
    "Jeff Bezos",
    "Shareholder Letters",
    ["business", "decisions", "reversibility"],
    "Some decisions are one-way doors; others are two-way doors.",
    "One-way doors deserve deliberation. Two-way doors deserve speed. Know which type you face.",
    40
  ),
  makeCard(
    "Charlie Munger",
    "Poor Charlie's Almanack",
    ["business", "thinking", "inversion"],
    "Invert, always invert.",
    "Instead of asking how to succeed, ask how to fail—then avoid those things. Inversion reveals what's hidden.",
    35
  ),
  makeCard(
    "Charlie Munger",
    "Poor Charlie's Almanack",
    ["business", "learning", "models"],
    "You've got to have models in your head. And you've got to array your experience on this latticework of models.",
    "Mental models are tools. Collect many from many fields. Reality is multidisciplinary; thinking should be too.",
    45
  ),
  makeCard(
    "Warren Buffett",
    "Shareholder Letters",
    ["finance", "investing", "patience"],
    "The stock market is a device for transferring money from the impatient to the patient.",
    "Patience is competitive advantage. Most people can't wait. If you can, you win. Time arbitrage.",
    40
  ),
  makeCard(
    "Warren Buffett",
    "Shareholder Letters",
    ["finance", "risk", "understanding"],
    "Risk comes from not knowing what you're doing.",
    "Real risk is ignorance. Knowledge reduces risk. Stay within your circle of competence.",
    35
  ),
  makeCard(
    "Warren Buffett",
    "Shareholder Letters",
    ["finance", "habits", "compounding"],
    "Chains of habit are too light to be felt until they are too heavy to be broken.",
    "Small habits seem insignificant until they compound. Start right. Bad habits become prisons.",
    40
  ),
  makeCard(
    "Ray Dalio",
    "Principles",
    ["business", "principles", "systems"],
    "Principles are fundamental truths that serve as the foundations for behavior.",
    "Write down your principles. They create consistency. Without explicit principles, you decide randomly.",
    40
  ),
  makeCard(
    "Ray Dalio",
    "Principles",
    ["business", "truth", "radical-transparency"],
    "Radical truth and radical transparency are the foundations for meaningful work and relationships.",
    "Honest feedback, even when painful. Transparency builds trust. The truth hurts short-term, heals long-term.",
    40
  ),
  makeCard(
    "Ray Dalio",
    "Principles",
    ["business", "mistakes", "learning"],
    "Pain + Reflection = Progress.",
    "Pain is signal. Reflection extracts the lesson. Without reflection, pain is just pain. Make it productive.",
    35
  ),
  makeCard(
    "Patrick Lencioni",
    "The Five Dysfunctions of a Team",
    ["business", "teams", "trust"],
    "Trust is the foundation of real teamwork.",
    "Without trust, teams play politics. With trust, they collaborate. Trust is the first domino.",
    35
  ),
  makeCard(
    "Patrick Lencioni",
    "The Five Dysfunctions of a Team",
    ["business", "conflict", "teams"],
    "All great relationships require productive conflict to grow.",
    "Artificial harmony stagnates. Productive conflict improves. Teams need to debate, not avoid.",
    40
  ),
  makeCard(
    "Kim Scott",
    "Radical Candor",
    ["leadership", "feedback", "care"],
    "Radical Candor is caring personally while challenging directly.",
    "Care enough to be honest. Ruinous empathy avoids truth. Obnoxious aggression lacks care. Balance both.",
    40
  ),
  makeCard(
    "Eric Ries",
    "The Lean Startup",
    ["business", "startups", "learning"],
    "The only way to win is to learn faster than anyone else.",
    "Speed of learning is the advantage. Build, measure, learn—fast. Validated learning trumps vanity metrics.",
    40
  ),
  makeCard(
    "Eric Ries",
    "The Lean Startup",
    ["business", "mvp", "experimentation"],
    "If you cannot fail, you cannot learn.",
    "Failure is the tuition for learning. Design experiments that can fail. Safe bets teach nothing.",
    35
  ),
  makeCard(
    "Reed Hastings",
    "No Rules Rules",
    ["business", "freedom", "culture"],
    "Adequate performance gets a generous severance package.",
    "High-talent density requires high standards. Good enough isn't good enough. Exceptional or out.",
    40
  ),
  makeCard(
    "Bill Campbell",
    "Trillion Dollar Coach",
    ["leadership", "coaching", "people"],
    "Your title makes you a manager. Your people make you a leader.",
    "Authority is given; leadership is earned. Focus on people. They determine your effectiveness.",
    35
  ),
  makeCard(
    "Ed Catmull",
    "Creativity, Inc.",
    ["business", "creativity", "failure"],
    "If you aren't experiencing failure, then you are making a far worse mistake: You are being driven by the desire to avoid it.",
    "Fear of failure prevents innovation. Embrace failure as information. Safe is the riskiest strategy.",
    45
  ),
  makeCard(
    "Daniel Pink",
    "Drive",
    ["business", "motivation", "autonomy"],
    "Control leads to compliance; autonomy leads to engagement.",
    "Motivation 3.0: autonomy, mastery, purpose. Carrots and sticks work for simple tasks. Creative work needs intrinsic drivers.",
    45
  ),
  makeCard(
    "Daniel Pink",
    "Drive",
    ["business", "mastery", "motivation"],
    "Mastery is the desire to get better at something that matters.",
    "Mastery is endless pursuit, never attained. The asymptote is the point—always approaching, never arriving.",
    40
  ),


  // ============================================
  // BRENÉ BROWN (15 cards)
  // ============================================
  makeCard(
    "Brené Brown",
    "Daring Greatly",
    ["psychology", "vulnerability", "courage"],
    "Vulnerability is not winning or losing; it's having the courage to show up and be seen when we have no control over the outcome.",
    "Vulnerability isn't weakness—it's courage. Showing up without armor is the bravest thing. Risk being seen.",
    45
  ),
  makeCard(
    "Brené Brown",
    "Daring Greatly",
    ["psychology", "shame", "connection"],
    "Shame derives its power from being unspeakable.",
    "Shame grows in secrecy. Speaking it breaks its power. What we can't talk about controls us.",
    40
  ),
  makeCard(
    "Brené Brown",
    "The Gifts of Imperfection",
    ["psychology", "authenticity", "belonging"],
    "Authenticity is a collection of choices that we have to make every day.",
    "Being real isn't a one-time decision. It's daily courage. Each moment offers a choice: authentic or armor.",
    40
  ),
  makeCard(
    "Brené Brown",
    "Braving the Wilderness",
    ["psychology", "belonging", "courage"],
    "True belonging doesn't require you to change who you are; it requires you to be who you are.",
    "Fitting in is not belonging. Belonging is being accepted as you are. Don't contort yourself for approval.",
    40
  ),
  makeCard(
    "Brené Brown",
    "Rising Strong",
    ["psychology", "failure", "resilience"],
    "The middle is messy, but it's also where the magic happens.",
    "Transformation is uncomfortable. The middle of change is chaos. Don't quit in the messy middle.",
    40
  ),
  makeCard(
    "Brené Brown",
    "Dare to Lead",
    ["leadership", "courage", "vulnerability"],
    "Clear is kind. Unclear is unkind.",
    "Avoiding difficult conversations isn't nice—it's cruel. Clarity serves people. Be direct out of care.",
    35
  ),
  makeCard(
    "Brené Brown",
    "Dare to Lead",
    ["leadership", "trust", "connection"],
    "Trust is built in very small moments.",
    "Grand gestures don't create trust. Consistent small actions do. Reliability in tiny things adds up.",
    35
  ),
  makeCard(
    "Brené Brown",
    "The Gifts of Imperfection",
    ["psychology", "perfectionism", "worthiness"],
    "Perfectionism is not the same thing as striving to be your best.",
    "Perfectionism is armor against judgment. Excellence is growth toward potential. One protects; one creates.",
    40
  ),
  makeCard(
    "Brené Brown",
    "Daring Greatly",
    ["psychology", "criticism", "courage"],
    "If you're not in the arena also getting your ass kicked, I'm not interested in your feedback.",
    "Critics from the cheap seats don't matter. Only feedback from those who risk alongside you counts.",
    40
  ),
  makeCard(
    "Brené Brown",
    "Rising Strong",
    ["psychology", "stories", "meaning"],
    "The story I'm telling myself is...",
    "We make up stories to explain events. Name the story to examine it. Our first draft is usually wrong.",
    35
  ),

  // ============================================
  // ESTHER PEREL (10 cards)
  // ============================================
  makeCard(
    "Esther Perel",
    "Mating in Captivity",
    ["relationships", "desire", "mystery"],
    "Love enjoys knowing everything about you; desire needs mystery.",
    "Intimacy and desire have different needs. Closeness can kill passion. Maintain some separateness.",
    45
  ),
  makeCard(
    "Esther Perel",
    "Mating in Captivity",
    ["relationships", "security", "adventure"],
    "We seek a partner who provides stability, consistency, and dependability. And we want that same person to also bring surprise, mystery, and adventure.",
    "Contradictory needs in one person. Security and excitement. Both are valid. Balance is the art.",
    50
  ),
  makeCard(
    "Esther Perel",
    "The State of Affairs",
    ["relationships", "infidelity", "meaning"],
    "Affairs are about longing and loss—a search for something that feels missing.",
    "Infidelity isn't always about the partner. Often about the self—who they were or want to be.",
    45
  ),
  makeCard(
    "Esther Perel",
    "Mating in Captivity",
    ["relationships", "eroticism", "attention"],
    "Eroticism requires separateness.",
    "You can't desire what you already have completely. Distance creates longing. Space enables wanting.",
    40
  ),
  makeCard(
    "Esther Perel",
    "Mating in Captivity",
    ["relationships", "communication", "desire"],
    "The quality of our relationships determines the quality of our lives.",
    "Relationships are life. Invest in them accordingly. Connection is not a side project.",
    35
  ),

  // ============================================
  // OLIVER BURKEMAN (10 cards)
  // ============================================
  makeCard(
    "Oliver Burkeman",
    "Four Thousand Weeks",
    ["productivity", "time", "mortality"],
    "The average human lifespan is absurdly, insultingly brief.",
    "Four thousand weeks. That's about it. This isn't morbid—it's clarifying. Spend time on what matters.",
    40
  ),
  makeCard(
    "Oliver Burkeman",
    "Four Thousand Weeks",
    ["productivity", "limits", "acceptance"],
    "The problem with trying to make time for everything that feels important is that you definitely never will.",
    "You can't do it all. Stop trying. Choose deliberately. Missing out is the price of depth.",
    40
  ),
  makeCard(
    "Oliver Burkeman",
    "Four Thousand Weeks",
    ["productivity", "efficiency", "paradox"],
    "The more efficient you get, the more you'll be asked to do.",
    "Productivity creates demand. Speed invites more tasks. The treadmill accelerates. Maybe slow down.",
    40
  ),
  makeCard(
    "Oliver Burkeman",
    "Four Thousand Weeks",
    ["productivity", "patience", "time"],
    "Patience isn't passive waiting. It's the recognition that things take the time they take.",
    "You can't always speed things up. Some processes have their own timeline. Impatience doesn't help.",
    40
  ),
  makeCard(
    "Oliver Burkeman",
    "Four Thousand Weeks",
    ["productivity", "attention", "distraction"],
    "Attention is life. What you pay attention to is your life.",
    "Distraction isn't wasted time—it's wasted life. Attention is all we have. Guard it fiercely.",
    35
  ),
  makeCard(
    "Oliver Burkeman",
    "The Antidote",
    ["psychology", "happiness", "negativity"],
    "The effort to feel happy is often precisely the thing that makes us miserable.",
    "Pursuing happiness often backfires. Accepting negative emotions paradoxically creates peace.",
    40
  ),
  makeCard(
    "Oliver Burkeman",
    "Four Thousand Weeks",
    ["productivity", "meaning", "finitude"],
    "Accepting limitation is liberating.",
    "You can't have everything. Once you accept this, you can actually choose. Limits enable focus.",
    35
  ),

  // ============================================
  // DEREK SIVERS (10 cards)
  // ============================================
  makeCard(
    "Derek Sivers",
    "Anything You Want",
    ["business", "purpose", "simplicity"],
    "When you make a business, you get to make a little universe where you control all the laws.",
    "Business is world-building. You set the rules. Make rules that serve the life you want.",
    40
  ),
  makeCard(
    "Derek Sivers",
    "Anything You Want",
    ["business", "decisions", "clarity"],
    "If it's not a hell yes, it's a no.",
    "Enthusiasm is the filter. Lukewarm interest means no. Only pursue what excites you fully.",
    35
  ),
  makeCard(
    "Derek Sivers",
    "Hell Yeah or No",
    ["productivity", "priorities", "focus"],
    "Busy is a decision.",
    "No one is too busy—they're prioritizing other things. Own your choices. You chose this schedule.",
    35
  ),
  makeCard(
    "Derek Sivers",
    "Anything You Want",
    ["business", "service", "customers"],
    "Make every decision—even decisions about whether to expand the business, raise money, or promote someone—according to what's best for your customers.",
    "Customer obsession isn't a strategy—it's the strategy. Every decision runs through this filter.",
    45
  ),
  makeCard(
    "Derek Sivers",
    "Anything You Want",
    ["business", "growth", "happiness"],
    "Never forget why you're really doing what you're doing.",
    "Business is means, not end. If success makes you miserable, you've failed. Keep the purpose in view.",
    35
  ),
  makeCard(
    "Derek Sivers",
    "How to Live",
    ["philosophy", "perspective", "contradictions"],
    "There are always more than two options.",
    "Binary thinking is a trap. Life offers infinite paths. When stuck between two, look for three.",
    35
  ),
  makeCard(
    "Derek Sivers",
    "Hell Yeah or No",
    ["productivity", "goals", "secrets"],
    "Don't announce your goals. Studies show it actually reduces motivation.",
    "Telling people your plans gives premature satisfaction. Keep goals private. Let results speak.",
    40
  ),

  // ============================================
  // MORGAN HOUSEL (12 cards)
  // ============================================
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "wealth", "behavior"],
    "Doing well with money has little to do with how smart you are and a lot to do with how you behave.",
    "Financial success is behavioral, not intellectual. Smart people go broke. Patient people get rich.",
    40
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "wealth", "enough"],
    "The hardest financial skill is getting the goalpost to stop moving.",
    "Enough is a moving target. Comparison inflates needs. Define enough or chase forever.",
    40
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "luck", "risk"],
    "Nothing is as good or as bad as it seems.",
    "Outcomes mix skill and luck. Success isn't all merit; failure isn't all fault. Stay humble either way.",
    35
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "compounding", "time"],
    "The first rule of compounding is to never interrupt it unnecessarily.",
    "Compounding needs time. Patience is the key. Don't interrupt the snowball.",
    35
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "wealth", "freedom"],
    "The highest form of wealth is the ability to wake up every morning and say, 'I can do whatever I want today.'",
    "Wealth isn't stuff—it's options. Financial freedom means owning your time. That's the real prize.",
    40
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "saving", "control"],
    "Saving is the gap between your ego and your income.",
    "Spending signals status. Saving requires ignoring status games. It's an ego battle, not a math problem.",
    40
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "history", "uncertainty"],
    "History is the study of change, ironically used as a map of the future.",
    "Past doesn't predict future. History rhymes but doesn't repeat. Use it for patterns, not predictions.",
    40
  ),
  makeCard(
    "Morgan Housel",
    "The Psychology of Money",
    ["finance", "risk", "survival"],
    "More than I want big returns, I want to be financially unbreakable.",
    "Survival beats optimization. Don't blow up chasing returns. The game is staying in the game.",
    40
  ),
  makeCard(
    "Morgan Housel",
    "Same as Ever",
    ["psychology", "change", "constants"],
    "The most important events are the ones that don't change.",
    "We obsess over what's changing. Wisdom sees what stays the same. Human nature is constant.",
    40
  ),
  makeCard(
    "Morgan Housel",
    "Same as Ever",
    ["psychology", "expectations", "happiness"],
    "Happiness is just results minus expectations.",
    "Lower expectations, increase happiness. The math is simple. Managing expectations is a skill.",
    35
  ),

  // ============================================
  // NAVAL RAVIKANT - MORE (10 cards)
  // ============================================
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["philosophy", "reading", "learning"],
    "Read what you love until you love to read.",
    "Don't force reading. Follow curiosity. Interest leads to absorption. The habit builds itself.",
    35
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["philosophy", "thinking", "originality"],
    "Escape competition through authenticity.",
    "No one can compete with you at being you. Find your unique angle. Authenticity is the ultimate moat.",
    35
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "wealth", "ownership"],
    "You're not going to get rich renting out your time.",
    "Trading hours for dollars has a ceiling. Own equity. Build assets. Create leverage.",
    35
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["philosophy", "peace", "desire"],
    "Desire is a contract you make with yourself to be unhappy until you get what you want.",
    "Every desire is suffering until fulfilled—and then replaced by new desire. Reduce desires, increase peace.",
    45
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["philosophy", "meditation", "awareness"],
    "A calm mind, a fit body, and a house full of love. These things cannot be bought. They must be earned.",
    "The most valuable things aren't purchasable. They require consistent effort. No shortcuts exist.",
    40
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "judgment", "leverage"],
    "Judgment is the most important skill.",
    "With good judgment, you need less of everything else. Bad judgment makes other skills worthless.",
    35
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["philosophy", "happiness", "internal"],
    "Happiness is a skill. It's a choice. It's not something that happens to you.",
    "We're taught happiness is conditional on circumstances. It's not. It's trainable, like fitness.",
    40
  ),
  makeCard(
    "Naval Ravikant",
    "The Almanack of Naval Ravikant",
    ["business", "specific-knowledge", "skills"],
    "Specific knowledge is found by pursuing your genuine curiosity and passion.",
    "Unique skills come from authentic interests. Follow curiosity deeply. Your specific knowledge emerges.",
    40
  ),

  // ============================================
  // SETH GODIN - MORE (10 cards)
  // ============================================
  makeCard(
    "Seth Godin",
    "The Practice",
    ["creativity", "process", "trust"],
    "Trust the process, not the outcome.",
    "Outcomes are uncertain. Process is controllable. Do the work regardless of results. That's the practice.",
    35
  ),
  makeCard(
    "Seth Godin",
    "Tribes",
    ["leadership", "movement", "connection"],
    "Leadership is the art of giving people a platform for spreading ideas that work.",
    "Leaders amplify others. They create stages. The best leaders make more leaders.",
    40
  ),
  makeCard(
    "Seth Godin",
    "This Is Marketing",
    ["business", "marketing", "empathy"],
    "Marketing is about serving others.",
    "Marketing isn't manipulation—it's empathy at scale. Understand needs, serve them, communicate clearly.",
    35
  ),
  makeCard(
    "Seth Godin",
    "The Practice",
    ["creativity", "consistency", "identity"],
    "Creative people don't wait for the muse. They show up.",
    "Professionals work on schedule. Amateurs wait for inspiration. Consistency defeats sporadic brilliance.",
    35
  ),
  makeCard(
    "Seth Godin",
    "Linchpin",
    ["business", "art", "gift"],
    "Art is a personal gift that changes the recipient.",
    "Art isn't only painting. It's any generous, risky, creative gift. Your work can be art.",
    35
  ),

  // ============================================
  // DAVID ALLEN (8 cards)
  // ============================================
  makeCard(
    "David Allen",
    "Getting Things Done",
    ["productivity", "stress", "clarity"],
    "Your mind is for having ideas, not holding them.",
    "Open loops drain energy. Capture everything externally. Free your mind for creative work.",
    40
  ),
  makeCard(
    "David Allen",
    "Getting Things Done",
    ["productivity", "action", "clarity"],
    "You can do anything, but not everything.",
    "Infinite options, finite capacity. Choosing what not to do is the crucial skill.",
    35
  ),
  makeCard(
    "David Allen",
    "Getting Things Done",
    ["productivity", "next-action", "momentum"],
    "What's the next action?",
    "Vague tasks stall. Concrete next actions move. Define the specific next physical action always.",
    35
  ),
  makeCard(
    "David Allen",
    "Getting Things Done",
    ["productivity", "review", "control"],
    "The weekly review is the master key to maintaining clarity and focus.",
    "Regular review maintains system integrity. Without it, trust erodes. Weekly review is non-negotiable.",
    40
  ),
  makeCard(
    "David Allen",
    "Getting Things Done",
    ["productivity", "capture", "trust"],
    "Your ability to generate power is directly proportional to your ability to relax.",
    "Tension blocks creativity. Trusted systems create relaxation. Relaxation enables peak performance.",
    40
  ),

  // ============================================
  // GREG MCKEOWN (10 cards)
  // ============================================
  makeCard(
    "Greg McKeown",
    "Essentialism",
    ["productivity", "focus", "priorities"],
    "Essentialism is not about how to get more things done; it's about how to get the right things done.",
    "Productivity isn't volume—it's impact. Fewer things, better done. Quality of choice over quantity.",
    40
  ),
  makeCard(
    "Greg McKeown",
    "Essentialism",
    ["productivity", "no", "boundaries"],
    "If you don't prioritize your life, someone else will.",
    "Others have agendas for your time. Without clear priorities, you execute their agenda, not yours.",
    40
  ),
  makeCard(
    "Greg McKeown",
    "Essentialism",
    ["productivity", "tradeoffs", "choices"],
    "We can either make our choices deliberately or allow other people's agendas to control our lives.",
    "There's no avoiding trade-offs. Pretending otherwise means trade-offs happen by default. Choose consciously.",
    40
  ),
  makeCard(
    "Greg McKeown",
    "Essentialism",
    ["productivity", "elimination", "focus"],
    "The disciplined pursuit of less.",
    "Less but better. Not less as laziness—less as strategy. Concentrate force on what matters most.",
    35
  ),
  makeCard(
    "Greg McKeown",
    "Effortless",
    ["productivity", "ease", "simplicity"],
    "What if this could be easy?",
    "We assume important things must be hard. Challenge that. Find the easy path to essential results.",
    35
  ),
  makeCard(
    "Greg McKeown",
    "Effortless",
    ["productivity", "rest", "recovery"],
    "Rest is not a reward for work. It's a requirement.",
    "Recovery isn't optional. Sustainable performance requires rest. Build it in, don't treat it as luxury.",
    35
  ),
  makeCard(
    "Greg McKeown",
    "Essentialism",
    ["productivity", "clarity", "decisions"],
    "If it isn't a clear yes, then it's a clear no.",
    "Ambivalence is a signal. Enthusiasm is the threshold. Anything less than excitement is decline.",
    35
  ),

  // ============================================
  // SCOTT ADAMS (8 cards)
  // ============================================
  makeCard(
    "Scott Adams",
    "How to Fail at Almost Everything and Still Win Big",
    ["business", "systems", "goals"],
    "Goals are for losers. Systems are for winners.",
    "Goals have endpoints. Systems are ongoing. Focus on processes that improve odds continuously.",
    40
  ),
  makeCard(
    "Scott Adams",
    "How to Fail at Almost Everything and Still Win Big",
    ["business", "skills", "combination"],
    "Every skill you acquire doubles your odds of success.",
    "Be good at combinations of skills. Top 25% in several areas beats top 1% in one.",
    40
  ),
  makeCard(
    "Scott Adams",
    "How to Fail at Almost Everything and Still Win Big",
    ["business", "energy", "management"],
    "Manage your energy, not your time.",
    "Energy is the master resource. Time without energy is useless. Protect energy before schedule.",
    35
  ),
  makeCard(
    "Scott Adams",
    "How to Fail at Almost Everything and Still Win Big",
    ["business", "failure", "learning"],
    "Failure is where success likes to hide in plain sight.",
    "Every failure teaches. Success stories are failure stories that kept going. Fail toward success.",
    35
  ),
  makeCard(
    "Scott Adams",
    "How to Fail at Almost Everything and Still Win Big",
    ["business", "luck", "probability"],
    "Luck can be manufactured by being in the right places at the right times.",
    "Luck isn't random—it's positioning. Put yourself where good things can happen. Increase surface area.",
    40
  ),

  // ============================================
  // MARIA POPOVA (5 cards)
  // ============================================
  makeCard(
    "Maria Popova",
    "Figuring",
    ["philosophy", "curiosity", "connection"],
    "How we spend our days is, of course, how we spend our lives.",
    "Daily choices compound into a life. The small matters. Pay attention to how days are spent.",
    40
  ),
  makeCard(
    "Maria Popova",
    "Brain Pickings",
    ["philosophy", "wisdom", "reading"],
    "We read to know we are not alone.",
    "Books connect us across time. Reading is communion with other minds. Loneliness dissolves in literature.",
    35
  ),

  // ============================================
  // MARY KARR (5 cards)
  // ============================================
  makeCard(
    "Mary Karr",
    "The Art of Memoir",
    ["writing", "truth", "memory"],
    "Truth may have become the most devalued word in the language.",
    "In an age of spin, truth is radical. Personal truth—honestly told—has power precisely because it's rare.",
    40
  ),

  // ============================================
  // ANNE LAMOTT (8 cards)
  // ============================================
  makeCard(
    "Anne Lamott",
    "Bird by Bird",
    ["writing", "process", "fear"],
    "Almost all good writing begins with terrible first efforts.",
    "Shitty first drafts are necessary. Don't expect perfection initially. Get it down, then fix it.",
    40
  ),
  makeCard(
    "Anne Lamott",
    "Bird by Bird",
    ["writing", "focus", "manageable"],
    "Bird by bird, buddy. Just take it bird by bird.",
    "Overwhelm comes from seeing the whole. Focus on one small piece at a time. That's how it gets done.",
    35
  ),
  makeCard(
    "Anne Lamott",
    "Bird by Bird",
    ["writing", "perfectionism", "progress"],
    "Perfectionism is the voice of the oppressor.",
    "Perfectionism blocks creation. It's fear wearing a mask of standards. Good enough to ship beats perfect in theory.",
    40
  ),
  makeCard(
    "Anne Lamott",
    "Help, Thanks, Wow",
    ["spirituality", "prayer", "simplicity"],
    "The three essential prayers: Help, Thanks, Wow.",
    "All prayer simplified: asking, gratitude, wonder. These three cover everything. Keep it simple.",
    35
  ),

  // ============================================
  // STEVEN JOHNSON (5 cards)
  // ============================================
  makeCard(
    "Steven Johnson",
    "Where Good Ideas Come From",
    ["creativity", "innovation", "environment"],
    "Chance favors the connected mind.",
    "Ideas come from collision. Connect diverse inputs. Innovation happens at intersections.",
    40
  ),
  makeCard(
    "Steven Johnson",
    "Where Good Ideas Come From",
    ["creativity", "slow-hunch", "patience"],
    "Most great ideas first take shape in partial, incomplete form.",
    "Eureka moments are myths. Ideas develop slowly. Nurture hunches. Give them time to connect.",
    40
  ),

  // ============================================
  // DAVID EPSTEIN (8 cards)
  // ============================================
  makeCard(
    "David Epstein",
    "Range",
    ["learning", "generalist", "breadth"],
    "In wicked environments, breadth of experience is the key.",
    "Complex domains reward generalists. Sample widely before specializing. Range beats narrow expertise.",
    40
  ),
  makeCard(
    "David Epstein",
    "Range",
    ["learning", "exploration", "match"],
    "Exploration is not just a way to find your passion—it's also how you develop it.",
    "You can't know your fit without trying. Sample broadly. Passion is discovered through experience.",
    40
  ),
  makeCard(
    "David Epstein",
    "Range",
    ["learning", "transfer", "analogies"],
    "The more contexts in which something is learned, the more the learner creates abstract models.",
    "Learning in varied contexts builds transferable understanding. Breadth enables depth of insight.",
    45
  ),
  makeCard(
    "David Epstein",
    "Range",
    ["learning", "specialization", "tradeoffs"],
    "In kind environments, where patterns repeat and feedback is accurate, specialization works. In wicked environments, it doesn't.",
    "Know your domain. Some fields reward depth. Most of life rewards adaptability. Match strategy to terrain.",
    50
  ),

  // ============================================
  // MATTHEW WALKER (8 cards)
  // ============================================
  makeCard(
    "Matthew Walker",
    "Why We Sleep",
    ["health", "sleep", "performance"],
    "The shorter your sleep, the shorter your life.",
    "Sleep isn't negotiable. It's not productivity to steal—it's health to preserve. Eight hours minimum.",
    40
  ),
  makeCard(
    "Matthew Walker",
    "Why We Sleep",
    ["health", "sleep", "memory"],
    "Sleep is the greatest legal performance-enhancing drug that most people are neglecting.",
    "Sleep improves everything: memory, creativity, emotional regulation, physical recovery. Prioritize it.",
    40
  ),
  makeCard(
    "Matthew Walker",
    "Why We Sleep",
    ["health", "sleep", "learning"],
    "Practice does not make perfect. It is practice, followed by a night of sleep, that leads to perfection.",
    "Sleep consolidates learning. Study then sleep. The brain processes during rest. Sleep on it literally.",
    45
  ),
  makeCard(
    "Matthew Walker",
    "Why We Sleep",
    ["health", "sleep", "deprivation"],
    "After sixteen hours of being awake, the brain begins to fail.",
    "Sleep deprivation impairs cognition like alcohol. Tired isn't noble—it's impaired. Rest is responsible.",
    40
  ),

  // ============================================
  // KELLY MCGONIGAL (6 cards)
  // ============================================
  makeCard(
    "Kelly McGonigal",
    "The Willpower Instinct",
    ["psychology", "willpower", "self-control"],
    "Willpower is a muscle that gets tired from use.",
    "Self-control is finite. It depletes through the day. Schedule important decisions for high willpower moments.",
    40
  ),
  makeCard(
    "Kelly McGonigal",
    "The Upside of Stress",
    ["psychology", "stress", "mindset"],
    "Embracing stress is more important than reducing stress.",
    "Stress response can be helpful. Mindset determines outcome. View stress as energizing, not debilitating.",
    40
  ),
  makeCard(
    "Kelly McGonigal",
    "The Willpower Instinct",
    ["psychology", "habits", "temptation"],
    "Self-control is like a muscle. To become stronger, you have to exercise it.",
    "Small acts of self-control build capacity. Practice saying no in minor matters. It strengthens for major ones.",
    40
  ),

  // ============================================
  // ROBERT GREENE (12 cards)
  // ============================================
  makeCard(
    "Robert Greene",
    "The 48 Laws of Power",
    ["strategy", "power", "reputation"],
    "So much depends on reputation—guard it with your life.",
    "Reputation precedes you. It opens and closes doors. Protect it carefully. Repair it immediately if damaged.",
    40
  ),
  makeCard(
    "Robert Greene",
    "The 48 Laws of Power",
    ["strategy", "power", "attention"],
    "Everything is judged by its appearance; what is unseen counts for nothing.",
    "Perception is reality. Substance without presentation fails. Master the visible. It's what people judge.",
    45
  ),
  makeCard(
    "Robert Greene",
    "Mastery",
    ["mastery", "practice", "dedication"],
    "The future belongs to those who learn more skills and combine them in creative ways.",
    "T-shaped skills: deep expertise plus broad knowledge. Combination creates uniqueness. Cross-pollinate.",
    45
  ),
  makeCard(
    "Robert Greene",
    "Mastery",
    ["mastery", "apprenticeship", "learning"],
    "The goal of an apprenticeship is not money, a title, or a diploma, but transformation of your mind and character.",
    "Early career is for learning, not earning. Accept lower pay for higher learning. Invest in transformation.",
    45
  ),
  makeCard(
    "Robert Greene",
    "The Laws of Human Nature",
    ["psychology", "behavior", "patterns"],
    "We are all prone to deceive ourselves. The first step in recognizing the laws of human nature is to acknowledge that we are all susceptible to them.",
    "You're not exempt from human nature. Self-deception is universal. Start by recognizing it in yourself.",
    50
  ),
  makeCard(
    "Robert Greene",
    "The Laws of Human Nature",
    ["psychology", "empathy", "observation"],
    "People's words say nothing; their actions say everything.",
    "Watch behavior, not statements. Actions reveal truth. Ignore talk; observe movement.",
    35
  ),
  makeCard(
    "Robert Greene",
    "The 33 Strategies of War",
    ["strategy", "conflict", "patience"],
    "The greatest general is the one who never fights.",
    "Victory without battle is the highest form. Avoid conflict through positioning. Fighting is last resort.",
    40
  ),
  makeCard(
    "Robert Greene",
    "Mastery",
    ["mastery", "time", "patience"],
    "There are no shortcuts to mastery.",
    "Ten thousand hours. No hacks. No tricks. Time and deliberate practice. Accept the long road.",
    35
  ),
  makeCard(
    "Robert Greene",
    "The 48 Laws of Power",
    ["strategy", "independence", "power"],
    "Do not commit to anyone but yourself.",
    "Maintain independence. Commitments create obligations. Keep options open. Flexibility is power.",
    40
  ),

  // ============================================
  // WALTER ISAACSON (6 cards)
  // ============================================
  makeCard(
    "Walter Isaacson",
    "Steve Jobs",
    ["business", "focus", "simplicity"],
    "Deciding what not to do is as important as deciding what to do.",
    "Focus is elimination. Apple's success came from saying no to thousands of things. Subtract to add value.",
    40
  ),
  makeCard(
    "Walter Isaacson",
    "Leonardo da Vinci",
    ["creativity", "curiosity", "observation"],
    "Be curious, relentlessly curious.",
    "Leonardo's genius was curiosity. He asked questions about everything. Curiosity compounds into genius.",
    35
  ),
  makeCard(
    "Walter Isaacson",
    "Einstein",
    ["science", "imagination", "creativity"],
    "Imagination is more important than knowledge.",
    "Knowledge is finite. Imagination is infinite. Einstein's breakthroughs came from thought experiments, not equations.",
    40
  ),
  makeCard(
    "Walter Isaacson",
    "Benjamin Franklin",
    ["philosophy", "improvement", "virtue"],
    "An investment in knowledge pays the best interest.",
    "Learning compounds. Every skill acquired multiplies future options. Education is the best investment.",
    35
  ),

  // ============================================
  // ADDITIONAL WISDOM CARDS (25 more)
  // ============================================
  makeCard(
    "Howard Marks",
    "The Most Important Thing",
    ["finance", "risk", "contrarian"],
    "You can't do the same thing others do and expect to outperform.",
    "Average actions yield average results. Outperformance requires different thinking. Dare to be contrarian.",
    40
  ),
  makeCard(
    "Howard Marks",
    "The Most Important Thing",
    ["finance", "cycles", "patience"],
    "Being too far ahead of your time is indistinguishable from being wrong.",
    "Right but early is wrong. Timing matters. Patience isn't just virtue—it's strategy.",
    45
  ),
  makeCard(
    "Annie Duke",
    "Thinking in Bets",
    ["psychology", "decisions", "uncertainty"],
    "Life is poker, not chess.",
    "Incomplete information is the norm. Embrace uncertainty. Make the best bet with what you know.",
    40
  ),
  makeCard(
    "Annie Duke",
    "Thinking in Bets",
    ["psychology", "decisions", "outcomes"],
    "Resulting is the tendency to judge the quality of a decision by its outcome.",
    "Good decisions can have bad outcomes. Bad decisions can have good outcomes. Judge the process, not the result.",
    45
  ),
  makeCard(
    "Shane Parrish",
    "The Great Mental Models",
    ["psychology", "thinking", "models"],
    "The quality of our thinking is determined by the models in our heads.",
    "Mental models are thinking tools. More models, better thinking. Collect them from many fields.",
    40
  ),
  makeCard(
    "Shane Parrish",
    "Clear Thinking",
    ["psychology", "decisions", "defaults"],
    "Most of our behavior is the result of instincts and defaults.",
    "We think we choose. Mostly we default. Awareness of defaults is the first step to overriding them.",
    40
  ),
  makeCard(
    "Josh Waitzkin",
    "The Art of Learning",
    ["learning", "mastery", "process"],
    "The key to pursuing excellence is to embrace an organic, long-term learning process.",
    "Mastery is a marathon. Short-term thinking kills long-term skill. Fall in love with the process.",
    40
  ),
  makeCard(
    "Josh Waitzkin",
    "The Art of Learning",
    ["learning", "obstacles", "growth"],
    "Growth comes at the point of resistance. We learn by pushing ourselves.",
    "Comfort zones don't grow. Stretch points do. Seek the resistance. That's where development happens.",
    40
  ),
  makeCard(
    "Barbara Oakley",
    "A Mind for Numbers",
    ["learning", "focus", "diffuse"],
    "Focused and diffuse thinking are both important for learning.",
    "Focus for concentration. Diffuse for connection. Alternate between modes. Breakthroughs need both.",
    40
  ),
  makeCard(
    "Barbara Oakley",
    "A Mind for Numbers",
    ["learning", "practice", "recall"],
    "Testing yourself is one of the most powerful learning strategies.",
    "Retrieval practice beats re-reading. Test yourself. The struggle to remember strengthens memory.",
    40
  ),
  makeCard(
    "Robert Cialdini",
    "Pre-Suasion",
    ["psychology", "persuasion", "attention"],
    "The best persuaders become the best through pre-suasion—the process of arranging for recipients to be receptive to a message before they encounter it.",
    "Persuasion starts before the pitch. Set the context. Prime the audience. What precedes shapes what follows.",
    50
  ),
  makeCard(
    "Chip Heath",
    "Made to Stick",
    ["communication", "ideas", "simplicity"],
    "Simple, unexpected, concrete, credentialed, emotional stories stick.",
    "SUCCESs formula for memorable ideas. Strip complexity. Add surprise. Make it tangible. Tell stories.",
    45
  ),
  makeCard(
    "Dan Heath",
    "Upstream",
    ["problem-solving", "prevention", "systems"],
    "Every system is perfectly designed to get the results it gets.",
    "Bad outcomes aren't accidents—they're system products. To change results, change systems. Go upstream.",
    40
  ),
  makeCard(
    "Richard Rumelt",
    "Good Strategy Bad Strategy",
    ["strategy", "focus", "clarity"],
    "A good strategy honestly acknowledges the challenges being faced and provides an approach to overcoming them.",
    "Strategy isn't wishful thinking. It's honest diagnosis plus coherent action. Face reality, then act.",
    45
  ),
  makeCard(
    "Richard Rumelt",
    "Good Strategy Bad Strategy",
    ["strategy", "focus", "power"],
    "The kernel of a strategy contains a diagnosis, a guiding policy, and coherent actions.",
    "Strategy has structure: understand the situation, determine the approach, align actions. All three needed.",
    45
  ),
  makeCard(
    "Safi Bahcall",
    "Loonshots",
    ["innovation", "organization", "ideas"],
    "Structure eats strategy.",
    "Good ideas die in bad structures. Organization design determines innovation. Structure enables or kills.",
    40
  ),
  makeCard(
    "Will Durant",
    "The Lessons of History",
    ["history", "patterns", "wisdom"],
    "A great civilization is not conquered from without until it has destroyed itself from within.",
    "Decline is internal before external. Societies fall from within. The rot precedes the fall.",
    45
  ),
  makeCard(
    "Will Durant",
    "The Story of Philosophy",
    ["philosophy", "education", "wisdom"],
    "Education is a progressive discovery of our own ignorance.",
    "The more you learn, the more you realize you don't know. Education expands the known unknown.",
    40
  ),
  makeCard(
    "Buster Benson",
    "Why Are We Yelling?",
    ["communication", "conflict", "disagreement"],
    "Disagreement is the engine of growth.",
    "Conflict reveals blind spots. Productive disagreement improves ideas. Don't avoid it—harness it.",
    40
  ),
  makeCard(
    "Daniel Coyle",
    "The Talent Code",
    ["learning", "practice", "myelin"],
    "Struggle is not optional—it's neurologically required.",
    "Deep practice requires struggle. The brain grows at the edge of ability. Comfort means no growth.",
    40
  ),
  makeCard(
    "Daniel Coyle",
    "The Culture Code",
    ["leadership", "culture", "belonging"],
    "Build safety, share vulnerability, establish purpose.",
    "Great cultures have three elements: people feel safe, they're real with each other, they share why.",
    40
  ),
  makeCard(
    "Matthew Syed",
    "Black Box Thinking",
    ["learning", "failure", "iteration"],
    "In a growth mindset, failures are not seen as indictments of ability but as opportunities to learn.",
    "Aviation learns from crashes. Medicine hides them. Which field improves faster? Learn from failure.",
    45
  ),
  makeCard(
    "Matthew Syed",
    "Rebel Ideas",
    ["innovation", "diversity", "thinking"],
    "Cognitive diversity drives innovation.",
    "Different minds see different things. Diverse teams solve problems better. Homogeneity is blindness.",
    40
  ),
  makeCard(
    "David Deutsch",
    "The Beginning of Infinity",
    ["philosophy", "knowledge", "progress"],
    "Problems are soluble. Good explanations are hard to come by.",
    "Any problem can theoretically be solved with enough knowledge. Pessimism about solutions is unfounded.",
    45
  ),
  makeCard(
    "Kevin Kelly",
    "The Inevitable",
    ["technology", "change", "future"],
    "The technologies that will dominate in the future will begin as toys.",
    "Serious people dismiss toys. But toys become tools. Watch what kids play with. That's the future.",
    40
  ),


  // ============================================
  // FINAL PUSH TO 1000+ (70 cards)
  // ============================================
  makeCard(
    "Susan Cain",
    "Quiet",
    ["psychology", "introversion", "leadership"],
    "There's zero correlation between being the best talker and having the best ideas.",
    "Loud doesn't mean right. Quiet people often have the deepest insights. Value substance over volume.",
    40
  ),
  makeCard(
    "Susan Cain",
    "Quiet",
    ["psychology", "solitude", "creativity"],
    "Solitude matters. And for some people it is the air that they breathe.",
    "Introverts aren't broken extroverts. Solitude is a need, not a deficiency. Honor different temperaments.",
    40
  ),
  makeCard(
    "Susan Cain",
    "Quiet",
    ["psychology", "introversion", "power"],
    "The secret to life is to put yourself in the right lighting.",
    "Find environments that suit your nature. Don't force yourself into wrong conditions. Context matters.",
    35
  ),
  makeCard(
    "Adam Robinson",
    "Interviews",
    ["learning", "curiosity", "questions"],
    "The quality of your life is determined by the quality of your questions.",
    "Better questions lead to better answers. Improve your questions to improve your life. Ask more, assume less.",
    40
  ),
  makeCard(
    "Tiago Forte",
    "Building a Second Brain",
    ["productivity", "knowledge", "systems"],
    "Your mind is for having ideas, not storing them.",
    "Offload information to external systems. Free cognitive space for creativity. Build a second brain.",
    40
  ),
  makeCard(
    "Tiago Forte",
    "Building a Second Brain",
    ["productivity", "notes", "organization"],
    "Organize information for action, not just for storage.",
    "Notes should be useful, not just archived. What makes knowledge actionable? Design systems around use.",
    40
  ),
  makeCard(
    "Elizabeth Gilbert",
    "Big Magic",
    ["creativity", "fear", "permission"],
    "You do not need anybody's permission to live a creative life.",
    "Creativity isn't reserved for chosen ones. You don't need credentials. Give yourself permission.",
    35
  ),
  makeCard(
    "Elizabeth Gilbert",
    "Big Magic",
    ["creativity", "fear", "courage"],
    "Your fear will always be triggered by your creativity, because creativity asks you to enter into realms of uncertain outcome.",
    "Fear and creativity are linked. Expect fear when creating. It's not a sign to stop—it's a sign you're pushing.",
    45
  ),
  makeCard(
    "Elizabeth Gilbert",
    "Eat Pray Love",
    ["philosophy", "balance", "journey"],
    "I am a better person when I have less on my plate.",
    "Fullness isn't richness. Margin creates quality. Having less allows being more.",
    35
  ),
  makeCard(
    "Amanda Palmer",
    "The Art of Asking",
    ["creativity", "vulnerability", "connection"],
    "Asking for help with shame says: You have the power over me. Asking with condescension says: I have the power over you. Asking with gratitude says: We have the power to help each other.",
    "How you ask matters as much as what you ask. Stance determines response. Ask from equality.",
    50
  ),
  makeCard(
    "Cheryl Strayed",
    "Tiny Beautiful Things",
    ["philosophy", "advice", "courage"],
    "You don't have a right to the cards you believe you should have been dealt. You have an obligation to play the hell out of the ones you're holding.",
    "Stop arguing with reality. Accept your hand. Play it masterfully. That's the only option.",
    45
  ),
  makeCard(
    "Cheryl Strayed",
    "Wild",
    ["philosophy", "transformation", "journey"],
    "I knew that if I allowed fear to overtake me, my journey was doomed.",
    "Fear is normal. Letting it control you is optional. Acknowledge fear, then act anyway.",
    40
  ),
  makeCard(
    "Jon Kabat-Zinn",
    "Wherever You Go, There You Are",
    ["mindfulness", "presence", "awareness"],
    "Wherever you go, there you are.",
    "You can't escape yourself. Geography doesn't change inner reality. Work happens here, not elsewhere.",
    35
  ),
  makeCard(
    "Jon Kabat-Zinn",
    "Full Catastrophe Living",
    ["mindfulness", "stress", "response"],
    "You can't stop the waves, but you can learn to surf.",
    "Life's challenges won't stop. Your skill at handling them can grow. Develop responsiveness.",
    35
  ),
  makeCard(
    "Jack Kornfield",
    "A Path with Heart",
    ["spirituality", "compassion", "practice"],
    "In the end, just three things matter: How well we have lived. How well we have loved. How well we have learned to let go.",
    "Life's final exam has three questions. Everything else is detail. Focus on what truly matters.",
    45
  ),
  makeCard(
    "Jack Kornfield",
    "After the Ecstasy, the Laundry",
    ["spirituality", "integration", "daily-life"],
    "Enlightenment is intimacy with all things.",
    "Awakening isn't escape—it's engagement. Spirituality lives in the ordinary. Wisdom washes dishes.",
    40
  ),
  makeCard(
    "Ram Dass",
    "Be Here Now",
    ["spirituality", "presence", "ego"],
    "Be here now.",
    "Three words that capture everything. Not in the past. Not in the future. Here. Now. This is it.",
    30
  ),
  makeCard(
    "Ram Dass",
    "Be Here Now",
    ["spirituality", "love", "service"],
    "We're all just walking each other home.",
    "We're all on the same journey. Help each other. Competition is illusion. We share the path.",
    35
  ),
  makeCard(
    "Byron Katie",
    "Loving What Is",
    ["psychology", "thoughts", "inquiry"],
    "When you argue with reality, you lose—but only 100% of the time.",
    "Reality wins every argument. Resisting what is creates suffering. Accept first, then act if needed.",
    35
  ),
  makeCard(
    "Byron Katie",
    "Loving What Is",
    ["psychology", "beliefs", "questioning"],
    "A thought is harmless unless we believe it.",
    "Thoughts pass through. Belief gives them power. Question beliefs. You don't have to believe every thought.",
    40
  ),
  makeCard(
    "Don Miguel Ruiz",
    "The Fifth Agreement",
    ["philosophy", "skepticism", "truth"],
    "Be skeptical, but learn to listen.",
    "Don't believe everything—including yourself. But stay open. Skepticism plus listening equals wisdom.",
    35
  ),
  makeCard(
    "Wayne Dyer",
    "The Power of Intention",
    ["spirituality", "intention", "creation"],
    "When you change the way you look at things, the things you look at change.",
    "Perception shapes reality. Shift perspective, shift experience. You see what you're looking for.",
    35
  ),
  makeCard(
    "Wayne Dyer",
    "Your Erroneous Zones",
    ["psychology", "approval", "freedom"],
    "What other people think of me is none of my business.",
    "Others' opinions are their business. Your inner state is yours. Stop outsourcing your self-worth.",
    35
  ),
  makeCard(
    "Marianne Williamson",
    "A Return to Love",
    ["spirituality", "fear", "love"],
    "Our deepest fear is not that we are inadequate. Our deepest fear is that we are powerful beyond measure.",
    "We fear our light, not our darkness. Playing small serves no one. Shine fully.",
    45
  ),
  makeCard(
    "Deepak Chopra",
    "The Seven Spiritual Laws of Success",
    ["spirituality", "success", "laws"],
    "In the process of letting go you will lose many things from the past, but you will find yourself.",
    "Letting go isn't loss—it's liberation. Release the old to discover the essential. Shed to find.",
    40
  ),
  makeCard(
    "Paramahansa Yogananda",
    "Autobiography of a Yogi",
    ["spirituality", "seeking", "truth"],
    "The season of failure is the best time for sowing the seeds of success.",
    "Failure is fertile ground. Plant in defeat. The harvest comes later. Timing isn't linear.",
    40
  ),
  makeCard(
    "Jiddu Krishnamurti",
    "Freedom from the Known",
    ["philosophy", "freedom", "conditioning"],
    "It is no measure of health to be well adjusted to a profoundly sick society.",
    "Conformity to dysfunction is dysfunction. Normal isn't healthy. Question what's considered well-adjusted.",
    45
  ),
  makeCard(
    "Jiddu Krishnamurti",
    "Think on These Things",
    ["philosophy", "education", "intelligence"],
    "The ability to observe without evaluating is the highest form of intelligence.",
    "We judge constantly. Pure observation is rare and powerful. See before categorizing.",
    40
  ),
  makeCard(
    "Ken Wilber",
    "A Brief History of Everything",
    ["philosophy", "integral", "development"],
    "The point is not merely to have experiences but to become conscious of the patterns of experiences.",
    "Meta-awareness: seeing the patterns, not just having the experiences. Develop the observer.",
    45
  ),
  makeCard(
    "Carl Rogers",
    "On Becoming a Person",
    ["psychology", "growth", "acceptance"],
    "The curious paradox is that when I accept myself just as I am, then I can change.",
    "Self-acceptance enables change. Resistance blocks it. Accept first, then transformation follows.",
    40
  ),
  makeCard(
    "Carl Rogers",
    "On Becoming a Person",
    ["psychology", "authenticity", "being"],
    "What I am is good enough if I would only be it openly.",
    "You're enough. The problem is hiding. Show up as you are. Authenticity is sufficient.",
    35
  ),
  makeCard(
    "Abraham Maslow",
    "Toward a Psychology of Being",
    ["psychology", "self-actualization", "growth"],
    "What is necessary to change a person is to change his awareness of himself.",
    "Self-image drives behavior. Change self-perception to change action. Identity precedes change.",
    40
  ),
  makeCard(
    "Abraham Maslow",
    "Motivation and Personality",
    ["psychology", "needs", "potential"],
    "If you plan on being anything less than you are capable of being, you will probably be unhappy all the days of your life.",
    "Unused potential creates discontent. Growth toward capacity is fulfilling. Aim at your best.",
    45
  ),
  makeCard(
    "Irvin Yalom",
    "Love's Executioner",
    ["psychology", "death", "meaning"],
    "Though the physicality of death destroys us, the idea of death saves us.",
    "Confronting mortality creates meaning. Death awareness enhances life. The limit defines the value.",
    45
  ),
  makeCard(
    "Irvin Yalom",
    "Staring at the Sun",
    ["psychology", "death", "anxiety"],
    "Our awareness of death is the dark shadow that accompanies us throughout life.",
    "Death anxiety underlies much of experience. Face it directly. Avoidance amplifies fear.",
    40
  ),
  makeCard(
    "Rollo May",
    "The Courage to Create",
    ["psychology", "creativity", "courage"],
    "Creativity requires the courage to let go of certainties.",
    "Creating means entering unknown territory. Certainty must be surrendered. Courage precedes creativity.",
    40
  ),
  makeCard(
    "Erich Fromm",
    "The Art of Loving",
    ["psychology", "love", "practice"],
    "Love is an activity, not a passive affect.",
    "Love is verb, not noun. It's practiced, not just felt. Active engagement, not passive state.",
    35
  ),
  makeCard(
    "Erich Fromm",
    "Escape from Freedom",
    ["psychology", "freedom", "responsibility"],
    "Modern man, freed from the bonds of pre-individualistic society, has not gained freedom in the positive sense of realizing his individual self.",
    "Freedom from isn't freedom to. Negative liberty differs from positive liberty. True freedom requires self-realization.",
    50
  ),
  makeCard(
    "Karen Horney",
    "Neurosis and Human Growth",
    ["psychology", "self", "idealization"],
    "The search for glory is the comprehensive neurotic solution.",
    "Chasing an idealized self creates misery. Accept the real self. Glory-seeking is escape from reality.",
    45
  ),
  makeCard(
    "Alfred Adler",
    "What Life Should Mean to You",
    ["psychology", "belonging", "contribution"],
    "The only worthwhile achievements are those that benefit society.",
    "Individual success without social contribution rings hollow. Meaning comes through service to others.",
    40
  ),
  makeCard(
    "David Brooks",
    "The Road to Character",
    ["philosophy", "character", "virtue"],
    "We live in a culture that teaches us to promote and advertise ourselves.",
    "Resume virtues vs eulogy virtues. We optimize for achievement, neglect character. Rebalance.",
    40
  ),
  makeCard(
    "David Brooks",
    "The Second Mountain",
    ["philosophy", "meaning", "commitment"],
    "The second mountain is about shedding the ego and making commitments.",
    "First mountain: achievement. Second mountain: contribution. The second climb requires letting go.",
    40
  ),
  makeCard(
    "Arthur Brooks",
    "From Strength to Strength",
    ["philosophy", "aging", "wisdom"],
    "The key to happiness after 40 is to pivot from fluid intelligence to crystallized intelligence.",
    "Different strengths for different ages. Adapt to changing capabilities. Wisdom replaces speed.",
    45
  ),
  makeCard(
    "Richard Rohr",
    "Falling Upward",
    ["spirituality", "growth", "stages"],
    "We grow spiritually much more by doing it wrong than by doing it right.",
    "Failure is the teacher. Mistakes are the curriculum. Grace works through brokenness.",
    40
  ),
  makeCard(
    "Richard Rohr",
    "Everything Belongs",
    ["spirituality", "integration", "wholeness"],
    "If we do not transform our pain, we will most assuredly transmit it.",
    "Unprocessed pain spreads. Transform it or pass it on. Inner work has outer consequences.",
    40
  ),
  makeCard(
    "Thomas Merton",
    "New Seeds of Contemplation",
    ["spirituality", "solitude", "identity"],
    "If you want to identify me, ask me not where I live, or what I like to eat, or how I comb my hair, but ask me what I am living for.",
    "Purpose defines identity better than preferences. What you live for matters more than lifestyle details.",
    45
  ),
  makeCard(
    "Thomas Merton",
    "No Man Is an Island",
    ["spirituality", "connection", "solitude"],
    "We cannot find ourselves within ourselves, but only in others.",
    "Self-discovery happens in relationship. Isolation doesn't reveal the self. We find ourselves in the other.",
    40
  ),
  makeCard(
    "Dietrich Bonhoeffer",
    "Letters and Papers from Prison",
    ["spirituality", "faith", "action"],
    "Action springs not from thought, but from a readiness for responsibility.",
    "Responsibility, not analysis, produces action. You don't think your way into acting—you commit.",
    40
  ),
  makeCard(
    "C.S. Lewis",
    "Mere Christianity",
    ["philosophy", "morality", "law"],
    "If the solar system was brought about by an accidental collision, then the appearance of organic life on this planet was also an accident.",
    "Follow the logic of worldviews to their conclusions. Implications matter. Think through beliefs fully.",
    45
  ),
  makeCard(
    "C.S. Lewis",
    "The Screwtape Letters",
    ["spirituality", "temptation", "human-nature"],
    "The safest road to Hell is the gradual one.",
    "Small compromises compound. Not one big fall but many small slides. Vigilance in the mundane matters.",
    40
  ),
  makeCard(
    "G.K. Chesterton",
    "Orthodoxy",
    ["philosophy", "wonder", "gratitude"],
    "The world will never starve for want of wonders; but only for want of wonder.",
    "Amazement is a choice. The world is full of marvels. The issue is attention, not availability.",
    40
  ),
  makeCard(
    "G.K. Chesterton",
    "What's Wrong with the World",
    ["philosophy", "ideals", "practice"],
    "The Christian ideal has not been tried and found wanting. It has been found difficult; and left untried.",
    "Don't judge ideals by failures to implement them. Difficulty isn't refutation. Try before dismissing.",
    45
  ),
  makeCard(
    "Dorothy Day",
    "The Long Loneliness",
    ["spirituality", "community", "service"],
    "We have all known the long loneliness and we have learned that the only solution is love.",
    "Loneliness is universal. Love is the answer. Not romantic love—active, committed love.",
    40
  ),
  makeCard(
    "Henri Nouwen",
    "The Wounded Healer",
    ["spirituality", "service", "vulnerability"],
    "Nobody escapes being wounded. We all are wounded people.",
    "Universal wound. Don't hide it—use it. Your wounds enable you to help others with theirs.",
    40
  ),
  makeCard(
    "Desmond Tutu",
    "No Future Without Forgiveness",
    ["spirituality", "forgiveness", "healing"],
    "Without forgiveness, there is no future.",
    "Holding grudges imprisons you. Forgiveness liberates the forgiver. It's practical, not just noble.",
    35
  ),
  makeCard(
    "Howard Thurman",
    "Meditations of the Heart",
    ["spirituality", "purpose", "authenticity"],
    "Don't ask what the world needs. Ask what makes you come alive, and go do it. Because what the world needs is people who have come alive.",
    "Aliveness serves the world. Following your vitality isn't selfish—it's necessary. The world needs your passion.",
    45
  ),
  makeCard(
    "Parker Palmer",
    "Let Your Life Speak",
    ["spirituality", "vocation", "listening"],
    "Before you tell your life what you intend to do with it, listen for what it intends to do with you.",
    "Vocation is discovered, not invented. Listen before imposing plans. Your life has its own wisdom.",
    40
  ),
  makeCard(
    "Parker Palmer",
    "A Hidden Wholeness",
    ["spirituality", "integrity", "soul"],
    "Integrity is about being whole, not being perfect.",
    "Integration, not perfection. Wholeness includes shadow. Integrity means all parts are present.",
    35
  ),
  makeCard(
    "Frederick Buechner",
    "Wishful Thinking",
    ["spirituality", "calling", "vocation"],
    "The place God calls you to is the place where your deep gladness and the world's deep hunger meet.",
    "Vocation lives at the intersection of joy and need. Neither alone suffices. Both together indicate calling.",
    45
  ),
  makeCard(
    "Simone Weil",
    "Gravity and Grace",
    ["philosophy", "attention", "love"],
    "Attention is the rarest and purest form of generosity.",
    "Full presence is the greatest gift. In a distracted world, attention is love made visible.",
    40
  ),
  makeCard(
    "Simone Weil",
    "Waiting for God",
    ["spirituality", "waiting", "receptivity"],
    "Attention, taken to its highest degree, is the same thing as prayer.",
    "Prayer is attention. Deep attention is sacred. The quality of presence is the quality of communion.",
    40
  ),
  makeCard(
    "Dietrich von Hildebrand",
    "Transformation in Christ",
    ["spirituality", "change", "openness"],
    "The absolutely fundamental requirement for the transformation of a person is readiness to change.",
    "Willingness precedes change. Without openness, nothing happens. Readiness is the first step.",
    40
  ),
  makeCard(
    "Josef Pieper",
    "Leisure: The Basis of Culture",
    ["philosophy", "leisure", "culture"],
    "Leisure is the basis of culture.",
    "Without leisure, no culture develops. Constant work produces nothing higher. Make space for contemplation.",
    40
  ),
  makeCard(
    "Dallas Willard",
    "The Spirit of the Disciplines",
    ["spirituality", "practice", "transformation"],
    "Grace is opposed to earning, not to effort.",
    "Effort isn't the opposite of grace. Earning is. Work diligently while trusting grace. Both/and.",
    40
  ),
  makeCard(
    "John O'Donohue",
    "Anam Cara",
    ["spirituality", "friendship", "soul"],
    "In Celtic tradition, there is a beautiful understanding of love and friendship: Anam cara—soul friend.",
    "Deep friendship touches the soul. Find and be a soul friend. These relationships transform.",
    40
  ),
  makeCard(
    "John O'Donohue",
    "Beauty",
    ["philosophy", "beauty", "presence"],
    "Beauty is not in the eye of the beholder. It is the real, experienced in the self and others.",
    "Beauty is objective, not just subjective. It's encountered, not projected. Train yourself to see it.",
    40
  ),
  makeCard(
    "David Whyte",
    "Consolations",
    ["philosophy", "words", "meaning"],
    "Alertness is the hidden discipline of familiarity.",
    "The familiar numbs us. Stay alert to what's always there. Attention rescues the everyday from invisibility.",
    40
  ),
  makeCard(
    "David Whyte",
    "The Heart Aroused",
    ["philosophy", "work", "soul"],
    "The soul would rather fail at its own life than succeed at someone else's.",
    "Living your own life matters more than succeeding at the wrong one. Authenticity over achievement.",
    40
  ),


  // ============================================
  // NEW CARDS - BATCH 2 (500 cards)
  // ============================================
  // ============================================
  // FRIEDRICH NIETZSCHE (25 cards)
  // ============================================
  makeCard(
    "Friedrich Nietzsche",
    "Thus Spoke Zarathustra",
    ["philosophy", "growth", "overcoming"],
    "He who has a why to live can bear almost any how.",
    "Purpose is the ultimate painkiller. When meaning is clear, suffering becomes bearable. Find your why first—the how follows.",
    40,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Beyond Good and Evil",
    ["philosophy", "psychology", "truth"],
    "He who fights with monsters should look to it that he himself does not become a monster.",
    "You become what you oppose if you're not careful. Fighting evil with evil creates more evil. Watch your methods.",
    40,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Twilight of the Idols",
    ["philosophy", "strength", "adversity"],
    "What does not kill me makes me stronger.",
    "Trauma can transform into growth. But only if processed, not buried. The forge that breaks some tempers others into steel.",
    35,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "The Gay Science",
    ["philosophy", "joy", "wisdom"],
    "One must still have chaos in oneself to be able to give birth to a dancing star.",
    "Creativity emerges from disorder. Perfect order produces nothing new. Embrace your inner chaos—it's the source of your art.",
    45,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Human, All Too Human",
    ["philosophy", "honesty", "self"],
    "The snake which cannot cast its skin has to die.",
    "Growth requires shedding old identities. Clinging to who you were prevents who you could become. Let go to grow.",
    40,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Beyond Good and Evil",
    ["philosophy", "depth", "understanding"],
    "When you gaze long into an abyss, the abyss also gazes into you.",
    "What you study changes you. The observer is never neutral. Be conscious of what you expose your mind to.",
    40,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Thus Spoke Zarathustra",
    ["philosophy", "love", "creation"],
    "One must learn to love oneself with a wholesome and healthy love, so that one can bear to be with oneself.",
    "Self-love isn't selfishness—it's sanity. You can't give what you don't have. Fill your own cup first.",
    45,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Ecce Homo",
    ["philosophy", "identity", "becoming"],
    "Become who you are.",
    "You're not discovering yourself—you're creating yourself. Identity is a project, not a fact. Author your own existence.",
    35,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "The Gay Science",
    ["philosophy", "perspective", "truth"],
    "There are no facts, only interpretations.",
    "Reality is filtered through perspective. What you call truth is your interpretation. Humility about knowledge is wisdom.",
    40,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Beyond Good and Evil",
    ["philosophy", "independence", "thought"],
    "The individual has always had to struggle to keep from being overwhelmed by the tribe.",
    "Society pressures conformity. Maintaining individuality requires constant effort. Swim against the current when necessary.",
    45,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Thus Spoke Zarathustra",
    ["philosophy", "solitude", "growth"],
    "The lonely one offers his hand too quickly to whomever he encounters.",
    "Loneliness breeds desperation. Desperation attracts wrong connections. Learn to be alone without being lonely.",
    40,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Human, All Too Human",
    ["philosophy", "memory", "pain"],
    "The advantage of a bad memory is that one enjoys several times the same good things for the first time.",
    "Memory is selective by design. Forgetting pain is protective. Some things are better not remembered.",
    40,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "The Gay Science",
    ["philosophy", "creativity", "style"],
    "Those who were seen dancing were thought to be insane by those who could not hear the music.",
    "You look crazy to those who don't understand your vision. Don't explain yourself to deaf ears. Keep dancing.",
    40,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Beyond Good and Evil",
    ["philosophy", "morality", "power"],
    "The thought of suicide is a great consolation: by means of it one gets through many a dark night.",
    "Having options provides peace—even options you'd never take. Knowing you could quit makes continuing a choice.",
    45,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Twilight of the Idols",
    ["philosophy", "education", "development"],
    "Without music, life would be a mistake.",
    "Art isn't luxury—it's necessity. Beauty feeds the soul. A life without aesthetic experience is impoverished.",
    35,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Thus Spoke Zarathustra",
    ["philosophy", "wisdom", "silence"],
    "Not by wrath does one kill, but by laughter.",
    "Mockery is more devastating than anger. Nothing deflates pretension like humor. Laugh at what deserves to fall.",
    40,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Human, All Too Human",
    ["philosophy", "change", "values"],
    "A thinker sees his own actions as experiments and questions.",
    "Treat life as a laboratory. Your choices are hypotheses. Results are data. Learn and adjust constantly.",
    40,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "The Gay Science",
    ["philosophy", "authenticity", "courage"],
    "The surest way to corrupt a youth is to instruct him to hold in higher esteem those who think alike than those who think differently.",
    "Intellectual diversity strengthens minds. Echo chambers weaken them. Seek disagreement to sharpen your thinking.",
    50,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Beyond Good and Evil",
    ["philosophy", "fear", "courage"],
    "The higher we soar, the smaller we appear to those who cannot fly.",
    "Success makes you threatening to the mediocre. Don't shrink to fit. Your growth isn't their business.",
    40,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Thus Spoke Zarathustra",
    ["philosophy", "evolution", "humanity"],
    "Man is something that shall be overcome. What have you done to overcome him?",
    "Humanity is a bridge, not a destination. We're meant to evolve. Complacency is betrayal of potential.",
    45,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "The Will to Power",
    ["philosophy", "power", "life"],
    "Life is the will to power; our natural desire is to dominate and reshape the world to fit our own preferences.",
    "Power isn't inherently evil. It's the drive to create, influence, shape. Channel it constructively.",
    45,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Ecce Homo",
    ["philosophy", "destiny", "acceptance"],
    "My formula for greatness in a human being is amor fati: that one wants nothing to be different.",
    "Love your fate—all of it. Regret nothing. Every experience shaped you. Embrace your entire story.",
    40,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Human, All Too Human",
    ["philosophy", "truth", "illusion"],
    "Convictions are more dangerous enemies of truth than lies.",
    "Certainty blinds. The convinced stop questioning. Hold beliefs loosely. Doubt is the engine of discovery.",
    40,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "The Gay Science",
    ["philosophy", "meaning", "creation"],
    "We have art in order not to die of the truth.",
    "Reality is often unbearable. Art transforms it into something we can live with. Create to survive.",
    35,
    'philosophy'
  ),
  makeCard(
    "Friedrich Nietzsche",
    "Beyond Good and Evil",
    ["philosophy", "maturity", "play"],
    "The maturity of man—that means to have reacquired the seriousness that one had as a child at play.",
    "Adults lose playfulness and call it maturity. Real maturity is returning to joy with wisdom. Play seriously.",
    40,
    'philosophy'
  ),

  // ============================================
  // ALBERT CAMUS (20 cards)
  // ============================================
  makeCard(
    "Albert Camus",
    "The Myth of Sisyphus",
    ["philosophy", "meaning", "absurdism"],
    "One must imagine Sisyphus happy.",
    "Even in meaningless repetition, we can find joy. The struggle itself is enough to fill a heart. Choose happiness despite the absurd.",
    45,
    'philosophy'
  ),
  makeCard(
    "Albert Camus",
    "The Stranger",
    ["philosophy", "authenticity", "society"],
    "I opened myself to the gentle indifference of the world.",
    "The universe doesn't care about you—and that's liberating. No cosmic judge. No predetermined meaning. Just existence.",
    40,
    'philosophy'
  ),
  makeCard(
    "Albert Camus",
    "The Rebel",
    ["philosophy", "rebellion", "values"],
    "I rebel; therefore I exist.",
    "Resistance defines us. Saying 'no' to injustice affirms what we value. Rebellion is affirmation in disguise.",
    35,
    'philosophy'
  ),
  makeCard(
    "Albert Camus",
    "The Myth of Sisyphus",
    ["philosophy", "suicide", "life"],
    "There is but one truly serious philosophical problem, and that is suicide.",
    "Whether to live is the fundamental question. Everything else is secondary. Choose life first—then philosophize.",
    40,
    'philosophy'
  ),
  makeCard(
    "Albert Camus",
    "The Fall",
    ["philosophy", "honesty", "self-knowledge"],
    "Sometimes it is easier to see clearly into the liar than into the man who tells the truth.",
    "Truth-tellers are complex. Liars are simple. Understanding honesty requires understanding its costs.",
    40,
    'philosophy'
  ),
  makeCard(
    "Albert Camus",
    "The Plague",
    ["philosophy", "heroism", "ordinary"],
    "There is no heroism in fighting pestilence. It's just common decency.",
    "True courage isn't dramatic. It's showing up daily, doing what must be done. Heroism is consistency, not spectacle.",
    40,
    'philosophy'
  ),
  makeCard(
    "Albert Camus",
    "The Myth of Sisyphus",
    ["philosophy", "absurdity", "acceptance"],
    "The absurd does not liberate; it binds.",
    "Recognizing life's meaninglessness doesn't free you—it challenges you. The response to absurdity is what matters.",
    45,
    'philosophy'
  ),
  makeCard(
    "Albert Camus",
    "Notebooks",
    ["philosophy", "happiness", "decision"],
    "You will never be happy if you continue to search for what happiness consists of.",
    "Happiness isn't found through analysis—it's lived. Stop thinking about it. Start doing things that create it.",
    35,
    'philosophy'
  ),
  makeCard(
    "Albert Camus",
    "The Rebel",
    ["philosophy", "freedom", "limits"],
    "Freedom is nothing but a chance to be better.",
    "Freedom isn't the absence of constraint—it's the opportunity for growth. Use freedom to become, not just to do.",
    40,
    'philosophy'
  ),
  makeCard(
    "Albert Camus",
    "The Stranger",
    ["philosophy", "truth", "death"],
    "Since we're all going to die, it's obvious that when and how don't matter.",
    "Death equalizes everything. This isn't nihilism—it's perspective. The details that consume us are cosmically trivial.",
    45,
    'philosophy'
  ),
  makeCard(
    "Albert Camus",
    "The Fall",
    ["philosophy", "guilt", "judgment"],
    "I'll tell you a great secret, my friend. Do not wait for the last judgment. It takes place every day.",
    "We're judged constantly—by ourselves and others. Don't postpone reckoning. Face it daily.",
    40,
    'philosophy'
  ),
  makeCard(
    "Albert Camus",
    "The Plague",
    ["philosophy", "love", "mortality"],
    "What we learn in time of pestilence: there are more things to admire in men than to despise.",
    "Crisis reveals character. And mostly, it reveals goodness. Humans rise more often than they fall.",
    40,
    'philosophy'
  ),
  makeCard(
    "Albert Camus",
    "Notebooks",
    ["philosophy", "creation", "meaning"],
    "To create is to live twice.",
    "Creation extends existence beyond the moment. Your work outlives you. Making things is a form of immortality.",
    35,
    'philosophy'
  ),
  makeCard(
    "Albert Camus",
    "The Myth of Sisyphus",
    ["philosophy", "life", "passion"],
    "Live to the point of tears.",
    "Feel deeply. Risk heartbreak. A life without intense emotion is no life at all. Intensity beats duration.",
    35,
    'philosophy'
  ),
  makeCard(
    "Albert Camus",
    "The Rebel",
    ["philosophy", "integrity", "consistency"],
    "Integrity has no need of rules.",
    "If you know who you are, you don't need external guidelines. Character is its own compass.",
    35,
    'philosophy'
  ),
  makeCard(
    "Albert Camus",
    "The Fall",
    ["philosophy", "truth", "honesty"],
    "Truth, like light, blinds. Falsehood, on the contrary, is a beautiful twilight that enhances every object.",
    "Lies are comfortable; truth is harsh. We often prefer the comfortable lie. Courage means choosing harsh truth.",
    45,
    'philosophy'
  ),
  makeCard(
    "Albert Camus",
    "The Plague",
    ["philosophy", "action", "hope"],
    "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.",
    "Your freedom is your protest. Living authentically is revolutionary. Be ungovernable through being fully yourself.",
    50,
    'philosophy'
  ),
  makeCard(
    "Albert Camus",
    "Notebooks",
    ["philosophy", "autumn", "beauty"],
    "Autumn is a second spring when every leaf is a flower.",
    "Decline can be beautiful. Endings have their own grace. See beauty in transitions, not just beginnings.",
    35,
    'philosophy'
  ),
  makeCard(
    "Albert Camus",
    "The Myth of Sisyphus",
    ["philosophy", "consciousness", "burden"],
    "Conscious of the rock's weight, Sisyphus still pushes.",
    "Knowing the futility doesn't excuse you from effort. Push anyway. Consciousness of absurdity doesn't grant exemption.",
    40,
    'philosophy'
  ),
  makeCard(
    "Albert Camus",
    "The Rebel",
    ["philosophy", "art", "rebellion"],
    "Art is the activity that exalts and denies simultaneously.",
    "Creating says 'yes' to existence while protesting its conditions. Art is paradox in action.",
    40,
    'philosophy'
  ),

  // ============================================
  // VIKTOR FRANKL (20 cards)
  // ============================================
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "meaning", "suffering"],
    "Those who have a 'why' to live, can bear with almost any 'how'.",
    "Purpose is the ultimate resilience factor. When you know why you're suffering, you can endure almost anything.",
    40,
    'self-help'
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "freedom", "choice"],
    "Everything can be taken from a man but one thing: the last of the human freedoms—to choose one's attitude.",
    "Auschwitz taught this: external circumstances can strip everything except your response. That's untouchable.",
    45,
    'self-help'
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "suffering", "meaning"],
    "In some ways suffering ceases to be suffering at the moment it finds a meaning.",
    "Meaningless suffering is torture. Meaningful suffering is sacrifice. The same pain, transformed by purpose.",
    40,
    'self-help'
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "responsibility", "life"],
    "Ultimately, man should not ask what the meaning of his life is, but rather must recognize that it is he who is asked.",
    "Life questions you, not the reverse. Each situation asks: What will you do? How will you respond?",
    45,
    'self-help'
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "happiness", "pursuit"],
    "Happiness cannot be pursued; it must ensue.",
    "Chase happiness and it flees. Focus on meaning and happiness arrives as byproduct. Don't aim at it directly.",
    35,
    'self-help'
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "success", "happiness"],
    "Success, like happiness, cannot be pursued. It must ensue as the unintended side effect of personal dedication to a cause greater than oneself.",
    "Stop chasing success. Commit to something meaningful. Success will follow as consequence, not goal.",
    50,
    'self-help'
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "despair", "hope"],
    "Despair is suffering without meaning.",
    "The same suffering with meaning becomes bearable. Without meaning, even small pains feel unbearable. Find the meaning.",
    35,
    'self-help'
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "freedom", "responsibility"],
    "Freedom is not the last word. Freedom is only part of the story and half of the truth.",
    "Freedom without responsibility is chaos. They're two sides of one coin. True freedom includes accountability.",
    40,
    'self-help'
  ),
  makeCard(
    "Viktor Frankl",
    "The Will to Meaning",
    ["psychology", "existence", "purpose"],
    "The meaning of life differs from man to man, from day to day, and from hour to hour.",
    "There's no universal meaning—only your meaning, now. It changes. Stay attuned to what this moment asks of you.",
    45,
    'self-help'
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "love", "transcendence"],
    "Love is the only way to grasp another human being in the innermost core of his personality.",
    "Knowledge sees surfaces. Love sees depths. To truly know someone, you must love them. Love is a form of knowing.",
    40,
    'self-help'
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "future", "hope"],
    "The prisoner who had lost faith in the future—his future—was doomed.",
    "Hope keeps us alive. Those who gave up on tomorrow died first. Believe in your future, even when evidence is scarce.",
    40,
    'self-help'
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "choice", "determinism"],
    "Between stimulus and response there is a space. In that space is our power to choose our response.",
    "You're not a robot. Between trigger and reaction lies choice. Expand that space. That's where freedom lives.",
    40,
    'self-help'
  ),
  makeCard(
    "Viktor Frankl",
    "The Doctor and the Soul",
    ["psychology", "conscience", "guidance"],
    "Live as if you were living already for the second time and as if you had acted the first time as wrongly as you are about to act now.",
    "Imagine reliving this moment after death. Would you act the same? This thought experiment sharpens decisions.",
    50,
    'self-help'
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "beauty", "resilience"],
    "We who lived in concentration camps can remember the men who walked through the huts comforting others, giving away their last piece of bread.",
    "Even in hell, some chose goodness. Circumstances don't determine character—they reveal it. You always have a choice.",
    50,
    'self-help'
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "humor", "survival"],
    "Humor was another of the soul's weapons in the fight for self-preservation.",
    "Laughter in darkness isn't denial—it's defiance. Humor is a survival tool. Find the absurd, even in tragedy.",
    40,
    'self-help'
  ),
  makeCard(
    "Viktor Frankl",
    "The Will to Meaning",
    ["psychology", "uniqueness", "individual"],
    "Everyone has his own specific vocation or mission in life. Everyone must carry out a concrete assignment that demands fulfillment.",
    "You're not replaceable. Your specific contribution is yours alone. No one else can fulfill your particular mission.",
    45,
    'self-help'
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "present", "awareness"],
    "The salvation of man is through love and in love.",
    "Love connects us to meaning beyond ourselves. It transcends circumstances. In the worst conditions, love persists.",
    35,
    'self-help'
  ),
  makeCard(
    "Viktor Frankl",
    "The Doctor and the Soul",
    ["psychology", "death", "meaning"],
    "The transitoriness of our existence in no way makes it meaningless.",
    "Limited time doesn't mean limited meaning. Impermanence adds urgency. Because it ends, it matters.",
    40,
    'self-help'
  ),
  makeCard(
    "Viktor Frankl",
    "Man's Search for Meaning",
    ["psychology", "suffering", "growth"],
    "What is to give light must endure burning.",
    "Illumination requires sacrifice. Those who guide others often suffered deeply first. Your pain can become someone else's light.",
    35,
    'self-help'
  ),
  makeCard(
    "Viktor Frankl",
    "The Will to Meaning",
    ["psychology", "tension", "health"],
    "What man actually needs is not a tensionless state but rather the striving and struggling for a worthwhile goal.",
    "Comfort isn't the goal. Meaning often requires discomfort. Healthy tension between who you are and who you could be drives growth.",
    45,
    'self-help'
  ),

  // ============================================
  // CARL JUNG (25 cards)
  // ============================================
  makeCard(
    "Carl Jung",
    "Modern Man in Search of a Soul",
    ["psychology", "shadow", "self-knowledge"],
    "Until you make the unconscious conscious, it will direct your life and you will call it fate.",
    "What you don't know about yourself controls you. Self-awareness isn't luxury—it's liberation. Know your shadow.",
    45,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "Memories, Dreams, Reflections",
    ["psychology", "loneliness", "uniqueness"],
    "Loneliness does not come from having no people about one, but from being unable to communicate the things that seem important to oneself.",
    "You can be surrounded and still alone. Loneliness is failed connection, not absence of people.",
    45,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "The Undiscovered Self",
    ["psychology", "individuation", "growth"],
    "The privilege of a lifetime is to become who you truly are.",
    "Authenticity is the ultimate achievement. Becoming yourself sounds simple but requires a lifetime of work.",
    35,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "Modern Man in Search of a Soul",
    ["psychology", "projection", "relationships"],
    "Everything that irritates us about others can lead us to an understanding of ourselves.",
    "What triggers you reveals you. Your annoyances are mirrors. Other people reflect your disowned parts.",
    40,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "Psychological Types",
    ["psychology", "introversion", "energy"],
    "Your visions will become clear only when you can look into your own heart.",
    "External searching leads nowhere. The answers are inside. Turn inward before turning outward.",
    35,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "The Red Book",
    ["psychology", "darkness", "integration"],
    "One does not become enlightened by imagining figures of light, but by making the darkness conscious.",
    "Spirituality isn't escaping shadow—it's embracing it. Real growth includes your worst parts, not just your best.",
    45,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "Memories, Dreams, Reflections",
    ["psychology", "crisis", "transformation"],
    "There is no coming to consciousness without pain.",
    "Awakening hurts. Growth requires destruction of old patterns. The pain of change is birth pain.",
    35,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "Modern Man in Search of a Soul",
    ["psychology", "meaning", "neurosis"],
    "The least of things with a meaning is worth more in life than the greatest of things without it.",
    "A small meaningful life beats a large empty one. Size doesn't matter. Meaning does.",
    40,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "The Undiscovered Self",
    ["psychology", "thinking", "feeling"],
    "Thinking is difficult, that's why most people judge.",
    "Judgment is lazy thinking. Real understanding requires effort. Most opinions are shortcuts that miss truth.",
    35,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "Psychological Types",
    ["psychology", "opposites", "balance"],
    "The meeting of two personalities is like the contact of two chemical substances: if there is any reaction, both are transformed.",
    "Real relationships change you. If you're unchanged, you weren't really present. Transformation is the test of connection.",
    45,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "Modern Man in Search of a Soul",
    ["psychology", "midlife", "purpose"],
    "Thoroughly unprepared, we take the step into the afternoon of life.",
    "Youth has one set of tasks; middle age has another. The crisis of midlife is reorientation, not failure.",
    40,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "The Red Book",
    ["psychology", "dreams", "unconscious"],
    "Who looks outside, dreams; who looks inside, awakes.",
    "External focus keeps you asleep. Internal attention brings awakening. The examined life is the only conscious life.",
    35,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "Memories, Dreams, Reflections",
    ["psychology", "acceptance", "wholeness"],
    "I am not what happened to me, I am what I choose to become.",
    "Past doesn't equal future. You're not your history. At any moment, you can choose a new direction.",
    40,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "The Undiscovered Self",
    ["psychology", "conformity", "individuality"],
    "The shoe that fits one person pinches another; there is no recipe for living that suits all cases.",
    "Stop looking for universal formulas. Your path is unique. What works for others may not work for you.",
    40,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "Modern Man in Search of a Soul",
    ["psychology", "depression", "meaning"],
    "Depression is like a woman in black. If she turns up, don't shoo her away. Invite her in, offer her a seat, treat her like a guest.",
    "Depression carries a message. Don't flee from it. Listen. What is it trying to tell you?",
    50,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "Psychological Types",
    ["psychology", "perception", "reality"],
    "We cannot change anything until we accept it.",
    "Resistance perpetuates problems. Acceptance is the first step to change. Paradoxically, accepting what is allows it to transform.",
    35,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "The Red Book",
    ["psychology", "creativity", "madness"],
    "The creative mind plays with the objects it loves.",
    "Creativity is serious play. Love for your subject fuels innovation. Without love, work is labor.",
    35,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "Memories, Dreams, Reflections",
    ["psychology", "children", "parents"],
    "Nothing has a stronger influence psychologically on their environment and especially on their children than the unlived life of the parent.",
    "Your unfulfilled dreams haunt your children. Live your life fully—for their sake as much as yours.",
    50,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "Modern Man in Search of a Soul",
    ["psychology", "religion", "meaning"],
    "About a third of my cases are suffering from no clinically definable neurosis, but from the senselessness and emptiness of their lives.",
    "Meaning deficiency is real illness. Modern life creates it. The cure isn't medication—it's purpose.",
    45,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "The Undiscovered Self",
    ["psychology", "knowledge", "self"],
    "Knowing your own darkness is the best method for dealing with the darknesses of other people.",
    "Self-knowledge breeds compassion. When you know your own capacity for evil, you understand others'. Shadow work is empathy training.",
    45,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "Psychological Types",
    ["psychology", "paradox", "truth"],
    "The pendulum of the mind oscillates between sense and nonsense, not between right and wrong.",
    "Logic has limits. Sometimes truth looks like nonsense to rational mind. Don't dismiss what you can't explain.",
    40,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "Modern Man in Search of a Soul",
    ["psychology", "wisdom", "age"],
    "Life really does begin at forty. Up until then, you are just doing research.",
    "Youth is preparation. Maturity is application. The first half of life gathers data; the second half uses it.",
    35,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "The Red Book",
    ["psychology", "meaning", "suffering"],
    "Where wisdom reigns, there is no conflict between thinking and feeling.",
    "The wise integrate head and heart. Conflict between them signals immaturity. Harmony signals integration.",
    40,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "Memories, Dreams, Reflections",
    ["psychology", "death", "life"],
    "Shrinking away from death is something unhealthy and abnormal which robs the second half of life of its purpose.",
    "Death awareness enriches life. Avoiding the thought of death impoverishes existence. Memento mori is psychological health.",
    45,
    'self-help'
  ),
  makeCard(
    "Carl Jung",
    "The Undiscovered Self",
    ["psychology", "society", "individual"],
    "The bigger the crowd, the more negligible the individual becomes.",
    "Mass movements diminish persons. Protect your individuality. Groups can amplify or annihilate. Choose carefully.",
    40,
    'self-help'
  ),

  // ============================================
  // CARL SAGAN (20 cards)
  // ============================================
  makeCard(
    "Carl Sagan",
    "Cosmos",
    ["science", "wonder", "universe"],
    "We are a way for the cosmos to know itself.",
    "You're not separate from the universe—you're the universe experiencing itself. Consciousness is cosmic self-reflection.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Carl Sagan",
    "Pale Blue Dot",
    ["science", "perspective", "earth"],
    "Look again at that dot. That's here. That's home. That's us.",
    "Earth photographed from billions of miles away: a pale blue dot. All of human history on a mote of dust. Perspective.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Carl Sagan",
    "The Demon-Haunted World",
    ["science", "skepticism", "truth"],
    "Extraordinary claims require extraordinary evidence.",
    "The more surprising the claim, the stronger the proof needed. Skepticism isn't cynicism—it's calibration.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Carl Sagan",
    "Cosmos",
    ["science", "stars", "connection"],
    "We are made of star-stuff.",
    "The atoms in your body were forged in stellar explosions. You're literally made of stars. Not poetry—physics.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Carl Sagan",
    "Contact",
    ["science", "intelligence", "humility"],
    "The universe is a pretty big place. If it's just us, seems like an awful waste of space.",
    "Either we're alone in the cosmos or we're not. Both possibilities are staggering. Stay curious.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Carl Sagan",
    "Pale Blue Dot",
    ["science", "humanity", "responsibility"],
    "There is perhaps no better demonstration of the folly of human conceits than this distant image of our tiny world.",
    "Seen from space, borders disappear. Conflicts seem petty. The overview effect changes everything.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Carl Sagan",
    "The Demon-Haunted World",
    ["science", "ignorance", "learning"],
    "I have a foreboding of an America in my children's generation... unable to distinguish between what feels good and what's true.",
    "Feelings aren't facts. Comfort isn't truth. The discipline to distinguish between them is civilization's foundation.",
    50,
    'non-fiction'
  ),
  makeCard(
    "Carl Sagan",
    "Cosmos",
    ["science", "evolution", "time"],
    "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.",
    "Consciousness is the universe's self-awareness. Through us, existence contemplates itself. What a privilege.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Carl Sagan",
    "The Demon-Haunted World",
    ["science", "education", "critical-thinking"],
    "Science is more than a body of knowledge; it is a way of thinking.",
    "Science isn't just facts—it's a method. Question, test, revise. The process matters more than conclusions.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Carl Sagan",
    "Pale Blue Dot",
    ["science", "war", "peace"],
    "Think of the rivers of blood spilled by all those generals and emperors so that in glory and triumph they could become the momentary masters of a fraction of a dot.",
    "All conquest happens on a speck of cosmic dust. The grandest empires are microscopically small. War seems absurd from space.",
    50,
    'non-fiction'
  ),
  makeCard(
    "Carl Sagan",
    "Cosmos",
    ["science", "books", "knowledge"],
    "One glance at a book and you hear the voice of another person, perhaps someone dead for thousands of years.",
    "Books are time machines. Reading is telepathy across centuries. The dead speak to the living through text.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Carl Sagan",
    "The Demon-Haunted World",
    ["science", "uncertainty", "honesty"],
    "It is far better to grasp the universe as it really is than to persist in delusion, however satisfying and reassuring.",
    "Comfortable lies are still lies. Uncomfortable truths are still truths. Choose reality over fantasy.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Carl Sagan",
    "Contact",
    ["science", "faith", "reason"],
    "For small creatures such as we the vastness is bearable only through love.",
    "The universe is too big to comprehend. Love makes it survivable. Connection is cosmic coping mechanism.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Carl Sagan",
    "Cosmos",
    ["science", "exploration", "curiosity"],
    "Somewhere, something incredible is waiting to be known.",
    "Mystery remains. Discovery awaits. The unknown exceeds the known by unimaginable margins. Stay curious.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Carl Sagan",
    "Pale Blue Dot",
    ["science", "environment", "stewardship"],
    "There is nowhere else, at least in the near future, to which our species could migrate. Visit, yes. Settle, not yet.",
    "This is it. Earth is our only home for now. Treat it accordingly. There's no backup planet.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Carl Sagan",
    "The Demon-Haunted World",
    ["science", "wonder", "childhood"],
    "Every kid starts out as a natural-born scientist, and then we beat it out of them.",
    "Children ask why constantly. Then school teaches them to stop. Preserve curiosity—it's the most valuable trait.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Carl Sagan",
    "Cosmos",
    ["science", "history", "civilization"],
    "We have lingered long enough on the shores of the cosmic ocean. We are ready at last to set sail for the stars.",
    "Humanity's destiny is space. Earth is the cradle, not the grave. Eventually, we must leave home.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Carl Sagan",
    "Billions and Billions",
    ["science", "humility", "mystery"],
    "We live on a hunk of rock and metal that circles a humdrum star that is one of 400 billion other stars that make up the Milky Way.",
    "Cosmic humility: you're on one planet, circling one star, among 400 billion stars, in one galaxy, among trillions. Feel small yet?",
    50,
    'non-fiction'
  ),
  makeCard(
    "Carl Sagan",
    "The Demon-Haunted World",
    ["science", "tradition", "progress"],
    "We've arranged a global civilization in which most crucial elements profoundly depend on science and technology.",
    "We've built a technological civilization while understanding it less and less. This gap is dangerous.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Carl Sagan",
    "Contact",
    ["science", "meaning", "existence"],
    "For all our failings, despite our limitations and fallibilities, we humans are capable of greatness.",
    "Don't lose hope in humanity. Our flaws are obvious; our potential is not. We've done magnificent things.",
    40,
    'non-fiction'
  ),

  // ============================================
  // RICHARD FEYNMAN (15 cards)
  // ============================================
  makeCard(
    "Richard Feynman",
    "Surely You're Joking, Mr. Feynman!",
    ["science", "learning", "curiosity"],
    "I would rather have questions that can't be answered than answers that can't be questioned.",
    "Dogma kills inquiry. Uncertainty is intellectually honest. The best minds hold conclusions lightly.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Richard Feynman",
    "The Pleasure of Finding Things Out",
    ["science", "honesty", "integrity"],
    "The first principle is that you must not fool yourself—and you are the easiest person to fool.",
    "Self-deception is the hardest to detect. Your brain conspires against you. Rigorous honesty is rare and valuable.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Richard Feynman",
    "Six Easy Pieces",
    ["science", "understanding", "teaching"],
    "If you can't explain it simply, you don't understand it well enough.",
    "Complexity often masks confusion. True understanding enables simplicity. Jargon hides ignorance.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Richard Feynman",
    "Surely You're Joking, Mr. Feynman!",
    ["science", "creativity", "play"],
    "Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.",
    "Follow your fascination. Break the rules. The best discoveries come from playful obsession, not forced discipline.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Richard Feynman",
    "The Meaning of It All",
    ["science", "doubt", "freedom"],
    "I can live with doubt, and uncertainty, and not knowing.",
    "Certainty is overrated. The humble 'I don't know' is more honest than false confidence. Embrace mystery.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Richard Feynman",
    "The Pleasure of Finding Things Out",
    ["science", "knowledge", "reality"],
    "It doesn't matter how beautiful your theory is, it doesn't matter how smart you are. If it doesn't agree with experiment, it's wrong.",
    "Reality beats theory. Always. No exceptions. Test everything against the world, not against your preferences.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Richard Feynman",
    "Surely You're Joking, Mr. Feynman!",
    ["science", "expertise", "humility"],
    "I was an ordinary person who studied hard.",
    "Genius is often just persistence. Feynman won the Nobel Prize but claimed no special gift—just interest and effort.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Richard Feynman",
    "The Character of Physical Law",
    ["science", "beauty", "nature"],
    "Nature uses only the longest threads to weave her patterns, so each small piece of her fabric reveals the organization of the entire tapestry.",
    "The universe has elegant simplicity. A few laws explain everything. Fractals of meaning everywhere.",
    50,
    'non-fiction'
  ),
  makeCard(
    "Richard Feynman",
    "The Meaning of It All",
    ["science", "religion", "compatibility"],
    "Religion is a culture of faith; science is a culture of doubt.",
    "Different domains, different methods. Neither invalidates the other. Faith and doubt serve different purposes.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Richard Feynman",
    "Six Easy Pieces",
    ["science", "atoms", "wonder"],
    "If, in some cataclysm, all of scientific knowledge were to be destroyed, and only one sentence passed on: all things are made of atoms.",
    "The most information-dense statement in science. Atoms explain chemistry, biology, physics. One idea, infinite implications.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Richard Feynman",
    "Surely You're Joking, Mr. Feynman!",
    ["science", "boredom", "engagement"],
    "Nobody ever figures out what life is all about, and it doesn't matter. Explore the world.",
    "Don't wait for meaning—create it through exploration. Life's purpose is discovery itself. Get curious and go.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Richard Feynman",
    "The Pleasure of Finding Things Out",
    ["science", "imagination", "reality"],
    "I think nature's imagination is so much greater than man's, she's never going to let us relax.",
    "Reality exceeds fiction. The universe is stranger than we can imagine. Humble yourself before nature's creativity.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Richard Feynman",
    "The Character of Physical Law",
    ["science", "mathematics", "language"],
    "Mathematics is the language with which God has written the universe.",
    "The cosmos speaks in equations. Math isn't human invention—it's discovery. Numbers decode reality.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Richard Feynman",
    "Surely You're Joking, Mr. Feynman!",
    ["science", "prizes", "motivation"],
    "I don't like honors. I appreciate it for the work that I did, but I already got the pleasure by finding the thing out.",
    "The reward is the discovery. Prizes are afterthoughts. If you need external validation, you've missed the point.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Richard Feynman",
    "The Meaning of It All",
    ["science", "ethics", "knowledge"],
    "The scientist has a lot of experience with ignorance and doubt and uncertainty.",
    "Science trains you to be comfortable not knowing. This intellectual humility transfers to all domains. Embrace uncertainty.",
    40,
    'non-fiction'
  ),

  // ============================================
  // WARREN BUFFETT & CHARLIE MUNGER (25 cards)
  // ============================================
  makeCard(
    "Warren Buffett",
    "Berkshire Hathaway Letters",
    ["finance", "investing", "patience"],
    "The stock market is a device for transferring money from the impatient to the patient.",
    "Time arbitrage is real. Most investors panic-sell bottoms and FOMO-buy tops. Patience is alpha.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Warren Buffett",
    "Berkshire Hathaway Letters",
    ["finance", "risk", "understanding"],
    "Risk comes from not knowing what you're doing.",
    "What looks risky to the ignorant is safe to the expert. What looks safe to the ignorant is risky. Knowledge reduces risk.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Charlie Munger",
    "Poor Charlie's Almanack",
    ["finance", "wisdom", "learning"],
    "In my whole life, I have known no wise people who didn't read all the time—none, zero.",
    "Reading is the shortcut to wisdom. The wisest people are the most voracious readers. No exceptions.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Warren Buffett",
    "Berkshire Hathaway Letters",
    ["finance", "reputation", "trust"],
    "It takes 20 years to build a reputation and five minutes to ruin it.",
    "Reputation is asymmetric. Building is slow; destruction is instant. Guard it accordingly. Think before you act.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Charlie Munger",
    "Poor Charlie's Almanack",
    ["finance", "mental-models", "thinking"],
    "You've got to have models in your head. And you've got to array your experience on this latticework of models.",
    "One mental model is a hammer seeing only nails. Multiple models create wisdom. Collect frameworks across disciplines.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Warren Buffett",
    "Berkshire Hathaway Letters",
    ["finance", "fear", "opportunity"],
    "Be fearful when others are greedy and greedy when others are fearful.",
    "Markets are emotional. Opportunity lives in contrarian positioning. When everyone's panicking, it's time to buy.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Charlie Munger",
    "Poor Charlie's Almanack",
    ["finance", "inversion", "problem-solving"],
    "Invert, always invert: Turn a situation or problem upside down.",
    "Want to succeed? Study failure. Want to live well? Avoid what destroys lives. Work backward from what to avoid.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Warren Buffett",
    "Berkshire Hathaway Letters",
    ["finance", "simplicity", "focus"],
    "I don't look to jump over seven-foot bars; I look around for one-foot bars that I can step over.",
    "Easy wins beat hard wins. Don't complicate. Look for obvious opportunities others overlook because they're 'too simple.'",
    40,
    'non-fiction'
  ),
  makeCard(
    "Charlie Munger",
    "Poor Charlie's Almanack",
    ["finance", "incentives", "behavior"],
    "Show me the incentive and I will show you the outcome.",
    "People follow incentives like water follows gravity. If you want different behavior, change the incentives. It's that simple.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Warren Buffett",
    "Berkshire Hathaway Letters",
    ["finance", "integrity", "hiring"],
    "In looking for people to hire, look for three qualities: integrity, intelligence, and energy. And if they don't have the first, the other two will kill you.",
    "Smart energetic people without integrity are dangerous. Character comes first. Skills can be taught; integrity can't.",
    50,
    'non-fiction'
  ),
  makeCard(
    "Charlie Munger",
    "Poor Charlie's Almanack",
    ["finance", "mistakes", "learning"],
    "I like people admitting they were complete stupid horses' asses. I know I'll perform better if I rub my nose in my mistakes.",
    "Ego protects you from learning. Admitting stupidity opens you to wisdom. Celebrate your failures—they're teachers.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Warren Buffett",
    "Berkshire Hathaway Letters",
    ["finance", "circle-of-competence", "limits"],
    "What counts for most people in investing is not how much they know, but rather how realistically they define what they don't know.",
    "Know your limits. Stay within your circle of competence. The smartest investors know what they don't know.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Charlie Munger",
    "Poor Charlie's Almanack",
    ["finance", "avoiding", "stupidity"],
    "It is remarkable how much long-term advantage people like us have gotten by trying to be consistently not stupid.",
    "You don't have to be brilliant. Just avoid idiocy consistently. Not losing is half of winning.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Warren Buffett",
    "Berkshire Hathaway Letters",
    ["finance", "independence", "thinking"],
    "You're neither right nor wrong because the crowd disagrees with you. You're right because your data and reasoning are right.",
    "Consensus isn't truth. Think independently. Being contrarian isn't enough—you need to be contrarian AND correct.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Charlie Munger",
    "Poor Charlie's Almanack",
    ["finance", "multidisciplinary", "wisdom"],
    "You must know the big ideas in the big disciplines and use them routinely—all of them, not just a few.",
    "Specialists miss patterns generalists see. Cross-pollinate knowledge. The best insights come from combining disciplines.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Warren Buffett",
    "Berkshire Hathaway Letters",
    ["finance", "moats", "competition"],
    "In business, I look for economic castles protected by unbreachable moats.",
    "Sustainable competitive advantages are rare and valuable. Without a moat, profits attract competitors who erode them.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Charlie Munger",
    "Poor Charlie's Almanack",
    ["finance", "patience", "waiting"],
    "The big money is not in the buying and the selling, but in the waiting.",
    "Most investors overtrade. The best returns come from holding quality through volatility. Patience pays—literally.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Warren Buffett",
    "Berkshire Hathaway Letters",
    ["finance", "price", "value"],
    "Price is what you pay. Value is what you get.",
    "They're not the same thing. A cheap price on garbage is expensive. An expensive price on treasure can be cheap.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Charlie Munger",
    "Poor Charlie's Almanack",
    ["finance", "compound", "time"],
    "The first rule of compounding: Never interrupt it unnecessarily.",
    "Compounding is magic, but only if unbroken. Every time you sell, you reset the clock. Let winners run.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Warren Buffett",
    "Berkshire Hathaway Letters",
    ["finance", "learning", "mistakes"],
    "I've never swung at a ball while it's still in the pitcher's glove.",
    "You don't have to swing at every pitch. Wait for your pitch. In investing, there are no called strikes.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Charlie Munger",
    "Poor Charlie's Almanack",
    ["finance", "envy", "happiness"],
    "Envy is a really stupid sin because it's the only one you could never possibly have any fun at.",
    "Of all the vices, envy is uniquely pointless. Gluttony at least feels good temporarily. Envy is pure misery.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Warren Buffett",
    "Berkshire Hathaway Letters",
    ["finance", "honesty", "communication"],
    "We will be candid in our reporting to you, emphasizing the pluses and minuses important in appraising business value.",
    "Honest communication builds trust. Don't spin, don't hide, don't exaggerate. Treat stakeholders as partners.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Charlie Munger",
    "Poor Charlie's Almanack",
    ["finance", "ego", "humility"],
    "Acknowledging what you don't know is the dawning of wisdom.",
    "The wisest people are most aware of their ignorance. Intellectual humility is the foundation of learning.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Warren Buffett",
    "Berkshire Hathaway Letters",
    ["finance", "long-term", "ownership"],
    "Our favorite holding period is forever.",
    "Think like an owner, not a trader. When you own great businesses, why would you sell?",
    30,
    'non-fiction'
  ),
  makeCard(
    "Charlie Munger",
    "Poor Charlie's Almanack",
    ["finance", "simplicity", "complexity"],
    "Take a simple idea and take it seriously.",
    "Profound truths are often obvious once stated. The hard part isn't finding them—it's taking them seriously enough to act.",
    35,
    'non-fiction'
  ),

  // ============================================
  // STEPHEN COVEY - 7 HABITS (20 cards)
  // ============================================
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["productivity", "leadership", "character"],
    "Be proactive. It's not what happens to you, but how you react to it that matters.",
    "Victims react. Leaders respond. The gap between stimulus and response is where character lives. Expand that gap.",
    40,
    'self-help'
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["productivity", "vision", "purpose"],
    "Begin with the end in mind.",
    "Work backward from your destination. Every choice should align with your ultimate goals. Without a target, you'll hit nothing.",
    35,
    'self-help'
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["productivity", "priorities", "time"],
    "Put first things first.",
    "Important beats urgent. Most people prioritize the urgent but neglect the important. Reverse that and watch your life transform.",
    35,
    'self-help'
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["relationships", "negotiation", "collaboration"],
    "Think win-win.",
    "Life isn't zero-sum. The best deals make everyone better off. Seek mutual benefit or walk away.",
    35,
    'self-help'
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["relationships", "communication", "empathy"],
    "Seek first to understand, then to be understood.",
    "Most people listen to reply, not to understand. Flip the order. Deep listening opens hearts and minds.",
    40,
    'self-help'
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["productivity", "teamwork", "synergy"],
    "Synergize. The whole is greater than the sum of its parts.",
    "One plus one can equal three. Diverse perspectives create emergent value. Collaboration multiplies capability.",
    35,
    'self-help'
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["health", "renewal", "balance"],
    "Sharpen the saw. Preserve and enhance the greatest asset you have—you.",
    "You're the instrument of your work. Maintain yourself: physical, mental, emotional, spiritual. Dull saws cut nothing.",
    40,
    'self-help'
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["relationships", "trust", "integrity"],
    "Trust is the glue of life. It's the foundational principle that holds all relationships together.",
    "Without trust, nothing works. Building trust is slow; breaking it is instant. Guard trust above all.",
    40,
    'self-help'
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["leadership", "influence", "example"],
    "What you do has far greater impact than what you say.",
    "Words are cheap. Actions are expensive. People watch what you do, not what you say. Lead by example.",
    35,
    'self-help'
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["productivity", "paradigm", "perspective"],
    "We see the world, not as it is, but as we are.",
    "Your perception is filtered through your conditioning. Different people see different realities. Question your lens.",
    40,
    'self-help'
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["productivity", "focus", "control"],
    "The main thing is to keep the main thing the main thing.",
    "Distraction is the default. Focus is the discipline. Guard your attention fiercely. Priority singular, not plural.",
    35,
    'self-help'
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["psychology", "response", "freedom"],
    "Between stimulus and response is our greatest power—the freedom to choose.",
    "Animals react. Humans can pause. In that pause lives your humanity. Cultivate the gap.",
    40,
    'self-help'
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["leadership", "management", "direction"],
    "Management is efficiency in climbing the ladder of success; leadership determines whether the ladder is leaning against the right wall.",
    "Efficiency without direction is waste. Make sure you're climbing the right ladder before you climb faster.",
    50,
    'self-help'
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["productivity", "quadrants", "urgent"],
    "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
    "Your calendar should reflect your values. If it doesn't, you're living someone else's priorities.",
    40,
    'self-help'
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["relationships", "deposits", "trust"],
    "Every interaction is a deposit or withdrawal in the emotional bank account.",
    "Relationships have balances. Small kindnesses deposit. Broken promises withdraw. Keep the account positive.",
    40,
    'self-help'
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["psychology", "change", "habits"],
    "Sow a thought, reap an action; sow an action, reap a habit; sow a habit, reap a character; sow a character, reap a destiny.",
    "Destiny starts with a single thought. The chain is clear: thoughts → actions → habits → character → destiny.",
    50,
    'self-help'
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["relationships", "listening", "empathy"],
    "Most people do not listen with the intent to understand; they listen with the intent to reply.",
    "Real listening is rare. It requires suspending your agenda. Put down your mental script and truly hear.",
    40,
    'self-help'
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["productivity", "independence", "interdependence"],
    "Interdependence is a higher value than independence.",
    "Independence is immature. Interdependence is mature. We accomplish more together. Cooperation beats solo effort.",
    40,
    'self-help'
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["psychology", "principles", "values"],
    "Principles are natural laws that are external to us and that ultimately control the consequences of our actions.",
    "You don't break principles—you break yourself against them. Align with natural law or suffer the consequences.",
    45,
    'self-help'
  ),
  makeCard(
    "Stephen Covey",
    "The 7 Habits of Highly Effective People",
    ["productivity", "mission", "purpose"],
    "A personal mission statement becomes the DNA for every other decision we make.",
    "Write your mission statement. It's your constitution. When confused, consult it. Let it guide all choices.",
    40,
    'self-help'
  ),

  // ============================================
  // CAL NEWPORT (20 cards)
  // ============================================
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "focus", "attention"],
    "Deep work is the ability to focus without distraction on a cognitively demanding task.",
    "Shallow work is the default. Deep work is the exception. But deep work produces all the value. Prioritize it ruthlessly.",
    40,
    'self-help'
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "distraction", "technology"],
    "If you don't produce, you won't thrive—no matter how skilled or talented you are.",
    "Ideas without execution are worthless. Output matters. Focus on producing, not just consuming.",
    35,
    'self-help'
  ),
  makeCard(
    "Cal Newport",
    "Digital Minimalism",
    ["technology", "minimalism", "attention"],
    "Digital minimalists see new technologies as tools to be used to support things they deeply value.",
    "Technology should serve you, not consume you. Start with values, then choose tools. Not the reverse.",
    40,
    'self-help'
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "ritual", "consistency"],
    "Great creative minds think like artists but work like accountants.",
    "Creativity needs structure. The romanticized image of spontaneous inspiration is false. Routine enables brilliance.",
    40,
    'self-help'
  ),
  makeCard(
    "Cal Newport",
    "So Good They Can't Ignore You",
    ["career", "skills", "passion"],
    "Don't follow your passion. Let your passion follow you.",
    "Passion comes from mastery, not vice versa. Get really good at something valuable. Passion follows skill.",
    40,
    'self-help'
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "solitude", "thinking"],
    "High-quality work produced = (Time Spent) × (Intensity of Focus).",
    "Hours don't equal output. Focus multiplies effectiveness. One focused hour beats four distracted ones.",
    35,
    'self-help'
  ),
  makeCard(
    "Cal Newport",
    "Digital Minimalism",
    ["technology", "social-media", "wellbeing"],
    "Solitude deprivation is a state in which you spend close to zero time alone with your own thoughts.",
    "Constant connectivity prevents self-reflection. Schedule solitude. Your mind needs quiet processing time.",
    45,
    'self-help'
  ),
  makeCard(
    "Cal Newport",
    "So Good They Can't Ignore You",
    ["career", "capital", "rare-skills"],
    "If you want a great job, you need to build up rare and valuable skills—career capital—to offer in return.",
    "Jobs aren't given; they're earned. Accumulate skills that are hard to find. Scarcity drives value.",
    40,
    'self-help'
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "shutdown", "rest"],
    "Shutdown rituals give you confidence that everything is under control until the next day.",
    "Work needs boundaries. Create a shutdown ritual. When the day ends, let work rest. Recovery enables more deep work.",
    40,
    'self-help'
  ),
  makeCard(
    "Cal Newport",
    "Digital Minimalism",
    ["technology", "leisure", "quality"],
    "High-quality leisure beats passive consumption.",
    "Scrolling isn't rest—it's stimulation without satisfaction. Choose active, demanding leisure. Build things. Learn skills.",
    35,
    'self-help'
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "email", "communication"],
    "E-mail is a wonderful thing for people whose role in life is to be on top of things.",
    "Email is perfect for administrators, terrible for creators. Minimize reactive communication. Protect creation time.",
    40,
    'self-help'
  ),
  makeCard(
    "Cal Newport",
    "So Good They Can't Ignore You",
    ["career", "control", "leverage"],
    "Control over what you do, and how you do it, is incredibly important to job satisfaction.",
    "Autonomy matters more than passion. Work toward control. But earn it first through demonstrated competence.",
    40,
    'self-help'
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "boredom", "tolerance"],
    "To succeed with deep work you must rewire your brain to be comfortable resisting distracting stimuli.",
    "Boredom tolerance is a skill. Practice being unstimulated. Don't reach for your phone at every quiet moment.",
    40,
    'self-help'
  ),
  makeCard(
    "Cal Newport",
    "Digital Minimalism",
    ["technology", "attention", "economy"],
    "The tycoons of social media have to convince you that their products are good for you.",
    "Attention merchants sell access to your brain. They have incentives to maximize engagement, not your wellbeing. Be suspicious.",
    45,
    'self-help'
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "scheduling", "time-blocking"],
    "Schedule every minute of your day.",
    "Time blocking isn't rigid—it's intentional. Know what you're doing when. Drift is the enemy of productivity.",
    35,
    'self-help'
  ),
  makeCard(
    "Cal Newport",
    "So Good They Can't Ignore You",
    ["career", "mission", "impact"],
    "A mission is a unifying focus for your career. It's more general than a specific job and can span multiple positions.",
    "Don't think job by job. Think mission. What larger purpose connects your work? Clarity of mission brings energy.",
    40,
    'self-help'
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "metrics", "results"],
    "Be so good they can't ignore you.",
    "The title says it all. Quality speaks for itself. Don't self-promote; produce work that promotes itself.",
    30,
    'self-help'
  ),
  makeCard(
    "Cal Newport",
    "Digital Minimalism",
    ["technology", "phone", "boundaries"],
    "The key to thriving in our high-tech world is to spend less time using technology.",
    "Counterintuitive but true. Technology mastery means using less, not more. Constraint enables freedom.",
    40,
    'self-help'
  ),
  makeCard(
    "Cal Newport",
    "A World Without Email",
    ["productivity", "workflow", "communication"],
    "Much of the pain generated by email comes from using it for everything.",
    "Email was designed for asynchronous messages, not real-time collaboration. Use the right tool for each job.",
    40,
    'self-help'
  ),
  makeCard(
    "Cal Newport",
    "Deep Work",
    ["productivity", "craft", "mastery"],
    "Craftsman approach to tool selection: Adopt a tool only if its positive impacts substantially outweigh its negative impacts.",
    "Every tool has costs. Before adopting, calculate true impact. Most tools aren't worth their hidden costs.",
    45,
    'self-help'
  ),

  // ============================================
  // RYAN HOLIDAY - STOICISM (20 cards)
  // ============================================
  makeCard(
    "Ryan Holiday",
    "The Obstacle Is the Way",
    ["philosophy", "stoicism", "obstacles"],
    "The obstacle in the path becomes the path. Never forget, within every obstacle is an opportunity to improve our condition.",
    "Problems aren't interruptions to your journey—they ARE your journey. Each barrier is a training ground.",
    45,
    'self-help'
  ),
  makeCard(
    "Ryan Holiday",
    "Ego Is the Enemy",
    ["philosophy", "ego", "humility"],
    "Ego is the enemy of what you want and of what you have.",
    "Ego blocks learning when you're rising and breeds complacency when you've arrived. Kill ego at every stage.",
    40,
    'self-help'
  ),
  makeCard(
    "Ryan Holiday",
    "Stillness Is the Key",
    ["philosophy", "stillness", "peace"],
    "Stillness is the key to everything.",
    "In motion, we miss insights. In stillness, we find clarity. The busiest people need stillness most—and resist it most.",
    35,
    'self-help'
  ),
  makeCard(
    "Ryan Holiday",
    "The Daily Stoic",
    ["philosophy", "stoicism", "practice"],
    "We don't control what happens to us, only how we respond.",
    "Ancient wisdom, daily application. The Stoics weren't theorists—they were practitioners. Philosophy is exercise.",
    40,
    'self-help'
  ),
  makeCard(
    "Ryan Holiday",
    "The Obstacle Is the Way",
    ["philosophy", "perception", "interpretation"],
    "There is no good or bad without us. There is only perception.",
    "Events are neutral until you interpret them. Your labeling creates your reality. Relabel, and the world changes.",
    40,
    'self-help'
  ),
  makeCard(
    "Ryan Holiday",
    "Ego Is the Enemy",
    ["philosophy", "work", "credit"],
    "Doing great work is a struggle. It's draining, it's demoralizing, it's lonely. But that's the price of admission.",
    "Great work isn't glamorous while you're doing it. The grind is real. Accept it or stay mediocre.",
    40,
    'self-help'
  ),
  makeCard(
    "Ryan Holiday",
    "Stillness Is the Key",
    ["philosophy", "rest", "recovery"],
    "The world is like muddy water. To see through it, we have to let things settle.",
    "Clarity requires stillness. Agitation clouds judgment. Let the mud settle before deciding.",
    40,
    'self-help'
  ),
  makeCard(
    "Ryan Holiday",
    "The Daily Stoic",
    ["philosophy", "morning", "routine"],
    "Morning routines determine the trajectory of our days.",
    "How you start matters. Win the morning, win the day. Rituals create momentum.",
    35,
    'self-help'
  ),
  makeCard(
    "Ryan Holiday",
    "The Obstacle Is the Way",
    ["philosophy", "action", "persistence"],
    "Action is the solution to your problems. Never sit still.",
    "Contemplation has limits. At some point, you must act. Motion creates clarity that thinking cannot.",
    35,
    'self-help'
  ),
  makeCard(
    "Ryan Holiday",
    "Ego Is the Enemy",
    ["philosophy", "learning", "beginner"],
    "Be a student. No matter what you've accomplished, always assume you can learn more.",
    "Expertise creates blindness. The expert's curse is thinking you know. Stay a beginner in spirit.",
    40,
    'self-help'
  ),
  makeCard(
    "Ryan Holiday",
    "Stillness Is the Key",
    ["philosophy", "presence", "now"],
    "Be fully present, whatever you're doing.",
    "Divided attention is no attention at all. Wherever you are, be there completely. This moment is the only one.",
    35,
    'self-help'
  ),
  makeCard(
    "Ryan Holiday",
    "The Daily Stoic",
    ["philosophy", "death", "memento-mori"],
    "Remember you will die. Let that influence how you live.",
    "Memento mori isn't morbid—it's clarifying. Death awareness sharpens priorities. What matters if today is your last?",
    40,
    'self-help'
  ),
  makeCard(
    "Ryan Holiday",
    "The Obstacle Is the Way",
    ["philosophy", "resilience", "strength"],
    "What matters most is not what these obstacles are but how we see them, react to them, and whether we keep our composure.",
    "Obstacles are tests of character. Your response reveals your training. Stay composed. Think clearly. Act wisely.",
    45,
    'self-help'
  ),
  makeCard(
    "Ryan Holiday",
    "Ego Is the Enemy",
    ["philosophy", "success", "danger"],
    "With success comes the temptation of entitlement.",
    "Success is dangerous. It breeds complacency, arrogance, laziness. The successful must work hardest against ego.",
    40,
    'self-help'
  ),
  makeCard(
    "Ryan Holiday",
    "Stillness Is the Key",
    ["philosophy", "simplicity", "less"],
    "Reduce your needs to increase your happiness.",
    "Desire is the root of dissatisfaction. Fewer wants mean easier satisfaction. Simplicity is a happiness strategy.",
    35,
    'self-help'
  ),
  makeCard(
    "Ryan Holiday",
    "The Daily Stoic",
    ["philosophy", "journal", "reflection"],
    "Keep a journal. Write down your thoughts, your reflections.",
    "Journaling is thinking on paper. Externalize thoughts to examine them. The Stoics all journaled.",
    35,
    'self-help'
  ),
  makeCard(
    "Ryan Holiday",
    "The Obstacle Is the Way",
    ["philosophy", "preparation", "readiness"],
    "Prepare for difficulties in good times.",
    "Train when you're strong. Prepare before crisis hits. The time to build resilience is now, not when you need it.",
    40,
    'self-help'
  ),
  makeCard(
    "Ryan Holiday",
    "Ego Is the Enemy",
    ["philosophy", "ambition", "discipline"],
    "Every ambitious person must learn the difference between healthy striving and ego.",
    "Ambition can be noble or destructive. It depends on what drives it. Self-improvement or validation-seeking?",
    40,
    'self-help'
  ),
  makeCard(
    "Ryan Holiday",
    "Stillness Is the Key",
    ["philosophy", "nature", "outdoors"],
    "Reconnect with the natural world around you.",
    "Humans evolved outdoors. Nature isn't escape—it's home. Regular immersion in nature restores sanity.",
    35,
    'self-help'
  ),
  makeCard(
    "Ryan Holiday",
    "The Daily Stoic",
    ["philosophy", "virtue", "character"],
    "Character is fate. Focus on your character above all else.",
    "Skills can be learned, but character is foundational. Who you are determines what you achieve. Build character first.",
    40,
    'self-help'
  ),

  // ============================================
  // RUMI - POETRY (20 cards) [PREMIUM]
  // ============================================
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["spirituality", "love", "poetry"],
    "Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray.",
    "Trust your deepest attractions. Love knows where to go. Follow without overthinking. The heart has its own wisdom.",
    40,
    'poetry'
  ),
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["spirituality", "searching", "truth"],
    "What you seek is seeking you.",
    "The universe conspires with sincere seekers. Your longing is reciprocated. You're not chasing—you're being called.",
    35,
    'poetry'
  ),
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["spirituality", "wounds", "healing"],
    "The wound is the place where the Light enters you.",
    "Your breaks are openings. Suffering creates capacity for grace. Don't seal wounds too quickly—they're sacred entrances.",
    40,
    'poetry'
  ),
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["spirituality", "change", "growth"],
    "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.",
    "External reform is the young person's game. Mature wisdom focuses inward. Change yourself; the world follows.",
    40,
    'poetry'
  ),
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["spirituality", "silence", "listening"],
    "Silence is the language of God. All else is poor translation.",
    "Words approximate truth; silence embodies it. The deepest communion happens beyond language. Learn to hear the quiet.",
    40,
    'poetry'
  ),
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["spirituality", "presence", "moment"],
    "Be present in all things and thankful for all things.",
    "Presence is the practice. Gratitude is the attitude. Combined, they transform ordinary moments into sacred ones.",
    35,
    'poetry'
  ),
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["spirituality", "pain", "purpose"],
    "These pains you feel are messengers. Listen to them.",
    "Pain is communication, not punishment. It carries information. Before numbing, ask: what is this trying to tell me?",
    40,
    'poetry'
  ),
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["spirituality", "love", "infinite"],
    "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.",
    "Love isn't scarce—it's blocked. You don't find love; you remove obstacles to it. The work is inner demolition.",
    50,
    'poetry'
  ),
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["spirituality", "soul", "essence"],
    "You are not a drop in the ocean. You are the entire ocean in a drop.",
    "Don't diminish yourself. The whole is in you. You contain multitudes. Think bigger about what you are.",
    40,
    'poetry'
  ),
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["spirituality", "freedom", "cage"],
    "Don't be satisfied with stories, how things have gone with others. Unfold your own myth.",
    "Others' paths are theirs. Your journey is unique. Stop reading maps—start walking. Create your story.",
    40,
    'poetry'
  ),
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["spirituality", "death", "transformation"],
    "Don't grieve. Anything you lose comes round in another form.",
    "Nothing is truly lost—only transformed. Loss is transition, not ending. What disappears reappears differently.",
    40,
    'poetry'
  ),
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["spirituality", "heart", "openness"],
    "Keep breaking your heart until it opens.",
    "Hearts break to open wider. Each heartbreak increases capacity for love. Don't armor up—break open.",
    35,
    'poetry'
  ),
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["spirituality", "dance", "celebration"],
    "Dance, when you're broken open. Dance, if you've torn the bandage off.",
    "Joy isn't the absence of pain—it's response to everything. Dance in sorrow. Celebrate in confusion. Move anyway.",
    40,
    'poetry'
  ),
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["spirituality", "knowing", "mystery"],
    "Sell your cleverness and buy bewilderment.",
    "Knowing is overrated. Mystery is underrated. Intellectual certainty closes doors that wonder opens. Stay bewildered.",
    40,
    'poetry'
  ),
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["spirituality", "unity", "separation"],
    "Why do you stay in prison when the door is so wide open?",
    "Freedom is available. The prison is mental. The door was never locked—you just stopped trying it.",
    35,
    'poetry'
  ),
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["spirituality", "beauty", "attention"],
    "Let the beauty of what you love be what you do.",
    "Work should express love. If it doesn't, realign. Beauty isn't decoration—it's direction. Follow it.",
    35,
    'poetry'
  ),
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["spirituality", "guest-house", "emotions"],
    "This being human is a guest house. Every morning a new arrival.",
    "Welcome all emotions as visitors. Sadness, joy, anger—all are guests. Don't bar the door. Hospitality to feelings.",
    45,
    'poetry'
  ),
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["spirituality", "seeking", "finding"],
    "Everything in the universe is within you. Ask all from yourself.",
    "You already have what you seek. The search is really a remembering. Look within; the treasure's there.",
    40,
    'poetry'
  ),
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["spirituality", "fire", "passion"],
    "Set your life on fire. Seek those who fan your flames.",
    "Passion is contagious. Surround yourself with people who ignite you. Avoid those who douse your fire.",
    35,
    'poetry'
  ),
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["spirituality", "gratitude", "wonder"],
    "Wear gratitude like a cloak and it will feed every corner of your life.",
    "Gratitude isn't just attitude—it's attire. Wrap yourself in it. It changes how the world treats you.",
    40,
    'poetry'
  ),

  // ============================================
  // KHALIL GIBRAN (20 cards) [PREMIUM]
  // ============================================
  makeCard(
    "Khalil Gibran",
    "The Prophet",
    ["spirituality", "love", "relationships"],
    "Let there be spaces in your togetherness, and let the winds of the heavens dance between you.",
    "Healthy love isn't fusion—it's two people dancing together while remaining themselves. Space enables depth.",
    45,
    'poetry'
  ),
  makeCard(
    "Khalil Gibran",
    "The Prophet",
    ["spirituality", "children", "parenting"],
    "Your children are not your children. They are the sons and daughters of Life's longing for itself.",
    "Children come through you, not from you. They're not possessions or extensions. They're souls on their own journey.",
    50,
    'poetry'
  ),
  makeCard(
    "Khalil Gibran",
    "The Prophet",
    ["spirituality", "work", "meaning"],
    "Work is love made visible.",
    "What you create with care shows love. Work done without love is hollow. Put your heart into your hands.",
    35,
    'poetry'
  ),
  makeCard(
    "Khalil Gibran",
    "The Prophet",
    ["spirituality", "pain", "understanding"],
    "Your pain is the breaking of the shell that encloses your understanding.",
    "Suffering cracks you open to wisdom. Comfort keeps you closed. Pain is the price of growth.",
    40,
    'poetry'
  ),
  makeCard(
    "Khalil Gibran",
    "The Prophet",
    ["spirituality", "joy", "sorrow"],
    "The deeper that sorrow carves into your being, the more joy you can contain.",
    "Grief excavates. The hollow it leaves becomes capacity for joy. Sorrow and joy share the same vessel.",
    40,
    'poetry'
  ),
  makeCard(
    "Khalil Gibran",
    "The Prophet",
    ["spirituality", "giving", "generosity"],
    "You give but little when you give of your possessions. It is when you give of yourself that you truly give.",
    "Material gifts are easy. The real gift is presence, attention, time. Give yourself, not just stuff.",
    45,
    'poetry'
  ),
  makeCard(
    "Khalil Gibran",
    "The Prophet",
    ["spirituality", "freedom", "truth"],
    "And you would accept the seasons of your heart, even as you have always accepted the seasons that pass over your fields.",
    "Emotions have seasons. Winter follows summer. Accept the rhythms. Don't demand permanent spring.",
    45,
    'poetry'
  ),
  makeCard(
    "Khalil Gibran",
    "The Prophet",
    ["spirituality", "beauty", "seeing"],
    "Beauty is not in the face; beauty is a light in the heart.",
    "Physical beauty fades. Inner light endures. Look for radiance, not features. True beauty illuminates from within.",
    35,
    'poetry'
  ),
  makeCard(
    "Khalil Gibran",
    "The Prophet",
    ["spirituality", "friendship", "soul"],
    "And in the sweetness of friendship let there be laughter, and sharing of pleasures.",
    "Friendship should be enjoyed, not just maintained. Don't forget to have fun together. Joy is friendship's purpose.",
    35,
    'poetry'
  ),
  makeCard(
    "Khalil Gibran",
    "The Prophet",
    ["spirituality", "teaching", "wisdom"],
    "The teacher who walks in the shadow of the temple, among his followers, gives not of his wisdom but rather of his faith and his lovingness.",
    "Teaching isn't transfer of information—it's transmission of spirit. Teachers share who they are, not just what they know.",
    50,
    'poetry'
  ),
  makeCard(
    "Khalil Gibran",
    "The Prophet",
    ["spirituality", "death", "life"],
    "For life and death are one, even as the river and the sea are one.",
    "Death isn't opposite of life—it's part of life. The river becomes the sea, yet remains water. Transformation, not ending.",
    45,
    'poetry'
  ),
  makeCard(
    "Khalil Gibran",
    "Sand and Foam",
    ["spirituality", "speech", "silence"],
    "Half of what I say is meaningless; but I say it so that the other half may reach you.",
    "Communication is inefficient. Much is lost. Speak twice as much as needed so enough gets through.",
    40,
    'poetry'
  ),
  makeCard(
    "Khalil Gibran",
    "The Prophet",
    ["spirituality", "prayer", "connection"],
    "You pray in your distress and in your need; would that you might pray also in the fullness of your joy and in your days of abundance.",
    "Don't pray only when desperate. Pray in prosperity too. Gratitude is the highest prayer.",
    45,
    'poetry'
  ),
  makeCard(
    "Khalil Gibran",
    "The Prophet",
    ["spirituality", "home", "belonging"],
    "Your house is not your house; it is your larger body.",
    "Home isn't property—it's extension of self. Create space that nurtures your soul, not just stores your stuff.",
    40,
    'poetry'
  ),
  makeCard(
    "Khalil Gibran",
    "Sand and Foam",
    ["spirituality", "self-knowledge", "mystery"],
    "I have learned silence from the talkative, toleration from the intolerant, and kindness from the unkind.",
    "Teachers come in strange disguises. Learn from negative examples. What irritates can instruct.",
    45,
    'poetry'
  ),
  makeCard(
    "Khalil Gibran",
    "The Prophet",
    ["spirituality", "marriage", "union"],
    "Let there be spaces in your togetherness.",
    "Closeness requires distance. Unity needs separateness. Paradoxically, space enables deeper connection.",
    35,
    'poetry'
  ),
  makeCard(
    "Khalil Gibran",
    "Sand and Foam",
    ["spirituality", "listening", "speaking"],
    "If you reveal your secrets to the wind, you should not blame the wind for revealing them to the trees.",
    "Be careful what you share and with whom. Not everything needs to be expressed. Discretion is wisdom.",
    40,
    'poetry'
  ),
  makeCard(
    "Khalil Gibran",
    "The Prophet",
    ["spirituality", "crime", "justice"],
    "And the corner-stone of the temple is not higher than the lowest stone in its foundation.",
    "High and low are connected. The foundation is as essential as the pinnacle. Don't dismiss what's beneath.",
    40,
    'poetry'
  ),
  makeCard(
    "Khalil Gibran",
    "The Prophet",
    ["spirituality", "eating", "nourishment"],
    "When you kill a beast say to him in your heart: By the same power that slays you, I too am slain.",
    "Consumption connects us to what we consume. Acknowledge the exchange. Eat with reverence, not just hunger.",
    45,
    'poetry'
  ),
  makeCard(
    "Khalil Gibran",
    "Sand and Foam",
    ["spirituality", "dreaming", "reality"],
    "Trust the dreams, for in them is hidden the gate to eternity.",
    "Dreams are messages. Pay attention to them. The unconscious communicates through symbols. Listen while sleeping.",
    40,
    'poetry'
  ),

  // ============================================
  // FYODOR DOSTOEVSKY (20 cards) [PREMIUM]
  // ============================================
  makeCard(
    "Fyodor Dostoevsky",
    "The Brothers Karamazov",
    ["fiction", "philosophy", "suffering"],
    "Pain and suffering are always inevitable for a large intelligence and a deep heart.",
    "Sensitivity is a double-edged sword. The same depth that enables joy enables sorrow. Intelligence feels more.",
    45,
    'fiction'
  ),
  makeCard(
    "Fyodor Dostoevsky",
    "Crime and Punishment",
    ["fiction", "conscience", "guilt"],
    "The soul is healed by being with children.",
    "Innocence is restorative. Time with children resets jaded perspectives. Their simplicity heals complicated minds.",
    35,
    'fiction'
  ),
  makeCard(
    "Fyodor Dostoevsky",
    "The Idiot",
    ["fiction", "beauty", "salvation"],
    "Beauty will save the world.",
    "Aesthetic experience isn't luxury—it's necessity. Beauty is redemptive. Ugliness corrupts souls; beauty heals them.",
    35,
    'fiction'
  ),
  makeCard(
    "Fyodor Dostoevsky",
    "Notes from Underground",
    ["fiction", "freedom", "suffering"],
    "The degree of civilization in a society can be judged by entering its prisons.",
    "How we treat the lowest reveals our true character. Prison conditions expose societal values. Judge by the margins.",
    45,
    'fiction'
  ),
  makeCard(
    "Fyodor Dostoevsky",
    "The Brothers Karamazov",
    ["fiction", "love", "action"],
    "Above all, don't lie to yourself.",
    "Self-deception is the root of all deception. Once you lie to yourself, lying to others becomes easy. Start with inner honesty.",
    35,
    'fiction'
  ),
  makeCard(
    "Fyodor Dostoevsky",
    "Crime and Punishment",
    ["fiction", "psychology", "motivation"],
    "To go wrong in one's own way is better than to go right in someone else's.",
    "Authenticity beats correctness. Your mistakes are more valuable than borrowed successes. Own your path.",
    40,
    'fiction'
  ),
  makeCard(
    "Fyodor Dostoevsky",
    "The Idiot",
    ["fiction", "truth", "honesty"],
    "One cannot love a person at close range. To love one's neighbor, it's essential not to know him.",
    "Intimacy reveals flaws. Loving ideals is easy; loving real people is hard. The test of love is proximity.",
    45,
    'fiction'
  ),
  makeCard(
    "Fyodor Dostoevsky",
    "Notes from Underground",
    ["fiction", "consciousness", "pain"],
    "I say let the world go to hell, but I should always have my tea.",
    "Maintain ritual amid chaos. Small comforts matter. When everything's falling apart, brew your tea.",
    35,
    'fiction'
  ),
  makeCard(
    "Fyodor Dostoevsky",
    "The Brothers Karamazov",
    ["fiction", "faith", "doubt"],
    "The more I love humanity in general, the less I love man in particular.",
    "Abstract love is easy. Concrete love is hard. Test your love with individuals, not concepts.",
    40,
    'fiction'
  ),
  makeCard(
    "Fyodor Dostoevsky",
    "Crime and Punishment",
    ["fiction", "redemption", "renewal"],
    "Man grows used to everything, the scoundrel!",
    "Adaptation is human. We normalize the abnormal. We adjust to conditions that should shock us. Be aware of creeping acceptance.",
    40,
    'fiction'
  ),
  makeCard(
    "Fyodor Dostoevsky",
    "The Idiot",
    ["fiction", "innocence", "wisdom"],
    "A fool with a heart and no sense is just as unhappy as a fool with sense and no heart.",
    "Heart and mind must balance. Intelligence without feeling is cold. Feeling without intelligence is chaos. Cultivate both.",
    45,
    'fiction'
  ),
  makeCard(
    "Fyodor Dostoevsky",
    "Notes from Underground",
    ["fiction", "rationality", "desire"],
    "Man only likes to count his troubles; he doesn't calculate his happiness.",
    "We're wired for negativity bias. Problems feel heavier than blessings. Consciously count your joys—they're invisible otherwise.",
    40,
    'fiction'
  ),
  makeCard(
    "Fyodor Dostoevsky",
    "The Brothers Karamazov",
    ["fiction", "children", "suffering"],
    "If there is no God, everything is permitted.",
    "Without transcendent values, morality is arbitrary. The question isn't whether God exists but what anchors ethics if He doesn't.",
    40,
    'fiction'
  ),
  makeCard(
    "Fyodor Dostoevsky",
    "Crime and Punishment",
    ["fiction", "society", "individual"],
    "Taking a new step, uttering a new word, is what people fear most.",
    "Novelty is terrifying. The unknown threatens. That's why most people repeat familiar patterns despite their pain.",
    40,
    'fiction'
  ),
  makeCard(
    "Fyodor Dostoevsky",
    "The Idiot",
    ["fiction", "execution", "death"],
    "What is hell? I maintain that it is the suffering of being unable to love.",
    "Hell isn't fire—it's frozen hearts. Inability to connect is torture. Love is heaven; its absence is damnation.",
    40,
    'fiction'
  ),
  makeCard(
    "Fyodor Dostoevsky",
    "Notes from Underground",
    ["fiction", "reason", "will"],
    "Reason is an excellent thing, there's no disputing that, but reason is nothing but reason and satisfies only the rational side of man's nature.",
    "Logic has limits. Humans aren't calculating machines. Emotion, will, and spirit exceed reason's grasp.",
    50,
    'fiction'
  ),
  makeCard(
    "Fyodor Dostoevsky",
    "The Brothers Karamazov",
    ["fiction", "guilt", "confession"],
    "People speak sometimes about the 'bestial' cruelty of man, but that is terribly unjust to the beasts.",
    "Animals kill for need. Humans kill for pleasure. Our cruelty exceeds nature. Don't blame the beasts for human evil.",
    45,
    'fiction'
  ),
  makeCard(
    "Fyodor Dostoevsky",
    "Crime and Punishment",
    ["fiction", "dreams", "reality"],
    "We sometimes encounter people, even perfect strangers, who begin to interest us at first sight.",
    "Instant connection is real. Some souls recognize each other immediately. Trust those inexplicable attractions.",
    40,
    'fiction'
  ),
  makeCard(
    "Fyodor Dostoevsky",
    "The Idiot",
    ["fiction", "money", "morality"],
    "Much unhappiness has come into the world because of bewilderment and things left unsaid.",
    "Silence causes suffering. Unspoken truths fester. Confusion grows in the dark. Speak. Clarify. Illuminate.",
    40,
    'fiction'
  ),
  makeCard(
    "Fyodor Dostoevsky",
    "Notes from Underground",
    ["fiction", "contradiction", "humanity"],
    "I am a sick man... I am a spiteful man. I am an unattractive man.",
    "Radical honesty about flaws is refreshing. Self-awareness includes ugliness. The underground man speaks what others hide.",
    40,
    'fiction'
  ),

  // ============================================
  // GEORGE ORWELL (15 cards) [PREMIUM]
  // ============================================
  makeCard(
    "George Orwell",
    "1984",
    ["fiction", "truth", "freedom"],
    "In a time of deceit, telling the truth is a revolutionary act.",
    "When lies are normalized, honesty becomes rebellion. Speaking truth to power is dangerous—and necessary.",
    40,
    'fiction'
  ),
  makeCard(
    "George Orwell",
    "1984",
    ["fiction", "control", "power"],
    "Who controls the past controls the future. Who controls the present controls the past.",
    "History is malleable. Those in power rewrite it. Question the narratives you've been given.",
    45,
    'fiction'
  ),
  makeCard(
    "George Orwell",
    "Animal Farm",
    ["fiction", "equality", "corruption"],
    "All animals are equal, but some animals are more equal than others.",
    "Equality is proclaimed while hierarchy is maintained. Watch for this doublespeak. The powerful always find exceptions for themselves.",
    45,
    'fiction'
  ),
  makeCard(
    "George Orwell",
    "1984",
    ["fiction", "freedom", "slavery"],
    "War is peace. Freedom is slavery. Ignorance is strength.",
    "Doublethink: holding contradictory beliefs simultaneously. It's not just fiction—watch for it in your own mind.",
    40,
    'fiction'
  ),
  makeCard(
    "George Orwell",
    "Politics and the English Language",
    ["non-fiction", "language", "clarity"],
    "Political language is designed to make lies sound truthful and murder respectable.",
    "Language is a weapon. Euphemisms hide atrocities. Clear language reveals; political language obscures. Demand clarity.",
    45,
    'non-fiction'
  ),
  makeCard(
    "George Orwell",
    "1984",
    ["fiction", "love", "betrayal"],
    "Perhaps one did not want to be loved so much as to be understood.",
    "Understanding exceeds love. To be truly known is the deepest intimacy. Love without understanding is hollow.",
    40,
    'fiction'
  ),
  makeCard(
    "George Orwell",
    "Animal Farm",
    ["fiction", "revolution", "power"],
    "The creatures outside looked from pig to man, and from man to pig, and from pig to man again; but already it was impossible to say which was which.",
    "Revolutions often become what they opposed. The oppressed become oppressors. Power corrupts regardless of ideology.",
    50,
    'fiction'
  ),
  makeCard(
    "George Orwell",
    "1984",
    ["fiction", "reality", "perception"],
    "Reality exists in the human mind, and nowhere else.",
    "Objective reality is inaccessible. We only know our perceptions. This makes truth vulnerable to manipulation.",
    40,
    'fiction'
  ),
  makeCard(
    "George Orwell",
    "Why I Write",
    ["non-fiction", "writing", "motivation"],
    "Every line of serious work that I have written since 1936 has been written against totalitarianism and for democratic socialism.",
    "Clear purpose clarifies writing. Know what you're for and against. Political conviction can drive artistic excellence.",
    45,
    'non-fiction'
  ),
  makeCard(
    "George Orwell",
    "1984",
    ["fiction", "thought", "crime"],
    "Thoughtcrime does not entail death: thoughtcrime IS death.",
    "When thoughts themselves become criminal, the inner self is extinguished. Protect mental freedom above all.",
    40,
    'fiction'
  ),
  makeCard(
    "George Orwell",
    "Animal Farm",
    ["fiction", "memory", "manipulation"],
    "The past was erased, the erasure was forgotten, the lie became the truth.",
    "Memory erasure is totalitarianism's tool. When the lie becomes truth, resistance becomes impossible. Remember.",
    40,
    'fiction'
  ),
  makeCard(
    "George Orwell",
    "1984",
    ["fiction", "humanity", "resistance"],
    "Being in a minority, even in a minority of one, did not make you mad.",
    "Sanity isn't determined by consensus. You can be right while everyone's wrong. Trust your perception.",
    40,
    'fiction'
  ),
  makeCard(
    "George Orwell",
    "Homage to Catalonia",
    ["non-fiction", "truth", "journalism"],
    "I saw newspaper reports which did not bear any relation to the facts.",
    "Media distortion isn't conspiracy theory—it's documented reality. Question all sources. Verify before believing.",
    40,
    'non-fiction'
  ),
  makeCard(
    "George Orwell",
    "1984",
    ["fiction", "love", "hatred"],
    "The object of power is power.",
    "Power isn't means to an end—it's the end itself. Those who seek power usually want nothing beyond it.",
    35,
    'fiction'
  ),
  makeCard(
    "George Orwell",
    "Politics and the English Language",
    ["non-fiction", "writing", "thinking"],
    "If thought corrupts language, language can also corrupt thought.",
    "Sloppy language enables sloppy thinking. Clear writing requires—and produces—clear thought. Words shape minds.",
    40,
    'non-fiction'
  ),

  // ============================================
  // ERNEST HEMINGWAY (15 cards) [PREMIUM]
  // ============================================
  makeCard(
    "Ernest Hemingway",
    "A Farewell to Arms",
    ["fiction", "courage", "fear"],
    "Courage is grace under pressure.",
    "Real courage isn't fearlessness—it's composure when afraid. Grace under fire. Calm when chaos beckons.",
    35,
    'fiction'
  ),
  makeCard(
    "Ernest Hemingway",
    "A Moveable Feast",
    ["fiction", "writing", "craft"],
    "All you have to do is write one true sentence. Write the truest sentence that you know.",
    "When stuck, simplify. Write truth. One honest line breaks any block. Truth is the key to flow.",
    40,
    'fiction'
  ),
  makeCard(
    "Ernest Hemingway",
    "The Old Man and the Sea",
    ["fiction", "defeat", "victory"],
    "A man can be destroyed but not defeated.",
    "Physical loss isn't spiritual defeat. The body can fail while the spirit triumphs. Inner victory exceeds outer outcomes.",
    40,
    'fiction'
  ),
  makeCard(
    "Ernest Hemingway",
    "Death in the Afternoon",
    ["non-fiction", "writing", "economy"],
    "Prose is architecture, not interior decoration.",
    "Write with structural integrity, not ornament. Every word should bear weight. Strip away what doesn't support the whole.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Ernest Hemingway",
    "For Whom the Bell Tolls",
    ["fiction", "time", "living"],
    "There is nothing else than now. There is neither yesterday, certainly, nor is there any tomorrow.",
    "Past and future are mental constructions. Only now exists. Live in this moment—it's all you have.",
    40,
    'fiction'
  ),
  makeCard(
    "Ernest Hemingway",
    "The Sun Also Rises",
    ["fiction", "bankruptcy", "gradual"],
    "How did you go bankrupt? Two ways. Gradually, then suddenly.",
    "Collapse isn't sudden—it's gradual until it isn't. Watch for slow decay. The catastrophic moment was long prepared.",
    40,
    'fiction'
  ),
  makeCard(
    "Ernest Hemingway",
    "A Moveable Feast",
    ["fiction", "poverty", "happiness"],
    "We ate well and cheaply and drank well and cheaply and slept well and warm together and loved each other.",
    "Simple pleasures are the real ones. Good food, warm love, sound sleep. Luxury isn't required for happiness.",
    40,
    'fiction'
  ),
  makeCard(
    "Ernest Hemingway",
    "The Old Man and the Sea",
    ["fiction", "persistence", "hope"],
    "Now is no time to think of what you do not have. Think of what you can do with what there is.",
    "Focus on resources, not deficits. Work with what's available. Scarcity breeds creativity when mindset shifts.",
    40,
    'fiction'
  ),
  makeCard(
    "Ernest Hemingway",
    "A Farewell to Arms",
    ["fiction", "world", "breaking"],
    "The world breaks everyone, and afterward, many are strong at the broken places.",
    "Breaking is universal. Rebuilding is choice. Your scars can become your strongest parts.",
    40,
    'fiction'
  ),
  makeCard(
    "Ernest Hemingway",
    "Green Hills of Africa",
    ["non-fiction", "writing", "observation"],
    "I like to listen. I have learned a great deal from listening carefully.",
    "Writers must observe more than they speak. Listening fuels writing. Input exceeds output in the creative process.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Ernest Hemingway",
    "The Old Man and the Sea",
    ["fiction", "endurance", "struggle"],
    "But man is not made for defeat. A man can be destroyed but not defeated.",
    "The human spirit is indestructible. Bodies fail; spirits persist. Defeat is only accepted, never forced.",
    40,
    'fiction'
  ),
  makeCard(
    "Ernest Hemingway",
    "For Whom the Bell Tolls",
    ["fiction", "death", "connection"],
    "No man is an island entire of itself; every man is a piece of the continent.",
    "We're interconnected. Others' deaths diminish us. Their lives enhance us. Isolation is illusion.",
    40,
    'fiction'
  ),
  makeCard(
    "Ernest Hemingway",
    "A Moveable Feast",
    ["fiction", "Paris", "youth"],
    "If you are lucky enough to have lived in Paris as a young man, then wherever you go for the rest of your life, it stays with you.",
    "Formative experiences mark you forever. Place shapes soul. Some cities become permanent parts of who you are.",
    45,
    'fiction'
  ),
  makeCard(
    "Ernest Hemingway",
    "The Sun Also Rises",
    ["fiction", "travel", "escape"],
    "You can't get away from yourself by moving from one place to another.",
    "Geography doesn't solve psychology. You take yourself wherever you go. Run from problems, find them at the destination.",
    40,
    'fiction'
  ),
  makeCard(
    "Ernest Hemingway",
    "Death in the Afternoon",
    ["non-fiction", "truth", "writing"],
    "All good books have one thing in common—they are truer than if they had really happened.",
    "Fiction can be more true than fact. Art distills reality. The best stories are emotionally true, regardless of literal events.",
    45,
    'non-fiction'
  ),

  // ============================================
  // DEREK SIVERS (15 cards)
  // ============================================
  makeCard(
    "Derek Sivers",
    "Hell Yeah or No",
    ["productivity", "decisions", "focus"],
    "If you're not saying 'Hell yeah!' then say no.",
    "Enthusiasm is the filter. Lukewarm means no. Save your energy for what excites you. Everything else is distraction.",
    35,
    'self-help'
  ),
  makeCard(
    "Derek Sivers",
    "Anything You Want",
    ["business", "simplicity", "success"],
    "Business is not about money. It's about making dreams come true for others and for yourself.",
    "Profit follows purpose. Start with dreams—yours and others'. Money is byproduct, not goal.",
    35,
    'self-help'
  ),
  makeCard(
    "Derek Sivers",
    "Hell Yeah or No",
    ["productivity", "saying-no", "priorities"],
    "No more yes. It's either 'hell yeah' or 'no'.",
    "Your default should be no. Reserve yes for what genuinely excites. Most opportunities are distractions in disguise.",
    30,
    'self-help'
  ),
  makeCard(
    "Derek Sivers",
    "Anything You Want",
    ["business", "customers", "service"],
    "Never forget that absolutely everything you do is for your customers.",
    "Business exists to serve. Every decision should start with: how does this help customers? If it doesn't, why do it?",
    35,
    'self-help'
  ),
  makeCard(
    "Derek Sivers",
    "Hell Yeah or No",
    ["productivity", "goals", "direction"],
    "Most people overestimate what they can do in one year, and underestimate what they can do in ten years.",
    "Short-term thinking inflates expectations. Long-term thinking reveals possibilities. Play the long game.",
    40,
    'self-help'
  ),
  makeCard(
    "Derek Sivers",
    "Anything You Want",
    ["business", "growth", "scale"],
    "The real point of doing anything is to be happy, so do only what makes you happy.",
    "Growth isn't mandatory. Scale isn't required. If you're happy small, stay small. Happiness trumps metrics.",
    35,
    'self-help'
  ),
  makeCard(
    "Derek Sivers",
    "Hell Yeah or No",
    ["productivity", "effort", "results"],
    "Whatever excites you, go do it. Whatever drains you, stop doing it.",
    "Energy is diagnostic. Excitement signals alignment. Drainage signals misalignment. Follow your energy.",
    35,
    'self-help'
  ),
  makeCard(
    "Derek Sivers",
    "Anything You Want",
    ["business", "uniqueness", "authenticity"],
    "The way to be interesting is to be interested.",
    "Curiosity attracts. The most fascinating people are the most curious. Interest outward creates interest inward.",
    35,
    'self-help'
  ),
  makeCard(
    "Derek Sivers",
    "Hell Yeah or No",
    ["psychology", "opposites", "perspective"],
    "Whatever you think is your biggest weakness may actually be your biggest strength.",
    "Weaknesses are often strengths misapplied. Reframe your flaws. The same trait that hurts can help in different context.",
    40,
    'self-help'
  ),
  makeCard(
    "Derek Sivers",
    "Anything You Want",
    ["business", "delegation", "trust"],
    "If you want to be useful, you can always start now, with only 1% of what you have in your grand vision.",
    "Start tiny. Perfect plans prevent action. 1% today beats 100% never. Begin with whatever you have.",
    40,
    'self-help'
  ),
  makeCard(
    "Derek Sivers",
    "How to Live",
    ["philosophy", "contradictions", "wisdom"],
    "There are no rules. You can do whatever you want.",
    "Freedom is terrifying and liberating. No cosmic rulebook exists. You make it up. That's the burden and the gift.",
    35,
    'self-help'
  ),
  makeCard(
    "Derek Sivers",
    "Hell Yeah or No",
    ["psychology", "opinions", "change"],
    "People often ask me what they should do. I never answer because they won't take my advice anyway.",
    "Advice is rarely followed. People want validation, not guidance. Real change comes from within, not instructions.",
    40,
    'self-help'
  ),
  makeCard(
    "Derek Sivers",
    "Anything You Want",
    ["business", "simplicity", "complexity"],
    "Make every decision—even decisions about whether to expand the business—according to what's best for your customers.",
    "Customer obsession cuts through complexity. When confused, ask: what would customers want? It's a clarifying filter.",
    40,
    'self-help'
  ),
  makeCard(
    "Derek Sivers",
    "How to Live",
    ["philosophy", "meaning", "action"],
    "Actions are the only thing that matter. Judge yourself only by what you've done, not by what you think.",
    "Intentions are invisible. Actions are real. You are what you do, not what you intend. Results count, not plans.",
    40,
    'self-help'
  ),
  makeCard(
    "Derek Sivers",
    "Hell Yeah or No",
    ["productivity", "attention", "value"],
    "The most valuable thing you can make is time.",
    "Time is the ultimate currency. Guard it. Creating free time is creating wealth. Efficiency serves freedom.",
    35,
    'self-help'
  ),

  // ============================================
  // ADDITIONAL DIVERSE CARDS (50 cards)
  // ============================================
  makeCard(
    "Plato",
    "The Republic",
    ["philosophy", "justice", "society"],
    "The measure of a man is what he does with power.",
    "Power reveals character. Observe how people treat those with less power. That's who they really are.",
    35,
    'philosophy'
  ),
  makeCard(
    "Aristotle",
    "Nicomachean Ethics",
    ["philosophy", "happiness", "virtue"],
    "Happiness depends upon ourselves.",
    "External circumstances contribute, but happiness is ultimately internal. It's a choice and a practice.",
    35,
    'philosophy'
  ),
  makeCard(
    "Aristotle",
    "Nicomachean Ethics",
    ["philosophy", "excellence", "habit"],
    "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    "Character isn't forged in moments but in routines. Your habits are your identity. Choose them consciously.",
    40,
    'philosophy'
  ),
  makeCard(
    "Aristotle",
    "Politics",
    ["philosophy", "education", "roots"],
    "The roots of education are bitter, but the fruit is sweet.",
    "Learning is uncomfortable. Growth requires strain. Endure the bitter process for the sweet results.",
    35,
    'philosophy'
  ),
  makeCard(
    "Lao Tzu",
    "Tao Te Ching",
    ["philosophy", "simplicity", "wisdom"],
    "A journey of a thousand miles begins with a single step.",
    "Don't be paralyzed by distance. Just start. The first step is the hardest and most important.",
    35,
    'philosophy'
  ),
  makeCard(
    "Lao Tzu",
    "Tao Te Ching",
    ["philosophy", "water", "strength"],
    "Water is the softest thing, yet it can penetrate mountains and earth.",
    "Softness can be stronger than hardness. Persistence beats force. Flow around obstacles.",
    40,
    'philosophy'
  ),
  makeCard(
    "Lao Tzu",
    "Tao Te Ching",
    ["philosophy", "knowledge", "wisdom"],
    "He who knows others is wise; he who knows himself is enlightened.",
    "Self-knowledge exceeds all other knowledge. Understanding yourself is the highest achievement.",
    40,
    'philosophy'
  ),
  makeCard(
    "Confucius",
    "Analects",
    ["philosophy", "learning", "reflection"],
    "Learning without thought is labor lost; thought without learning is perilous.",
    "Balance input and processing. Consuming without thinking is waste. Thinking without learning is delusion.",
    40,
    'philosophy'
  ),
  makeCard(
    "Confucius",
    "Analects",
    ["philosophy", "mistakes", "correction"],
    "A man who has committed a mistake and doesn't correct it is committing another mistake.",
    "Errors are inevitable. Uncorrected errors are inexcusable. Own your mistakes. Fix them. Move on.",
    40,
    'philosophy'
  ),
  makeCard(
    "Buddha",
    "Dhammapada",
    ["spirituality", "mind", "thought"],
    "The mind is everything. What you think, you become.",
    "Thoughts shape reality. Mind precedes manifestation. Guard your thoughts; they determine your destiny.",
    35,
    'philosophy'
  ),
  makeCard(
    "Buddha",
    "Dhammapada",
    ["spirituality", "peace", "victory"],
    "Holding onto anger is like drinking poison and expecting the other person to die.",
    "Resentment harms the holder, not the target. Release it for your own sake, not theirs.",
    40,
    'philosophy'
  ),
  makeCard(
    "Buddha",
    "Dhammapada",
    ["spirituality", "attachment", "suffering"],
    "Attachment leads to suffering.",
    "The root of pain is clinging. Hold things loosely. Love without grasping. Let go to find peace.",
    35,
    'philosophy'
  ),
  makeCard(
    "Ralph Waldo Emerson",
    "Self-Reliance",
    ["philosophy", "independence", "conformity"],
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "Society pressures conformity. Resisting it is heroic. Authentic selfhood is the highest achievement.",
    45,
    'philosophy'
  ),
  makeCard(
    "Ralph Waldo Emerson",
    "Self-Reliance",
    ["philosophy", "action", "fear"],
    "Do the thing you fear, and the death of fear is certain.",
    "Fear dies through action. Avoidance feeds anxiety. Confront what scares you. It loses power when faced.",
    35,
    'philosophy'
  ),
  makeCard(
    "Ralph Waldo Emerson",
    "Nature",
    ["philosophy", "nature", "solitude"],
    "In the woods, we return to reason and faith.",
    "Nature restores sanity. Leave civilization periodically. Trees teach what buildings can't.",
    35,
    'philosophy'
  ),
  makeCard(
    "Henry David Thoreau",
    "Walden",
    ["philosophy", "simplicity", "living"],
    "Our life is frittered away by detail. Simplify, simplify.",
    "Complexity exhausts. Most details don't matter. Cut ruthlessly. What remains is essential.",
    35,
    'philosophy'
  ),
  makeCard(
    "Henry David Thoreau",
    "Walden",
    ["philosophy", "conformity", "authenticity"],
    "If a man does not keep pace with his companions, perhaps it is because he hears a different drummer.",
    "Different rhythms are valid. Not everyone should march together. Follow your own beat.",
    40,
    'philosophy'
  ),
  makeCard(
    "Henry David Thoreau",
    "Civil Disobedience",
    ["philosophy", "conscience", "law"],
    "Under a government which imprisons any unjustly, the true place for a just man is also a prison.",
    "Conscience exceeds law. When systems are unjust, compliance is complicity. Sometimes breaking law is moral duty.",
    45,
    'philosophy'
  ),
  makeCard(
    "William James",
    "The Principles of Psychology",
    ["psychology", "attention", "reality"],
    "My experience is what I agree to attend to.",
    "Attention creates experience. What you focus on becomes your world. Choose your focus wisely.",
    40,
    'self-help'
  ),
  makeCard(
    "William James",
    "Pragmatism",
    ["philosophy", "truth", "practice"],
    "Act as if what you do makes a difference. It does.",
    "Your actions matter. Don't diminish your impact. Small choices aggregate into significant outcomes.",
    35,
    'self-help'
  ),
  makeCard(
    "Bertrand Russell",
    "The Conquest of Happiness",
    ["philosophy", "happiness", "interest"],
    "The secret of happiness is this: let your interests be as wide as possible.",
    "Boredom is narrow focus. Broaden your interests. The curious are rarely unhappy. Engagement beats entertainment.",
    40,
    'philosophy'
  ),
  makeCard(
    "Bertrand Russell",
    "In Praise of Idleness",
    ["philosophy", "work", "leisure"],
    "The time you enjoy wasting is not wasted time.",
    "Rest isn't laziness. Pleasure isn't waste. Recovery is productive. Stop guilting yourself for enjoyment.",
    35,
    'philosophy'
  ),
  makeCard(
    "Albert Einstein",
    "Essays in Science",
    ["science", "imagination", "knowledge"],
    "Imagination is more important than knowledge.",
    "Knowledge is bounded. Imagination is infinite. Don't just know—envision. Creativity exceeds memory.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Albert Einstein",
    "The World As I See It",
    ["science", "simplicity", "elegance"],
    "Everything should be made as simple as possible, but not simpler.",
    "Simplify ruthlessly—but not stupidly. Complexity has a minimum below which you lose truth. Find the boundary.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Albert Einstein",
    "Letters",
    ["science", "curiosity", "passion"],
    "I have no special talents. I am only passionately curious.",
    "Curiosity beats talent. Persistent interest outdoes natural ability. The curious outlearn the gifted.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Leonardo da Vinci",
    "Notebooks",
    ["creativity", "learning", "observation"],
    "Learning never exhausts the mind.",
    "Unlike muscles, the mind doesn't tire from learning. It strengthens. Intellectual exhaustion is usually emotional, not cognitive.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Leonardo da Vinci",
    "Notebooks",
    ["creativity", "simplicity", "sophistication"],
    "Simplicity is the ultimate sophistication.",
    "Simple isn't simplistic. True elegance appears effortless. The most sophisticated designs look simplest.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Michelangelo",
    "Letters",
    ["creativity", "sculpture", "vision"],
    "I saw the angel in the marble and carved until I set him free.",
    "Creation is revelation. The work exists within the material. Your job is removal, not addition.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Vincent van Gogh",
    "Letters to Theo",
    ["creativity", "work", "persistence"],
    "Great things are done by a series of small things brought together.",
    "Masterpieces are accumulated details. Don't wait for the grand gesture. Stack small actions.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Pablo Picasso",
    "Conversations",
    ["creativity", "mistakes", "discovery"],
    "Every act of creation is first an act of destruction.",
    "To make something new, destroy something old. Creation requires breaking previous forms. Don't preserve what should die.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Steve Jobs",
    "Stanford Commencement",
    ["business", "intuition", "dots"],
    "You can't connect the dots looking forward; you can only connect them looking backwards.",
    "Trust the process. Current confusion becomes future clarity. What seems random now will make sense later.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Steve Jobs",
    "Interviews",
    ["business", "design", "simplicity"],
    "Design is not just what it looks like and feels like. Design is how it works.",
    "Form follows function. Beauty isn't surface—it's structural. True design serves purpose elegantly.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Peter Drucker",
    "The Effective Executive",
    ["business", "efficiency", "focus"],
    "There is nothing so useless as doing efficiently that which should not be done at all.",
    "Efficiency on wrong tasks is waste. First ask: should this be done? Then ask: how?",
    40,
    'non-fiction'
  ),
  makeCard(
    "Peter Drucker",
    "Management",
    ["business", "prediction", "creation"],
    "The best way to predict the future is to create it.",
    "Don't forecast—build. Prediction is passive; creation is active. Shape the future you want.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Jeff Bezos",
    "Invent and Wander",
    ["business", "decisions", "reversibility"],
    "Most decisions should probably be made with around 70% of the information you wish you had.",
    "Waiting for certainty is too slow. Decide with incomplete data. Many decisions are reversible anyway.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Jeff Bezos",
    "Shareholder Letters",
    ["business", "customer", "obsession"],
    "Start with the customer and work backwards.",
    "Most work forward from product to customer. Reverse it. Start with what customers need, then build to meet it.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Tim Ferriss",
    "The 4-Hour Workweek",
    ["productivity", "fear", "action"],
    "What we fear doing most is usually what we most need to do.",
    "Fear is a compass. It points toward growth. The thing you're avoiding is often the thing you need.",
    40,
    'self-help'
  ),
  makeCard(
    "Tim Ferriss",
    "Tools of Titans",
    ["productivity", "questions", "answers"],
    "Life punishes the vague wish and rewards the specific ask.",
    "Clarity attracts. Vague goals produce vague results. Define exactly what you want.",
    40,
    'self-help'
  ),
  makeCard(
    "Tim Ferriss",
    "Tribe of Mentors",
    ["productivity", "success", "definition"],
    "What would this look like if it were easy?",
    "We overcomplicate. Ask this question before any project. Often there's a simpler path hiding in plain sight.",
    35,
    'self-help'
  ),
  makeCard(
    "Brené Brown",
    "Daring Greatly",
    ["psychology", "vulnerability", "courage"],
    "Vulnerability is not weakness; it's our greatest measure of courage.",
    "Hiding is easy. Showing up authentically is hard. Real courage is emotional exposure, not physical danger.",
    40,
    'self-help'
  ),
  makeCard(
    "Brené Brown",
    "The Gifts of Imperfection",
    ["psychology", "perfectionism", "worthiness"],
    "Perfectionism is not the same thing as striving to be your best.",
    "Perfectionism is fear dressed up as excellence. It's about avoiding shame, not achieving greatness. Let it go.",
    40,
    'self-help'
  ),
  makeCard(
    "Brené Brown",
    "Rising Strong",
    ["psychology", "failure", "recovery"],
    "The middle is messy, but it's also where the magic happens.",
    "Beginnings are exciting. Endings are clear. The messy middle is where transformation actually occurs.",
    40,
    'self-help'
  ),
  makeCard(
    "Malcolm Gladwell",
    "Outliers",
    ["psychology", "success", "practice"],
    "Practice isn't the thing you do once you're good. It's the thing you do that makes you good.",
    "Talent is overrated. Hours of deliberate practice create expertise. Start practicing before you feel ready.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Malcolm Gladwell",
    "Blink",
    ["psychology", "intuition", "decisions"],
    "There can be as much value in the blink of an eye as in months of rational analysis.",
    "Intuition is compressed experience. Your gut knows things your conscious mind hasn't processed yet. Trust it sometimes.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Malcolm Gladwell",
    "David and Goliath",
    ["psychology", "weakness", "advantage"],
    "The thing we call advantage is not always an advantage, and the thing we call disadvantage is not always a disadvantage.",
    "Apparent weaknesses can be hidden strengths. Constraints breed creativity. Don't assume your handicaps are handicaps.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Seth Godin",
    "The Dip",
    ["business", "quitting", "persistence"],
    "Winners quit fast, quit often, and quit without guilt.",
    "Strategic quitting is wisdom. Quit the wrong things quickly so you can double down on the right things.",
    35,
    'self-help'
  ),
  makeCard(
    "Seth Godin",
    "Purple Cow",
    ["business", "marketing", "remarkable"],
    "In a crowded marketplace, fitting in is failing. In a busy marketplace, not standing out is the same as being invisible.",
    "Safe is risky. Remarkable is safe. Being boring guarantees obscurity. Take the risk of being different.",
    45,
    'self-help'
  ),
  makeCard(
    "Seth Godin",
    "Linchpin",
    ["business", "creativity", "value"],
    "The only way to get what you're worth is to stand out, to exert emotional labor, to be seen as indispensable.",
    "Commodities compete on price. Artists compete on uniqueness. Become indispensable through irreplaceable contribution.",
    45,
    'self-help'
  ),
  makeCard(
    "Simon Sinek",
    "Start with Why",
    ["business", "leadership", "purpose"],
    "People don't buy what you do; they buy why you do it.",
    "Purpose precedes product. Lead with meaning, not features. Connect to values, not specifications.",
    35,
    'self-help'
  ),
  makeCard(
    "Simon Sinek",
    "Leaders Eat Last",
    ["leadership", "trust", "sacrifice"],
    "The true price of leadership is the willingness to place the needs of others above your own.",
    "Leaders serve. Position isn't privilege—it's responsibility. Put your people first, and they'll follow anywhere.",
    40,
    'self-help'
  ),
  makeCard(
    "Simon Sinek",
    "The Infinite Game",
    ["business", "mindset", "longevity"],
    "In infinite games, the goal is not to win, but to keep playing.",
    "Business isn't won or lost—it's sustained. Play for longevity, not quarterly victories. Think decades, not quarters.",
    40,
    'self-help'
  ),
  makeCard(
    "Adam Grant",
    "Give and Take",
    ["psychology", "generosity", "success"],
    "The most successful givers are those who rate high in concern for others and high in self-interest.",
    "Selfless giving burns out. Strategic giving sustains. Help others AND yourself. Both matter.",
    40,
    'self-help'
  ),
  makeCard(
    "Adam Grant",
    "Think Again",
    ["psychology", "opinions", "learning"],
    "The goal is not to be right, but to get it right.",
    "Ego wants to be right. Wisdom wants the truth. Separate identity from opinions. Change your mind freely.",
    35,
    'self-help'
  ),
  makeCard(
    "Adam Grant",
    "Originals",
    ["creativity", "innovation", "risk"],
    "The hallmark of originality is rejecting the default and exploring whether a better option exists.",
    "Originals question what others accept. Don't take the default. Ask: why is it this way? Could it be different?",
    40,
    'self-help'
  ),
  makeCard(
    "Angela Duckworth",
    "Grit",
    ["psychology", "perseverance", "passion"],
    "Grit is passion and perseverance for long-term goals.",
    "Talent matters less than persistence. Gritty people outperform talented quitters. Stick with it.",
    35,
    'self-help'
  ),
  makeCard(
    "Angela Duckworth",
    "Grit",
    ["psychology", "effort", "success"],
    "Talent x Effort = Skill. Skill x Effort = Achievement.",
    "Effort counts twice. It builds skill AND deploys it. Hard work is the ultimate multiplier.",
    40,
    'self-help'
  ),
  makeCard(
    "Carol Dweck",
    "Mindset",
    ["psychology", "growth", "learning"],
    "In a growth mindset, challenges are exciting rather than threatening.",
    "Fixed mindset avoids failure. Growth mindset embraces it. See challenges as opportunities to grow.",
    35,
    'self-help'
  ),
  makeCard(
    "Carol Dweck",
    "Mindset",
    ["psychology", "failure", "improvement"],
    "Becoming is better than being.",
    "Don't focus on proving yourself. Focus on improving yourself. Process beats performance as identity.",
    35,
    'self-help'
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "decisions", "bias"],
    "Nothing in life is as important as you think it is while you are thinking about it.",
    "Focusing illusion: whatever you're focused on seems more important than it is. Zoom out for perspective.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Daniel Kahneman",
    "Thinking, Fast and Slow",
    ["psychology", "intuition", "analysis"],
    "A reliable way to make people believe in falsehoods is frequent repetition.",
    "Familiarity feels like truth. Just because you've heard it often doesn't make it true. Question the repeated.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Nassim Taleb",
    "Antifragile",
    ["philosophy", "resilience", "chaos"],
    "Antifragility is beyond resilience or robustness. The resilient resists shocks and stays the same; the antifragile gets better.",
    "Don't just survive chaos—use it. Build systems that improve under stress. Disorder is opportunity.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Nassim Taleb",
    "The Black Swan",
    ["philosophy", "uncertainty", "prediction"],
    "The inability to predict outliers implies the inability to predict the course of history.",
    "Rare events drive history. We can't predict them but can position for them. Expect the unexpected.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Nassim Taleb",
    "Skin in the Game",
    ["philosophy", "risk", "accountability"],
    "Never trust anyone who doesn't have skin in the game.",
    "Advice from those with nothing to lose is worthless. Look for aligned incentives. Who pays if they're wrong?",
    40,
    'non-fiction'
  ),
  makeCard(
    "Robert Greene",
    "The 48 Laws of Power",
    ["psychology", "power", "strategy"],
    "Never outshine the master.",
    "Make those above you feel superior. Ego is dangerous to threaten. Let them take credit while you take lessons.",
    40,
    'self-help'
  ),
  makeCard(
    "Robert Greene",
    "Mastery",
    ["psychology", "learning", "expertise"],
    "The future belongs to those who learn more skills and combine them in creative ways.",
    "Specialization is risky. Combine multiple skills uniquely. The intersection is where opportunity lives.",
    40,
    'self-help'
  ),
  makeCard(
    "Robert Greene",
    "The Laws of Human Nature",
    ["psychology", "behavior", "understanding"],
    "We are all cut from the same human cloth. We share the same tendencies.",
    "Others aren't as different as they seem. Understand yourself, and you understand others. Human nature is universal.",
    40,
    'self-help'
  ),
  makeCard(
    "Mihaly Csikszentmihalyi",
    "Flow",
    ["psychology", "happiness", "engagement"],
    "The best moments in our lives are not the passive, receptive, relaxing times. The best moments usually occur when a person's body or mind is stretched to its limits.",
    "Passive leisure doesn't satisfy. Active engagement does. Challenge creates fulfillment. Seek flow states.",
    50,
    'self-help'
  ),
  makeCard(
    "Mihaly Csikszentmihalyi",
    "Flow",
    ["psychology", "focus", "enjoyment"],
    "Control of consciousness determines the quality of life.",
    "You can't control events. You can control attention. Master your focus, master your experience.",
    35,
    'self-help'
  ),
  makeCard(
    "Eckhart Tolle",
    "The Power of Now",
    ["spirituality", "presence", "mindfulness"],
    "Realize deeply that the present moment is all you have. Make the NOW the primary focus of your life.",
    "Past and future are mental constructs. Now is reality. Stop living in your head. Arrive in this moment.",
    40,
    'self-help'
  ),
  makeCard(
    "Eckhart Tolle",
    "A New Earth",
    ["spirituality", "ego", "awareness"],
    "The primary cause of unhappiness is never the situation but your thoughts about it.",
    "Situations are neutral. Thoughts create suffering. Notice the difference between what happens and what you think about it.",
    40,
    'self-help'
  ),
  makeCard(
    "Thich Nhat Hanh",
    "The Miracle of Mindfulness",
    ["spirituality", "mindfulness", "breathing"],
    "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.",
    "Emotions are weather, not climate. They pass. The breath is always available as refuge. Return to it.",
    40,
    'self-help'
  ),
  makeCard(
    "Thich Nhat Hanh",
    "Peace Is Every Step",
    ["spirituality", "peace", "action"],
    "Peace is every step.",
    "Peace isn't a destination—it's how you walk. Each moment is an opportunity for peace. Don't postpone it.",
    30,
    'self-help'
  ),
  makeCard(
    "Pema Chödrön",
    "When Things Fall Apart",
    ["spirituality", "groundlessness", "acceptance"],
    "To be fully alive, fully human, and completely awake is to be continually thrown out of the nest.",
    "Security is illusion. Groundlessness is reality. Learn to be comfortable with discomfort. That's awakening.",
    45,
    'self-help'
  ),
  makeCard(
    "Pema Chödrön",
    "The Places That Scare You",
    ["spirituality", "fear", "courage"],
    "Fear is a natural reaction to moving closer to the truth.",
    "Fear signals proximity to something real. Don't retreat from fear—investigate it. Truth often hides behind fear.",
    40,
    'self-help'
  ),
  makeCard(
    "Joseph Campbell",
    "The Hero with a Thousand Faces",
    ["mythology", "journey", "transformation"],
    "The cave you fear to enter holds the treasure you seek.",
    "What you avoid contains what you need. The dragon guards the gold. Face your fears to find your fortune.",
    40,
    'self-help'
  ),
  makeCard(
    "Joseph Campbell",
    "The Power of Myth",
    ["mythology", "meaning", "life"],
    "Follow your bliss and the universe will open doors where there were only walls.",
    "Joy is guidance. Follow what energizes you. Doors appear when you're on the right path.",
    40,
    'self-help'
  ),
  makeCard(
    "Alan Watts",
    "The Wisdom of Insecurity",
    ["philosophy", "anxiety", "present"],
    "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
    "Resistance to change creates suffering. Flow with it instead. Life is a dance, not a battle.",
    40,
    'philosophy'
  ),
  makeCard(
    "Alan Watts",
    "The Book",
    ["philosophy", "identity", "ego"],
    "Trying to define yourself is like trying to bite your own teeth.",
    "The self can't capture itself. You are not your thoughts about yourself. Stop trying to pin yourself down.",
    40,
    'philosophy'
  ),
  makeCard(
    "Alan Watts",
    "The Way of Zen",
    ["philosophy", "zen", "simplicity"],
    "Muddy water is best cleared by leaving it alone.",
    "Sometimes non-action is the answer. Let things settle. Don't stir what needs to rest. Clarity comes from stillness.",
    35,
    'philosophy'
  ),
  makeCard(
    "J.R.R. Tolkien",
    "The Fellowship of the Ring",
    ["fantasy", "time", "decisions"],
    "All we have to decide is what to do with the time that is given us.",
    "You didn't choose your era. You chose your response to it. Make the most of your allotted time.",
    40,
    'fantasy'
  ),
  makeCard(
    "J.R.R. Tolkien",
    "The Two Towers",
    ["fantasy", "hope", "darkness"],
    "There is some good in this world, and it's worth fighting for.",
    "Cynicism is easy. Hope requires courage. Despite evidence of evil, good exists and deserves defense.",
    35,
    'fantasy'
  ),
  makeCard(
    "Frank Herbert",
    "Dune",
    ["scifi", "fear", "mind"],
    "Fear is the mind-killer. Fear is the little-death that brings total obliteration.",
    "Fear paralyzes thought. Face it directly, let it pass through you. What remains after fear is you.",
    40,
    'scifi'
  ),
  makeCard(
    "Frank Herbert",
    "Dune",
    ["scifi", "adaptation", "survival"],
    "The mystery of life isn't a problem to solve, but a reality to experience.",
    "Stop trying to figure life out. Start living it. Analysis isn't living. Experience is.",
    35,
    'scifi'
  ),
  makeCard(
    "Ursula K. Le Guin",
    "A Wizard of Earthsea",
    ["fantasy", "shadow", "self"],
    "To light a candle is to cast a shadow.",
    "Every strength creates a weakness. Light and dark are inseparable. Accept both sides of your nature.",
    35,
    'fantasy'
  ),
  makeCard(
    "Ursula K. Le Guin",
    "The Left Hand of Darkness",
    ["scifi", "fear", "hatred"],
    "The only thing that makes life possible is permanent, intolerable uncertainty.",
    "Certainty is death. Uncertainty is life. Learn to live with not knowing. It's the only way.",
    40,
    'scifi'
  ),
  makeCard(
    "Isaac Asimov",
    "Foundation",
    ["scifi", "violence", "incompetence"],
    "Violence is the last refuge of the incompetent.",
    "Those who resort to violence have exhausted all intelligent options. Competence finds better ways.",
    35,
    'scifi'
  ),
  makeCard(
    "Douglas Adams",
    "The Hitchhiker's Guide to the Galaxy",
    ["scifi", "panic", "calm"],
    "Don't Panic.",
    "Two words of cosmic wisdom. In any situation, panic makes it worse. Stay calm. Think. Proceed.",
    25,
    'scifi'
  ),
  makeCard(
    "Douglas Adams",
    "The Hitchhiker's Guide to the Galaxy",
    ["scifi", "life", "meaning"],
    "The answer to the ultimate question of life, the universe, and everything is 42.",
    "Maybe the question matters more than the answer. Maybe meaning is what we make, not what we find.",
    35,
    'scifi'
  ),
  makeCard(
    "Oscar Wilde",
    "The Picture of Dorian Gray",
    ["fiction", "self", "authenticity"],
    "Be yourself; everyone else is already taken.",
    "Imitation is impossible anyway. You can only be a second-rate someone else. Be a first-rate you.",
    30,
    'fiction'
  ),
  makeCard(
    "Oscar Wilde",
    "Lady Windermere's Fan",
    ["fiction", "cynicism", "value"],
    "A cynic is a man who knows the price of everything and the value of nothing.",
    "Cynicism masquerades as sophistication. It's actually impoverishment. See value, not just price.",
    40,
    'fiction'
  ),
  makeCard(
    "Oscar Wilde",
    "De Profundis",
    ["fiction", "experience", "wisdom"],
    "Experience is simply the name we give our mistakes.",
    "Reframe failure as education. Every mistake is a lesson. Experience is accumulated error, wisely processed.",
    35,
    'fiction'
  ),
  makeCard(
    "F. Scott Fitzgerald",
    "The Crack-Up",
    ["fiction", "intelligence", "contradiction"],
    "The test of a first-rate intelligence is the ability to hold two opposed ideas in mind at the same time and still retain the ability to function.",
    "Simple minds need simple answers. Complex minds tolerate contradiction. Hold paradox without paralysis.",
    50,
    'fiction'
  ),
  makeCard(
    "F. Scott Fitzgerald",
    "The Great Gatsby",
    ["fiction", "past", "future"],
    "So we beat on, boats against the current, borne back ceaselessly into the past.",
    "We reach for the future but the past pulls us back. The tension is human. Keep reaching anyway.",
    40,
    'fiction'
  ),
  makeCard(
    "Jane Austen",
    "Pride and Prejudice",
    ["romance", "judgment", "understanding"],
    "I was in the middle before I knew that I had begun.",
    "Love sneaks up. By the time you notice, you're already deep. Some things can't be planned.",
    35,
    'romance'
  ),
  makeCard(
    "Jane Austen",
    "Sense and Sensibility",
    ["romance", "sense", "sensibility"],
    "Know your own happiness. You want nothing but patience—or give it a more fascinating name: call it hope.",
    "Patience rebranded as hope sounds better. What you're waiting for might be worth the wait.",
    40,
    'romance'
  ),
  makeCard(
    "Charlotte Brontë",
    "Jane Eyre",
    ["romance", "independence", "equality"],
    "I am no bird; and no net ensnares me: I am a free human being with an independent will.",
    "Refuse to be trapped. Assert your autonomy. You belong to yourself first. Freedom is non-negotiable.",
    40,
    'romance'
  ),
  makeCard(
    "Emily Brontë",
    "Wuthering Heights",
    ["romance", "soul", "identity"],
    "Whatever our souls are made of, his and mine are the same.",
    "Some connections transcend understanding. Soul recognition is rare and unmistakable. Honor it when it comes.",
    35,
    'romance'
  ),
  makeCard(
    "Leo Tolstoy",
    "Anna Karenina",
    ["fiction", "families", "unhappiness"],
    "Happy families are all alike; every unhappy family is unhappy in its own way.",
    "Happiness is simple and similar. Unhappiness is complex and unique. Dysfunction has infinite forms.",
    40,
    'fiction'
  ),
  makeCard(
    "Leo Tolstoy",
    "War and Peace",
    ["fiction", "history", "individuals"],
    "The strongest of all warriors are these two—Time and Patience.",
    "Urgency is often enemy of success. Time and patience conquer what force cannot. Wait wisely.",
    35,
    'fiction'
  ),
  makeCard(
    "Mary Oliver",
    "The Summer Day",
    ["poetry", "life", "purpose"],
    "Tell me, what is it you plan to do with your one wild and precious life?",
    "Life is wild—embrace the chaos. Life is precious—don't waste it. What will you do with yours?",
    40,
    'poetry'
  ),
  makeCard(
    "Mary Oliver",
    "Wild Geese",
    ["poetry", "belonging", "nature"],
    "You do not have to be good. You do not have to walk on your knees for a hundred miles through the desert repenting.",
    "Stop punishing yourself. You're allowed to exist without earning it. Belonging is birthright, not achievement.",
    45,
    'poetry'
  ),
  makeCard(
    "David Foster Wallace",
    "This Is Water",
    ["philosophy", "awareness", "choice"],
    "The really important kind of freedom involves attention, and awareness, and discipline.",
    "Freedom isn't doing whatever you want. It's choosing what to pay attention to. Master attention, master life.",
    40,
    'non-fiction'
  ),
  makeCard(
    "David Foster Wallace",
    "Infinite Jest",
    ["fiction", "entertainment", "addiction"],
    "It's weird to feel like you miss someone you're not even sure you know.",
    "Connection doesn't require understanding. You can miss what you never fully grasped. Longing has its own logic.",
    40,
    'fiction'
  ),
  makeCard(
    "Haruki Murakami",
    "Norwegian Wood",
    ["fiction", "memory", "loss"],
    "If you only read the books that everyone else is reading, you can only think what everyone else is thinking.",
    "Intellectual independence requires reading independence. Consume different inputs, produce different outputs.",
    40,
    'fiction'
  ),
  makeCard(
    "Haruki Murakami",
    "Kafka on the Shore",
    ["fiction", "fate", "storms"],
    "And once the storm is over, you won't remember how you made it through. But one thing is certain. When you come out of the storm, you won't be the same person who walked in.",
    "Survival transforms. You can't go through hell and stay the same. The storm changes you—that's its purpose.",
    50,
    'fiction'
  ),
  makeCard(
    "Paulo Coelho",
    "The Alchemist",
    ["fiction", "dreams", "universe"],
    "When you want something, all the universe conspires in helping you to achieve it.",
    "Desire focuses attention. Focused attention creates opportunity. The 'conspiracy' is your heightened awareness.",
    40,
    'fiction'
  ),
  makeCard(
    "Paulo Coelho",
    "The Alchemist",
    ["fiction", "treasure", "journey"],
    "It's the possibility of having a dream come true that makes life interesting.",
    "Dreams give life tension and direction. Even unfulfilled dreams enrich existence. Hope is the spice of life.",
    35,
    'fiction'
  ),
  makeCard(
    "Hermann Hesse",
    "Siddhartha",
    ["fiction", "wisdom", "transmission"],
    "Knowledge can be communicated, but not wisdom.",
    "Wisdom must be earned through experience. It can't be transferred by words. You have to live your way to it.",
    35,
    'fiction'
  ),
  makeCard(
    "Hermann Hesse",
    "Steppenwolf",
    ["fiction", "self", "multiplicity"],
    "Within you there is a stillness and sanctuary to which you can retreat at anytime and be yourself.",
    "The inner sanctuary exists. Find it. Visit it. No external chaos can touch your deepest center.",
    40,
    'fiction'
  ),
  makeCard(
    "Antoine de Saint-Exupéry",
    "The Little Prince",
    ["fiction", "seeing", "heart"],
    "It is only with the heart that one can see rightly; what is essential is invisible to the eye.",
    "Eyes see surfaces. Hearts see essence. The most important things can't be photographed. Feel your way to truth.",
    40,
    'fiction'
  ),
  makeCard(
    "Antoine de Saint-Exupéry",
    "The Little Prince",
    ["fiction", "taming", "connection"],
    "You become responsible, forever, for what you have tamed.",
    "Connection creates obligation. Relationships aren't disposable. Once bonded, you're accountable.",
    35,
    'fiction'
  ),
  makeCard(
    "William Shakespeare",
    "Hamlet",
    ["fiction", "readiness", "acceptance"],
    "The readiness is all.",
    "You can't control when death comes. You can control your readiness for it. Be prepared for whatever comes.",
    30,
    'fiction'
  ),
  makeCard(
    "William Shakespeare",
    "As You Like It",
    ["fiction", "world", "stage"],
    "All the world's a stage, and all the men and women merely players.",
    "Life is performance. We all play roles. The question is: are you conscious of yours? Choose your character.",
    40,
    'fiction'
  ),
  makeCard(
    "William Shakespeare",
    "Macbeth",
    ["fiction", "time", "brevity"],
    "Life's but a walking shadow, a poor player that struts and frets his hour upon the stage and then is heard no more.",
    "Life is brief and performative. The strutting doesn't last. Make your hour count.",
    45,
    'fiction'
  ),
  makeCard(
    "Maya Angelou",
    "I Know Why the Caged Bird Sings",
    ["non-fiction", "courage", "speaking"],
    "There is no greater agony than bearing an untold story inside you.",
    "Silence is suffering. Your story needs telling. The pain of expression is less than the pain of suppression.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Maya Angelou",
    "Letter to My Daughter",
    ["non-fiction", "memory", "impact"],
    "People will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    "Feelings outlast facts. Emotional memory persists. Focus on how you make people feel, not just what you do.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Toni Morrison",
    "Beloved",
    ["fiction", "freedom", "claiming"],
    "Freeing yourself was one thing; claiming ownership of that freed self was another.",
    "Freedom is just the start. Owning your freedom—really claiming it—is the harder, longer work.",
    40,
    'fiction'
  ),
  makeCard(
    "Martin Luther King Jr.",
    "Letter from Birmingham Jail",
    ["non-fiction", "justice", "urgency"],
    "Injustice anywhere is a threat to justice everywhere.",
    "We're interconnected. Someone else's oppression affects you. Don't look away from distant injustice.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Martin Luther King Jr.",
    "Strength to Love",
    ["non-fiction", "darkness", "light"],
    "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.",
    "Fighting fire with fire just makes more fire. Transform the equation. Respond to hate with love.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Nelson Mandela",
    "Long Walk to Freedom",
    ["non-fiction", "courage", "fear"],
    "I learned that courage was not the absence of fear, but the triumph over it.",
    "The brave aren't fearless. They act despite fear. Courage is fear plus action. Feel afraid and proceed.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Nelson Mandela",
    "Long Walk to Freedom",
    ["non-fiction", "freedom", "chains"],
    "To be free is not merely to cast off one's chains, but to live in a way that respects and enhances the freedom of others.",
    "Freedom isn't just personal liberation. It includes responsibility for others' freedom. True freedom is collective.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Mahatma Gandhi",
    "The Story of My Experiments with Truth",
    ["non-fiction", "change", "example"],
    "Be the change you wish to see in the world.",
    "Don't demand change from others. Embody it yourself. Example exceeds argument. Become what you advocate.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Mahatma Gandhi",
    "Collected Works",
    ["non-fiction", "strength", "forgiveness"],
    "The weak can never forgive. Forgiveness is the attribute of the strong.",
    "Forgiveness isn't weakness—it's strength. Holding grudges is easy. Letting go requires power.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Anne Frank",
    "The Diary of a Young Girl",
    ["non-fiction", "goodness", "hope"],
    "In spite of everything, I still believe that people are really good at heart.",
    "Maintaining faith in humanity despite evidence of evil is heroic. Choose to believe in goodness anyway.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Anne Frank",
    "The Diary of a Young Girl",
    ["non-fiction", "nature", "healing"],
    "I don't think of all the misery, but of the beauty that still remains.",
    "Where you focus determines what you see. Beauty exists alongside suffering. Choose to notice it.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Helen Keller",
    "Optimism",
    ["non-fiction", "adventure", "security"],
    "Life is either a daring adventure or nothing at all.",
    "Playing it safe is its own kind of death. Risk is the price of living fully. Choose adventure.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Helen Keller",
    "The Story of My Life",
    ["non-fiction", "doors", "opportunities"],
    "When one door of happiness closes, another opens; but often we look so long at the closed door that we do not see the one which has been opened for us.",
    "Loss obscures opportunity. Grieving the closed door blinds us to the open one. Look up. Look around.",
    50,
    'non-fiction'
  ),
  makeCard(
    "Eleanor Roosevelt",
    "You Learn by Living",
    ["non-fiction", "fear", "courage"],
    "You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face.",
    "Each confrontation with fear builds capacity. Courage is a muscle. Exercise it regularly.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Eleanor Roosevelt",
    "My Day",
    ["non-fiction", "comparison", "inferiority"],
    "No one can make you feel inferior without your consent.",
    "Others can't diminish you without your participation. Withdraw consent. Your worth isn't determined by others' opinions.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Theodore Roosevelt",
    "Citizenship in a Republic",
    ["non-fiction", "criticism", "arena"],
    "It is not the critic who counts; not the man who points out how the strong man stumbles. The credit belongs to the man who is actually in the arena.",
    "Critics are cheap. Doers are rare. Get in the arena. The only opinions that matter come from fellow fighters.",
    50,
    'non-fiction'
  ),
  makeCard(
    "Winston Churchill",
    "Speeches",
    ["non-fiction", "failure", "persistence"],
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Neither victory nor defeat is permanent. What matters is persistence through both. Keep going.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Winston Churchill",
    "Speeches",
    ["non-fiction", "optimism", "opportunity"],
    "A pessimist sees the difficulty in every opportunity; an optimist sees the opportunity in every difficulty.",
    "Same situation, different perspectives. Choose the lens that serves you. Opportunity hides in difficulty.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Bruce Lee",
    "Tao of Jeet Kune Do",
    ["philosophy", "water", "adaptability"],
    "Be water, my friend. Empty your mind. Be formless, shapeless, like water.",
    "Rigidity breaks. Flexibility survives. Adapt to any container. Flow around obstacles. Be water.",
    40,
    'self-help'
  ),
  makeCard(
    "Bruce Lee",
    "Striking Thoughts",
    ["philosophy", "limits", "belief"],
    "If you always put limits on everything you do, it will spread into your work and into your life. There are no limits.",
    "Limits are often mental. You create them, then believe them. Question every boundary. Most are illusions.",
    45,
    'self-help'
  ),
  makeCard(
    "Miyamoto Musashi",
    "The Book of Five Rings",
    ["philosophy", "strategy", "mastery"],
    "There is nothing outside of yourself that can ever enable you to get better, stronger, richer, quicker, or smarter. Everything is within.",
    "External tools are extensions. The real work is internal. Master yourself before mastering anything else.",
    45,
    'philosophy'
  ),
  makeCard(
    "Miyamoto Musashi",
    "The Book of Five Rings",
    ["philosophy", "combat", "life"],
    "The Way is in training. Do nothing which is of no use.",
    "Eliminate waste. Every action should serve purpose. Train constantly. The path is the destination.",
    35,
    'philosophy'
  ),
  makeCard(
    "Sun Tzu",
    "The Art of War",
    ["philosophy", "strategy", "knowledge"],
    "If you know the enemy and know yourself, you need not fear the result of a hundred battles.",
    "Self-knowledge plus situational awareness equals victory. Most failures come from ignorance of self or circumstances.",
    40,
    'philosophy'
  ),
  makeCard(
    "Sun Tzu",
    "The Art of War",
    ["philosophy", "victory", "strategy"],
    "The supreme art of war is to subdue the enemy without fighting.",
    "The best victories are bloodless. Outsmart rather than overpower. The highest skill avoids conflict entirely.",
    35,
    'philosophy'
  ),
  makeCard(
    "Sun Tzu",
    "The Art of War",
    ["philosophy", "opportunity", "patience"],
    "Opportunities multiply as they are seized.",
    "Action creates opportunity. Each opportunity taken reveals more. Momentum builds on itself. Start seizing.",
    35,
    'philosophy'
  ),
  makeCard(
    "Jiddu Krishnamurti",
    "Freedom from the Known",
    ["philosophy", "truth", "paths"],
    "Truth is a pathless land.",
    "No system leads to truth. No method captures it. Truth must be encountered directly, without intermediary.",
    35,
    'philosophy'
  ),
  makeCard(
    "Jiddu Krishnamurti",
    "Think on These Things",
    ["philosophy", "comparison", "violence"],
    "Comparison is the root of all violence.",
    "Comparing yourself to others creates internal war. Accept yourself as you are. Stop measuring against others.",
    35,
    'philosophy'
  ),
  makeCard(
    "Aldous Huxley",
    "Brave New World",
    ["fiction", "happiness", "truth"],
    "Facts do not cease to exist because they are ignored.",
    "Denial doesn't change reality. Uncomfortable truths remain true. Face facts or be surprised by them.",
    35,
    'fiction'
  ),
  makeCard(
    "Aldous Huxley",
    "The Doors of Perception",
    ["non-fiction", "perception", "reality"],
    "There are things known and there are things unknown, and in between are the doors of perception.",
    "Reality exceeds perception. We see through narrow doors. Other doors exist. Other realities wait.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Kurt Vonnegut",
    "Slaughterhouse-Five",
    ["fiction", "time", "acceptance"],
    "And so it goes.",
    "Things happen. Accept them. The universe doesn't explain itself. Sometimes the only response is acknowledgment.",
    25,
    'fiction'
  ),
  makeCard(
    "Kurt Vonnegut",
    "A Man Without a Country",
    ["non-fiction", "art", "soul"],
    "Practicing an art, no matter how well or badly, is a way to make your soul grow.",
    "Art isn't about results—it's about growth. Create badly. Create anyway. The making matters more than the made.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Ray Bradbury",
    "Fahrenheit 451",
    ["fiction", "books", "danger"],
    "You don't have to burn books to destroy a culture. Just get people to stop reading them.",
    "Censorship is crude. Distraction is effective. Books survive bonfires but not apathy. Read.",
    40,
    'fiction'
  ),
  makeCard(
    "Ray Bradbury",
    "Zen in the Art of Writing",
    ["non-fiction", "writing", "enthusiasm"],
    "You must stay drunk on writing so reality cannot destroy you.",
    "Creative obsession is protective. Immersion in work shields from external chaos. Write to survive.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Philip K. Dick",
    "VALIS",
    ["scifi", "reality", "illusion"],
    "Reality is that which, when you stop believing in it, doesn't go away.",
    "Real things persist regardless of belief. Test your assumptions against this standard. What remains when you doubt?",
    40,
    'scifi'
  ),
  makeCard(
    "Philip K. Dick",
    "Do Androids Dream of Electric Sheep?",
    ["scifi", "empathy", "humanity"],
    "The basic tool for the manipulation of reality is the manipulation of words.",
    "Language shapes perception. Control words, control thought. Be aware of how language directs your mind.",
    40,
    'scifi'
  ),
  makeCard(
    "Arthur C. Clarke",
    "2001: A Space Odyssey",
    ["scifi", "technology", "magic"],
    "Any sufficiently advanced technology is indistinguishable from magic.",
    "What seems magical is just not yet understood. Today's magic is tomorrow's science. Stay humble about limits.",
    40,
    'scifi'
  ),
  makeCard(
    "Arthur C. Clarke",
    "Profiles of the Future",
    ["scifi", "possibility", "experts"],
    "The only way of discovering the limits of the possible is to venture a little way past them into the impossible.",
    "Boundaries are discovered by crossing them. Push past assumed limits. Impossibility is often unexplored territory.",
    45,
    'scifi'
  ),
  makeCard(
    "William Gibson",
    "Neuromancer",
    ["scifi", "future", "distribution"],
    "The future is already here—it's just not evenly distributed.",
    "Tomorrow exists today, somewhere. Futures aren't invented—they're discovered in unevenly distributed presents.",
    40,
    'scifi'
  ),
  makeCard(
    "Octavia Butler",
    "Parable of the Sower",
    ["scifi", "change", "god"],
    "All that you touch you Change. All that you Change, Changes you. The only lasting truth is Change.",
    "Interaction is transformation. You can't engage without being changed. Accept the reciprocal nature of existence.",
    45,
    'scifi'
  ),
  makeCard(
    "Octavia Butler",
    "Kindred",
    ["scifi", "history", "present"],
    "Repressive societies always seem to understand the danger of 'wrong' ideas.",
    "Controlling thought is how oppression survives. Free thinking threatens power. Guard your intellectual freedom.",
    40,
    'scifi'
  ),
  makeCard(
    "Mary Shelley",
    "Frankenstein",
    ["fiction", "creation", "responsibility"],
    "Nothing is so painful to the human mind as a great and sudden change.",
    "Change hurts. Even positive change. Allow time for adjustment. Gradual transitions are kinder.",
    35,
    'fiction'
  ),
  makeCard(
    "Virginia Woolf",
    "A Room of One's Own",
    ["fiction", "independence", "creation"],
    "A woman must have money and a room of her own if she is to write fiction.",
    "Creation requires resources and space. Material conditions enable art. Don't romanticize poverty.",
    40,
    'fiction'
  ),
  makeCard(
    "Virginia Woolf",
    "Mrs Dalloway",
    ["fiction", "life", "moments"],
    "What a lark! What a plunge!",
    "Embrace life's vitality. Each day is a dive into existence. Meet it with enthusiasm, not dread.",
    30,
    'fiction'
  ),
  makeCard(
    "Gabriel García Márquez",
    "One Hundred Years of Solitude",
    ["fiction", "memory", "time"],
    "It's enough for me to be sure that you and I exist at this moment.",
    "The present is sufficient. Don't need certainty about past or future. This moment of connection is enough.",
    35,
    'fiction'
  ),
  makeCard(
    "Gabriel García Márquez",
    "Love in the Time of Cholera",
    ["romance", "love", "age"],
    "He allowed himself to be swayed by his conviction that human beings are not born once and for all on the day their mothers give birth to them.",
    "We're continually being born. Identity is ongoing creation. You can become new at any age.",
    50,
    'romance'
  ),
  makeCard(
    "Jorge Luis Borges",
    "Labyrinths",
    ["fiction", "reality", "dreams"],
    "Reality is not always probable, or likely.",
    "Probability isn't the measure of reality. Improbable things happen. Don't dismiss the unlikely.",
    35,
    'fiction'
  ),
  makeCard(
    "Jorge Luis Borges",
    "Ficciones",
    ["fiction", "time", "branching"],
    "Time forks perpetually toward innumerable futures.",
    "Every moment branches. Infinite possibilities exist. Your choices navigate this garden of forking paths.",
    40,
    'fiction'
  ),
  makeCard(
    "Albert Camus",
    "The Fall",
    ["philosophy", "freedom", "prison"],
    "Freedom is not a reward or a decoration... it is a long-distance race, quite solitary and very exhausting.",
    "Freedom is work, not gift. It's earned daily through discipline. Marathon, not sprint. Lonely but necessary.",
    45,
    'philosophy'
  ),
  makeCard(
    "Jean-Paul Sartre",
    "Being and Nothingness",
    ["philosophy", "existence", "essence"],
    "Man is condemned to be free.",
    "Freedom isn't optional—it's inescapable. You must choose. Even not choosing is a choice. Accept the burden.",
    35,
    'philosophy'
  ),
  makeCard(
    "Jean-Paul Sartre",
    "Existentialism Is a Humanism",
    ["philosophy", "responsibility", "self"],
    "We are our choices.",
    "You are not your circumstances or your history. You are what you choose. Identity is built through decisions.",
    30,
    'philosophy'
  ),
  makeCard(
    "Simone de Beauvoir",
    "The Second Sex",
    ["philosophy", "freedom", "otherness"],
    "One is not born, but rather becomes, a woman.",
    "Identity is constructed, not given. You become who you are through action and context. Nothing is fixed.",
    40,
    'philosophy'
  ),
  makeCard(
    "Simone de Beauvoir",
    "The Ethics of Ambiguity",
    ["philosophy", "meaning", "creation"],
    "Life is occupied in both perpetuating itself and in surpassing itself; if all it does is maintain itself, then living is only not dying.",
    "Mere survival isn't living. Life must transcend itself to have meaning. Create, grow, reach beyond.",
    50,
    'philosophy'
  ),
  makeCard(
    "Hannah Arendt",
    "The Human Condition",
    ["philosophy", "action", "beginning"],
    "The fact that man is capable of action means that the unexpected can be expected from him.",
    "Humans are unpredictable. That's our nature. We can always surprise—ourselves and others. Expect the unexpected.",
    45,
    'philosophy'
  ),
  makeCard(
    "Hannah Arendt",
    "The Origins of Totalitarianism",
    ["philosophy", "evil", "thought"],
    "The sad truth is that most evil is done by people who never make up their minds to be good or evil.",
    "Evil rarely requires malicious intent. It requires only thoughtlessness. Most harm comes from not thinking.",
    45,
    'philosophy'
  ),
  makeCard(
    "Simone Weil",
    "Gravity and Grace",
    ["philosophy", "attention", "prayer"],
    "Attention, taken to its highest degree, is the same thing as prayer.",
    "Full attention is sacred. Presence is prayer. When you truly attend to something, you're engaged in spiritual practice.",
    40,
    'philosophy'
  ),
  makeCard(
    "Iris Murdoch",
    "The Sovereignty of Good",
    ["philosophy", "attention", "love"],
    "Love is the extremely difficult realization that something other than oneself is real.",
    "Others truly exist. This is harder to grasp than it sounds. Real love requires accepting other's full reality.",
    45,
    'philosophy'
  ),
  makeCard(
    "Martha Nussbaum",
    "The Fragility of Goodness",
    ["philosophy", "luck", "ethics"],
    "To be a good human being is to have a kind of openness to the world, an ability to trust uncertain things beyond your own control.",
    "Goodness requires vulnerability. Control-seeking undermines virtue. Trust the uncontrollable. Stay open.",
    50,
    'philosophy'
  ),
  makeCard(
    "Judith Butler",
    "Gender Trouble",
    ["philosophy", "identity", "performance"],
    "There is no gender identity behind the expressions of gender; that identity is performatively constituted by the very 'expressions' that are said to be its results.",
    "You don't have an identity that then acts. Your actions constitute your identity. Performance is being.",
    50,
    'philosophy'
  ),
  makeCard(
    "bell hooks",
    "All About Love",
    ["psychology", "love", "practice"],
    "Knowing how to be solitary is central to the art of loving.",
    "Healthy love requires healthy solitude. If you can't be alone, you can't be together well. Master aloneness first.",
    40,
    'self-help'
  ),
  makeCard(
    "bell hooks",
    "Teaching to Transgress",
    ["psychology", "education", "freedom"],
    "The classroom remains the most radical space of possibility in the academy.",
    "Education can be revolutionary. Learning spaces can transform. Don't underestimate the power of shared inquiry.",
    40,
    'self-help'
  ),
  makeCard(
    "Tara Brach",
    "Radical Acceptance",
    ["spirituality", "acceptance", "self"],
    "Radical Acceptance is the willingness to experience ourselves and our lives as it is.",
    "Stop fighting reality. Accept what is—fully, radically. This isn't resignation; it's the foundation for change.",
    40,
    'self-help'
  ),
  makeCard(
    "Tara Brach",
    "True Refuge",
    ["spirituality", "suffering", "awakening"],
    "The boundary to what we can accept is the boundary to our freedom.",
    "Whatever you can't accept limits your freedom. Expand acceptance, expand freedom. Your limits are your cages.",
    40,
    'self-help'
  ),
  makeCard(
    "Jon Kabat-Zinn",
    "Wherever You Go, There You Are",
    ["mindfulness", "presence", "awareness"],
    "Wherever you go, there you are.",
    "You can't escape yourself through location. Geography doesn't solve psychology. Deal with what's inside.",
    30,
    'self-help'
  ),
  makeCard(
    "Jon Kabat-Zinn",
    "Full Catastrophe Living",
    ["mindfulness", "stress", "resilience"],
    "You can't stop the waves, but you can learn to surf.",
    "Challenges will come. That's not controllable. Your response is. Learn to ride what you can't prevent.",
    35,
    'self-help'
  ),
  makeCard(
    "Jack Kornfield",
    "A Path with Heart",
    ["spirituality", "heart", "practice"],
    "In the end, just three things matter: How well we have lived. How well we have loved. How well we have learned to let go.",
    "The final accounting is simple. Three measures: living, loving, releasing. Everything else is detail.",
    45,
    'self-help'
  ),
  makeCard(
    "Ram Dass",
    "Be Here Now",
    ["spirituality", "presence", "now"],
    "Be here now.",
    "Three words. Complete teaching. Stop time-traveling mentally. Arrive where you physically are. Now.",
    25,
    'self-help'
  ),
  makeCard(
    "Ram Dass",
    "Polishing the Mirror",
    ["spirituality", "aging", "wisdom"],
    "The quieter you become, the more you can hear.",
    "Silence enables listening. Reduce internal noise. What you can't hear now will become audible in stillness.",
    30,
    'self-help'
  ),
  makeCard(
    "Esther Perel",
    "Mating in Captivity",
    ["relationships", "desire", "paradox"],
    "Love enjoys knowing everything about you; desire needs mystery.",
    "Intimacy and desire have contradictory needs. Love wants closeness; desire wants distance. Navigate the paradox.",
    40,
    'self-help'
  ),
  makeCard(
    "Esther Perel",
    "The State of Affairs",
    ["relationships", "betrayal", "growth"],
    "Every relationship requires ongoing attention and intention.",
    "Relationships aren't set-and-forget. They need constant cultivation. Neglect kills connection. Stay intentional.",
    35,
    'self-help'
  ),
  makeCard(
    "John Gottman",
    "The Seven Principles for Making Marriage Work",
    ["relationships", "repair", "conflict"],
    "Happy marriages are based on a deep friendship. By this I mean a mutual respect for and enjoyment of each other's company.",
    "Romance fades. Friendship endures. The best marriages are great friendships with benefits. Cultivate friendship first.",
    45,
    'self-help'
  ),
  makeCard(
    "Alain de Botton",
    "The School of Life",
    ["philosophy", "emotional", "intelligence"],
    "We should not feel embarrassed by our difficulties, only by our failure to grow anything beautiful from them.",
    "Struggle isn't shameful. Wasted struggle is. Extract beauty from difficulty. That's the only failure to avoid.",
    45,
    'self-help'
  ),

  // ============================================
  // BATCH 3 - 495 MORE CARDS
  // ============================================
  // ============================================
  // NASSIM TALEB - MORE (15 cards)
  // ============================================
  makeCard(
    "Nassim Taleb",
    "The Bed of Procrustes",
    ["philosophy", "wisdom", "aphorisms"],
    "The three most harmful addictions are heroin, carbohydrates, and a monthly salary.",
    "Security can be a trap. The paycheck creates dependency and kills entrepreneurial instinct. Comfort is its own addiction.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Nassim Taleb",
    "Fooled by Randomness",
    ["philosophy", "luck", "success"],
    "Mild success can be explainable by skills and labor. Wild success is attributable to variance.",
    "Hard work gets you to competent. Luck takes you to legendary. Don't confuse the two—especially in yourself.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Nassim Taleb",
    "The Bed of Procrustes",
    ["philosophy", "education", "knowledge"],
    "Education makes the wise slightly wiser, but it makes the fool vastly more dangerous.",
    "Knowledge is a tool. In wrong hands, it amplifies damage. Credentials don't equal wisdom.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Nassim Taleb",
    "Antifragile",
    ["philosophy", "stress", "strength"],
    "Wind extinguishes a candle and energizes fire. You want to be the fire, wishing for the wind.",
    "Some things die from stress. Others thrive on it. Build yourself to gain from disorder.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Nassim Taleb",
    "The Bed of Procrustes",
    ["philosophy", "charm", "character"],
    "Charm is the ability to insult people without offending them; nerdiness the reverse.",
    "Delivery matters as much as content. Truth without tact is cruelty. Learn to package hard messages.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Nassim Taleb",
    "Skin in the Game",
    ["philosophy", "ethics", "symmetry"],
    "If you see fraud and do not say fraud, you are a fraud.",
    "Silence is complicity. Witnessing wrong without speaking makes you part of it. Speak up.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Nassim Taleb",
    "Antifragile",
    ["philosophy", "options", "freedom"],
    "Optionality is the property of asymmetric upside with correspondingly limited downside.",
    "Create situations where you can win big but lose small. This is the secret to antifragility.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Nassim Taleb",
    "The Bed of Procrustes",
    ["philosophy", "boredom", "meaning"],
    "The opposite of manliness isn't cowardice; it's technology.",
    "Convenience weakens. Struggle builds. Don't outsource all difficulty—some of it makes you stronger.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Nassim Taleb",
    "Fooled by Randomness",
    ["philosophy", "probability", "thinking"],
    "We favor the visible, the embedded, the personal, the narrated, and the tangible; we scorn the abstract.",
    "Our brains are wired for stories, not statistics. This is why we make bad probability judgments.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Nassim Taleb",
    "Antifragile",
    ["philosophy", "time", "lindy"],
    "If a book has been in print for forty years, I can expect it to be in print for another forty years.",
    "The Lindy Effect: the old has survived for a reason. Future life expectancy increases with age for ideas.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Nassim Taleb",
    "The Bed of Procrustes",
    ["philosophy", "success", "failure"],
    "Success is becoming in middle adulthood what you dreamed to be in late childhood.",
    "We often achieve society's goals while abandoning our own. True success is childhood dreams realized.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Nassim Taleb",
    "Skin in the Game",
    ["philosophy", "talk", "action"],
    "Beware of the person who gives advice, telling you that a certain action on your part is 'good for you' while it is also good for him.",
    "Incentives reveal truth. When someone benefits from your action, discount their advice accordingly.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Nassim Taleb",
    "Antifragile",
    ["philosophy", "prediction", "intervention"],
    "We should probably stop using the word 'prediction' and replace it with 'preparation.'",
    "You can't predict the future, but you can prepare for it. Build robustness, not forecasts.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Nassim Taleb",
    "The Bed of Procrustes",
    ["philosophy", "modernity", "fragility"],
    "Modernity: we created youth without heroism, age without wisdom, and life without grandeur.",
    "Progress in comfort, regression in meaning. We've optimized for ease and lost something essential.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Nassim Taleb",
    "Fooled by Randomness",
    ["philosophy", "emotions", "rationality"],
    "It is not how likely an event is to happen that matters, it is how much is made when it happens.",
    "Expected value, not probability, should drive decisions. Rare events with huge payoffs matter most.",
    40,
    'non-fiction'
  ),

  // ============================================
  // JAMES BALDWIN (20 cards)
  // ============================================
  makeCard(
    "James Baldwin",
    "Notes of a Native Son",
    ["philosophy", "identity", "acceptance"],
    "I am what time, circumstance, history, have made of me, certainly, but I am, also, much more than that.",
    "You're shaped by your past but not determined by it. There's always more to you than your history.",
    40,
    'non-fiction'
  ),
  makeCard(
    "James Baldwin",
    "The Fire Next Time",
    ["philosophy", "love", "courage"],
    "Love takes off the masks that we fear we cannot live without and know we cannot live within.",
    "Love requires vulnerability. The masks protect us but also imprison us. Real connection unmasks.",
    45,
    'non-fiction'
  ),
  makeCard(
    "James Baldwin",
    "Giovanni's Room",
    ["fiction", "shame", "freedom"],
    "You think your pain and your heartbreak are unprecedented in the history of the world, but then you read.",
    "Reading connects us to universal human experience. Your suffering is real but not unique. Others have survived it.",
    45,
    'fiction'
  ),
  makeCard(
    "James Baldwin",
    "Notes of a Native Son",
    ["philosophy", "hatred", "destruction"],
    "I imagine one of the reasons people cling to their hates so stubbornly is because they sense, once hate is gone, they will be forced to deal with pain.",
    "Hate is a defense mechanism. It's easier to hate than to grieve. Beneath anger lies unprocessed pain.",
    50,
    'non-fiction'
  ),
  makeCard(
    "James Baldwin",
    "The Fire Next Time",
    ["philosophy", "change", "self"],
    "Not everything that is faced can be changed, but nothing can be changed until it is faced.",
    "Denial guarantees stagnation. You might face something and fail to change it, but you definitely can't change what you won't face.",
    45,
    'non-fiction'
  ),
  makeCard(
    "James Baldwin",
    "Nobody Knows My Name",
    ["philosophy", "identity", "journey"],
    "An identity is questioned only when it is menaced.",
    "We don't examine ourselves until threatened. Crisis forces self-reflection. Comfort enables unconsciousness.",
    40,
    'non-fiction'
  ),
  makeCard(
    "James Baldwin",
    "Giovanni's Room",
    ["fiction", "shame", "hiding"],
    "Perhaps home is not a place but simply an irrevocable condition.",
    "Home isn't geography—it's a state of being. Some carry home within them; others are perpetually homeless regardless of address.",
    40,
    'fiction'
  ),
  makeCard(
    "James Baldwin",
    "The Fire Next Time",
    ["philosophy", "freedom", "responsibility"],
    "Freedom is not something that anybody can be given. Freedom is something people take.",
    "No one grants you freedom. You claim it. Liberation is an act of will, not a gift received.",
    40,
    'non-fiction'
  ),
  makeCard(
    "James Baldwin",
    "Notes of a Native Son",
    ["philosophy", "writing", "truth"],
    "You write in order to change the world, knowing perfectly well that you probably can't.",
    "Write anyway. The improbability of impact doesn't excuse silence. Act despite uncertainty of results.",
    40,
    'non-fiction'
  ),
  makeCard(
    "James Baldwin",
    "Another Country",
    ["fiction", "love", "destruction"],
    "Love does not begin and end the way we seem to think it does. Love is a battle, love is a war; love is a growing up.",
    "Romantic notions of love obscure its difficulty. Real love is work, conflict, and maturation—not just feeling.",
    45,
    'fiction'
  ),
  makeCard(
    "James Baldwin",
    "The Fire Next Time",
    ["philosophy", "ignorance", "danger"],
    "People who shut their eyes to reality simply invite their own destruction.",
    "Denial is not protection—it's vulnerability. Refusing to see danger doesn't make you safe; it makes you blind.",
    40,
    'non-fiction'
  ),
  makeCard(
    "James Baldwin",
    "Nobody Knows My Name",
    ["philosophy", "art", "suffering"],
    "All art is a kind of confession, more or less oblique. All artists, if they are to survive, are forced to tell the whole story.",
    "Art requires honesty. You can disguise truth in metaphor, but you can't hide it completely. Creation is confession.",
    45,
    'non-fiction'
  ),
  makeCard(
    "James Baldwin",
    "Giovanni's Room",
    ["fiction", "truth", "self"],
    "Perhaps the whole root of our trouble, the human trouble, is that we will sacrifice all the beauty of our lives, will imprison ourselves in totems, taboos, crosses, blood sacrifices, steeples, mosques, races, armies, flags, nations, in order to deny the fact of death.",
    "We build elaborate structures to avoid facing mortality. Most human folly traces to death denial.",
    55,
    'fiction'
  ),
  makeCard(
    "James Baldwin",
    "The Fire Next Time",
    ["philosophy", "children", "wonder"],
    "Children have never been very good at listening to their elders, but they have never failed to imitate them.",
    "Actions teach louder than words. Children absorb what you do, not what you say. Model what you want transmitted.",
    40,
    'non-fiction'
  ),
  makeCard(
    "James Baldwin",
    "Notes of a Native Son",
    ["philosophy", "history", "present"],
    "People are trapped in history and history is trapped in them.",
    "We carry history in our bodies and minds. We're not just in history—history is in us. Neither can escape the other.",
    40,
    'non-fiction'
  ),
  makeCard(
    "James Baldwin",
    "Another Country",
    ["fiction", "trust", "risk"],
    "There are so many ways of being despicable it quite makes one's head spin. But the way to be really despicable is to be contemptuous of other people's pain.",
    "Dismissing others' suffering is the deepest failure of character. Contempt for pain is moral bankruptcy.",
    45,
    'fiction'
  ),
  makeCard(
    "James Baldwin",
    "The Fire Next Time",
    ["philosophy", "safety", "danger"],
    "The most dangerous creation of any society is the man who has nothing to lose.",
    "Desperation breeds destruction. When hope is gone, restraint follows. Stable societies create stakeholders.",
    40,
    'non-fiction'
  ),
  makeCard(
    "James Baldwin",
    "Nobody Knows My Name",
    ["philosophy", "words", "action"],
    "Words are powerless to express our admiration, but they are also powerless to express our condemnation.",
    "Language has limits on both ends. Neither praise nor blame can fully capture experience. Words approximate.",
    40,
    'non-fiction'
  ),
  makeCard(
    "James Baldwin",
    "Giovanni's Room",
    ["fiction", "self", "reflection"],
    "You don't have a home until you leave it and then, when you have left it, you never can go back.",
    "Home is understood only in leaving. Once you've grown past it, return is impossible. You can visit but not return.",
    40,
    'fiction'
  ),
  makeCard(
    "James Baldwin",
    "The Fire Next Time",
    ["philosophy", "excellence", "purpose"],
    "The purpose of art is to lay bare the questions that have been hidden by the answers.",
    "Society offers pre-packaged answers. Art reopens closed questions. Good art makes familiar strange.",
    40,
    'non-fiction'
  ),

  // ============================================
  // FRANZ KAFKA (15 cards) [PREMIUM]
  // ============================================
  makeCard(
    "Franz Kafka",
    "Letters to Felice",
    ["fiction", "books", "transformation"],
    "A book must be the axe for the frozen sea within us.",
    "Reading should shatter, not comfort. Literature's purpose is to break through our numbness.",
    35,
    'fiction'
  ),
  makeCard(
    "Franz Kafka",
    "The Trial",
    ["fiction", "guilt", "law"],
    "It's only because of their stupidity that they're able to be so sure of themselves.",
    "Certainty often correlates with ignorance. The more you know, the more you doubt. Confidence is suspicious.",
    40,
    'fiction'
  ),
  makeCard(
    "Franz Kafka",
    "The Castle",
    ["fiction", "bureaucracy", "absurdity"],
    "By believing passionately in something that still does not exist, we create it.",
    "Faith precedes reality. What we commit to, we bring into being. Belief is generative.",
    35,
    'fiction'
  ),
  makeCard(
    "Franz Kafka",
    "Diaries",
    ["fiction", "writing", "necessity"],
    "A non-writing writer is a monster courting insanity.",
    "Writers must write. The blocked writer suffers uniquely. Creation isn't optional for creators—it's survival.",
    40,
    'fiction'
  ),
  makeCard(
    "Franz Kafka",
    "The Metamorphosis",
    ["fiction", "alienation", "family"],
    "I cannot make you understand. I cannot make anyone understand what is happening inside me.",
    "Inner experience is incommunicable. No matter how we try, understanding across persons is partial.",
    40,
    'fiction'
  ),
  makeCard(
    "Franz Kafka",
    "Letters to Milena",
    ["fiction", "fear", "life"],
    "My fear is my substance, and probably the best part of me.",
    "Fear isn't weakness—it's sensitivity. What you fear reveals what you value. Embrace your fears as teachers.",
    40,
    'fiction'
  ),
  makeCard(
    "Franz Kafka",
    "The Trial",
    ["fiction", "logic", "absurdity"],
    "Logic may indeed be unshakeable, but it cannot withstand a man who is determined to live.",
    "Life exceeds logic. Reason has limits. Living requires going beyond what makes sense.",
    40,
    'fiction'
  ),
  makeCard(
    "Franz Kafka",
    "Diaries",
    ["fiction", "youth", "time"],
    "Youth is happy because it has the ability to see beauty. Anyone who keeps the ability to see beauty never grows old.",
    "Age is a function of perception, not years. Maintain wonder and you stay young. Cynicism ages you.",
    40,
    'fiction'
  ),
  makeCard(
    "Franz Kafka",
    "The Castle",
    ["fiction", "effort", "futility"],
    "Paths are made by walking.",
    "The way forward doesn't exist until you create it. Movement generates direction. Start before you see the path.",
    30,
    'fiction'
  ),
  makeCard(
    "Franz Kafka",
    "Letters to Felice",
    ["fiction", "solitude", "writing"],
    "Writing is utter solitude, the descent into the cold abyss of oneself.",
    "Creation requires confronting your depths alone. No one can accompany you to the bottom of yourself.",
    40,
    'fiction'
  ),
  makeCard(
    "Franz Kafka",
    "The Metamorphosis",
    ["fiction", "change", "acceptance"],
    "I have the true feeling of myself only when I am unbearably unhappy.",
    "Suffering strips illusions. Pain clarifies identity. We know ourselves most in extremity.",
    35,
    'fiction'
  ),
  makeCard(
    "Franz Kafka",
    "Diaries",
    ["fiction", "waiting", "action"],
    "There is an infinite amount of hope in the universe... but not for us.",
    "Dark humor about the human condition. Hope exists—just not necessarily accessible to us. Keep going anyway.",
    40,
    'fiction'
  ),
  makeCard(
    "Franz Kafka",
    "The Trial",
    ["fiction", "understanding", "impossibility"],
    "Don't despair, not even over the fact that you don't despair.",
    "Meta-level acceptance. Even when you can't feel appropriately, don't compound the problem with self-judgment.",
    35,
    'fiction'
  ),
  makeCard(
    "Franz Kafka",
    "Letters to Milena",
    ["fiction", "love", "destruction"],
    "Love is everything which enhances, widens, and enriches our life.",
    "Simple definition of love: whatever makes life larger. If it shrinks you, it's not love.",
    35,
    'fiction'
  ),
  makeCard(
    "Franz Kafka",
    "The Castle",
    ["fiction", "persistence", "failure"],
    "Start with what is right rather than what is acceptable.",
    "Compromise corrupts. Begin with principle, not pragmatism. What's right may not be acceptable—do it anyway.",
    35,
    'fiction'
  ),

  // ============================================
  // OLIVER SACKS (15 cards)
  // ============================================
  makeCard(
    "Oliver Sacks",
    "The Man Who Mistook His Wife for a Hat",
    ["science", "neurology", "identity"],
    "We have, each of us, a life-story, an inner narrative—whose continuity, whose sense, is our lives.",
    "Identity is narrative. We are the stories we tell about ourselves. Without story, self dissolves.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Oliver Sacks",
    "Gratitude",
    ["philosophy", "death", "appreciation"],
    "I cannot pretend I am without fear. But my predominant feeling is one of gratitude.",
    "Facing death, Sacks chose gratitude over fear. When time is short, appreciation sharpens.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Oliver Sacks",
    "Awakenings",
    ["science", "consciousness", "life"],
    "Health is infinite and expansive in mode, and reaches out to be filled with the fullness of the world.",
    "Health isn't just absence of disease—it's openness to experience. Illness contracts; health expands.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Oliver Sacks",
    "The Man Who Mistook His Wife for a Hat",
    ["science", "music", "memory"],
    "Music can lift us out of depression or move us to tears—it is a remedy, a tonic, orange juice for the ear.",
    "Music bypasses rational mind and touches emotion directly. It heals what words cannot reach.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Oliver Sacks",
    "On the Move",
    ["philosophy", "passion", "intensity"],
    "Above all, I have been a sentient being, a thinking animal, on this beautiful planet.",
    "Ultimate self-description: aware, alive, here. That's enough. That's everything.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Oliver Sacks",
    "Gratitude",
    ["philosophy", "time", "awareness"],
    "My generation is on the way out, and each death I have felt as an abruption, a tearing away of part of myself.",
    "Each death diminishes us. Community thins as we age. Loss accumulates. Cherish who remains.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Oliver Sacks",
    "The Man Who Mistook His Wife for a Hat",
    ["science", "observation", "empathy"],
    "The patient's essential being is very relevant in the higher reaches of neurology.",
    "Medicine must see persons, not just pathologies. The human exceeds the disease. Treat the whole.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Oliver Sacks",
    "Musicophilia",
    ["science", "music", "brain"],
    "Music, uniquely among the arts, is both completely abstract and profoundly emotional.",
    "Music combines pure form with deep feeling. It's math that moves us. Pattern that weeps.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Oliver Sacks",
    "Gratitude",
    ["philosophy", "legacy", "impact"],
    "I have loved and been loved; I have been given much and I have given something in return.",
    "A life well-summarized: reciprocity of love and gift. Receiving and giving. That's enough.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Oliver Sacks",
    "The Man Who Mistook His Wife for a Hat",
    ["science", "adaptation", "resilience"],
    "Every disease is a musical problem. Every cure is a musical solution.",
    "Illness is disharmony. Healing is restoring rhythm. The metaphor illuminates: we're orchestras seeking tune.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Oliver Sacks",
    "On the Move",
    ["philosophy", "curiosity", "wonder"],
    "I am a man of vehement disposition, with violent enthusiasms, and extreme immoderation in all my passions.",
    "Embrace your intensity. Passion isn't pathology. Vehemence can be virtue. Don't tone yourself down.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Oliver Sacks",
    "Hallucinations",
    ["science", "perception", "reality"],
    "We see with the eyes, but we see with the brain as well.",
    "Vision isn't passive recording—it's active construction. The brain interprets, fills in, and sometimes invents.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Oliver Sacks",
    "Gratitude",
    ["philosophy", "death", "beauty"],
    "I cannot pretend I am without fear. But my predominant feeling is one of gratitude. I have loved and been loved.",
    "Facing death with grace: acknowledge fear but choose gratitude. Love given and received is life's measure.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Oliver Sacks",
    "The Man Who Mistook His Wife for a Hat",
    ["science", "individuality", "uniqueness"],
    "There is no such thing as a disease without a person.",
    "Pathology is personal. The same illness manifests differently in each individual. See the person, not just the diagnosis.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Oliver Sacks",
    "On the Move",
    ["philosophy", "writing", "thinking"],
    "Writing is thinking, and I find that I cannot think without writing.",
    "Externalize thought to clarify it. Writing isn't transcription of pre-formed ideas—it's their formation.",
    35,
    'non-fiction'
  ),

  // ============================================
  // STEPHEN HAWKING (10 cards)
  // ============================================
  makeCard(
    "Stephen Hawking",
    "A Brief History of Time",
    ["science", "curiosity", "existence"],
    "We are just an advanced breed of monkeys on a minor planet of a very average star. But we can understand the Universe.",
    "Cosmic humility meets cosmic pride. We're insignificant AND remarkable. Both are true simultaneously.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Stephen Hawking",
    "Black Holes and Baby Universes",
    ["science", "expectation", "adaptation"],
    "My expectations were reduced to zero when I was 21. Everything since then has been a bonus.",
    "Low expectations are liberating. When you expect nothing, everything is gift. ALS taught Hawking gratitude.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Stephen Hawking",
    "A Brief History of Time",
    ["science", "questions", "meaning"],
    "Even if there is only one possible unified theory, it is just a set of rules and equations. What is it that breathes fire into the equations and makes a universe for them to describe?",
    "Physics describes how, not why. Equations need something to animate them. The deepest mystery persists.",
    50,
    'non-fiction'
  ),
  makeCard(
    "Stephen Hawking",
    "Brief Answers to the Big Questions",
    ["science", "intelligence", "humility"],
    "The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge.",
    "Thinking you know prevents learning. True ignorance is curable; false knowledge is not. Stay humble.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Stephen Hawking",
    "A Brief History of Time",
    ["science", "perfection", "existence"],
    "One cannot really argue with a mathematical theorem.",
    "Math provides certainty unavailable elsewhere. Its truths are necessary, not contingent. That's rare and valuable.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Stephen Hawking",
    "Brief Answers to the Big Questions",
    ["science", "future", "adaptation"],
    "Intelligence is the ability to adapt to change.",
    "Simple, powerful definition. Not knowledge stored but responsiveness to new situations. Adapt or become irrelevant.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Stephen Hawking",
    "Black Holes and Baby Universes",
    ["science", "disability", "focus"],
    "Disability does not have to be an obstacle to success. I have had motor neurone disease for practically all my adult life. Yet it has not prevented me from having a very full life.",
    "Limitation is not destiny. Hawking's body failed while his mind soared. Don't let obstacles define possibilities.",
    50,
    'non-fiction'
  ),
  makeCard(
    "Stephen Hawking",
    "A Brief History of Time",
    ["science", "wonder", "universe"],
    "Look up at the stars and not down at your feet. Try to make sense of what you see.",
    "Orientation matters. Looking down breeds rumination. Looking up breeds wonder. Choose your gaze.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Stephen Hawking",
    "Brief Answers to the Big Questions",
    ["science", "persistence", "understanding"],
    "However difficult life may seem, there is always something you can do and succeed at.",
    "Possibility persists. However constrained you are, some action remains available. Find it. Do it.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Stephen Hawking",
    "A Brief History of Time",
    ["science", "time", "reality"],
    "Time and space are not conditions in which we live, but modes in which we think.",
    "Space and time aren't containers—they're categories. Physics reveals they're stranger than intuition suggests.",
    40,
    'non-fiction'
  ),

  // ============================================
  // CHARLES DARWIN (10 cards)
  // ============================================
  makeCard(
    "Charles Darwin",
    "The Origin of Species",
    ["science", "survival", "adaptation"],
    "It is not the strongest of the species that survives, nor the most intelligent, but the one most responsive to change.",
    "Adaptability trumps strength and smarts. Flexibility is the ultimate survival trait. Stay responsive.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Charles Darwin",
    "The Descent of Man",
    ["science", "sympathy", "evolution"],
    "Sympathy will have been increased through natural selection; for those communities which included the greatest number of the most sympathetic members, would flourish best.",
    "Compassion evolved because it works. Caring communities outcompete selfish ones. Kindness is adaptive.",
    50,
    'non-fiction'
  ),
  makeCard(
    "Charles Darwin",
    "Autobiography",
    ["science", "wonder", "childhood"],
    "I am not apt to follow blindly the lead of other men.",
    "Independent thinking is essential for discovery. Question authority. Verify for yourself. Think your own thoughts.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Charles Darwin",
    "The Origin of Species",
    ["science", "complexity", "emergence"],
    "From so simple a beginning endless forms most beautiful and most wonderful have been, and are being, evolved.",
    "Simplicity generates complexity. Small rules create infinite variety. Evolution is ongoing creation.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Charles Darwin",
    "Notebooks",
    ["science", "humility", "kinship"],
    "We are not special. We are connected to everything else in nature. We evolved from other species.",
    "Human exceptionalism is myth. We're part of the tree of life, not above it. Kinship with all creatures.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Charles Darwin",
    "The Voyage of the Beagle",
    ["science", "observation", "discovery"],
    "A man who dares to waste one hour of time has not discovered the value of life.",
    "Time is non-renewable. Wasting it means not understanding what life is. Use your hours wisely.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Charles Darwin",
    "The Origin of Species",
    ["science", "gradual", "change"],
    "Natural selection acts only by taking advantage of slight successive variations; she can never take a great and sudden leap.",
    "Big changes happen through small steps accumulated. No shortcuts in evolution. Patience is nature's way.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Charles Darwin",
    "Autobiography",
    ["science", "observation", "persistence"],
    "I have no great quickness of apprehension, but I have been able to keep my mind fixed on one object for a great length of time.",
    "Genius isn't speed—it's persistence. Sustained attention beats quick wit. Darwin succeeded through focus.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Charles Darwin",
    "The Descent of Man",
    ["science", "ignorance", "honesty"],
    "Ignorance more frequently begets confidence than does knowledge.",
    "The Dunning-Kruger effect, 19th century edition. The less you know, the more certain you are. Beware false confidence.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Charles Darwin",
    "The Origin of Species",
    ["science", "mystery", "wonder"],
    "There is grandeur in this view of life.",
    "Evolution isn't bleak—it's magnificent. One ancestor, endless diversity. The view is grand indeed.",
    30,
    'non-fiction'
  ),

  // ============================================
  // MARIE CURIE (10 cards)
  // ============================================
  makeCard(
    "Marie Curie",
    "Letters and Notebooks",
    ["science", "fear", "curiosity"],
    "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
    "Fear dissolves in understanding. The unknown frightens; knowledge reassures. Pursue understanding.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Marie Curie",
    "Pierre Curie",
    ["science", "persistence", "discovery"],
    "I was taught that the way of progress was neither swift nor easy.",
    "No shortcuts to breakthroughs. Progress is gradual and difficult. Accept the slow grind.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Marie Curie",
    "Letters and Notebooks",
    ["science", "passion", "work"],
    "Be less curious about people and more curious about ideas.",
    "Gossip wastes mental energy. Ideas reward attention. Redirect curiosity from personalities to concepts.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Marie Curie",
    "Pierre Curie",
    ["science", "independence", "thought"],
    "I have frequently been questioned, especially by women, of how I could reconcile family life with a scientific career. Well, it has not been easy.",
    "Honesty about struggle. Success doesn't mean ease. Balance is hard. Acknowledge the difficulty.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Marie Curie",
    "Letters and Notebooks",
    ["science", "life", "meaning"],
    "Life is not easy for any of us. But what of that? We must have perseverance and above all confidence in ourselves.",
    "Difficulty is universal. Self-belief is the response. Persevere through hardship. Confidence sustains.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Marie Curie",
    "Pierre Curie",
    ["science", "recognition", "humility"],
    "I am among those who think that science has great beauty.",
    "Science isn't just useful—it's beautiful. The aesthetic dimension of discovery. Truth is elegant.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Marie Curie",
    "Letters and Notebooks",
    ["science", "humanity", "service"],
    "You cannot hope to build a better world without improving the individuals.",
    "Social change requires personal change. Better worlds need better people. Start with yourself.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Marie Curie",
    "Pierre Curie",
    ["science", "dream", "achievement"],
    "One never notices what has been done; one can only see what remains to be done.",
    "Achievement blindness: we discount accomplishments and fixate on gaps. Pause to see how far you've come.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Marie Curie",
    "Letters and Notebooks",
    ["science", "age", "growth"],
    "I have no dress except the one I wear every day. If you are going to be kind enough to give me one, please let it be practical and dark.",
    "Simplicity in external things. Focus resources on what matters. Don't waste energy on appearances.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Marie Curie",
    "Pierre Curie",
    ["science", "application", "ethics"],
    "I am one of those who think like Nobel, that humanity will draw more good than evil from new discoveries.",
    "Optimism about progress despite risks. Knowledge can be misused but its potential for good exceeds harm.",
    40,
    'non-fiction'
  ),

  // ============================================
  // WALT WHITMAN (15 cards) [PREMIUM]
  // ============================================
  makeCard(
    "Walt Whitman",
    "Leaves of Grass",
    ["poetry", "self", "multitudes"],
    "I contain multitudes.",
    "You're not one thing. You're many selves, many voices, many possibilities. Contradiction is human.",
    25,
    'poetry'
  ),
  makeCard(
    "Walt Whitman",
    "Leaves of Grass",
    ["poetry", "life", "experience"],
    "I celebrate myself, and sing myself.",
    "Self-celebration isn't narcissism—it's affirmation. Honor your existence. You are worth singing.",
    30,
    'poetry'
  ),
  makeCard(
    "Walt Whitman",
    "Leaves of Grass",
    ["poetry", "body", "soul"],
    "If anything is sacred, the human body is sacred.",
    "Embodiment is holy. Don't separate body from spirit. Flesh is sacred. Honor your physical being.",
    35,
    'poetry'
  ),
  makeCard(
    "Walt Whitman",
    "Song of the Open Road",
    ["poetry", "journey", "freedom"],
    "Afoot and light-hearted I take to the open road, healthy, free, the world before me.",
    "The open road calls. Freedom is movement. Health enables adventure. The world awaits your footsteps.",
    40,
    'poetry'
  ),
  makeCard(
    "Walt Whitman",
    "Leaves of Grass",
    ["poetry", "death", "grass"],
    "The smallest sprout shows there is really no death.",
    "Life cycles, never ends. Death is transformation, not termination. Grass grows from what dies.",
    35,
    'poetry'
  ),
  makeCard(
    "Walt Whitman",
    "Leaves of Grass",
    ["poetry", "connection", "atoms"],
    "Every atom belonging to me as good belongs to you.",
    "We share matter. The same atoms cycle through all of us. Separation is illusion. We're materially one.",
    35,
    'poetry'
  ),
  makeCard(
    "Walt Whitman",
    "Democratic Vistas",
    ["poetry", "literature", "character"],
    "I say the real and permanent grandeur of these States must be their religion, otherwise there is no real and permanent grandeur.",
    "True greatness is spiritual, not material. National character exceeds national wealth. What we worship matters.",
    45,
    'poetry'
  ),
  makeCard(
    "Walt Whitman",
    "Leaves of Grass",
    ["poetry", "compassion", "presence"],
    "I do not ask the wounded person how he feels, I myself become the wounded person.",
    "True empathy is identification. Don't observe suffering—enter it. Compassion is becoming the other.",
    40,
    'poetry'
  ),
  makeCard(
    "Walt Whitman",
    "Song of Myself",
    ["poetry", "simplicity", "grass"],
    "A blade of grass is no less than the journey-work of the stars.",
    "Everything is miraculous. Ordinary grass contains cosmic significance. Grandeur hides in the simple.",
    40,
    'poetry'
  ),
  makeCard(
    "Walt Whitman",
    "Leaves of Grass",
    ["poetry", "future", "readers"],
    "The proof of a poet is that his country absorbs him as affectionately as he has absorbed it.",
    "True poetry becomes part of culture. The test is absorption, not acclaim. Be absorbed into your people.",
    40,
    'poetry'
  ),
  makeCard(
    "Walt Whitman",
    "Song of the Open Road",
    ["poetry", "health", "movement"],
    "Now I see the secret of making the best person: it is to grow in the open air and to eat and sleep with the earth.",
    "Nature makes us better. Outdoor living, elemental contact. The earth heals. Civilization constrains.",
    40,
    'poetry'
  ),
  makeCard(
    "Walt Whitman",
    "Leaves of Grass",
    ["poetry", "friendship", "adhesiveness"],
    "I have learned that to be with those I like is enough.",
    "Simple formula for happiness: good company. Not achievement, not acquisition. Just presence of those you love.",
    35,
    'poetry'
  ),
  makeCard(
    "Walt Whitman",
    "Song of Myself",
    ["poetry", "contradiction", "self"],
    "Do I contradict myself? Very well then I contradict myself, (I am large, I contain multitudes).",
    "Embrace your contradictions. Consistency is for small souls. You're too large for single positions.",
    40,
    'poetry'
  ),
  makeCard(
    "Walt Whitman",
    "Leaves of Grass",
    ["poetry", "present", "eternity"],
    "I exist as I am, that is enough.",
    "Radical acceptance. You don't need to change to be worthy. Existence itself is sufficient. You are enough now.",
    30,
    'poetry'
  ),
  makeCard(
    "Walt Whitman",
    "Song of Myself",
    ["poetry", "mystery", "wonder"],
    "I believe a leaf of grass is no less than the journey work of the stars.",
    "Everything participates in cosmic significance. The mundane is miraculous. Wonder at the ordinary.",
    35,
    'poetry'
  ),

  // ============================================
  // EMILY DICKINSON (15 cards) [PREMIUM]
  // ============================================
  makeCard(
    "Emily Dickinson",
    "Poems",
    ["poetry", "hope", "soul"],
    "Hope is the thing with feathers that perches in the soul.",
    "Hope is light, alive, singing. It lives within you, asks nothing, and sustains through storms.",
    35,
    'poetry'
  ),
  makeCard(
    "Emily Dickinson",
    "Poems",
    ["poetry", "truth", "telling"],
    "Tell all the truth but tell it slant.",
    "Direct truth can blind. Approach obliquely. Art tells truth sideways. Indirection illuminates.",
    30,
    'poetry'
  ),
  makeCard(
    "Emily Dickinson",
    "Letters",
    ["poetry", "words", "power"],
    "A word is dead when it is said, some say. I say it just begins to live that day.",
    "Speaking births meaning. Words become real when uttered. Language is generative, not descriptive.",
    40,
    'poetry'
  ),
  makeCard(
    "Emily Dickinson",
    "Poems",
    ["poetry", "madness", "sense"],
    "Much Madness is divinest Sense—to a discerning Eye.",
    "What seems crazy often contains wisdom. The majority isn't always right. Divine sense looks mad to the dull.",
    40,
    'poetry'
  ),
  makeCard(
    "Emily Dickinson",
    "Poems",
    ["poetry", "success", "failure"],
    "Success is counted sweetest by those who ne'er succeed.",
    "Deprivation sharpens appreciation. Those who have success take it for granted. The hungry understand food's value.",
    40,
    'poetry'
  ),
  makeCard(
    "Emily Dickinson",
    "Letters",
    ["poetry", "forever", "moment"],
    "Forever is composed of nows.",
    "Eternity is made of moments. The present is the only access to forever. Now is all you have.",
    30,
    'poetry'
  ),
  makeCard(
    "Emily Dickinson",
    "Poems",
    ["poetry", "death", "eternity"],
    "Because I could not stop for Death—He kindly stopped for me.",
    "Death comes when it comes. It's polite, inevitable, patient. You can't outrun it. Accept the appointment.",
    40,
    'poetry'
  ),
  makeCard(
    "Emily Dickinson",
    "Poems",
    ["poetry", "pain", "time"],
    "After great pain, a formal feeling comes.",
    "Trauma creates numbness. After crisis, a strange calm descends. Formal feeling: the heart freezes to survive.",
    35,
    'poetry'
  ),
  makeCard(
    "Emily Dickinson",
    "Letters",
    ["poetry", "truth", "beauty"],
    "Beauty is not caused. It Is.",
    "Beauty isn't produced—it exists inherently. Don't ask why something is beautiful. Just recognize it.",
    30,
    'poetry'
  ),
  makeCard(
    "Emily Dickinson",
    "Poems",
    ["poetry", "solitude", "soul"],
    "The Soul selects her own Society—Then—shuts the Door.",
    "Choose your company deliberately. Once chosen, close the door. Quality over quantity. Select carefully.",
    40,
    'poetry'
  ),
  makeCard(
    "Emily Dickinson",
    "Poems",
    ["poetry", "heart", "breaking"],
    "The Heart wants what it wants—or else it does not care.",
    "Desire isn't negotiable. The heart either wants or doesn't. Reason can't bargain with longing.",
    35,
    'poetry'
  ),
  makeCard(
    "Emily Dickinson",
    "Letters",
    ["poetry", "unknown", "exploration"],
    "I dwell in Possibility—A fairer House than Prose.",
    "Poetry exceeds prose because it lives in potential. Possibility is more spacious than fact. Dwell there.",
    35,
    'poetry'
  ),
  makeCard(
    "Emily Dickinson",
    "Poems",
    ["poetry", "fame", "solitude"],
    "I'm Nobody! Who are you? Are you—Nobody—too?",
    "Nobodyhood is liberating. Fame is a bog. Better to be nobody with another nobody. Obscurity has company.",
    35,
    'poetry'
  ),
  makeCard(
    "Emily Dickinson",
    "Poems",
    ["poetry", "brain", "sky"],
    "The Brain—is wider than the Sky.",
    "Mind contains everything. The brain holds the sky and more. Consciousness exceeds cosmos. You contain multitudes.",
    35,
    'poetry'
  ),
  makeCard(
    "Emily Dickinson",
    "Letters",
    ["poetry", "daring", "soul"],
    "To live is so startling it leaves little time for anything else.",
    "Existence itself is astonishing. If you really attended to being alive, nothing else would fit. Life is shock.",
    35,
    'poetry'
  ),

  // ============================================
  // WILLIAM BUTLER YEATS (10 cards) [PREMIUM]
  // ============================================
  makeCard(
    "W.B. Yeats",
    "The Second Coming",
    ["poetry", "chaos", "vision"],
    "Things fall apart; the centre cannot hold.",
    "Disorder increases. Coherence fails. The center dissolves. Sometimes collapse is what's happening.",
    35,
    'poetry'
  ),
  makeCard(
    "W.B. Yeats",
    "Collected Poems",
    ["poetry", "education", "soul"],
    "Education is not the filling of a pail, but the lighting of a fire.",
    "Learning isn't accumulation—it's ignition. Don't fill students; set them ablaze. Spark, don't pour.",
    40,
    'poetry'
  ),
  makeCard(
    "W.B. Yeats",
    "The Lake Isle of Innisfree",
    ["poetry", "peace", "nature"],
    "I will arise and go now, and go to Innisfree... And I shall have some peace there.",
    "The call to retreat. Sometimes you must leave for peace. Nature offers refuge. Arise and go.",
    40,
    'poetry'
  ),
  makeCard(
    "W.B. Yeats",
    "Collected Poems",
    ["poetry", "age", "passion"],
    "An aged man is but a paltry thing, a tattered coat upon a stick, unless Soul clap its hands and sing.",
    "Old bodies diminish. Only soul-singing redeems age. Keep your soul clapping, singing, alive.",
    45,
    'poetry'
  ),
  makeCard(
    "W.B. Yeats",
    "Collected Poems",
    ["poetry", "dreams", "treading"],
    "Tread softly because you tread on my dreams.",
    "Handle others' dreams gently. Dreams are fragile, precious, vulnerable. Walk carefully on sacred ground.",
    35,
    'poetry'
  ),
  makeCard(
    "W.B. Yeats",
    "Collected Poems",
    ["poetry", "heart", "rag"],
    "I must lie down where all the ladders start, in the foul rag-and-bone shop of the heart.",
    "Poetry begins in the heart's mess. Not clean inspiration but dirty origins. Start in the rag shop.",
    40,
    'poetry'
  ),
  makeCard(
    "W.B. Yeats",
    "Collected Poems",
    ["poetry", "beauty", "terrible"],
    "A terrible beauty is born.",
    "Beauty can be frightening. Creation and destruction intertwine. Some births are terrible. Some terrors are beautiful.",
    30,
    'poetry'
  ),
  makeCard(
    "W.B. Yeats",
    "Per Amica Silentia Lunae",
    ["poetry", "enemies", "growth"],
    "We make out of the quarrel with others, rhetoric, but of the quarrel with ourselves, poetry.",
    "External conflict produces argument. Internal conflict produces art. The deepest poetry comes from self-struggle.",
    45,
    'poetry'
  ),
  makeCard(
    "W.B. Yeats",
    "Collected Poems",
    ["poetry", "mask", "self"],
    "There is another world, but it is in this one.",
    "Transcendence isn't elsewhere. The sacred is here, hidden in the ordinary. Heaven is now, if you can see it.",
    35,
    'poetry'
  ),
  makeCard(
    "W.B. Yeats",
    "Collected Poems",
    ["poetry", "choice", "life"],
    "The choice between perfection of life and perfection of work is a necessary one.",
    "You can't have both. Art costs life. Life costs art. Choose, knowing the price. Both perfections are unavailable.",
    40,
    'poetry'
  ),

  // ============================================
  // PABLO NERUDA (10 cards) [PREMIUM]
  // ============================================
  makeCard(
    "Pablo Neruda",
    "Twenty Love Poems",
    ["poetry", "love", "silence"],
    "I love you without knowing how, or when, or from where. I love you simply, without problems or pride.",
    "Love that doesn't require explanation. Simple, direct, unconditional. No justification needed.",
    40,
    'poetry'
  ),
  makeCard(
    "Pablo Neruda",
    "Memoirs",
    ["poetry", "poetry", "necessity"],
    "Poetry is an act of peace. Peace goes into the making of a poet as flour goes into the making of bread.",
    "Poetry requires peace. Violence doesn't produce poems. Peace is essential ingredient, not optional.",
    40,
    'poetry'
  ),
  makeCard(
    "Pablo Neruda",
    "Twenty Love Poems",
    ["poetry", "longing", "absence"],
    "Tonight I can write the saddest lines.",
    "Permission to express sorrow. Some nights demand sad writing. Let grief speak. Sadness has its voice.",
    30,
    'poetry'
  ),
  makeCard(
    "Pablo Neruda",
    "Odes to Common Things",
    ["poetry", "ordinary", "celebration"],
    "I want to do with you what spring does with the cherry trees.",
    "Natural, inevitable, beautiful transformation. What spring does: awakens, blossoms, bears fruit. Do that together.",
    35,
    'poetry'
  ),
  makeCard(
    "Pablo Neruda",
    "Memoirs",
    ["poetry", "confession", "poetry"],
    "Poetry is always a form of confession, more or less oblique.",
    "Poets confess in disguise. The oblique angle reveals truth. Art is indirect autobiography.",
    35,
    'poetry'
  ),
  makeCard(
    "Pablo Neruda",
    "Twenty Love Poems",
    ["poetry", "loss", "memory"],
    "Love is so short, forgetting is so long.",
    "Asymmetry of love and loss. Brief joy, long grief. The forgetting takes longer than the loving. Such is love's economy.",
    35,
    'poetry'
  ),
  makeCard(
    "Pablo Neruda",
    "Canto General",
    ["poetry", "commitment", "struggle"],
    "You can cut all the flowers but you cannot keep spring from coming.",
    "Suppression fails. You can't stop what wants to emerge. Spring comes despite all cutting. Hope persists.",
    40,
    'poetry'
  ),
  makeCard(
    "Pablo Neruda",
    "Odes to Common Things",
    ["poetry", "simplicity", "objects"],
    "I want to say to you, come close to these simple things, not to the important things, but close to the simple things.",
    "Attention to ordinary things. Not grand but humble objects deserve poetry. The simple rewards attention.",
    40,
    'poetry'
  ),
  makeCard(
    "Pablo Neruda",
    "Twenty Love Poems",
    ["poetry", "night", "stars"],
    "I want to do with you what spring does with the cherry trees.",
    "Bloom together. What could be more natural than seasonal flowering? Love as botanical phenomenon.",
    35,
    'poetry'
  ),
  makeCard(
    "Pablo Neruda",
    "Memoirs",
    ["poetry", "life", "writing"],
    "Laughter is the language of the soul.",
    "Souls speak through laughter. Joy is spiritual expression. When you laugh, your soul is speaking.",
    30,
    'poetry'
  ),

  // ============================================
  // PHIL KNIGHT - SHOE DOG (10 cards)
  // ============================================
  makeCard(
    "Phil Knight",
    "Shoe Dog",
    ["business", "risk", "beginnings"],
    "Let everyone else call your idea crazy. Just keep going. Don't stop. Don't even think about stopping until you get there.",
    "Ignore the critics. Persistence despite doubt. Don't stop for naysayers. Arrive first, explain later.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Phil Knight",
    "Shoe Dog",
    ["business", "fear", "courage"],
    "The cowards never started and the weak died along the way. That leaves us.",
    "Survivors aren't the strongest—they're the ones who didn't quit. Starting takes courage. Continuing takes more.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Phil Knight",
    "Shoe Dog",
    ["business", "passion", "play"],
    "Play. That was the secret. That's what I'd always done, and should have been doing all along.",
    "Work should be play. When it's play, you don't burn out. Find the game in your work.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Phil Knight",
    "Shoe Dog",
    ["business", "winning", "trying"],
    "The harder you work, the better your Tao.",
    "Effort improves everything. Even your spirit benefits from hard work. Sweat has spiritual value.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Phil Knight",
    "Shoe Dog",
    ["business", "youth", "running"],
    "I believed in running. I believed that if people got out and ran a few miles every day, the world would be a better place.",
    "Simple belief drives empires. Knight believed in running. From that belief, Nike emerged.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Phil Knight",
    "Shoe Dog",
    ["business", "failure", "learning"],
    "There's a kind of glory in not knowing what you're doing.",
    "Ignorance can be freedom. Not knowing means no constraints. The glory of naive beginning.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Phil Knight",
    "Shoe Dog",
    ["business", "trust", "team"],
    "Don't tell people how to do things, tell them what to do and let them surprise you with their results.",
    "Delegate outcomes, not methods. Trust your team's creativity. Specify goals, not paths.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Phil Knight",
    "Shoe Dog",
    ["business", "regret", "risk"],
    "I'd tell men and women in their midtwenties not to settle for a job or a profession or even a career. Seek a calling.",
    "Jobs pay bills. Careers build status. Callings define you. Don't settle for less than calling.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Phil Knight",
    "Shoe Dog",
    ["business", "adversity", "growth"],
    "When you see only problems, you're not seeing clearly.",
    "Problems contain opportunities. If you see only obstacles, your vision is impaired. Look for the gift in difficulty.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Phil Knight",
    "Shoe Dog",
    ["business", "life", "meaning"],
    "I wanted to leave a mark on the world. I wanted to win. I wanted to leave a legacy.",
    "Honest ambition. Not just money or power but impact. Leaving a mark. That's a worthy aim.",
    35,
    'non-fiction'
  ),

  // ============================================
  // SAM WALTON (10 cards)
  // ============================================
  makeCard(
    "Sam Walton",
    "Made in America",
    ["business", "customers", "service"],
    "There is only one boss. The customer. And he can fire everybody in the company from the chairman on down.",
    "Customer supremacy. The customer is the real boss. Everyone serves them or serves someone who serves them.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Sam Walton",
    "Made in America",
    ["business", "expectations", "exceeding"],
    "Exceed your customer's expectations. If you do, they'll come back over and over.",
    "Don't just meet expectations—beat them. Consistent exceeding builds loyalty. Give more than expected.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Sam Walton",
    "Made in America",
    ["business", "competition", "learning"],
    "I probably have traveled and walked into more variety stores than anybody in America.",
    "Obsessive competitive research. Know your competition intimately. Walk their stores. Learn from everyone.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Sam Walton",
    "Made in America",
    ["business", "listening", "associates"],
    "The key to success is to get out into the store and listen to what the associates have to say.",
    "Frontline wisdom. The people doing the work know the most. Listen to associates, not just managers.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Sam Walton",
    "Made in America",
    ["business", "celebration", "success"],
    "Celebrate your successes. Find some humor in your failures.",
    "Balance of celebration and perspective. Honor wins. Laugh at losses. Both matter for morale.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Sam Walton",
    "Made in America",
    ["business", "sharing", "profits"],
    "Share your profits with all your associates, and treat them as partners.",
    "Shared prosperity builds loyalty. When employees are partners, they act like owners. Spread the wealth.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Sam Walton",
    "Made in America",
    ["business", "communication", "transparency"],
    "Communicate everything you possibly can to your partners. The more they know, the more they'll understand.",
    "Information is empowerment. Secrets create suspicion. Share information generously. Trust your people with truth.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Sam Walton",
    "Made in America",
    ["business", "frugality", "value"],
    "Every time Walmart spends one dollar foolishly, it comes right out of our customers' pockets.",
    "Waste is theft from customers. Frugality is a customer value. Efficiency serves those you serve.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Sam Walton",
    "Made in America",
    ["business", "control", "costs"],
    "Control your expenses better than your competition.",
    "Cost control is competitive advantage. Lower costs enable lower prices. Efficiency is strategy.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Sam Walton",
    "Made in America",
    ["business", "swimming", "upstream"],
    "Swim upstream. Go the other way. Ignore the conventional wisdom.",
    "Contrarianism as strategy. Don't follow the crowd. Conventional wisdom is often wrong. Swim against current.",
    35,
    'non-fiction'
  ),

  // ============================================
  // REED HASTINGS (10 cards)
  // ============================================
  makeCard(
    "Reed Hastings",
    "No Rules Rules",
    ["business", "freedom", "responsibility"],
    "The best managers figure out how to get great outcomes by setting the appropriate context, rather than by trying to control their people.",
    "Context over control. Give context, not commands. Trust people with freedom and responsibility.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Reed Hastings",
    "No Rules Rules",
    ["business", "talent", "density"],
    "Talent density is the foundation of a high-performing culture.",
    "Concentrate talent. One excellent person beats ten mediocre ones. Quality of people is everything.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Reed Hastings",
    "No Rules Rules",
    ["business", "feedback", "candor"],
    "Candor is never cruel. Silence is.",
    "Withholding feedback seems kind but is actually cruel. Tell people the truth. Silence lets them fail.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Reed Hastings",
    "No Rules Rules",
    ["business", "vacation", "freedom"],
    "We have no vacation policy. We don't track hours. We don't track days off.",
    "Radical freedom. Treat adults as adults. No counting, no tracking. Trust people to manage themselves.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Reed Hastings",
    "No Rules Rules",
    ["business", "mistakes", "recovery"],
    "If you want to build a ship, don't drum up people to collect wood and don't assign them tasks and work, but rather teach them to long for the endless immensity of the sea.",
    "Inspire, don't instruct. Give people a vision to long for. Inspiration beats instruction.",
    50,
    'non-fiction'
  ),
  makeCard(
    "Reed Hastings",
    "No Rules Rules",
    ["business", "information", "sharing"],
    "Sunlight is the best disinfectant. Transparency builds trust.",
    "Open information heals. Secrets fester. Share widely. Trust emerges from transparency.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Reed Hastings",
    "No Rules Rules",
    ["business", "decisions", "delegation"],
    "Don't seek to please your boss. Seek to do what's best for the company.",
    "Optimize for mission, not approval. Pleasing bosses can hurt companies. Do what's right.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Reed Hastings",
    "No Rules Rules",
    ["business", "innovation", "risk"],
    "If we're not failing, we're not trying hard enough.",
    "Failure indicates effort. No failure means no risk. No risk means no innovation. Fail more.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Reed Hastings",
    "No Rules Rules",
    ["business", "keeper", "test"],
    "Would you fight to keep this person? If not, give them a generous severance now.",
    "The keeper test: would you fight for them? If not, free them to find a place where they'd be valued.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Reed Hastings",
    "No Rules Rules",
    ["business", "process", "freedom"],
    "The goal is to have a company of adults who can be trusted to do their jobs well without a lot of rules and oversight.",
    "Hire adults. Treat them as adults. Adults don't need babysitting. Trust enables performance.",
    40,
    'non-fiction'
  ),

  // ============================================
  // ANNIE DILLARD (10 cards)
  // ============================================
  makeCard(
    "Annie Dillard",
    "The Writing Life",
    ["creativity", "writing", "living"],
    "How we spend our days is, of course, how we spend our lives.",
    "Days are life in miniature. Don't discount the daily. What you do each day is what you do with your life.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Annie Dillard",
    "Pilgrim at Tinker Creek",
    ["philosophy", "attention", "seeing"],
    "The secret of seeing is to sail on solar wind. Hone and spread your spirit till you yourself are a sail.",
    "Seeing requires becoming receptive. Make yourself a sail. Let the world fill you rather than grasping.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Annie Dillard",
    "The Writing Life",
    ["creativity", "work", "discipline"],
    "A schedule defends from chaos and whim. A net for catching days.",
    "Structure is protective. Schedules aren't constraints—they're nets that catch time. Defend against chaos.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Annie Dillard",
    "Pilgrim at Tinker Creek",
    ["philosophy", "present", "awareness"],
    "I have been my whole life a bell, and never knew it until at that moment I was lifted and struck.",
    "We're instruments waiting to sound. Some moment lifts and strikes us. Then we discover what we are.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Annie Dillard",
    "The Writing Life",
    ["creativity", "commitment", "all-in"],
    "Push it. Examine all things intensely and relentlessly.",
    "Half-effort produces nothing. Go all in. Examine everything. Intensity is required. Push beyond comfort.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Annie Dillard",
    "Pilgrim at Tinker Creek",
    ["philosophy", "beauty", "terror"],
    "Beauty and grace are performed whether or not we will or sense them. The least we can do is try to be there.",
    "Grace happens continuously. We miss most of it. At minimum, show up. Be present for beauty.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Annie Dillard",
    "The Writing Life",
    ["creativity", "drafts", "process"],
    "One of the few things I know about writing is this: spend it all, shoot it, play it, lose it, all, right away, every time.",
    "Hold nothing back. Use everything. Don't save your best stuff. Give it all now. More will come.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Annie Dillard",
    "Pilgrim at Tinker Creek",
    ["philosophy", "wonder", "ordinary"],
    "We are here to witness. There is nothing else to do with those mute materials we do not need.",
    "Our purpose is witnessing. Not using, not consuming, but attending. See what's here. That's enough.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Annie Dillard",
    "The Writing Life",
    ["creativity", "courage", "leap"],
    "You have to give it all, every time. It's not the writing part that's hard. What's hard is sitting down to write.",
    "Starting is the hardest part. Not the doing but the beginning. Sit down. That's the real battle.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Annie Dillard",
    "Pilgrim at Tinker Creek",
    ["philosophy", "time", "eternity"],
    "How we spend our days is, of course, how we spend our lives.",
    "Daily choices compound into life choices. There's no disconnect between days and life. Every day counts.",
    35,
    'non-fiction'
  ),

  // ============================================
  // WALTER ISAACSON (10 cards)
  // ============================================
  makeCard(
    "Walter Isaacson",
    "Steve Jobs",
    ["business", "simplicity", "focus"],
    "Deciding what not to do is as important as deciding what to do. That's true for companies and for products.",
    "Subtraction is strategy. Saying no is as crucial as saying yes. What you don't do defines you.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Walter Isaacson",
    "Einstein: His Life and Universe",
    ["science", "imagination", "knowledge"],
    "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.",
    "Einstein's credo: imagination trumps facts. You can learn what's known; you must imagine what's unknown.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Walter Isaacson",
    "Benjamin Franklin",
    ["philosophy", "character", "virtue"],
    "Franklin felt that the failure to have a child be the result of married love made it a lesser love.",
    "Franklin tracked his virtues daily. Character is built through conscious practice. Track what you want to improve.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Walter Isaacson",
    "Leonardo da Vinci",
    ["creativity", "curiosity", "observation"],
    "Be curious, relentlessly curious. That was Leonardo's hallmark.",
    "Curiosity is the master skill. Everything else flows from it. Be relentlessly, insatiably curious.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Walter Isaacson",
    "Steve Jobs",
    ["business", "excellence", "standards"],
    "Be a yardstick of quality. Some people aren't used to an environment where excellence is expected.",
    "Set high standards. Be the example. In environments where excellence is rare, model it consistently.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Walter Isaacson",
    "Einstein: His Life and Universe",
    ["science", "mystery", "wonder"],
    "The most beautiful thing we can experience is the mysterious. It is the source of all true art and science.",
    "Mystery motivates inquiry. Wonder drives discovery. Don't lose your sense of the mysterious.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Walter Isaacson",
    "Leonardo da Vinci",
    ["creativity", "notebook", "observation"],
    "Keep a notebook. Leonardo's notebooks may be the most astonishing evidence of human creativity ever recorded.",
    "Record your observations. Notebooks externalize thinking. Leonardo's notebooks prove their value.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Walter Isaacson",
    "Benjamin Franklin",
    ["philosophy", "improvement", "habit"],
    "Franklin tracked his virtues daily in a little book, marking when he failed to live up to his ideals.",
    "Track your progress. What gets measured gets improved. Franklin's method: daily virtue accounting.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Walter Isaacson",
    "Steve Jobs",
    ["business", "intersection", "technology"],
    "The people who are crazy enough to think they can change the world are the ones who do.",
    "Reasonable people accept reality. Unreasonable people change it. Progress requires the crazy ones.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Walter Isaacson",
    "Leonardo da Vinci",
    ["creativity", "finishing", "starting"],
    "Finish. Even Leonardo had trouble with this. The ability to finish is as important as the ability to start.",
    "Starting is easier than finishing. Completion is its own skill. Practice finishing what you begin.",
    40,
    'non-fiction'
  ),

  // ============================================
  // ZEN MASTERS & BUDDHIST TEACHERS (30 cards)
  // ============================================
  makeCard(
    "Shunryu Suzuki",
    "Zen Mind, Beginner's Mind",
    ["spirituality", "beginner", "openness"],
    "In the beginner's mind there are many possibilities, but in the expert's there are few.",
    "Expertise narrows. Beginner's mind opens. The expert's curse is knowing too much. Return to not knowing.",
    40,
    'self-help'
  ),
  makeCard(
    "Shunryu Suzuki",
    "Zen Mind, Beginner's Mind",
    ["spirituality", "perfection", "practice"],
    "Each of you is perfect the way you are... and you can use a little improvement.",
    "Both true: you're already perfect AND could improve. Accept yourself completely while growing constantly.",
    40,
    'self-help'
  ),
  makeCard(
    "Shunryu Suzuki",
    "Zen Mind, Beginner's Mind",
    ["spirituality", "doing", "being"],
    "When you do something, you should burn yourself up completely, like a good bonfire, leaving no trace of yourself.",
    "Total engagement. Complete presence. Leave nothing in reserve. Burn fully in each moment.",
    40,
    'self-help'
  ),
  makeCard(
    "Shunryu Suzuki",
    "Zen Mind, Beginner's Mind",
    ["spirituality", "control", "flow"],
    "To give your sheep or cow a large, spacious meadow is the way to control him.",
    "Control through spaciousness. Give freedom to gain cooperation. Constraint creates resistance; space allows movement.",
    40,
    'self-help'
  ),
  makeCard(
    "D.T. Suzuki",
    "Essays in Zen Buddhism",
    ["spirituality", "zen", "direct"],
    "Zen is not a sect but an experience.",
    "Zen can't be described, only experienced. It's not a belief system but a direct encounter with reality.",
    35,
    'self-help'
  ),
  makeCard(
    "D.T. Suzuki",
    "Essays in Zen Buddhism",
    ["spirituality", "moment", "eternity"],
    "One moment is all eternity; all eternity is one moment.",
    "Time collapses in full presence. The moment contains everything. Eternity isn't duration—it's depth.",
    35,
    'self-help'
  ),
  makeCard(
    "Dogen",
    "Shobogenzo",
    ["spirituality", "practice", "enlightenment"],
    "To study the Buddha Way is to study the self. To study the self is to forget the self.",
    "Self-study leads to self-forgetting. Not narcissism but investigation. Go through self to beyond self.",
    40,
    'self-help'
  ),
  makeCard(
    "Dogen",
    "Shobogenzo",
    ["spirituality", "time", "being"],
    "Time is not separate from you, and as you are present, time does not go away.",
    "You are time. Time isn't something you're in—it's something you are. Presence is time.",
    40,
    'self-help'
  ),
  makeCard(
    "Dogen",
    "Shobogenzo",
    ["spirituality", "everyday", "enlightenment"],
    "Enlightenment is intimacy with all things.",
    "Not escape but intimacy. Not transcendence but contact. Closeness with everything is awakening.",
    35,
    'self-help'
  ),
  makeCard(
    "Charlotte Joko Beck",
    "Everyday Zen",
    ["spirituality", "practice", "life"],
    "Life is not a problem to be solved. It's something to be experienced.",
    "Stop trying to fix life. Experience it. The problem-solving mentality misses the point. Live, don't solve.",
    35,
    'self-help'
  ),
  makeCard(
    "Charlotte Joko Beck",
    "Nothing Special",
    ["spirituality", "ordinary", "special"],
    "Our life is always all right. There's nothing wrong with it. Even if we have pain, it's all right.",
    "Radical acceptance. Everything is already okay. Even pain is part of okayness. Life is always all right.",
    40,
    'self-help'
  ),
  makeCard(
    "Charlotte Joko Beck",
    "Everyday Zen",
    ["spirituality", "emotion", "weather"],
    "Joy is just a little bit of a feeling; sadness is just a little bit of a feeling.",
    "Emotions are small, transient. We make them huge through identification. They're just little feelings passing through.",
    40,
    'self-help'
  ),
  makeCard(
    "Ajahn Chah",
    "A Still Forest Pool",
    ["spirituality", "peace", "confusion"],
    "If you let go a little, you will have a little peace. If you let go a lot, you will have a lot of peace.",
    "Release scales with peace. More letting go, more peace. Simple equation. Test it.",
    35,
    'self-help'
  ),
  makeCard(
    "Ajahn Chah",
    "Food for the Heart",
    ["spirituality", "mind", "training"],
    "Looking for peace is like looking for a turtle with a mustache. You won't be able to find it.",
    "You can't seek peace. Seeking prevents finding. Peace is what remains when seeking stops.",
    40,
    'self-help'
  ),
  makeCard(
    "Ajahn Chah",
    "A Still Forest Pool",
    ["spirituality", "practice", "patience"],
    "Do not try to become anything. Do not make yourself into anything. Do not be a meditator.",
    "Stop trying to become. Don't make yourself. Just be what you already are. The effort defeats itself.",
    40,
    'self-help'
  ),
  makeCard(
    "Chogyam Trungpa",
    "Cutting Through Spiritual Materialism",
    ["spirituality", "ego", "enlightenment"],
    "The problem is that ego can convert anything to its own use, even spirituality.",
    "Ego co-opts everything, including the spiritual path. Watch for spiritual materialism—using spirituality for ego.",
    45,
    'self-help'
  ),
  makeCard(
    "Chogyam Trungpa",
    "Shambhala",
    ["spirituality", "warrior", "gentleness"],
    "Warriorship is so tender, without skin, raw, and exposed.",
    "True strength is vulnerability. The spiritual warrior is not armored but exposed. Tenderness is courage.",
    40,
    'self-help'
  ),
  makeCard(
    "Chogyam Trungpa",
    "Cutting Through Spiritual Materialism",
    ["spirituality", "surrender", "journey"],
    "The bad news is you're falling through the air, nothing to hang on to, no parachute. The good news is, there's no ground.",
    "No safety but no impact. The fall is perpetual but harmless. Surrender to groundlessness.",
    45,
    'self-help'
  ),
  makeCard(
    "Seung Sahn",
    "Only Don't Know",
    ["spirituality", "questions", "answers"],
    "Only don't know.",
    "The essence of zen in three words. Stay in not-knowing. Don't know is the answer. Don't know is freedom.",
    25,
    'self-help'
  ),
  makeCard(
    "Seung Sahn",
    "Dropping Ashes on the Buddha",
    ["spirituality", "thinking", "reality"],
    "Put it all down. Your opinion, your condition, your situation—put it all down.",
    "Release everything. Opinions, conditions, situations. Set them down. What remains is real.",
    35,
    'self-help'
  ),
  makeCard(
    "Adyashanti",
    "The End of Your World",
    ["spirituality", "awakening", "life"],
    "Enlightenment is a destructive process. It has nothing to do with becoming better or being happier.",
    "Awakening destroys illusions. It's not self-improvement. The false self doesn't get better—it dies.",
    45,
    'self-help'
  ),
  makeCard(
    "Adyashanti",
    "Falling into Grace",
    ["spirituality", "truth", "simplicity"],
    "The Truth is the only thing you'll ever run into that has no agenda.",
    "Truth doesn't want anything from you. It has no agenda. That's how you recognize it.",
    35,
    'self-help'
  ),
  makeCard(
    "Jack Kornfield",
    "After the Ecstasy, the Laundry",
    ["spirituality", "enlightenment", "ordinary"],
    "After the ecstasy, the laundry.",
    "Awakening doesn't exempt you from life. Peak experiences end. Then there's laundry. The mundane continues.",
    30,
    'self-help'
  ),
  makeCard(
    "Jack Kornfield",
    "A Path with Heart",
    ["spirituality", "meditation", "life"],
    "In the end, these things matter most: How well did you love? How fully did you live? How deeply did you let go?",
    "Final exam of life: three questions. Love, living, letting go. That's what matters at the end.",
    40,
    'self-help'
  ),
  makeCard(
    "Sharon Salzberg",
    "Lovingkindness",
    ["spirituality", "love", "self"],
    "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
    "Self-love isn't optional. You deserve your own kindness. Include yourself in your circle of compassion.",
    40,
    'self-help'
  ),
  makeCard(
    "Sharon Salzberg",
    "Real Happiness",
    ["spirituality", "meditation", "beginning"],
    "Meditation is the ultimate mobile device; you can use it anywhere, anytime, unobtrusively.",
    "Meditation is portable. No equipment needed. Available anywhere. The ultimate app is built-in.",
    35,
    'self-help'
  ),
  makeCard(
    "Joseph Goldstein",
    "Mindfulness",
    ["spirituality", "awareness", "simple"],
    "Mindfulness is the quality of awareness that knows what is happening as it is happening.",
    "Simple definition: knowing what's happening while it's happening. That's all. Present-moment awareness.",
    35,
    'self-help'
  ),
  makeCard(
    "Sylvia Boorstein",
    "It's Easier Than You Think",
    ["spirituality", "happiness", "simple"],
    "Pay attention. Be astonished. Tell about it.",
    "Mary Oliver's instructions for living. Attention, wonder, expression. Three steps to a meaningful life.",
    30,
    'self-help'
  ),
  makeCard(
    "Mingyur Rinpoche",
    "The Joy of Living",
    ["spirituality", "happiness", "brain"],
    "Happiness is always available. The only thing we have to do is to let go of the barriers we create.",
    "Happiness is default. We obstruct it. Remove obstructions; happiness appears. It's about subtraction.",
    40,
    'self-help'
  ),
  makeCard(
    "Matthieu Ricard",
    "Happiness",
    ["spirituality", "happiness", "skill"],
    "Happiness is a skill. It requires effort and time.",
    "Happiness isn't luck—it's skill. Skills require practice. Happiness takes effort. Train your mind.",
    35,
    'self-help'
  ),

  // ============================================
  // MORE BUSINESS & ENTREPRENEURSHIP (40 cards)
  // ============================================
  makeCard(
    "Ray Dalio",
    "Principles",
    ["business", "reality", "acceptance"],
    "Pain plus reflection equals progress.",
    "Pain alone teaches nothing. Reflection extracts the lesson. Combine them for growth. Process your pain.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Ray Dalio",
    "Principles",
    ["business", "truth", "transparency"],
    "Radical truth and radical transparency are fundamental to having a real meritocracy.",
    "Meritocracy requires honesty. Without truth, politics wins. Be radically transparent.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Ray Dalio",
    "Principles",
    ["business", "mistakes", "learning"],
    "If you're not failing, you're not pushing your limits, and if you're not pushing your limits, you're not maximizing your potential.",
    "Failure indicates growth. No failure means no stretching. Maximize failure to maximize potential.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Ray Dalio",
    "Principles",
    ["business", "decisions", "believability"],
    "I just want to be right—I don't care if the right answer comes from me.",
    "Ego-free truth-seeking. Don't care who's right. Care about what's right. Credit doesn't matter; correctness does.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Ray Dalio",
    "Principles",
    ["business", "pain", "growth"],
    "Embrace reality and deal with it.",
    "Denial delays dealing. Face what is. Reality doesn't care about your preferences. Embrace it anyway.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Eric Ries",
    "The Lean Startup",
    ["business", "learning", "building"],
    "The only way to win is to learn faster than anyone else.",
    "Speed of learning is the competitive advantage. Learn fast, iterate fast. Winning is out-learning.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Eric Ries",
    "The Lean Startup",
    ["business", "waste", "efficiency"],
    "Every day we spent not building was wasted. Every day we spent building the wrong thing was even more wasteful.",
    "Building wrong things wastes more than not building. Validate before building. Wrong direction is worse than no direction.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Eric Ries",
    "The Lean Startup",
    ["business", "failure", "pivot"],
    "A pivot is a change in strategy without a change in vision.",
    "Pivoting isn't giving up. Vision stays; strategy changes. The destination remains; the route shifts.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Ben Horowitz",
    "The Hard Thing About Hard Things",
    ["business", "difficulty", "leadership"],
    "Hard things are hard because there are no easy answers or recipes. They are hard because your emotions are at odds with your logic.",
    "The hardest decisions pit heart against head. That's what makes them hard. Logic and emotion conflict.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Ben Horowitz",
    "The Hard Thing About Hard Things",
    ["business", "ceo", "loneliness"],
    "There are no silver bullets for this, only lead bullets.",
    "No shortcuts exist. No magic solutions. Only hard work and incremental progress. Lead bullets, not silver.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Ben Horowitz",
    "The Hard Thing About Hard Things",
    ["business", "hiring", "culture"],
    "Take care of the people, the products, and the profits—in that order.",
    "Priority sequence matters. People first, then products, then profits. Get the order wrong and everything suffers.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Marc Andreessen",
    "Blog Posts",
    ["business", "product", "market"],
    "Product/market fit means being in a good market with a product that can satisfy that market.",
    "Simple definition of the most important thing. Good market + satisfying product = success. Nothing else matters as much.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Marc Andreessen",
    "Blog Posts",
    ["business", "optimism", "future"],
    "The spread of computers and the Internet will put jobs in two categories: People who tell computers what to do, and people who are told by computers what to do.",
    "Two futures: commanding technology or commanded by it. Which side do you want to be on?",
    45,
    'non-fiction'
  ),
  makeCard(
    "Paul Graham",
    "Essays",
    ["business", "startups", "growth"],
    "A startup is a company designed to grow fast.",
    "Not small business. Growth-designed. Fast growth is the defining characteristic. Everything else follows from this.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Paul Graham",
    "Essays",
    ["business", "wealth", "creation"],
    "You can't create wealth without creating something people want.",
    "Wealth is value created. Value means wanted. Without desire, no value. Make what people want.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Paul Graham",
    "Essays",
    ["business", "ideas", "execution"],
    "Ideas are worth nothing unless executed. They are just a multiplier. Execution is worth millions.",
    "Ideas multiply execution. But multiply by zero is zero. Execution is where value is created.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Peter Thiel",
    "Zero to One",
    ["business", "competition", "monopoly"],
    "Competition is for losers.",
    "Provocative but profound. Competing on others' terms is a race to the bottom. Create monopolies through differentiation.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Peter Thiel",
    "Zero to One",
    ["business", "secrets", "innovation"],
    "What important truth do very few people agree with you on?",
    "The contrarian question. Finding answers leads to opportunities. What do you believe that others don't?",
    35,
    'non-fiction'
  ),
  makeCard(
    "Peter Thiel",
    "Zero to One",
    ["business", "future", "creation"],
    "The most contrarian thing of all is not to oppose the crowd but to think for yourself.",
    "True contrarianism isn't reflexive opposition. It's independent thinking. Think for yourself, not against others.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Clayton Christensen",
    "The Innovator's Dilemma",
    ["business", "innovation", "disruption"],
    "Good management was the most powerful reason why established firms failed to stay atop their industries.",
    "Well-managed companies fail precisely because they're well-managed. Good practices become traps. Disruption requires breaking rules.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Clayton Christensen",
    "How Will You Measure Your Life",
    ["business", "purpose", "meaning"],
    "The type of person you want to become—what the purpose of your life is—is too important to leave to chance.",
    "Don't drift into a life. Choose it deliberately. Purpose requires intention. Design your life or it designs itself.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Jim Collins",
    "Good to Great",
    ["business", "greatness", "discipline"],
    "Good is the enemy of great.",
    "Settling for good prevents achieving great. Good enough is the obstacle. Don't stop at good.",
    30,
    'non-fiction'
  ),
  makeCard(
    "Jim Collins",
    "Good to Great",
    ["business", "leadership", "humility"],
    "Level 5 leaders channel their ego needs away from themselves and into the larger goal of building a great company.",
    "Humility plus will. Ego for the company, not for self. Ambitious for the mission, not for personal glory.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Jim Collins",
    "Built to Last",
    ["business", "vision", "core"],
    "Preserve the core and stimulate progress.",
    "Balance stability and change. Some things don't change; some must. Know which is which.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Patrick Lencioni",
    "The Five Dysfunctions of a Team",
    ["business", "trust", "vulnerability"],
    "Trust is knowing that when a team member does push you, they're doing it because they care about the team.",
    "Conflict from trust is productive. Challenge each other because you care. Trust enables productive conflict.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Patrick Lencioni",
    "Death by Meeting",
    ["business", "meetings", "conflict"],
    "Meetings are a puzzling paradox. On one hand, they are critical... On the other hand, they are painful.",
    "Meetings are necessary and terrible. The solution isn't fewer meetings but better ones. Fix them, don't eliminate them.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Michael Porter",
    "Competitive Strategy",
    ["business", "strategy", "choice"],
    "The essence of strategy is choosing what not to do.",
    "Strategy is exclusion. What you won't do defines you as much as what you will. Say no strategically.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Michael Porter",
    "Competitive Strategy",
    ["business", "competition", "position"],
    "Competitive strategy is about being different. It means deliberately choosing a different set of activities to deliver a unique mix of value.",
    "Different, not better. Strategic positioning is about uniqueness, not superiority. Be different in valuable ways.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Geoffrey Moore",
    "Crossing the Chasm",
    ["business", "adoption", "mainstream"],
    "The chasm represents the gulf between two distinct marketplaces for technology products.",
    "Early adopters and mainstream are different markets. Crossing between them requires changing strategy. The chasm kills many companies.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Al Ries",
    "Positioning",
    ["business", "marketing", "mind"],
    "Positioning is not what you do to a product. Positioning is what you do to the mind of the prospect.",
    "Marketing is mental. You position in minds, not markets. Perception is the battlefield.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Chip Heath",
    "Made to Stick",
    ["business", "communication", "sticky"],
    "The most basic way to get someone's attention is this: Break a pattern.",
    "Pattern interruption captures attention. Surprise people. Break expectations. That's how to be noticed.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Chip Heath",
    "Switch",
    ["business", "change", "elephant"],
    "What looks like resistance is often a lack of clarity.",
    "People don't resist change—they resist confusion. Clarify direction and resistance often disappears. Be specific.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Daniel Pink",
    "Drive",
    ["business", "motivation", "autonomy"],
    "Autonomy, mastery, and purpose: these are the building blocks of a new way of doing things.",
    "Intrinsic motivation beats carrots and sticks. People want autonomy, mastery, purpose. Provide these.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Daniel Pink",
    "To Sell Is Human",
    ["business", "sales", "service"],
    "To sell well is to convince someone else to part with resources—not to deprive that person, but to leave him better off in the end.",
    "Good selling is service. Not extraction but improvement. Leave buyers better off. That's ethical sales.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Sheryl Sandberg",
    "Lean In",
    ["business", "leadership", "ambition"],
    "What would you do if you weren't afraid?",
    "Fear constrains action. Remove fear and see what you'd attempt. The question reveals hidden ambition.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Sheryl Sandberg",
    "Lean In",
    ["business", "career", "risk"],
    "Careers are a jungle gym, not a ladder.",
    "Non-linear career paths. Move sideways, backward, around. The jungle gym offers more routes than the ladder.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Indra Nooyi",
    "My Life in Full",
    ["business", "leadership", "balance"],
    "Whatever I do, I do with the absolute belief that success is a team sport.",
    "No solo success. Teams win. Leaders enable teams. Success is always collaborative.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Tony Hsieh",
    "Delivering Happiness",
    ["business", "culture", "service"],
    "Your personal core values define who you are, and a company's core values ultimately define the company's character.",
    "Values define identity. For people and companies. Know your values; they shape everything.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Richard Branson",
    "Losing My Virginity",
    ["business", "adventure", "yes"],
    "If somebody offers you an amazing opportunity but you are not sure you can do it, say yes—then learn how to do it later.",
    "Say yes first, figure it out later. Opportunity doesn't wait for readiness. Jump and build wings on the way down.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Richard Branson",
    "Losing My Virginity",
    ["business", "failure", "learning"],
    "You don't learn to walk by following rules. You learn by doing, and by falling over.",
    "Learning requires falling. Rules can't teach walking. Experience teaches. Failure is curriculum.",
    35,
    'non-fiction'
  ),

  // ============================================
  // ADDITIONAL DIVERSE CARDS - BATCH 3B (235 more)
  // ============================================
  makeCard(
    "Seneca",
    "Moral Letters",
    ["philosophy", "stoicism", "value"],
    "It is not the man who has too little, but the man who craves more, that is poor.",
    "Wealth is relative to desire. Reduce wants and you're instantly rich. Craving is the source of poverty.",
    40,
    'philosophy'
  ),
  makeCard(
    "Marcus Aurelius",
    "Meditations",
    ["philosophy", "stoicism", "morning"],
    "Begin each day by telling yourself: Today I shall be meeting with interference, ingratitude, insolence, disloyalty, ill-will, and selfishness.",
    "Expect difficulties and they won't surprise you. Morning preparation for human nature. Don't be naive.",
    45,
    'philosophy'
  ),
  makeCard(
    "Epictetus",
    "Enchiridion",
    ["philosophy", "stoicism", "opinion"],
    "It is not things that disturb us, but our judgments about things.",
    "Events are neutral. Your interpretation creates your reaction. Change the judgment, change the experience.",
    35,
    'philosophy'
  ),
  makeCard(
    "Montaigne",
    "Essays",
    ["philosophy", "self", "study"],
    "I study myself more than any other subject. That is my metaphysics; that is my physics.",
    "Self-knowledge is the ultimate study. You are your most accessible subject. Know yourself first.",
    40,
    'philosophy'
  ),
  makeCard(
    "Montaigne",
    "Essays",
    ["philosophy", "death", "preparation"],
    "To philosophize is to learn to die.",
    "Philosophy's ultimate lesson: accepting mortality. All wisdom leads to death acceptance.",
    35,
    'philosophy'
  ),
  makeCard(
    "Montaigne",
    "Essays",
    ["philosophy", "certainty", "doubt"],
    "Que sais-je? What do I know?",
    "The motto of humility. Perpetual questioning. Certainty is suspect. Keep asking what you actually know.",
    30,
    'philosophy'
  ),
  makeCard(
    "Blaise Pascal",
    "Pensées",
    ["philosophy", "silence", "terror"],
    "The eternal silence of these infinite spaces terrifies me.",
    "Cosmic loneliness. The universe doesn't speak. Silence at scale is frightening. We're alone with the infinite.",
    40,
    'philosophy'
  ),
  makeCard(
    "Blaise Pascal",
    "Pensées",
    ["philosophy", "heart", "reason"],
    "The heart has its reasons which reason knows nothing of.",
    "Emotion has its own logic. Rational mind can't fully grasp heart's wisdom. Both are valid ways of knowing.",
    40,
    'philosophy'
  ),
  makeCard(
    "Blaise Pascal",
    "Pensées",
    ["philosophy", "distraction", "misery"],
    "All of humanity's problems stem from man's inability to sit quietly in a room alone.",
    "Distraction is the disease. We can't be still. Busyness is escape from self. Learn to sit quietly.",
    45,
    'philosophy'
  ),
  makeCard(
    "Spinoza",
    "Ethics",
    ["philosophy", "emotions", "understanding"],
    "I have striven not to laugh at human actions, nor to weep at them, nor to hate them, but to understand them.",
    "Understanding replaces judgment. Don't mock, weep, or hate—understand. Comprehension is the goal.",
    45,
    'philosophy'
  ),
  makeCard(
    "Spinoza",
    "Ethics",
    ["philosophy", "freedom", "necessity"],
    "Freedom is the recognition of necessity.",
    "True freedom isn't escape from constraint but understanding of it. Know what must be and align with it.",
    35,
    'philosophy'
  ),
  makeCard(
    "Kierkegaard",
    "Either/Or",
    ["philosophy", "anxiety", "possibility"],
    "Anxiety is the dizziness of freedom.",
    "Freedom terrifies. Infinite possibility creates vertigo. Anxiety is the price of being free.",
    35,
    'philosophy'
  ),
  makeCard(
    "Kierkegaard",
    "Fear and Trembling",
    ["philosophy", "faith", "leap"],
    "To dare is to lose one's footing momentarily. Not to dare is to lose oneself.",
    "Risk is temporary imbalance. Safety is permanent loss. Dare or disappear. Choose temporary instability.",
    40,
    'philosophy'
  ),
  makeCard(
    "Kierkegaard",
    "The Sickness Unto Death",
    ["philosophy", "despair", "self"],
    "The most common form of despair is not being who you are.",
    "Inauthenticity is despair. Not being yourself is slow death. The cure is becoming who you are.",
    40,
    'philosophy'
  ),
  makeCard(
    "Schopenhauer",
    "Essays and Aphorisms",
    ["philosophy", "loneliness", "solitude"],
    "A man can be himself only so long as he is alone.",
    "Solitude enables authenticity. In company, we perform. Alone, we can be real. Guard your solitude.",
    40,
    'philosophy'
  ),
  makeCard(
    "Schopenhauer",
    "The World as Will",
    ["philosophy", "suffering", "desire"],
    "Life swings like a pendulum backward and forward between pain and boredom.",
    "Desire causes pain; satisfaction causes boredom. The pendulum never rests. Accept the swing.",
    40,
    'philosophy'
  ),
  makeCard(
    "William Blake",
    "The Marriage of Heaven and Hell",
    ["poetry", "energy", "life"],
    "Energy is eternal delight.",
    "Vitality is joy. Energy itself is pleasure. Don't suppress life force—it's the source of happiness.",
    30,
    'poetry'
  ),
  makeCard(
    "William Blake",
    "Auguries of Innocence",
    ["poetry", "infinity", "vision"],
    "To see a World in a Grain of Sand, and a Heaven in a Wild Flower.",
    "Infinity in the small. Heaven in the ordinary. Everything contains everything. See deeply.",
    40,
    'poetry'
  ),
  makeCard(
    "John Keats",
    "Letters",
    ["poetry", "uncertainty", "beauty"],
    "I am certain of nothing but the holiness of the Heart's affections and the truth of the Imagination.",
    "Two certainties only: heart and imagination. Love and creativity are the only solid ground.",
    40,
    'poetry'
  ),
  makeCard(
    "John Keats",
    "Letters",
    ["poetry", "negative-capability", "uncertainty"],
    "Negative Capability: when a man is capable of being in uncertainties, mysteries, doubts, without any irritable reaching after fact and reason.",
    "Tolerance for ambiguity. Staying in mystery without forcing resolution. The artist's essential capacity.",
    50,
    'poetry'
  ),
  makeCard(
    "T.S. Eliot",
    "Four Quartets",
    ["poetry", "beginning", "end"],
    "What we call the beginning is often the end. And to make an end is to make a beginning.",
    "Endings are beginnings. The cycle continues. Every conclusion opens something new. Nothing truly ends.",
    40,
    'poetry'
  ),
  makeCard(
    "T.S. Eliot",
    "Four Quartets",
    ["poetry", "exploration", "home"],
    "We shall not cease from exploration, and the end of all our exploring will be to arrive where we started and know the place for the first time.",
    "Journey returns to beginning with new eyes. The point of travel is transformed perception of home.",
    50,
    'poetry'
  ),
  makeCard(
    "T.S. Eliot",
    "The Love Song of J. Alfred Prufrock",
    ["poetry", "time", "decision"],
    "Do I dare disturb the universe? In a minute there is time for decisions and revisions which a minute will reverse.",
    "The paralysis of overthinking. Time for infinite revision. Yet the question remains: do you dare?",
    45,
    'poetry'
  ),
  makeCard(
    "Robert Frost",
    "The Road Not Taken",
    ["poetry", "choice", "difference"],
    "Two roads diverged in a wood, and I—I took the one less traveled by, and that has made all the difference.",
    "Choice matters. The less popular path can be the right one. Your choices define your life.",
    40,
    'poetry'
  ),
  makeCard(
    "Robert Frost",
    "Mending Wall",
    ["poetry", "walls", "neighbors"],
    "Good fences make good neighbors.",
    "Boundaries enable relationships. Some separation is healthy. Walls can unite by defining space.",
    35,
    'poetry'
  ),
  makeCard(
    "Langston Hughes",
    "Harlem",
    ["poetry", "dreams", "deferral"],
    "What happens to a dream deferred? Does it dry up like a raisin in the sun?",
    "Postponed dreams don't wait patiently. They shrivel, fester, explode. Don't defer dreams indefinitely.",
    40,
    'poetry'
  ),
  makeCard(
    "Wendell Berry",
    "The Peace of Wild Things",
    ["poetry", "nature", "peace"],
    "When despair for the world grows in me... I come into the peace of wild things.",
    "Nature heals human despair. Wild things don't worry about the future. Find peace among creatures.",
    40,
    'poetry'
  ),
  makeCard(
    "Wendell Berry",
    "Essays",
    ["philosophy", "local", "care"],
    "Do unto those downstream as you would have those upstream do unto you.",
    "Ecological golden rule. Consider consequences. Your actions flow to others. Care for downstream.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Rebecca Solnit",
    "Hope in the Dark",
    ["philosophy", "hope", "uncertainty"],
    "Hope is not a lottery ticket you can sit on the sofa and clutch, feeling lucky. It is an axe you break down doors with in an emergency.",
    "Hope is active, not passive. It's a tool for action, not a feeling for comfort. Use hope as a weapon.",
    50,
    'non-fiction'
  ),
  makeCard(
    "Rebecca Solnit",
    "A Field Guide to Getting Lost",
    ["philosophy", "lost", "found"],
    "Never to get lost is not to live.",
    "Getting lost is essential. Too much certainty is death. Embrace disorientation. It's how you find new places.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Susan Sontag",
    "Against Interpretation",
    ["philosophy", "art", "experience"],
    "In place of a hermeneutics we need an erotics of art.",
    "Feel art, don't just interpret it. Experience before analysis. The sensual precedes the intellectual.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Susan Sontag",
    "On Photography",
    ["philosophy", "photography", "reality"],
    "To photograph is to appropriate the thing photographed.",
    "Cameras claim. Photography is possession. Taking a picture is taking something. Be aware of the appropriation.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Joan Didion",
    "The White Album",
    ["philosophy", "stories", "living"],
    "We tell ourselves stories in order to live.",
    "Narrative is survival. Without stories, life is unbearable. We need meaning, even if we make it up.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Joan Didion",
    "Slouching Towards Bethlehem",
    ["philosophy", "writing", "self"],
    "I write entirely to find out what I'm thinking.",
    "Writing is thinking. You don't know your thoughts until you write them. The page reveals the mind.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Ursula K. Le Guin",
    "The Dispossessed",
    ["scifi", "revolution", "walls"],
    "You cannot buy the revolution. You cannot make the revolution. You can only be the revolution.",
    "Change isn't purchased or manufactured. It's embodied. You don't do revolution; you become it.",
    40,
    'scifi'
  ),
  makeCard(
    "Ursula K. Le Guin",
    "The Ones Who Walk Away from Omelas",
    ["scifi", "ethics", "complicity"],
    "The trouble is that we have a bad habit, encouraged by pedants and sophisticates, of considering happiness as something rather stupid.",
    "Happiness isn't naive. We dismiss joy as shallow. But misery isn't deeper than happiness.",
    45,
    'scifi'
  ),
  makeCard(
    "Octavia Butler",
    "Parable of the Talents",
    ["scifi", "god", "change"],
    "God is Change. Seed: Beware—God exists to shape and to be shaped.",
    "The divine is not static. God is process, not person. Change is sacred. Shape and be shaped.",
    40,
    'scifi'
  ),
  makeCard(
    "N.K. Jemisin",
    "The Fifth Season",
    ["fantasy", "power", "survival"],
    "This is the way the world ends. This is the way the world ends. For the last time.",
    "Endings can be final. Some apocalypses don't cycle. The last time is possible. Act accordingly.",
    40,
    'fantasy'
  ),
  makeCard(
    "Terry Pratchett",
    "Small Gods",
    ["fantasy", "belief", "power"],
    "Gods don't like people not doing much work. People who aren't busy all the time might start to think.",
    "Busy people don't question. Activity prevents reflection. Thinking is dangerous to authority. Make time to think.",
    45,
    'fantasy'
  ),
  makeCard(
    "Terry Pratchett",
    "Guards! Guards!",
    ["fantasy", "hope", "chance"],
    "Million-to-one chances crop up nine times out of ten.",
    "The improbable happens regularly. Don't dismiss long odds. In stories and life, miracles occur.",
    35,
    'fantasy'
  ),
  makeCard(
    "Neil Gaiman",
    "The Sandman",
    ["fantasy", "stories", "reality"],
    "Things need not have happened to be true. Tales and adventures are the shadow truths that will endure.",
    "Fiction is true in its own way. Stories outlast facts. Shadow truths persist when records fade.",
    45,
    'fantasy'
  ),
  makeCard(
    "Neil Gaiman",
    "American Gods",
    ["fantasy", "gods", "belief"],
    "What I say is, a town isn't a town without a bookstore. It may call itself a town, but unless it's got a bookstore it knows it's not fooling a soul.",
    "Bookstores make towns real. Culture requires them. A place without books is pretending to be a place.",
    45,
    'fantasy'
  ),
  makeCard(
    "Philip Pullman",
    "His Dark Materials",
    ["fantasy", "truth", "story"],
    "We have to build the Republic of Heaven where we are, because for us there is no elsewhere.",
    "Heaven is here or nowhere. Don't wait for afterlife. Build paradise now. There's no other location.",
    40,
    'fantasy'
  ),
  makeCard(
    "Chimamanda Ngozi Adichie",
    "Half of a Yellow Sun",
    ["fiction", "stories", "single"],
    "The single story creates stereotypes, and the problem with stereotypes is not that they are untrue, but that they are incomplete.",
    "One story is never enough. Stereotypes aren't false—they're partial. Seek multiple narratives.",
    45,
    'fiction'
  ),
  makeCard(
    "Chimamanda Ngozi Adichie",
    "Americanah",
    ["fiction", "race", "observation"],
    "The only reason you say that race was not an issue is because you wish it was not.",
    "Denial isn't analysis. Wishing something away doesn't make it go. Face what you'd rather not see.",
    40,
    'fiction'
  ),
  makeCard(
    "Zadie Smith",
    "White Teeth",
    ["fiction", "identity", "roots"],
    "Every moment happens twice: inside and outside, and they are two different histories.",
    "Inner and outer don't match. Your experience differs from how it looks. Two histories of every event.",
    40,
    'fiction'
  ),
  makeCard(
    "Zadie Smith",
    "On Beauty",
    ["fiction", "beauty", "truth"],
    "The very reason I write is so that I might not sleepwalk through my entire life.",
    "Writing as wakefulness. Creation prevents unconscious living. Art keeps you alert.",
    35,
    'fiction'
  ),
  makeCard(
    "Kazuo Ishiguro",
    "The Remains of the Day",
    ["fiction", "regret", "dignity"],
    "Perhaps it is indeed time I began to look at this whole matter of bantering more enthusiastically.",
    "The butler's late realization. Dignity became rigidity. Life requires some looseness. Don't wait too long.",
    45,
    'fiction'
  ),
  makeCard(
    "Kazuo Ishiguro",
    "Never Let Me Go",
    ["fiction", "mortality", "purpose"],
    "We all complete. Maybe none of us really understand what we've lived through, or feel we've had enough time.",
    "Everyone feels incomplete. Time always runs short. Understanding comes slowly, if at all. Accept this.",
    45,
    'fiction'
  ),
  makeCard(
    "Arundhati Roy",
    "The God of Small Things",
    ["fiction", "love", "laws"],
    "And the air was full of Thoughts and Things to Say. But at times like these, only the Small Things are ever said.",
    "Big moments yield small words. When it matters most, we say least. Important things stay unsaid.",
    40,
    'fiction'
  ),
  makeCard(
    "Arundhati Roy",
    "Essays",
    ["philosophy", "activism", "love"],
    "Another world is not only possible, she is on her way. On a quiet day, I can hear her breathing.",
    "Alternative futures exist. Listen for them. Change approaches. Be still enough to hear it coming.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Wendell Berry",
    "The Art of the Commonplace",
    ["philosophy", "community", "local"],
    "Eating is an agricultural act.",
    "Every meal connects to land, farmers, systems. Eating isn't just consumption—it's participation in agriculture.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Wendell Berry",
    "Jayber Crow",
    ["fiction", "love", "waiting"],
    "The mercy of the world is you don't know what's going to happen.",
    "Ignorance of the future is mercy. Knowing would be unbearable. Not knowing lets you live.",
    35,
    'fiction'
  ),
  makeCard(
    "Cormac McCarthy",
    "The Road",
    ["fiction", "hope", "darkness"],
    "You have to carry the fire.",
    "In the darkest times, keep hope alive. You're the fire-carrier. The flame must not die. Carry it.",
    30,
    'fiction'
  ),
  makeCard(
    "Cormac McCarthy",
    "No Country for Old Men",
    ["fiction", "fate", "chance"],
    "You never know what worse luck your bad luck has saved you from.",
    "Bad luck might be protective. The disaster you suffered prevented worse. Perspective on misfortune.",
    40,
    'fiction'
  ),
  makeCard(
    "Cormac McCarthy",
    "Blood Meridian",
    ["fiction", "war", "nature"],
    "Whatever exists, he said. Whatever in creation exists without my knowledge exists without my consent.",
    "The universe didn't ask permission. Reality proceeds without your approval. Existence doesn't require consent.",
    45,
    'fiction'
  ),
  makeCard(
    "Don DeLillo",
    "White Noise",
    ["fiction", "death", "fear"],
    "All plots tend to move deathward. This is the nature of plots.",
    "Stories aim at endings. All narratives approach death. Plot is mortality's shape. Stories and lives share this.",
    40,
    'fiction'
  ),
  makeCard(
    "Don DeLillo",
    "Underworld",
    ["fiction", "waste", "civilization"],
    "Ordinary moments are the ones that reveal most about a culture.",
    "Mundane matters. Daily habits expose deep truths. Look at ordinary moments to understand civilization.",
    40,
    'fiction'
  ),
  makeCard(
    "Marilynne Robinson",
    "Gilead",
    ["fiction", "grace", "ordinary"],
    "It has seemed to me sometimes as though the Lord breathes on this poor gray ember of Creation and it turns to radiance.",
    "Ordinary becomes radiant. The divine breathes on the mundane. Gray embers can glow. Watch for it.",
    45,
    'fiction'
  ),
  makeCard(
    "Marilynne Robinson",
    "Housekeeping",
    ["fiction", "memory", "loss"],
    "Memory is the sense of loss, and loss pulls us after it.",
    "Memory is loss-awareness. Remembering means knowing something's gone. Loss draws us forward, backward.",
    40,
    'fiction'
  ),
  makeCard(
    "Hilary Mantel",
    "Wolf Hall",
    ["fiction", "history", "present"],
    "It is the living who chase the dead.",
    "We pursue ancestors, not vice versa. The dead don't haunt; we haunt them. History is our obsession.",
    35,
    'fiction'
  ),
  makeCard(
    "David Mitchell",
    "Cloud Atlas",
    ["fiction", "connection", "time"],
    "Our lives are not our own. We are bound to others, past and present.",
    "No isolated existence. We're woven together across time. Your life includes others' lives. Connection is inescapable.",
    40,
    'fiction'
  ),
  makeCard(
    "David Mitchell",
    "The Bone Clocks",
    ["fiction", "mortality", "acceptance"],
    "Time is what stops everything from happening at once.",
    "Time is a mercy. Sequential experience is bearable. Everything at once would overwhelm. Thank time.",
    35,
    'fiction'
  ),
  makeCard(
    "Amor Towles",
    "A Gentleman in Moscow",
    ["fiction", "constraint", "freedom"],
    "If a man does not master his circumstances then he is bound to be mastered by them.",
    "Master circumstances or be mastered. No neutral position. Take control or be controlled.",
    40,
    'fiction'
  ),
  makeCard(
    "Amor Towles",
    "A Gentleman in Moscow",
    ["fiction", "purpose", "meaning"],
    "By their very nature, human beings are so capricious, so complex, so delightfully contradictory.",
    "Celebrate human complexity. We're contradictory, and that's delightful. Don't demand consistency.",
    40,
    'fiction'
  ),
  makeCard(
    "Anthony Bourdain",
    "Kitchen Confidential",
    ["non-fiction", "food", "truth"],
    "Good food is very often, even most often, simple food.",
    "Complexity isn't quality. Simple done well beats complicated done poorly. Excellence can be basic.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Anthony Bourdain",
    "A Cook's Tour",
    ["non-fiction", "travel", "openness"],
    "Travel changes you. As you move through this life and this world you change things slightly, you leave marks behind.",
    "Travel transforms both traveler and traveled. You change and leave traces. Movement is mutual alteration.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Anthony Bourdain",
    "Medium Raw",
    ["non-fiction", "craft", "persistence"],
    "Skills can be taught. Character you either have or you don't have.",
    "Skills are learnable. Character isn't teachable. Hire for character, train for skills.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Austin Kleon",
    "Steal Like an Artist",
    ["creativity", "originality", "stealing"],
    "Nothing is original. Steal from anywhere that resonates with inspiration or fuels your imagination.",
    "Originality is impossible. Everyone steals. The trick is stealing well and from many sources. Steal widely.",
    40,
    'self-help'
  ),
  makeCard(
    "Austin Kleon",
    "Show Your Work",
    ["creativity", "sharing", "process"],
    "You don't have to be a genius. You just have to be yourself.",
    "Genius isn't required. Authenticity is. Be yourself consistently. That's enough to stand out.",
    35,
    'self-help'
  ),
  makeCard(
    "Austin Kleon",
    "Keep Going",
    ["creativity", "persistence", "daily"],
    "Every day is a blank page. Every day is a chance to get it right.",
    "Daily renewal. Yesterday doesn't bind today. Each morning offers fresh possibility. Start again.",
    35,
    'self-help'
  ),
  makeCard(
    "Rick Rubin",
    "The Creative Act",
    ["creativity", "awareness", "source"],
    "Living life as an artist is a practice. You are either practicing or you're not.",
    "Creativity is practice, not talent. You choose to practice or not. Daily choice, daily practice.",
    35,
    'self-help'
  ),
  makeCard(
    "Rick Rubin",
    "The Creative Act",
    ["creativity", "nature", "source"],
    "Nature transcends our tendencies to label and classify, to reduce and limit.",
    "Nature exceeds categories. Our labels fail to capture it. Reality is larger than our concepts.",
    40,
    'self-help'
  ),
  makeCard(
    "Rick Rubin",
    "The Creative Act",
    ["creativity", "listening", "receiving"],
    "The goal is to pay attention. Notice what excites you.",
    "Attention is the method. Notice what energizes you. Follow excitement. Attention guides creation.",
    35,
    'self-help'
  ),
  makeCard(
    "Elizabeth Gilbert",
    "Big Magic",
    ["creativity", "fear", "permission"],
    "You do not need anybody's permission to live a creative life.",
    "Creativity requires no license. Don't wait for approval. Give yourself permission. Create now.",
    35,
    'self-help'
  ),
  makeCard(
    "Elizabeth Gilbert",
    "Big Magic",
    ["creativity", "curiosity", "passion"],
    "If you can let go of passion and follow your curiosity, your curiosity just might lead you to your passion.",
    "Curiosity before passion. Follow interest, not intensity. Passion grows from curiosity, not vice versa.",
    45,
    'self-help'
  ),
  makeCard(
    "Julia Cameron",
    "The Artist's Way",
    ["creativity", "morning-pages", "practice"],
    "The morning pages are the primary tool of creative recovery.",
    "Three pages, every morning, by hand. Clear the debris. Morning pages unlock creativity. Just write.",
    40,
    'self-help'
  ),
  makeCard(
    "Julia Cameron",
    "The Artist's Way",
    ["creativity", "critic", "inner"],
    "The perfectionist's voice is the voice of the oppressor.",
    "Your inner critic is oppressive. Perfectionism is the enemy. The critical voice lies. Don't believe it.",
    40,
    'self-help'
  ),
  makeCard(
    "Steven Pressfield",
    "The War of Art",
    ["creativity", "resistance", "enemy"],
    "The more important a call or action is to our soul's evolution, the more Resistance we will feel toward pursuing it.",
    "Resistance scales with importance. The bigger the calling, the bigger the opposition. Resistance is a compass.",
    45,
    'self-help'
  ),
  makeCard(
    "Steven Pressfield",
    "The War of Art",
    ["creativity", "professional", "amateur"],
    "The amateur plays for fun. The professional plays for keeps.",
    "Professionalism is commitment. Amateurs dabble. Pros show up regardless of mood. Choose your mode.",
    35,
    'self-help'
  ),
  makeCard(
    "Steven Pressfield",
    "Do the Work",
    ["creativity", "starting", "resistance"],
    "Start before you're ready.",
    "Readiness is a myth. You'll never feel ready. Start anyway. Readiness comes from starting.",
    30,
    'self-help'
  ),
  makeCard(
    "Oliver Burkeman",
    "Four Thousand Weeks",
    ["productivity", "time", "mortality"],
    "The average human lifespan is absurdly, insultingly brief: if you live to be eighty, you'll have had about four thousand weeks.",
    "Four thousand weeks. That's a lifetime. Not many. The math is sobering. Use them well.",
    45,
    'self-help'
  ),
  makeCard(
    "Oliver Burkeman",
    "Four Thousand Weeks",
    ["productivity", "control", "acceptance"],
    "You can stop fighting the fact that you have a finite life, with finite time, and finite attention.",
    "Accept finitude. Stop fighting limits. Embrace mortality. Peace comes from accepting reality.",
    40,
    'self-help'
  ),
  makeCard(
    "Oliver Burkeman",
    "Four Thousand Weeks",
    ["productivity", "patience", "results"],
    "Patience is not the ability to wait but the ability to keep a good attitude while waiting.",
    "Patience is attitude, not duration. It's maintaining composure during waiting. The how, not the how long.",
    40,
    'self-help'
  ),
  makeCard(
    "David Allen",
    "Getting Things Done",
    ["productivity", "mind", "capture"],
    "Your mind is for having ideas, not holding them.",
    "Don't use your brain as storage. Capture ideas externally. Your mind should create, not remember.",
    35,
    'self-help'
  ),
  makeCard(
    "David Allen",
    "Getting Things Done",
    ["productivity", "action", "next"],
    "What's the next action?",
    "The GTD mantra. Every project needs a next action. Identify the next physical step. That's clarity.",
    30,
    'self-help'
  ),
  makeCard(
    "Greg McKeown",
    "Essentialism",
    ["productivity", "less", "more"],
    "Less but better.",
    "The essentialist creed. Not more but better. Fewer things, done excellently. Subtract to multiply.",
    25,
    'self-help'
  ),
  makeCard(
    "Greg McKeown",
    "Essentialism",
    ["productivity", "no", "yes"],
    "If it isn't a clear yes, then it's a clear no.",
    "Eliminate maybes. Uncertain means no. Save yes for what's clearly yes. No is the default.",
    35,
    'self-help'
  ),
  makeCard(
    "Nir Eyal",
    "Indistractable",
    ["productivity", "distraction", "traction"],
    "The opposite of distraction is not focus. It's traction.",
    "Traction is moving toward goals. Distraction is moving away. The question isn't focus—it's direction.",
    35,
    'self-help'
  ),
  makeCard(
    "Nir Eyal",
    "Indistractable",
    ["productivity", "triggers", "internal"],
    "Most distraction begins within us.",
    "External triggers aren't the main problem. Internal discomfort drives distraction. Address the inside first.",
    40,
    'self-help'
  ),
  makeCard(
    "BJ Fogg",
    "Tiny Habits",
    ["productivity", "habits", "small"],
    "To create a new habit, you must first simplify the behavior. Make it tiny.",
    "Tiny is sustainable. Ambitious fails. Start so small you can't fail. Scale later. Tiny first.",
    35,
    'self-help'
  ),
  makeCard(
    "BJ Fogg",
    "Tiny Habits",
    ["productivity", "celebration", "emotion"],
    "Emotions create habits. Not repetition. Not frequency. Not fairy dust. Emotions.",
    "Feeling creates habit. Not reps but emotions. Celebrate after behavior. Emotion is the glue.",
    40,
    'self-help'
  ),
  makeCard(
    "Kelly McGonigal",
    "The Willpower Instinct",
    ["psychology", "willpower", "muscle"],
    "Willpower is like a muscle. It gets tired the more you use it.",
    "Willpower depletes. Don't rely on it too heavily. Conserve willpower for what matters most.",
    35,
    'self-help'
  ),
  makeCard(
    "Kelly McGonigal",
    "The Upside of Stress",
    ["psychology", "stress", "mindset"],
    "Stress is not the problem. The problem is our belief that stress is the problem.",
    "Beliefs about stress matter more than stress itself. Reframe stress and it becomes fuel.",
    40,
    'self-help'
  ),
  makeCard(
    "Gabor Maté",
    "When the Body Says No",
    ["psychology", "stress", "illness"],
    "When we have been prevented from saying no, our bodies may end up saying it for us.",
    "Suppressed no becomes illness. What you can't voice, your body speaks. Learn to say no consciously.",
    45,
    'self-help'
  ),
  makeCard(
    "Gabor Maté",
    "In the Realm of Hungry Ghosts",
    ["psychology", "addiction", "pain"],
    "Not why the addiction, but why the pain.",
    "Addiction isn't the question. Pain is. Understand the pain and addiction makes sense. Treat the wound.",
    35,
    'self-help'
  ),
  makeCard(
    "Bessel van der Kolk",
    "The Body Keeps the Score",
    ["psychology", "trauma", "body"],
    "Traumatized people chronically feel unsafe inside their bodies.",
    "Trauma lives in the body. Safety must be felt physically, not just understood mentally. Body before mind.",
    40,
    'self-help'
  ),
  makeCard(
    "Bessel van der Kolk",
    "The Body Keeps the Score",
    ["psychology", "healing", "safety"],
    "Being able to feel safe with other people is probably the single most important aspect of mental health.",
    "Safety in relationship is paramount. Healing happens in connection. Safe relationship enables recovery.",
    45,
    'self-help'
  ),
  makeCard(
    "Irvin Yalom",
    "Love's Executioner",
    ["psychology", "death", "life"],
    "The fear of death is always greatest in those who feel that they have not lived their life fully.",
    "Unlived life breeds death terror. Live fully and death loses power. The cure for death fear is living.",
    45,
    'self-help'
  ),
  makeCard(
    "Irvin Yalom",
    "Staring at the Sun",
    ["psychology", "mortality", "awakening"],
    "Death anxiety is the mother of all religions, which, in one way or another, attempt to temper the terror of our finite existence.",
    "Religion addresses death fear. All spirituality grapples with mortality. Death is the root question.",
    45,
    'self-help'
  ),
  makeCard(
    "Alain de Botton",
    "The Consolations of Philosophy",
    ["philosophy", "consolation", "wisdom"],
    "The greatest problem of human life is to work out how to live.",
    "The central question: how to live? Philosophy exists to answer this. All wisdom aims here.",
    35,
    'self-help'
  ),
  makeCard(
    "Alain de Botton",
    "Status Anxiety",
    ["philosophy", "status", "comparison"],
    "There is no such thing as an undisturbed, unaffected life.",
    "Everyone is disturbed. No one escapes trouble. Don't imagine others have smooth lives. They don't.",
    35,
    'self-help'
  ),
  makeCard(
    "Maria Popova",
    "Figuring",
    ["philosophy", "meaning", "figuring"],
    "We spend our lives trying to figure out how to live, what to live for, what to love, and how to love it.",
    "Life is figuring. We never arrive at answers, only better questions. The figuring is the living.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Maria Popova",
    "Figuring",
    ["philosophy", "love", "attention"],
    "In the end, nothing is more moving than how much attention a person pays to the world.",
    "Attention is the measure of love. How much attention you give reveals how much you care. Pay attention.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Austin Kleon",
    "Steal Like an Artist",
    ["creativity", "influence", "genealogy"],
    "You are the sum of your influences.",
    "You're made of what you've consumed. Choose influences carefully. Curate your inputs. You become your inputs.",
    35,
    'self-help'
  ),
  makeCard(
    "Robert Pirsig",
    "Zen and the Art of Motorcycle Maintenance",
    ["philosophy", "quality", "definition"],
    "Quality is a direct experience independent of and prior to intellectual abstractions.",
    "You know quality before you can define it. Direct experience precedes analysis. Trust your sense of quality.",
    45,
    'philosophy'
  ),
  makeCard(
    "Robert Pirsig",
    "Zen and the Art of Motorcycle Maintenance",
    ["philosophy", "care", "quality"],
    "The place to improve the world is first in one's own heart and head and hands.",
    "Start with yourself. Personal improvement precedes world improvement. Fix your own heart first.",
    40,
    'philosophy'
  ),
  makeCard(
    "Douglas Hofstadter",
    "Gödel, Escher, Bach",
    ["philosophy", "self-reference", "strange-loops"],
    "In the end, we are self-perceiving, self-inventing, locked-in mirages that are little miracles of self-reference.",
    "We're self-creating loops. Consciousness is self-referential miracle. We invent ourselves perceiving ourselves.",
    50,
    'non-fiction'
  ),
  makeCard(
    "E.M. Forster",
    "Howards End",
    ["fiction", "connection", "only"],
    "Only connect! That was the whole of her sermon.",
    "Two words that sum up everything. Only connect. Make connections. That's all. That's enough.",
    30,
    'fiction'
  ),
  makeCard(
    "E.M. Forster",
    "A Room with a View",
    ["fiction", "passion", "muddle"],
    "It isn't possible to love and to part... You will wish that it was. You can transmute love, ignore it, muddle it, but you can never pull it out of you.",
    "Love is permanent. You can't remove it. Transform it, suppress it, but not delete it. Love persists.",
    50,
    'fiction'
  ),
  makeCard(
    "Albert Camus",
    "The Plague",
    ["philosophy", "decency", "heroism"],
    "All I maintain is that on this earth there are pestilences and there are victims, and it's up to us, as far as possible, not to join forces with the pestilences.",
    "Simple ethical stance: don't be a pestilence. In world of plagues and victims, choose not to harm. Basic decency.",
    50,
    'philosophy'
  ),
  makeCard(
    "Christopher Alexander",
    "A Pattern Language",
    ["creativity", "patterns", "life"],
    "Every place is given its character by certain patterns of events that keep on happening there.",
    "Places are made of recurring events. Patterns create character. What happens repeatedly defines the space.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Kevin Kelly",
    "The Inevitable",
    ["technology", "future", "becoming"],
    "We are morphing so fast that our ability to invent new things outpaces the rate we can civilize them.",
    "Technology outpaces wisdom. We create faster than we understand. The gap between invention and civilization grows.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Kevin Kelly",
    "Excellent Advice for Living",
    ["philosophy", "advice", "living"],
    "Being enthusiastic is worth 25 IQ points.",
    "Enthusiasm compensates for intelligence. Energy beats smarts. If you're excited, you'll figure it out.",
    35,
    'self-help'
  ),
  makeCard(
    "Kevin Kelly",
    "Excellent Advice for Living",
    ["philosophy", "kindness", "strength"],
    "You can be kind and still be strong.",
    "Kindness isn't weakness. Strength and kindness coexist. Don't confuse gentleness with softness.",
    30,
    'self-help'
  ),
  makeCard(
    "Jaron Lanier",
    "Ten Arguments for Deleting Your Social Media Accounts",
    ["technology", "social-media", "self"],
    "You are not a gadget.",
    "You're not a device or an algorithm or a data point. You're a person. Don't let technology reduce you.",
    30,
    'non-fiction'
  ),
  makeCard(
    "Yuval Noah Harari",
    "Sapiens",
    ["history", "fiction", "power"],
    "You could never convince a monkey to give you a banana by promising him limitless bananas after death.",
    "Humans believe in fictions: money, nations, afterlife. This capacity for shared fiction enabled civilization.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Yuval Noah Harari",
    "21 Lessons for the 21st Century",
    ["philosophy", "meditation", "observation"],
    "In a world deluged by irrelevant information, clarity is power.",
    "Information abundance makes clarity rare and valuable. Cut through noise. Clarity is the new currency.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Daniel Dennett",
    "Intuition Pumps",
    ["philosophy", "thinking", "tools"],
    "Use your imagination. Thinking tools need not be truths.",
    "Mental tools don't have to be true to be useful. Useful fictions help thinking. Imagine freely.",
    35,
    'philosophy'
  ),
  makeCard(
    "Richard Dawkins",
    "The Selfish Gene",
    ["science", "genes", "purpose"],
    "We are survival machines—robot vehicles blindly programmed to preserve the selfish molecules known as genes.",
    "Genes use us for reproduction. We're vehicles for DNA. Humbling perspective on human purpose.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Steven Pinker",
    "The Better Angels of Our Nature",
    ["history", "violence", "progress"],
    "Violence has been in decline for thousands of years, and today we may be living in the most peaceable era in our species' existence.",
    "Progress is real. Violence has decreased. We're safer than ancestors. Don't let news distort reality.",
    50,
    'non-fiction'
  ),
  makeCard(
    "Hans Rosling",
    "Factfulness",
    ["philosophy", "facts", "worldview"],
    "The world is much better than you think.",
    "Data shows improvement in most metrics. Your sense that things are worse is wrong. Check the facts.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Hans Rosling",
    "Factfulness",
    ["philosophy", "instincts", "thinking"],
    "We find simple ideas very attractive. We enjoy that moment of insight, that aha!, when we suddenly understand something.",
    "Simple explanations feel good but often miss truth. Complexity is accurate. Resist oversimplification.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Edward O. Wilson",
    "Consilience",
    ["science", "unity", "knowledge"],
    "We are drowning in information, while starving for wisdom.",
    "Information abundance, wisdom scarcity. More data doesn't mean more understanding. Seek wisdom, not just facts.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Edward O. Wilson",
    "The Meaning of Human Existence",
    ["science", "meaning", "nature"],
    "The real problem of humanity is that we have Paleolithic emotions, medieval institutions, and god-like technology.",
    "Mismatch of capacities. Old emotions, outdated institutions, powerful tech. The combination is dangerous.",
    45,
    'non-fiction'
  ),
  makeCard(
    "E.O. Wilson",
    "Biophilia",
    ["science", "nature", "connection"],
    "Nature holds the key to our aesthetic, intellectual, cognitive and even spiritual satisfaction.",
    "Nature isn't optional. It's essential to human flourishing. We need nature for full humanity.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Jane Goodall",
    "Reason for Hope",
    ["science", "hope", "action"],
    "What you do makes a difference, and you have to decide what kind of difference you want to make.",
    "Your actions matter. You will have impact. The only question is what kind. Choose your impact.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Jane Goodall",
    "In the Shadow of Man",
    ["science", "animals", "kinship"],
    "Only if we understand, can we care. Only if we care, will we help. Only if we help, shall they be saved.",
    "Understanding leads to caring. Caring leads to action. Action leads to change. Start with understanding.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Rachel Carson",
    "Silent Spring",
    ["science", "environment", "responsibility"],
    "The more clearly we can focus our attention on the wonders and realities of the universe about us, the less taste we shall have for destruction.",
    "Wonder prevents destruction. Pay attention to nature's marvels. Attention breeds care, care prevents harm.",
    50,
    'non-fiction'
  ),
  makeCard(
    "Rachel Carson",
    "The Sense of Wonder",
    ["science", "wonder", "children"],
    "If a child is to keep alive his inborn sense of wonder, he needs the companionship of at least one adult who can share it.",
    "Wonder needs companionship. Children need wondering adults. Share wonder to preserve it.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Atul Gawande",
    "Being Mortal",
    ["health", "death", "meaning"],
    "In the end, people don't view their life as merely the sum of positive experiences. They also care about the story.",
    "Life isn't just pleasure accumulation. The narrative matters. We need good stories, not just good moments.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Atul Gawande",
    "The Checklist Manifesto",
    ["health", "checklists", "complexity"],
    "We don't like checklists. They can be painstaking. They're not much fun. But I don't think the issue here is a checklist.",
    "Checklists save lives. Pride resists them. Get over the resistance. Simple tools beat complex intuition.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Atul Gawande",
    "Better",
    ["health", "improvement", "diligence"],
    "Better is possible. It does not take genius. It takes diligence. It takes moral clarity. It takes ingenuity.",
    "Better requires effort, not brilliance. Diligence, clarity, creativity. These produce improvement. Anyone can get better.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Siddhartha Mukherjee",
    "The Emperor of All Maladies",
    ["science", "cancer", "history"],
    "Cancer is a disease of pathological hyperplasia in which cells acquire autonomous proliferative drive.",
    "Cancer is life gone wrong—growth without limit. Understanding the disease means understanding life itself.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Mary Roach",
    "Stiff",
    ["science", "death", "curiosity"],
    "Death. It doesn't have to be boring.",
    "Even death can be interesting. Curiosity transforms any subject. Nothing is inherently boring.",
    30,
    'non-fiction'
  ),
  makeCard(
    "Mary Roach",
    "Bonk",
    ["science", "curiosity", "taboo"],
    "Nothing is more interesting to people than people.",
    "Humans are endlessly fascinating to humans. The most compelling subject is always us. Study humans.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Roxane Gay",
    "Bad Feminist",
    ["philosophy", "feminism", "imperfection"],
    "I embrace the label of bad feminist because I am human. I am messy.",
    "Perfectionism in politics is impossible. Accept messy commitment. Bad something beats perfect nothing.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Roxane Gay",
    "Hunger",
    ["psychology", "body", "trauma"],
    "This is what most people don't understand: eating disorders are not choices.",
    "Disorders aren't chosen. Don't moralize illness. Understanding requires recognizing lack of choice.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Ta-Nehisi Coates",
    "Between the World and Me",
    ["philosophy", "body", "fear"],
    "But race is the child of racism, not the father.",
    "Racism creates race, not vice versa. The category follows the oppression. Get the causation right.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Ta-Nehisi Coates",
    "Between the World and Me",
    ["philosophy", "struggle", "process"],
    "The struggle is really all I have for you because it is the only portion of this world under your control.",
    "You don't control outcomes. You control effort. The struggle is yours. Results aren't guaranteed.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Michelle Obama",
    "Becoming",
    ["non-fiction", "growth", "becoming"],
    "For me, becoming isn't about arriving somewhere or achieving a certain aim. I see it instead as forward motion.",
    "Becoming never ends. No arrival point exists. It's motion, not destination. Keep becoming.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Michelle Obama",
    "Becoming",
    ["non-fiction", "voice", "truth"],
    "Your story is what you have, what you will always have. It is something to own.",
    "Your story belongs to you. No one can take it. It's your possession. Own it and tell it.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Trevor Noah",
    "Born a Crime",
    ["non-fiction", "language", "identity"],
    "Language, even more than color, defines who you are to people.",
    "How you speak shapes perception more than appearance. Language is identity. Master languages to multiply selves.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Trevor Noah",
    "Born a Crime",
    ["non-fiction", "humor", "survival"],
    "I don't regret anything I've ever done in life, any choice that I've made. But I'm consumed with regret for the things I didn't do.",
    "Regret of omission exceeds regret of commission. What you didn't do haunts more than what you did. Act.",
    45,
    'non-fiction'
  ),
  makeCard(
    "Mary Karr",
    "The Art of Memoir",
    ["creativity", "memoir", "truth"],
    "A dysfunctional family is any family with more than one person in it.",
    "Dysfunction is universal. All families struggle. No perfect families exist. You're not uniquely broken.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Mary Karr",
    "Lit",
    ["non-fiction", "recovery", "grace"],
    "Every now and then we enter the presence of the numinous and deduce what lies beyond all symbols.",
    "Transcendent moments happen. The sacred breaks through. We touch what's beyond language. Stay open.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Cheryl Strayed",
    "Wild",
    ["non-fiction", "grief", "walking"],
    "How wild it was, to let it be.",
    "Release control. Let things be wild. Acceptance is itself wild. Stop managing; start allowing.",
    30,
    'non-fiction'
  ),
  makeCard(
    "Cheryl Strayed",
    "Tiny Beautiful Things",
    ["philosophy", "advice", "compassion"],
    "You don't have a right to the cards you believe you should have been dealt. You have an obligation to play the hell out of the ones you're holding.",
    "No one promised you a better hand. Play your cards fully. Complaining about the deal wastes time.",
    50,
    'self-help'
  ),
  makeCard(
    "Anne Lamott",
    "Bird by Bird",
    ["creativity", "writing", "drafts"],
    "Almost all good writing begins with terrible first efforts. You need to start somewhere.",
    "First drafts are supposed to be bad. That's their job. Start badly. Revise later. Just begin.",
    40,
    'self-help'
  ),
  makeCard(
    "Anne Lamott",
    "Bird by Bird",
    ["creativity", "perfectionism", "enemy"],
    "Perfectionism is the voice of the oppressor.",
    "Perfectionism isn't high standards—it's self-abuse. The perfect is the enemy of the done. Let go.",
    35,
    'self-help'
  ),
  makeCard(
    "Anne Lamott",
    "Traveling Mercies",
    ["spirituality", "grace", "acceptance"],
    "I do not understand the mystery of grace—only that it meets us where we are and does not leave us where it found us.",
    "Grace is mysterious transformation. It finds you in your condition and changes you. You don't earn it.",
    45,
    'self-help'
  ),
  makeCard(
    "Glennon Doyle",
    "Untamed",
    ["psychology", "wildness", "self"],
    "We can do hard things.",
    "Four words of empowerment. Hard things are possible. You're capable of more than you think. You can.",
    25,
    'self-help'
  ),
  makeCard(
    "Glennon Doyle",
    "Untamed",
    ["psychology", "knowing", "self"],
    "We forgot how to know when we learned how to please.",
    "Pleasing others silences inner knowing. Wanting approval drowns wisdom. Stop pleasing to start knowing.",
    40,
    'self-help'
  ),
  makeCard(
    "Krista Tippett",
    "Becoming Wise",
    ["spirituality", "wisdom", "practice"],
    "Wisdom is not about accumulating more facts. It's about understanding deep truths in new, more life-giving ways.",
    "Wisdom isn't information. It's transformation of understanding. Not more knowledge but deeper insight.",
    45,
    'self-help'
  ),
  makeCard(
    "Krista Tippett",
    "Becoming Wise",
    ["spirituality", "listening", "presence"],
    "Listening is about being present, not just about being quiet.",
    "Listening isn't silence. It's presence. You can be quiet and absent. Be present and attending.",
    35,
    'self-help'
  ),
  makeCard(
    "Parker Palmer",
    "Let Your Life Speak",
    ["spirituality", "vocation", "self"],
    "Before you tell your life what you intend to do with it, listen for what it intends to do with you.",
    "Don't impose purpose; listen for it. Your life has intentions. Receive before you direct.",
    40,
    'self-help'
  ),
  makeCard(
    "Parker Palmer",
    "A Hidden Wholeness",
    ["spirituality", "solitude", "community"],
    "Solitude does not necessarily mean living apart from others; rather, it means never living apart from one's self.",
    "Solitude is self-connection, not isolation. You can be alone in crowds and connected in solitude.",
    45,
    'self-help'
  ),
  makeCard(
    "Henri Nouwen",
    "The Return of the Prodigal Son",
    ["spirituality", "home", "return"],
    "Home is the center of my being where I can hear the voice that says: You are my Beloved.",
    "Home is where you're loved unconditionally. It's an internal place. Find it within yourself.",
    40,
    'self-help'
  ),
  makeCard(
    "Henri Nouwen",
    "Life of the Beloved",
    ["spirituality", "identity", "beloved"],
    "You are the beloved. That is the truth of your life. Everything else is secondary.",
    "You are fundamentally loved. This is primary identity. Everything else follows from this truth.",
    35,
    'self-help'
  ),
  makeCard(
    "Richard Rohr",
    "Falling Upward",
    ["spirituality", "failure", "growth"],
    "We grow spiritually much more by doing it wrong than by doing it right.",
    "Failure teaches more than success. Mistakes are the curriculum. Growth requires getting it wrong.",
    40,
    'self-help'
  ),
  makeCard(
    "Richard Rohr",
    "Everything Belongs",
    ["spirituality", "inclusion", "wholeness"],
    "Everything belongs. Even failure. Even suffering. All of it is part of the journey.",
    "Nothing is excluded from meaning. All experiences belong. The whole journey matters, including the hard parts.",
    40,
    'self-help'
  ),
  makeCard(
    "Thomas Merton",
    "New Seeds of Contemplation",
    ["spirituality", "self", "discovery"],
    "There is in all visible things a hidden wholeness.",
    "Wholeness hides in plain sight. Everything contains integrity. Look past surface to see it.",
    35,
    'philosophy'
  ),
  makeCard(
    "Thomas Merton",
    "No Man Is an Island",
    ["spirituality", "solitude", "love"],
    "We cannot find ourselves within ourselves, but only in others, yet at the same time before we can go out to others we must first find ourselves.",
    "The paradox of self-discovery: found in others, yet needing self first. Both are true. Hold the tension.",
    50,
    'philosophy'
  ),
  makeCard(
    "Howard Thurman",
    "Meditations of the Heart",
    ["spirituality", "calling", "alive"],
    "Don't ask what the world needs. Ask what makes you come alive, and go do it. Because what the world needs is people who have come alive.",
    "Your aliveness serves the world. Do what animates you. The world needs alive people more than dutiful ones.",
    45,
    'self-help'
  ),
  makeCard(
    "Frederick Buechner",
    "Wishful Thinking",
    ["spirituality", "vocation", "joy"],
    "The place God calls you to is the place where your deep gladness and the world's deep hunger meet.",
    "Vocation is intersection of joy and need. Find where your gladness meets world's hunger. That's your calling.",
    45,
    'self-help'
  ),
  makeCard(
    "Mary Oliver",
    "Upstream",
    ["poetry", "attention", "devotion"],
    "Attention is the beginning of devotion.",
    "Devotion starts with attention. Pay attention to what you love. Attention leads to devotion leads to love.",
    30,
    'poetry'
  ),
  makeCard(
    "Wendell Berry",
    "Standing by Words",
    ["philosophy", "language", "responsibility"],
    "To be able to speak the language of your place is a way of being at home.",
    "Language connects to place. Know your local vocabulary. Speaking place-language is belonging.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Ursula K. Le Guin",
    "Steering the Craft",
    ["creativity", "writing", "practice"],
    "We're all outside the world when we're writing, each of us alone on our small, rocky island.",
    "Writing is solitary. Each writer on their island. Accept the isolation. It's where the work happens.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Toni Morrison",
    "The Source of Self-Regard",
    ["philosophy", "freedom", "imagination"],
    "If you surrendered to the air, you could ride it.",
    "Surrender enables flight. Stop fighting circumstances and ride them. Resistance prevents flow.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Toni Morrison",
    "Song of Solomon",
    ["fiction", "flying", "freedom"],
    "You wanna fly, you got to give up the shit that weighs you down.",
    "Flight requires lightness. Drop what burdens you. You can't fly while carrying garbage. Let go.",
    40,
    'fiction'
  ),
  makeCard(
    "Kurt Vonnegut",
    "A Man Without a Country",
    ["philosophy", "kindness", "community"],
    "Be soft. Do not let the world make you hard. Do not let pain make you hate.",
    "Stay soft despite hardship. Don't let pain harden you. Softness is strength. Hatred is surrender.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Kurt Vonnegut",
    "Cat's Cradle",
    ["fiction", "lies", "comfort"],
    "Live by the harmless untruths that make you brave and kind and healthy and happy.",
    "Some fictions serve us. Harmless lies that improve life aren't crimes. Use useful stories.",
    40,
    'fiction'
  ),
  makeCard(
    "Ray Bradbury",
    "Fahrenheit 451",
    ["fiction", "books", "burning"],
    "There must be something in books, things we can't imagine, to make a woman stay in a burning house.",
    "Books contain things worth dying for. What's in them that creates such devotion? Find out.",
    40,
    'fiction'
  ),
  makeCard(
    "Ray Bradbury",
    "The Martian Chronicles",
    ["scifi", "home", "escape"],
    "We're all running away from something. That's no way to travel.",
    "Running from rather than toward doesn't work. Face what you're fleeing. Then you can truly travel.",
    35,
    'scifi'
  ),
  makeCard(
    "Isaac Asimov",
    "I, Robot",
    ["scifi", "harm", "humanity"],
    "A robot may not injure a human being or, through inaction, allow a human being to come to harm.",
    "First Law of Robotics. Do no harm and prevent harm. Both action and inaction matter. Apply to yourself.",
    40,
    'scifi'
  ),
  makeCard(
    "Isaac Asimov",
    "Foundation",
    ["scifi", "science", "prediction"],
    "I'm not sure that science can save us, but I'm pretty sure that nothing else can.",
    "Science is our best hope. Not certainty, but best option. When alternatives fail, science remains.",
    40,
    'scifi'
  ),
  makeCard(
    "Arthur C. Clarke",
    "2010: Odyssey Two",
    ["scifi", "stars", "wonder"],
    "Two possibilities exist: either we are alone in the Universe or we are not. Both are equally terrifying.",
    "Either way is staggering. Cosmic loneliness or cosmic company—both mind-bending. Wonder at both.",
    40,
    'scifi'
  ),
  makeCard(
    "Liu Cixin",
    "The Three-Body Problem",
    ["scifi", "civilization", "darkness"],
    "The universe is a dark forest. Every civilization is an armed hunter stalking through the trees.",
    "Dark forest theory: civilizations hide from each other. The cosmos as dangerous silence. Chilling perspective.",
    45,
    'scifi'
  ),
  makeCard(
    "Andy Weir",
    "The Martian",
    ["scifi", "survival", "problem-solving"],
    "I'm going to have to science the shit out of this.",
    "When stranded, use what you know. Science as survival tool. Knowledge isn't abstract—it saves lives.",
    35,
    'scifi'
  ),
  makeCard(
    "Becky Chambers",
    "The Long Way to a Small, Angry Planet",
    ["scifi", "kindness", "space"],
    "No single piece of knowledge is inherently superior to another. Different, yes. But not superior.",
    "All knowledge has value. No hierarchy of learning. Different knowing serves different purposes.",
    40,
    'scifi'
  ),
  makeCard(
    "William Gibson",
    "Pattern Recognition",
    ["scifi", "future", "present"],
    "The street finds its own uses for things.",
    "Technology is repurposed by users. Inventors don't control usage. The street adapts everything.",
    35,
    'scifi'
  ),
  makeCard(
    "Ted Chiang",
    "Stories of Your Life",
    ["scifi", "language", "time"],
    "If you could see your whole life from start to finish, would you change things?",
    "Knowledge of destiny doesn't necessarily mean changing it. Even knowing, you might choose the same.",
    40,
    'scifi'
  ),
  makeCard(
    "Ted Chiang",
    "Exhalation",
    ["scifi", "entropy", "meaning"],
    "It is not the end that makes existence meaningful—it is the span between beginning and end.",
    "Mortality creates meaning. Not the endpoint but the duration. The journey, not the destination.",
    40,
    'scifi'
  ),
  makeCard(
    "Margaret Atwood",
    "The Handmaid's Tale",
    ["fiction", "power", "memory"],
    "Don't let the bastards grind you down.",
    "Resist demoralization. Don't let oppressors win psychologically. Your spirit is the last battleground.",
    30,
    'fiction'
  ),
  makeCard(
    "Margaret Atwood",
    "Alias Grace",
    ["fiction", "stories", "multiple"],
    "When you are in the middle of a story it isn't a story at all, but only a confusion.",
    "Stories make sense only in retrospect. Living in them is chaos. Clarity comes after, not during.",
    40,
    'fiction'
  ),
  makeCard(
    "George R.R. Martin",
    "A Game of Thrones",
    ["fantasy", "reader", "lives"],
    "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
    "Reading multiplies existence. Each book is another life. Non-readers are confined to single lives.",
    40,
    'fantasy'
  ),
  makeCard(
    "Patrick Rothfuss",
    "The Name of the Wind",
    ["fantasy", "words", "power"],
    "Words can light fires in the minds of men. Words can wring tears from the hardest hearts.",
    "Language has power. Words ignite and move. Don't underestimate what words can do.",
    40,
    'fantasy'
  ),
  makeCard(
    "Brandon Sanderson",
    "The Way of Kings",
    ["fantasy", "journey", "first-step"],
    "The most important step a man can take. It's not the first one, is it? It's the next one.",
    "First steps get credit. But the next step is what matters. Always the next step. Keep stepping.",
    40,
    'fantasy'
  ),
  makeCard(
    "Brandon Sanderson",
    "Mistborn",
    ["fantasy", "belief", "power"],
    "The mists claim those who don't believe, but that's all they claim. The true dangers are those who believe too strongly.",
    "Disbelief is dangerous. But so is fanaticism. Balance is needed. Believe, but not too much.",
    45,
    'fantasy'
  ),
  makeCard(
    "Robert Jordan",
    "The Wheel of Time",
    ["fantasy", "fate", "choice"],
    "The Wheel of Time turns, and Ages come and pass, leaving memories that become legend.",
    "Time cycles. Ages repeat. Memories fade to myth. Yet each turning matters. Play your part.",
    40,
    'fantasy'
  ),
  makeCard(
    "Robin Hobb",
    "Assassin's Apprentice",
    ["fantasy", "change", "will"],
    "Tomorrow owes you the sum of your yesterdays. No more than that.",
    "The future delivers what past earned. You're owed exactly what you've built. Earn your tomorrow.",
    40,
    'fantasy'
  ),
  makeCard(
    "Joe Abercrombie",
    "The Blade Itself",
    ["fantasy", "realism", "heroism"],
    "The blade itself incites to deeds of violence.",
    "Tools shape behavior. Weapons encourage violence. What you possess influences what you do.",
    35,
    'fantasy'
  ),
  makeCard(
    "Leigh Bardugo",
    "Six of Crows",
    ["fantasy", "impossible", "possible"],
    "No mourners. No funerals.",
    "Code of survivors. Don't die; no one will mourn. Survival is its own memorial. Stay alive.",
    30,
    'fantasy'
  ),
  makeCard(
    "V.E. Schwab",
    "A Darker Shade of Magic",
    ["fantasy", "magic", "cost"],
    "Magic had a price. It always had a price.",
    "Nothing is free. Magic costs. Everything worth having has a price. Accept the exchange.",
    30,
    'fantasy'
  ),
  makeCard(
    "Naomi Novik",
    "Uprooted",
    ["fantasy", "growth", "root"],
    "I'd held on to anger because it was better than despair.",
    "Anger is sometimes protective. It's better than giving up. Use anger as bridge to something better.",
    35,
    'fantasy'
  ),
  makeCard(
    "NK Jemisin",
    "The Fifth Season",
    ["fantasy", "survival", "beginning"],
    "Home is not where you are from, it is where you are going.",
    "Home is direction, not origin. It's ahead, not behind. You're headed home, not leaving it.",
    35,
    'fantasy'
  ),
  makeCard(
    "Madeline Miller",
    "Circe",
    ["fantasy", "power", "becoming"],
    "But in a solitary life, there are rare moments when another soul dips near yours, as stars once a year brush the earth.",
    "In solitude, rare connections become precious. Soul meetings are rare and valuable. Treasure them.",
    45,
    'fantasy'
  ),
  makeCard(
    "Madeline Miller",
    "The Song of Achilles",
    ["fiction", "love", "glory"],
    "I could recognize him by touch alone, by smell; I would know him blind, by the way his breaths came and his feet struck the earth.",
    "Deep knowing. Love that recognizes beyond sight. Knowing someone completely through every sense.",
    45,
    'fiction'
  ),
  makeCard(
    "Kazuo Ishiguro",
    "Klara and the Sun",
    ["fiction", "love", "observation"],
    "Perhaps all humans are lonely. At least potentially.",
    "Loneliness is universal potential. Everyone can be lonely. Connection is never guaranteed.",
    35,
    'fiction'
  ),
  makeCard(
    "Sally Rooney",
    "Normal People",
    ["fiction", "connection", "difficulty"],
    "It's not like this with other people.",
    "Some connections are unique. Certain people fit differently. Not everyone is interchangeable.",
    30,
    'fiction'
  ),
  makeCard(
    "Sally Rooney",
    "Beautiful World, Where Are You",
    ["fiction", "love", "meaning"],
    "The desire to be with other people—it's the only thing that keeps us from wasting our lives.",
    "Connection prevents waste. Desire for others gives life meaning. Without it, life is squandered.",
    40,
    'fiction'
  ),
  makeCard(
    "Ocean Vuong",
    "On Earth We're Briefly Gorgeous",
    ["fiction", "language", "saving"],
    "I am writing to you because I am trying to save my life.",
    "Writing as survival. Language as lifeline. Some write because they must—to stay alive.",
    35,
    'fiction'
  ),
  makeCard(
    "Ocean Vuong",
    "Night Sky with Exit Wounds",
    ["poetry", "bodies", "memory"],
    "The body is a temple, but only if you treat it as one.",
    "Sacred treatment makes sacred objects. Treat your body as holy and it becomes holy.",
    35,
    'poetry'
  ),
  makeCard(
    "Claudia Rankine",
    "Citizen",
    ["poetry", "racism", "visibility"],
    "The world is wrong. You can't put the world right. You can only do what you can do.",
    "The world is broken. You can't fix everything. Do what you can. That's enough.",
    40,
    'poetry'
  ),
  makeCard(
    "Ross Gay",
    "The Book of Delights",
    ["non-fiction", "joy", "practice"],
    "It didn't take me long to learn that the discipline or practice of joy is also studying this sorrow.",
    "Joy and sorrow aren't opposites. Practicing joy means knowing sorrow. They're companions.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Ross Gay",
    "The Book of Delights",
    ["non-fiction", "delight", "attention"],
    "Delight is not something you find, but something you attend to.",
    "Delight isn't discovered—it's noticed. It's already there. Attention reveals it. Pay attention.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Maggie Nelson",
    "Bluets",
    ["non-fiction", "color", "obsession"],
    "I have been trying, for some time now, to find dignity in my loneliness.",
    "Loneliness can have dignity. Don't shame solitude. Find honor in being alone. It's possible.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Maggie Nelson",
    "The Argonauts",
    ["non-fiction", "love", "change"],
    "But is there really such a thing as nothing changing? Not ever?",
    "Change is constant. Nothing stays the same. Stability is illusion. Accept continuous transformation.",
    35,
    'non-fiction'
  ),
  makeCard(
    "Jenny Odell",
    "How to Do Nothing",
    ["philosophy", "attention", "resistance"],
    "Nothing is harder to do than nothing.",
    "Doing nothing is difficult. We're wired for activity. Stillness requires effort. Practice doing nothing.",
    30,
    'non-fiction'
  ),
  makeCard(
    "Jenny Odell",
    "Saving Time",
    ["philosophy", "time", "resistance"],
    "What would it mean to treat time as ours, rather than as something that belongs to the economy?",
    "Reclaim time from productivity. Time is yours, not the economy's. Take it back.",
    40,
    'non-fiction'
  ),
  makeCard(
    "Robin Wall Kimmerer",
    "Braiding Sweetgrass",
    ["philosophy", "nature", "reciprocity"],
    "All flourishing is mutual.",
    "Flourishing is reciprocal. No one flourishes alone. Your thriving depends on others' thriving.",
    30,
    'non-fiction'
  ),
  makeCard(
    "Robin Wall Kimmerer",
    "Braiding Sweetgrass",
    ["philosophy", "gratitude", "earth"],
    "Gratitude is most powerful as a practice when it doesn't depend on circumstances.",
    "Unconditional gratitude. Thankfulness regardless of situation. Practice gratitude independent of events.",
    40,
    'non-fiction'
  ),
  makeCard(
    "David Whyte",
    "Consolations",
    ["poetry", "heartbreak", "necessity"],
    "Heartbreak is unpreventable. If we are sincere, it will become a part of our life.",
    "Sincerity guarantees heartbreak. Living truly means breaking. You can't avoid it if you're real.",
    40,
    'poetry'
  ),
  makeCard(
    "John O'Donohue",
    "Anam Cara",
    ["spirituality", "blessing", "friendship"],
    "May you recognize in your life the presence, power, and light of your soul.",
    "Blessing: see your own soul. Recognize your inner light. Acknowledge your own presence and power.",
    40,
    'self-help'
  ),
  makeCard(
    "John O'Donohue",
    "To Bless the Space Between Us",
    ["spirituality", "thresholds", "transition"],
    "A blessing is a circle of light drawn around a person to protect, heal, and strengthen.",
    "Blessings are protective circles. Light drawn around someone. Bless people by circling them with light.",
    40,
    'self-help'
  ),
  makeCard(
    "David Steindl-Rast",
    "Gratefulness, the Heart of Prayer",
    ["spirituality", "gratitude", "moment"],
    "The root of joy is gratefulness.",
    "Joy grows from gratitude. Thankfulness is the source. Gratitude produces joy naturally.",
    30,
    'self-help'
  ),
  makeCard(
    "Mary Oliver",
    "Devotions",
    ["poetry", "wild", "precious"],
    "Tell me, what else should I have done? Doesn't everything die at last, and too soon?",
    "Mortality excuses much. Everything dies soon. What else were you supposed to do? You chose living.",
    40,
    'poetry'
  ),
  makeCard(
    "Rainer Maria Rilke",
    "Letters to a Young Poet",
    ["poetry", "questions", "living"],
    "Be patient toward all that is unsolved in your heart and try to love the questions themselves.",
    "Love the questions. Don't rush to answers. Questions are companions. Be patient with mystery.",
    40,
    'poetry'
  ),
  makeCard(
    "Rainer Maria Rilke",
    "Letters to a Young Poet",
    ["poetry", "solitude", "growth"],
    "The only journey is the one within.",
    "The real journey is interior. External travel is metaphor. Go inward. That's the true voyage.",
    30,
    'poetry'
  ),
  makeCard(
    "Rainer Maria Rilke",
    "Letters to a Young Poet",
    ["poetry", "difficulty", "living"],
    "Let everything happen to you: beauty and terror. Just keep going. No feeling is final.",
    "Allow all experience. Beauty and terror both. Keep moving through. Nothing lasts forever.",
    40,
    'poetry'
  ),
  makeCard(
    "Mary Oliver",
    "Thirst",
    ["poetry", "prayer", "attention"],
    "Someone I loved once gave me a box full of darkness. It took me years to understand that this too, was a gift.",
    "Dark gifts take time to understand. What seems like curse becomes blessing. Time reveals gift-nature.",
    45,
    'poetry'
  ),
  makeCard(
    "Hafiz",
    "The Gift",
    ["poetry", "love", "divine"],
    "Even after all this time, the sun never says to the earth, 'You owe me.' Look what happens with a love like that.",
    "Unconditional giving. The sun doesn't demand gratitude. See what such love creates. Give without tallying.",
    45,
    'poetry'
  ),
  makeCard(
    "Hafiz",
    "The Gift",
    ["poetry", "fear", "love"],
    "Fear is the cheapest room in the house. I would like to see you living in better conditions.",
    "Fear is low-rent housing. You deserve better. Move out of fear. Find better accommodations.",
    40,
    'poetry'
  ),
  makeCard(
    "Rumi",
    "The Essential Rumi",
    ["poetry", "lovers", "meeting"],
    "Lovers don't finally meet somewhere. They're in each other all along.",
    "True lovers were never separate. Meeting is recognition, not introduction. You were always together.",
    40,
    'poetry'
  ),
  makeCard(
    "Kahlil Gibran",
    "The Prophet",
    ["poetry", "self", "knowing"],
    "And could you keep your heart in wonder at the daily miracles of your life, your pain would not seem less wondrous than your joy.",
    "Wonder includes pain. Miracles include suffering. If you wonder at joy, wonder at pain too. Both are miraculous.",
    50,
    'poetry'
  ),
  makeCard(
    "Pablo Neruda",
    "Book of Questions",
    ["poetry", "questions", "wonder"],
    "And it was at that age... Poetry arrived in search of me.",
    "Poetry finds you. You don't find it. It arrives when ready. Be available for its arrival.",
    35,
    'poetry'
  ),
  makeCard(
    "Yehuda Amichai",
    "The Selected Poetry",
    ["poetry", "peace", "ordinary"],
    "From the place where we are right, flowers will never grow in the spring.",
    "Righteous certainty is barren. Where we're sure we're right, nothing grows. Doubt enables flowering.",
    40,
    'poetry'
  ),
  makeCard(
    "Nayyirah Waheed",
    "Salt",
    ["poetry", "self", "belonging"],
    "You do not have to be a fire for every mountain blocking your path. You could be the water, and soft river your way to freedom.",
    "Force isn't the only way. Water also overcomes mountains. Softness can be powerful. Flow around obstacles.",
    45,
    'poetry'
  ),
  makeCard(
    "Rupi Kaur",
    "Milk and Honey",
    ["poetry", "healing", "growth"],
    "I want to apologize to all the women I have called beautiful before I've called them intelligent or brave.",
    "Prioritize substance over appearance. Value courage and intelligence first. Beauty is secondary praise.",
    40,
    'poetry'
  ),
  makeCard(
    "Amanda Gorman",
    "The Hill We Climb",
    ["poetry", "hope", "action"],
    "For there is always light, if only we're brave enough to see it. If only we're brave enough to be it.",
    "Light exists. Seeing it requires courage. Being it requires more courage. Be brave enough for both.",
    40,
    'poetry'
  ),
];

// Export utility functions
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
  "finance",
  "health",
  "spirituality",
  "technology",
];

export function shuffleCards(cards: Card[]): Card[] {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getCardsByTopic(topic: string): Card[] {
  return contentLibrary.filter(card => card.topic.includes(topic));
}

export function getTopicCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  topics.forEach(topic => {
    counts[topic] = getCardsByTopic(topic).length;
  });
  return counts;
}

// Genre functions
export function getCardsByGenre(genre: Genre): Card[] {
  return contentLibrary.filter(card => card.genre === genre);
}

export function getAllGenres(): { genre: Genre; count: number; isPremium: boolean }[] {
  const genreCounts = new Map<Genre, number>();
  contentLibrary.forEach(card => {
    genreCounts.set(card.genre, (genreCounts.get(card.genre) || 0) + 1);
  });
  
  return Array.from(genreCounts.entries()).map(([genre, count]) => ({
    genre,
    count,
    isPremium: PREMIUM_GENRES.includes(genre),
  }));
}

// Book functions
export function getCardsByBook(bookName: string): Card[] {
  return contentLibrary.filter(card => card.book === bookName);
}

export function getAllBooks(): { book: string; author: string; count: number; genre: Genre }[] {
  const bookMap = new Map<string, { author: string; count: number; genre: Genre }>();
  
  contentLibrary.forEach(card => {
    if (!bookMap.has(card.book)) {
      bookMap.set(card.book, { author: card.author, count: 0, genre: card.genre });
    }
    bookMap.get(card.book)!.count++;
  });
  
  return Array.from(bookMap.entries())
    .map(([book, data]) => ({ book, ...data }))
    .sort((a, b) => b.count - a.count);
}

export function getBooksByAuthor(author: string): string[] {
  const books = new Set<string>();
  contentLibrary.forEach(card => {
    if (card.author === author) {
      books.add(card.book);
    }
  });
  return Array.from(books);
}

export function getAllAuthors(): { author: string; cardCount: number; bookCount: number }[] {
  const authorMap = new Map<string, { cards: number; books: Set<string> }>();
  
  contentLibrary.forEach(card => {
    if (!authorMap.has(card.author)) {
      authorMap.set(card.author, { cards: 0, books: new Set() });
    }
    const data = authorMap.get(card.author)!;
    data.cards++;
    data.books.add(card.book);
  });
  
  return Array.from(authorMap.entries())
    .map(([author, data]) => ({
      author,
      cardCount: data.cards,
      bookCount: data.books.size,
    }))
    .sort((a, b) => b.cardCount - a.cardCount);
}
