'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';

interface JournalEntry {
  date: string;
  learned: string;
  confusing: string;
  plan: string;
  mood: string;
}

const LS_KEY = 'sb-journal';
const MOODS = [
  { emoji: '\u{1F60A}', label: 'Great' },
  { emoji: '\u{1F642}', label: 'Good' },
  { emoji: '\u{1F610}', label: 'Okay' },
  { emoji: '\u{1F615}', label: 'Confused' },
  { emoji: '\u{1F629}', label: 'Stressed' },
];

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [today, setToday] = useState(() => new Date().toISOString().split('T')[0]);
  const [view, setView] = useState<'write' | 'browse'>('write');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [form, setForm] = useState<JournalEntry>({ date: today, learned: '', confusing: '', plan: '', mood: '' });

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      const parsed: JournalEntry[] = JSON.parse(saved);
      setEntries(parsed);
      const todayEntry = parsed.find(e => e.date === today);
      if (todayEntry) setForm(todayEntry);
    }
  }, [today]);

  const save = () => {
    const updated = entries.filter(e => e.date !== form.date);
    updated.push({ ...form, date: today });
    updated.sort((a, b) => b.date.localeCompare(a.date));
    setEntries(updated);
    localStorage.setItem(LS_KEY, JSON.stringify(updated));
  };

  const viewEntry = entries.find(e => e.date === selectedDate);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="📓" title="Study Journal" description="Reflect on your learning with guided daily prompts." />

      <div className="flex gap-2 mb-6">
        <Button variant={view === 'write' ? 'primary' : 'secondary'} onClick={() => setView('write')}>Today&apos;s Entry</Button>
        <Button variant={view === 'browse' ? 'primary' : 'secondary'} onClick={() => setView('browse')}>Browse Past</Button>
      </div>

      {view === 'write' ? (
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{new Date(today + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h2>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">How are you feeling?</label>
            <div className="flex gap-3">
              {MOODS.map(m => (
                <button key={m.label} onClick={() => setForm({ ...form, mood: m.emoji })}
                  className={`flex flex-col items-center p-3 rounded-lg transition-all ${form.mood === m.emoji ? 'bg-purple-100 dark:bg-purple-900/30 ring-2 ring-purple-400 scale-110' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                  <span className="text-2xl">{m.emoji}</span>
                  <span className="text-xs text-gray-500 mt-1">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">What did I learn today?</label>
              <Textarea value={form.learned} onChange={e => setForm({ ...form, learned: e.target.value })} placeholder="Today I learned..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">What was confusing?</label>
              <Textarea value={form.confusing} onChange={e => setForm({ ...form, confusing: e.target.value })} placeholder="I found it hard to understand..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tomorrow&apos;s plan?</label>
              <Textarea value={form.plan} onChange={e => setForm({ ...form, plan: e.target.value })} placeholder="Tomorrow I will..." />
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={save}>Save Entry</Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {entries.length === 0 ? (
            <Card className="text-center py-8"><p className="text-gray-400">No journal entries yet. Start writing today!</p></Card>
          ) : selectedDate && viewEntry ? (
            <Card>
              <button onClick={() => setSelectedDate(null)} className="text-sm text-purple-500 hover:text-purple-700 mb-4">&larr; Back to all entries</button>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">
                {new Date(viewEntry.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
              {viewEntry.mood && <p className="text-2xl mb-4">{viewEntry.mood}</p>}
              {viewEntry.learned && <div className="mb-4"><h4 className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">What I learned</h4><p className="text-gray-700 dark:text-gray-300 text-sm">{viewEntry.learned}</p></div>}
              {viewEntry.confusing && <div className="mb-4"><h4 className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-1">What was confusing</h4><p className="text-gray-700 dark:text-gray-300 text-sm">{viewEntry.confusing}</p></div>}
              {viewEntry.plan && <div><h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Tomorrow&apos;s plan</h4><p className="text-gray-700 dark:text-gray-300 text-sm">{viewEntry.plan}</p></div>}
            </Card>
          ) : (
            entries.map(e => (
              <Card key={e.date} hover className="cursor-pointer" onClick={() => setSelectedDate(e.date)}>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {new Date(e.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                    {e.learned && <p className="text-sm text-gray-500 mt-1 line-clamp-1">{e.learned}</p>}
                  </div>
                  <span className="text-xl">{e.mood}</span>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
