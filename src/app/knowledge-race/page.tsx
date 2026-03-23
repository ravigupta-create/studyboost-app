'use client';
import { useState, useCallback } from 'react';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { callGeminiJSON } from '@/lib/gemini';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

export default function KnowledgeRacePage() {
  const { hasKey } = useApiKey();
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [apiKey, setApiKey] = useState('');

  // Get apiKey from localStorage
  const getApiKey = useCallback(() => {
    if (apiKey) return apiKey;
    const stored = typeof window !== 'undefined' ? localStorage.getItem('gemini-api-key') || '' : '';
    setApiKey(stored);
    return stored;
  }, [apiKey]);

  const fetchQuestion = useCallback(async (prevTopics: string[] = []) => {
    setLoading(true);
    setSelected(null);
    const key = getApiKey();
    if (!key) return;
    try {
      const avoid = prevTopics.length > 0 ? ` Do NOT ask about: ${prevTopics.slice(-5).join(', ')}.` : '';
      const result = await callGeminiJSON<{ question: string; options: string[]; correct: number }>(
        key,
        `Generate 1 rapid-fire trivia question. Return valid JSON only: {"question":"...","options":["A) ...","B) ...","C) ...","D) ..."],"correct":0}. "correct" is 0-based index. Make it interesting, covering any subject (science, history, geography, literature, math, pop culture, sports, art). Exactly 4 options.${avoid} Do NOT include text outside JSON.`
      );
      if (result) setQuestion(result);
    } catch {
      // error handled by hook
    } finally {
      setLoading(false);
    }
  }, [getApiKey]);

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setWrong(0);
    setGameOver(false);
    setGameStarted(true);
    setQuestionsAnswered(0);
    fetchQuestion();
  };

  const handleAnswer = (idx: number) => {
    if (selected !== null || !question) return;
    setSelected(idx);
    const isCorrect = idx === question.correct;
    const newQuestionsAnswered = questionsAnswered + 1;
    setQuestionsAnswered(newQuestionsAnswered);

    if (isCorrect) {
      const newStreak = streak + 1;
      const multiplier = Math.min(Math.floor(newStreak / 3) + 1, 5);
      setStreak(newStreak);
      setScore(s => s + (100 * multiplier));
    } else {
      setStreak(0);
      const newWrong = wrong + 1;
      setWrong(newWrong);
      if (newWrong >= 3) {
        setGameOver(true);
        return;
      }
    }

    setTimeout(() => {
      fetchQuestion([question.question]);
    }, 1500);
  };

  const multiplier = Math.min(Math.floor(streak / 3) + 1, 5);

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🏎️" title="Knowledge Race" description="Rapid-fire quiz — 3 wrong and you are out!" aiPowered />
      <ApiKeySetup />
    </div>
  );

  if (gameOver) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <PageHeader icon="🏎️" title="Knowledge Race" description="Rapid-fire quiz — 3 wrong and you are out!" aiPowered />
        <Card className="text-center">
          <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
          <p className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">{score}</p>
          <p className="text-gray-500 mb-1">Questions answered: {questionsAnswered}</p>
          <p className="text-gray-500 mb-4">Best streak: {streak > 0 ? streak : 'N/A'}</p>
          <Button onClick={startGame}>Play Again</Button>
        </Card>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <PageHeader icon="🏎️" title="Knowledge Race" description="Rapid-fire quiz — 3 wrong and you are out!" aiPowered />
        <Card className="text-center">
          <h2 className="text-xl font-bold mb-3">How to Play</h2>
          <div className="text-gray-600 dark:text-gray-400 space-y-2 mb-6 text-left max-w-md mx-auto">
            <p>- Answer rapid-fire trivia questions</p>
            <p>- Every 3 correct answers in a row increases your multiplier (up to 5x)</p>
            <p>- 3 wrong answers = Game Over</p>
            <p>- Score as many points as possible!</p>
          </div>
          <Button onClick={startGame}>Start Race</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🏎️" title="Knowledge Race" description="Rapid-fire quiz — 3 wrong and you are out!" aiPowered />
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <span className="text-sm font-bold text-purple-600 dark:text-purple-400">Score: {score}</span>
          <span className="text-sm font-medium text-gray-500">Streak: {streak} {multiplier > 1 && `(${multiplier}x)`}</span>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <span key={i} className={`text-lg ${i < wrong ? 'text-red-500' : 'text-gray-300 dark:text-gray-600'}`}>&#x2716;</span>
          ))}
        </div>
      </div>
      {loading ? (
        <Card className="text-center py-12">
          <Spinner />
          <p className="mt-3 text-gray-500">Loading question...</p>
        </Card>
      ) : question ? (
        <Card>
          <p className="text-lg font-medium mb-4">{question.question}</p>
          <div className="space-y-2">
            {question.options.map((opt, j) => (
              <button key={j} onClick={() => handleAnswer(j)} className={`w-full text-left p-3 rounded-lg border transition-colors ${selected === null ? 'border-gray-200 dark:border-gray-600 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20' : j === question.correct ? 'border-green-500 bg-green-50 dark:bg-green-900/20 font-medium' : selected === j ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-600 opacity-50'}`}>
                {opt}
              </button>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
