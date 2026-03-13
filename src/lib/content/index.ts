import { AssessmentQuestion, LessonProblem } from '@/types';
import { QUESTIONS as Q1, LESSONS as L1, PRACTICE as P1 } from './math1h';
import { QUESTIONS as Q2, LESSONS as L2, PRACTICE as P2 } from './math2h';
import { QUESTIONS as Q3, LESSONS as L3, PRACTICE as P3 } from './math3h';

const QUESTIONS_MAP: Record<string, AssessmentQuestion[]> = {
  math1h: Q1,
  math2h: Q2,
  math3h: Q3,
};

const ALL_LESSONS: Record<string, string> = { ...L1, ...L2, ...L3 };
const ALL_PRACTICE: Record<string, LessonProblem[]> = { ...P1, ...P2, ...P3 };

export function getAssessmentQuestions(courseId: string): AssessmentQuestion[] {
  return QUESTIONS_MAP[courseId] || [];
}

export function getLessonContent(topicId: string): string {
  return ALL_LESSONS[topicId] || '';
}

export function getPracticeProblems(topicId: string): LessonProblem[] {
  return ALL_PRACTICE[topicId] || [];
}
