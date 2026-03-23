'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

type Op = '+' | '-' | '\u00D7' | '\u00F7';
type Difficulty = 'easy' | 'medium' | 'hard';

const LS_KEY = 'sb-speed-math-high';

function genNum(diff: Difficulty): number {
  if (diff === 'easy') return Math.floor(Math.random() * 9) + 1;
  if (diff === 'medium') return Math.floor(Math.random() * 90) + 10;
  return Math.floor(Math.random() * 900) + 100;
}

function genProblem(op: Op, diff: Difficulty): { a: number; b: number; answer: number; display: string } {
  let a = genNum(diff), b = genNum(diff);
  if (op === '-' && a < b) [a, b] = [b, a];
  if (op === '\u00F7') {
    b = Math.max(1, diff === 'easy' ? Math.floor(Math.random() * 9) + 1 : diff === 'medium' ? Math.floor(Math.random() * 12) + 2 : Math.floor(Math.random() * 20) + 2);
    a = b * (Math.floor(Math.random() * (diff === 'easy' ? 9 : diff === 'medium' ? 20 : 50)) + 1);
  }
  const answer = op === '+' ? a + b : op === '-' ? a - b : op === '\u00D7' ? a * b : a / b;
  return { a, b, answer, display: `${a} ${op} ${b} = ?` };
}

export default function SpeedMathPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [operation, setOperation] = useState<Op>('+');
  const [playing, setPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [problem, setProblem] = useState<ReturnType<typeof genProblem> | null>(null);
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [highScores, setHighScores] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setHighScores(JSON.parse(saved));
  }, []);

  const start = useCallback(() => {
    setPlaying(true);
    setTimeLeft(60);
    setCorrect(0);
    setTotal(0);
    setAnswer('');
    setFeedback(null);
    setProblem(genProblem(operation, difficulty));
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [operation, difficulty]);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setPlaying(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [playing]);

  useEffect(() => {
    if (timeLeft === 0 && !playing) {
      const key = `${difficulty}-${operation}`;
      if (correct > (highScores[key] || 0)) {
        const updated = { ...highScores, [key]: correct };
        setHighScores(updated);
        localStorage.setItem(LS_KEY, JSON.stringify(updated));
      }
    }
  }, [timeLeft, playing, correct, difficulty, operation, highScores]);

  const submit = () => {
    if (!problem || !answer.trim()) return;
    const isCorrect = parseFloat(answer) === problem.answer;
    setFeedback(isCorrect ? 'Correct!' : `Wrong! ${problem.a} ${operation} ${problem.b} = ${problem.answer}`);
    if (isCorrect) setCorrect(c => c + 1);
    setTotal(t => t + 1);
    setAnswer('');
    setProblem(genProblem(operation, difficulty));
    setTimeout(() => { setFeedback(null); inputRef.current?.focus(); }, 800);
  };

  const highKey = `${difficulty}-${operation}`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="\u26A1" title="Speed Math" description="Mental math drills with a 60-second timer." />

      {!playing && timeLeft > 0 ? (
        <Card>
          <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">Settings</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Operation</label>
              <Select value={operation} onChange={e => setOperation(e.target.value as Op)}>
                <option value="+">Addition (+)</option>
                <option value="-">Subtraction (-)</option>
                <option value={'\u00D7'}>Multiplication (\u00D7)</option>
                <option value={'\u00F7'}>Division (\u00F7)</option>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Difficulty</label>
              <Select value={difficulty} onChange={e => setDifficulty(e.target.value as Difficulty)}>
                <option value="easy">Easy (1 digit)</option>
                <option value="medium">Medium (2 digits)</option>
                <option value="hard">Hard (3 digits)</option>
              </Select>
            </div>
          </div>
          {highScores[highKey] !== undefined && (
            <p className="text-sm text-gray-500 mb-4">High Score: {highScores[highKey]} correct</p>
          )}
          <Button onClick={start} size="lg">Start Drill</Button>
        </Card>
      ) : playing ? (
        <Card>
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <span className="text-sm font-medium text-green-600">{correct} correct</span>
              <span className="text-sm text-gray-500">{total} total</span>
            </div>
            <span className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-900 dark:text-gray-100'}`}>{timeLeft}s</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-8">
            <div className="bg-purple-500 h-2 rounded-full transition-all" style={{ width: `${(timeLeft / 60) * 100}%` }} />
          </div>

          <div className="text-center mb-8">
            <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 font-mono">{problem?.display}</p>
          </div>

          <div className="flex gap-3 max-w-xs mx-auto">
            <Input ref={inputRef} type="number" value={answer} onChange={e => setAnswer(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()} placeholder="Your answer" className="text-center text-lg" autoFocus />
            <Button onClick={submit}>Go</Button>
          </div>

          {feedback && (
            <p className={`text-center mt-4 font-medium ${feedback.startsWith('Correct') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>
          )}
        </Card>
      ) : (
        <Card className="text-center py-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{correct} / {total}</h2>
          <p className="text-gray-500 mb-1">{total > 0 ? `${Math.round((correct / total) * 100)}% accuracy` : 'No answers'}</p>
          <p className="text-sm text-gray-400 mb-6">High Score: {Math.max(highScores[highKey] || 0, correct)}</p>
          <Button onClick={start}>Play Again</Button>
        </Card>
      )}
    </div>
  );
}
