'use client';
import { useState } from 'react';
import { useGeminiStream } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';

const SECTIONS = [
  { value: 'reading', label: 'Reading' },
  { value: 'writing', label: 'Writing & Language' },
  { value: 'math', label: 'Math' },
];

const DIFFICULTIES = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export default function SATPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [section, setSection] = useState('math');
  const [difficulty, setDifficulty] = useState('medium');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🎯" title="SAT Prep" description="Generate SAT-style practice questions by section and difficulty." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const sectionLabel = SECTIONS.find(s => s.value === section)?.label;
  const diffLabel = DIFFICULTIES.find(d => d.value === difficulty)?.label;

  const sectionInstructions: Record<string, string> = {
    reading: `Generate 5 SAT Reading section questions at ${diffLabel} difficulty.

Include a short passage (150-200 words) — it can be about science, history, social science, or literature. Then provide 5 questions based on the passage:

For each question:
- **Question X:** [Question text]
  - (A) [Option]
  - (B) [Option]
  - (C) [Option]
  - (D) [Option]

Question types should include: main idea, evidence-based, vocabulary in context, inference, and author's purpose/tone.

After all 5 questions, provide:
## Answer Key & Explanations
For each question:
- **Q1: (X)** — [2-3 sentence explanation of why this is correct and why the other options are wrong]`,

    writing: `Generate 5 SAT Writing & Language section questions at ${diffLabel} difficulty.

Include a short passage (150-200 words) with underlined portions [numbered 1-5] that may contain errors or could be improved. Then provide 5 questions, one for each underlined portion:

For each question:
- **Question X:** [Which change, if any, should be made to the underlined portion?]
  - (A) NO CHANGE
  - (B) [Option]
  - (C) [Option]
  - (D) [Option]

Question types should include: grammar/usage, punctuation, sentence structure, transitions, and concision/style.

After all 5 questions, provide:
## Answer Key & Explanations
For each question:
- **Q1: (X)** — [2-3 sentence explanation citing the grammar rule or writing principle]`,

    math: `Generate 5 SAT Math section questions at ${diffLabel} difficulty.

Mix question types: some multiple choice, some grid-in (free response). Cover different topics appropriate for the difficulty:
- Easy: Linear equations, ratios, percentages, basic geometry
- Medium: Systems of equations, quadratics, statistics, circle theorems
- Hard: Advanced algebra, trigonometry, complex word problems, coordinate geometry

For each question:
- **Question X:** [Clear problem statement with any necessary context]
  - Use LaTeX notation for math: $x^2 + 3x - 4 = 0$
  - For multiple choice: provide options (A)-(D)
  - For grid-in: indicate "Grid-in your answer"

After all 5 questions, provide:
## Answer Key & Explanations
For each question:
- **Q1: [Answer]** — [Complete step-by-step solution showing all work]`,
  };

  const handleGenerate = () => {
    if (loading) return;
    generate(`You are an SAT prep tutor who writes realistic, high-quality practice questions that match the actual SAT format and difficulty. Generate questions for the ${sectionLabel} section at ${diffLabel} difficulty.

${sectionInstructions[section]}

## Test-Taking Tips
Provide 2-3 specific tips for this section and difficulty level.

Make the questions feel authentic to the real SAT. Ensure answer explanations are thorough and educational.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🎯" title="SAT Prep" description="Generate SAT-style practice questions by section and difficulty." aiPowered />
      <Card className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Section</label>
            <Select value={section} onChange={e => setSection(e.target.value)}>
              {SECTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Difficulty</label>
            <Select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
              {DIFFICULTIES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </Select>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? <><Spinner /> Generating...</> : 'Generate Questions'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
