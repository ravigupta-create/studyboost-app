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

export default function AnnotatePage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [input, setInput] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="📌" title="Text Annotator" description="Paste a passage and get detailed annotations with vocabulary, context, and analysis." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!input.trim() || loading) return;
    generate(`You are a literature professor creating detailed annotations for a student. Annotate the following passage thoroughly.

First, reproduce the passage with line numbers for reference.

## Vocabulary Notes
For each challenging or significant word/phrase, provide:
- **[Word/Phrase]** (Line X): Definition in context. Etymology or root if illuminating.

## Historical & Cultural Context
Provide relevant background information that helps understand the passage:
- Time period, social conditions, historical events referenced
- Cultural norms or assumptions embedded in the text
- Author's biography if relevant and identifiable

## Literary Devices
Identify every literary device used. For each:
- **[Device Name]** (Line X): "[Quote]" — Explanation of how and why it's used, and its effect on the reader.

## Structural Analysis
- How is the passage organized? (chronological, cause-effect, compare-contrast, etc.)
- What is the pacing? Where does it speed up or slow down?
- How do sentence lengths and structures contribute to meaning?

## Discussion Questions
Provide 3-5 thought-provoking questions for deeper analysis of this passage. These should encourage critical thinking and textual evidence.

## Key Takeaway
In 2-3 sentences, what is the most important thing to understand about this passage?

PASSAGE:
${input}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="📌" title="Text Annotator" description="Paste a passage and get detailed annotations with vocabulary, context, and analysis." aiPowered />
      <Card className="mb-6">
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste a passage from a book, article, speech, or any text..." rows={6} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !input.trim()}>
            {loading ? <><Spinner /> Annotating...</> : 'Annotate Passage'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
