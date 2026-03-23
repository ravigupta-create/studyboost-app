'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

export interface TriviaQuestion {
  question: string;
  options: string[];
  correct: number;
  category: string;
}

export const TRIVIA_BANK: TriviaQuestion[] = [
  // Science (20)
  { question: 'What is the chemical symbol for gold?', options: ['Au', 'Ag', 'Fe', 'Cu'], correct: 0, category: 'Science' },
  { question: 'What planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correct: 1, category: 'Science' },
  { question: 'What is the speed of light in km/s (approximately)?', options: ['150,000', '300,000', '450,000', '600,000'], correct: 1, category: 'Science' },
  { question: 'What gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correct: 2, category: 'Science' },
  { question: 'What is the hardest natural substance?', options: ['Gold', 'Iron', 'Diamond', 'Platinum'], correct: 2, category: 'Science' },
  { question: 'How many bones are in the adult human body?', options: ['186', '206', '226', '246'], correct: 1, category: 'Science' },
  { question: 'What is the largest organ in the human body?', options: ['Heart', 'Liver', 'Skin', 'Brain'], correct: 2, category: 'Science' },
  { question: 'What force keeps planets in orbit around the Sun?', options: ['Magnetism', 'Friction', 'Gravity', 'Inertia'], correct: 2, category: 'Science' },
  { question: 'What is the chemical formula for water?', options: ['CO2', 'H2O', 'NaCl', 'O2'], correct: 1, category: 'Science' },
  { question: 'What type of energy does the Sun primarily emit?', options: ['Chemical', 'Nuclear', 'Electromagnetic', 'Kinetic'], correct: 2, category: 'Science' },
  { question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi Body'], correct: 2, category: 'Science' },
  { question: 'What element has atomic number 1?', options: ['Helium', 'Hydrogen', 'Carbon', 'Oxygen'], correct: 1, category: 'Science' },
  { question: 'What is absolute zero in Celsius?', options: ['-100', '-200', '-273.15', '-373.15'], correct: 2, category: 'Science' },
  { question: 'Sound travels fastest through which medium?', options: ['Air', 'Water', 'Steel', 'Vacuum'], correct: 2, category: 'Science' },
  { question: 'What vitamin does the Sun help produce in our skin?', options: ['A', 'B12', 'C', 'D'], correct: 3, category: 'Science' },
  { question: 'How many chromosomes do humans have?', options: ['23', '44', '46', '48'], correct: 2, category: 'Science' },
  { question: 'What is the most abundant gas in Earth\'s atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Argon'], correct: 1, category: 'Science' },
  { question: 'What scientist developed the theory of relativity?', options: ['Newton', 'Einstein', 'Hawking', 'Bohr'], correct: 1, category: 'Science' },
  { question: 'What is the pH of pure water?', options: ['0', '5', '7', '14'], correct: 2, category: 'Science' },
  { question: 'Which planet has the most moons?', options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'], correct: 1, category: 'Science' },
  // History (20)
  { question: 'In what year did World War II end?', options: ['1943', '1944', '1945', '1946'], correct: 2, category: 'History' },
  { question: 'Who was the first President of the United States?', options: ['Jefferson', 'Adams', 'Washington', 'Madison'], correct: 2, category: 'History' },
  { question: 'The Renaissance began in which country?', options: ['France', 'Italy', 'England', 'Spain'], correct: 1, category: 'History' },
  { question: 'Who wrote the Declaration of Independence?', options: ['Franklin', 'Adams', 'Jefferson', 'Hamilton'], correct: 2, category: 'History' },
  { question: 'What ancient wonder was in Alexandria, Egypt?', options: ['Colossus', 'Lighthouse', 'Hanging Gardens', 'Temple of Artemis'], correct: 1, category: 'History' },
  { question: 'The Berlin Wall fell in what year?', options: ['1987', '1988', '1989', '1990'], correct: 2, category: 'History' },
  { question: 'Who was the first person to walk on the Moon?', options: ['Buzz Aldrin', 'Neil Armstrong', 'John Glenn', 'Yuri Gagarin'], correct: 1, category: 'History' },
  { question: 'The French Revolution began in what year?', options: ['1776', '1789', '1799', '1804'], correct: 1, category: 'History' },
  { question: 'Who discovered penicillin?', options: ['Pasteur', 'Fleming', 'Koch', 'Lister'], correct: 1, category: 'History' },
  { question: 'What empire built Machu Picchu?', options: ['Maya', 'Aztec', 'Inca', 'Olmec'], correct: 2, category: 'History' },
  { question: 'The Magna Carta was signed in what year?', options: ['1066', '1215', '1415', '1492'], correct: 1, category: 'History' },
  { question: 'Who was the leader of the Soviet Union during WWII?', options: ['Lenin', 'Stalin', 'Khrushchev', 'Brezhnev'], correct: 1, category: 'History' },
  { question: 'What was the first civilization in Mesopotamia?', options: ['Babylonian', 'Sumerian', 'Assyrian', 'Persian'], correct: 1, category: 'History' },
  { question: 'The Civil Rights Act was signed in what year?', options: ['1954', '1960', '1964', '1968'], correct: 2, category: 'History' },
  { question: 'Who painted the ceiling of the Sistine Chapel?', options: ['Da Vinci', 'Raphael', 'Michelangelo', 'Botticelli'], correct: 2, category: 'History' },
  { question: 'What ship sank in 1912 after hitting an iceberg?', options: ['Lusitania', 'Titanic', 'Britannic', 'Olympic'], correct: 1, category: 'History' },
  { question: 'The Industrial Revolution began in which country?', options: ['France', 'Germany', 'Britain', 'USA'], correct: 2, category: 'History' },
  { question: 'Who led India to independence through nonviolence?', options: ['Nehru', 'Gandhi', 'Patel', 'Bose'], correct: 1, category: 'History' },
  { question: 'What year did Columbus reach the Americas?', options: ['1482', '1488', '1492', '1498'], correct: 2, category: 'History' },
  { question: 'The Cold War was primarily between which two nations?', options: ['USA & China', 'USA & USSR', 'UK & Germany', 'France & Russia'], correct: 1, category: 'History' },
  // Math (20)
  { question: 'What is the value of pi to two decimal places?', options: ['3.12', '3.14', '3.16', '3.18'], correct: 1, category: 'Math' },
  { question: 'What is the square root of 144?', options: ['10', '11', '12', '13'], correct: 2, category: 'Math' },
  { question: 'What is 15% of 200?', options: ['25', '30', '35', '40'], correct: 1, category: 'Math' },
  { question: 'How many sides does a hexagon have?', options: ['5', '6', '7', '8'], correct: 1, category: 'Math' },
  { question: 'What is the next prime number after 7?', options: ['8', '9', '10', '11'], correct: 3, category: 'Math' },
  { question: 'What is 2 to the power of 10?', options: ['512', '1024', '2048', '4096'], correct: 1, category: 'Math' },
  { question: 'What type of angle is exactly 90 degrees?', options: ['Acute', 'Right', 'Obtuse', 'Straight'], correct: 1, category: 'Math' },
  { question: 'What is the sum of angles in a triangle?', options: ['90', '180', '270', '360'], correct: 1, category: 'Math' },
  { question: 'What is the factorial of 5 (5!)?', options: ['60', '100', '120', '150'], correct: 2, category: 'Math' },
  { question: 'In a right triangle, what is the longest side called?', options: ['Adjacent', 'Opposite', 'Hypotenuse', 'Base'], correct: 2, category: 'Math' },
  { question: 'What is the formula for the area of a circle?', options: ['2\u03C0r', '\u03C0r\u00B2', '\u03C0d', '2\u03C0r\u00B2'], correct: 1, category: 'Math' },
  { question: 'What is the slope of a horizontal line?', options: ['-1', '0', '1', 'Undefined'], correct: 1, category: 'Math' },
  { question: 'How many degrees are in a full circle?', options: ['90', '180', '270', '360'], correct: 3, category: 'Math' },
  { question: 'What is the GCD of 12 and 18?', options: ['2', '3', '6', '9'], correct: 2, category: 'Math' },
  { question: 'What is log base 10 of 1000?', options: ['1', '2', '3', '4'], correct: 2, category: 'Math' },
  { question: 'What shape has 4 equal sides and 4 right angles?', options: ['Rectangle', 'Rhombus', 'Square', 'Trapezoid'], correct: 2, category: 'Math' },
  { question: 'What is the mean of 2, 4, 6, 8, 10?', options: ['4', '5', '6', '7'], correct: 2, category: 'Math' },
  { question: 'A quadratic equation has at most how many real roots?', options: ['1', '2', '3', '4'], correct: 1, category: 'Math' },
  { question: 'What is the value of sin(90\u00B0)?', options: ['0', '0.5', '1', '-1'], correct: 2, category: 'Math' },
  { question: 'What is the Fibonacci sequence: 1, 1, 2, 3, 5, ...?', options: ['6', '7', '8', '9'], correct: 2, category: 'Math' },
  // English (20)
  { question: 'What is a noun?', options: ['Action word', 'Describing word', 'Person/place/thing', 'Connecting word'], correct: 2, category: 'English' },
  { question: 'Who wrote "Romeo and Juliet"?', options: ['Dickens', 'Shakespeare', 'Chaucer', 'Milton'], correct: 1, category: 'English' },
  { question: 'What is the past tense of "run"?', options: ['Runned', 'Ran', 'Runed', 'Running'], correct: 1, category: 'English' },
  { question: '"She sells seashells" is an example of?', options: ['Metaphor', 'Simile', 'Alliteration', 'Onomatopoeia'], correct: 2, category: 'English' },
  { question: 'What part of speech modifies a verb?', options: ['Adjective', 'Adverb', 'Pronoun', 'Preposition'], correct: 1, category: 'English' },
  { question: 'What is the plural of "goose"?', options: ['Gooses', 'Geese', 'Goosies', 'Geeses'], correct: 1, category: 'English' },
  { question: '"To be or not to be" is from which play?', options: ['Macbeth', 'Othello', 'Hamlet', 'King Lear'], correct: 2, category: 'English' },
  { question: 'What punctuation ends a question?', options: ['Period', 'Exclamation mark', 'Question mark', 'Semicolon'], correct: 2, category: 'English' },
  { question: '"Time is money" is an example of?', options: ['Simile', 'Metaphor', 'Hyperbole', 'Personification'], correct: 1, category: 'English' },
  { question: 'What is a synonym for "happy"?', options: ['Sad', 'Joyful', 'Angry', 'Tired'], correct: 1, category: 'English' },
  { question: 'What is an antonym?', options: ['Same meaning', 'Opposite meaning', 'Similar sound', 'Root word'], correct: 1, category: 'English' },
  { question: 'Who wrote "1984"?', options: ['Huxley', 'Orwell', 'Bradbury', 'Hemingway'], correct: 1, category: 'English' },
  { question: 'What is the main idea of a paragraph called?', options: ['Topic sentence', 'Conclusion', 'Supporting detail', 'Transition'], correct: 0, category: 'English' },
  { question: 'Which is a compound sentence?', options: ['I ran.', 'I ran and she walked.', 'Running fast.', 'The big dog.'], correct: 1, category: 'English' },
  { question: '"Buzz" and "hiss" are examples of?', options: ['Alliteration', 'Onomatopoeia', 'Metaphor', 'Irony'], correct: 1, category: 'English' },
  { question: 'What does "i.e." stand for?', options: ['For example', 'That is', 'In effect', 'In other words'], correct: 1, category: 'English' },
  { question: 'A haiku has how many syllables in total?', options: ['14', '15', '17', '19'], correct: 2, category: 'English' },
  { question: 'What is the protagonist of a story?', options: ['Villain', 'Main character', 'Narrator', 'Setting'], correct: 1, category: 'English' },
  { question: '"The wind whispered" is an example of?', options: ['Simile', 'Metaphor', 'Personification', 'Hyperbole'], correct: 2, category: 'English' },
  { question: 'What tense is "I will go"?', options: ['Past', 'Present', 'Future', 'Conditional'], correct: 2, category: 'English' },
  // Geography (20)
  { question: 'What is the largest continent by area?', options: ['Africa', 'North America', 'Asia', 'Europe'], correct: 2, category: 'Geography' },
  { question: 'What is the longest river in the world?', options: ['Amazon', 'Nile', 'Mississippi', 'Yangtze'], correct: 1, category: 'Geography' },
  { question: 'What is the smallest country in the world?', options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'], correct: 1, category: 'Geography' },
  { question: 'Mount Everest is located in which mountain range?', options: ['Alps', 'Andes', 'Himalayas', 'Rockies'], correct: 2, category: 'Geography' },
  { question: 'What ocean is the largest?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correct: 3, category: 'Geography' },
  { question: 'What desert is the largest in the world?', options: ['Sahara', 'Arabian', 'Gobi', 'Antarctic'], correct: 3, category: 'Geography' },
  { question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'], correct: 2, category: 'Geography' },
  { question: 'Which country has the most people?', options: ['USA', 'India', 'China', 'Indonesia'], correct: 1, category: 'Geography' },
  { question: 'The Amazon Rainforest is mostly in which country?', options: ['Colombia', 'Peru', 'Brazil', 'Venezuela'], correct: 2, category: 'Geography' },
  { question: 'What strait separates Europe from Africa?', options: ['Bosporus', 'Gibraltar', 'Hormuz', 'Malacca'], correct: 1, category: 'Geography' },
  { question: 'What is the largest island in the world?', options: ['Madagascar', 'Borneo', 'Greenland', 'New Guinea'], correct: 2, category: 'Geography' },
  { question: 'Which continent has the most countries?', options: ['Asia', 'Europe', 'Africa', 'South America'], correct: 2, category: 'Geography' },
  { question: 'What is the deepest point in the ocean?', options: ['Puerto Rico Trench', 'Mariana Trench', 'Java Trench', 'Tonga Trench'], correct: 1, category: 'Geography' },
  { question: 'The Great Barrier Reef is off the coast of?', options: ['Brazil', 'India', 'Australia', 'Mexico'], correct: 2, category: 'Geography' },
  { question: 'What country has the most time zones?', options: ['Russia', 'USA', 'China', 'France'], correct: 3, category: 'Geography' },
  { question: 'What is the driest continent?', options: ['Africa', 'Australia', 'Antarctica', 'Asia'], correct: 2, category: 'Geography' },
  { question: 'What river runs through London?', options: ['Seine', 'Rhine', 'Thames', 'Danube'], correct: 2, category: 'Geography' },
  { question: 'Which lake is the deepest in the world?', options: ['Lake Superior', 'Lake Baikal', 'Lake Tanganyika', 'Caspian Sea'], correct: 1, category: 'Geography' },
  { question: 'What is the capital of Canada?', options: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'], correct: 3, category: 'Geography' },
  { question: 'The Sahara Desert is located on which continent?', options: ['Asia', 'South America', 'Africa', 'Australia'], correct: 2, category: 'Geography' },
];

const CATEGORIES = ['Science', 'History', 'Math', 'English', 'Geography'];
const LS_KEY = 'sb-trivia-scores';

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a;
};

export default function TriviaBankPage() {
  const [category, setCategory] = useState<string>('mixed');
  const [playing, setPlaying] = useState(false);
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>({});

  useEffect(() => { const s = localStorage.getItem(LS_KEY); if (s) setScores(JSON.parse(s)); }, []);

  const start = () => {
    const pool = category === 'mixed' ? TRIVIA_BANK : TRIVIA_BANK.filter(q => q.category === category);
    setQuestions(shuffle(pool).slice(0, 20));
    setCurrent(0); setScore(0); setSelected(null); setShowResult(false); setGameOver(false); setPlaying(true);
  };

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === questions[current].correct) setScore(s => s + 1);
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      setGameOver(true);
      const key = category;
      if (score > (scores[key] || 0)) {
        const updated = { ...scores, [key]: score };
        setScores(updated);
        localStorage.setItem(LS_KEY, JSON.stringify(updated));
      }
      return;
    }
    setCurrent(c => c + 1); setSelected(null); setShowResult(false);
  };

  const catColors: Record<string, string> = {
    'Science': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    'History': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
    'Math': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    'English': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    'Geography': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="\u{1F4A1}" title="Trivia Bank" description="100 trivia questions across 5 categories." />

      {!playing ? (
        <Card>
          <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">Choose Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            <button onClick={() => setCategory('mixed')}
              className={`p-3 rounded-lg text-sm font-medium border-2 transition-all ${category === 'mixed' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'} text-gray-900 dark:text-gray-100`}>
              Mixed (All)
            </button>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`p-3 rounded-lg text-sm font-medium border-2 transition-all ${category === c ? 'border-purple-500 ' + catColors[c] : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'} text-gray-900 dark:text-gray-100`}>
                {c}
              </button>
            ))}
          </div>
          {scores[category] !== undefined && <p className="text-sm text-gray-500 mb-4">Best: {scores[category]}/20</p>}
          <Button onClick={start}>Start Quiz</Button>
        </Card>
      ) : gameOver ? (
        <Card className="text-center py-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{score} / {questions.length}</h2>
          <p className="text-gray-500 mb-1">{score >= 18 ? 'Trivia master!' : score >= 14 ? 'Great job!' : score >= 10 ? 'Good effort!' : 'Keep learning!'}</p>
          <p className="text-sm text-gray-400 mb-6">Best ({category}): {Math.max(scores[category] || 0, score)}</p>
          <div className="flex gap-2 justify-center">
            <Button onClick={start}>Play Again</Button>
            <Button variant="secondary" onClick={() => setPlaying(false)}>Change Category</Button>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Q{current + 1}/{questions.length}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${catColors[questions[current].category]}`}>{questions[current].category}</span>
            </div>
            <span className="text-sm font-medium text-green-600">Score: {score}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-6">
            <div className="bg-purple-500 h-2 rounded-full transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">{questions[current].question}</h3>
          <div className="grid grid-cols-1 gap-3 mb-6">
            {questions[current].options.map((opt, i) => {
              let cls = 'border-gray-200 dark:border-gray-700 hover:border-purple-300';
              if (showResult) {
                if (i === questions[current].correct) cls = 'border-green-500 bg-green-50 dark:bg-green-900/20';
                else if (i === selected) cls = 'border-red-500 bg-red-50 dark:bg-red-900/20';
              }
              return (
                <button key={i} onClick={() => handleSelect(i)}
                  className={`p-3 rounded-xl border-2 text-left font-medium transition-all ${cls} text-gray-900 dark:text-gray-100`}>
                  <span className="text-gray-400 mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
                </button>
              );
            })}
          </div>
          {showResult && (
            <div className="text-center">
              <p className={`mb-3 font-medium ${selected === questions[current].correct ? 'text-green-600' : 'text-red-600'}`}>
                {selected === questions[current].correct ? 'Correct!' : `Wrong! Answer: ${questions[current].options[questions[current].correct]}`}
              </p>
              <Button onClick={next}>{current + 1 >= questions.length ? 'See Results' : 'Next'}</Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
