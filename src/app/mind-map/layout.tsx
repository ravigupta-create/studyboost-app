import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Mind Map Generator — StudyBoost', description: 'Generate a hierarchical mind map from your notes as formatted markdown.' };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
