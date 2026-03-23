'use client';

import { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface DistractionEntry {
  type: string;
  timestamp: string;
}

interface FocusSession {
  id: string;
  startTime: string;
  endTime: string | null;
  distractions: DistractionEntry[];
}

const DISTRACTION_TYPES = [
  { type: 'Phone', icon: '&#128241;', color: 'bg-blue-500 hover:bg-blue-600' },
  { type: 'Social Media', icon: '&#128242;', color: 'bg-pink-500 hover:bg-pink-600' },
  { type: 'Noise', icon: '&#128266;', color: 'bg-yellow-500 hover:bg-yellow-600' },
  { type: 'Daydreaming', icon: '&#128173;', color: 'bg-purple-500 hover:bg-purple-600' },
  { type: 'Hunger', icon: '&#127828;', color: 'bg-orange-500 hover:bg-orange-600' },
  { type: 'Other', icon: '&#10067;', color: 'bg-gray-500 hover:bg-gray-600' },
];

export default function FocusLogPage() {
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [active, setActive] = useState<FocusSession | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { const s = localStorage.getItem('sb-focus'); if (s) setSessions(JSON.parse(s)); }, []);
  const save = (d: FocusSession[]) => { setSessions(d); localStorage.setItem('sb-focus', JSON.stringify(d)); };

  useEffect(() => {
    if (active) {
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - new Date(active.startTime).getTime()) / 1000));
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [active]);

  const startSession = () => {
    const s: FocusSession = { id: Date.now().toString(), startTime: new Date().toISOString(), endTime: null, distractions: [] };
    setActive(s);
    setElapsed(0);
  };

  const endSession = () => {
    if (!active) return;
    const ended = { ...active, endTime: new Date().toISOString() };
    save([ended, ...sessions]);
    setActive(null);
    setElapsed(0);
  };

  const logDistraction = (type: string) => {
    if (!active) return;
    const entry: DistractionEntry = { type, timestamp: new Date().toISOString() };
    setActive({ ...active, distractions: [...active.distractions, entry] });
  };

  const deleteSession = (id: string) => save(sessions.filter(s => s.id !== id));

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const getSessionDuration = (s: FocusSession) => {
    const end = s.endTime ? new Date(s.endTime).getTime() : Date.now();
    return Math.floor((end - new Date(s.startTime).getTime()) / 1000);
  };

  const getTypeCounts = (distractions: DistractionEntry[]) => {
    const counts: Record<string, number> = {};
    distractions.forEach(d => { counts[d.type] = (counts[d.type] || 0) + 1; });
    return counts;
  };

  const allDistractions = sessions.flatMap(s => s.distractions);
  const allTypeCounts = getTypeCounts(allDistractions);
  const mostCommon = Object.entries(allTypeCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader icon="&#127919;" title="Focus Log" description="Track distractions during study sessions and identify patterns." />

      {!active ? (
        <Card className="mb-6 text-center">
          <p className="text-gray-500 mb-4">Start a study session to begin logging distractions.</p>
          <Button size="lg" onClick={startSession}>Start Focus Session</Button>
        </Card>
      ) : (
        <Card className="mb-6">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-1">Session in progress</p>
            <p className="text-4xl font-bold font-mono text-purple-600">{formatTime(elapsed)}</p>
            <p className="text-sm text-gray-500 mt-1">{active.distractions.length} distraction{active.distractions.length !== 1 ? 's' : ''} logged</p>
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center mb-3">Tap when you get distracted:</p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {DISTRACTION_TYPES.map(d => (
              <button key={d.type} onClick={() => logDistraction(d.type)}
                className={`${d.color} text-white rounded-xl p-4 text-center transition-transform active:scale-95 shadow-md`}>
                <span className="text-2xl block mb-1" dangerouslySetInnerHTML={{ __html: d.icon }} />
                <span className="text-sm font-medium">{d.type}</span>
              </button>
            ))}
          </div>
          {active.distractions.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">This Session</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(getTypeCounts(active.distractions)).map(([type, count]) => (
                  <span key={type} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                    {type}: {count}
                  </span>
                ))}
              </div>
            </div>
          )}
          <Button variant="danger" onClick={endSession} className="w-full">End Session</Button>
        </Card>
      )}

      {sessions.length > 0 && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="text-center py-3">
              <p className="text-2xl font-bold text-purple-600">{sessions.length}</p>
              <p className="text-xs text-gray-500">Total Sessions</p>
            </Card>
            <Card className="text-center py-3">
              <p className="text-2xl font-bold text-red-600">{allDistractions.length}</p>
              <p className="text-xs text-gray-500">Total Distractions</p>
            </Card>
            <Card className="text-center py-3">
              <p className="text-lg font-bold text-orange-600">{mostCommon?.[0] || '-'}</p>
              <p className="text-xs text-gray-500">Most Common</p>
            </Card>
          </div>

          <Card>
            <h2 className="text-lg font-semibold mb-3">Session History</h2>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {sessions.map(s => {
                const dur = getSessionDuration(s);
                const counts = getTypeCounts(s.distractions);
                return (
                  <div key={s.id} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{new Date(s.startTime).toLocaleDateString()}</span>
                        <span className="text-sm text-gray-500">{formatTime(dur)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${s.distractions.length === 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {s.distractions.length} distraction{s.distractions.length !== 1 ? 's' : ''}
                        </span>
                        <button onClick={() => deleteSession(s.id)} className="text-red-400 hover:text-red-600 text-xs">Delete</button>
                      </div>
                    </div>
                    {Object.keys(counts).length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(counts).map(([type, count]) => (
                          <span key={type} className="px-2 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-xs">{type}: {count}</span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
