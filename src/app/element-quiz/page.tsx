'use client';

import { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Element {
  number: number;
  symbol: string;
  name: string;
  category: string;
}

const ELEMENTS: Element[] = [
  { number: 1, symbol: 'H', name: 'Hydrogen', category: 'Nonmetal' },
  { number: 2, symbol: 'He', name: 'Helium', category: 'Noble Gas' },
  { number: 3, symbol: 'Li', name: 'Lithium', category: 'Alkali Metal' },
  { number: 4, symbol: 'Be', name: 'Beryllium', category: 'Alkaline Earth' },
  { number: 5, symbol: 'B', name: 'Boron', category: 'Metalloid' },
  { number: 6, symbol: 'C', name: 'Carbon', category: 'Nonmetal' },
  { number: 7, symbol: 'N', name: 'Nitrogen', category: 'Nonmetal' },
  { number: 8, symbol: 'O', name: 'Oxygen', category: 'Nonmetal' },
  { number: 9, symbol: 'F', name: 'Fluorine', category: 'Halogen' },
  { number: 10, symbol: 'Ne', name: 'Neon', category: 'Noble Gas' },
  { number: 11, symbol: 'Na', name: 'Sodium', category: 'Alkali Metal' },
  { number: 12, symbol: 'Mg', name: 'Magnesium', category: 'Alkaline Earth' },
  { number: 13, symbol: 'Al', name: 'Aluminum', category: 'Post-Transition' },
  { number: 14, symbol: 'Si', name: 'Silicon', category: 'Metalloid' },
  { number: 15, symbol: 'P', name: 'Phosphorus', category: 'Nonmetal' },
  { number: 16, symbol: 'S', name: 'Sulfur', category: 'Nonmetal' },
  { number: 17, symbol: 'Cl', name: 'Chlorine', category: 'Halogen' },
  { number: 18, symbol: 'Ar', name: 'Argon', category: 'Noble Gas' },
  { number: 19, symbol: 'K', name: 'Potassium', category: 'Alkali Metal' },
  { number: 20, symbol: 'Ca', name: 'Calcium', category: 'Alkaline Earth' },
  { number: 21, symbol: 'Sc', name: 'Scandium', category: 'Transition Metal' },
  { number: 22, symbol: 'Ti', name: 'Titanium', category: 'Transition Metal' },
  { number: 23, symbol: 'V', name: 'Vanadium', category: 'Transition Metal' },
  { number: 24, symbol: 'Cr', name: 'Chromium', category: 'Transition Metal' },
  { number: 25, symbol: 'Mn', name: 'Manganese', category: 'Transition Metal' },
  { number: 26, symbol: 'Fe', name: 'Iron', category: 'Transition Metal' },
  { number: 27, symbol: 'Co', name: 'Cobalt', category: 'Transition Metal' },
  { number: 28, symbol: 'Ni', name: 'Nickel', category: 'Transition Metal' },
  { number: 29, symbol: 'Cu', name: 'Copper', category: 'Transition Metal' },
  { number: 30, symbol: 'Zn', name: 'Zinc', category: 'Transition Metal' },
  { number: 31, symbol: 'Ga', name: 'Gallium', category: 'Post-Transition' },
  { number: 32, symbol: 'Ge', name: 'Germanium', category: 'Metalloid' },
  { number: 33, symbol: 'As', name: 'Arsenic', category: 'Metalloid' },
  { number: 34, symbol: 'Se', name: 'Selenium', category: 'Nonmetal' },
  { number: 35, symbol: 'Br', name: 'Bromine', category: 'Halogen' },
  { number: 36, symbol: 'Kr', name: 'Krypton', category: 'Noble Gas' },
];

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

interface Question {
  text: string;
  correct: string;
  options: string[];
}

function generateQuestions(): Question[] {
  const questions: Question[] = [];
  const shuffled = shuffle(ELEMENTS);
  for (let i = 0; i < 20; i++) {
    const el = shuffled[i % shuffled.length];
    const type = Math.floor(Math.random() * 3);
    let q: Question;
    if (type === 0) {
      const others = shuffle(ELEMENTS.filter(e => e.symbol !== el.symbol)).slice(0, 3).map(e => e.symbol);
      q = { text: `What is the symbol for ${el.name}?`, correct: el.symbol, options: shuffle([el.symbol, ...others]) };
    } else if (type === 1) {
      const others = shuffle(ELEMENTS.filter(e => e.name !== el.name)).slice(0, 3).map(e => e.name);
      q = { text: `What element has the symbol ${el.symbol}?`, correct: el.name, options: shuffle([el.name, ...others]) };
    } else {
      const others = shuffle(ELEMENTS.filter(e => e.number !== el.number)).slice(0, 3).map(e => e.number.toString());
      q = { text: `What is the atomic number of ${el.name}?`, correct: el.number.toString(), options: shuffle([el.number.toString(), ...others]) };
    }
    questions.push(q);
  }
  return questions;
}

const LS_KEY = 'sb-element-quiz-high';

export default function ElementQuizPage() {
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
      const finalScore = score + (selected === questions[current].correct ? 0 : 0);
      if (finalScore > highScore) { setHighScore(finalScore); localStorage.setItem(LS_KEY, finalScore.toString()); }
      return;
    }
    setCurrent(c => c + 1);
    setSelected(null);
    setShowResult(false);
  };

  const restart = () => {
    const finalScore = score;
    if (finalScore > highScore) { setHighScore(finalScore); localStorage.setItem(LS_KEY, finalScore.toString()); }
    setQuestions(generateQuestions());
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setGameOver(false);
  };

  if (questions.length === 0) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="\u269B\uFE0F" title="Element Quiz" description="Test your knowledge of the periodic table (H through Kr)." />

      {gameOver ? (
        <Card className="text-center py-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{score} / {questions.length}</h2>
          <p className="text-gray-500 mb-1">{score >= 18 ? 'Outstanding!' : score >= 14 ? 'Great job!' : score >= 10 ? 'Good effort!' : 'Keep practicing!'}</p>
          <p className="text-sm text-gray-400 mb-6">High Score: {Math.max(highScore, score)}</p>
          <Button onClick={restart}>Play Again</Button>
        </Card>
      ) : (
        <Card>
          <div className="flex justify-between items-center mb-6">
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
              } else if (opt === selected) cls = 'border-purple-500 bg-purple-50 dark:bg-purple-900/20';

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
