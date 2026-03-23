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

const TYPES = ['College Admissions', 'Job Interview', 'Scholarship'];

export default function InterviewPrepPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [type, setType] = useState('College Admissions');
  const [context, setContext] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🎤" title="Interview Prep" description="Practice interview questions with STAR method answer frameworks." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (loading) return;
    generate(`You are an expert interview coach specializing in ${type.toLowerCase()} interviews. Generate 10 likely interview questions with comprehensive preparation guidance.

**Interview Type:** ${type}
${context ? `**Additional Context:** ${context}` : ''}

## 🎤 ${type} Interview Prep

### 📋 Overview
- What interviewers are looking for in a ${type.toLowerCase()} interview
- The STAR method: **S**ituation, **T**ask, **A**ction, **R**esult — briefly explain how to use it

---

For each of the 10 questions:

### Question 1: "[The interview question]"
**Why they ask this:** [What the interviewer is really trying to learn]
**Difficulty:** Easy / Medium / Hard
**Category:** ${type === 'College Admissions' ? 'Academic / Personal / Extracurricular / Future Goals' : type === 'Job Interview' ? 'Behavioral / Technical / Situational / Cultural Fit' : 'Academic / Leadership / Financial Need / Goals'}

**STAR Framework Answer Guide:**
- **Situation:** [What kind of situation/scenario to describe — be specific about what makes a good example]
- **Task:** [What responsibility or challenge to highlight]
- **Action:** [What specific actions to emphasize — key verbs and details to include]
- **Result:** [What outcomes to mention — quantify if possible]

**Sample Answer Outline:**
[A 3-4 sentence outline of a strong answer, showing the structure but leaving room for personalization]

**Tips:**
- DO: [Specific positive advice]
- DON'T: [Common mistake to avoid]

---

[Repeat for all 10 questions, varying the difficulty and category]

### 🎯 General Interview Tips for ${type}
1. [Tip specific to this interview type]
2. [Body language/presentation tip]
3. [Preparation tip]
4. [Follow-up tip]
5. [Mindset tip]

### ❓ Questions YOU Should Ask the Interviewer
Provide 5 thoughtful questions the student should ask at the end of the interview, specific to ${type.toLowerCase()}.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🎤" title="Interview Prep" description="Practice interview questions with STAR method answer frameworks." aiPowered />
      <Card className="mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Interview Type</label>
            <Select value={type} onChange={e => setType(e.target.value)}>
              {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Additional Context (optional)</label>
            <Input value={context} onChange={e => setContext(e.target.value)} placeholder={type === 'College Admissions' ? 'e.g., Applying to engineering programs, community service focus...' : type === 'Job Interview' ? 'e.g., Software engineering role, first job, internship...' : 'e.g., STEM scholarship, need-based, merit-based...'} />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? <><Spinner /> Preparing...</> : 'Generate Interview Prep'}
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
