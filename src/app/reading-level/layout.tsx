import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Reading Level Analyzer — StudyBoost', description: 'Analyze text readability with Flesch-Kincaid, Gunning Fog, SMOG, and more.' };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
