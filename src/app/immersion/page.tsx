'use client';
import { useState } from 'react';
import { useGeminiStream } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';

const LANGUAGES = ['Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese', 'Korean', 'Mandarin Chinese'];
const DIFFICULTIES = [
  { value: '25', label: 'Beginner (25% replaced)' },
  { value: '50', label: 'Intermediate (50% replaced)' },
  { value: '75', label: 'Advanced (75% replaced)' },
];

export default function ImmersionPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('Spanish');
  const [difficulty, setDifficulty] = useState('25');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🌍" title="Language Immersion" description="Learn vocabulary through immersive text with mixed languages." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!text.trim() || loading) return;
    const pct = parseInt(difficulty);
    generate(`You are a language immersion teacher. Take the following English text and replace approximately ${pct}% of the words with their ${language} translations. This creates an immersive learning experience.

**Rules:**
- Replace roughly ${pct}% of content words (nouns, verbs, adjectives, adverbs) with ${language} translations
- Keep English grammar structure intact (word order stays English)
- At ${pct}% difficulty: ${pct === 25 ? 'Replace only common, simple nouns and adjectives. Keep all verbs and complex words in English.' : pct === 50 ? 'Replace nouns, common adjectives, and simple verbs. Keep complex phrases and idioms in English.' : 'Replace most content words including verbs, nouns, adjectives, and adverbs. Only keep function words (the, is, of, etc.) and very complex phrases in English.'}
- Bold the replaced words: **${language} word**
- Make sure the English meaning is still understandable from context
- Use the most common/standard translation for each word

**English Text:**
"${text}"

## 🌍 Immersive Text (${pct}% ${language})

[Provide the mixed-language text here, with ${language} words in bold]

---

## 📖 Vocabulary Key

| ${language} Word | English Translation | Pronunciation |
|-----------------|-------------------|---------------|
| [each replaced word] | [English meaning] | [approximate pronunciation guide] |

## 💡 Grammar Notes
Point out 2-3 interesting differences between English and ${language} grammar that are relevant to the words used in this text.

## 🎯 Practice
Write 3 short sentences using the new ${language} vocabulary words from this exercise.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🌍" title="Language Immersion" description="Learn vocabulary through immersive text with mixed languages." aiPowered />
      <Card className="mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">English Text</label>
            <Textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste any English text here (article, story, textbook passage)..." rows={5} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Language</label>
              <Select value={language} onChange={e => setLanguage(e.target.value)}>
                {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Difficulty</label>
              <Select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                {DIFFICULTIES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </Select>
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !text.trim()}>
            {loading ? <><Spinner /> Immersing...</> : 'Create Immersion Text'}
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
