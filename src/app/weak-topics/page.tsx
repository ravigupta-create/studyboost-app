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

export default function WeakTopicsPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [input, setInput] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🎯" title="Weak Topic Analyzer" description="Identify your weak areas and get targeted study advice." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!input.trim() || loading) return;
    generate(`You are an expert academic tutor and learning strategist. A student has provided their recent performance data or described their struggle areas. Analyze this and provide a comprehensive study improvement plan.

Student's input:
"${input}"

Provide your analysis in this exact format:

## Weak Topic Analysis

### 📊 Performance Summary
Briefly summarize what the data tells you about the student's overall performance.

### 🔴 Ranked Weak Topics (Highest Priority First)
For each weak topic identified (number them):
1. **[Topic Name]** — Weakness Level: 🔴 Critical / 🟡 Moderate / 🟢 Minor
   - *What the data shows:* specific evidence from their input
   - *Why this matters:* how this gap affects broader understanding
   - *Root cause:* likely underlying reason for the struggle

### 📋 Recommended Study Priorities
Organize into:
- **This Week (Urgent):** topics to tackle immediately
- **Next 2 Weeks:** topics to work on after urgent ones
- **Ongoing:** topics to maintain/review periodically

### 🛠️ Study Techniques for Each Weak Area
For each weak topic, recommend:
1. **Specific technique** (e.g., spaced repetition, worked examples, concept mapping)
2. **Concrete action step** (exactly what to do, how long, how often)
3. **Free resource** (specific YouTube channel, Khan Academy section, textbook chapter type)

### 💪 Strengths to Leverage
Identify any strengths from the data and suggest how to use them to improve weak areas.

Be specific, actionable, and encouraging. Avoid generic advice.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🎯" title="Weak Topic Analyzer" description="Identify your weak areas and get targeted study advice." aiPowered />
      <Card className="mb-6">
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your recent quiz/test scores, grade breakdowns, or describe areas you struggle with...&#10;&#10;Example: 'I got 92% on my bio exam but only 45% on genetics questions. My chem test was 78% but I missed all the stoichiometry problems. I struggle with word problems in math.'" rows={5} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !input.trim()}>
            {loading ? <><Spinner /> Analyzing...</> : 'Analyze Weak Topics'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && (
        <Card>
          <MarkdownRenderer content={output} />
        </Card>
      )}
    </div>
  );
}
