export const CATEGORIES = {
  PHYSICAL: 'Physical',
  CREATIVE: 'Creative',
  MINDFULNESS: 'Mindfulness',
  LEARNING: 'Learning',
  SOCIAL: 'Social'
};

export const DIFFICULTY = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard'
};

export const ACTIVITIES = [
  {
    id: 'p1',
    title: 'Do 20 Pushups',
    description: 'Drop down and do 20 pushups immediately. This redirects blood flow and energy.',
    duration: '2 mins',
    difficulty: DIFFICULTY.MEDIUM,
    category: CATEGORIES.PHYSICAL,
    emoji: '💪'
  },
  {
    id: 'p2',
    title: 'Take a Cold Shower',
    description: 'A 2-minute cold shower is one of the most effective ways to kill an urge instantly.',
    duration: '5 mins',
    difficulty: DIFFICULTY.HARD,
    category: CATEGORIES.PHYSICAL,
    emoji: '🚿'
  },
  {
    id: 'p3',
    title: 'Go for a Brisk Walk',
    description: 'Leave your current environment. Walking outside changes your scenery and mindset.',
    duration: '15 mins',
    difficulty: DIFFICULTY.EASY,
    category: CATEGORIES.PHYSICAL,
    emoji: '🚶‍♂️'
  },
  {
    id: 'c1',
    title: 'Sketch Your Surroundings',
    description: 'Grab a pen and paper. Spend 10 minutes drawing an object near you in detail.',
    duration: '10 mins',
    difficulty: DIFFICULTY.EASY,
    category: CATEGORIES.CREATIVE,
    emoji: '✏️'
  },
  {
    id: 'c2',
    title: 'Write a Journal Entry',
    description: 'Use the journal in this app to write down exactly what you are feeling right now.',
    duration: '5 mins',
    difficulty: DIFFICULTY.MEDIUM,
    category: CATEGORIES.CREATIVE,
    emoji: '📓'
  },
  {
    id: 'm1',
    title: '4-7-8 Breathing',
    description: 'Use the Breathe tab to do 3 rounds of the 4-7-8 relaxing breath technique.',
    duration: '3 mins',
    difficulty: DIFFICULTY.EASY,
    category: CATEGORIES.MINDFULNESS,
    emoji: '🧘'
  },
  {
    id: 'm2',
    title: 'Meditate',
    description: 'Sit quietly, close your eyes, and focus solely on the sensation of your breath.',
    duration: '10 mins',
    difficulty: DIFFICULTY.EASY,
    category: CATEGORIES.MINDFULNESS,
    emoji: '🎧'
  },
  {
    id: 'l1',
    title: 'Read a Book Chapter',
    description: 'Pick up a physical book (not your phone) and read one full chapter.',
    duration: '20 mins',
    difficulty: DIFFICULTY.MEDIUM,
    category: CATEGORIES.LEARNING,
    emoji: '📚'
  },
  {
    id: 'l2',
    title: 'Learn 5 New Words',
    description: 'Look up 5 words in a language you want to learn and write them down.',
    duration: '10 mins',
    difficulty: DIFFICULTY.EASY,
    category: CATEGORIES.LEARNING,
    emoji: '🌐'
  },
  {
    id: 's1',
    title: 'Call a Friend or Family',
    description: 'Call someone just to catch up. Social connection stops isolation.',
    duration: '15 mins',
    difficulty: DIFFICULTY.MEDIUM,
    category: CATEGORIES.SOCIAL,
    emoji: '☎️'
  },
  {
    id: 's2',
    title: 'Pet an Animal',
    description: 'Spend 5 minutes giving full attention to your pet if you have one.',
    duration: '5 mins',
    difficulty: DIFFICULTY.EASY,
    category: CATEGORIES.SOCIAL,
    emoji: '🐕'
  }
];

export const getRandomActivity = () => {
  const randomIndex = Math.floor(Math.random() * ACTIVITIES.length);
  return ACTIVITIES[randomIndex];
};
