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

export default function DiagramPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [sentence, setSentence] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="📐" title="Sentence Diagrammer" description="Break down sentences into grammatical components." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!sentence.trim() || loading) return;
    generate(`You are an English grammar expert and linguist. Diagram and analyze this sentence, breaking it into all its grammatical components. Make it educational and clear.

**Sentence:** "${sentence}"

## 📐 Sentence Diagram

### 📋 Sentence Type
- **Structure:** Simple / Compound / Complex / Compound-Complex
- **Purpose:** Declarative / Interrogative / Imperative / Exclamatory
- **Voice:** Active / Passive

### 🏗️ Core Structure
\`\`\`
[Subject] ──── [Predicate/Verb] ──── [Object/Complement]
\`\`\`

### 🔤 Word-by-Word Breakdown

| Word | Part of Speech | Function | Modifies |
|------|---------------|----------|----------|
| [each word] | [noun, verb, adj, adv, prep, conj, det, pron, etc.] | [subject, predicate, direct object, indirect object, modifier, etc.] | [which word it modifies, if applicable] |

### 🟦 Subject Analysis
- **Simple Subject:** [the main noun/pronoun]
- **Complete Subject:** [subject + all its modifiers]
- **Modifiers:** List each modifier and what it adds to the meaning

### 🟩 Predicate Analysis
- **Simple Predicate:** [the main verb/verb phrase]
- **Complete Predicate:** [verb + all objects, complements, and modifiers]
- **Verb Type:** Action / Linking / Helping
- **Tense:** [Present/Past/Future + Simple/Progressive/Perfect/Perfect Progressive]

### 🟨 Objects & Complements
- **Direct Object:** [if present] — receives the action of the verb
- **Indirect Object:** [if present] — to/for whom the action is done
- **Subject Complement:** [if linking verb] — renames/describes the subject
- **Object Complement:** [if present] — renames/describes the object

### 🟪 Modifiers
For each modifier in the sentence:
- **"[word/phrase]"** — Type: [adjective/adverb/prepositional phrase/participial phrase] — Modifies: [which word] — Adds: [what meaning it contributes]

### 🟧 Prepositional Phrases
For each prepositional phrase:
- **"[phrase]"** — Preposition: [word] — Object of preposition: [word] — Functions as: [adjective/adverb] — Modifies: [which word]

### 📎 Clauses (if applicable)
- **Independent clause(s):** [identify]
- **Dependent clause(s):** [identify] — Type: [noun/adjective/adverb clause] — Introduced by: [subordinating conjunction/relative pronoun]

### 🎓 Grammar Lesson
Explain one interesting grammar concept demonstrated by this sentence that would help a student understand English grammar better.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="📐" title="Sentence Diagrammer" description="Break down sentences into grammatical components." aiPowered />
      <Card className="mb-6">
        <Input value={sentence} onChange={e => setSentence(e.target.value)} placeholder="Enter a sentence to diagram (e.g., 'The curious cat quickly chased the small mouse across the garden.')..." />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !sentence.trim()}>
            {loading ? <><Spinner /> Diagramming...</> : 'Diagram Sentence'}
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
