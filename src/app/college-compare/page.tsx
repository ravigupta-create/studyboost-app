'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface College {
  id: string;
  name: string;
  location: string;
  tuition: number;
  enrollment: number;
  acceptanceRate: number;
  programs: string;
  pros: string;
  cons: string;
  rank: number;
  notes: string;
}

const LS_KEY = 'sb-college-compare';

export default function CollegeComparePage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [view, setView] = useState<'list' | 'compare'>('list');
  const [form, setForm] = useState({ name: '', location: '', tuition: '', enrollment: '', acceptanceRate: '', programs: '', pros: '', cons: '', rank: '', notes: '' });

  useEffect(() => { const s = localStorage.getItem(LS_KEY); if (s) setColleges(JSON.parse(s)); }, []);
  useEffect(() => { if (colleges.length > 0 || localStorage.getItem(LS_KEY)) localStorage.setItem(LS_KEY, JSON.stringify(colleges)); }, [colleges]);

  const resetForm = () => { setForm({ name: '', location: '', tuition: '', enrollment: '', acceptanceRate: '', programs: '', pros: '', cons: '', rank: '', notes: '' }); setEditId(null); setShowForm(false); };

  const saveCollege = () => {
    if (!form.name.trim()) return;
    const c: College = {
      id: editId || Date.now().toString(), name: form.name.trim(), location: form.location, tuition: parseInt(form.tuition) || 0,
      enrollment: parseInt(form.enrollment) || 0, acceptanceRate: parseFloat(form.acceptanceRate) || 0,
      programs: form.programs, pros: form.pros, cons: form.cons, rank: parseInt(form.rank) || 0, notes: form.notes,
    };
    if (editId) setColleges(colleges.map(x => x.id === editId ? c : x));
    else setColleges([...colleges, c]);
    resetForm();
  };

  const editCollege = (c: College) => {
    setForm({ name: c.name, location: c.location, tuition: c.tuition.toString(), enrollment: c.enrollment.toString(), acceptanceRate: c.acceptanceRate.toString(), programs: c.programs, pros: c.pros, cons: c.cons, rank: c.rank.toString(), notes: c.notes });
    setEditId(c.id); setShowForm(true);
  };

  const deleteCollege = (id: string) => {
    setColleges(colleges.filter(c => c.id !== id));
    setCompareIds(compareIds.filter(x => x !== id));
  };

  const toggleCompare = (id: string) => {
    if (compareIds.includes(id)) setCompareIds(compareIds.filter(x => x !== id));
    else if (compareIds.length < 4) setCompareIds([...compareIds, id]);
  };

  const compared = colleges.filter(c => compareIds.includes(c.id));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <PageHeader icon="\u{1F3EB}" title="College Compare" description="Compare colleges side-by-side with key stats and personal rankings." />

      <div className="flex gap-2 mb-6">
        <Button variant={view === 'list' ? 'primary' : 'secondary'} onClick={() => setView('list')}>My Colleges</Button>
        <Button variant={view === 'compare' ? 'primary' : 'secondary'} onClick={() => setView('compare')} disabled={compareIds.length < 2}>
          Compare ({compareIds.length}/4)
        </Button>
        <Button variant="secondary" onClick={() => { resetForm(); setShowForm(true); }}>+ Add College</Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">{editId ? 'Edit' : 'Add'} College</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <Input placeholder="College Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
            <Input type="number" placeholder="Tuition ($)" value={form.tuition} onChange={e => setForm({ ...form, tuition: e.target.value })} />
            <Input type="number" placeholder="Enrollment" value={form.enrollment} onChange={e => setForm({ ...form, enrollment: e.target.value })} />
            <Input type="number" placeholder="Acceptance Rate (%)" value={form.acceptanceRate} onChange={e => setForm({ ...form, acceptanceRate: e.target.value })} />
            <Input type="number" placeholder="Your Ranking (1=top)" value={form.rank} onChange={e => setForm({ ...form, rank: e.target.value })} />
          </div>
          <Input placeholder="Programs of interest" value={form.programs} onChange={e => setForm({ ...form, programs: e.target.value })} className="mb-3" />
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Textarea placeholder="Pros..." value={form.pros} onChange={e => setForm({ ...form, pros: e.target.value })} />
            <Textarea placeholder="Cons..." value={form.cons} onChange={e => setForm({ ...form, cons: e.target.value })} />
          </div>
          <Textarea placeholder="Personal notes..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="mb-3" />
          <div className="flex gap-2">
            <Button onClick={saveCollege}>{editId ? 'Update' : 'Add'}</Button>
            <Button variant="secondary" onClick={resetForm}>Cancel</Button>
          </div>
        </Card>
      )}

      {view === 'list' ? (
        <div className="space-y-3">
          {colleges.sort((a, b) => (a.rank || 999) - (b.rank || 999)).map(c => (
            <Card key={c.id} hover>
              <div className="flex items-start gap-3">
                <label className="flex items-center mt-1">
                  <input type="checkbox" checked={compareIds.includes(c.id)} onChange={() => toggleCompare(c.id)}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                </label>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {c.rank > 0 && <span className="text-xs font-bold text-purple-600 bg-purple-100 dark:bg-purple-900/30 px-2 py-0.5 rounded-full">#{c.rank}</span>}
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{c.name}</h3>
                    <span className="text-sm text-gray-500">{c.location}</span>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-500">
                    {c.tuition > 0 && <span>${c.tuition.toLocaleString()}/yr</span>}
                    {c.enrollment > 0 && <span>{c.enrollment.toLocaleString()} students</span>}
                    {c.acceptanceRate > 0 && <span>{c.acceptanceRate}% acceptance</span>}
                  </div>
                  {c.programs && <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">{c.programs}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => editCollege(c)} className="text-sm text-purple-500 hover:text-purple-700">Edit</button>
                  <button onClick={() => deleteCollege(c.id)} className="text-sm text-red-400 hover:text-red-600">Delete</button>
                </div>
              </div>
            </Card>
          ))}
          {colleges.length === 0 && <Card className="text-center py-8"><p className="text-gray-400">Add colleges to start comparing.</p></Card>}
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-2 text-gray-500 font-medium">Metric</th>
                  {compared.map(c => <th key={c.id} className="text-left p-2 text-gray-900 dark:text-gray-100 font-semibold">{c.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Location', get: (c: College) => c.location },
                  { label: 'Tuition', get: (c: College) => c.tuition > 0 ? `$${c.tuition.toLocaleString()}` : '-' },
                  { label: 'Enrollment', get: (c: College) => c.enrollment > 0 ? c.enrollment.toLocaleString() : '-' },
                  { label: 'Acceptance Rate', get: (c: College) => c.acceptanceRate > 0 ? `${c.acceptanceRate}%` : '-' },
                  { label: 'Programs', get: (c: College) => c.programs || '-' },
                  { label: 'Pros', get: (c: College) => c.pros || '-' },
                  { label: 'Cons', get: (c: College) => c.cons || '-' },
                  { label: 'Your Ranking', get: (c: College) => c.rank > 0 ? `#${c.rank}` : '-' },
                  { label: 'Notes', get: (c: College) => c.notes || '-' },
                ].map(row => (
                  <tr key={row.label} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="p-2 text-gray-500 font-medium">{row.label}</td>
                    {compared.map(c => <td key={c.id} className="p-2 text-gray-700 dark:text-gray-300">{row.get(c)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
