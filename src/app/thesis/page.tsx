'use client';
import { useState } from 'react';
import { useGeminiStream } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Spinner } from '@/components/ui/Spinner';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';

export default function ThesisPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [topic, setTopic] = useState('');
  const [stance, setStance] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="📜" title="Thesis Generator" description="Enter your essay topic and stance to get 3 strong thesis options with analysis." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!topic.trim() || loading) return;
    generate(`You are an expert writing instructor. Generate 3 distinct thesis statement options for the following essay:

**Topic:** ${topic}
**Stance/Angle:** ${stance || 'No specific stance provided — generate varied perspectives'}

For each thesis option, provide:

### Thesis Option 1: [Brief Label]
**Thesis Statement:** "[Write the complete thesis statement in one clear, arguable sentence]"

**Strengths:**
- [Why this thesis is effective — specificity, arguability, scope]

**Potential Weaknesses:**
- [What could be improved — too broad, too narrow, needs qualification]

**Suggested Supporting Points:**
1. [First body paragraph topic/argument]
2. [Second body paragraph topic/argument]
3. [Third body paragraph topic/argument]

---

Repeat for Options 2 and 3. Make each thesis genuinely different in approach (e.g., one could be analytical, one argumentative, one comparative). All thesis statements should be specific, debatable, and supportable with evidence.

End with a brief "Which to Choose?" section advising the student on selecting based on their evidence and assignment requirements.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="📜" title="Thesis Generator" description="Enter your essay topic and stance to get 3 strong thesis options with analysis." aiPowered />
      <Card className="mb-6">
        <Input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Essay topic (e.g., Impact of social media on teen mental health)" className="mb-4" />
        <Textarea value={stance} onChange={e => setStance(e.target.value)} placeholder="Your stance or angle (optional — e.g., Social media has a net negative effect...)" rows={3} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !topic.trim()}>
            {loading ? <><Spinner /> Generating...</> : 'Generate Thesis Options'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
