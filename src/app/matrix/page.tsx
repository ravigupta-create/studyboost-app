'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

type Matrix = number[][];

function createMatrix(r: number, c: number): Matrix {
  return Array.from({ length: r }, () => Array(c).fill(0));
}

function addM(a: Matrix, b: Matrix): Matrix | null {
  if (a.length !== b.length || a[0].length !== b[0].length) return null;
  return a.map((row, i) => row.map((v, j) => v + b[i][j]));
}

function subM(a: Matrix, b: Matrix): Matrix | null {
  if (a.length !== b.length || a[0].length !== b[0].length) return null;
  return a.map((row, i) => row.map((v, j) => v - b[i][j]));
}

function mulM(a: Matrix, b: Matrix): Matrix | null {
  if (a[0].length !== b.length) return null;
  const r = a.length, c = b[0].length, n = a[0].length;
  const res = createMatrix(r, c);
  for (let i = 0; i < r; i++)
    for (let j = 0; j < c; j++)
      for (let k = 0; k < n; k++)
        res[i][j] += a[i][k] * b[k][j];
  return res;
}

function transpose(m: Matrix): Matrix {
  return m[0].map((_, j) => m.map(row => row[j]));
}

function det(m: Matrix): number | null {
  const n = m.length;
  if (n !== m[0].length || n > 4) return null;
  if (n === 1) return m[0][0];
  if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  let result = 0;
  for (let j = 0; j < n; j++) {
    const sub: Matrix = [];
    for (let i = 1; i < n; i++) {
      sub.push([...m[i].slice(0, j), ...m[i].slice(j + 1)]);
    }
    result += (j % 2 === 0 ? 1 : -1) * m[0][j] * (det(sub) ?? 0);
  }
  return result;
}

function scalarMul(m: Matrix, s: number): Matrix {
  return m.map(row => row.map(v => v * s));
}

