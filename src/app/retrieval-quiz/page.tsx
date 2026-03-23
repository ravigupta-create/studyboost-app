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

export default function RetrievalQuizPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [input, setInput] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="📝" title="Retrieval Quiz" description="Generate open-ended questions that test your recall, not just recognition." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!input.trim() || loading) return;
    generate(`You are an expert in retrieval practice, a proven study technique. Given the following study material, generate 5-7 open-ended short-answer questions.

CRITICAL RULES:
- Do NOT use multiple choice. All questions must be open-ended requiring free recall.
- Questions should require the student to PRODUCE information from memory, not recognize it from a list.
- Vary question types: "Explain...", "Describe the process of...", "What are the key differences between...", "Why does...", "How does... relate to..."
- Order questions from foundational recall to deeper analytical thinking.
- Each question should target a different key concept from the material.

Format:
For each question:
**Q1.** [Question text]
> **Model Answer:** [A complete, concise answer in 2-4 sentences]

After all questions, add:
## Self-Assessment Guide
Briefly explain how the student should score their recall: what counts as full recall vs. partial recall vs. needs review.

STUDY MATERIAL:
${input}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="📝" title="Retrieval Quiz" description="Generate open-ended questions that test your recall, not just recognition." aiPowered />
      <Card className="mb-6">
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your study material here..." rows={6} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !input.trim()}>
            {loading ? <><Spinner /> Generating...</> : 'Generate Quiz'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
