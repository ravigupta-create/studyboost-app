'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { PageHeader } from '@/components/shared/PageHeader';
import { GpaEntry } from '@/types';
import { GRADE_POINTS } from '@/lib/constants';
import { calculateUnweightedGPA, calculateWeightedGPA } from '@/lib/gpa-calculator';
import { cn } from '@/lib/cn';

const GRADES = Object.keys(GRADE_POINTS);

function createEmptyEntry(): GpaEntry {
  return { course: '', grade: 'A', credits: 3, isHonors: false, isAP: false };
}

export default function GpaPage() {
  const [entries, setEntries] = useState<GpaEntry[]>([createEmptyEntry()]);

  const updateEntry = (index: number, updates: Partial<GpaEntry>) => {
    setEntries((prev) =>
      prev.map((entry, i) => {
        if (i !== index) return entry;
        const updated = { ...entry, ...updates };
        // AP and Honors are mutually exclusive
        if (updates.isAP && updated.isAP) updated.isHonors = false;
        if (updates.isHonors && updated.isHonors) updated.isAP = false;
        return updated;
      })
    );
  };

  const addEntry = () => {
    setEntries((prev) => [...prev, createEmptyEntry()]);
  };

  const removeEntry = (index: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const unweightedGPA = useMemo(() => calculateUnweightedGPA(entries), [entries]);
  const weightedGPA = useMemo(() => calculateWeightedGPA(entries), [entries]);

  const hasValidEntries = entries.some((e) => e.course.trim() && e.credits > 0);

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        icon="🎓"
        title="GPA Calculator"
        description="Calculate weighted and unweighted GPA from your grades and credits."
        aiPowered={false}
      />

      {/* GPA Display Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
          <p className="text-sm font-medium opacity-90">Unweighted GPA</p>
          <p className="text-4xl font-bold mt-1">
            {hasValidEntries ? unweightedGPA.toFixed(3) : '0.000'}
          </p>
          <p className="text-xs opacity-75 mt-1">4.0 Scale</p>
        </div>
        <div className="rounded-xl p-6 bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg">
          <p className="text-sm font-medium opacity-90">Weighted GPA</p>
          <p className="text-4xl font-bold mt-1">
            {hasValidEntries ? weightedGPA.toFixed(3) : '0.000'}
          </p>
          <p className="text-xs opacity-75 mt-1">Honors +0.5 / AP +1.0</p>
        </div>
      </div>

      {/* Course Table */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Your Courses
        </h2>

        {/* Table Header (desktop) */}
        <div className="hidden sm:grid sm:grid-cols-[1fr_100px_80px_70px_70px_40px] gap-2 mb-2 px-1">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Course Name
          </span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Grade
          </span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Credits
          </span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
            Honors
          </span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
            AP
          </span>
          <span />
        </div>

        {/* Course Rows */}
        <div className="space-y-2">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[1fr_100px_80px_70px_70px_40px] gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50"
            >
              <Input
                placeholder="Course name"
                value={entry.course}
                onChange={(e) => updateEntry(index, { course: e.target.value })}
              />
              <Select
                value={entry.grade}
                onChange={(e) => updateEntry(index, { grade: e.target.value })}
              >
                {GRADES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </Select>
              <Input
                type="number"
                min={0.5}
                max={10}
                step={0.5}
                value={entry.credits}
                onChange={(e) => updateEntry(index, { credits: parseFloat(e.target.value) || 0 })}
              />
              <div className="flex items-center justify-center">
                <label className="sm:hidden text-xs text-gray-500 dark:text-gray-400 mr-2">
                  Honors
                </label>
                <input
                  type="checkbox"
                  checked={entry.isHonors}
                  onChange={(e) => updateEntry(index, { isHonors: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500"
                />
              </div>
              <div className="flex items-center justify-center">
                <label className="sm:hidden text-xs text-gray-500 dark:text-gray-400 mr-2">
                  AP
                </label>
                <input
                  type="checkbox"
                  checked={entry.isAP}
                  onChange={(e) => updateEntry(index, { isAP: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500"
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => removeEntry(index)}
                  disabled={entries.length <= 1}
                  className={cn(
                    'text-gray-400 hover:text-red-500 transition-colors text-lg',
                    entries.length <= 1 && 'opacity-30 cursor-not-allowed'
                  )}
                  title="Remove course"
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Button variant="secondary" size="sm" onClick={addEntry}>
            + Add Course
          </Button>
        </div>

        {/* Summary */}
        {hasValidEntries && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Courses</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {entries.filter((e) => e.course.trim()).length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Credits</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {entries.filter((e) => e.course.trim()).reduce((sum, e) => sum + e.credits, 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">AP/Honors</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {entries.filter((e) => e.course.trim() && (e.isAP || e.isHonors)).length}
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