function MatrixInput({ label, matrix, setMatrix, rows, cols, setRows, setCols }: {
  label: string; matrix: Matrix; setMatrix: (m: Matrix) => void;
  rows: number; cols: number; setRows: (n: number) => void; setCols: (n: number) => void;
}) {
  const updateSize = (r: number, c: number) => {
    setRows(r); setCols(c);
    const m = createMatrix(r, c);
    for (let i = 0; i < Math.min(r, matrix.length); i++)
      for (let j = 0; j < Math.min(c, matrix[0]?.length || 0); j++)
        m[i][j] = matrix[i][j];
    setMatrix(m);
  };

  return (
    <div>
      <h3 className="text-sm font-semibold mb-2">{label}</h3>
      <div className="flex gap-2 mb-2">
        <Select value={rows} onChange={e => updateSize(Number(e.target.value), cols)} className="w-20">
          {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} rows</option>)}
        </Select>
        <Select value={cols} onChange={e => updateSize(rows, Number(e.target.value))} className="w-20">
          {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} cols</option>)}
        </Select>
      </div>
      <div className="inline-block border-l-2 border-r-2 border-gray-400 dark:border-gray-500 px-2 py-1 rounded">
        {matrix.map((row, i) => (
          <div key={i} className="flex gap-1 mb-1">
            {row.map((v, j) => (
              <input key={j} type="number" value={v} onChange={e => {
                const nm = matrix.map(r => [...r]); nm[i][j] = Number(e.target.value) || 0; setMatrix(nm);
              }} className="w-14 text-center border border-gray-300 dark:border-gray-600 rounded px-1 py-1 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function MatrixDisplay({ label, matrix }: { label: string; matrix: Matrix }) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-2 text-emerald-600">{label}</h3>
      <div className="inline-block border-l-2 border-r-2 border-emerald-400 px-2 py-1 rounded">
        {matrix.map((row, i) => (
          <div key={i} className="flex gap-1 mb-1">
            {row.map((v, j) => (
              <div key={j} className="w-14 text-center py-1 text-sm font-mono bg-emerald-50 dark:bg-emerald-900/20 rounded text-gray-900 dark:text-gray-100">
                {Math.round(v * 10000) / 10000}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MatrixPage() {
  const [r1, setR1] = useState(2); const [c1, setC1] = useState(2);
  const [r2, setR2] = useState(2); const [c2, setC2] = useState(2);
  const [m1, setM1] = useState<Matrix>(createMatrix(2, 2));
  const [m2, setM2] = useState<Matrix>(createMatrix(2, 2));
  const [result, setResult] = useState<Matrix | null>(null);
  const [scalar, setScalar] = useState(2);
  const [error, setError] = useState('');
  const [resultLabel, setResultLabel] = useState('');

  const doOp = (op: string) => {
    setError(''); setResult(null);
    let res: Matrix | null = null;
    let label = '';
    switch (op) {
      case 'add': res = addM(m1, m2); label = 'A + B'; if (!res) setError('Matrices must have same dimensions for addition.'); break;
      case 'sub': res = subM(m1, m2); label = 'A - B'; if (!res) setError('Matrices must have same dimensions for subtraction.'); break;
      case 'mul': res = mulM(m1, m2); label = 'A x B'; if (!res) setError('A columns must equal B rows for multiplication.'); break;
      case 'transA': res = transpose(m1); label = 'Transpose(A)'; break;
      case 'transB': res = transpose(m2); label = 'Transpose(B)'; break;
      case 'detA': {
        const d = det(m1);
        if (d === null) { setError('Determinant requires square matrix (max 4x4).'); return; }
        setResultLabel(`det(A) = ${Math.round(d * 10000) / 10000}`); return;
      }
      case 'detB': {
        const d = det(m2);
        if (d === null) { setError('Determinant requires square matrix (max 4x4).'); return; }
        setResultLabel(`det(B) = ${Math.round(d * 10000) / 10000}`); return;
      }
      case 'scalarA': res = scalarMul(m1, scalar); label = `${scalar} x A`; break;
      case 'scalarB': res = scalarMul(m2, scalar); label = `${scalar} x B`; break;
    }
    if (res) { setResult(res); setResultLabel(label); }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader icon="&#129518;" title="Matrix Calculator" description="Perform matrix operations: add, subtract, multiply, transpose, determinant." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <MatrixInput label="Matrix A" matrix={m1} setMatrix={setM1} rows={r1} cols={c1} setRows={setR1} setCols={setC1} />
        </Card>
        <Card>
          <MatrixInput label="Matrix B" matrix={m2} setMatrix={setM2} rows={r2} cols={c2} setRows={setR2} setCols={setC2} />
        </Card>
      </div>
      <Card className="mb-6">
        <h3 className="text-sm font-semibold mb-3">Operations</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <Button size="sm" onClick={() => doOp('add')}>A + B</Button>
          <Button size="sm" onClick={() => doOp('sub')}>A - B</Button>
          <Button size="sm" onClick={() => doOp('mul')}>A x B</Button>
          <Button size="sm" variant="secondary" onClick={() => doOp('transA')}>Transpose A</Button>
          <Button size="sm" variant="secondary" onClick={() => doOp('transB')}>Transpose B</Button>
          <Button size="sm" variant="secondary" onClick={() => doOp('detA')}>det(A)</Button>
          <Button size="sm" variant="secondary" onClick={() => doOp('detB')}>det(B)</Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Scalar:</span>
          <input type="number" value={scalar} onChange={e => setScalar(Number(e.target.value))} className="w-20 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
          <Button size="sm" variant="secondary" onClick={() => doOp('scalarA')}>Scalar x A</Button>
          <Button size="sm" variant="secondary" onClick={() => doOp('scalarB')}>Scalar x B</Button>
        </div>
      </Card>
      {error && <Card className="mb-4 bg-red-50 dark:bg-red-900/20"><p className="text-red-600 text-sm">{error}</p></Card>}
      {(result || resultLabel) && (
        <Card>
          {result ? <MatrixDisplay label={resultLabel} matrix={result} /> : <p className="text-lg font-semibold text-emerald-600">{resultLabel}</p>}
        </Card>
      )}
    </div>
  );
}
