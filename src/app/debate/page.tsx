'use client';
import { useState } from 'react';
import { useGeminiStream } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';

export default function DebatePage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [topic, setTopic] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="⚖️" title="Debate Prep" description="Get balanced arguments for both sides of any debate topic." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!topic.trim() || loading) return;
    generate(`You are a debate coach preparing a student for a formal debate. Generate a comprehensive debate brief for the following topic:

**Debate Topic:** "${topic}"

## Arguments FOR (Pro)

### Argument 1: [Title]
- **Claim:** [Clear, specific claim]
- **Evidence:** [Specific data, studies, examples, or expert opinions supporting this]
- **Impact:** [Why this matters — what are the consequences?]

### Argument 2: [Title]
(same structure)

### Argument 3: [Title]
(same structure)

---

## Arguments AGAINST (Con)

### Argument 1: [Title]
- **Claim:** [Clear, specific claim]
- **Evidence:** [Specific data, studies, examples, or expert opinions supporting this]
- **Impact:** [Why this matters — what are the consequences?]

### Argument 2: [Title]
(same structure)

### Argument 3: [Title]
(same structure)

---

## Rebuttals

### Pro Rebuttals (Responding to Con Arguments)
For each Con argument, provide a concise rebuttal the Pro side could use.

### Con Rebuttals (Responding to Pro Arguments)
For each Pro argument, provide a concise rebuttal the Con side could use.

## Conclusion Framework
Provide a template for how to structure a balanced conclusion that acknowledges both sides while taking a position.

Use real-world evidence and examples wherever possible. Be balanced and fair to both sides.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="⚖️" title="Debate Prep" description="Get balanced arguments for both sides of any debate topic." aiPowered />
      <Card className="mb-6">
        <Input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Enter a debate topic (e.g., Should school start later?)" />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !topic.trim()}>
            {loading ? <><Spinner /> Preparing...</> : 'Generate Debate Brief'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
