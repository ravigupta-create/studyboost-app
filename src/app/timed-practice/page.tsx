'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useGeminiJSON } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export default function TimedPracticePage() {
  const { hasKey } = useApiKey();
  const { data, loading, generate } = useGeminiJSON<{ questions: Question[] }>();
  const [subject, setSubject] = useState('');
  const [count, setCount] = useState('10');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const questions = data?.questions ?? [];
  const totalTime = parseInt(count) * 30;

  useEffect(() => {
    if (questions.length > 0 && !quizStarted) {
      setQuizStarted(true);
      setTimeLeft(totalTime);
      setAnswers(new Array(questions.length).fill(null));
    }
  }, [questions, quizStarted, totalTime]);

  useEffect(() => {
    if (quizStarted && !quizDone && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }
    if (timeLeft === 0 && quizStarted && !quizDone) {
      setQuizDone(true);
    }
  }, [quizStarted, quizDone, timeLeft]);

  const handleStart = () => {
    if (!subject.trim() || loading) return;
    setQuizStarted(false);
    setQuizDone(false);
    setCurrentQ(0);
    setSelected(null);
    generate(`Generate exactly ${count} multiple choice questions about "${subject}". Return valid JSON only with this structure: {"questions":[{"question":"...","options":["A) ...","B) ...","C) ...","D) ..."],"correct":0,"explanation":"..."}]}. The "correct" field is the 0-based index of the correct option. Make questions educational and varied in difficulty. Each question must have exactly 4 options. Do NOT include any text outside the JSON.`);
  };

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
    } else {
      setQuizDone(true);
    }
  };

  const score = answers.filter((a, i) => a === questions[i]?.correct).length;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="⏱️" title="Timed Practice" description="Take timed MC quizzes on any subject." aiPowered />
      <ApiKeySetup />
    </div>
  );

  if (quizDone && questions.length > 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <PageHeader icon="⏱️" title="Timed Practice" description="Take timed MC quizzes on any subject." aiPowered />
        <Card className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">{score} / {questions.length}</p>
          <p className="text-gray-500">{Math.round((score / questions.length) * 100)}% correct</p>
        </Card>
        {questions.map((q, i) => (
          <Card key={i} className="mb-4">
            <p className="font-medium mb-2">Q{i + 1}: {q.question}</p>
            <div className="space-y-1 mb-3">
              {q.options.map((opt, j) => (
                <div key={j} className={`p-2 rounded text-sm ${j === q.correct ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-medium' : answers[i] === j ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' : 'text-gray-600 dark:text-gray-400'}`}>
                  {opt} {j === q.correct ? ' ✓' : answers[i] === j ? ' ✗' : ''}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">{q.explanation}</p>
          </Card>
        ))}
        <Button onClick={() => { setQuizStarted(false); setQuizDone(false); setCurrentQ(0); setSelected(null); }}>Try Again</Button>
      </div>
    );
  }

  if (quizStarted && questions.length > 0) {
    const q = questions[currentQ];
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <PageHeader icon="⏱️" title="Timed Practice" description="Take timed MC quizzes on any subject." aiPowered />
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-500">Question {currentQ + 1} of {questions.length}</span>
          <span className={`text-sm font-bold ${timeLeft < 30 ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>{mins}:{secs.toString().padStart(2, '0')}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
          <div className="bg-purple-600 h-2 rounded-full transition-all" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
        </div>
        <Card className="mb-6">
          <p className="text-lg font-medium mb-4">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, j) => (
              <button key={j} onClick={() => handleAnswer(j)} className={`w-full text-left p-3 rounded-lg border transition-colors ${selected === null ? 'border-gray-200 dark:border-gray-600 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20' : j === q.correct ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : selected === j ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-600 opacity-50'}`}>
                {opt}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-3">{q.explanation}</p>
              <Button onClick={handleNext}>{currentQ < questions.length - 1 ? 'Next Question' : 'See Results'}</Button>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="⏱️" title="Timed Practice" description="Take timed MC quizzes on any subject." aiPowered />
      <Card className="mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
            <Input value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g., World War II, Organic Chemistry, Calculus..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Questions</label>
            <Select value={count} onChange={e => setCount(e.target.value)}>
              {[5, 10, 15, 20].map(n => <option key={n} value={n}>{n} questions ({Math.floor(n * 30 / 60)} min {(n * 30) % 60}s)</option>)}
            </Select>
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={handleStart} disabled={loading || !subject.trim()}>
            {loading ? <><Spinner /> Generating Quiz...</> : 'Start Timed Quiz'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
