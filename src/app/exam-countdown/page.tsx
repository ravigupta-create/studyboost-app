'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Exam {
  id: string;
  name: string;
  subject: string;
  date: string;
}

export default function ExamCountdownPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => { const s = localStorage.getItem('sb-exams'); if (s) setExams(JSON.parse(s)); }, []);
  const save = (d: Exam[]) => { setExams(d); localStorage.setItem('sb-exams', JSON.stringify(d)); };

  const addExam = () => {
    if (!name.trim() || !date) return;
    const e: Exam = { id: Date.now().toString(), name: name.trim(), subject: subject.trim(), date };
    save([...exams, e]);
    setName(''); setSubject(''); setDate('');
  };

  const deleteExam = (id: string) => save(exams.filter(e => e.id !== id));

  const getDaysRemaining = (dateStr: string) => {
    const examDate = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const sorted = [...exams].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getUrgencyColor = (days: number) => {
    if (days < 0) return 'border-gray-400 bg-gray-50 dark:bg-gray-800';
    if (days <= 7) return 'border-red-400 bg-red-50 dark:bg-red-900/20';
    if (days <= 30) return 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
    return 'border-green-400 bg-green-50 dark:bg-green-900/20';
  };

  const getUrgencyText = (days: number) => {
    if (days < 0) return 'text-gray-500';
    if (days <= 7) return 'text-red-600 dark:text-red-400';
    if (days <= 30) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader icon="&#128197;" title="Exam Countdown" description="Track upcoming exams with countdown timers and urgency indicators." />

      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Add Exam</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input placeholder="Exam name" value={name} onChange={e => setName(e.target.value)} />
          <Input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <Button className="mt-3" onClick={addExam} disabled={!name.trim() || !date}>Add Exam</Button>
      </Card>

      {sorted.length === 0 ? (
        <Card><p className="text-gray-500 text-center">No exams added yet. Add your first exam above.</p></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sorted.map(exam => {
            const days = getDaysRemaining(exam.date);
            return (
              <div key={exam.id} className={`rounded-xl border-2 p-5 ${getUrgencyColor(days)} transition-all`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{exam.name}</h3>
                    {exam.subject && <p className="text-sm text-gray-500">{exam.subject}</p>}
                  </div>
                  <button onClick={() => deleteExam(exam.id)} className="text-gray-400 hover:text-red-500 text-lg">&times;</button>
                </div>
                <div className="text-center my-4">
                  <p className={`text-4xl font-bold ${getUrgencyText(days)}`}>
                    {days < 0 ? `${Math.abs(days)} days ago` : days === 0 ? 'TODAY!' : `${days}`}
                  </p>
                  {days > 0 && <p className="text-sm text-gray-500">day{days !== 1 ? 's' : ''} remaining</p>}
                  {days < 0 && <p className="text-sm text-gray-500">past</p>}
                </div>
                <p className="text-xs text-gray-400 text-center">{new Date(exam.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
