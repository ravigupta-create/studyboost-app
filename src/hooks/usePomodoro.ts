'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { PomodoroSettings } from '@/types';

export type PomodoroPhase = 'idle' | 'work' | 'shortBreak' | 'longBreak';

interface PomodoroState {
  timeLeft: number;
  phase: PomodoroPhase;
  sessionCount: number;
  isRunning: boolean;
  totalSeconds: number;
}

const DEFAULT_SETTINGS: PomodoroSettings = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLong: 4,
};

export function usePomodoro(customSettings?: Partial<PomodoroSettings>) {
  const settings: PomodoroSettings = { ...DEFAULT_SETTINGS, ...customSettings };

  const [state, setState] = useState<PomodoroState>({
    timeLeft: settings.workMinutes * 60,
    phase: 'idle',
    sessionCount: 0,
    isRunning: false,
    totalSeconds: settings.workMinutes * 60,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const getPhaseSeconds = useCallback((phase: PomodoroPhase): number => {
    const s = settingsRef.current;
    switch (phase) {
      case 'work': return s.workMinutes * 60;
      case 'shortBreak': return s.shortBreakMinutes * 60;
      case 'longBreak': return s.longBreakMinutes * 60;
      default: return s.workMinutes * 60;
    }
  }, []);

  const transitionToNext = useCallback(() => {
    setState((prev) => {
      const s = settingsRef.current;

      if (prev.phase === 'work') {
        const newSessionCount = prev.sessionCount + 1;
        const isLongBreak = newSessionCount % s.sessionsBeforeLong === 0;
        const nextPhase: PomodoroPhase = isLongBreak ? 'longBreak' : 'shortBreak';
        const nextSeconds = isLongBreak ? s.longBreakMinutes * 60 : s.shortBreakMinutes * 60;

        return {
          ...prev,
          phase: nextPhase,
          sessionCount: newSessionCount,
          timeLeft: nextSeconds,
          totalSeconds: nextSeconds,
          isRunning: true,
        };
      }

      // Break -> work
      const nextSeconds = s.workMinutes * 60;
      return {
        ...prev,
        phase: 'work',
        timeLeft: nextSeconds,
        totalSeconds: nextSeconds,
        isRunning: true,
      };
    });
  }, []);

  // Timer tick effect
  useEffect(() => {
    if (!state.isRunning) {
      clearTimer();
      return;
    }

    intervalRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.timeLeft <= 1) {
          return { ...prev, timeLeft: 0 };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return clearTimer;
  }, [state.isRunning, clearTimer]);

  // Watch for timer reaching zero to auto-transition
  useEffect(() => {
    if (state.timeLeft === 0 && state.isRunning) {
      clearTimer();
      transitionToNext();
    }
  }, [state.timeLeft, state.isRunning, clearTimer, transitionToNext]);

  const start = useCallback(() => {
    setState((prev) => {
      if (prev.phase === 'idle') {
        const seconds = settingsRef.current.workMinutes * 60;
        return {
          ...prev,
          phase: 'work',
          timeLeft: seconds,
          totalSeconds: seconds,
          isRunning: true,
        };
      }
      return { ...prev, isRunning: true };
    });
  }, []);

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    const seconds = settingsRef.current.workMinutes * 60;
    setState({
      timeLeft: seconds,
      phase: 'idle',
      sessionCount: 0,
      isRunning: false,
      totalSeconds: seconds,
    });
  }, [clearTimer]);

  const skip = useCallback(() => {
    clearTimer();
    transitionToNext();
  }, [clearTimer, transitionToNext]);

  const updateSettings = useCallback((newSettings: Partial<PomodoroSettings>) => {
    settingsRef.current = { ...settingsRef.current, ...newSettings };
    setState((prev) => {
      if (prev.phase === 'idle' || !prev.isRunning) {
        const seconds = getPhaseSeconds(prev.phase === 'idle' ? 'work' : prev.phase);
        return { ...prev, timeLeft: seconds, totalSeconds: seconds };
      }
      return prev;
    });
  }, [getPhaseSeconds]);

  return {
    timeLeft: state.timeLeft,
    phase: state.phase,
    sessionCount: state.sessionCount,
    isRunning: state.isRunning,
    totalSeconds: state.totalSeconds,
    settings: settingsRef.current,
    start,
    pause,
    reset,
    skip,
    updateSettings,
  };
}
