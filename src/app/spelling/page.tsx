'use client';
import { useState, useEffect } from 'react';
import { useGeminiJSON } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';

interface SpellingWord {
  word: string;
  definition: string;
  sentence: string;
  pronunciation: string;
}

export default function SpellingPage() {
  const { hasKey } = useApiKey();
  const { data, loading, generate } = useGeminiJSON<{ words: SpellingWord[] }>();
  const [grade, setGrade] = useState('6');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);

  const words = data?.words ?? [];

  useEffect(() => {
    if (words.length > 0 && !started) {
      setStarted(true);
      setCurrentIdx(0);
      setAnswers([]);
      setShowResults(false);
      setUserInput('');
      setRevealed(false);
    }
  }, [words, started]);

  const handleStart = () => {
    setStarted(false);
    setShowResults(false);
    generate(`Generate exactly 10 spelling words appropriate for grade ${grade} students. Return valid JSON only: {"words":[{"word":"correctly spelled word","definition":"clear definition","sentence":"example sentence with the word used (replace the word with ___)","pronunciation":"simplified pronunciation guide"}]}. Choose words that are commonly misspelled at this grade level. Include a mix of difficulty within the grade level. Do NOT include any text outside the JSON.`);
  };

  const handleSubmit = () => {
    const newAnswers = [...answers, userInput.trim().toLowerCase()];
    setAnswers(newAnswers);
    if (currentIdx < words.length - 1) {
      setCurrentIdx(c => c + 1);
      setUserInput('');
      setRevealed(false);
    } else {
      setShowResults(true);
    }
  };

  const score = answers.filter((a, i) => a === words[i]?.word.toLowerCase()).length;

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="📝" title="Spelling Bee" description="Practice spelling with AI-generated words at your grade level." aiPowered />
      <ApiKeySetup />
    </div>
  );

  if (showResults && words.length > 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <PageHeader icon="📝" title="Spelling Bee" description="Practice spelling with AI-generated words at your grade level." aiPowered />
        <Card className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Results</h2>
          <p className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">{score}/10</p>
          <p className="text-gray-500">Grade {grade} Level</p>
        </Card>
        {words.map((w, i) => {
          const correct = answers[i] === w.word.toLowerCase();
          return (
            <Card key={i} className="mb-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{i + 1}. {w.word} <span className="text-sm text-gray-400">({w.pronunciation})</span></p>
                  <p className="text-sm text-gray-500">{w.definition}</p>
                  {!correct && <p className="text-sm text-red-500 mt-1">Your answer: {answers[i] || '(blank)'}</p>}
                </div>
                <span className={`text-xl ${correct ? 'text-green-500' : 'text-red-500'}`}>{correct ? '✓' : '✗'}</span>
              </div>
            </Card>
          );
        })}
        <Button onClick={() => { setStarted(false); setShowResults(false); }}>Try Again</Button>
      </div>
    );
  }

  if (started && words.length > 0) {
    const w = words[currentIdx];
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <PageHeader icon="📝" title="Spelling Bee" description="Practice spelling with AI-generated words at your grade level." aiPowered />
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-500">Word {currentIdx + 1} of 10</span>
          <span className="text-sm font-bold text-purple-600 dark:text-purple-400">Grade {grade}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
          <div className="bg-purple-600 h-2 rounded-full transition-all" style={{ width: `${((currentIdx + 1) / 10) * 100}%` }} />
        </div>
        <Card>
          <div className="space-y-3 mb-4">
            <p className="text-gray-600 dark:text-gray-400"><strong>Definition:</strong> {w.definition}</p>
            <p className="text-gray-600 dark:text-gray-400"><strong>Used in a sentence:</strong> {w.sentence}</p>
            {revealed && <p className="text-gray-600 dark:text-gray-400"><strong>Pronunciation:</strong> {w.pronunciation}</p>}
            {!revealed && (
              <button onClick={() => setRevealed(true)} className="text-sm text-purple-600 dark:text-purple-400 underline">Show pronunciation hint</button>
            )}
          </div>
          <div className="flex gap-2">
            <Input value={userInput} onChange={e => setUserInput(e.target.value)} placeholder="Type the spelling..." onKeyDown={e => { if (e.key === 'Enter' && userInput.trim()) handleSubmit(); }} />
            <Button onClick={handleSubmit} disabled={!userInput.trim()}>
              {currentIdx < 9 ? 'Next' : 'Finish'}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="📝" title="Spelling Bee" description="Practice spelling with AI-generated words at your grade level." aiPowered />
      <Card>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Grade Level</label>
          <Select value={grade} onChange={e => setGrade(e.target.value)}>
            {Array.from({ length: 10 }, (_, i) => i + 3).map(g => (
              <option key={g} value={g}>Grade {g}</option>
            ))}
          </Select>
        </div>
        <div className="mt-4">
          <Button onClick={handleStart} disabled={loading}>
            {loading ? <><Spinner /> Generating Words...</> : 'Start Spelling Bee'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
