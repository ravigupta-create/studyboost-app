'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

function countSigFigs(numStr: string): { count: number; explanation: string[] } {
  const clean = numStr.trim().replace(/^[+-]/, '');
  if (!clean || isNaN(Number(clean))) return { count: 0, explanation: ['Invalid number'] };

  const explanation: string[] = [];
  let str = clean;

  // Handle scientific notation
  if (str.includes('e') || str.includes('E')) {
    const parts = str.split(/[eE]/);
    str = parts[0];
    explanation.push(`Scientific notation: only count digits in ${parts[0]}`);
  }

  const hasDecimal = str.includes('.');
  const digits = str.replace('.', '');

  if (digits === '0'.repeat(digits.length)) {
    if (hasDecimal) {
      return { count: str.replace('.', '').replace(/^0+/, '').length || 1, explanation: ['Zero with decimal point: trailing zeros are significant'] };
    }
    return { count: 1, explanation: ['Zero has 1 significant figure'] };
  }

  // Remove leading zeros
  const withoutLeading = digits.replace(/^0+/, '');
  const leadingZeros = digits.length - withoutLeading.length;
  if (leadingZeros > 0) explanation.push(`${leadingZeros} leading zero(s) are NOT significant`);

  let sigDigits: string;
  if (hasDecimal) {
    sigDigits = withoutLeading;
    if (sigDigits.endsWith('0')) explanation.push('Trailing zeros AFTER decimal point ARE significant');
  } else {
    sigDigits = withoutLeading.replace(/0+$/, '');
    const trailingZeros = withoutLeading.length - sigDigits.length;
    if (trailingZeros > 0) explanation.push(`${trailingZeros} trailing zero(s) without decimal are ambiguous (counted as NOT significant)`);
  }

  const count = hasDecimal ? withoutLeading.length : sigDigits.length;
  explanation.push(`Significant figures: ${count}`);
  return { count, explanation };
}

function applyOperation(a: string, b: string, op: string): { result: string; sigFigs: number; explanation: string } {
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  if (isNaN(numA) || isNaN(numB)) return { result: 'Invalid', sigFigs: 0, explanation: 'Invalid input' };

  const sfA = countSigFigs(a).count;
  const sfB = countSigFigs(b).count;

  if (op === '+' || op === '-') {
    const raw = op === '+' ? numA + numB : numA - numB;
    const decA = a.includes('.') ? a.split('.')[1]?.length || 0 : 0;
    const decB = b.includes('.') ? b.split('.')[1]?.length || 0 : 0;
    const minDec = Math.min(decA, decB);
    const result = raw.toFixed(minDec);
    return { result, sigFigs: countSigFigs(result).count, explanation: `Addition/Subtraction: round to fewest decimal places (${minDec})` };
  } else {
    const raw = op === '*' ? numA * numB : numA / numB;
    const minSf = Math.min(sfA, sfB);
    const result = raw.toPrecision(minSf);
    return { result, sigFigs: minSf, explanation: `Multiplication/Division: round to fewest sig figs (${minSf})` };
  }
}

const RULES = [
  { rule: 'All non-zero digits are significant', example: '123.45 has 5 sig figs' },
  { rule: 'Zeros between non-zero digits are significant', example: '1002 has 4 sig figs' },
  { rule: 'Leading zeros are NOT significant', example: '0.0042 has 2 sig figs' },
  { rule: 'Trailing zeros after decimal point ARE significant', example: '2.300 has 4 sig figs' },
  { rule: 'Trailing zeros in whole numbers are ambiguous', example: '1500 has 2 (or 3 or 4) sig figs' },
  { rule: 'Addition/Subtraction: result has fewest decimal places', example: '12.11 + 1.3 = 13.4' },
  { rule: 'Multiplication/Division: result has fewest sig figs', example: '2.5 x 3.42 = 8.6' },
];

export default function SigFigsPage() {
  const [number, setNumber] = useState('0.00340');
  const [numA, setNumA] = useState('12.11');
  const [numB, setNumB] = useState('1.3');
  const [op, setOp] = useState('+');

  const analysis = countSigFigs(number);
  const opResult = applyOperation(numA, numB, op);

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader icon="&#128290;" title="Significant Figures" description="Count sig figs and perform operations with correct significant figure rules." />

      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Count Significant Figures</h2>
        <Input value={number} onChange={e => setNumber(e.target.value)} placeholder="Enter a number" />
        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-2xl font-bold text-purple-600 text-center mb-2">{analysis.count} significant figure{analysis.count !== 1 ? 's' : ''}</p>
          <div className="space-y-1">
            {analysis.explanation.map((e, i) => (
              <p key={i} className="text-sm text-gray-600 dark:text-gray-400">{e}</p>
            ))}
          </div>
          {number.trim() && !isNaN(Number(number)) && (
            <div className="mt-3 flex justify-center gap-1">
              {number.replace(/^[+-]/, '').split('').map((ch, i) => {
                if (ch === '.' || ch === 'e' || ch === 'E') return <span key={i} className="text-lg font-mono text-gray-400">{ch}</span>;
                const beforeDecimal = !number.includes('.') || i < number.indexOf('.');
                const isLeadingZero = ch === '0' && number.replace(/^[+-]/, '').replace('.', '').indexOf(ch) === i - (number.includes('.') && i > number.indexOf('.') ? 1 : 0) && /^[+-]?0*\.?0*/.test(number.slice(0, i + 1).replace(/^[+-]/, ''));
                return (
                  <span key={i} className={`text-lg font-mono px-1 rounded ${isLeadingZero ? 'text-gray-400' : 'bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 font-bold'}`}>
                    {ch}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Operation Mode</h2>
        <div className="flex items-center gap-2 mb-4">
          <Input value={numA} onChange={e => setNumA(e.target.value)} className="flex-1" placeholder="Number A" />
          <Select value={op} onChange={e => setOp(e.target.value)} className="w-20">
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">&times;</option>
            <option value="/">&divide;</option>
          </Select>
          <Input value={numB} onChange={e => setNumB(e.target.value)} className="flex-1" placeholder="Number B" />
        </div>
        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>{numA} has {countSigFigs(numA).count} sig figs</span>
            <span>{numB} has {countSigFigs(numB).count} sig figs</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600 text-center">{opResult.result}</p>
          <p className="text-sm text-gray-500 text-center mt-1">{opResult.explanation}</p>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-3">Rules Reference</h2>
        <div className="space-y-3">
          {RULES.map((r, i) => (
            <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="font-medium text-sm">{r.rule}</p>
              <p className="text-xs text-gray-500 mt-1">Example: {r.example}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
