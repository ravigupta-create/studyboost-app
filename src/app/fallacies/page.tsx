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

export default function FallaciesPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [input, setInput] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🧩" title="Logical Fallacy Finder" description="Identify logical fallacies in arguments and learn how to fix them." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!input.trim() || loading) return;
    generate(`You are a logic and critical thinking professor. Analyze the following argument or persuasive text for logical fallacies. Be thorough — identify ALL fallacies present, even subtle ones.

Text to analyze:
"${input}"

Format your response as:

## 🧩 Logical Fallacy Analysis

### Overall Assessment
Brief summary: How logically sound is this argument? (Strong / Moderate / Weak / Very Weak)
Total fallacies found: X

---

For each fallacy found:

### Fallacy #1: [Name of Fallacy]
- **📌 Category:** Formal / Informal (and subcategory: Appeal to Emotion, Red Herring, etc.)
- **📝 The Excerpt:** "[Quote the exact portion of the text that contains this fallacy]"
- **❌ Why It's Fallacious:** Clear explanation of the logical error being made — what makes the reasoning invalid
- **🔧 How to Fix It:** Rewrite the argument to make the same point without the fallacy. Show what a logically valid version would look like.
- **📚 Learn More:** One-sentence definition of this fallacy type for future reference

---

[Repeat for each fallacy]

### ✅ What the Argument Gets Right
Identify any parts of the argument that ARE logically sound (if any).

### 🎓 Strengthened Version
Rewrite the entire argument in a logically sound way that maintains the original intent but removes all fallacies. Show how the same point can be made with valid reasoning and proper evidence.

### 💡 Quick Reference
List all fallacy types found in this text as a bullet list with one-line definitions — useful as a study reference.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🧩" title="Logical Fallacy Finder" description="Identify logical fallacies in arguments and learn how to fix them." aiPowered />
      <Card className="mb-6">
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste an argument, persuasive essay, speech excerpt, debate transcript, or any text you want to analyze for logical fallacies..." rows={6} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !input.trim()}>
            {loading ? <><Spinner /> Analyzing...</> : 'Find Fallacies'}
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
