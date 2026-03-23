'use client';
import { useState } from 'react';
import { useGeminiStream } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Spinner } from '@/components/ui/Spinner';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';

export default function ActiveRecallPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [input, setInput] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🧠" title="Active Recall Generator" description="Paste your notes and get fill-in-the-blank and short-answer questions to test yourself." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!input.trim() || loading) return;
    generate(`You are an expert educator specializing in active recall study techniques. Given the following notes, generate exactly:

1. **5-7 Fill-in-the-Blank Questions**: Take key sentences from the notes and replace one critical term or concept with a blank "______". After each question, provide the answer in parentheses. Focus on the most important facts, definitions, and relationships.

2. **3 Short-Answer Questions**: Write open-ended questions that require the student to recall and explain key concepts in their own words. These should test deeper understanding, not just surface-level facts. After each question, provide a model answer (2-3 sentences).

Format each section with clear headers. Number all questions. Make sure the blanks target the most important concepts that a student needs to remember.

NOTES:
${input}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🧠" title="Active Recall Generator" description="Paste your notes and get fill-in-the-blank and short-answer questions to test yourself." aiPowered />
      <Card className="mb-6">
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your notes here..." rows={6} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !input.trim()}>
            {loading ? <><Spinner /> Generating...</> : 'Generate Questions'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
