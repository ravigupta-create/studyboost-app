'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Score {
  id: string;
  date: string;
  subject: string;
  score: number;
}

function linearRegression(scores: Score[]): { slope: number; intercept: number; predicted: number; trend: string } {
  const n = scores.length;
  if (n < 2) return { slope: 0, intercept: scores[0]?.score || 0, predicted: scores[0]?.score || 0, trend: 'insufficient data' };
  const xs = scores.map((_, i) => i);
  const ys = scores.map(s => s.score);
  const sumX = xs.reduce((a, b) => a + b, 0);
  const sumY = ys.reduce((a, b) => a + b, 0);
  const sumXY = xs.reduce((a, x, i) => a + x * ys[i], 0);
  const sumXX = xs.reduce((a, x) => a + x * x, 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  const predicted = Math.min(100, Math.max(0, Math.round(slope * n + intercept)));
  const trend = slope > 0.5 ? 'improving' : slope < -0.5 ? 'declining' : 'stable';
  return { slope, intercept, predicted, trend };
}

export default function ScorePredictorPage() {
  const [scores, setScores] = useState<Score[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState('');

  useEffect(() => { const s = localStorage.getItem('sb-scores'); if (s) setScores(JSON.parse(s)); }, []);
  const save = (d: Score[]) => { setScores(d); localStorage.setItem('sb-scores', JSON.stringify(d)); };

  const addScore = () => {
    const s = parseInt(score);
    if (!date || !subject.trim() || isNaN(s) || s < 0 || s > 100) return;
    const entry: Score = { id: Date.now().toString(), date, subject: subject.trim(), score: s };
    save([...scores, entry].sort((a, b) => a.date.localeCompare(b.date)));
    setScore('');
  };

  const deleteScore = (id: string) => save(scores.filter(s => s.id !== id));

  const subjects = [...new Set(scores.map(s => s.subject))];
  const avg = scores.length > 0 ? Math.round(scores.reduce((a, s) => a + s.score, 0) / scores.length) : 0;
  const regression = scores.length >= 2 ? linearRegression(scores) : null;

  const trendColor = regression?.trend === 'improving' ? 'text-emerald-600' : regression?.trend === 'declining' ? 'text-red-600' : 'text-yellow-600';

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader icon="&#128200;" title="Score Predictor" description="Track practice test scores and predict future performance." />

      {scores.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="text-center py-3">
            <p className="text-2xl font-bold text-purple-600">{scores.length}</p>
            <p className="text-xs text-gray-500">Tests Logged</p>
          </Card>
          <Card className="text-center py-3">
            <p className="text-2xl font-bold text-blue-600">{avg}%</p>
            <p className="text-xs text-gray-500">Average Score</p>
          </Card>
          <Card className="text-center py-3">
            <p className={`text-xl font-bold capitalize ${trendColor}`}>{regression?.trend || '-'}</p>
            <p className="text-xs text-gray-500">Trend</p>
          </Card>
          <Card className="text-center py-3">
            <p className="text-2xl font-bold text-emerald-600">{regression?.predicted || '-'}%</p>
            <p className="text-xs text-gray-500">Predicted Next</p>
          </Card>
        </div>
      )}

      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Add Practice Test Score</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
          <Input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
          <Input type="number" placeholder="Score (0-100)" value={score} onChange={e => setScore(e.target.value)} min="0" max="100" />
          <Button onClick={addScore} disabled={!date || !subject.trim() || !score}>Add Score</Button>
        </div>
      </Card>

      {scores.length >= 2 && (
        <Card className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Score Trend</h2>
          <svg viewBox="0 0 600 200" className="w-full">
            {/* Grid */}
            {[0, 25, 50, 75, 100].map(v => {
              const y = 180 - v * 1.6;
              return <g key={v}>
                <line x1="50" y1={y} x2="580" y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
                <text x="45" y={y + 4} textAnchor="end" fontSize="10" fill="#9ca3af">{v}</text>
              </g>;
            })}
            {/* Line */}
            <polyline
              fill="none" stroke="#8b5cf6" strokeWidth="2.5"
              points={scores.map((s, i) => `${50 + (i / Math.max(1, scores.length - 1)) * 530},${180 - s.score * 1.6}`).join(' ')}
            />
            {/* Points */}
            {scores.map((s, i) => (
              <circle key={i} cx={50 + (i / Math.max(1, scores.length - 1)) * 530} cy={180 - s.score * 1.6}
                r="4" fill="#8b5cf6" stroke="white" strokeWidth="2" />
            ))}
            {/* Regression line */}
            {regression && (
              <line x1="50" y1={180 - regression.intercept * 1.6}
                x2="580" y2={180 - (regression.slope * (scores.length - 1) + regression.intercept) * 1.6}
                stroke="#10b981" strokeWidth="1.5" strokeDasharray="6,3" />
            )}
            {/* Labels */}
            {scores.map((s, i) => (
              <text key={i} x={50 + (i / Math.max(1, scores.length - 1)) * 530} y="195" textAnchor="middle" fontSize="8" fill="#9ca3af">
                {s.date.slice(5)}
              </text>
            ))}
          </svg>
          <div className="flex gap-4 text-xs text-gray-500 mt-2">
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-purple-600 inline-block"></span> Actual Scores</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-emerald-500 inline-block" style={{ borderTop: '1.5px dashed #10b981' }}></span> Trend Line</span>
          </div>
        </Card>
      )}

      <Card>
        <h2 className="text-lg font-semibold mb-3">Score History</h2>
        {scores.length === 0 ? (
          <p className="text-gray-500 text-sm">No scores logged yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3">Date</th>
                  <th className="text-left py-2 px-3">Subject</th>
                  <th className="text-left py-2 px-3">Score</th>
                  <th className="py-2 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {[...scores].reverse().map(s => (
                  <tr key={s.id} className="border-b border-gray-100 dark:border-gray-700/50">
                    <td className="py-2 px-3">{s.date}</td>
                    <td className="py-2 px-3">{s.subject}</td>
                    <td className="py-2 px-3">
                      <span className={`font-bold ${s.score >= 70 ? 'text-emerald-600' : s.score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>{s.score}%</span>
                    </td>
                    <td className="py-2 px-3 text-right"><button onClick={() => deleteScore(s.id)} className="text-red-400 hover:text-red-600 text-xs">Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
