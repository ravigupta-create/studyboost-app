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

export default function MnemonicsPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [input, setInput] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🔤" title="Mnemonic Creator" description="Enter facts or terms and get 3 types of mnemonics to help you memorize them." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!input.trim() || loading) return;
    generate(`You are a memory techniques expert. Given the following list of facts or terms to memorize, create 3 different types of mnemonics:

## 1. Acronym/Acrostic Mnemonic
Create a catchy acronym or acrostic sentence using the first letters of the key terms. Explain what each letter stands for. Make it easy to remember and pronounce if possible.

## 2. Story/Narrative Mnemonic
Weave all the facts/terms into a short, vivid, and slightly absurd story (2-3 paragraphs). The stranger and more visual the story, the more memorable it will be. Highlight how each fact connects to a story element.

## 3. Visual Association Mnemonic
For each fact/term, describe a vivid mental image or scene that links to the concept. Use the Method of Loci (memory palace) technique — place each item in a specific location in an imaginary room or path. Describe each visual in detail.

At the end, add a brief "How to Use These" section with tips for the student on reviewing and reinforcing the mnemonics.

FACTS/TERMS TO MEMORIZE:
${input}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🔤" title="Mnemonic Creator" description="Enter facts or terms and get 3 types of mnemonics to help you memorize them." aiPowered />
      <Card className="mb-6">
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter the facts or terms you want to memorize (one per line or comma-separated)..." rows={5} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !input.trim()}>
            {loading ? <><Spinner /> Creating...</> : 'Create Mnemonics'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
