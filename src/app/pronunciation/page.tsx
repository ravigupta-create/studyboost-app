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

export default function PronunciationPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [word, setWord] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🔊" title="Pronunciation Guide" description="Get IPA transcription, syllable breakdowns, and pronunciation tips." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!word.trim() || loading) return;
    generate(`You are a phonetics and pronunciation expert. Provide a comprehensive pronunciation guide for this word.

**Word:** "${word}"

## 🔊 Pronunciation Guide: "${word}"

### 📋 Quick Reference
- **IPA (American English):** /[IPA transcription]/
- **IPA (British English):** /[IPA transcription]/ (if different)
- **Respelling:** [simplified pronunciation guide using common English sounds, e.g., "pruh-NUN-see-AY-shun"]

### 📏 Syllable Breakdown
- **Syllables:** [word broken into syllables with hyphens]
- **Syllable Count:** [number]
- **Stress Pattern:** [mark the stressed syllable(s) with CAPS]
  - Primary stress: **[syllable]**
  - Secondary stress: **[syllable]** (if applicable)

### 🎯 Sound-by-Sound Guide
Break down each sound in the word:
| Sound | IPA | How to Make It |
|-------|-----|---------------|
| [each distinct sound] | [IPA symbol] | [Simple description of tongue/lip position] |

### ❌ Common Mispronunciations
1. **Wrong:** "[common mispronunciation]" — **Right:** "[correct pronunciation]" — **Why:** [explanation]
2. **Wrong:** "[another common error]" — **Right:** "[correct]" — **Why:** [explanation]
3. **Wrong:** "[if applicable]" — **Right:** "[correct]" — **Why:** [explanation]

### 🎵 Rhyming Words
Words that rhyme with "${word}":
- [word 1], [word 2], [word 3], [word 4], [word 5]

### 🧠 Memory Trick
A mnemonic, phrase, or association to remember the correct pronunciation. Make it memorable and fun.

### 🌍 Regional Variations
Note any significant pronunciation differences:
- **American English:** [pronunciation]
- **British English:** [pronunciation]
- **Australian English:** [if notably different]

### 📝 Usage in a Sentence
"[A sentence using the word where the context makes the pronunciation clearer]"

### 🔗 Related Words
Words with similar sounds or from the same root:
- **[word]** — [pronunciation] — [meaning]
- **[word]** — [pronunciation] — [meaning]`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🔊" title="Pronunciation Guide" description="Get IPA transcription, syllable breakdowns, and pronunciation tips." aiPowered />
      <Card className="mb-6">
        <Input value={word} onChange={e => setWord(e.target.value)} placeholder="Enter a word (e.g., 'epitome', 'quinoa', 'colonel')..." />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !word.trim()}>
            {loading ? <><Spinner /> Analyzing...</> : 'Get Pronunciation'}
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
