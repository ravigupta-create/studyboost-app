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

export default function KnowledgeGraphPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [input, setInput] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🕸️" title="Knowledge Graph" description="Extract concepts and relationships from your notes into a structured graph." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!input.trim() || loading) return;
    generate(`You are a knowledge engineer. Analyze the following notes and extract a structured knowledge graph. Output in this exact format:

## Concepts
List every key concept/entity found in the notes. For each, provide:
- **Concept Name** — Brief definition (1 sentence) | Category: [Person/Event/Theory/Process/Term/Place/Other]

## Relationships
List all meaningful relationships between concepts. Use this format for each:
- **Concept A** → **Concept B**: Description of relationship (e.g., "causes", "is a type of", "discovered by", "leads to", "contrasts with", "is part of")

## Hierarchy
Show the hierarchical structure of concepts using indented bullets:
- Broadest concept
  - Sub-concept
    - Specific detail

## Key Clusters
Group related concepts into 2-4 thematic clusters. Name each cluster and list its member concepts.

Be thorough — extract ALL concepts and relationships from the notes, even implicit ones.

NOTES:
${input}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🕸️" title="Knowledge Graph" description="Extract concepts and relationships from your notes into a structured graph." aiPowered />
      <Card className="mb-6">
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your notes here..." rows={6} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !input.trim()}>
            {loading ? <><Spinner /> Analyzing...</> : 'Build Knowledge Graph'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
