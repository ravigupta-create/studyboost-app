'use client';
import { useState } from 'react';
import { useGeminiStream } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';

const AP_SUBJECTS = [
  'AP US History', 'AP Biology', 'AP Chemistry', 'AP Physics', 'AP Calculus AB',
  'AP English Literature', 'AP English Language', 'AP World History', 'AP Government', 'AP Psychology'
];

export default function APReviewPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [subject, setSubject] = useState(AP_SUBJECTS[0]);
  const [unitTopic, setUnitTopic] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="📚" title="AP Exam Review" description="Generate AP exam-style practice questions for any AP subject." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (loading) return;
    generate(`You are an experienced AP exam prep teacher. Generate exactly 5 AP exam-style questions for ${subject}${unitTopic ? ` focusing on the topic/unit: "${unitTopic}"` : ''}.

Create a realistic mix of question types that would appear on the actual AP exam:
- Questions 1-3: Multiple choice questions with 4 options (A, B, C, D). Include a stimulus (passage, data, or scenario) where appropriate for the subject. Mark the correct answer.
- Questions 4-5: Short answer / free response questions that require 2-3 sentence answers.

For each question:
1. Write the question exactly as it would appear on a real AP exam (formal language, proper formatting)
2. For MC questions: provide all 4 options, then reveal the **Correct Answer** with a detailed explanation of WHY it's correct and why each wrong answer is wrong
3. For short answer: provide a **Model Answer** that would earn full points, noting key terms/concepts that must be included

Format each question clearly with:
## Question 1 (Multiple Choice)
## Question 2 (Multiple Choice)
## Question 3 (Multiple Choice)
## Question 4 (Short Answer)
## Question 5 (Short Answer)

Make questions genuinely challenging at AP exam difficulty level. Cover different skills (recall, analysis, application, synthesis).`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="📚" title="AP Exam Review" description="Generate AP exam-style practice questions for any AP subject." aiPowered />
      <Card className="mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">AP Subject</label>
            <Select value={subject} onChange={e => setSubject(e.target.value)}>
              {AP_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Specific Unit/Topic (optional)</label>
            <Input value={unitTopic} onChange={e => setUnitTopic(e.target.value)} placeholder="e.g., Civil War, Photosynthesis, Thermodynamics..." />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? <><Spinner /> Generating Questions...</> : 'Generate AP Questions'}
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
