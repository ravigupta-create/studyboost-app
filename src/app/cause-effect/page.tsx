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

export default function CauseEffectPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [event, setEvent] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🔗" title="Cause & Effect Mapper" description="Map the chain of causes and effects for any event or process." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!event.trim() || loading) return;
    generate(`You are a historian, scientist, and systems thinker. Create a comprehensive cause-and-effect chain for the following event, process, or phenomenon. Show how causes cascade into effects across time.

**Event/Process/Phenomenon:** "${event}"

## 🔗 Cause & Effect Chain

### 📋 Overview
Brief 2-3 sentence description of the event/process and why understanding its cause-effect chain matters.

### 🌱 Root Causes (Deep/Structural)
These are long-term, underlying factors that created the conditions for this event:
1. **[Root Cause 1]** — Explanation of how this structural factor contributed (timeframe: years/decades before)
2. **[Root Cause 2]** — Explanation
3. **[Root Cause 3]** — Explanation

### ⚡ Immediate Causes (Triggers)
These are direct, short-term factors that directly triggered the event:
1. **[Immediate Cause 1]** — What happened and how it directly led to the event
2. **[Immediate Cause 2]** — What happened
3. **[Immediate Cause 3]** — What happened

### 💥 The Event Itself
**[Name of event]** — What actually happened, described concisely with key details.

### 📅 Short-Term Effects (Days to Years)
1. **[Effect 1]** — Description and timeframe
2. **[Effect 2]** — Description and timeframe
3. **[Effect 3]** — Description and timeframe

### 🌍 Long-Term Effects (Years to Decades+)
1. **[Effect 1]** — Description and lasting impact
2. **[Effect 2]** — Description and lasting impact
3. **[Effect 3]** — Description and lasting impact

### 🔄 Cause-Effect Chain (Visual Flow)
\`\`\`
Root Cause 1 ──┐
Root Cause 2 ──┼──→ Immediate Cause 1 ──┐
Root Cause 3 ──┘    Immediate Cause 2 ──┼──→ THE EVENT ──┬──→ Short-term 1 ──→ Long-term 1
                    Immediate Cause 3 ──┘               ├──→ Short-term 2 ──→ Long-term 2
                                                        └──→ Short-term 3 ──→ Long-term 3
\`\`\`

### 🔀 Feedback Loops
Identify any effects that fed back into causes (creating cycles):
- [Effect] → led to → [New cause] → which caused → [Further effect]

### ❓ Counterfactual Analysis
"What if?" — If the key cause had been different, how might the outcome have changed? This helps students understand causation vs correlation.

### 🎓 Key Takeaway
One-paragraph summary of the most important cause-effect relationships for exam purposes.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🔗" title="Cause & Effect Mapper" description="Map the chain of causes and effects for any event or process." aiPowered />
      <Card className="mb-6">
        <Input value={event} onChange={e => setEvent(e.target.value)} placeholder="Enter an event, process, or phenomenon (e.g., French Revolution, Climate Change, Photosynthesis)..." />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !event.trim()}>
            {loading ? <><Spinner /> Mapping...</> : 'Map Cause & Effect'}
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
