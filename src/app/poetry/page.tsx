'use client';
import { useState } from 'react';
import { useGeminiStream } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Spinner } from '@/components/ui/Spinner';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';

export default function PoetryPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [input, setInput] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="📜" title="Poetry Analyzer" description="Paste a poem and get a detailed analysis of form, devices, themes, and meaning." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!input.trim() || loading) return;
    generate(`You are a literature professor specializing in poetry analysis. Provide a comprehensive analysis of the following poem.

## Form & Structure
- **Type/Form:** (Sonnet, Free Verse, Haiku, Villanelle, Ode, etc.)
- **Rhyme Scheme:** Label each line's end rhyme (ABAB, ABBA, etc.). If free verse, note that.
- **Meter:** Identify the dominant meter (iambic pentameter, trochaic tetrameter, etc.) with scansion examples from 1-2 lines. If irregular, describe the rhythmic pattern.
- **Stanza Structure:** Number of stanzas, lines per stanza, any patterns.

## Literary Devices
For each device found, cite the specific line(s):
- **Metaphor/Simile** — quote and explain
- **Imagery** — identify the senses evoked (visual, auditory, tactile, etc.)
- **Personification** — quote and explain
- **Alliteration/Assonance/Consonance** — quote examples
- **Symbolism** — identify symbols and their meaning
- **Enjambment/Caesura** — note line breaks and pauses
- Include any other devices present (irony, hyperbole, oxymoron, etc.)

## Themes
Identify 2-3 central themes. For each, explain how the poem develops and supports the theme with textual evidence.

## Tone & Mood
Describe the tone (speaker's attitude) and mood (reader's feeling). Note any shifts in tone and where they occur.

## Historical & Cultural Context
If the poem or poet is recognizable, provide brief context about the poet, era, and literary movement. If unrecognizable, comment on stylistic influences.

## Interpretation
Provide a thoughtful 1-2 paragraph interpretation of the poem's overall meaning and significance.

POEM:
${input}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="📜" title="Poetry Analyzer" description="Paste a poem and get a detailed analysis of form, devices, themes, and meaning." aiPowered />
      <Card className="mb-6">
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste a poem here..." rows={8} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !input.trim()}>
            {loading ? <><Spinner /> Analyzing...</> : 'Analyze Poem'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
