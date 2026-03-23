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

export default function GrammarPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [input, setInput] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="✏️" title="Grammar Checker" description="Get detailed grammar, punctuation, and style corrections with rule explanations." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!input.trim() || loading) return;
    generate(`You are an expert English grammar and style editor. Analyze the following text for ALL grammar, punctuation, spelling, and style errors.

For each error found, provide:

## Errors Found

### Error 1
- **Original:** "[exact text with error]"
- **Corrected:** "[corrected text]"
- **Rule:** [Name the grammar rule, e.g., "Subject-Verb Agreement"]
- **Explanation:** [Brief explanation of why this is wrong and how the rule works]

(Continue for all errors found)

## Fully Corrected Version
[Provide the complete text with ALL corrections applied]

## Summary
- Total errors found: [X]
- Breakdown: [X] grammar, [X] punctuation, [X] spelling, [X] style
- Overall writing quality: [Brief assessment]
- Top tip for improvement: [One actionable suggestion]

If the text has no errors, say so and provide a brief style improvement suggestion instead.

TEXT TO CHECK:
${input}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="✏️" title="Grammar Checker" description="Get detailed grammar, punctuation, and style corrections with rule explanations." aiPowered />
      <Card className="mb-6">
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your text here to check for grammar errors..." rows={6} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !input.trim()}>
            {loading ? <><Spinner /> Checking...</> : 'Check Grammar'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
