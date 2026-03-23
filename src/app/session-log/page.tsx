'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

interface Session {
  id: string;
  subject: string;
  duration: number;
  technique: string;
  energy: number;
  effectiveness: number;
  notes: string;
  date: string;
}

const TECHNIQUES = ['Flashcards', 'Practice Problems', 'Reading', 'Note-taking', 'Video', 'Discussion', 'Other'];

function Stars({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(s => (
          <button key={s} onClick={() => onChange(s)}
            className={`text-xl transition-colors ${s <= value ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}>
            &#9733;
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SessionLogPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const [technique, setTechnique] = useState(TECHNIQUES[0]);
  const [energy, setEnergy] = useState(3);
  const [effectiveness, setEffectiveness] = useState(3);
  const [notes, setNotes] = useState('');

  useEffect(() => { const s = localStorage.getItem('sb-sessions'); if (s) setSessions(JSON.parse(s)); }, []);
  const save = (d: Session[]) => { setSessions(d); localStorage.setItem('sb-sessions', JSON.stringify(d)); };

  const addSession = () => {
    if (!subject.trim() || !duration) return;
    const s: Session = { id: Date.now().toString(), subject: subject.trim(), duration: parseInt(duration), technique, energy, effectiveness, notes: notes.trim(), date: new Date().toISOString() };
    save([s, ...sessions]);
    setSubject(''); setDuration(''); setNotes(''); setEnergy(3); setEffectiveness(3);
  };

  const deleteSession = (id: string) => save(sessions.filter(s => s.id !== id));

  const totalMinutes = sessions.reduce((a, s) => a + s.duration, 0);
  const totalHours = Math.round(totalMinutes / 60 * 10) / 10;
  const avgEffectiveness = sessions.length > 0 ? (sessions.reduce((a, s) => a + s.effectiveness, 0) / sessions.length).toFixed(1) : '-';

  const techniqueCounts: Record<string, { count: number; totalEff: number }> = {};
  sessions.forEach(s => {
    if (!techniqueCounts[s.technique]) techniqueCounts[s.technique] = { count: 0, totalEff: 0 };
    techniqueCounts[s.technique].count++;
    techniqueCounts[s.technique].totalEff += s.effectiveness;
  });
  const bestTechnique = Object.entries(techniqueCounts).sort((a, b) => (b[1].totalEff / b[1].count) - (a[1].totalEff / a[1].count))[0];

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader icon="&#128214;" title="Session Log" description="Log study sessions and track time, techniques, and effectiveness." />

      {sessions.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="text-center py-3">
            <p className="text-2xl font-bold text-purple-600">{totalHours}h</p>
            <p className="text-xs text-gray-500">Total Study Time</p>
          </Card>
          <Card className="text-center py-3">
            <p className="text-2xl font-bold text-blue-600">{sessions.length}</p>
            <p className="text-xs text-gray-500">Sessions</p>
          </Card>
          <Card className="text-center py-3">
            <p className="text-2xl font-bold text-yellow-600">{avgEffectiveness}</p>
            <p className="text-xs text-gray-500">Avg Effectiveness</p>
          </Card>
          <Card className="text-center py-3">
            <p className="text-lg font-bold text-emerald-600">{bestTechnique?.[0] || '-'}</p>
            <p className="text-xs text-gray-500">Best Technique</p>
          </Card>
        </div>
      )}

      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Log Study Session</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <Input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
          <Input type="number" placeholder="Duration (minutes)" value={duration} onChange={e => setDuration(e.target.value)} min="1" />
          <Select value={technique} onChange={e => setTechnique(e.target.value)}>
            {TECHNIQUES.map(t => <option key={t} value={t}>{t}</option>)}
          </Select>
        </div>
        <div className="flex gap-8 mb-3">
          <Stars value={energy} onChange={setEnergy} label="Energy Level" />
          <Stars value={effectiveness} onChange={setEffectiveness} label="Effectiveness" />
        </div>
        <Textarea placeholder="Notes (optional)" value={notes} onChange={e => setNotes(e.target.value)} className="min-h-[60px] mb-3" />
        <Button onClick={addSession} disabled={!subject.trim() || !duration}>Log Session</Button>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-3">Session History</h2>
        {sessions.length === 0 ? (
          <p className="text-gray-500 text-sm">No sessions logged yet.</p>
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {sessions.map(s => (
              <div key={s.id} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{s.subject}</span>
                    <span className="text-sm text-gray-500">{s.duration} min</span>
                    <span className="px-2 py-0.5 rounded text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">{s.technique}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">{new Date(s.date).toLocaleDateString()}</span>
                    <button onClick={() => deleteSession(s.id)} className="text-red-400 hover:text-red-600 text-xs">Delete</button>
                  </div>
                </div>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>Energy: {'&#9733;'.repeat(s.energy)}{'&#9734;'.repeat(5 - s.energy)}</span>
                  <span>Effectiveness: {'&#9733;'.repeat(s.effectiveness)}{'&#9734;'.repeat(5 - s.effectiveness)}</span>
                </div>
                {s.notes && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{s.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
