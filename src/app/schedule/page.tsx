'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Block {
  id: string;
  day: number;
  startHour: number;
  endHour: number;
  name: string;
  teacher: string;
  room: string;
  color: string;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const HOURS = Array.from({ length: 12 }, (_, i) => i + 7); // 7am to 6pm
const COLORS = ['#8b5cf6', '#ef4444', '#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'];

function formatHour(h: number): string {
  if (h === 12) return '12 PM';
  if (h > 12) return `${h - 12} PM`;
  return `${h} AM`;
}

export default function SchedulePage() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [adding, setAdding] = useState<{ day: number; hour: number } | null>(null);
  const [name, setName] = useState('');
  const [teacher, setTeacher] = useState('');
  const [room, setRoom] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [endHour, setEndHour] = useState(8);

  useEffect(() => { const s = localStorage.getItem('sb-schedule'); if (s) setBlocks(JSON.parse(s)); }, []);
  const save = (d: Block[]) => { setBlocks(d); localStorage.setItem('sb-schedule', JSON.stringify(d)); };

  const clickCell = (day: number, hour: number) => {
    const existing = blocks.find(b => b.day === day && hour >= b.startHour && hour < b.endHour);
    if (existing) return;
    setAdding({ day, hour });
    setEndHour(hour + 1);
    setName(''); setTeacher(''); setRoom(''); setColor(COLORS[blocks.length % COLORS.length]);
  };

  const addBlock = () => {
    if (!adding || !name.trim()) return;
    const b: Block = { id: Date.now().toString(), day: adding.day, startHour: adding.hour, endHour, name: name.trim(), teacher: teacher.trim(), room: room.trim(), color };
    save([...blocks, b]);
    setAdding(null);
  };

  const deleteBlock = (id: string) => save(blocks.filter(b => b.id !== id));

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader icon="&#128197;" title="Class Schedule" description="Visual weekly class schedule with color-coded time blocks." />

      {adding && (
        <Card className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Add Class - {DAYS[adding.day]} at {formatHour(adding.hour)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <Input placeholder="Class name" value={name} onChange={e => setName(e.target.value)} />
            <Input placeholder="Teacher" value={teacher} onChange={e => setTeacher(e.target.value)} />
            <Input placeholder="Room" value={room} onChange={e => setRoom(e.target.value)} />
          </div>
          <div className="flex items-center gap-4 mb-3">
            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <select value={endHour} onChange={e => setEndHour(Number(e.target.value))}
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm">
                {HOURS.filter(h => h > adding.hour).map(h => (
                  <option key={h} value={h}>{formatHour(h)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <div className="flex gap-1">
                {COLORS.map(c => (
                  <button key={c} onClick={() => setColor(c)}
                    className={`w-7 h-7 rounded-full transition-transform ${color === c ? 'ring-2 ring-offset-2 ring-purple-500 scale-110' : ''}`}
                    style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={addBlock} disabled={!name.trim()}>Add Block</Button>
            <Button variant="ghost" onClick={() => setAdding(null)}>Cancel</Button>
          </div>
        </Card>
      )}

      <Card className="overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Header */}
          <div className="grid grid-cols-6 gap-px bg-gray-200 dark:bg-gray-700">
            <div className="bg-white dark:bg-gray-800 p-2 text-xs font-medium text-gray-500">Time</div>
            {DAYS.map(d => (
              <div key={d} className="bg-white dark:bg-gray-800 p-2 text-sm font-semibold text-center">{d}</div>
            ))}
          </div>
          {/* Grid */}
          {HOURS.map(hour => (
            <div key={hour} className="grid grid-cols-6 gap-px bg-gray-200 dark:bg-gray-700">
              <div className="bg-white dark:bg-gray-800 p-2 text-xs text-gray-500 font-mono">{formatHour(hour)}</div>
              {DAYS.map((_, dayIdx) => {
                const block = blocks.find(b => b.day === dayIdx && hour >= b.startHour && hour < b.endHour);
                const isStart = block && block.startHour === hour;
                const isMiddle = block && !isStart;

                if (isMiddle) return null; // Already rendered by the start cell

                if (isStart && block) {
                  const span = block.endHour - block.startHour;
                  return (
                    <div key={dayIdx} className="relative group"
                      style={{ gridRow: `span 1`, backgroundColor: block.color + '20', borderLeft: `3px solid ${block.color}` }}>
                      <div className="p-2" style={{ minHeight: `${span * 48}px` }}>
                        <p className="text-sm font-bold" style={{ color: block.color }}>{block.name}</p>
                        {block.teacher && <p className="text-xs text-gray-500">{block.teacher}</p>}
                        {block.room && <p className="text-xs text-gray-400">{block.room}</p>}
                      </div>
                      <button onClick={() => deleteBlock(block.id)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">&times;</button>
                    </div>
                  );
                }

                return (
                  <div key={dayIdx} className="bg-white dark:bg-gray-800 p-2 min-h-[48px] cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors"
                    onClick={() => clickCell(dayIdx, hour)}>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
