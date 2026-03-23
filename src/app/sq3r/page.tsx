'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';

const STEPS = ['Survey', 'Question', 'Read', 'Recite', 'Review'] as const;

export default function SQ3RPage() {
  const [step, setStep] = useState(0);
  const [text, setText] = useState('');
  const [headings, setHeadings] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [highlights, setHighlights] = useState<Set<number>>(new Set());
  const [reciteText, setReciteText] = useState('');

  const extractHeadings = () => {
    const lines = text.split('\n').filter(l => l.trim());
    const h: string[] = [];
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.length < 80 && (trimmed === trimmed.toUpperCase() || /^[A-Z]/.test(trimmed) && !trimmed.endsWith('.') || /^#{1,6}\s/.test(trimmed) || /^\d+[\.\)]\s/.test(trimmed))) {
        h.push(trimmed.replace(/^#{1,6}\s/, ''));
      }
    });
    if (h.length === 0) {
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
      for (let i = 0; i < Math.min(5, sentences.length); i++) {
        h.push(sentences[i].trim().substring(0, 60));
      }
    }
    setHeadings(h);
    setQuestions(h.map(hd => `What is the main idea of "${hd}"?`));
  };

  const toggleHighlight = (idx: number) => {
    const n = new Set(highlights);
    if (n.has(idx)) n.delete(idx); else n.add(idx);
    setHighlights(n);
  };

  const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim());

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Card>
            <h2 className="text-lg font-semibold mb-2">Step 1: Survey</h2>
            <p className="text-sm text-gray-500 mb-4">Paste your reading material below. We will extract headings and key points for you to survey.</p>
            <Textarea placeholder="Paste your text here..." value={text} onChange={e => setText(e.target.value)} className="min-h-[200px]" />
            <Button className="mt-4" onClick={() => { extractHeadings(); setStep(1); }} disabled={!text.trim()}>Survey Text</Button>
          </Card>
        );
      case 1:
        return (
          <Card>
            <h2 className="text-lg font-semibold mb-2">Step 2: Question</h2>
            <p className="text-sm text-gray-500 mb-4">Based on the survey, here are generated questions. Edit them to match your focus.</p>
            <div className="space-y-3">
              {questions.map((q, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-sm font-bold text-purple-600 mt-1">Q{i + 1}.</span>
                  <input className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    value={q} onChange={e => { const nq = [...questions]; nq[i] = e.target.value; setQuestions(nq); }} />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="secondary" onClick={() => setStep(0)}>Back</Button>
              <Button onClick={() => setStep(2)}>Continue to Read</Button>
            </div>
          </Card>
        );
      case 2:
        return (
          <Card>
            <h2 className="text-lg font-semibold mb-2">Step 3: Read</h2>
            <p className="text-sm text-gray-500 mb-4">Read through the text carefully. Click on sentences to highlight key points.</p>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 max-h-[400px] overflow-y-auto mb-4">
              {sentences.map((s, i) => (
                <span key={i} onClick={() => toggleHighlight(i)}
                  className={`cursor-pointer inline ${highlights.has(i) ? 'bg-yellow-200 dark:bg-yellow-700/50' : 'hover:bg-gray-200 dark:hover:bg-gray-600'} rounded px-0.5`}>
                  {s}{' '}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-400 mb-4">{highlights.size} sentence{highlights.size !== 1 ? 's' : ''} highlighted</p>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)}>Continue to Recite</Button>
            </div>
          </Card>
        );
      case 3:
        return (
          <Card>
            <h2 className="text-lg font-semibold mb-2">Step 4: Recite</h2>
            <p className="text-sm text-gray-500 mb-4">Without looking at the text, write what you remember in your own words.</p>
            <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Your questions to answer:</p>
              <ul className="list-disc list-inside text-sm text-purple-600 dark:text-purple-400 mt-1">
                {questions.map((q, i) => <li key={i}>{q}</li>)}
              </ul>
            </div>
            <Textarea placeholder="Write what you remember..." value={reciteText} onChange={e => setReciteText(e.target.value)} className="min-h-[200px]" />
            <div className="flex gap-2 mt-4">
              <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
              <Button onClick={() => setStep(4)}>Continue to Review</Button>
            </div>
          </Card>
        );
      case 4:
        const reciteWords = new Set(reciteText.toLowerCase().split(/\W+/).filter(w => w.length > 3));
        const origWords = new Set(text.toLowerCase().split(/\W+/).filter(w => w.length > 3));
        const overlap = [...reciteWords].filter(w => origWords.has(w));
        const coverage = origWords.size > 0 ? Math.round((overlap.length / origWords.size) * 100) : 0;
        return (
          <Card>
            <h2 className="text-lg font-semibold mb-2">Step 5: Review</h2>
            <p className="text-sm text-gray-500 mb-4">Compare your recollection with the original text.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-sm font-semibold mb-2 text-emerald-600">Your Recollection</h3>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg text-sm max-h-[300px] overflow-y-auto whitespace-pre-wrap">{reciteText || '(nothing written)'}</div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2 text-blue-600">Original Text</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-sm max-h-[300px] overflow-y-auto whitespace-pre-wrap">{text}</div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-4">
              <p className="text-sm font-semibold">Content Coverage: {coverage}%</p>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mt-2">
                <div className="bg-purple-600 h-2.5 rounded-full transition-all" style={{ width: `${Math.min(100, coverage)}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{overlap.length} key terms recalled out of {origWords.size}</p>
            </div>
            {highlights.size > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">Your Highlighted Key Points</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  {[...highlights].sort().map(i => <li key={i}>{sentences[i]}</li>)}
                </ul>
              </div>
            )}
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setStep(3)}>Back to Recite</Button>
              <Button onClick={() => { setStep(0); setText(''); setHeadings([]); setQuestions([]); setHighlights(new Set()); setReciteText(''); }}>Start Over</Button>
            </div>
          </Card>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader icon="&#128214;" title="SQ3R Reading Method" description="5-step guided reading: Survey, Question, Read, Recite, Review." />
      <div className="flex gap-1 mb-6">
        {STEPS.map((s, i) => (
          <div key={s} className={`flex-1 text-center py-2 text-xs font-medium rounded-lg ${i === step ? 'bg-purple-600 text-white' : i < step ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}>
            {s}
          </div>
        ))}
      </div>
      {renderStep()}
    </div>
  );
}
