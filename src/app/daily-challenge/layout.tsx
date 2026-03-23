import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Daily Challenge — StudyBoost', description: 'Date-seeded daily quiz with 5 questions and score calendar.' };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
