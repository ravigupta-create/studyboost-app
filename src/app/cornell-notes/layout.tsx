import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Cornell Notes — StudyBoost', description: 'Structured note-taking with cue, notes, and summary sections.' };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
