'use client';
import { useState, useEffect } from 'react';
import { useGeminiJSON } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';

const CATEGORIES = ['Science', 'History', 'Literature', 'Math', 'Geography', 'Pop Culture', 'Sports', 'Art'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

interface TriviaQ {
  question: string;
  options: string[];
  correct: number;
  fact: string;
}

export default function TriviaPage() {
  const { hasKey } = useApiKey();
  const { data, loading, generate } = useGeminiJSON<{ questions: TriviaQ[] }>();
  const [category, setCategory] = useState('Science');
  const [difficulty, setDifficulty] = useState('Medium');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [gameActive, setGameActive] = useState(false);
  const [gameDone, setGameDone] = useState(false);

  const questions = data?.questions ?? [];

  useEffect(() => {
    if (questions.length > 0 && !gameActive && !gameDone) {
      setGameActive(true);
      setCurrentQ(0);
      setScore(0);
      setSelected(null);
    }
  }, [questions, gameActive, gameDone]);

  const handleStart = () => {
    setGameActive(false);
    setGameDone(false);
    setSelected(null);
    generate(`Generate exactly 10 trivia questions about ${category} at ${difficulty} difficulty. Return valid JSON only: {"questions":[{"question":"...","options":["A) ...","B) ...","C) ...","D) ..."],"correct":0,"fact":"A fun fact related to the answer"}]}. "correct" is 0-based index. Make questions genuinely interesting and educational. Each must have exactly 4 options. ${difficulty === 'Easy' ? 'Questions should be answerable by most middle schoolers.' : difficulty === 'Medium' ? 'Questions should challenge high school students.' : 'Questions should challenge college-educated adults.'} Do NOT include any text outside the JSON.`);
  };

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[currentQ]?.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
    } else {
      setGameDone(true);
      setGameActive(false);
    }
  };

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🧠" title="Trivia Challenge" description="Test your knowledge with AI-generated trivia." aiPowered />
      <ApiKeySetup />
    </div>
  );

  if (gameDone) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <PageHeader icon="🧠" title="Trivia Challenge" description="Test your knowledge with AI-generated trivia." aiPowered />
        <Card className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
          <p className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">{score}/{questions.length}</p>
          <p className="text-gray-500 mb-1">{category} — {difficulty}</p>
          <p className="text-lg">{score >= 8 ? 'Outstanding!' : score >= 6 ? 'Great job!' : score >= 4 ? 'Not bad!' : 'Keep practicing!'}</p>
        </Card>
        <Button onClick={() => { setGameDone(false); }}>Play Again</Button>
      </div>
    );
  }

  if (gameActive && questions.length > 0) {
    const q = questions[currentQ];
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <PageHeader icon="🧠" title="Trivia Challenge" description="Test your knowledge with AI-generated trivia." aiPowered />
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-500">Question {currentQ + 1}/10</span>
          <span className="text-sm font-bold text-purple-600 dark:text-purple-400">Score: {score}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
          <div className="bg-purple-600 h-2 rounded-full transition-all" style={{ width: `${((currentQ + 1) / 10) * 100}%` }} />
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
              <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-3">{q.fact}</p>
              <Button onClick={handleNext}>{currentQ < 9 ? 'Next Question' : 'See Results'}</Button>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🧠" title="Trivia Challenge" description="Test your knowledge with AI-generated trivia." aiPowered />
      <Card>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <Select value={category} onChange={e => setCategory(e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Difficulty</label>
            <Select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
              {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
            </Select>
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={handleStart} disabled={loading}>
            {loading ? <><Spinner /> Generating...</> : 'Start Trivia'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
