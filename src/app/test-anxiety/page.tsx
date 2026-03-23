'use client';

import { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const AFFIRMATIONS = [
  'I am prepared and capable.',
  'I have studied and I know this material.',
  'I can handle any question that comes my way.',
  'My mind is clear and focused.',
  'I am calm, confident, and in control.',
  'I trust my preparation and knowledge.',
  'Each breath helps me think more clearly.',
  'I have overcome challenges before and I will do it again.',
  'I am doing my best, and that is enough.',
  'This test is an opportunity to show what I know.',
  'I release all worry and tension.',
  'My thoughts are organized and clear.',
  'I am stronger than any test.',
  'I believe in my ability to succeed.',
  'Every question I answer brings me closer to my goal.',
];

const GROUNDING_STEPS = [
  { count: 5, sense: 'SEE', prompt: 'Name 5 things you can see around you right now.' },
  { count: 4, sense: 'TOUCH', prompt: 'Name 4 things you can physically feel (chair, desk, feet on floor).' },
  { count: 3, sense: 'HEAR', prompt: 'Name 3 things you can hear right now.' },
  { count: 2, sense: 'SMELL', prompt: 'Name 2 things you can smell (or like the smell of).' },
  { count: 1, sense: 'TASTE', prompt: 'Name 1 thing you can taste (or enjoy tasting).' },
];

export default function TestAnxietyPage() {
  const [tab, setTab] = useState<'breathe' | 'ground' | 'affirm'>('breathe');
  const [breathing, setBreathing] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [phaseTime, setPhaseTime] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [groundStep, setGroundStep] = useState(0);
  const [affirmIdx, setAffirmIdx] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!breathing) return;
    intervalRef.current = setInterval(() => {
      setPhaseTime(prev => {
        if (prev >= 3) {
          setPhase(p => {
            if (p === 'inhale') return 'hold';
            if (p === 'hold') return 'exhale';
            setCycles(c => c + 1);
            return 'inhale';
          });
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [breathing]);

  const toggleBreathing = () => {
    if (breathing) {
      setBreathing(false);
      setPhase('inhale');
      setPhaseTime(0);
    } else {
      setBreathing(true);
      setCycles(0);
      setPhase('inhale');
      setPhaseTime(0);
    }
  };

  const circleScale = phase === 'inhale' ? 1 + (phaseTime / 3) * 0.5 : phase === 'hold' ? 1.5 : 1.5 - (phaseTime / 3) * 0.5;
  const phaseLabel = phase === 'inhale' ? 'Breathe In...' : phase === 'hold' ? 'Hold...' : 'Breathe Out...';
  const phaseColor = phase === 'inhale' ? 'text-blue-500' : phase === 'hold' ? 'text-purple-500' : 'text-emerald-500';
  const circleColor = phase === 'inhale' ? 'bg-blue-400/30 border-blue-400' : phase === 'hold' ? 'bg-purple-400/30 border-purple-400' : 'bg-emerald-400/30 border-emerald-400';

  const tabs = [
    { id: 'breathe' as const, label: 'Breathing Exercise' },
    { id: 'ground' as const, label: '5-4-3-2-1 Grounding' },
    { id: 'affirm' as const, label: 'Affirmations' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader icon="&#128154;" title="Test Anxiety Relief" description="Breathing exercises, grounding techniques, and positive affirmations." />
      <div className="flex gap-1 mb-6">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${tab === t.id ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'breathe' && (
        <Card className="text-center">
          <div className="flex justify-center items-center my-12">
            <div className={`w-48 h-48 rounded-full border-4 ${circleColor} flex items-center justify-center transition-transform duration-1000 ease-in-out`}
              style={{ transform: `scale(${breathing ? circleScale : 1})` }}>
              <div className="text-center">
                {breathing ? (
                  <>
                    <p className={`text-xl font-bold ${phaseColor}`}>{phaseLabel}</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-1">{4 - phaseTime}</p>
                  </>
                ) : (
                  <p className="text-gray-400">Press Start</p>
                )}
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-2">4-4-4 Box Breathing: Inhale 4s, Hold 4s, Exhale 4s</p>
          {breathing && <p className="text-sm text-gray-400 mb-4">Cycles completed: {cycles}</p>}
          <Button onClick={toggleBreathing} size="lg">{breathing ? 'Stop' : 'Start Breathing Exercise'}</Button>
        </Card>
      )}

      {tab === 'ground' && (
        <Card>
          <h2 className="text-lg font-semibold mb-4">5-4-3-2-1 Grounding Exercise</h2>
          <p className="text-sm text-gray-500 mb-6">This technique helps bring you back to the present moment by engaging your senses.</p>
          <div className="space-y-4">
            {GROUNDING_STEPS.map((step, i) => (
              <div key={i} className={`p-4 rounded-lg border-2 transition-all ${i === groundStep ? 'border-purple-400 bg-purple-50 dark:bg-purple-900/20 shadow-md' : i < groundStep ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${i < groundStep ? 'bg-emerald-500 text-white' : i === groundStep ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-500'}`}>
                    {i < groundStep ? '\u2713' : step.count}
                  </span>
                  <span className="font-semibold text-sm uppercase tracking-wider">{step.sense}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-13">{step.prompt}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <Button variant="secondary" onClick={() => setGroundStep(Math.max(0, groundStep - 1))} disabled={groundStep === 0}>Previous</Button>
            {groundStep < 4 ? (
              <Button onClick={() => setGroundStep(groundStep + 1)}>Done - Next Step</Button>
            ) : (
              <Button onClick={() => setGroundStep(0)} variant="secondary">Start Over</Button>
            )}
          </div>
          {groundStep >= 4 && (
            <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-center">
              <p className="text-emerald-600 font-semibold">Great job! You have completed the grounding exercise.</p>
              <p className="text-sm text-gray-500 mt-1">Take a moment to notice how you feel now.</p>
            </div>
          )}
        </Card>
      )}

      {tab === 'affirm' && (
        <Card className="text-center">
          <div className="min-h-[200px] flex flex-col items-center justify-center">
            <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 leading-relaxed px-4">
              &ldquo;{AFFIRMATIONS[affirmIdx]}&rdquo;
            </p>
          </div>
          <div className="flex items-center justify-center gap-1 mb-4">
            {AFFIRMATIONS.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === affirmIdx ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'}`} />
            ))}
          </div>
          <div className="flex gap-3 justify-center">
            <Button variant="secondary" onClick={() => setAffirmIdx(i => (i - 1 + AFFIRMATIONS.length) % AFFIRMATIONS.length)}>Previous</Button>
            <Button onClick={() => setAffirmIdx(i => (i + 1) % AFFIRMATIONS.length)}>Next Affirmation</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
