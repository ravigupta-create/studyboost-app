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

export default function RhetoricPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [input, setInput] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🎭" title="Rhetorical Analysis" description="Analyze rhetorical devices, tone, audience, and persuasive strategies in any text." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!input.trim() || loading) return;
    generate(`You are a rhetoric and composition professor. Perform a thorough rhetorical analysis of the following text.

## Rhetorical Situation
- **Speaker/Author:** Who is speaking? What is their credibility/position?
- **Audience:** Who is the intended audience? How does the text appeal to them?
- **Purpose:** What is the author trying to achieve? (persuade, inform, entertain, call to action)
- **Context:** What situation or occasion prompted this text?

## Rhetorical Devices Identified
For each device found, provide:
- **Device Name** (e.g., Anaphora, Metaphor, Hyperbole, Rhetorical Question, etc.)
  - **Example from text:** "[Quote the exact text]"
  - **Effect:** Why the author used this device and how it impacts the reader

List at least 5 devices if present in the text.

## Appeals Analysis
### Ethos (Credibility)
How does the author establish credibility? Rate strength: Weak / Moderate / Strong. Provide evidence.

### Pathos (Emotion)
What emotions does the text evoke? Rate strength: Weak / Moderate / Strong. Provide evidence.

### Logos (Logic)
What logical arguments or evidence are used? Rate strength: Weak / Moderate / Strong. Provide evidence.

## Tone Analysis
Identify the overall tone(s) and how they shift throughout the text. Provide specific word choices that establish tone.

## Overall Effectiveness
Rate the text's persuasive effectiveness (1-10) and explain your reasoning. What works well? What could be stronger?

TEXT TO ANALYZE:
${input}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🎭" title="Rhetorical Analysis" description="Analyze rhetorical devices, tone, audience, and persuasive strategies in any text." aiPowered />
      <Card className="mb-6">
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste any text — a speech, essay, article, advertisement..." rows={6} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !input.trim()}>
            {loading ? <><Spinner /> Analyzing...</> : 'Analyze Rhetoric'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
