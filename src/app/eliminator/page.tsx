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

export default function EliminatorPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [input, setInput] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="❌" title="Answer Eliminator" description="Learn to strategically eliminate wrong answers on MC questions." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!input.trim() || loading) return;
    generate(`You are a test-taking strategy expert. A student has pasted a multiple choice question. Walk them through the strategic elimination process step by step — teaching them HOW to think through MC questions, not just giving the answer.

The question:
"${input}"

Format your response exactly as:

## 📋 The Question
Restate the question clearly, identifying what it's actually asking.

## 🧠 Step 1: Understand What's Being Asked
- Identify the key concept being tested
- Note any qualifiers (BEST, MOST, LEAST, NOT, ALWAYS, NEVER)
- Identify what type of knowledge is needed (recall, application, analysis)

## ❌ Step 2: Strategic Elimination

For each answer option, analyze it:

### Option A: [restate it]
- **Verdict: ❌ ELIMINATE** or **✅ KEEP**
- **Why:** Specific reasoning for why this is wrong/could be right
- **Red flag (if wrong):** What makes this a tempting but incorrect "distractor"

### Option B: [restate it]
[Same format]

### Option C: [restate it]
[Same format]

### Option D: [restate it]
[Same format]

## ✅ Step 3: The Correct Answer
**Answer: [Letter]** — [restate the correct option]

**Full Explanation:** Thorough explanation of why this is definitively correct, with supporting evidence/reasoning.

## 💡 Test-Taking Lesson
What general strategy or pattern can the student learn from this question to apply to similar questions in the future?`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="❌" title="Answer Eliminator" description="Learn to strategically eliminate wrong answers on MC questions." aiPowered />
      <Card className="mb-6">
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste a multiple choice question with all options...&#10;&#10;Example:&#10;What is the primary function of mitochondria?&#10;A) Protein synthesis&#10;B) Cell division&#10;C) Energy production (ATP)&#10;D) DNA replication" rows={6} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !input.trim()}>
            {loading ? <><Spinner /> Eliminating...</> : 'Eliminate Answers'}
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
