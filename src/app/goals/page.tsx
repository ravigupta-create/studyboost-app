'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Milestone {
  id: string;
  text: string;
  completed: boolean;
}

interface Goal {
  id: string;
  title: string;
  targetDate: string;
  milestones: Milestone[];
  archived: boolean;
  createdAt: string;
  streak: number;
  lastProgressDate: string | null;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [milestoneText, setMilestoneText] = useState('');
  const [newMilestones, setNewMilestones] = useState<string[]>([]);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => { const s = localStorage.getItem('sb-goals'); if (s) setGoals(JSON.parse(s)); }, []);
  const save = (d: Goal[]) => { setGoals(d); localStorage.setItem('sb-goals', JSON.stringify(d)); };

  const addMilestoneToNew = () => {
    if (!milestoneText.trim()) return;
    setNewMilestones([...newMilestones, milestoneText.trim()]);
    setMilestoneText('');
  };

  const addGoal = () => {
    if (!title.trim() || !targetDate) return;
    const g: Goal = {
      id: Date.now().toString(), title: title.trim(), targetDate, archived: false, createdAt: new Date().toISOString(),
      milestones: newMilestones.map((t, i) => ({ id: `${Date.now()}-${i}`, text: t, completed: false })),
      streak: 0, lastProgressDate: null,
    };
    save([g, ...goals]);
    setTitle(''); setTargetDate(''); setNewMilestones([]);
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    const today = new Date().toISOString().split('T')[0];
    save(goals.map(g => {
      if (g.id !== goalId) return g;
      const updated = { ...g, milestones: g.milestones.map(m => m.id === milestoneId ? { ...m, completed: !m.completed } : m) };
      // Update streak
      if (g.lastProgressDate === today) return updated;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      const newStreak = g.lastProgressDate === yesterdayStr ? g.streak + 1 : 1;
      return { ...updated, streak: newStreak, lastProgressDate: today };
    }));
  };

  const archiveGoal = (id: string) => save(goals.map(g => g.id === id ? { ...g, archived: true } : g));
  const deleteGoal = (id: string) => save(goals.filter(g => g.id !== id));

  const active = goals.filter(g => !g.archived);
  const archived = goals.filter(g => g.archived);
  const displayed = showArchived ? archived : active;

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader icon="&#127919;" title="SMART Goals" description="Create goals with milestones, track progress, and build streaks." />

      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Create New Goal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <Input placeholder="Goal title" value={title} onChange={e => setTitle(e.target.value)} />
          <Input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Milestones</label>
          <div className="flex gap-2 mb-2">
            <Input placeholder="Add a milestone..." value={milestoneText} onChange={e => setMilestoneText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addMilestoneToNew()} />
            <Button variant="secondary" onClick={addMilestoneToNew} disabled={!milestoneText.trim()}>Add</Button>
          </div>
          {newMilestones.length > 0 && (
            <div className="space-y-1">
              {newMilestones.map((m, i) => (
                <div key={i} className="flex items-center gap-2 text-sm p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                  <span className="text-gray-400">{i + 1}.</span>
                  <span className="flex-1">{m}</span>
                  <button onClick={() => setNewMilestones(newMilestones.filter((_, idx) => idx !== i))} className="text-red-400 text-xs">Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>
        <Button onClick={addGoal} disabled={!title.trim() || !targetDate}>Create Goal</Button>
      </Card>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setShowArchived(false)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${!showArchived ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
          Active ({active.length})
        </button>
        <button onClick={() => setShowArchived(true)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${showArchived ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
          Archived ({archived.length})
        </button>
      </div>

      {displayed.length === 0 ? (
        <Card><p className="text-gray-500 text-sm text-center">No {showArchived ? 'archived' : 'active'} goals.</p></Card>
      ) : (
        <div className="space-y-4">
          {displayed.map(g => {
            const completed = g.milestones.filter(m => m.completed).length;
            const total = g.milestones.length;
            const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
            return (
              <Card key={g.id}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{g.title}</h3>
                    <p className="text-xs text-gray-500">Target: {new Date(g.targetDate + 'T00:00:00').toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {g.streak > 0 && (
                      <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded text-xs font-bold">
                        {g.streak} day streak
                      </span>
                    )}
                    {!g.archived && <Button variant="ghost" size="sm" onClick={() => archiveGoal(g.id)}>Archive</Button>}
                    <button onClick={() => deleteGoal(g.id)} className="text-red-400 hover:text-red-600">&times;</button>
                  </div>
                </div>
                {total > 0 && (
                  <>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                        <div className="bg-purple-600 h-3 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">{progress}%</span>
                    </div>
                    <div className="space-y-1">
                      {g.milestones.map(m => (
                        <label key={m.id} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                          <input type="checkbox" checked={m.completed} onChange={() => toggleMilestone(g.id, m.id)}
                            className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                          <span className={`text-sm ${m.completed ? 'line-through text-gray-400' : ''}`}>{m.text}</span>
                        </label>
                      ))}
                    </div>
                  </>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
