'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const COLORS = ['#8b5cf6', '#ef4444', '#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#14b8a6', '#f97316'];

function evaluateExpr(expr: string, x: number): number {
  try {
    const sanitized = expr
      .replace(/\^/g, '**')
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/sqrt/g, 'Math.sqrt')
      .replace(/abs/g, 'Math.abs')
      .replace(/log/g, 'Math.log')
      .replace(/ln/g, 'Math.log')
      .replace(/pi/gi, 'Math.PI')
      .replace(/e(?![a-zA-Z])/g, 'Math.E')
      .replace(/(\d)(x)/g, '$1*x')
      .replace(/(x)(\d)/g, 'x*$2')
      .replace(/\)(x)/g, ')*x')
      .replace(/(x)\(/g, 'x*(');
    const fn = new Function('x', `return ${sanitized}`);
    const result = fn(x);
    return typeof result === 'number' && isFinite(result) ? result : NaN;
  } catch { return NaN; }
}

export default function GraphPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [functions, setFunctions] = useState<{ expr: string; color: string }[]>([{ expr: 'x^2', color: COLORS[0] }]);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [newExpr, setNewExpr] = useState('');

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width = canvas.offsetWidth * 2;
    const h = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const dw = canvas.offsetWidth, dh = canvas.offsetHeight;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, dw, dh);

    const scale = 40 * zoom;
    const cx = dw / 2 + panX;
    const cy = dh / 2 + panY;

    // Grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;
    const gridStep = scale;
    for (let x = cx % gridStep; x < dw; x += gridStep) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, dh); ctx.stroke(); }
    for (let y = cy % gridStep; y < dh; y += gridStep) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(dw, y); ctx.stroke(); }

    // Axes
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(dw, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, dh); ctx.stroke();

    // Labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    for (let i = -Math.ceil(cx / gridStep); i <= Math.ceil((dw - cx) / gridStep); i++) {
      if (i === 0) continue;
      const x = cx + i * gridStep;
      ctx.fillText(i.toString(), x, cy + 14);
    }
    ctx.textAlign = 'right';
    for (let i = -Math.ceil(cy / gridStep); i <= Math.ceil((dh - cy) / gridStep); i++) {
      if (i === 0) continue;
      const y = cy + i * gridStep;
      ctx.fillText((-i).toString(), cx - 5, y + 4);
    }

    // Plot functions
    functions.forEach(fn => {
      ctx.strokeStyle = fn.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      let started = false;
      for (let px = 0; px < dw; px += 0.5) {
        const x = (px - cx) / scale;
        const y = evaluateExpr(fn.expr, x);
        if (isNaN(y) || !isFinite(y)) { started = false; continue; }
        const py = cy - y * scale;
        if (py < -1000 || py > dh + 1000) { started = false; continue; }
        if (!started) { ctx.moveTo(px, py); started = true; } else { ctx.lineTo(px, py); }
      }
      ctx.stroke();
    });
  }, [functions, zoom, panX, panY]);

  useEffect(() => { draw(); }, [draw]);

  const addFunction = () => {
    if (!newExpr.trim()) return;
    setFunctions([...functions, { expr: newExpr.trim(), color: COLORS[functions.length % COLORS.length] }]);
    setNewExpr('');
  };

  const removeFunction = (i: number) => setFunctions(functions.filter((_, idx) => idx !== i));

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader icon="&#128200;" title="Graphing Calculator" description="Plot mathematical functions on an interactive canvas." />
      <Card className="mb-4">
        <div className="flex gap-2 mb-3">
          <Input placeholder="Enter expression (e.g., x^2, sin(x), 2*x+1)" value={newExpr}
            onChange={e => setNewExpr(e.target.value)} onKeyDown={e => e.key === 'Enter' && addFunction()} />
          <Button onClick={addFunction} disabled={!newExpr.trim()}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {functions.map((fn, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: fn.color }}></span>
              y = {fn.expr}
              <button onClick={() => removeFunction(i)} className="text-gray-400 hover:text-red-500">&times;</button>
            </span>
          ))}
        </div>
      </Card>
      <Card>
        <div className="flex gap-2 mb-3">
          <Button variant="secondary" size="sm" onClick={() => setZoom(z => Math.min(10, z * 1.3))}>Zoom In</Button>
          <Button variant="secondary" size="sm" onClick={() => setZoom(z => Math.max(0.1, z / 1.3))}>Zoom Out</Button>
          <Button variant="ghost" size="sm" onClick={() => { setZoom(1); setPanX(0); setPanY(0); }}>Reset View</Button>
          <Button variant="ghost" size="sm" onClick={() => setPanX(p => p + 50)}>Left</Button>
          <Button variant="ghost" size="sm" onClick={() => setPanX(p => p - 50)}>Right</Button>
          <Button variant="ghost" size="sm" onClick={() => setPanY(p => p + 50)}>Up</Button>
          <Button variant="ghost" size="sm" onClick={() => setPanY(p => p - 50)}>Down</Button>
        </div>
        <canvas ref={canvasRef} className="w-full border border-gray-200 dark:border-gray-600 rounded-lg" style={{ height: '450px' }} />
      </Card>
    </div>
  );
}
