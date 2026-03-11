'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { PageHeader } from '@/components/shared/PageHeader';
import { usePomodoro, PomodoroPhase } from '@/hooks/usePomodoro';
import { formatTime } from '@/lib/utils';
import { cn } from '@/lib/cn';

const PHASE_COLORS: Record<PomodoroPhase, { stroke: string; bg: string; text: string; label: string }> = {
  idle: {
    stroke: '#8B5CF6',
    bg: 'from-purple-500/10 to-indigo-500/10',
    text: 'text-purple-600 dark:text-purple-400',
    label: 'Ready',
  },
  work: {
    stroke: '#8B5CF6',
    bg: 'from-purple-500/10 to-indigo-500/10',
    text: 'text-purple-600 dark:text-purple-400',
    label: 'Work',
  },
  shortBreak: {
    stroke: '#10B981',
    bg: 'from-emerald-500/10 to-green-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    label: 'Short Break',
  },
  longBreak: {
    stroke: '#3B82F6',
    bg: 'from-blue-500/10 to-cyan-500/10',
    text: 'text-blue-600 dark:text-blue-400',
    label: 'Long Break',
  },
};

export default function PomodoroPage() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMin, setWorkMin] = useState(25);
  const [shortBreakMin, setShortBreakMin] = useState(5);
  const [longBreakMin, setLongBreakMin] = useState(15);
  const [sessionsBeforeLong, setSessionsBeforeLong] = useState(4);

  const {
    timeLeft,
    phase,
    sessionCount,
    isRunning,
    totalSeconds,
    settings,
    start,
    pause,
    reset,
    skip,
    updateSettings,
  } = usePomodoro({
    workMinutes: workMin,
    shortBreakMinutes: shortBreakMin,
    longBreakMinutes: longBreakMin,
    sessionsBeforeLong,
  });

  const phaseStyle = PHASE_COLORS[phase];

  // SVG circle calculations
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = totalSeconds > 0 ? timeLeft / totalSeconds : 1;
  const dashoffset = circumference * (1 - progress);

  const handleApplySettings = () => {
    updateSettings({
      workMinutes: workMin,
      shortBreakMinutes: shortBreakMin,
      longBreakMinutes: longBreakMin,
      sessionsBeforeLong,
    });
    reset();
    setShowSettings(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        icon="⏱️"
        title="Pomodoro Timer"
        description="Stay focused with a configurable work/break interval timer."
        aiPowered={false}
      />

      {/* Timer Display */}
      <Card className={cn('mb-6 flex flex-col items-center py-10 bg-gradient-to-br', phaseStyle.bg)}>
        {/* Phase Label */}
        <span className={cn('text-lg font-semibold mb-6', phaseStyle.text)}>
          {phaseStyle.label}
        </span>

        {/* SVG Circular Timer */}
        <div className="relative w-[280px] h-[280px] mb-8">
          <svg
            className="w-full h-full -rotate-90"
            viewBox="0 0 280 280"
          >
            {/* Background circle */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-200 dark:text-gray-700"
            />
            {/* Progress circle */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              fill="none"
              stroke={phaseStyle.stroke}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashoffset}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          {/* Time display centered over SVG */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-mono font-bold text-gray-900 dark:text-gray-100 tracking-wider">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          {!isRunning ? (
            <Button onClick={start} size="lg">
              {phase === 'idle' ? 'Start' : 'Resume'}
            </Button>
          ) : (
            <Button onClick={pause} size="lg" variant="secondary">
              Pause
            </Button>
          )}
          <Button onClick={reset} variant="ghost" size="lg">
            Reset
          </Button>
          {phase !== 'idle' && (
            <Button onClick={skip} variant="ghost" size="lg">
              Skip
            </Button>
          )}
        </div>

        {/* Session counter dots */}
        <div className="mt-8 flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Sessions:</span>
          {Array.from({ length: settings.sessionsBeforeLong }, (_, i) => (
            <div
              key={i}
              className={cn(
                'w-3 h-3 rounded-full transition-colors duration-300',
                i < (sessionCount % settings.sessionsBeforeLong)
                  ? 'bg-purple-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
          {sessionCount > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              ({sessionCount} total)
            </span>
          )}
        </div>
      </Card>

      {/* Settings Panel */}
      <Card>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-full flex items-center justify-between text-left"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Settings
          </h2>
          <span className={cn(
            'text-gray-500 dark:text-gray-400 transition-transform duration-200',
            showSettings && 'rotate-180'
          )}>
            &#9660;
          </span>
        </button>

        {showSettings && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Work (minutes)
                </label>
                <Input
                  type="number"
                  min={1}
                  max={120}
                  value={workMin}
                  onChange={(e) => setWorkMin(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Short Break (minutes)
                </label>
                <Input
                  type="number"
                  min={1}
                  max={60}
                  value={shortBreakMin}
                  onChange={(e) => setShortBreakMin(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Long Break (minutes)
                </label>
                <Input
                  type="number"
                  min={1}
                  max={60}
                  value={longBreakMin}
                  onChange={(e) => setLongBreakMin(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sessions before Long Break
                </label>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={sessionsBeforeLong}
                  onChange={(e) => setSessionsBeforeLong(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>
            </div>
            <Button onClick={handleApplySettings} size="sm">
              Apply & Reset
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
