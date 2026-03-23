'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

function calcStats(nums: number[]) {
  const sorted = [...nums].sort((a, b) => a - b);
  const n = sorted.length;
  const sum = sorted.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];

  const freq: Record<number, number> = {};
  sorted.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
  const maxFreq = Math.max(...Object.values(freq));
  const modes = Object.entries(freq).filter(([, f]) => f === maxFreq && f > 1).map(([v]) => Number(v));

  const variance = sorted.reduce((s, v) => s + (v - mean) ** 2, 0) / n;
  const stdDev = Math.sqrt(variance);
  const sampleVariance = n > 1 ? sorted.reduce((s, v) => s + (v - mean) ** 2, 0) / (n - 1) : 0;

  const q1Idx = (n - 1) * 0.25;
  const q3Idx = (n - 1) * 0.75;
  const q1 = sorted[Math.floor(q1Idx)] + (q1Idx % 1) * (sorted[Math.ceil(q1Idx)] - sorted[Math.floor(q1Idx)]);
  const q3 = sorted[Math.floor(q3Idx)] + (q3Idx % 1) * (sorted[Math.ceil(q3Idx)] - sorted[Math.floor(q3Idx)]);
  const iqr = q3 - q1;

  return { count: n, sum, mean, median, modes, range: sorted[n - 1] - sorted[0], variance, sampleVariance, stdDev, q1, q3, iqr, min: sorted[0], max: sorted[n - 1], sorted };
}

export default function StatisticsPage() {
  const [input, setInput] = useState('');
  const [stats, setStats] = useState<ReturnType<typeof calcStats> | null>(null);

  const handleCalc = () => {
    const nums = input.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
    if (nums.length < 2) return;
    setStats(calcStats(nums));
  };

  const r = (n: number) => Math.round(n * 10000) / 10000;

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader icon="&#128202;" title="Statistics Calculator" description="Calculate descriptive statistics and visualize with a box plot." />
      <Card className="mb-6">
        <label className="block text-sm font-medium mb-2">Enter comma-separated numbers</label>
        <Input placeholder="e.g., 12, 15, 18, 22, 25, 28, 30, 35" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleCalc()} />
        <Button className="mt-3" onClick={handleCalc} disabled={input.split(/[,\s]+/).map(Number).filter(n => !isNaN(n)).length < 2}>Calculate</Button>
      </Card>
      {stats && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Count', val: stats.count },
              { label: 'Sum', val: r(stats.sum) },
              { label: 'Mean', val: r(stats.mean) },
              { label: 'Median', val: r(stats.median) },
              { label: 'Mode', val: stats.modes.length > 0 ? stats.modes.join(', ') : 'None' },
              { label: 'Range', val: r(stats.range) },
              { label: 'Std Dev (pop)', val: r(stats.stdDev) },
              { label: 'Variance (pop)', val: r(stats.variance) },
              { label: 'Q1', val: r(stats.q1) },
              { label: 'Q3', val: r(stats.q3) },
              { label: 'IQR', val: r(stats.iqr) },
              { label: 'Min / Max', val: `${stats.min} / ${stats.max}` },
            ].map(s => (
              <Card key={s.label} className="text-center py-3">
                <p className="text-lg font-bold text-purple-600">{s.val}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </Card>
            ))}
          </div>
          <Card>
            <h2 className="text-lg font-semibold mb-3">Box Plot</h2>
            <svg viewBox="0 0 500 120" className="w-full">
              {(() => {
                const pad = 40;
                const w = 420;
                const scale = (v: number) => pad + ((v - stats.min) / (stats.max - stats.min || 1)) * w;
                const y = 50, h = 40;
                return (
                  <>
                    <line x1={scale(stats.min)} y1={y + h / 2} x2={scale(stats.q1)} y2={y + h / 2} stroke="#8b5cf6" strokeWidth="2" />
                    <line x1={scale(stats.min)} y1={y + 10} x2={scale(stats.min)} y2={y + h - 10} stroke="#8b5cf6" strokeWidth="2" />
                    <rect x={scale(stats.q1)} y={y} width={scale(stats.q3) - scale(stats.q1)} height={h} fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" rx="3" />
                    <line x1={scale(stats.median)} y1={y} x2={scale(stats.median)} y2={y + h} stroke="#7c3aed" strokeWidth="3" />
                    <line x1={scale(stats.q3)} y1={y + h / 2} x2={scale(stats.max)} y2={y + h / 2} stroke="#8b5cf6" strokeWidth="2" />
                    <line x1={scale(stats.max)} y1={y + 10} x2={scale(stats.max)} y2={y + h - 10} stroke="#8b5cf6" strokeWidth="2" />
                    <text x={scale(stats.min)} y={y + h + 16} textAnchor="middle" fontSize="11" fill="#6b7280">{stats.min}</text>
                    <text x={scale(stats.q1)} y={y - 6} textAnchor="middle" fontSize="11" fill="#6b7280">Q1: {r(stats.q1)}</text>
                    <text x={scale(stats.median)} y={y + h + 16} textAnchor="middle" fontSize="11" fill="#7c3aed">Med: {r(stats.median)}</text>
                    <text x={scale(stats.q3)} y={y - 6} textAnchor="middle" fontSize="11" fill="#6b7280">Q3: {r(stats.q3)}</text>
                    <text x={scale(stats.max)} y={y + h + 16} textAnchor="middle" fontSize="11" fill="#6b7280">{stats.max}</text>
                  </>
                );
              })()}
            </svg>
          </Card>
        </>
      )}
    </div>
  );
}
