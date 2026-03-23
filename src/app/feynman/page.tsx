'use client';
import { useState } from 'react';
import { useGeminiStream } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';

export default function FeynmanPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [topic, setTopic] = useState('');
  const [explanation, setExplanation] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🎓" title="Feynman Technique" description="Explain a concept in your own words. AI will identify gaps and misconceptions." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!topic.trim() || !explanation.trim() || loading) return;
    generate(`You are a patient but rigorous professor using the Feynman Technique to evaluate a student's understanding. The student is trying to explain the concept of "${topic}" in their own words.

Evaluate their explanation carefully and provide:

## Completeness Rating: X/10
Give a score from 1-10 for how complete and accurate the explanation is. Briefly justify the score.

## What You Got Right
Acknowledge the parts of the explanation that are correct and well-stated. Be specific and encouraging.

## Knowledge Gaps
Identify any important aspects of "${topic}" that the student failed to mention or glossed over. For each gap, briefly explain what's missing and why it matters.

## Misconceptions or Oversimplifications
Point out any statements that are incorrect, misleading, or oversimplified. For each, explain the correct understanding clearly.

## 3 Probing Questions
Ask 3 specific questions that would test whether the student truly understands the concept at a deeper level. These should target the weakest areas of their explanation.

## Suggested Improvement
Provide a brief model explanation (3-5 sentences) of "${topic}" that addresses the gaps you identified.

STUDENT'S EXPLANATION:
${explanation}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🎓" title="Feynman Technique" description="Explain a concept in your own words. AI will identify gaps and misconceptions." aiPowered />
      <Card className="mb-6">
        <Input value={topic} onChange={e => setTopic(e.target.value)} placeholder="What concept are you explaining? (e.g., Photosynthesis)" className="mb-4" />
        <Textarea value={explanation} onChange={e => setExplanation(e.target.value)} placeholder="Explain the concept in your own words as if teaching it to someone..." rows={6} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !topic.trim() || !explanation.trim()}>
            {loading ? <><Spinner /> Evaluating...</> : 'Evaluate My Explanation'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
