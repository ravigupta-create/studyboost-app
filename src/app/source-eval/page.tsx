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

export default function SourceEvalPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publication, setPublication] = useState('');
  const [date, setDate] = useState('');
  const [url, setUrl] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🔍" title="Source Evaluator" description="Evaluate source reliability using the CRAAP test." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!title.trim() || loading) return;
    generate(`You are a research librarian and information literacy expert. Evaluate this source using the CRAAP test framework. Be thorough and honest in your assessment.

**Source Details:**
- Title: ${title}
${author ? `- Author: ${author}` : '- Author: Not provided'}
${publication ? `- Publication/Publisher: ${publication}` : '- Publication: Not provided'}
${date ? `- Date: ${date}` : '- Date: Not provided'}
${url ? `- URL: ${url}` : '- URL: Not provided'}

Provide your evaluation in this exact format:

## CRAAP Test Evaluation

### 📅 Currency — Score: X/5 ⭐
- **How recent is the information?** Analysis based on the date provided
- **Has the information been updated?** Assessment
- **Are links functional?** Assessment if URL provided
- **Is currency important for this topic?** Context-specific analysis

### 🎯 Relevance — Score: X/5 ⭐
- **Does it relate to your research needs?** General assessment
- **Who is the intended audience?** Identify target readership
- **Is the information at an appropriate level?** Assess depth
- **Would you be comfortable citing this source?** Professional judgment

### 👤 Authority — Score: X/5 ⭐
- **Who is the author/publisher?** Credentials analysis
- **What are their qualifications?** Expert assessment
- **Is there contact information?** Accountability check
- **Does the URL reveal anything about the source?** Domain analysis (.edu, .gov, .com, .org)

### ✅ Accuracy — Score: X/5 ⭐
- **Is the information supported by evidence?** Likely assessment
- **Has it been reviewed or refereed?** Peer review status
- **Can you verify the information elsewhere?** Cross-reference potential
- **Are there spelling/grammar errors?** Quality indicators

### 🎯 Purpose — Score: X/5 ⭐
- **Why does this information exist?** Inform, teach, sell, entertain, persuade?
- **Is the purpose clearly stated?** Transparency assessment
- **Is it fact, opinion, or propaganda?** Content type
- **Are there biases?** Objectivity assessment

---

## 📊 Overall Reliability Rating

| Criterion | Score |
|-----------|-------|
| Currency | X/5 |
| Relevance | X/5 |
| Authority | X/5 |
| Accuracy | X/5 |
| Purpose | X/5 |
| **Total** | **X/25** |

### Overall Verdict: [Highly Reliable / Reliable / Use with Caution / Unreliable]
[2-3 sentence summary of the source's overall reliability and recommendations for using it]

### 💡 Recommendation
Should the student cite this source? Under what conditions? What supplementary sources should they look for?`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🔍" title="Source Evaluator" description="Evaluate source reliability using the CRAAP test." aiPowered />
      <Card className="mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Source Title *</label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Article or source title..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author</label>
              <Input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author name..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Publication</label>
              <Input value={publication} onChange={e => setPublication(e.target.value)} placeholder="Publisher or website..." />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
              <Input value={date} onChange={e => setDate(e.target.value)} placeholder="Publication date..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL</label>
              <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." />
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !title.trim()}>
            {loading ? <><Spinner /> Evaluating...</> : 'Evaluate Source'}
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
