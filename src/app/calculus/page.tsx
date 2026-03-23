'use client';
import { useState } from 'react';
import { useGeminiStream } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';

const OPERATIONS = [
  { value: 'derivative', label: 'Derivative' },
  { value: 'integral', label: 'Integral' },
  { value: 'limit', label: 'Limit' },
];

export default function CalculusPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [expression, setExpression] = useState('');
  const [operation, setOperation] = useState('derivative');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="∫" title="Calculus Solver" description="Enter an expression and select derivative, integral, or limit for a step-by-step solution." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const operationInstructions: Record<string, string> = {
    derivative: `Find the derivative of the following expression. Show every step:

## Problem
Find $\\frac{d}{dx}$ of the given expression.

## Step-by-Step Solution
1. **Identify applicable rules:** (Power Rule, Product Rule, Quotient Rule, Chain Rule, Trig Derivatives, Exponential/Log Rules, etc.)
2. For each term or component, state which rule applies and apply it
3. Show the intermediate result after each rule application
4. Simplify the result step by step
5. Factor or combine terms if possible

## Final Answer
$$f'(x) = [\\text{simplified derivative}]$$

## Rules Used
Summarize each calculus rule that was applied, with its general form (e.g., "Power Rule: $\\frac{d}{dx}[x^n] = nx^{n-1}$").`,

    integral: `Find the integral (antiderivative) of the following expression. Show every step:

## Problem
Find $\\int$ of the given expression $dx$.

## Step-by-Step Solution
1. **Identify the integration technique:** (Direct integration, u-substitution, integration by parts, partial fractions, trig substitution, etc.)
2. If substitution is needed, clearly define $u$, find $du$, and rewrite the integral
3. Apply the integration rule to each term
4. Show intermediate results
5. Simplify and combine terms
6. Don't forget the constant of integration $+C$ for indefinite integrals

## Final Answer
$$\\int f(x)\\,dx = [\\text{result}] + C$$

## Rules Used
Summarize each integration rule applied with its general form.`,

    limit: `Evaluate the following limit. Show every step:

## Problem
Evaluate the given limit expression.

## Step-by-Step Solution
1. **First attempt:** Try direct substitution
2. If indeterminate form (0/0, ∞/∞, etc.), identify the form
3. **Apply appropriate technique:** (Factoring, rationalization, L'Hôpital's Rule, squeeze theorem, etc.)
4. Show each algebraic manipulation clearly
5. Evaluate the final simplified expression

## Final Answer
$$\\lim_{x \\to a} f(x) = [\\text{result}]$$

## Rules Used
Summarize the limit laws and techniques applied.`,
  };

  const handleGenerate = () => {
    if (!expression.trim() || loading) return;
    generate(`You are an expert calculus tutor. Use LaTeX notation (with $ for inline and $$ for display math) throughout your solution. Be rigorous and show every step clearly.

${operationInstructions[operation]}

## Practice Problem
Suggest a similar problem for the student to try on their own (with answer hidden in a spoiler-style format).

**Expression:** ${expression}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="∫" title="Calculus Solver" description="Enter an expression and select derivative, integral, or limit for a step-by-step solution." aiPowered />
      <Card className="mb-6">
        <Input value={expression} onChange={e => setExpression(e.target.value)} placeholder="e.g., 3x^2 + sin(x), e^(2x) * ln(x), (x^2 - 1)/(x - 1) as x→1" className="mb-4" />
        <Select value={operation} onChange={e => setOperation(e.target.value)}>
          {OPERATIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </Select>
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !expression.trim()}>
            {loading ? <><Spinner /> Solving...</> : 'Solve'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
