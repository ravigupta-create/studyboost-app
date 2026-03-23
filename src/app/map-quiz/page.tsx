'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const COUNTRIES = [
  { country: 'France', capital: 'Paris' }, { country: 'Germany', capital: 'Berlin' },
  { country: 'Japan', capital: 'Tokyo' }, { country: 'Australia', capital: 'Canberra' },
  { country: 'Brazil', capital: 'Brasilia' }, { country: 'Canada', capital: 'Ottawa' },
  { country: 'China', capital: 'Beijing' }, { country: 'India', capital: 'New Delhi' },
  { country: 'Italy', capital: 'Rome' }, { country: 'Mexico', capital: 'Mexico City' },
  { country: 'Russia', capital: 'Moscow' }, { country: 'South Korea', capital: 'Seoul' },
  { country: 'Spain', capital: 'Madrid' }, { country: 'United Kingdom', capital: 'London' },
  { country: 'Argentina', capital: 'Buenos Aires' }, { country: 'Egypt', capital: 'Cairo' },
  { country: 'Turkey', capital: 'Ankara' }, { country: 'Thailand', capital: 'Bangkok' },
  { country: 'South Africa', capital: 'Pretoria' }, { country: 'Nigeria', capital: 'Abuja' },
  { country: 'Kenya', capital: 'Nairobi' }, { country: 'Sweden', capital: 'Stockholm' },
  { country: 'Norway', capital: 'Oslo' }, { country: 'Poland', capital: 'Warsaw' },
  { country: 'Greece', capital: 'Athens' }, { country: 'Portugal', capital: 'Lisbon' },
  { country: 'Netherlands', capital: 'Amsterdam' }, { country: 'Belgium', capital: 'Brussels' },
  { country: 'Switzerland', capital: 'Bern' }, { country: 'Austria', capital: 'Vienna' },
  { country: 'Ireland', capital: 'Dublin' }, { country: 'Denmark', capital: 'Copenhagen' },
  { country: 'Finland', capital: 'Helsinki' }, { country: 'Czech Republic', capital: 'Prague' },
  { country: 'Hungary', capital: 'Budapest' }, { country: 'Colombia', capital: 'Bogota' },
  { country: 'Peru', capital: 'Lima' }, { country: 'Chile', capital: 'Santiago' },
  { country: 'Venezuela', capital: 'Caracas' }, { country: 'Cuba', capital: 'Havana' },
  { country: 'Morocco', capital: 'Rabat' }, { country: 'Ethiopia', capital: 'Addis Ababa' },
  { country: 'Indonesia', capital: 'Jakarta' }, { country: 'Vietnam', capital: 'Hanoi' },
  { country: 'Philippines', capital: 'Manila' }, { country: 'Malaysia', capital: 'Kuala Lumpur' },
  { country: 'Pakistan', capital: 'Islamabad' }, { country: 'Iran', capital: 'Tehran' },
  { country: 'Iraq', capital: 'Baghdad' }, { country: 'New Zealand', capital: 'Wellington' },
];

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a;
};

interface Question { text: string; correct: string; options: string[]; }

function generateQuestions(): Question[] {
  const shuffled = shuffle(COUNTRIES);
  return shuffled.slice(0, 15).map(c => {
    const type = Math.random() > 0.5;
    if (type) {
      const others = shuffle(COUNTRIES.filter(x => x.capital !== c.capital)).slice(0, 3).map(x => x.capital);
      return { text: `What is the capital of ${c.country}?`, correct: c.capital, options: shuffle([c.capital, ...others]) };
    } else {
      const others = shuffle(COUNTRIES.filter(x => x.country !== c.country)).slice(0, 3).map(x => x.country);
      return { text: `${c.capital} is the capital of which country?`, correct: c.country, options: shuffle([c.country, ...others]) };
    }
  });
}

const LS_KEY = 'sb-map-quiz-high';

export default function MapQuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setHighScore(parseInt(saved));
    setQuestions(generateQuestions());
  }, []);

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    setShowResult(true);
    if (opt === questions[current].correct) setScore(s => s + 1);
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      setGameOver(true);
      if (score > highScore) { setHighScore(score); localStorage.setItem(LS_KEY, score.toString()); }
      return;
    }
    setCurrent(c => c + 1);
    setSelected(null);
    setShowResult(false);
  };

  const restart = () => {
    if (score > highScore) { setHighScore(score); localStorage.setItem(LS_KEY, score.toString()); }
    setQuestions(generateQuestions());
    setCurrent(0); setScore(0); setSelected(null); setShowResult(false); setGameOver(false);
  };

  if (questions.length === 0) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="\u{1F30D}" title="Map Quiz" description="Test your knowledge of world capitals across 50 countries." />

      {gameOver ? (
        <Card className="text-center py-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{score} / {questions.length}</h2>
          <p className="text-gray-500 mb-1">{score >= 13 ? 'Geography master!' : score >= 10 ? 'Great job!' : score >= 7 ? 'Good effort!' : 'Keep exploring!'}</p>
          <p className="text-sm text-gray-400 mb-6">High Score: {Math.max(highScore, score)}</p>
          <Button onClick={restart}>Play Again</Button>
        </Card>
      ) : (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Question {current + 1} / {questions.length}</span>
            <div className="flex gap-4">
              <span className="text-sm font-medium text-green-600">Score: {score}</span>
              <span className="text-sm text-gray-400">Best: {highScore}</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-6">
            <div className="bg-purple-500 h-2 rounded-full transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">{questions[current].text}</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {questions[current].options.map(opt => {
              let cls = 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600';
              if (showResult) {
                if (opt === questions[current].correct) cls = 'border-green-500 bg-green-50 dark:bg-green-900/20';
                else if (opt === selected) cls = 'border-red-500 bg-red-50 dark:bg-red-900/20';
              }
              return (
                <button key={opt} onClick={() => handleSelect(opt)}
                  className={`p-4 rounded-xl border-2 text-center font-medium transition-all ${cls} text-gray-900 dark:text-gray-100`}>
                  {opt}
                </button>
              );
            })}
          </div>
          {showResult && (
            <div className="text-center">
              <p className={`mb-3 font-medium ${selected === questions[current].correct ? 'text-green-600' : 'text-red-600'}`}>
                {selected === questions[current].correct ? 'Correct!' : `Wrong! The answer is ${questions[current].correct}`}
              </p>
              <Button onClick={next}>{current + 1 >= questions.length ? 'See Results' : 'Next Question'}</Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
