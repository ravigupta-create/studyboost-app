'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  address: string;
  education: { school: string; gpa: string; gradYear: string; details: string }[];
  experience: { title: string; org: string; startDate: string; endDate: string; bullets: string[] }[];
  activities: string[];
  skills: string[];
  awards: string[];
}

const empty: ResumeData = {
  name: '', email: '', phone: '', address: '',
  education: [], experience: [], activities: [], skills: [], awards: [],
};

const LS_KEY = 'sb-resume';

export default function ResumePage() {
  const [data, setData] = useState<ResumeData>(empty);
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setData(JSON.parse(saved));
  }, []);

  const save = (d: ResumeData) => { setData(d); localStorage.setItem(LS_KEY, JSON.stringify(d)); };

  const addEducation = () => save({ ...data, education: [...data.education, { school: '', gpa: '', gradYear: '', details: '' }] });
  const updateEdu = (i: number, field: string, val: string) => {
    const edu = [...data.education]; edu[i] = { ...edu[i], [field]: val }; save({ ...data, education: edu });
  };
  const removeEdu = (i: number) => save({ ...data, education: data.education.filter((_, idx) => idx !== i) });

  const addExperience = () => save({ ...data, experience: [...data.experience, { title: '', org: '', startDate: '', endDate: '', bullets: [''] }] });
  const updateExp = (i: number, field: string, val: string) => {
    const exp = [...data.experience]; exp[i] = { ...exp[i], [field]: val }; save({ ...data, experience: exp });
  };
  const updateBullet = (ei: number, bi: number, val: string) => {
    const exp = [...data.experience]; exp[ei].bullets[bi] = val; save({ ...data, experience: exp });
  };
  const addBullet = (ei: number) => {
    const exp = [...data.experience]; exp[ei].bullets.push(''); save({ ...data, experience: exp });
  };
  const removeBullet = (ei: number, bi: number) => {
    const exp = [...data.experience]; exp[ei].bullets = exp[ei].bullets.filter((_, i) => i !== bi); save({ ...data, experience: exp });
  };
  const removeExp = (i: number) => save({ ...data, experience: data.experience.filter((_, idx) => idx !== i) });

  const addListItem = (field: 'activities' | 'skills' | 'awards') => {
    if (!newItem.trim()) return;
    save({ ...data, [field]: [...data[field], newItem.trim()] });
    setNewItem('');
  };
  const removeListItem = (field: 'activities' | 'skills' | 'awards', i: number) => {
    save({ ...data, [field]: data[field].filter((_, idx) => idx !== i) });
  };

  const exportText = () => {
    let text = `${data.name}\n${data.email} | ${data.phone} | ${data.address}\n\n`;
    if (data.education.length) {
      text += 'EDUCATION\n';
      data.education.forEach(e => { text += `${e.school} | GPA: ${e.gpa} | Class of ${e.gradYear}\n${e.details}\n\n`; });
    }
    if (data.experience.length) {
      text += 'EXPERIENCE\n';
      data.experience.forEach(e => { text += `${e.title} | ${e.org} | ${e.startDate} - ${e.endDate}\n${e.bullets.map(b => `  - ${b}`).join('\n')}\n\n`; });
    }
    if (data.activities.length) text += `ACTIVITIES\n${data.activities.map(a => `  - ${a}`).join('\n')}\n\n`;
    if (data.skills.length) text += `SKILLS\n${data.skills.join(', ')}\n\n`;
    if (data.awards.length) text += `AWARDS\n${data.awards.map(a => `  - ${a}`).join('\n')}\n`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'resume.txt'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <PageHeader icon="\u{1F4C4}" title="Resume Builder" description="Build a student resume with education, experience, and skills." />

      <div className="flex gap-2 mb-6">
        <Button variant={view === 'edit' ? 'primary' : 'secondary'} onClick={() => setView('edit')}>Edit</Button>
        <Button variant={view === 'preview' ? 'primary' : 'secondary'} onClick={() => setView('preview')}>Preview</Button>
        <Button variant="secondary" onClick={exportText}>Export .txt</Button>
      </div>

      {view === 'edit' ? (
        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input placeholder="Full Name" value={data.name} onChange={e => save({ ...data, name: e.target.value })} />
              <Input placeholder="Email" value={data.email} onChange={e => save({ ...data, email: e.target.value })} />
              <Input placeholder="Phone" value={data.phone} onChange={e => save({ ...data, phone: e.target.value })} />
              <Input placeholder="Address" value={data.address} onChange={e => save({ ...data, address: e.target.value })} />
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Education</h3>
              <Button size="sm" onClick={addEducation}>+ Add</Button>
            </div>
            {data.education.map((e, i) => (
              <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 mb-3">
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <Input placeholder="School" value={e.school} onChange={ev => updateEdu(i, 'school', ev.target.value)} />
                  <Input placeholder="GPA" value={e.gpa} onChange={ev => updateEdu(i, 'gpa', ev.target.value)} />
                  <Input placeholder="Grad Year" value={e.gradYear} onChange={ev => updateEdu(i, 'gradYear', ev.target.value)} />
                </div>
                <Input placeholder="Additional details" value={e.details} onChange={ev => updateEdu(i, 'details', ev.target.value)} />
                <button onClick={() => removeEdu(i)} className="text-xs text-red-400 hover:text-red-600 mt-1">Remove</button>
              </div>
            ))}
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Experience</h3>
              <Button size="sm" onClick={addExperience}>+ Add</Button>
            </div>
            {data.experience.map((e, i) => (
              <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 mb-3">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <Input placeholder="Title/Role" value={e.title} onChange={ev => updateExp(i, 'title', ev.target.value)} />
                  <Input placeholder="Organization" value={e.org} onChange={ev => updateExp(i, 'org', ev.target.value)} />
                  <Input placeholder="Start Date" value={e.startDate} onChange={ev => updateExp(i, 'startDate', ev.target.value)} />
                  <Input placeholder="End Date" value={e.endDate} onChange={ev => updateExp(i, 'endDate', ev.target.value)} />
                </div>
                <div className="space-y-1">
                  {e.bullets.map((b, bi) => (
                    <div key={bi} className="flex gap-2">
                      <Input placeholder="Bullet point" value={b} onChange={ev => updateBullet(i, bi, ev.target.value)} />
                      <button onClick={() => removeBullet(i, bi)} className="text-red-400 hover:text-red-600 text-sm">x</button>
                    </div>
                  ))}
                  <button onClick={() => addBullet(i)} className="text-xs text-purple-500 hover:text-purple-700">+ Add bullet</button>
                </div>
                <button onClick={() => removeExp(i)} className="text-xs text-red-400 hover:text-red-600 mt-2 block">Remove</button>
              </div>
            ))}
          </Card>

          {(['activities', 'skills', 'awards'] as const).map(field => (
            <Card key={field}>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 capitalize">{field}</h3>
              <div className="flex gap-2 mb-3">
                <Input placeholder={`Add ${field.slice(0, -1)}...`} value={newItem} onChange={e => setNewItem(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addListItem(field)} />
                <Button size="sm" onClick={() => addListItem(field)}>+</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {data[field].map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">
                    {item}
                    <button onClick={() => removeListItem(field, i)} className="text-red-400 hover:text-red-600 ml-1">x</button>
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="font-serif">
          <div className="text-center mb-6 border-b border-gray-300 dark:border-gray-600 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.name || 'Your Name'}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {[data.email, data.phone, data.address].filter(Boolean).join(' | ')}
            </p>
          </div>

          {data.education.length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-1 mb-2">Education</h3>
              {data.education.map((e, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{e.school}</span>
                    <span className="text-sm text-gray-500">Class of {e.gradYear}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">GPA: {e.gpa} {e.details && `| ${e.details}`}</p>
                </div>
              ))}
            </div>
          )}

          {data.experience.length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-1 mb-2">Experience</h3>
              {data.experience.map((e, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{e.title} {e.org && `at ${e.org}`}</span>
                    <span className="text-sm text-gray-500">{e.startDate} - {e.endDate}</span>
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 ml-2">
                    {e.bullets.filter(Boolean).map((b, bi) => <li key={bi}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {data.activities.length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-1 mb-2">Activities</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 ml-2">
                {data.activities.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          )}

          {data.skills.length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-1 mb-2">Skills</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{data.skills.join(', ')}</p>
            </div>
          )}

          {data.awards.length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-1 mb-2">Awards</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 ml-2">
                {data.awards.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
