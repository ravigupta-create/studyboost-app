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

export default function StudyGuidePage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [input, setInput] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="📖" title="Study Guide Generator" description="Paste notes or chapter content and get a comprehensive study guide." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!input.trim() || loading) return;
    generate(`You are an expert educator. Create a comprehensive study guide from the following notes/content. Structure it exactly as follows:

## Key Terms
List every important term or concept. Format each as: **Term** — clear, concise definition (1-2 sentences).

## Concept Summaries
For each major topic or section in the notes, write a clear 3-5 sentence summary explaining the concept, why it matters, and how it works.

## Connections Between Ideas
Identify and explain 3-5 important connections, cause-and-effect relationships, or comparisons between the concepts covered. Show how ideas relate to each other.

## Review Questions
Generate exactly 10 review questions of increasing difficulty:
- Questions 1-3: Basic recall (definitions, facts)
- Questions 4-6: Application (apply concepts to scenarios)
- Questions 7-9: Analysis (compare, contrast, evaluate)
- Question 10: Synthesis (combine multiple concepts)

Provide a brief answer key at the end.

NOTES/CONTENT:
${input}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="📖" title="Study Guide Generator" description="Paste notes or chapter content and get a comprehensive study guide." aiPowered />
      <Card className="mb-6">
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your notes or chapter content here..." rows={6} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !input.trim()}>
            {loading ? <><Spinner /> Generating...</> : 'Generate Study Guide'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
