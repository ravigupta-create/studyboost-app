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

export default function DataInterpreterPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [input, setInput] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="📊" title="Data Interpreter" description="Analyze datasets to find trends, outliers, and draw conclusions." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!input.trim() || loading) return;
    generate(`You are a data scientist and statistics professor. Analyze the following dataset or data description. Provide a thorough, educational analysis that teaches the student how to interpret data.

**Data provided:**
${input}

## 📊 Data Analysis

### 📋 Data Overview
- What type of data is this? (quantitative, qualitative, time series, cross-sectional, etc.)
- How many data points/observations?
- What variables are present?
- What are the units of measurement?

### 📈 Key Trends
Identify and explain 3-5 major trends in the data:
1. **[Trend name]:** Description with specific numbers from the data. What pattern is visible?
2. **[Trend name]:** ...
(Continue for each trend)

### 🔴 Notable Outliers
- Identify any data points that deviate significantly from the pattern
- For each outlier: what is it, how much does it deviate, what might explain it?
- Should outliers be included or excluded from analysis? Why?

### 🔗 Correlations & Relationships
- What variables appear to be related?
- Is the correlation positive, negative, or none?
- Estimated strength (strong, moderate, weak)
- IMPORTANT: Correlation vs causation — what can and cannot be concluded

### ✅ Conclusions That CAN Be Drawn
List specific, defensible conclusions supported by the data. For each, cite the specific data points that support it.

### ❌ Conclusions That CANNOT Be Drawn
List common misinterpretations someone might make and explain why the data doesn't support them. This teaches critical data literacy.

### ⚠️ Data Limitations
- Sample size issues
- Missing variables / confounding factors
- Measurement concerns
- Generalizability limits

### 📐 Statistical Summary (if applicable)
Calculate or estimate:
- Mean, median, mode
- Range, standard deviation
- Any relevant statistical measures

### 💡 Next Steps
What additional data or analysis would strengthen the conclusions?`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="📊" title="Data Interpreter" description="Analyze datasets to find trends, outliers, and draw conclusions." aiPowered />
      <Card className="mb-6">
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your data here (CSV, table, or describe your dataset)...&#10;&#10;Example:&#10;Year, Population, GDP&#10;2019, 328M, 21.4T&#10;2020, 331M, 20.9T&#10;2021, 332M, 23.0T" rows={6} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !input.trim()}>
            {loading ? <><Spinner /> Analyzing Data...</> : 'Analyze Data'}
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
