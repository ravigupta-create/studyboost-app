'use client';
import { useState } from 'react';
import { useGeminiStream } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Spinner } from '@/components/ui/Spinner';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';

export default function LabReportPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [topic, setTopic] = useState('');
  const [results, setResults] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🔬" title="Lab Report Generator" description="Enter your experiment topic and results to get a structured lab report." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!topic.trim() || loading) return;
    generate(`You are a science teacher helping a student write a professional lab report. Generate a complete, structured lab report in proper scientific writing style (third person, past tense, objective tone).

**Experiment Topic:** ${topic}
**Student's Results/Observations:** ${results || 'Not provided — generate realistic expected results'}

## Title
[Write a descriptive, specific title for the experiment]

## Purpose
State the purpose of the experiment in 1-2 sentences. What question is being investigated?

## Hypothesis
Write a clear hypothesis in "If... then... because..." format.

## Materials
List all materials and equipment needed in a bulleted list. Include specific quantities and measurements.

## Procedure
Write numbered step-by-step instructions. Be specific enough that someone could replicate the experiment. Include safety precautions where relevant.

## Data & Observations
- Create a data table (in markdown table format) showing expected or provided measurements
- Describe qualitative observations (what was seen, smelled, heard, etc.)
- Note any unexpected observations

## Data Analysis
- Explain what the data shows
- Calculate relevant values (averages, percentages, rates, etc.)
- Describe trends or patterns
- If applicable, describe what a graph of the data would show

## Conclusion
- Restate the hypothesis and whether it was supported or rejected
- Summarize key findings with specific data references
- Explain possible sources of error
- Suggest improvements or follow-up experiments

## Discussion Questions
Provide 3 questions for deeper scientific thinking about this experiment.

Use proper scientific terminology throughout. Keep the tone objective and professional.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🔬" title="Lab Report Generator" description="Enter your experiment topic and results to get a structured lab report." aiPowered />
      <Card className="mb-6">
        <Input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Experiment topic (e.g., Effect of pH on enzyme activity)" className="mb-4" />
        <Textarea value={results} onChange={e => setResults(e.target.value)} placeholder="Your results and observations (optional — leave blank for expected results)..." rows={4} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !topic.trim()}>
            {loading ? <><Spinner /> Generating...</> : 'Generate Lab Report'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && <Card><MarkdownRenderer content={output} /></Card>}
    </div>
  );
}
