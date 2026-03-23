'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

interface Activity {
  id: string;
  name: string;
  category: string;
  role: string;
  hoursPerWeek: number;
  years: number;
  description: string;
  achievements: string;
}

const CATEGORIES = ['Academic', 'Athletic', 'Arts', 'Community', 'Work'];
const LS_KEY = 'sb-extracurriculars';

export default function ExtracurricularsPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Activity, 'id'>>({ name: '', category: 'Academic', role: '', hoursPerWeek: 0, years: 0, description: '', achievements: '' });

  useEffect(() => { const s = localStorage.getItem(LS_KEY); if (s) setActivities(JSON.parse(s)); }, []);
  useEffect(() => { if (activities.length > 0 || localStorage.getItem(LS_KEY)) localStorage.setItem(LS_KEY, JSON.stringify(activities)); }, [activities]);

  const resetForm = () => { setForm({ name: '', category: 'Academic', role: '', hoursPerWeek: 0, years: 0, description: '', achievements: '' }); setEditId(null); setShowForm(false); };

  const saveActivity = () => {
    if (!form.name.trim()) return;
    if (editId) {
      setActivities(activities.map(a => a.id === editId ? { ...form, id: editId } : a));
    } else {
      setActivities([...activities, { ...form, id: Date.now().toString() }]);
    }
    resetForm();
  };

  const editActivity = (a: Activity) => {
    setForm({ name: a.name, category: a.category, role: a.role, hoursPerWeek: a.hoursPerWeek, years: a.years, description: a.description, achievements: a.achievements });
    setEditId(a.id); setShowForm(true);
  };

  const deleteActivity = (id: string) => setActivities(activities.filter(a => a.id !== id));

  const totalHours = activities.reduce((s, a) => s + a.hoursPerWeek * a.years * 40, 0);
  const catColors: Record<string, string> = {
    'Academic': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    'Athletic': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    'Arts': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    'Community': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
    'Work': 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <PageHeader icon="\u{1F3C5}" title="Extracurriculars Tracker" description="Track your activities, roles, hours, and achievements." />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="text-center"><div className="text-2xl font-bold text-purple-600">{activities.length}</div><div className="text-xs text-gray-500">Activities</div></Card>
        <Card className="text-center"><div className="text-2xl font-bold text-blue-600">{activities.reduce((s, a) => s + a.hoursPerWeek, 0)}</div><div className="text-xs text-gray-500">Hours/Week</div></Card>
        <Card className="text-center"><div className="text-2xl font-bold text-green-600">{totalHours.toLocaleString()}</div><div className="text-xs text-gray-500">Est. Total Hours</div></Card>
      </div>

      <div className="flex justify-end mb-4">
        <Button onClick={() => { resetForm(); setShowForm(true); }}>+ Add Activity</Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">{editId ? 'Edit' : 'Add'} Activity</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <Input placeholder="Activity Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <Select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </Select>
            <Input placeholder="Your Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
            <Input type="number" placeholder="Hours/Week" value={form.hoursPerWeek || ''} onChange={e => setForm({ ...form, hoursPerWeek: parseFloat(e.target.value) || 0 })} />
            <Input type="number" placeholder="Years" value={form.years || ''} onChange={e => setForm({ ...form, years: parseFloat(e.target.value) || 0 })} />
          </div>
          <Textarea placeholder="Description..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="mb-3" />
          <Textarea placeholder="Key achievements..." value={form.achievements} onChange={e => setForm({ ...form, achievements: e.target.value })} className="mb-3" />
          <div className="flex gap-2">
            <Button onClick={saveActivity}>{editId ? 'Update' : 'Add'}</Button>
            <Button variant="secondary" onClick={resetForm}>Cancel</Button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {activities.map(a => (
          <Card key={a.id} hover>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{a.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${catColors[a.category]}`}>{a.category}</span>
                </div>
                {a.role && <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">{a.role}</p>}
                <p className="text-xs text-gray-500 mt-1">{a.hoursPerWeek} hrs/week | {a.years} year{a.years !== 1 ? 's' : ''}</p>
                {a.description && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{a.description}</p>}
                {a.achievements && <p className="text-sm text-green-600 dark:text-green-400 mt-1">{a.achievements}</p>}
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => editActivity(a)} className="text-sm text-purple-500 hover:text-purple-700">Edit</button>
                <button onClick={() => deleteActivity(a.id)} className="text-sm text-red-400 hover:text-red-600">Delete</button>
              </div>
            </div>
          </Card>
        ))}
        {activities.length === 0 && <Card className="text-center py-8"><p className="text-gray-400">No activities yet. Add your first one!</p></Card>}
      </div>
    </div>
  );
}
