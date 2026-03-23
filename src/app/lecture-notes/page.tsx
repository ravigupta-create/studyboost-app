'use client';

import { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Note {
  timestamp: number;
  text: string;
}

interface Session {
  id: string;
  title: string;
  notes: Note[];
  createdAt: string;
}

const LS_KEY = 'sb-lecture-notes';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function LectureNotesPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [view, setView] = useState<'active' | 'browse'>('active');
  const [sessionTitle, setSessionTitle] = useState('');
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { const s = localStorage.getItem(LS_KEY); if (s) setSessions(JSON.parse(s)); }, []);
  const save = (s: Session[]) => { setSessions(s); localStorage.setItem(LS_KEY, JSON.stringify(s)); };

  const startSession = () => {
    const session: Session = { id: Date.now().toString(), title: sessionTitle || `Lecture ${sessions.length + 1}`, notes: [], createdAt: new Date().toISOString() };
    setActiveSession(session);
    setElapsed(0);
    setRunning(true);
    setSessionTitle('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
      return () => clearInterval(timerRef.current);
    } else {
      clearInterval(timerRef.current);
    }
  }, [running]);

  const addNote = () => {
    if (!noteText.trim() || !activeSession) return;
    const note: Note = { timestamp: elapsed, text: noteText.trim() };
    setActiveSession({ ...activeSession, notes: [...activeSession.notes, note] });
    setNoteText('');
    inputRef.current?.focus();
  };

  const endSession = () => {
    if (!activeSession) return;
    setRunning(false);
    save([...sessions, activeSession]);
    setActiveSession(null);
    setElapsed(0);
  };

  const deleteSession = (id: string) => save(sessions.filter(s => s.id !== id));

  const exportSession = (session: Session) => {
    const text = `${session.title}\n${new Date(session.createdAt).toLocaleDateString()}\n\n${session.notes.map(n => `[${formatTime(n.timestamp)}] ${n.text}`).join('\n')}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${session.title}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="\u{1F3A4}" title="Lecture Notes" description="Take timestamped notes during lectures with a built-in timer." />

      <div className="flex gap-2 mb-6">
        <Button variant={view === 'active' ? 'primary' : 'secondary'} onClick={() => setView('active')}>
          {activeSession ? 'Current Session' : 'New Session'}
        </Button>
        <Button variant={view === 'browse' ? 'primary' : 'secondary'} onClick={() => setView('browse')}>
          Past Sessions ({sessions.length})
        </Button>
      </div>

      {view === 'active' ? (
        activeSession ? (
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{activeSession.title}</h2>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-mono font-bold text-purple-600">{formatTime(elapsed)}</span>
                <Button size="sm" variant="secondary" onClick={() => setRunning(!running)}>
                  {running ? 'Pause' : 'Resume'}
                </Button>
                <Button size="sm" variant="danger" onClick={endSession}>End</Button>
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              <Input ref={inputRef} placeholder="Type a note and press Enter..." value={noteText}
                onChange={e => setNoteText(e.target.value)} onKeyDown={e => e.key === 'Enter' && addNote()} />
              <Button onClick={addNote}>Add</Button>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {activeSession.notes.map((n, i) => (
                <div key={i} className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <span className="text-xs font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded h-fit whitespace-nowrap">
                    {formatTime(n.timestamp)}
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{n.text}</span>
                </div>
              ))}
              {activeSession.notes.length === 0 && <p className="text-sm text-gray-400 text-center py-4">Start typing notes...</p>}
            </div>
          </Card>
        ) : (
          <Card>
            <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">Start a New Session</h2>
            <Input placeholder="Session title (optional)" value={sessionTitle}
              onChange={e => setSessionTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && startSession()} className="mb-4" />
            <Button onClick={startSession}>Start Timer & Begin</Button>
          </Card>
        )
      ) : (
        <div className="space-y-3">
          {sessions.length === 0 ? (
            <Card className="text-center py-8"><p className="text-gray-400">No past sessions yet.</p></Card>
          ) : (
            sessions.slice().reverse().map(s => (
              <Card key={s.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{s.title}</h3>
                    <p className="text-xs text-gray-500">{new Date(s.createdAt).toLocaleDateString()} - {s.notes.length} notes</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => exportSession(s)} className="text-sm text-purple-500 hover:text-purple-700">Export</button>
                    <button onClick={() => deleteSession(s.id)} className="text-sm text-red-400 hover:text-red-600">Delete</button>
                  </div>
                </div>
                <div className="space-y-1 max-h-[200px] overflow-y-auto">
                  {s.notes.map((n, i) => (
                    <div key={i} className="flex gap-2 text-sm">
                      <span className="text-purple-600 dark:text-purple-400 font-mono text-xs">[{formatTime(n.timestamp)}]</span>
                      <span className="text-gray-600 dark:text-gray-400">{n.text}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
