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

export default function IdiomsPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [idiom, setIdiom] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="💬" title="Idiom Explorer" description="Understand idioms: meanings, origins, usage, and cross-language equivalents." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!idiom.trim() || loading) return;
    generate(`You are a linguist and etymologist. Provide a comprehensive analysis of this idiom or phrase. Be entertaining and educational.

**Idiom/Phrase:** "${idiom}"

## 💬 Idiom Explorer: "${idiom}"

### 📖 Meanings
- **Literal Meaning:** What the words actually say if taken at face value
- **Figurative Meaning:** What the idiom actually means in everyday usage
- **Register:** Formal / Informal / Slang — When is it appropriate to use?

### 🏛️ Origin & History
- **Etymology:** Where did this phrase come from?
- **First Known Use:** Approximate date/era
- **Historical Context:** The story behind how this idiom developed
- **Evolution:** Has the meaning changed over time?

### 📝 Usage Examples
3 example sentences showing different contexts:

1. **Casual conversation:** "[sentence using the idiom naturally]"
   *Context:* [brief explanation of the situation]

2. **Professional/Academic:** "[sentence using the idiom in a more formal context]"
   *Context:* [brief explanation]

3. **Writing/Literature:** "[sentence showing the idiom in written form]"
   *Context:* [brief explanation]

### 🌍 Similar Idioms in Other Languages
| Language | Idiom | Literal Translation | Meaning |
|----------|-------|-------------------|---------|
| Spanish | [equivalent] | [literal] | [meaning] |
| French | [equivalent] | [literal] | [meaning] |
| German | [equivalent] | [literal] | [meaning] |
| Japanese/Chinese | [equivalent] | [literal] | [meaning] |

### 🔗 Related English Idioms
List 3-4 English idioms with similar meanings:
- **"[idiom]"** — [meaning] — [how it relates]

### ⚠️ Common Misuses
- How this idiom is sometimes used incorrectly
- What NOT to say and why

### 💡 Memory Tip
A fun way to remember what this idiom means.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="💬" title="Idiom Explorer" description="Understand idioms: meanings, origins, usage, and cross-language equivalents." aiPowered />
      <Card className="mb-6">
        <Input value={idiom} onChange={e => setIdiom(e.target.value)} placeholder="Enter an idiom or phrase (e.g., 'break the ice', 'bite the bullet', 'piece of cake')..." />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !idiom.trim()}>
            {loading ? <><Spinner /> Exploring...</> : 'Explore Idiom'}
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
