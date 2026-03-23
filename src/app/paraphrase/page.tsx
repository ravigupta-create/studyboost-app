'use client';
import { useState } from 'react';
import { useGeminiStream } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';

const STYLES = [
  { value: 'simpler', label: 'Simpler' },
  { value: 'formal', label: 'More Formal' },
  { value: 'concise', label: 'More Concise' },
  { value: 'academic', label: 'More Academic' },
];

export default function ParaphrasePage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [input, setInput] = useState('');
  const [style, setStyle] = useState('simpler');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🔄" title="Smart Paraphraser" description="Rewrite text in different styles while preserving meaning." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const styleInstructions: Record<string, string> = {
    simpler: 'Rewrite using simpler vocabulary, shorter sentences, and everyday language. Break complex ideas into digestible pieces. A middle schooler should understand it.',
    formal: 'Rewrite in a professional, formal tone. Use sophisticated vocabulary, proper grammar, and polished sentence structures. Suitable for a business or official context.',
    concise: 'Rewrite to be as concise as possible. Remove all redundancy, filler words, and unnecessary clauses. Preserve every key idea but in the fewest words possible.',
    academic: 'Rewrite in an academic scholarly tone. Use discipline-appropriate terminology, hedging language where appropriate, passive voice where conventional, and formal academic register.',
  };

  const handleGenerate = () => {
    if (!input.trim() || loading) return;
    generate(`You are an expert writing coach. Paraphrase the following text in a "${STYLES.find(s => s.value === style)?.label}" style.

${styleInstructions[style]}

## Original Text
${input}

## Rewritten Version
[Provide the complete rewritten text here]

## Changes Made
Briefly list 3-5 key changes you made and why (e.g., "Replaced 'utilize' with 'use' for simplicity").

## Word Count Comparison
Original: [X] words → Rewritten: [Y] words`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🔄" title="Smart Paraphraser" description="Rewrite text in different styles while preserving meaning." aiPowered />
      <Card className="mb-6">
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste the text you want to paraphrase..." rows={5} />
        <div className="mt-4">
          <Select value={style} onChange={e => setStyle(e.target.value)}>
            {STYLES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !input.trim()}>
            {loading ? <><Spinner /> Rewriting...</> : 'Paraphrase'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
