'use client';
import { useState, useEffect } from 'react';
import { useGeminiJSON } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

interface DailyQ {
  question: string;
  subject: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface DailyScore {
  date: string;
  score: number;
  total: number;
}

export default function DailyChallengePage() {
  const { hasKey } = useApiKey();
  const { data, loading, generate } = useGeminiJSON<{ questions: DailyQ[] }>();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [todayCompleted, setTodayCompleted] = useState(false);
  const [todayScore, setTodayScore] = useState(0);
  const [pastScores, setPastScores] = useState<DailyScore[]>([]);
  const [started, setStarted] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const questions = data?.questions ?? [];

  useEffect(() => {
    const stored = localStorage.getItem('daily-challenge-scores');
    const scores: DailyScore[] = stored ? JSON.parse(stored) : [];
    setPastScores(scores);
    const todayEntry = scores.find(s => s.date === today);
    if (todayEntry) {
      setTodayCompleted(true);
      setTodayScore(todayEntry.score);
    }
  }, [today]);

  useEffect(() => {
    if (questions.length > 0 && !started) {
      setStarted(true);
      setCurrentQ(0);
      setAnswers([]);
      setSelected(null);
      setDone(false);
    }
  }, [questions, started]);

  const handleStart = () => {
    setStarted(false);
    generate(`Today's date is ${today}. Using this date as a seed for consistency, generate exactly 5 quiz questions across different subjects. Return valid JSON only: {"questions":[{"question":"...","subject":"Math|Science|History|English|Geography","options":["A) ...","B) ...","C) ...","D) ..."],"correct":0,"explanation":"..."}]}. "correct" is 0-based index. One question per subject: Math, Science, History, English, Geography. Make them challenging but fair for a high school student. Do NOT include text outside JSON.`);
  };

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
    } else {
      const score = answers.filter((a, i) => a === questions[i]?.correct).length;
      setDone(true);
      setTodayCompleted(true);
      setTodayScore(score);
      const stored = localStorage.getItem('daily-challenge-scores');
      const scores: DailyScore[] = stored ? JSON.parse(stored) : [];
      scores.unshift({ date: today, score, total: questions.length });
      localStorage.setItem('daily-challenge-scores', JSON.stringify(scores.slice(0, 30)));
      setPastScores(scores.slice(0, 30));
    }
  };

  const score = answers.filter((a, i) => a === questions[i]?.correct).length;

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="📅" title="Daily AI Challenge" description="5 questions across different subjects. One attempt per day!" aiPowered />
      <ApiKeySetup />
    </div>
  );

  if (todayCompleted && !started) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <PageHeader icon="📅" title="Daily AI Challenge" description="5 questions across different subjects. One attempt per day!" aiPowered />
        <Card className="text-center mb-6">
          <h2 className="text-xl font-bold mb-2">Today&apos;s Challenge Complete!</h2>
          <p className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">{todayScore}/5</p>
          <p className="text-gray-500">Come back tomorrow for a new challenge!</p>
        </Card>
        {pastScores.length > 0 && (
          <Card>
            <h3 className="font-bold mb-3">Past Scores</h3>
            <div className="space-y-2">
              {pastScores.slice(0, 10).map((s, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{s.date}</span>
                  <span className={`font-bold ${s.score >= 4 ? 'text-green-600' : s.score >= 2 ? 'text-yellow-600' : 'text-red-600'}`}>{s.score}/{s.total}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    );
  }

  if (done) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <PageHeader icon="📅" title="Daily AI Challenge" description="5 questions across different subjects. One attempt per day!" aiPowered />
        <Card className="text-center mb-6">
          <h2 className="text-xl font-bold mb-2">Challenge Complete!</h2>
          <p className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">{score}/5</p>
        </Card>
        {questions.map((q, i) => (
          <Card key={i} className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">{q.subject}</span>
            </div>
            <p className="font-medium mb-2">{q.question}</p>
            <div className="space-y-1 mb-2">
              {q.options.map((opt, j) => (
                <div key={j} className={`p-2 rounded text-sm ${j === q.correct ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-medium' : answers[i] === j ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' : 'text-gray-500'}`}>
                  {opt} {j === q.correct ? ' ✓' : answers[i] === j ? ' ✗' : ''}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 italic">{q.explanation}</p>
          </Card>
        ))}
      </div>
    );
  }

  if (started && questions.length > 0) {
    const q = questions[currentQ];
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <PageHeader icon="📅" title="Daily AI Challenge" description={today} aiPowered />
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">Question {currentQ + 1}/5</span>
          <span className="text-xs px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">{q.subject}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
          <div className="bg-purple-600 h-2 rounded-full transition-all" style={{ width: `${((currentQ + 1) / 5) * 100}%` }} />
        </div>
        <Card>
          <p className="text-lg font-medium mb-4">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, j) => (
              <button key={j} onClick={() => handleAnswer(j)} className={`w-full text-left p-3 rounded-lg border transition-colors ${selected === null ? 'border-gray-200 dark:border-gray-600 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20' : j === q.correct ? 'border-green-500 bg-green-50 dark:bg-green-900/20 font-medium' : selected === j ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-600 opacity-50'}`}>
                {opt}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-3">{q.explanation}</p>
              <Button onClick={handleNext}>{currentQ < 4 ? 'Next Question' : 'See Results'}</Button>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="📅" title="Daily AI Challenge" description="5 questions across different subjects. One attempt per day!" aiPowered />
      <Card className="text-center">
        <h2 className="text-xl font-bold mb-3">Today&apos;s Challenge</h2>
        <p className="text-gray-500 mb-6">5 questions across Math, Science, History, English, and Geography. You get one attempt per day!</p>
        <Button onClick={handleStart} disabled={loading}>
          {loading ? <><Spinner /> Loading Challenge...</> : 'Start Today\'s Challenge'}
        </Button>
      </Card>
      {pastScores.length > 0 && (
        <Card className="mt-6">
          <h3 className="font-bold mb-3">Past Scores</h3>
          <div className="space-y-2">
            {pastScores.slice(0, 10).map((s, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{s.date}</span>
                <span className={`font-bold ${s.score >= 4 ? 'text-green-600' : s.score >= 2 ? 'text-yellow-600' : 'text-red-600'}`}>{s.score}/{s.total}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
