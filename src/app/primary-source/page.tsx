'use client';
import { useState } from 'react';
import { useGeminiStream } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';

export default function PrimarySourcePage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [sourceText, setSourceText] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="📜" title="Primary Source Analyzer" description="Analyze primary source documents for context, bias, and significance." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!sourceText.trim() || loading) return;
    generate(`You are a historian specializing in primary source analysis. Analyze this primary source document using the HIPP (Historical context, Intended audience, Point of view, Purpose) framework and SOAPSTone method.

**Primary Source Text:**
"${sourceText}"

${author ? `**Author:** ${author}` : '**Author:** Unknown'}
${date ? `**Date:** ${date}` : '**Date:** Not specified'}

Provide a thorough analysis:

## 📜 Primary Source Analysis

### 📋 Document Overview
- **Type of Document:** (letter, speech, diary, law, newspaper, etc.)
- **Author:** Who wrote this and what do we know about them?
- **Date/Period:** When was this created and what was happening at that time?

### 🌍 Historical Context
- What major events were occurring when this was written?
- What social, political, and economic conditions existed?
- What led to the creation of this document?
- How does this document fit into the broader historical narrative?

### 👤 Author's Perspective & Point of View
- What is the author's background, position, or role?
- How might their identity (class, gender, race, nationality, profession) influence their perspective?
- What assumptions does the author seem to hold?
- What emotions or tone are evident in the text?

### 🎯 Intended Audience
- Who was this written for?
- How might the intended audience affect what was included or excluded?
- Was this meant to be public or private?

### ⚠️ Potential Biases
- What biases are present (explicit or implicit)?
- What perspectives or voices are missing?
- What might the author be exaggerating, downplaying, or omitting?
- How reliable is this source and why?

### 🔑 Significance
- Why is this document historically important?
- What does it reveal about the time period?
- How has this document been used or interpreted by historians?

### 🔗 Connections to Broader Events
- How does this connect to major themes in history?
- What other primary sources would provide useful comparison?
- What happened as a result of or in response to this document?

### 📝 Key Quotes & Analysis
Pull out 2-3 key quotes from the text and explain their significance.

### 🎓 Essay-Ready Analysis
A 3-4 sentence analytical paragraph that a student could use as a model for writing about this source in a DBQ or analytical essay.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="📜" title="Primary Source Analyzer" description="Analyze primary source documents for context, bias, and significance." aiPowered />
      <Card className="mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Primary Source Text *</label>
            <Textarea value={sourceText} onChange={e => setSourceText(e.target.value)} placeholder="Paste the primary source text here..." rows={6} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author (if known)</label>
              <Input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author name..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date (if known)</label>
              <Input value={date} onChange={e => setDate(e.target.value)} placeholder="Date or time period..." />
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !sourceText.trim()}>
            {loading ? <><Spinner /> Analyzing...</> : 'Analyze Source'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && (
        <Card>
          <MarkdownRenderer content={output} />
        </Card>
      )}
    </div>
  );
}
