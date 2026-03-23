'use client';
import { useState } from 'react';
import { useGeminiStream } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';

export default function ComparePage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [topicA, setTopicA] = useState('');
  const [topicB, setTopicB] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="⚖️" title="Compare & Contrast" description="Generate detailed comparisons between any two topics." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!topicA.trim() || !topicB.trim() || loading) return;
    generate(`Create a comprehensive, educational comparison between "${topicA}" and "${topicB}". Be thorough, accurate, and cover multiple dimensions of comparison.

## Compare & Contrast: ${topicA} vs. ${topicB}

### 📝 Overview
Brief 2-3 sentence introduction to both topics and why comparing them is useful.

### ✅ Similarities
List 5-7 key similarities as bullet points. For each, explain the connection in 1-2 sentences.

### ❌ Key Differences
List 5-7 key differences as bullet points. For each, explain how they differ in 1-2 sentences.

### 📊 Comparison Table

| Feature | ${topicA} | ${topicB} |
|---------|-----------|-----------|
| [At least 8-10 meaningful comparison dimensions relevant to these specific topics] |

### 🔵🟡🔴 Venn Diagram Content

**Only ${topicA}:**
- [3-5 unique characteristics]

**Both ${topicA} and ${topicB}:**
- [3-5 shared characteristics]

**Only ${topicB}:**
- [3-5 unique characteristics]

### 🎓 Study Tip
How to remember the key differences between these two topics (mnemonic, analogy, or memory trick).

### 📌 Common Exam Question
A sample exam question that tests understanding of the differences between these two topics, with the ideal answer.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="⚖️" title="Compare & Contrast" description="Generate detailed comparisons between any two topics." aiPowered />
      <Card className="mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Topic A</label>
            <Input value={topicA} onChange={e => setTopicA(e.target.value)} placeholder="e.g., Mitosis, Capitalism, World War I..." />
          </div>
          <div className="flex items-center justify-center">
            <span className="text-lg font-bold text-gray-400">VS</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Topic B</label>
            <Input value={topicB} onChange={e => setTopicB(e.target.value)} placeholder="e.g., Meiosis, Socialism, World War II..." />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !topicA.trim() || !topicB.trim()}>
            {loading ? <><Spinner /> Comparing...</> : 'Compare Topics'}
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
