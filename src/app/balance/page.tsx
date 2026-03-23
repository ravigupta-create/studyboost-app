'use client';
import { useState } from 'react';
import { useGeminiStream } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';

export default function BalancePage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [equation, setEquation] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="⚗️" title="Equation Balancer" description="Enter an unbalanced chemical equation and see it balanced step-by-step." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!equation.trim() || loading) return;
    generate(`You are a chemistry tutor. Balance the following chemical equation step-by-step. Show your complete thought process so the student can learn the method.

**Unbalanced Equation:** ${equation}

## Step 1: Write the Unbalanced Equation
Show the equation clearly with proper chemical formulas. Use → for the reaction arrow.

## Step 2: Identify All Elements
List every element present and count atoms on each side:

| Element | Reactant Side | Product Side | Balanced? |
|---------|:---:|:---:|:---:|
| [Element] | [count] | [count] | Yes/No |

## Step 3: Balance Step-by-Step
For each element that needs balancing:
- Start with the most complex molecule
- Explain which coefficient you're adding and why
- Show the updated equation after each change
- Recount atoms to verify

## Step 4: Balanced Equation
Show the final balanced equation clearly.

## Step 5: Verification
Create a final atom count table proving both sides are equal:

| Element | Reactant Side | Product Side | Balanced? |
|---------|:---:|:---:|:---:|
| [Element] | [count] | [count] | ✓ |

## Reaction Type
Identify the reaction type: Synthesis, Decomposition, Single Replacement, Double Replacement, Combustion, or Acid-Base. Briefly explain why.

## Key Concept
Explain the Law of Conservation of Mass in 1-2 sentences and how it relates to balancing equations.

Use proper subscripts where possible. If the input is not a valid chemical equation, politely explain and ask for a corrected version.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="⚗️" title="Equation Balancer" description="Enter an unbalanced chemical equation and see it balanced step-by-step." aiPowered />
      <Card className="mb-6">
        <Input value={equation} onChange={e => setEquation(e.target.value)} placeholder="e.g., Fe + O2 → Fe2O3" />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Use + for reactants/products, → or {'->'} for the reaction arrow</p>
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !equation.trim()}>
            {loading ? <><Spinner /> Balancing...</> : 'Balance Equation'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
