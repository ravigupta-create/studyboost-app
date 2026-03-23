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

export default function EssayScorerPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [input, setInput] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="📊" title="Essay Scorer" description="Get your essay scored on 6 writing traits with detailed feedback." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!input.trim() || loading) return;
    generate(`You are an experienced writing assessor using the 6+1 Trait Writing Model. Score the following essay on each of the 6 traits using a 1-6 scale (1=Beginning, 2=Emerging, 3=Developing, 4=Effective, 5=Strong, 6=Exceptional).

## Trait-by-Trait Scoring

### 1. Ideas & Content: X/6
- **What works:** [Specific praise with examples from the essay]
- **What needs work:** [Specific critique with examples]
- **Tip:** [One actionable improvement suggestion]

### 2. Organization: X/6
- **What works:** [Specific praise — intro, transitions, conclusion, logical flow]
- **What needs work:** [Specific critique]
- **Tip:** [One actionable improvement suggestion]

### 3. Voice: X/6
- **What works:** [Is the writer's personality present? Is it appropriate for the audience?]
- **What needs work:** [Where does the voice falter?]
- **Tip:** [One actionable improvement suggestion]

### 4. Word Choice: X/6
- **What works:** [Strong word choices, vivid language]
- **What needs work:** [Weak, vague, or repetitive words]
- **Tip:** [One actionable improvement suggestion]

### 5. Sentence Fluency: X/6
- **What works:** [Sentence variety, rhythm, flow]
- **What needs work:** [Choppy, run-on, or monotonous patterns]
- **Tip:** [One actionable improvement suggestion]

### 6. Conventions: X/6
- **What works:** [Grammar, spelling, punctuation accuracy]
- **What needs work:** [Specific errors found]
- **Tip:** [One actionable improvement suggestion]

---

## Overall Score: XX/36
[Brief overall assessment — 2-3 sentences]

## Top 3 Improvements
Rank the three most impactful changes that would improve this essay the most:
1. [Most impactful change with specific guidance]
2. [Second most impactful]
3. [Third most impactful]

Be encouraging but honest. Use specific quotes from the essay to support your scores.

ESSAY:
${input}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="📊" title="Essay Scorer" description="Get your essay scored on 6 writing traits with detailed feedback." aiPowered />
      <Card className="mb-6">
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your essay here..." rows={8} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !input.trim()}>
            {loading ? <><Spinner /> Scoring...</> : 'Score My Essay'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
