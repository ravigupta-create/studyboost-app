'use client';

import { useState, useCallback } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface WordClue {
  word: string;
  clue: string;
}

interface PlacedWord {
  word: string;
  clue: string;
  row: number;
  col: number;
  direction: 'across' | 'down';
  number: number;
}

interface Cell {
  letter: string;
  number?: number;
  partOf: number[];
}

export default function CrosswordPage() {
  const [entries, setEntries] = useState<WordClue[]>([]);
  const [wordInput, setWordInput] = useState('');
  const [clueInput, setClueInput] = useState('');
  const [grid, setGrid] = useState<(Cell | null)[][]>([]);
  const [placed, setPlaced] = useState<PlacedWord[]>([]);
  const [userGrid, setUserGrid] = useState<string[][]>([]);
  const [checked, setChecked] = useState(false);
  const [generated, setGenerated] = useState(false);

  const addEntry = () => {
    if (!wordInput.trim() || !clueInput.trim()) return;
    setEntries([...entries, { word: wordInput.trim().toUpperCase(), clue: clueInput.trim() }]);
    setWordInput(''); setClueInput('');
  };

  const removeEntry = (i: number) => setEntries(entries.filter((_, j) => j !== i));

  const generateCrossword = useCallback(() => {
    if (entries.length < 2) return;
    const sorted = [...entries].sort((a, b) => b.word.length - a.word.length);
    const SIZE = 20;
    const g: (string | null)[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
    const placedWords: PlacedWord[] = [];
    let num = 1;

    // Place first word horizontally in the middle
    const first = sorted[0];
    const startCol = Math.floor((SIZE - first.word.length) / 2);
    const startRow = Math.floor(SIZE / 2);
    for (let i = 0; i < first.word.length; i++) g[startRow][startCol + i] = first.word[i];
    placedWords.push({ ...first, row: startRow, col: startCol, direction: 'across', number: num++ });

    // Try to place remaining words
    for (let wi = 1; wi < sorted.length; wi++) {
      const entry = sorted[wi];
      let bestPlacement: { row: number; col: number; dir: 'across' | 'down' } | null = null;

      for (const pw of placedWords) {
        for (let pi = 0; pi < pw.word.length; pi++) {
          for (let ei = 0; ei < entry.word.length; ei++) {
            if (pw.word[pi] !== entry.word[ei]) continue;

            // Try perpendicular
            if (pw.direction === 'across') {
              const col = pw.col + pi;
              const row = pw.row - ei;
              if (row < 0 || row + entry.word.length > SIZE) continue;
              let valid = true;
              for (let k = 0; k < entry.word.length; k++) {
                const r = row + k;
                const existing = g[r][col];
                if (existing !== null && existing !== entry.word[k]) { valid = false; break; }
                if (existing === null) {
                  // Check adjacent
                  if (col > 0 && g[r][col - 1] !== null) { valid = false; break; }
                  if (col < SIZE - 1 && g[r][col + 1] !== null) { valid = false; break; }
                }
              }
              // Check above and below
              if (valid && row > 0 && g[row - 1][col] !== null) valid = false;
              if (valid && row + entry.word.length < SIZE && g[row + entry.word.length][col] !== null) valid = false;
              if (valid) bestPlacement = { row, col, dir: 'down' };
            } else {
              const row = pw.row + pi;
              const col = pw.col - ei;
              if (col < 0 || col + entry.word.length > SIZE) continue;
              let valid = true;
              for (let k = 0; k < entry.word.length; k++) {
                const c = col + k;
                const existing = g[row][c];
                if (existing !== null && existing !== entry.word[k]) { valid = false; break; }
                if (existing === null) {
                  if (row > 0 && g[row - 1][c] !== null) { valid = false; break; }
                  if (row < SIZE - 1 && g[row + 1][c] !== null) { valid = false; break; }
                }
              }
              if (valid && col > 0 && g[row][col - 1] !== null) valid = false;
              if (valid && col + entry.word.length < SIZE && g[row][col + entry.word.length] !== null) valid = false;
              if (valid) bestPlacement = { row, col, dir: 'across' };
            }
            if (bestPlacement) break;
          }
          if (bestPlacement) break;
        }
        if (bestPlacement) break;
      }

      if (bestPlacement) {
        const { row, col, dir } = bestPlacement;
        for (let k = 0; k < entry.word.length; k++) {
          if (dir === 'across') g[row][col + k] = entry.word[k];
          else g[row + k][col] = entry.word[k];
        }
        placedWords.push({ ...entry, row, col, direction: dir, number: num++ });
      }
    }

    // Build display grid
    let minR = SIZE, maxR = 0, minC = SIZE, maxC = 0;
    for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) {
      if (g[r][c] !== null) { minR = Math.min(minR, r); maxR = Math.max(maxR, r); minC = Math.min(minC, c); maxC = Math.max(maxC, c); }
    }

    const height = maxR - minR + 1;
    const width = maxC - minC + 1;
    const displayGrid: (Cell | null)[][] = Array.from({ length: height }, () => Array(width).fill(null));

    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        const letter = g[r + minR][c + minC];
        if (letter) displayGrid[r][c] = { letter, partOf: [] };
      }
    }

    // Adjust placed words and assign numbers
    const adjusted = placedWords.map(pw => ({ ...pw, row: pw.row - minR, col: pw.col - minC }));
    adjusted.forEach(pw => {
      const cell = displayGrid[pw.row][pw.col];
      if (cell) cell.number = pw.number;
    });

    setGrid(displayGrid);
    setPlaced(adjusted);
    setUserGrid(displayGrid.map(row => row.map(cell => cell ? '' : '')));
    setChecked(false);
    setGenerated(true);
  }, [entries]);

  const updateCell = (r: number, c: number, val: string) => {
    if (!grid[r][c]) return;
    const updated = userGrid.map(row => [...row]);
    updated[r][c] = val.toUpperCase().slice(-1);
    setUserGrid(updated);
    setChecked(false);
  };

  const checkAnswers = () => setChecked(true);

  const allCorrect = generated && grid.every((row, r) =>
    row.every((cell, c) => !cell || userGrid[r]?.[c] === cell.letter)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <PageHeader icon="\u{1F9E9}" title="Crossword Generator" description="Create crossword puzzles from your own words and clues." />

      {!generated ? (
        <Card>
          <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">Add Words & Clues (min 2)</h2>
          <div className="flex gap-2 mb-4">
            <Input placeholder="Word" value={wordInput} onChange={e => setWordInput(e.target.value)} />
            <Input placeholder="Clue" value={clueInput} onChange={e => setClueInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addEntry()} className="flex-1" />
            <Button size="sm" onClick={addEntry}>+</Button>
          </div>
          <div className="space-y-1 mb-4">
            {entries.map((e, i) => (
              <div key={i} className="flex justify-between items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700/50 text-sm">
                <span className="font-medium text-gray-900 dark:text-gray-100">{e.word}</span>
                <span className="text-gray-500 text-xs flex-1 ml-4 truncate">{e.clue}</span>
                <button onClick={() => removeEntry(i)} className="text-red-400 hover:text-red-600 ml-2">x</button>
              </div>
            ))}
          </div>
          <Button onClick={generateCrossword} disabled={entries.length < 2}>Generate Crossword</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <div className="overflow-x-auto">
                <div className="inline-grid gap-0" style={{ gridTemplateColumns: `repeat(${grid[0]?.length || 0}, 36px)` }}>
                  {grid.map((row, r) =>
                    row.map((cell, c) => (
                      <div key={`${r}-${c}`} className={`w-9 h-9 border relative ${cell ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900' : 'bg-gray-800 dark:bg-gray-950 border-gray-800'}`}>
                        {cell?.number && <span className="absolute top-0 left-0.5 text-[8px] text-gray-500 leading-none">{cell.number}</span>}
                        {cell && (
                          <input type="text" maxLength={1} value={userGrid[r]?.[c] || ''}
                            onChange={e => updateCell(r, c, e.target.value)}
                            className={`w-full h-full text-center text-sm font-bold uppercase bg-transparent focus:outline-none focus:bg-purple-50 dark:focus:bg-purple-900/20 ${
                              checked ? (userGrid[r]?.[c] === cell.letter ? 'text-green-600' : userGrid[r]?.[c] ? 'text-red-600' : 'text-gray-900 dark:text-gray-100') : 'text-gray-900 dark:text-gray-100'
                            }`} />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={checkAnswers}>Check</Button>
                <Button variant="secondary" onClick={() => { setGenerated(false); setEntries([]); }}>New Puzzle</Button>
              </div>
              {checked && allCorrect && (
                <p className="text-green-600 font-semibold mt-3 text-center">All correct! Great job!</p>
              )}
            </Card>
          </div>
          <div>
            <Card>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Clues</h3>
              <div className="mb-4">
                <h4 className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2">Across</h4>
                {placed.filter(p => p.direction === 'across').map(p => (
                  <p key={p.number} className="text-sm text-gray-700 dark:text-gray-300 mb-1"><span className="font-bold">{p.number}.</span> {p.clue}</p>
                ))}
              </div>
              <div>
                <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">Down</h4>
                {placed.filter(p => p.direction === 'down').map(p => (
                  <p key={p.number} className="text-sm text-gray-700 dark:text-gray-300 mb-1"><span className="font-bold">{p.number}.</span> {p.clue}</p>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
