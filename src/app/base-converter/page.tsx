'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

const BASES = [
  { value: 2, label: 'Binary (2)' },
  { value: 8, label: 'Octal (8)' },
  { value: 10, label: 'Decimal (10)' },
  { value: 16, label: 'Hexadecimal (16)' },
];

function isValidForBase(input: string, base: number): boolean {
  if (!input.trim()) return true;
  const digits = '0123456789ABCDEF'.slice(0, base);
  return input.toUpperCase().split('').every(c => digits.includes(c));
}

function convertBase(input: string, fromBase: number, toBase: number): string {
  if (!input.trim()) return '';
  const decimal = parseInt(input, fromBase);
  if (isNaN(decimal)) return 'Invalid';
  return decimal.toString(toBase).toUpperCase();
}

function getSteps(input: string, fromBase: number, toBase: number): string[] {
  if (!input.trim()) return [];
  const steps: string[] = [];
  const upper = input.toUpperCase();

  if (fromBase !== 10) {
    steps.push(`Step 1: Convert ${upper} (base ${fromBase}) to decimal (base 10)`);
    const digits = upper.split('').reverse();
    const terms: string[] = [];
    digits.forEach((d, i) => {
      const val = parseInt(d, 16);
      terms.push(`${d} x ${fromBase}^${i} = ${val} x ${Math.pow(fromBase, i)} = ${val * Math.pow(fromBase, i)}`);
    });
    terms.reverse().forEach(t => steps.push(`  ${t}`));
    const decimal = parseInt(upper, fromBase);
    steps.push(`  Sum = ${decimal}`);

    if (toBase !== 10) {
      steps.push('');
      steps.push(`Step 2: Convert ${decimal} (base 10) to base ${toBase}`);
      let num = decimal;
      const remainders: string[] = [];
      if (num === 0) {
        steps.push(`  0 in base ${toBase} = 0`);
      } else {
        while (num > 0) {
          const rem = num % toBase;
          const remStr = rem.toString(toBase).toUpperCase();
          steps.push(`  ${num} / ${toBase} = ${Math.floor(num / toBase)} remainder ${remStr}`);
          remainders.push(remStr);
          num = Math.floor(num / toBase);
        }
        steps.push(`  Read remainders bottom to top: ${remainders.reverse().join('')}`);
      }
    }
  } else {
    const decimal = parseInt(upper, 10);
    steps.push(`Step 1: Convert ${decimal} (base 10) to base ${toBase}`);
    let num = decimal;
    const remainders: string[] = [];
    if (num === 0) {
      steps.push(`  0 in base ${toBase} = 0`);
    } else {
      while (num > 0) {
        const rem = num % toBase;
        const remStr = rem.toString(toBase).toUpperCase();
        steps.push(`  ${num} / ${toBase} = ${Math.floor(num / toBase)} remainder ${remStr}`);
        remainders.push(remStr);
        num = Math.floor(num / toBase);
      }
      steps.push(`  Read remainders bottom to top: ${remainders.reverse().join('')}`);
    }
  }

  return steps;
}

export default function BaseConverterPage() {
  const [input, setInput] = useState('42');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);

  const valid = isValidForBase(input, fromBase);
  const result = valid ? convertBase(input, fromBase, toBase) : 'Invalid input';
  const steps = valid && input.trim() && fromBase !== toBase ? getSteps(input, fromBase, toBase) : [];

  const allResults = valid && input.trim() ? BASES.map(b => ({
    base: b.value,
    label: b.label,
    value: convertBase(input, fromBase, b.value),
  })) : [];

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader icon="&#128290;" title="Base Converter" description="Convert numbers between binary, octal, decimal, and hexadecimal." />
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Input Number</label>
            <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Enter number" className={!valid ? 'border-red-500' : ''} />
            {!valid && <p className="text-xs text-red-500 mt-1">Invalid digit for base {fromBase}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">From Base</label>
            <Select value={fromBase} onChange={e => { setFromBase(Number(e.target.value)); setInput(''); }}>
              {BASES.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">To Base</label>
            <Select value={toBase} onChange={e => setToBase(Number(e.target.value))}>
              {BASES.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
            </Select>
          </div>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
          <p className="text-sm text-gray-500">Result</p>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 font-mono">{result}</p>
        </div>
      </Card>
      {allResults.length > 0 && (
        <Card className="mb-6">
          <h2 className="text-lg font-semibold mb-3">All Bases</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allResults.map(r => (
              <div key={r.base} className={`p-3 rounded-lg text-center ${r.base === toBase ? 'bg-purple-100 dark:bg-purple-900/30 ring-2 ring-purple-400' : 'bg-gray-50 dark:bg-gray-700/50'}`}>
                <p className="text-xs text-gray-500">{r.label}</p>
                <p className="font-mono font-bold text-sm break-all">{r.value}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
      {steps.length > 0 && (
        <Card>
          <h2 className="text-lg font-semibold mb-3">Step-by-Step Conversion</h2>
          <div className="font-mono text-sm space-y-1 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            {steps.map((s, i) => (
              <p key={i} className={s.startsWith('Step') ? 'font-bold text-purple-600 dark:text-purple-400 mt-2' : 'text-gray-700 dark:text-gray-300'}>{s}</p>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
