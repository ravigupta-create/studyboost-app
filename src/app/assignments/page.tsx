'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'done';
  description: string;
}

const PRIORITY_COLORS: Record<string, string> = {
  high: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  low: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
};
const STATUS_COLORS: Record<string, string> = {
  'todo': 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
  'in-progress': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  'done': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
};

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Assignment['priority']>('medium');
  const [description, setDescription] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  useEffect(() => { const s = localStorage.getItem('sb-assignments'); if (s) setAssignments(JSON.parse(s)); }, []);
  const save = (d: Assignment[]) => { setAssignments(d); localStorage.setItem('sb-assignments', JSON.stringify(d)); };

  const addAssignment = () => {
    if (!title.trim() || !dueDate) return;
    const a: Assignment = { id: Date.now().toString(), title: title.trim(), subject: subject.trim(), dueDate, priority, status: 'todo', description: description.trim() };
    save([...assignments, a]);
    setTitle(''); setSubject(''); setDueDate(''); setDescription('');
  };

  const updateStatus = (id: string, status: Assignment['status']) => {
    save(assignments.map(a => a.id === id ? { ...a, status } : a));
  };

  const deleteAssignment = (id: string) => save(assignments.filter(a => a.id !== id));

  const today = new Date().toISOString().split('T')[0];
  const isOverdue = (a: Assignment) => a.dueDate < today && a.status !== 'done';

  const filtered = assignments
    .filter(a => (!filterStatus || a.status === filterStatus) && (!filterPriority || a.priority === filterPriority))
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader icon="&#128203;" title="Assignment Tracker" description="Track assignments with priorities, due dates, and completion status." />

      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Add Assignment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <Input placeholder="Assignment title" value={title} onChange={e => setTitle(e.target.value)} />
          <Input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
          <Input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          <Select value={priority} onChange={e => setPriority(e.target.value as Assignment['priority'])}>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </Select>
        </div>
        <Textarea placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} className="min-h-[60px] mb-3" />
        <Button onClick={addAssignment} disabled={!title.trim() || !dueDate}>Add Assignment</Button>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-lg font-semibold">Assignments ({filtered.length})</h2>
          <div className="flex gap-2">
            <Select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="w-36">
              <option value="">All Status</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </Select>
            <Select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} className="w-36">
              <option value="">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Select>
          </div>
        </div>
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm">No assignments found.</p>
        ) : (
          <div className="space-y-3">
            {filtered.map(a => (
              <div key={a.id} className={`p-4 rounded-lg border ${isOverdue(a) ? 'border-red-400 bg-red-50/50 dark:bg-red-900/10' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${a.status === 'done' ? 'line-through text-gray-400' : ''}`}>{a.title}</h3>
                      {isOverdue(a) && <span className="text-xs font-bold text-red-600">OVERDUE</span>}
                    </div>
                    {a.subject && <p className="text-xs text-gray-500">{a.subject}</p>}
                    {a.description && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{a.description}</p>}
                  </div>
                  <button onClick={() => deleteAssignment(a.id)} className="text-red-400 hover:text-red-600">&times;</button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${PRIORITY_COLORS[a.priority]}`}>{a.priority}</span>
                    <span className="text-xs text-gray-400">Due: {new Date(a.dueDate + 'T00:00:00').toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-1">
                    {(['todo', 'in-progress', 'done'] as const).map(s => (
                      <button key={s} onClick={() => updateStatus(a.id, s)}
                        className={`px-2 py-0.5 rounded text-xs font-medium capitalize transition-colors ${a.status === s ? STATUS_COLORS[s] + ' ring-1 ring-current' : 'text-gray-400 hover:text-gray-600'}`}>
                        {s === 'in-progress' ? 'In Progress' : s === 'todo' ? 'To Do' : 'Done'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
