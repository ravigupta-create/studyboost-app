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

export default function MindMapPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [input, setInput] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🗺️" title="Mind Map Generator" description="Transform your notes into a hierarchical mind map with branches and sub-branches." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!input.trim() || loading) return;
    generate(`You are an expert at organizing information visually. Given the following notes, create a comprehensive hierarchical mind map in markdown format.

Structure:
- Start with the **Central Topic** as a top-level header
- Use indented bullet points to show hierarchy:
  - Main branches (## level concepts) as first-level bullets
    - Sub-branches as second-level indented bullets
      - Details/examples as third-level indented bullets
- Use **bold** for key terms
- Use emojis sparingly to categorize branches (e.g., 📌 for key facts, 🔗 for connections, 💡 for insights)
- Aim for 4-6 main branches with 2-4 sub-branches each
- Add a "Connections" section at the end showing how branches relate to each other

Make the mind map comprehensive yet scannable. Every important concept from the notes should appear somewhere in the map.

NOTES:
${input}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🗺️" title="Mind Map Generator" description="Transform your notes into a hierarchical mind map with branches and sub-branches." aiPowered />
      <Card className="mb-6">
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your notes here..." rows={6} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !input.trim()}>
            {loading ? <><Spinner /> Generating...</> : 'Generate Mind Map'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
