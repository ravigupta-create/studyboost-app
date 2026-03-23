'use client';

import { useState, useEffect, useMemo } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';

interface StudyStats {
  sessions: { date: string; duration?: number }[];
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  check: (stats: { totalSessions: number; currentStreak: number; longestStreak: number; totalMinutes: number }) => boolean;
}

const ACHIEVEMENTS: Achievement[] = [
  { id: 'first', name: 'First Session', description: 'Complete your first study session', icon: '\u{1F31F}', check: s => s.totalSessions >= 1 },
  { id: 'streak3', name: '3-Day Streak', description: 'Study 3 days in a row', icon: '\u{1F525}', check: s => s.currentStreak >= 3 || s.longestStreak >= 3 },
  { id: 'streak7', name: '7-Day Streak', description: 'Study 7 days in a row', icon: '\u{1F4AA}', check: s => s.currentStreak >= 7 || s.longestStreak >= 7 },
  { id: 'streak14', name: '14-Day Streak', description: 'Study 14 days in a row', icon: '\u{1F3C6}', check: s => s.currentStreak >= 14 || s.longestStreak >= 14 },
  { id: 'streak30', name: '30-Day Streak', description: 'Study 30 days in a row', icon: '\u{1F451}', check: s => s.currentStreak >= 30 || s.longestStreak >= 30 },
  { id: 'sessions10', name: '10 Sessions', description: 'Complete 10 study sessions', icon: '\u{1F4DA}', check: s => s.totalSessions >= 10 },
  { id: 'sessions30', name: '30 Sessions', description: 'Complete 30 study sessions', icon: '\u{1F393}', check: s => s.totalSessions >= 30 },
  { id: 'sessions100', name: '100 Sessions', description: 'Complete 100 study sessions', icon: '\u{1F48E}', check: s => s.totalSessions >= 100 },
  { id: 'hours1', name: '1 Hour Studied', description: 'Study for a total of 1 hour', icon: '\u23F0', check: s => s.totalMinutes >= 60 },
  { id: 'hours10', name: '10 Hours Studied', description: 'Study for a total of 10 hours', icon: '\u{1F4A1}', check: s => s.totalMinutes >= 600 },
  { id: 'hours50', name: '50 Hours Studied', description: 'Study for a total of 50 hours', icon: '\u{1F680}', check: s => s.totalMinutes >= 3000 },
];

function getDateStr(d: Date): string {
  return d.toISOString().split('T')[0];
}

export default function StreaksPage() {
  const [stats, setStats] = useState<StudyStats>({ sessions: [] });

  useEffect(() => {
    const saved = localStorage.getItem('sb-study-stats');
    if (saved) {
      try { setStats(JSON.parse(saved)); } catch {}
    }
  }, []);

  const computed = useMemo(() => {
    const dates = [...new Set(stats.sessions.map(s => s.date))].sort();
    const totalSessions = stats.sessions.length;
    const totalMinutes = stats.sessions.reduce((sum, s) => sum + (s.duration || 1), 0);

    // Current streak
    let currentStreak = 0;
    const today = getDateStr(new Date());
    const d = new Date();
    for (let i = 0; i < 365; i++) {
      const ds = getDateStr(d);
      if (dates.includes(ds)) {
        currentStreak++;
      } else if (i > 0) {
        break;
      }
      d.setDate(d.getDate() - 1);
    }

    // Longest streak
    let longestStreak = 0, streak = 1;
    for (let i = 1; i < dates.length; i++) {
      const prev = new Date(dates[i - 1] + 'T12:00:00');
      const curr = new Date(dates[i] + 'T12:00:00');
      const diff = (curr.getTime() - prev.getTime()) / 86400000;
      if (diff === 1) { streak++; } else { streak = 1; }
      longestStreak = Math.max(longestStreak, streak);
    }
    if (dates.length === 1) longestStreak = 1;
    longestStreak = Math.max(longestStreak, currentStreak);

    const xp = totalMinutes;

    return { totalSessions, totalMinutes, currentStreak, longestStreak, xp, dates };
  }, [stats]);

  // Last 30 days heatmap
  const heatmapDays = useMemo(() => {
    const days: { date: string; count: number; label: string }[] = [];
    const d = new Date();
    for (let i = 29; i >= 0; i--) {
      const dt = new Date(d);
      dt.setDate(dt.getDate() - i);
      const ds = getDateStr(dt);
      const count = stats.sessions.filter(s => s.date === ds).length;
      days.push({ date: ds, count, label: dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) });
    }
    return days;
  }, [stats]);

  const unlockedAchievements = ACHIEVEMENTS.filter(a => a.check(computed));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <PageHeader icon="\u{1F525}" title="Study Streaks" description="Track your study consistency, XP, and achievement badges." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center">
          <div className="text-3xl font-bold text-orange-500">{computed.currentStreak}</div>
          <div className="text-xs text-gray-500 mt-1">Current Streak</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-purple-500">{computed.longestStreak}</div>
          <div className="text-xs text-gray-500 mt-1">Longest Streak</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-blue-500">{computed.totalSessions}</div>
          <div className="text-xs text-gray-500 mt-1">Total Sessions</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-green-500">{computed.xp}</div>
          <div className="text-xs text-gray-500 mt-1">XP (1/min)</div>
        </Card>
      </div>

      <Card className="mb-8">
        <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">Last 30 Days</h2>
        <div className="grid grid-cols-10 gap-1.5">
          {heatmapDays.map(d => (
            <div key={d.date} title={`${d.label}: ${d.count} session${d.count !== 1 ? 's' : ''}`}
              className={`aspect-square rounded-sm ${d.count === 0 ? 'bg-gray-100 dark:bg-gray-700' : d.count === 1 ? 'bg-green-200 dark:bg-green-900/40' : d.count <= 3 ? 'bg-green-400 dark:bg-green-700' : 'bg-green-600 dark:bg-green-500'}`} />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-700" />
          <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900/40" />
          <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-700" />
          <div className="w-3 h-3 rounded-sm bg-green-600 dark:bg-green-500" />
          <span>More</span>
        </div>
      </Card>

      <Card>
        <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">
          Achievements ({unlockedAchievements.length}/{ACHIEVEMENTS.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ACHIEVEMENTS.map(a => {
            const unlocked = a.check(computed);
            return (
              <div key={a.id} className={`flex items-center gap-3 p-3 rounded-lg border ${unlocked ? 'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700 opacity-50'}`}>
                <span className="text-2xl">{a.icon}</span>
                <div>
                  <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">{a.name}</h3>
                  <p className="text-xs text-gray-500">{a.description}</p>
                </div>
                {unlocked && <span className="ml-auto text-green-500 text-sm">\u2713</span>}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
