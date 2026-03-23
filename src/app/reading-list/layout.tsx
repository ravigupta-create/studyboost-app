import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Reading List — StudyBoost', description: 'Track your books with status, ratings, and estimated reading times.' };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
