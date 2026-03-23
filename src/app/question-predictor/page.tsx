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

export default function QuestionPredictorPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [subject, setSubject] = useState('');
  const [topics, setTopics] = useState('');
  const [pastTopics, setPastTopics] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🔮" title="Question Predictor" description="Predict likely exam questions based on your course material." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!subject.trim() || !topics.trim() || loading) return;
    generate(`You are an expert exam strategist who has studied thousands of exams. Based on the following course information, predict the 10 most likely exam questions ranked by probability.

**Subject:** ${subject}
**Chapter/Unit Topics Covered:** ${topics}
${pastTopics ? `**Past Test Topics Already Covered:** ${pastTopics}` : ''}

For each predicted question, provide:

## Predicted Exam Questions (Ranked by Likelihood)

### 🥇 Question 1 — Probability: Very High (90%+)
**Predicted Question:** [Write the full question as it might appear]
**Type:** Multiple Choice / Short Answer / Essay / Problem
**Reasoning:** Why this is likely to appear (based on topic importance, common exam patterns, curriculum emphasis)
**Key Points to Include in Answer:** Bullet points of what a perfect answer covers
**Study Tip:** How to prepare specifically for this question

### 🥈 Question 2 — Probability: Very High (85%+)
[Same format]

...continue through Question 10, with probabilities decreasing...

### 🏅 Question 10 — Probability: Moderate (50%+)
[Same format]

---

## 📌 Study Priority Summary
List the top 5 concepts/facts to memorize based on these predictions.

Be specific to the actual topics given — do not give generic questions. Think about what teachers commonly test and how exam questions are typically structured for this subject.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🔮" title="Question Predictor" description="Predict likely exam questions based on your course material." aiPowered />
      <Card className="mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
            <Input value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g., AP US History, Biology 101, Algebra 2..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Topics/Chapters Covered</label>
            <Textarea value={topics} onChange={e => setTopics(e.target.value)} placeholder="List the topics, chapters, or units covered on this exam..." rows={3} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Past Test Topics (optional)</label>
            <Input value={pastTopics} onChange={e => setPastTopics(e.target.value)} placeholder="Topics already tested that probably won't appear again..." />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !subject.trim() || !topics.trim()}>
            {loading ? <><Spinner /> Predicting...</> : 'Predict Questions'}
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
