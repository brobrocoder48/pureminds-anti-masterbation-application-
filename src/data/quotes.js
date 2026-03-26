export const QUOTES = [
  "Every time you choose recovery, you are rewiring your brain for a better future.",
  "Your worst days in recovery are better than your best days in addiction.",
  "Progress isn't a straight line. Fall down seven times, stand up eight.",
  "The urge will pass whether you act on it or not. Choose to let it pass.",
  "You are not giving something up. You are taking your life back.",
  "Discipline heavily outweighs motivation when the going gets tough.",
  "What you do today is important because you are exchanging a day of your life for it.",
  "Don't trade what you want most for what you want at the moment.",
  "The pain of discipline is far less than the pain of regret.",
  "Your mind is a garden. Your thoughts are the seeds. You can grow flowers or you can grow weeds.",
  "Freedom is not the absence of urges, but the mastery over them.",
  "One day, or day one. You decide.",
  "You didn't come this far to only come this far.",
  "Small daily improvements over time lead to stunning results.",
  "The man who moves a mountain begins by carrying away small stones.",
  "A river cuts through rock, not because of its power, but because of its persistence.",
  "Tough times never last, but tough people do.",
  "Believe you can and you're halfway there.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "Be stronger than your strongest excuse."
];

export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[randomIndex];
};
