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

export default function StoichiometryPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [problem, setProblem] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="⚖️" title="Stoichiometry Solver" description="Enter a chemistry problem and get a step-by-step solution with unit cancellation." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!problem.trim() || loading) return;
    generate(`You are an expert chemistry tutor. Solve the following stoichiometry problem with a clear, detailed step-by-step solution. Show all unit conversions and cancellations explicitly.

**Problem:** ${problem}

## Step 1: Write the Balanced Chemical Equation
- Write the equation with correct formulas
- If not already balanced, balance it and show the process
- Identify the mole ratios between relevant species

## Step 2: Identify Given Information
- List all given quantities with values and units
- Identify what we need to find
- Note the molar masses of relevant compounds (show calculation from periodic table values)

## Step 3: Set Up Conversion Factors
Show the "road map" for converting from given to unknown:
Given → [conversion] → moles of given → [mole ratio] → moles of unknown → [conversion] → answer

## Step 4: Calculate
Show the dimensional analysis with explicit unit cancellation:
$$[\\text{Given value}] \\times \\frac{[\\text{conversion factor 1}]}{[\\text{units to cancel}]} \\times \\frac{[\\text{mole ratio}]}{[\\text{units to cancel}]} \\times \\frac{[\\text{conversion factor 2}]}{[\\text{units to cancel}]}$$

Show units crossing out at each step. Calculate the numerical result.

## Step 5: Check for Limiting Reagent (if applicable)
If multiple reactants are given, determine which is the limiting reagent and calculate based on it.

## Final Answer
State the answer with proper significant figures and units.
> **Answer: [Value] [Units]**

## Key Concepts
Briefly explain the stoichiometry concept(s) used (mole ratios, limiting reagent, percent yield, etc.).

Use proper chemical notation throughout. Show all arithmetic clearly.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="⚖️" title="Stoichiometry Solver" description="Enter a chemistry problem and get a step-by-step solution with unit cancellation." aiPowered />
      <Card className="mb-6">
        <Textarea value={problem} onChange={e => setProblem(e.target.value)} placeholder="e.g., How many grams of CO2 are produced when 10g of CH4 undergoes complete combustion?" rows={4} />
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
