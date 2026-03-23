'use client';

import { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Pair { word: string; definition: string; }
interface GameCard { id: number; text: string; pairId: number; isWord: boolean; flipped: boolean; matched: boolean; }

export default function CardMatchPage() {
  const [pairs, setPairs] = useState<Pair[]>([{ word: '', definition: '' }, { word: '', definition: '' }, { word: '', definition: '' }, { word: '', definition: '' }]);
  const [gameCards, setGameCards] = useState<GameCard[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { const s = localStorage.getItem('sb-cardmatch-best'); if (s) setBestScore(JSON.parse(s)); }, []);
  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [running]);

  const updatePair = (i: number, field: 'word' | 'definition', val: string) => {
    const np = [...pairs]; np[i] = { ...np[i], [field]: val }; setPairs(np);
  };
  const addPair = () => setPairs([...pairs, { word: '', definition: '' }]);
  const removePair = (i: number) => { if (pairs.length > 4) setPairs(pairs.filter((_, idx) => idx !== i)); };

  const validPairs = pairs.filter(p => p.word.trim() && p.definition.trim());

  const startGame = () => {
    const cards: GameCard[] = [];
    validPairs.forEach((p, i) => {
      cards.push({ id: i * 2, text: p.word, pairId: i, isWord: true, flipped: false, matched: false });
      cards.push({ id: i * 2 + 1, text: p.definition, pairId: i, isWord: false, flipped: false, matched: false });
    });
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    setGameCards(cards);
    setSelected([]); setMoves(0); setMatches(0); setTimer(0); setRunning(true);
  };

  const handleClick = (idx: number) => {
    if (!running || gameCards[idx].flipped || gameCards[idx].matched || selected.length >= 2) return;
    const nc = [...gameCards];
    nc[idx] = { ...nc[idx], flipped: true };
    const newSel = [...selected, idx];
    setGameCards(nc);
    setSelected(newSel);

    if (newSel.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newSel;
      if (nc[a].pairId === nc[b].pairId && nc[a].isWord !== nc[b].isWord) {
        setTimeout(() => {
          const mc = [...nc]; mc[a] = { ...mc[a], matched: true }; mc[b] = { ...mc[b], matched: true };
          setGameCards(mc); setSelected([]);
          const newMatches = matches + 1;
          setMatches(newMatches);
          if (newMatches === validPairs.length) {
            setRunning(false);
            const score = moves + 1;
            if (bestScore === null || score < bestScore) {
              setBestScore(score);
              localStorage.setItem('sb-cardmatch-best', JSON.stringify(score));
            }
          }
        }, 500);
      } else {
        setTimeout(() => {
          const uc = [...nc]; uc[a] = { ...uc[a], flipped: false }; uc[b] = { ...uc[b], flipped: false };
          setGameCards(uc); setSelected([]);
        }, 800);
      }
    }
  };

  const cols = gameCards.length <= 8 ? 4 : gameCards.length <= 12 ? 4 : gameCards.length <= 16 ? 4 : 6;

  if (gameCards.length > 0) {
    const done = matches === validPairs.length;
    return (
      <div className="max-w-4xl mx-auto">
        <PageHeader icon="&#127183;" title="Card Match" description="Match words with their definitions." />
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-4 text-sm">
            <span>Time: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
            <span>Moves: {moves}</span>
            <span>Matches: {matches}/{validPairs.length}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => { setGameCards([]); setRunning(false); }}>End Game</Button>
        </div>
        {done && (
          <Card className="mb-4 bg-emerald-50 dark:bg-emerald-900/20 text-center">
            <p className="text-xl font-bold text-emerald-600">You matched all pairs!</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Completed in {moves} moves, {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</p>
            {bestScore !== null && <p className="text-xs text-gray-500 mt-1">Best: {bestScore} moves</p>}
            <Button className="mt-3" onClick={startGame}>Play Again</Button>
          </Card>
        )}
        <div className={`grid gap-3`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {gameCards.map((c, i) => (
            <div key={c.id} onClick={() => handleClick(i)}
              className={`aspect-[3/4] rounded-xl flex items-center justify-center p-2 text-center text-sm font-medium cursor-pointer transition-all duration-300 ${
                c.matched ? 'bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-400 text-emerald-700 dark:text-emerald-300' :
                c.flipped ? 'bg-white dark:bg-gray-800 border-2 border-purple-400 text-gray-900 dark:text-gray-100 shadow-lg' :
                'bg-purple-600 dark:bg-purple-700 border-2 border-purple-700 text-purple-600 hover:bg-purple-500 dark:hover:bg-purple-600'
              }`}>
              {c.flipped || c.matched ? c.text : <span className="text-2xl text-white">?</span>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader icon="&#127183;" title="Card Match" description="Create word-definition pairs and play a memory matching game." />
      <Card>
        <h2 className="text-lg font-semibold mb-3">Enter Word-Definition Pairs (min 4)</h2>
        <div className="space-y-3">
          {pairs.map((p, i) => (
            <div key={i} className="flex gap-2 items-center">
              <span className="text-sm text-gray-400 w-6">{i + 1}.</span>
              <Input placeholder="Word" value={p.word} onChange={e => updatePair(i, 'word', e.target.value)} className="flex-1" />
              <Input placeholder="Definition" value={p.definition} onChange={e => updatePair(i, 'definition', e.target.value)} className="flex-1" />
              {pairs.length > 4 && <button onClick={() => removePair(i)} className="text-red-400 hover:text-red-600 text-lg">&times;</button>}
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-4">
          <Button variant="secondary" onClick={addPair}>Add Pair</Button>
          <Button onClick={startGame} disabled={validPairs.length < 4}>Start Game ({validPairs.length} pairs)</Button>
        </div>
        {bestScore !== null && <p className="text-sm text-gray-500 mt-3">Best score: {bestScore} moves</p>}
      </Card>
    </div>
  );
}
