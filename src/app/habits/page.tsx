'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface Habit {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly';
  checkins: string[]; // ISO date strings
  createdAt: string;
}

function getDateStr(d: Date): string {
  return d.toISOString().split('T')[0];
}

function getDaysBetween(start: string, end: string): string[] {
  const days: string[] = [];
  const s = new Date(start + 'T00:00:00');
  const e = new Date(end + 'T00:00:00');
  while (s <= e) {
    days.push(getDateStr(s));
    s.setDate(s.getDate() + 1);
  }
  return days;
}

function getStreak(checkins: string[]): number {
  if (checkins.length === 0) return 0;
  const sorted = [...new Set(checkins)].sort().reverse();
  const today = getDateStr(new Date());
  const yesterday = getDateStr(new Date(Date.now() - 86400000));
  if (sorted[0] !== today && sorted[0] !== yesterday) return 0;
  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1] + 'T00:00:00');
    const curr = new Date(sorted[i] + 'T00:00:00');
    const diff = (prev.getTime() - curr.getTime()) / 86400000;
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');

  useEffect(() => { const s = localStorage.getItem('sb-habits'); if (s) setHabits(JSON.parse(s)); }, []);
  const save = (d: Habit[]) => { setHabits(d); localStorage.setItem('sb-habits', JSON.stringify(d)); };

  const addHabit = () => {
    if (!name.trim()) return;
    const h: Habit = { id: Date.now().toString(), name: name.trim(), frequency, checkins: [], createdAt: new Date().toISOString() };
    save([...habits, h]);
    setName('');
  };

  const toggleCheckin = (habitId: string, date: string) => {
    save(habits.map(h => {
      if (h.id !== habitId) return h;
      const has = h.checkins.includes(date);
      return { ...h, checkins: has ? h.checkins.filter(d => d !== date) : [...h.checkins, date] };
    }));
  };

  const deleteHabit = (id: string) => save(habits.filter(h => h.id !== id));

  const today = getDateStr(new Date());
  const ninetyDaysAgo = getDateStr(new Date(Date.now() - 90 * 86400000));
  const last90Days = getDaysBetween(ninetyDaysAgo, today);

  // Group by week for heatmap display
  const weeks: string[][] = [];
  let currentWeek: string[] = [];
  const startDay = new Date(ninetyDaysAgo + 'T00:00:00').getDay();
  // Pad start
  for (let i = 0; i < startDay; i++) currentWeek.push('');
  last90Days.forEach(d => {
    currentWeek.push(d);
    if (currentWeek.length === 7) { weeks.push(currentWeek); currentWeek = []; }
  });
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push('');
    weeks.push(currentWeek);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader icon="&#9989;" title="Habit Tracker" description="Track daily and weekly habits with streaks and heatmap visualization." />

      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Add Habit</h2>
        <div className="flex gap-3">
          <Input placeholder="Habit name" value={name} onChange={e => setName(e.target.value)} className="flex-1"
            onKeyDown={e => e.key === 'Enter' && addHabit()} />
          <Select value={frequency} onChange={e => setFrequency(e.target.value as 'daily' | 'weekly')} className="w-32">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </Select>
          <Button onClick={addHabit} disabled={!name.trim()}>Add</Button>
        </div>
      </Card>

      {habits.length === 0 ? (
        <Card><p className="text-gray-500 text-center text-sm">No habits yet. Add your first habit above.</p></Card>
      ) : (
        <div className="space-y-6">
          {/* Today's check-in */}
          <Card>
            <h2 className="text-lg font-semibold mb-3">Today&apos;s Check-in</h2>
            <div className="space-y-2">
              {habits.map(h => {
                const checkedToday = h.checkins.includes(today);
                const streak = getStreak(h.checkins);
                return (
                  <div key={h.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggleCheckin(h.id, today)}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${checkedToday ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                        {checkedToday && <span className="text-sm">&#10003;</span>}
                      </button>
                      <span className={`font-medium ${checkedToday ? 'text-emerald-600' : ''}`}>{h.name}</span>
                      <span className="text-xs text-gray-400 capitalize">{h.frequency}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {streak > 0 && (
                        <span className="text-xs font-bold text-orange-500">{streak} day streak</span>
                      )}
                      <button onClick={() => deleteHabit(h.id)} className="text-red-400 hover:text-red-600 text-xs">Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Heatmap */}
          {habits.map(h => {
            const checkinSet = new Set(h.checkins);
            return (
              <Card key={h.id}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{h.name}</h3>
                  <span className="text-sm text-gray-500">{h.checkins.length} total check-ins</span>
                </div>
                <div className="overflow-x-auto">
                  <div className="flex gap-[3px] min-w-[600px]">
                    {weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-[3px]">
                        {week.map((day, di) => {
                          if (!day) return <div key={di} className="w-3 h-3" />;
                          const checked = checkinSet.has(day);
                          const isToday = day === today;
                          return (
                            <div key={di} title={`${day}${checked ? ' - Done' : ''}`}
                              onClick={() => toggleCheckin(h.id, day)}
                              className={`w-3 h-3 rounded-sm cursor-pointer transition-colors ${
                                checked ? 'bg-emerald-500' : isToday ? 'bg-purple-200 dark:bg-purple-800' : 'bg-gray-200 dark:bg-gray-700'
                              } hover:ring-1 hover:ring-purple-400`} />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <span>Less</span>
                    <div className="w-3 h-3 rounded-sm bg-gray-200 dark:bg-gray-700" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-300" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-500" />
                    <span>More</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
