'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { PageHeader } from '@/components/shared/PageHeader';
import { PlannerSubject, PlannerEntry } from '@/types';
import { generateSchedule } from '@/lib/planner-engine';
import { cn } from '@/lib/cn';

const ALL_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = Array.from({ length: 14 }, (_, i) => i + 8); // 8am to 9pm

function formatHour(h: number): string {
  const suffix = h >= 12 ? 'PM' : 'AM';
  const display = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${display}${suffix}`;
}

export default function PlannerPage() {
  const [subjects, setSubjects] = useState<PlannerSubject[]>([]);
  const [name, setName] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState(3);
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [selectedDays, setSelectedDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [schedule, setSchedule] = useState<PlannerEntry[]>([]);
  const [generated, setGenerated] = useState(false);

  const handleAddSubject = () => {
    if (!name.trim()) return;
    setSubjects((prev) => [...prev, { name: name.trim(), hoursPerWeek, priority }]);
    setName('');
    setHoursPerWeek(3);
    setPriority('medium');
    setGenerated(false);
  };

  const handleRemoveSubject = (index: number) => {
    setSubjects((prev) => prev.filter((_, i) => i !== index));
    setGenerated(false);
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
    setGenerated(false);
  };

  const handleGenerate = () => {
    const orderedDays = ALL_DAYS.filter((d) => selectedDays.includes(d));
    const result = generateSchedule(subjects, orderedDays);
    setSchedule(result);
    setGenerated(true);
  };

  const activeDays = useMemo(
    () => ALL_DAYS.filter((d) => selectedDays.includes(d)),
    [selectedDays]
  );

  const scheduleBySlot = useMemo(() => {
    const map = new Map<string, PlannerEntry>();
    for (const entry of schedule) {
      for (let h = 0; h < entry.duration; h++) {
        map.set(`${entry.day}-${entry.startHour + h}`, entry);
      }
    }
    return map;
  }, [schedule]);

  const priorityLabel = (p: string) => {
    switch (p) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return p;
    }
  };

  const priorityBadge = (p: string) => {
    switch (p) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default: return '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        icon="📅"
        title="Study Planner"
        description="Create a visual weekly study schedule based on your subjects and availability."
        aiPowered={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Add Subject Form */}
        <Card className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Add Subject
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject Name
              </label>
              <Input
                placeholder="e.g. Math"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Hours / Week
              </label>
              <Input
                type="number"
                min={1}
                max={20}
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              <Select value={priority} onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Select>
            </div>
          </div>
          <Button onClick={handleAddSubject} disabled={!name.trim()} size="sm">
            Add Subject
          </Button>
        </Card>

        {/* Available Days */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Available Days
          </h2>
          <div className="flex flex-wrap gap-2">
            {ALL_DAYS.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  selectedDays.includes(day)
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                {day}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Subject List */}
      {subjects.length > 0 && (
        <Card className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Subjects ({subjects.length})
          </h2>
          <div className="space-y-2">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {subject.name}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {subject.hoursPerWeek}h/week
                  </span>
                  <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', priorityBadge(subject.priority))}>
                    {priorityLabel(subject.priority)}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleRemoveSubject(index)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button
              onClick={handleGenerate}
              disabled={subjects.length === 0 || selectedDays.length === 0}
            >
              Generate Schedule
            </Button>
          </div>
        </Card>
      )}

      {/* Weekly Schedule Grid */}
      {generated && schedule.length > 0 && (
        <Card className="overflow-x-auto">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Weekly Schedule
          </h2>
          <div className="min-w-[600px]">
            {/* Header row */}
            <div
              className="grid gap-1 mb-1"
              style={{ gridTemplateColumns: `60px repeat(${activeDays.length}, 1fr)` }}
            >
              <div />
              {activeDays.map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-semibold text-gray-700 dark:text-gray-300 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Time rows */}
            {HOURS.map((hour) => (
              <div
                key={hour}
                className="grid gap-1 mb-1"
                style={{ gridTemplateColumns: `60px repeat(${activeDays.length}, 1fr)` }}
              >
                <div className="text-xs text-gray-500 dark:text-gray-400 text-right pr-2 py-2 leading-tight">
                  {formatHour(hour)}
                </div>
                {activeDays.map((day) => {
                  const entry = scheduleBySlot.get(`${day}-${hour}`);
                  return (
                    <div
                      key={`${day}-${hour}`}
                      className={cn(
                        'rounded-md py-2 px-1 text-xs text-center min-h-[36px] transition-colors',
                        entry
                          ? 'text-white font-medium shadow-sm'
                          : 'bg-gray-50 dark:bg-gray-700/30'
                      )}
                      style={entry ? { backgroundColor: entry.color } : undefined}
                    >
                      {entry ? entry.subject : ''}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Legend</h3>
            <div className="flex flex-wrap gap-3">
              {Array.from(new Set(schedule.map((e) => e.subject))).map((subject) => {
                const entry = schedule.find((e) => e.subject === subject)!;
                return (
                  <div key={subject} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{subject}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {generated && schedule.length === 0 && (
        <Card>
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No schedule could be generated. Try adding more available days or reducing study hours.
          </p>
        </Card>
      )}
    </div>
  );
}
