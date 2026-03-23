'use client';

import { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface WordPair {
  word: string;
  definition: string;
}

const DEFAULT_WORDS: WordPair[] = [
  { word: 'ephemeral', definition: 'Lasting for a very short time' },
  { word: 'ubiquitous', definition: 'Present, appearing, or found everywhere' },
  { word: 'pragmatic', definition: 'Dealing with things sensibly and realistically' },
  { word: 'ambiguous', definition: 'Open to more than one interpretation' },
  { word: 'eloquent', definition: 'Fluent or persuasive in speaking or writing' },
  { word: 'benevolent', definition: 'Well-meaning and kindly' },
  { word: 'diligent', definition: 'Having or showing care in work or duties' },
  { word: 'cogent', definition: 'Clear, logical, and convincing' },
  { word: 'tenacious', definition: 'Holding firmly to something; persistent' },
  { word: 'resilient', definition: 'Able to recover quickly from difficulties' },
];

const LS_KEY = 'sb-vocab-drill-high';

export default function VocabDrillPage() {
  const [words, setWords] = useState<WordPair[]>(DEFAULT_WORDS);
  const [mode, setMode] = useState<'setup' | 'drill' | 'results'>('setup');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [wordTimes, setWordTimes] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [highScore, setHighScore] = useState(0);
  const [newWord, setNewWord] = useState('');
  const [newDef, setNewDef] = useState('');
  const [shuffled, setShuffled] = useState<WordPair[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setHighScore(parseInt(saved));
    // Try to load from flashcard library
    try {
      const lib = localStorage.getItem('sb-library');
      if (lib) {
        const decks = JSON.parse(lib);
        if (Array.isArray(decks) && decks.length > 0) {
          const pairs: WordPair[] = [];
          decks.forEach((deck: { cards?: { front: string; back: string }[] }) => {
            deck.cards?.forEach(card => {
              if (card.front && card.back) pairs.push({ word: card.front, definition: card.back });
            });
          });
          if (pairs.length > 0) setWords(pairs.slice(0, 20));
        }
      }
    } catch {}
  }, []);

  const addWord = () => {
    if (!newWord.trim() || !newDef.trim()) return;
    setWords([...words, { word: newWord.trim(), definition: newDef.trim() }]);
    setNewWord(''); setNewDef('');
  };

  const startDrill = () => {
    const s = [...words].sort(() => Math.random() - 0.5);
    setShuffled(s);
    setCurrentIdx(0); setCorrect(0); setTotal(0); setWordTimes([]);
    setStartTime(Date.now()); setFeedback(null); setMode('drill');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const submit = () => {
    if (!answer.trim()) return;
    const wordTime = (Date.now() - startTime) / 1000;
    const isCorrect = answer.trim().toLowerCase() === shuffled[currentIdx].word.toLowerCase();
    setFeedback(isCorrect ? 'Correct!' : `Wrong! The word was "${shuffled[currentIdx].word}"`);
    if (isCorrect) setCorrect(c => c + 1);
    setTotal(t => t + 1);
    setWordTimes([...wordTimes, wordTime]);

    setTimeout(() => {
      if (currentIdx + 1 >= shuffled.length) {
        setMode('results');
        const finalCorrect = correct + (isCorrect ? 1 : 0);
        if (finalCorrect > highScore) { setHighScore(finalCorrect); localStorage.setItem(LS_KEY, finalCorrect.toString()); }
      } else {
        setCurrentIdx(i => i + 1);
        setStartTime(Date.now());
        setFeedback(null);
      }
      setAnswer('');
      inputRef.current?.focus();
    }, 1200);
  };

  const avgTime = wordTimes.length > 0 ? (wordTimes.reduce((a, b) => a + b, 0) / wordTimes.length).toFixed(1) : '0';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="\u{1F4AC}" title="Vocab Drill" description="Speed vocabulary drill - see the definition, type the word." />

      {mode === 'setup' ? (
        <Card>
          <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">Word List ({words.length} words)</h2>
          <div className="flex gap-2 mb-4">
            <Input placeholder="Word" value={newWord} onChange={e => setNewWord(e.target.value)} />
            <Input placeholder="Definition" value={newDef} onChange={e => setNewDef(e.target.value)} onKeyDown={e => e.key === 'Enter' && addWord()} />
            <Button size="sm" onClick={addWord}>+</Button>
          </div>
          <div className="max-h-[300px] overflow-y-auto space-y-1 mb-4">
            {words.map((w, i) => (
              <div key={i} className="flex justify-between items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700/50 text-sm">
                <span className="font-medium text-gray-900 dark:text-gray-100">{w.word}</span>
                <span className="text-gray-500 text-xs flex-1 ml-4 truncate">{w.definition}</span>
                <button onClick={() => setWords(words.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 ml-2">x</button>
              </div>
            ))}
          </div>
          <Button onClick={startDrill} disabled={words.length < 2}>Start Drill</Button>
        </Card>
      ) : mode === 'drill' ? (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Word {currentIdx + 1} / {shuffled.length}</span>
            <span className="text-sm font-medium text-green-600">{correct} correct</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-6">
            <div className="bg-purple-500 h-2 rounded-full transition-all" style={{ width: `${((currentIdx + 1) / shuffled.length) * 100}%` }} />
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-2">Definition:</p>
            <p className="text-xl text-gray-900 dark:text-gray-100 font-medium">{shuffled[currentIdx].definition}</p>
          </div>

          <div className="flex gap-3 max-w-sm mx-auto">
            <Input ref={inputRef} value={answer} onChange={e => setAnswer(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()} placeholder="Type the word..." autoFocus />
            <Button onClick={submit}>Go</Button>
          </div>

          {feedback && (
            <p className={`text-center mt-4 font-medium ${feedback.startsWith('Correct') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>
          )}
        </Card>
      ) : (
        <Card className="text-center py-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{correct} / {total}</h2>
          <p className="text-gray-500 mb-1">{total > 0 ? `${Math.round((correct / total) * 100)}% accuracy` : ''}</p>
          <p className="text-sm text-gray-400 mb-1">Avg. time: {avgTime}s per word</p>
          <p className="text-sm text-gray-400 mb-6">High Score: {Math.max(highScore, correct)}</p>
          <div className="flex gap-2 justify-center">
            <Button onClick={startDrill}>Play Again</Button>
            <Button variant="secondary" onClick={() => setMode('setup')}>Edit Words</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
