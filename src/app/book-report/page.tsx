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

export default function BookReportPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="📚" title="Book Report Helper" description="Enter a book title and author to get a structured book report template." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!title.trim() || !author.trim() || loading) return;
    generate(`You are a literature teacher helping a student write a book report. Generate a comprehensive, structured book report template for:

**Book:** "${title}" by ${author}

## Book Information
- **Title:** ${title}
- **Author:** ${author}
- **Genre:** [Identify the genre]
- **Publication Year:** [If known]
- **Setting:** Time period and location(s)

## Summary
Provide a structured summary covering:
- **Who:** Main characters and their roles
- **What:** Central plot/events (without major spoilers — indicate "SPOILER" sections)
- **When:** Time period the story takes place
- **Where:** Key locations
- **Why:** What drives the story forward

## Theme Analysis
Identify 3 major themes. For each:
- **Theme:** [Name]
- **How it appears:** [Examples from the book]
- **What the author is saying:** [The message or commentary]

## Character Analysis
For the 2-3 most important characters:
- **Name:** [Character name]
- **Role:** [Protagonist, antagonist, etc.]
- **Key Traits:** [3-4 defining characteristics]
- **Character Arc:** [How do they change?]
- **Key Quote:** [A representative quote if known]

## Personal Response Prompts
Provide 5 thought-provoking prompts the student can use for their personal response section:
1. [Prompt about connecting to personal experience]
2. [Prompt about evaluating the author's choices]
3. [Prompt about the most impactful scene]
4. [Prompt about what they would change]
5. [Prompt about recommendations]

## Connections to Other Works
Suggest 3 other books that share similar themes, styles, or topics. For each, briefly explain the connection.

Note: This is a template to guide the student's own analysis. Encourage them to add their own insights and examples.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="📚" title="Book Report Helper" description="Enter a book title and author to get a structured book report template." aiPowered />
      <Card className="mb-6">
        <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Book title (e.g., To Kill a Mockingbird)" className="mb-4" />
        <Input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author (e.g., Harper Lee)" />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !title.trim() || !author.trim()}>
            {loading ? <><Spinner /> Generating...</> : 'Generate Book Report'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
