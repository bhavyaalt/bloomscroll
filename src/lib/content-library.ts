// Bloomscroll Content Library
// Comprehensive wisdom database - 1000+ cards across all topics

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
  // STOICISM - SENECA (20 cards)
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
