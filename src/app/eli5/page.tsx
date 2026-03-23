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

const LEVELS = ['Age 5', 'Middle School', 'High School', 'College', 'Expert'] as const;

export default function ELI5Page() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [topic, setTopic] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="👶" title="ELI5 Explainer" description="Get any topic explained at 5 levels of complexity." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!topic.trim() || loading) return;
    generate(`Explain the topic "${topic}" at 5 different levels of complexity. Use exactly the headers below and tailor vocabulary, analogies, and depth to each audience:

## Level 1: Age 5
Explain using simple words, fun analogies, and comparisons to everyday things a 5-year-old knows (toys, food, animals, family). Keep it to 2-3 sentences. No jargon.

## Level 2: Middle School
Explain for a 12-year-old student. Use straightforward language, relatable examples, and introduce basic terminology with definitions. 1 short paragraph.

## Level 3: High School
Explain at a high school level. Include proper terminology, key mechanisms/processes, and real-world applications. 1-2 paragraphs.

## Level 4: College
Explain at an undergraduate level. Include technical details, underlying principles, mathematical relationships if applicable, and nuances. Reference foundational theories or research. 2 paragraphs.

## Level 5: Expert
Explain at a graduate/professional level. Include cutting-edge research, edge cases, open questions in the field, technical precision, and interdisciplinary connections. 2-3 paragraphs.

Make each level genuinely different in depth and language, not just longer versions of the same explanation.`);
  };

  const sections = output ? output.split(/## Level \d: /).filter(Boolean) : [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="👶" title="ELI5 Explainer" description="Get any topic explained at 5 levels of complexity." aiPowered />
      <Card className="mb-6">
        <Input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Enter a topic (e.g., Quantum Entanglement, GDP, Natural Selection)..." />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !topic.trim()}>
            {loading ? <><Spinner /> Explaining...</> : 'Explain It'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && (
        <Card>
          <div className="flex gap-1 mb-4 flex-wrap">
            {LEVELS.map((level, i) => (
              <button
                key={level}
                onClick={() => setActiveTab(i)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === i
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          {sections.length > 0 && sections[activeTab] ? (
            <MarkdownRenderer content={sections[activeTab]} />
          ) : (
            <MarkdownRenderer content={output} />
          )}
        </Card>
      )}
    </div>
  );
}
