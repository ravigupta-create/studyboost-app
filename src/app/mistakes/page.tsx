'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';

interface Mistake {
  id: string;
  subject: string;
  topic: string;
  type: 'careless' | 'conceptual' | 'procedural' | 'reading';
  description: string;
  date: string;
}

const ERROR_TYPES = ['careless', 'conceptual', 'procedural', 'reading'] as const;
const TYPE_COLORS: Record<string, string> = {
  careless: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  conceptual: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  procedural: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  reading: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
};

export default function MistakesPage() {
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [type, setType] = useState<Mistake['type']>('careless');
  const [description, setDescription] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => { const s = localStorage.getItem('sb-mistakes'); if (s) setMistakes(JSON.parse(s)); }, []);
  const save = (d: Mistake[]) => { setMistakes(d); localStorage.setItem('sb-mistakes', JSON.stringify(d)); };

  const addMistake = () => {
    if (!subject.trim() || !description.trim()) return;
    const m: Mistake = { id: Date.now().toString(), subject: subject.trim(), topic: topic.trim(), type, description: description.trim(), date: new Date().toISOString().split('T')[0] };
    save([m, ...mistakes]);
    setSubject(''); setTopic(''); setDescription('');
  };

  const deleteMistake = (id: string) => save(mistakes.filter(m => m.id !== id));

  const subjects = [...new Set(mistakes.map(m => m.subject))];
  const filtered = mistakes.filter(m => (!filterSubject || m.subject === filterSubject) && (!filterType || m.type === filterType));

  const typeCounts = ERROR_TYPES.map(t => ({ type: t, count: mistakes.filter(m => m.type === t).length })).sort((a, b) => b.count - a.count);
  const subjectCounts = subjects.map(s => ({ subject: s, count: mistakes.filter(m => m.subject === s).length })).sort((a, b) => b.count - a.count);
  const mostCommonType = typeCounts[0];
  const mostErrorSubject = subjectCounts[0];

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader icon="&#128221;" title="Mistake Logger" description="Track and analyze your mistakes to identify patterns and improve." />

      {mistakes.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="text-center py-3">
            <p className="text-2xl font-bold text-purple-600">{mistakes.length}</p>
            <p className="text-xs text-gray-500">Total Mistakes</p>
          </Card>
          <Card className="text-center py-3">
            <p className="text-lg font-bold text-red-600 capitalize">{mostCommonType?.type || '-'}</p>
            <p className="text-xs text-gray-500">Most Common Type</p>
          </Card>
          <Card className="text-center py-3">
            <p className="text-lg font-bold text-orange-600">{mostErrorSubject?.subject || '-'}</p>
            <p className="text-xs text-gray-500">Most Error-Prone Subject</p>
          </Card>
          <Card className="text-center py-3">
            <p className="text-2xl font-bold text-blue-600">{subjects.length}</p>
            <p className="text-xs text-gray-500">Subjects</p>
          </Card>
        </div>
      )}

      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Log a Mistake</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <Input placeholder="Subject (e.g., Math)" value={subject} onChange={e => setSubject(e.target.value)} />
          <Input placeholder="Topic (e.g., Quadratic Equations)" value={topic} onChange={e => setTopic(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Error Type</label>
          <div className="flex gap-2 flex-wrap">
            {ERROR_TYPES.map(t => (
              <button key={t} onClick={() => setType(t)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${type === t ? 'ring-2 ring-purple-500 ' + TYPE_COLORS[t] : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <Textarea placeholder="Describe the mistake..." value={description} onChange={e => setDescription(e.target.value)} className="min-h-[80px]" />
        <Button className="mt-3" onClick={addMistake} disabled={!subject.trim() || !description.trim()}>Log Mistake</Button>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Mistake Log ({filtered.length})</h2>
          <div className="flex gap-2">
            <Select value={filterSubject} onChange={e => setFilterSubject(e.target.value)} className="w-40">
              <option value="">All Subjects</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
            <Select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-40">
              <option value="">All Types</option>
              {ERROR_TYPES.map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
            </Select>
          </div>
        </div>
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm">No mistakes logged yet.</p>
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {filtered.map(m => (
              <div key={m.id} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{m.subject}</span>
                    {m.topic && <span className="text-xs text-gray-500">- {m.topic}</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${TYPE_COLORS[m.type]}`}>{m.type}</span>
                    <span className="text-xs text-gray-400">{m.date}</span>
                    <button onClick={() => deleteMistake(m.id)} className="text-red-400 hover:text-red-600 text-xs">Delete</button>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{m.description}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
