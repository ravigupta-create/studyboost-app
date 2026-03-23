'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface SRCard {
  id: string;
  front: string;
  back: string;
  interval: number;
  repetition: number;
  easeFactor: number;
  nextReview: string;
  lastReview: string | null;
}

function sm2(card: SRCard, quality: number): SRCard {
  let { interval, repetition, easeFactor } = card;
  if (quality >= 3) {
    if (repetition === 0) interval = 1;
    else if (repetition === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetition += 1;
  } else {
    repetition = 0;
    interval = 1;
  }
  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  const next = new Date();
  next.setDate(next.getDate() + interval);
  return { ...card, interval, repetition, easeFactor, nextReview: next.toISOString().split('T')[0], lastReview: new Date().toISOString().split('T')[0] };
}

export default function SpacedRepetitionPage() {
  const [cards, setCards] = useState<SRCard[]>([]);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [view, setView] = useState<'manage' | 'review'>('manage');
  const [reviewIndex, setReviewIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => { const s = localStorage.getItem('sb-sr-cards'); if (s) setCards(JSON.parse(s)); }, []);
  const save = (d: SRCard[]) => { setCards(d); localStorage.setItem('sb-sr-cards', JSON.stringify(d)); };

  const today = new Date().toISOString().split('T')[0];
  const dueCards = cards.filter(c => c.nextReview <= today);

  const addCard = () => {
    if (!front.trim() || !back.trim()) return;
    const nc: SRCard = { id: Date.now().toString(), front: front.trim(), back: back.trim(), interval: 0, repetition: 0, easeFactor: 2.5, nextReview: today, lastReview: null };
    save([...cards, nc]);
    setFront(''); setBack('');
  };

  const deleteCard = (id: string) => save(cards.filter(c => c.id !== id));

  const rateCard = (quality: number) => {
    const card = dueCards[reviewIndex];
    const updated = sm2(card, quality);
    const newCards = cards.map(c => c.id === card.id ? updated : c);
    save(newCards);
    setFlipped(false);
    if (reviewIndex >= dueCards.length - 1) {
      setView('manage');
      setReviewIndex(0);
    }
  };

  const startReview = () => {
    if (dueCards.length === 0) return;
    setReviewIndex(0);
    setFlipped(false);
    setView('review');
  };

  if (view === 'review' && dueCards.length > 0) {
    const current = dueCards[reviewIndex];
    return (
      <div className="max-w-3xl mx-auto">
        <PageHeader icon="&#128257;" title="Spaced Repetition" description="Review your due flashcards using the SM-2 algorithm." />
        <div className="text-sm text-gray-500 mb-4">Card {reviewIndex + 1} of {dueCards.length} due today</div>
        <Card className="min-h-[250px] flex flex-col items-center justify-center cursor-pointer" onClick={() => setFlipped(!flipped)}>
          {!flipped ? (
            <>
              <span className="text-xs font-medium text-purple-500 uppercase tracking-wider mb-3">Front</span>
              <p className="text-xl font-semibold text-center">{current.front}</p>
              <span className="mt-4 text-xs text-gray-400">Click to reveal answer</span>
            </>
          ) : (
            <>
              <span className="text-xs font-medium text-emerald-500 uppercase tracking-wider mb-3">Back</span>
              <p className="text-xl font-semibold text-center mb-6">{current.back}</p>
              <div className="text-sm text-gray-500 mb-2">How well did you know this?</div>
              <div className="flex gap-2 flex-wrap justify-center">
                {[
                  { q: 0, label: 'Forgot', color: 'bg-red-600 hover:bg-red-700' },
                  { q: 1, label: 'Hard', color: 'bg-orange-500 hover:bg-orange-600' },
                  { q: 2, label: 'Struggled', color: 'bg-yellow-500 hover:bg-yellow-600' },
                  { q: 3, label: 'OK', color: 'bg-blue-500 hover:bg-blue-600' },
                  { q: 4, label: 'Good', color: 'bg-green-500 hover:bg-green-600' },
                  { q: 5, label: 'Perfect', color: 'bg-emerald-600 hover:bg-emerald-700' },
                ].map(r => (
                  <button key={r.q} onClick={(e) => { e.stopPropagation(); rateCard(r.q); }}
                    className={`${r.color} text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors`}>
                    {r.q} - {r.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </Card>
        <div className="mt-4">
          <Button variant="ghost" onClick={() => { setView('manage'); setReviewIndex(0); }}>Back to Cards</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader icon="&#128257;" title="Spaced Repetition" description="Create flashcards and review them with the SM-2 spaced repetition algorithm." />

      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Add New Card</h2>
        <div className="space-y-3">
          <Input placeholder="Front (question/term)" value={front} onChange={e => setFront(e.target.value)} />
          <Textarea placeholder="Back (answer/definition)" value={back} onChange={e => setBack(e.target.value)} className="min-h-[80px]" />
          <Button onClick={addCard} disabled={!front.trim() || !back.trim()}>Add Card</Button>
        </div>
      </Card>

      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Review Queue</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{dueCards.length} card{dueCards.length !== 1 ? 's' : ''} due today</span>
            <Button onClick={startReview} disabled={dueCards.length === 0} size="sm">Start Review</Button>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-3">All Cards ({cards.length})</h2>
        {cards.length === 0 ? (
          <p className="text-gray-500 text-sm">No cards yet. Add your first card above.</p>
        ) : (
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {cards.map(c => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{c.front}</p>
                  <p className="text-xs text-gray-500 truncate">{c.back}</p>
                </div>
                <div className="flex items-center gap-3 ml-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${c.nextReview <= today ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'}`}>
                    {c.nextReview <= today ? 'Due' : `Next: ${c.nextReview}`}
                  </span>
                  <span className="text-xs text-gray-400">EF: {c.easeFactor.toFixed(1)}</span>
                  <button onClick={() => deleteCard(c.id)} className="text-red-400 hover:text-red-600 text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
