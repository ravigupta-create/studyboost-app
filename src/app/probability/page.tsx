'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MathText } from '@/components/shared/MathText';

function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n <= 1) return 1;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function nPr(n: number, r: number): number {
  if (r > n || n < 0 || r < 0) return NaN;
  return factorial(n) / factorial(n - r);
}

function nCr(n: number, r: number): number {
  if (r > n || n < 0 || r < 0) return NaN;
  return factorial(n) / (factorial(r) * factorial(n - r));
}

function binomial(n: number, k: number, p: number): number {
  if (k > n || k < 0 || p < 0 || p > 1) return NaN;
  return nCr(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

type Mode = 'nPr' | 'nCr' | 'binomial' | 'factorial';

export default function ProbabilityPage() {
  const [mode, setMode] = useState<Mode>('nCr');
  const [n, setN] = useState('5');
  const [r, setR] = useState('2');
  const [p, setP] = useState('0.5');

  const nVal = parseInt(n) || 0;
  const rVal = parseInt(r) || 0;
  const pVal = parseFloat(p) || 0;

  const modes: { id: Mode; label: string }[] = [
    { id: 'nPr', label: 'Permutations (nPr)' },
    { id: 'nCr', label: 'Combinations (nCr)' },
    { id: 'binomial', label: 'Binomial P(X=k)' },
    { id: 'factorial', label: 'Factorial (n!)' },
  ];

  let result: number = 0;
  let formula = '';
  let steps: string[] = [];

  switch (mode) {
    case 'nPr':
      result = nPr(nVal, rVal);
      formula = `$P(${nVal}, ${rVal}) = \\frac{${nVal}!}{(${nVal}-${rVal})!}$`;
      steps = [
        `$P(n, r) = \\frac{n!}{(n-r)!}$`,
        `$= \\frac{${nVal}!}{${nVal - rVal}!}$`,
        `$= \\frac{${factorial(nVal)}}{${factorial(nVal - rVal)}}$`,
        `$= ${isNaN(result) ? 'undefined' : result}$`,
      ];
      break;
    case 'nCr':
      result = nCr(nVal, rVal);
      formula = `$C(${nVal}, ${rVal}) = \\frac{${nVal}!}{${rVal}!(${nVal}-${rVal})!}$`;
      steps = [
        `$C(n, r) = \\frac{n!}{r!(n-r)!}$`,
        `$= \\frac{${nVal}!}{${rVal}! \\cdot ${nVal - rVal}!}$`,
        `$= \\frac{${factorial(nVal)}}{${factorial(rVal)} \\cdot ${factorial(nVal - rVal)}}$`,
        `$= ${isNaN(result) ? 'undefined' : result}$`,
      ];
      break;
    case 'binomial':
      result = binomial(nVal, rVal, pVal);
      formula = `$P(X=${rVal}) = \\binom{${nVal}}{${rVal}} \\cdot ${pVal}^{${rVal}} \\cdot (1-${pVal})^{${nVal - rVal}}$`;
      steps = [
        `$P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}$`,
        `$\\binom{${nVal}}{${rVal}} = ${nCr(nVal, rVal)}$`,
        `$p^k = ${pVal}^{${rVal}} = ${Math.pow(pVal, rVal).toFixed(6)}$`,
        `$(1-p)^{n-k} = ${(1 - pVal).toFixed(4)}^{${nVal - rVal}} = ${Math.pow(1 - pVal, nVal - rVal).toFixed(6)}$`,
        `$= ${nCr(nVal, rVal)} \\cdot ${Math.pow(pVal, rVal).toFixed(6)} \\cdot ${Math.pow(1 - pVal, nVal - rVal).toFixed(6)}$`,
        `$= ${isNaN(result) ? 'undefined' : result.toFixed(6)}$`,
      ];
      break;
    case 'factorial':
      result = factorial(nVal);
      formula = `$${nVal}! = ${isNaN(result) ? 'undefined' : result}$`;
      steps = [`$n! = 1 \\cdot 2 \\cdot 3 \\cdot ... \\cdot n$`];
      if (nVal <= 10 && nVal >= 0) {
        const terms = [];
        for (let i = 1; i <= nVal; i++) terms.push(i);
        steps.push(`$${nVal}! = ${terms.join(' \\cdot ')} = ${result}$`);
      } else {
        steps.push(`$${nVal}! = ${isNaN(result) ? 'undefined' : result}$`);
      }
      break;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader icon="&#127922;" title="Probability Calculator" description="Calculate permutations, combinations, binomial probability, and factorials." />
      <div className="flex flex-wrap gap-2 mb-6">
        {modes.map(m => (
          <button key={m.id} onClick={() => setMode(m.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === m.id ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'}`}>
            {m.label}
          </button>
        ))}
      </div>
      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Input Values</h2>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">n</label>
            <Input type="number" value={n} onChange={e => setN(e.target.value)} className="w-24" min="0" max="170" />
          </div>
          {mode !== 'factorial' && (
            <div>
              <label className="block text-sm font-medium mb-1">{mode === 'binomial' ? 'k' : 'r'}</label>
              <Input type="number" value={r} onChange={e => setR(e.target.value)} className="w-24" min="0" />
            </div>
          )}
          {mode === 'binomial' && (
            <div>
              <label className="block text-sm font-medium mb-1">p (probability)</label>
              <Input type="number" value={p} onChange={e => setP(e.target.value)} className="w-32" min="0" max="1" step="0.01" />
            </div>
          )}
        </div>
      </Card>
      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Formula</h2>
        <div className="text-lg"><MathText text={formula} /></div>
      </Card>
      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Step-by-Step</h2>
        <div className="space-y-2">
          {steps.map((s, i) => (
            <div key={i} className="py-1"><MathText text={s} /></div>
          ))}
        </div>
      </Card>
      <Card className="bg-purple-50 dark:bg-purple-900/20 text-center">
        <p className="text-sm text-gray-500">Result</p>
        <p className="text-3xl font-bold text-purple-600">{isNaN(result) ? 'Undefined' : result > 1e15 ? result.toExponential(4) : result.toLocaleString()}</p>
      </Card>
    </div>
  );
}
