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

export default function GeometryVizPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [input, setInput] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="📐" title="Geometry Explainer" description="Enter a geometry problem or theorem for a detailed explanation with proofs and examples." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!input.trim() || loading) return;
    generate(`You are a geometry teacher who excels at making geometric concepts clear and visual through text descriptions. Address the following geometry problem or theorem:

**Input:** ${input}

## Theorem/Concept Statement
State the relevant theorem, postulate, or geometric concept formally and precisely. If solving a problem, state what principle(s) apply.

## Visual Description
Since we cannot draw diagrams, provide a detailed text description of the geometric figure(s) involved:
- Label all points, lines, and angles
- Describe the spatial relationships
- Use ASCII art if it helps illustrate the concept (simple diagrams using characters)

## Proof/Explanation
Provide a clear step-by-step proof or explanation:

| Step | Statement | Reason |
|------|-----------|--------|
| 1 | [Statement] | [Given/Theorem/Definition] |
| 2 | [Statement] | [Reason] |
| ... | ... | ... |

If solving a problem, show the complete solution with all geometric reasoning.

## Worked Example
Provide a complete worked example applying this concept:
- State the problem clearly
- Show the complete solution with all steps
- Include all relevant calculations
- Reference the theorem/concept being applied

## Key Formulas
List any relevant formulas with explanations:
- $[Formula]$ — [what each variable represents]

## Practice Problem
Provide one practice problem for the student to try:
- **Problem:** [Clear problem statement]
- **Hint:** [A helpful hint without giving away the answer]
- **Answer:** [Final answer only, so the student can check their work]

## Common Mistakes
List 2-3 common mistakes students make with this concept and how to avoid them.

Use LaTeX math notation for formulas and expressions.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="📐" title="Geometry Explainer" description="Enter a geometry problem or theorem for a detailed explanation with proofs and examples." aiPowered />
      <Card className="mb-6">
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter a geometry problem or ask about a theorem (e.g., 'Pythagorean theorem', 'Find the area of a triangle with sides 3, 4, 5')" rows={4} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !input.trim()}>
            {loading ? <><Spinner /> Explaining...</> : 'Explain'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
