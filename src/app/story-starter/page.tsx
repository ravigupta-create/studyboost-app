'use client';
import { useState } from 'react';
import { useGeminiStream } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';

const GENRES = [
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'sci-fi', label: 'Sci-Fi' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'romance', label: 'Romance' },
  { value: 'horror', label: 'Horror' },
  { value: 'literary', label: 'Literary Fiction' },
];

const MOODS = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'suspenseful', label: 'Suspenseful' },
  { value: 'humorous', label: 'Humorous' },
];

export default function StoryStarterPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [genre, setGenre] = useState('fantasy');
  const [mood, setMood] = useState('dark');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="✨" title="Story Starter" description="Select a genre and mood to generate creative story beginnings." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (loading) return;
    const genreLabel = GENRES.find(g => g.value === genre)?.label;
    const moodLabel = MOODS.find(m => m.value === mood)?.label;
    generate(`You are a creative writing instructor and published author. Generate 3 unique story starters for a **${genreLabel}** story with a **${moodLabel}** mood.

For each story starter, provide:

---

## Story Starter 1: "[Evocative Title]"

### Opening Paragraph
Write a compelling opening paragraph (4-6 sentences) that immediately hooks the reader. Use vivid sensory details and establish the mood from the first sentence.

### Character Sketch
- **Name:** [Full name]
- **Age:** [Age]
- **Key Trait:** [Defining personality trait]
- **Secret:** [Something hidden about them]
- **Motivation:** [What drives them]
- **Brief Description:** [2-3 sentences of physical and personality description]

### Setting Description
Describe the primary setting in rich detail (3-4 sentences). Include time period, atmosphere, unique features, and sensory details (sights, sounds, smells).

### Central Conflict
Describe the main conflict or tension that will drive the story (2-3 sentences). What is at stake? What obstacles exist?

---

(Repeat for Story Starters 2 and 3)

Make each starter distinctly different in concept, characters, and conflict. They should all feel authentically ${genreLabel} with a ${moodLabel} tone. Write with literary quality — show, don't tell.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="✨" title="Story Starter" description="Select a genre and mood to generate creative story beginnings." aiPowered />
      <Card className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Genre</label>
            <Select value={genre} onChange={e => setGenre(e.target.value)}>
              {GENRES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Mood</label>
            <Select value={mood} onChange={e => setMood(e.target.value)}>
              {MOODS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </Select>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? <><Spinner /> Creating...</> : 'Generate Story Starters'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
