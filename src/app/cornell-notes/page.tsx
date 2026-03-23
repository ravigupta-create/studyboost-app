'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface CornellNote {
  id: string;
  title: string;
  cues: string;
  notes: string;
  summary: string;
  createdAt: string;
}

export default function CornellNotesPage() {
  const [notesets, setNotesets] = useState<CornellNote[]>([]);
  const [current, setCurrent] = useState<CornellNote | null>(null);
  const [title, setTitle] = useState('');

  useEffect(() => { const s = localStorage.getItem('sb-cornell'); if (s) setNotesets(JSON.parse(s)); }, []);
  const save = (d: CornellNote[]) => { setNotesets(d); localStorage.setItem('sb-cornell', JSON.stringify(d)); };

  const createNew = () => {
    if (!title.trim()) return;
    const n: CornellNote = { id: Date.now().toString(), title: title.trim(), cues: '', notes: '', summary: '', createdAt: new Date().toISOString() };
    const updated = [n, ...notesets];
    save(updated);
    setCurrent(n);
    setTitle('');
  };

  const updateCurrent = (field: keyof CornellNote, value: string) => {
    if (!current) return;
    const updated = { ...current, [field]: value };
    setCurrent(updated);
    save(notesets.map(n => n.id === updated.id ? updated : n));
  };

  const deleteNote = (id: string) => {
    save(notesets.filter(n => n.id !== id));
    if (current?.id === id) setCurrent(null);
  };

  const exportNote = (note: CornellNote) => {
    const text = `CORNELL NOTES: ${note.title}\nDate: ${new Date(note.createdAt).toLocaleDateString()}\n\n--- CUES ---\n${note.cues}\n\n--- NOTES ---\n${note.notes}\n\n--- SUMMARY ---\n${note.summary}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${note.title.replace(/\s+/g, '_')}_cornell.txt`;
    a.click(); URL.revokeObjectURL(url);
  };

  if (current) {
    return (
      <div className="max-w-5xl mx-auto">
        <PageHeader icon="&#128221;" title="Cornell Notes" description="Structured note-taking with cue, notes, and summary sections." />
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{current.title}</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => exportNote(current)}>Export</Button>
            <Button variant="ghost" size="sm" onClick={() => setCurrent(null)}>Back</Button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-0 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="col-span-1 bg-purple-50 dark:bg-purple-900/20 p-4 border-r border-gray-200 dark:border-gray-700">
            <label className="block text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">Cue Column</label>
            <textarea
              className="w-full h-[400px] bg-transparent border-none outline-none resize-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400"
              placeholder="Key words, questions, main ideas..."
              value={current.cues}
              onChange={e => updateCurrent('cues', e.target.value)}
            />
          </div>
          <div className="col-span-2 bg-white dark:bg-gray-800 p-4">
            <label className="block text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Notes Column</label>
            <textarea
              className="w-full h-[400px] bg-transparent border-none outline-none resize-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400"
              placeholder="Detailed notes, examples, explanations..."
              value={current.notes}
              onChange={e => updateCurrent('notes', e.target.value)}
            />
          </div>
        </div>
        <div className="border border-t-0 border-gray-200 dark:border-gray-700 rounded-b-xl bg-emerald-50 dark:bg-emerald-900/20 p-4">
          <label className="block text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">Summary</label>
          <textarea
            className="w-full h-[100px] bg-transparent border-none outline-none resize-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400"
            placeholder="Summarize the main points in your own words..."
            value={current.summary}
            onChange={e => updateCurrent('summary', e.target.value)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader icon="&#128221;" title="Cornell Notes" description="Structured note-taking with cue, notes, and summary sections." />
      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-3">New Note Set</h2>
        <div className="flex gap-3">
          <Input placeholder="Note title..." value={title} onChange={e => setTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && createNew()} />
          <Button onClick={createNew} disabled={!title.trim()}>Create</Button>
        </div>
      </Card>
      <Card>
        <h2 className="text-lg font-semibold mb-3">Your Notes ({notesets.length})</h2>
        {notesets.length === 0 ? (
          <p className="text-gray-500 text-sm">No notes yet. Create your first set above.</p>
        ) : (
          <div className="space-y-2">
            {notesets.map(n => (
              <div key={n.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setCurrent(n)}>
                <div>
                  <p className="font-medium">{n.title}</p>
                  <p className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); exportNote(n); }}>Export</Button>
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); deleteNote(n.id); }}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
