'use client';
import { useState, useEffect, useCallback } from 'react';
import { useGeminiJSON } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';

interface CrosswordWord {
  word: string;
  clue: string;
  direction: 'across' | 'down';
  row: number;
  col: number;
}

export default function CrosswordAIPage() {
  const { hasKey } = useApiKey();
  const { data, loading, generate } = useGeminiJSON<{ words: CrosswordWord[] }>();
  const [topic, setTopic] = useState('');
  const [grid, setGrid] = useState<string[][]>([]);
  const [userGrid, setUserGrid] = useState<string[][]>([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [started, setStarted] = useState(false);

  const words = data?.words ?? [];

  const buildGrid = useCallback((wordList: CrosswordWord[]) => {
    const size = 15;
    const g: string[][] = Array.from({ length: size }, () => Array(size).fill(''));
    wordList.forEach(w => {
      for (let i = 0; i < w.word.length; i++) {
        const r = w.direction === 'down' ? w.row + i : w.row;
        const c = w.direction === 'across' ? w.col + i : w.col;
        if (r < size && c < size) g[r][c] = w.word[i].toUpperCase();
      }
    });
    return g;
  }, []);

  useEffect(() => {
    if (words.length > 0 && !started) {
      const g = buildGrid(words);
      setGrid(g);
      setUserGrid(g.map(row => row.map(cell => cell ? '' : '')));
      setStarted(true);
      setShowAnswers(false);
    }
  }, [words, started, buildGrid]);

  const handleStart = () => {
    setStarted(false);
    setShowAnswers(false);
    generate(`Generate a crossword puzzle about "${topic}". Return valid JSON only with this structure: {"words":[{"word":"ANSWER","clue":"The clue text","direction":"across","row":0,"col":0}]}.

Rules:
- Generate 8-12 words related to the topic
- All words must be single words (no spaces), uppercase
- Words should intersect where they share common letters
- Place words on a 15x15 grid (row/col are 0-indexed)
- Ensure words fit within the grid (row+word.length < 15 for down, col+word.length < 15 for across)
- Make clues educational and specific to the topic
- Ensure at least 3-4 intersections between words
- Start the first across word at row 1, col 1

Do NOT include any text outside the JSON.`);
  };

  const handleCellChange = (r: number, c: number, val: string) => {
    const newGrid = userGrid.map(row => [...row]);
    newGrid[r][c] = val.toUpperCase().slice(-1);
    setUserGrid(newGrid);
  };

  const checkAnswers = () => {
    setShowAnswers(true);
  };

  const acrossClues = words.filter(w => w.direction === 'across').sort((a, b) => a.row - b.row || a.col - b.col);
  const downClues = words.filter(w => w.direction === 'down').sort((a, b) => a.col - b.col || a.row - b.row);

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🧩" title="AI Crossword" description="AI-generated crossword puzzles on any topic." aiPowered />
      <ApiKeySetup />
    </div>
  );

  if (started && grid.length > 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <PageHeader icon="🧩" title="AI Crossword" description={`Topic: ${topic}`} aiPowered />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <div className="overflow-x-auto">
                <div className="inline-grid gap-0" style={{ gridTemplateColumns: `repeat(15, 28px)` }}>
                  {grid.map((row, r) =>
                    row.map((cell, c) => (
                      <div key={`${r}-${c}`} className={`w-7 h-7 border ${cell ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800' : 'bg-gray-900 dark:bg-gray-950'}`}>
                        {cell && (
                          <input
                            type="text"
                            maxLength={1}
                            value={showAnswers ? cell : (userGrid[r]?.[c] || '')}
                            onChange={e => handleCellChange(r, c, e.target.value)}
                            disabled={showAnswers}
                            className={`w-full h-full text-center text-xs font-bold uppercase bg-transparent outline-none ${showAnswers ? (userGrid[r]?.[c]?.toUpperCase() === cell ? 'text-green-600' : 'text-red-600') : 'text-gray-900 dark:text-gray-100'}`}
                          />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button onClick={checkAnswers} disabled={showAnswers}>Check Answers</Button>
                <Button variant="secondary" onClick={() => { setStarted(false); }}>New Puzzle</Button>
              </div>
            </Card>
          </div>
          <div>
            <Card className="mb-4">
              <h3 className="font-bold mb-2">Across</h3>
              <div className="space-y-1">
                {acrossClues.map((w, i) => (
                  <p key={i} className="text-sm"><strong>{i + 1}.</strong> {w.clue} {showAnswers && <span className="text-purple-600">({w.word})</span>}</p>
                ))}
              </div>
            </Card>
            <Card>
              <h3 className="font-bold mb-2">Down</h3>
              <div className="space-y-1">
                {downClues.map((w, i) => (
                  <p key={i} className="text-sm"><strong>{i + 1}.</strong> {w.clue} {showAnswers && <span className="text-purple-600">({w.word})</span>}</p>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🧩" title="AI Crossword" description="AI-generated crossword puzzles on any topic." aiPowered />
      <Card>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Topic</label>
          <Input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., American Revolution, Biology Cell Division, Solar System..." />
        </div>
        <div className="mt-4">
          <Button onClick={handleStart} disabled={loading || !topic.trim()}>
            {loading ? <><Spinner /> Generating Puzzle...</> : 'Generate Crossword'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
