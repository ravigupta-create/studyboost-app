import { PlannerEntry, PlannerSubject } from '@/types';

const PALETTE = [
  '#8B5CF6', // violet
  '#3B82F6', // blue
  '#10B981', // emerald
  '#F59E0B', // amber
  '#EF4444', // red
  '#EC4899', // pink
  '#06B6D4', // cyan
  '#F97316', // orange
  '#6366F1', // indigo
  '#14B8A6', // teal
];

// Prime study hours ordered by preference (morning first, then afternoon)
const PRIME_HOURS = [9, 10, 11, 14, 15, 16, 8, 13, 17, 18, 19, 12, 20];

interface SlotAllocation {
  subject: string;
  color: string;
  priority: 'high' | 'medium' | 'low';
  totalSlots: number;
  assignedSlots: number;
}

export function generateSchedule(
  subjects: PlannerSubject[],
  availableDays: string[]
): PlannerEntry[] {
  if (subjects.length === 0 || availableDays.length === 0) return [];

  const entries: PlannerEntry[] = [];

  // Build allocation list sorted by priority (high first) then by hours needed
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sortedSubjects = [...subjects].sort((a, b) => {
    const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (pDiff !== 0) return pDiff;
    return b.hoursPerWeek - a.hoursPerWeek;
  });

  const allocations: SlotAllocation[] = sortedSubjects.map((s, i) => ({
    subject: s.name,
    color: PALETTE[i % PALETTE.length],
    priority: s.priority,
    totalSlots: Math.ceil(s.hoursPerWeek),
    assignedSlots: 0,
  }));

  // Track which slots are taken: Map<"day-hour", true>
  const occupied = new Set<string>();

  // Build ordered list of slots: prime hours first, distributed across days
  const orderedSlots: { day: string; hour: number }[] = [];

  // For each hour in priority order, cycle through days
  for (const hour of PRIME_HOURS) {
    for (const day of availableDays) {
      orderedSlots.push({ day, hour });
    }
  }

  // Assign slots to subjects in round-robin, respecting priority ordering
  // High priority subjects get first pick of prime slots
  let slotIndex = 0;

  for (const alloc of allocations) {
    let searchStart = slotIndex;
    let searched = 0;

    while (alloc.assignedSlots < alloc.totalSlots && searched < orderedSlots.length) {
      const currentIdx = searchStart % orderedSlots.length;
      const slot = orderedSlots[currentIdx];
      const key = `${slot.day}-${slot.hour}`;

      if (!occupied.has(key)) {
        occupied.add(key);
        entries.push({
          subject: alloc.subject,
          day: slot.day,
          startHour: slot.hour,
          duration: 1,
          color: alloc.color,
        });
        alloc.assignedSlots++;
      }

      searchStart++;
      searched++;
    }
  }

  // Try to spread subjects evenly across days by swapping if a subject
  // has multiple slots on the same day while another day is empty
  // (simple balancing pass)
  spreadAcrossDays(entries, availableDays, occupied);

  return entries.sort((a, b) => {
    const dayDiff = availableDays.indexOf(a.day) - availableDays.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;
    return a.startHour - b.startHour;
  });
}

function spreadAcrossDays(
  entries: PlannerEntry[],
  availableDays: string[],
  occupied: Set<string>
): void {
  // Group entries by subject
  const bySubject = new Map<string, PlannerEntry[]>();
  for (const entry of entries) {
    const list = bySubject.get(entry.subject) || [];
    list.push(entry);
    bySubject.set(entry.subject, list);
  }

  for (const [, subjectEntries] of bySubject) {
    if (subjectEntries.length <= 1) continue;

    // Count entries per day for this subject
    const dayCount = new Map<string, number>();
    for (const e of subjectEntries) {
      dayCount.set(e.day, (dayCount.get(e.day) || 0) + 1);
    }

    // Find days with more than one entry and try to move extras to empty days
    for (const e of subjectEntries) {
      const count = dayCount.get(e.day) || 0;
      if (count <= 1) continue;

      // Find a day where this subject has no entries
      for (const targetDay of availableDays) {
        if (dayCount.get(targetDay)) continue;

        // Find an open slot on the target day at the same hour
        const targetKey = `${targetDay}-${e.startHour}`;
        if (!occupied.has(targetKey)) {
          const oldKey = `${e.day}-${e.startHour}`;
          occupied.delete(oldKey);
          occupied.add(targetKey);

          dayCount.set(e.day, (dayCount.get(e.day) || 0) - 1);
          dayCount.set(targetDay, (dayCount.get(targetDay) || 0) + 1);

          e.day = targetDay;
          break;
        }

        // Try other hours on the target day
        for (const hour of PRIME_HOURS) {
          const altKey = `${targetDay}-${hour}`;
          if (!occupied.has(altKey)) {
            const oldKey = `${e.day}-${e.startHour}`;
            occupied.delete(oldKey);
            occupied.add(altKey);

            dayCount.set(e.day, (dayCount.get(e.day) || 0) - 1);
            dayCount.set(targetDay, (dayCount.get(targetDay) || 0) + 1);

            e.day = targetDay;
            e.startHour = hour;
            break;
          }
        }

        if (dayCount.get(e.day) !== count) break;
      }
    }
  }
}
