import { GpaEntry } from '@/types';
import { GRADE_POINTS } from '@/lib/constants';

export function calculateUnweightedGPA(entries: GpaEntry[]): number {
  const valid = entries.filter((e) => e.course.trim() && e.grade in GRADE_POINTS && e.credits > 0);
  if (valid.length === 0) return 0;

  let totalPoints = 0;
  let totalCredits = 0;

  for (const entry of valid) {
    const gradePoint = GRADE_POINTS[entry.grade];
    totalPoints += gradePoint * entry.credits;
    totalCredits += entry.credits;
  }

  return totalCredits > 0 ? Math.round((totalPoints / totalCredits) * 1000) / 1000 : 0;
}

export function calculateWeightedGPA(entries: GpaEntry[]): number {
  const valid = entries.filter((e) => e.course.trim() && e.grade in GRADE_POINTS && e.credits > 0);
  if (valid.length === 0) return 0;

  let totalPoints = 0;
  let totalCredits = 0;

  for (const entry of valid) {
    let gradePoint = GRADE_POINTS[entry.grade];

    // AP courses add 1.0, Honors courses add 0.5
    if (entry.isAP) {
      gradePoint += 1.0;
    } else if (entry.isHonors) {
      gradePoint += 0.5;
    }

    totalPoints += gradePoint * entry.credits;
    totalCredits += entry.credits;
  }

  return totalCredits > 0 ? Math.round((totalPoints / totalCredits) * 1000) / 1000 : 0;
}
