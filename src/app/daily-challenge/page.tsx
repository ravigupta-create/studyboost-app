'use client';

import { useState, useEffect, useMemo } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TRIVIA_BANK } from '../trivia-bank/page';

const LS_KEY = 'sb-daily-challenge';

interface DayResult {
  date: string;
  score: number;
  total: number;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function getDateSeed(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getDailyQuestions(dateStr: string) {
  const rand = seededRandom(getDateSeed(dateStr));
  const indices: number[] = [];
  while (indices.length < 5) {
    const idx = Math.floor(rand() * TRIVIA_BANK.length);
    if (!indices.includes(idx)) indices.push(idx);
  }
  return indices.map(i => TRIVIA_BANK[i]);
}

export default function DailyChallengePage() {
  const [results, setResults] = useState<DayResult[]>([]);
  const today = new Date().toISOString().split('T')[0];
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);

  const questions = useMemo(() => getDailyQuestions(today), [today]);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      const parsed: DayResult[] = JSON.parse(saved);
      setResults(parsed);
      const todayResult = parsed.find(r => r.date === today);
      if (todayResult) {
        setFinished(true);
        setScore(todayResult.score);
        setStarted(true);
      }
    }
  }, [today]);

  const alreadyDone = results.some(r => r.date === today);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === questions[current].correct) setScore(s => s + 1);
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      const finalScore = score + (selected === questions[current].correct ? 0 : 0);
      const result: DayResult = { date: today, score: finalScore, total: questions.length };
      const updated = [...results.filter(r => r.date !== today), result];
      setResults(updated);
      localStorage.setItem(LS_KEY, JSON.stringify(updated));
      setFinished(true);
      return;
    }
    setCurrent(c => c + 1);
    setSelected(null);
    setShowResult(false);
  };

  // Calendar - last 30 days
  const calendarDays = useMemo(() => {
    const days: { date: string; label: string; result: DayResult | null }[] = [];
    const d = new Date();
    for (let i = 29; i >= 0; i--) {
      const dt = new Date(d);
      dt.setDate(dt.getDate() - i);
      const ds = dt.toISOString().split('T')[0];
      days.push({
        date: ds,
        label: dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        result: results.find(r => r.date === ds) || null,
      });
    }
    return days;
  }, [results]);

  const catColors: Record<string, string> = {
    'Science': 'text-blue-600', 'History': 'text-orange-600', 'Math': 'text-green-600', 'English': 'text-purple-600', 'Geography': 'text-red-600',
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="\u{1F4C5}" title="Daily Challenge" description="5 date-seeded trivia questions. One attempt per day!" />

      {!started ? (
        <Card className="text-center py-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {new Date(today + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h2>
          <p className="text-gray-500 mb-6">5 questions across all categories. Ready?</p>
          <Button onClick={() => setStarted(true)} disabled={alreadyDone}>
            {alreadyDone ? 'Already Completed Today' : 'Start Challenge'}
          </Button>
        </Card>
      ) : finished ? (
        <Card className="text-center py-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{score} / {questions.length}</h2>
          <p className="text-gray-500 mb-6">{score === 5 ? 'Perfect!' : score >= 4 ? 'Almost perfect!' : score >= 3 ? 'Good job!' : 'Try again tomorrow!'}</p>
          <p className="text-sm text-gray-400">Come back tomorrow for a new challenge!</p>
        </Card>
      ) : (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Q{current + 1}/5</span>
              <span className={`text-xs font-medium ${catColors[questions[current].category]}`}>{questions[current].category}</span>
            </div>
            <span className="text-sm font-medium text-green-600">Score: {score}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-6">
            <div className="bg-purple-500 h-2 rounded-full transition-all" style={{ width: `${((current + 1) / 5) * 100}%` }} />
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
                  {opt}
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

      <Card className="mt-6">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Past 30 Days</h3>
        <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
          {calendarDays.map(d => (
            <div key={d.date} title={`${d.label}: ${d.result ? `${d.result.score}/5` : 'Not attempted'}`}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs ${
                d.result ? (d.result.score >= 4 ? 'bg-green-100 dark:bg-green-900/30 text-green-700' : d.result.score >= 2 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700' : 'bg-red-100 dark:bg-red-900/30 text-red-700') : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              }`}>
              <span className="font-medium">{new Date(d.date + 'T12:00:00').getDate()}</span>
              {d.result && <span className="text-[10px]">{d.result.score}/5</span>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
