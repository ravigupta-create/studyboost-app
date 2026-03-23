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

export default function BiasPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [input, setInput] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🔎" title="Bias Detector" description="Analyze text for biases and get suggestions for balanced treatment." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!input.trim() || loading) return;
    generate(`You are a media literacy and critical thinking expert. Analyze this text for various types of bias. Be thorough, fair, and educational.

**Text to analyze:**
"${input}"

## 🔎 Bias Analysis

### 📋 Overall Bias Assessment
- **Bias Level:** Heavily Biased / Moderately Biased / Slightly Biased / Relatively Neutral
- **Primary Direction:** Left-leaning / Right-leaning / Corporate / Academic / Other
- **Tone:** Objective / Persuasive / Emotional / Inflammatory / Neutral

### 🔍 Biases Identified

For each bias found:

#### Bias #1: [Type of Bias]
(e.g., Confirmation bias, Selection bias, Framing bias, Omission bias, Linguistic bias, Cultural bias, Gender bias, Racial bias, Corporate bias, Political bias, Anchoring bias)
- **📝 Specific Example:** "[Quote the exact text that demonstrates this bias]"
- **❌ Why It's Biased:** Explain what makes this biased and how it could mislead the reader
- **🔄 Alternative Perspective:** What viewpoint or information is missing?
- **✅ More Balanced Version:** Rewrite the biased excerpt in a neutral way

[Repeat for each bias found]

### 👁️ Missing Perspectives
List perspectives, voices, or viewpoints that are NOT represented in this text:
- Who is quoted or referenced? Who is not?
- What demographics, viewpoints, or stakeholders are absent?
- What counter-evidence or opposing data is omitted?

### 📰 Language Analysis
- **Loaded words:** List emotionally charged words used and their neutral alternatives
- **Framing:** How is the topic framed? What alternative framing exists?
- **Headlines vs content:** Does the tone match? Is the headline more extreme?

### ✅ Suggestions for More Balanced Treatment
1. [Specific suggestion with example]
2. [Specific suggestion with example]
3. [Specific suggestion with example]

### 🎓 Media Literacy Takeaway
What general lesson about media consumption can the student learn from analyzing this text?`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🔎" title="Bias Detector" description="Analyze text for biases and get suggestions for balanced treatment." aiPowered />
      <Card className="mb-6">
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste an article, essay, speech, or any text to analyze for bias..." rows={6} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !input.trim()}>
            {loading ? <><Spinner /> Detecting Bias...</> : 'Detect Bias'}
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
