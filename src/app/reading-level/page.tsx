'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const m = word.match(/[aeiouy]{1,2}/g);
  return m ? m.length : 1;
}

function analyze(text: string) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(w => w.replace(/[^a-zA-Z]/g, '').length > 0);
  const wordTexts = words.map(w => w.replace(/[^a-zA-Z]/g, ''));
  const syllables = wordTexts.map(countSyllables);
  const totalSyllables = syllables.reduce((a, b) => a + b, 0);
  const totalWords = words.length;
  const totalSentences = Math.max(1, sentences.length);
  const chars = wordTexts.join('').length;
  const polySyllableWords = syllables.filter(s => s >= 3).length;
  const complexWords = wordTexts.filter((w, i) => syllables[i] >= 3);

  const fleschEase = 206.835 - 1.015 * (totalWords / totalSentences) - 84.6 * (totalSyllables / totalWords);
  const fleschKincaid = 0.39 * (totalWords / totalSentences) + 11.8 * (totalSyllables / totalWords) - 15.59;
  const gunningFog = 0.4 * ((totalWords / totalSentences) + 100 * (polySyllableWords / totalWords));
  const smog = 1.0430 * Math.sqrt(polySyllableWords * (30 / totalSentences)) + 3.1291;
  const colemanLiau = 0.0588 * (chars / totalWords * 100) - 0.296 * (totalSentences / totalWords * 100) - 15.8;

  return {
    totalWords, totalSentences, totalSyllables, chars,
    polySyllableWords, complexWords: [...new Set(complexWords)],
    fleschEase: Math.round(fleschEase * 10) / 10,
    fleschKincaid: Math.round(fleschKincaid * 10) / 10,
    gunningFog: Math.round(gunningFog * 10) / 10,
    smog: Math.round(smog * 10) / 10,
    colemanLiau: Math.round(colemanLiau * 10) / 10,
  };
}

function easeLabel(score: number): string {
  if (score >= 90) return 'Very Easy (5th grade)';
  if (score >= 80) return 'Easy (6th grade)';
  if (score >= 70) return 'Fairly Easy (7th grade)';
  if (score >= 60) return 'Standard (8th-9th grade)';
  if (score >= 50) return 'Fairly Difficult (10th-12th)';
  if (score >= 30) return 'Difficult (College)';
  return 'Very Confusing (Graduate)';
}

export default function ReadingLevelPage() {
  const [text, setText] = useState('');
  const [results, setResults] = useState<ReturnType<typeof analyze> | null>(null);

  const handleAnalyze = () => {
    if (!text.trim() || text.split(/\s+/).length < 10) return;
    setResults(analyze(text));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader icon="&#128218;" title="Reading Level Analyzer" description="Analyze text readability with multiple formulas." />
      <Card className="mb-6">
        <Textarea placeholder="Paste text here (at least 10 words)..." value={text} onChange={e => setText(e.target.value)} className="min-h-[150px]" />
        <Button className="mt-4" onClick={handleAnalyze} disabled={text.split(/\s+/).length < 10}>Analyze Reading Level</Button>
      </Card>
      {results && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Words', val: results.totalWords },
              { label: 'Sentences', val: results.totalSentences },
              { label: 'Syllables', val: results.totalSyllables },
              { label: 'Complex Words', val: results.polySyllableWords },
            ].map(s => (
              <Card key={s.label} className="text-center">
                <p className="text-2xl font-bold text-purple-600">{s.val}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </Card>
            ))}
          </div>
          <Card className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Readability Scores</h2>
            <div className="space-y-4">
              {[
                { name: 'Flesch Reading Ease', score: results.fleschEase, note: easeLabel(results.fleschEase), max: 100, higher: true },
                { name: 'Flesch-Kincaid Grade', score: results.fleschKincaid, note: `Grade ${Math.round(results.fleschKincaid)}`, max: 20, higher: false },
                { name: 'Gunning Fog Index', score: results.gunningFog, note: `Grade ${Math.round(results.gunningFog)}`, max: 20, higher: false },
                { name: 'SMOG Index', score: results.smog, note: `Grade ${Math.round(results.smog)}`, max: 20, higher: false },
                { name: 'Coleman-Liau Index', score: results.colemanLiau, note: `Grade ${Math.round(results.colemanLiau)}`, max: 20, higher: false },
              ].map(r => (
                <div key={r.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{r.name}</span>
                    <span className="text-gray-500">{r.score} - {r.note}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div className={`h-2 rounded-full ${r.higher ? 'bg-emerald-500' : 'bg-purple-500'}`}
                      style={{ width: `${Math.min(100, Math.max(0, (Math.abs(r.score) / r.max) * 100))}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          {results.complexWords.length > 0 && (
            <Card>
              <h2 className="text-lg font-semibold mb-3">Difficult Words ({results.complexWords.length})</h2>
              <div className="flex flex-wrap gap-2">
                {results.complexWords.slice(0, 50).map((w, i) => (
                  <span key={i} className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded text-sm">{w} ({countSyllables(w)} syl)</span>
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
