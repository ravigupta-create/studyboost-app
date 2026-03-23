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

export default function PhysicsPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [problem, setProblem] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="⚛️" title="Physics Solver" description="Enter a physics problem and get a detailed step-by-step solution." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!problem.trim() || loading) return;
    generate(`You are an expert physics tutor. Solve the following physics problem with a clear, detailed, step-by-step solution. Use proper notation and ALWAYS include units at every step.

**Problem:** ${problem}

## Step 1: Identify Given Information
List all known quantities with their values and units:
- [Variable] = [Value] [Units]

## Step 2: Identify Unknown(s)
What are we solving for?
- [Variable] = ? [Expected units]

## Step 3: Select Relevant Formula(s)
List the formula(s) needed and name the physics principle:
- **[Principle Name]:** [Formula in standard notation]
- Explain why this formula applies to this situation.

## Step 4: Solve Step-by-Step
Show each algebraic step clearly:
1. Start with the formula
2. Rearrange if needed (show the algebra)
3. Substitute known values WITH UNITS
4. Calculate intermediate results
5. Arrive at the final numerical answer

**Show units cancellation explicitly at each step.**

## Step 5: Final Answer
State the final answer clearly:
> **[Variable] = [Value] [Units]**

## Step 6: Sanity Check
- Is the magnitude reasonable? Compare to real-world expectations.
- Are the units correct for the quantity?
- Does the direction/sign make physical sense?

## Concept Review
Briefly explain the underlying physics concept (2-3 sentences) to reinforce learning.

Use LaTeX math notation where helpful (e.g., $F = ma$, $v^2 = v_0^2 + 2a\\Delta x$). Be thorough with units throughout.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="⚛️" title="Physics Solver" description="Enter a physics problem and get a detailed step-by-step solution." aiPowered />
      <Card className="mb-6">
        <Textarea value={problem} onChange={e => setProblem(e.target.value)} placeholder="Enter a physics problem (e.g., A 5 kg box is pushed with 20 N of force on a frictionless surface. What is its acceleration?)" rows={4} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !problem.trim()}>
            {loading ? <><Spinner /> Solving...</> : 'Solve Problem'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
