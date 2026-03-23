'use client';
import { useState } from 'react';
import { useGeminiStream } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';

const LANGUAGES = ['Spanish', 'French', 'German', 'Italian'];

export default function ConjugationPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [language, setLanguage] = useState('Spanish');
  const [verb, setVerb] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🗣️" title="Verb Conjugator" description="Get full conjugation tables for verbs in multiple languages." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!verb.trim() || loading) return;
    generate(`You are a ${language} language professor. Provide a complete conjugation table for the verb "${verb}" in ${language}. Be accurate and thorough.

## 🗣️ ${language} Verb Conjugation: "${verb}"

### 📋 Verb Info
- **Infinitive:** ${verb}
- **Translation:** [English meaning]
- **Verb Type:** [Regular/Irregular] — [verb group/conjugation class]
- **Auxiliary Verb:** [if applicable, e.g., avoir/être in French, haben/sein in German]

### 📊 Conjugation Tables

#### Present Tense (Presente/Présent/Präsens/Presente)
| Pronoun | Conjugation | Pronunciation Guide |
|---------|-------------|-------------------|
| [1st person singular] | | |
| [2nd person singular] | | |
| [3rd person singular] | | |
| [1st person plural] | | |
| [2nd person plural] | | |
| [3rd person plural] | | |

#### Past Tense (Pretérito/Passé Composé/Präteritum/Passato Prossimo)
| Pronoun | Conjugation | Pronunciation Guide |
|---------|-------------|-------------------|
[Full table]

#### Future Tense (Futuro/Futur Simple/Futur I/Futuro Semplice)
| Pronoun | Conjugation | Pronunciation Guide |
|---------|-------------|-------------------|
[Full table]

#### Conditional (Condicional/Conditionnel/Konjunktiv II/Condizionale)
| Pronoun | Conjugation | Pronunciation Guide |
|---------|-------------|-------------------|
[Full table]

### 📝 Example Sentences
Provide 3 example sentences using different tenses, each with:
1. **${language}:** [sentence]
   **English:** [translation]
   **Tense used:** [which tense]

2. **${language}:** [sentence]
   **English:** [translation]
   **Tense used:** [which tense]

3. **${language}:** [sentence]
   **English:** [translation]
   **Tense used:** [which tense]

### ⚠️ Common Mistakes
List 2-3 common mistakes students make with this verb and how to avoid them.

### 💡 Memory Tip
A mnemonic or pattern to help remember this verb's conjugation.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🗣️" title="Verb Conjugator" description="Get full conjugation tables for verbs in multiple languages." aiPowered />
      <Card className="mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Language</label>
            <Select value={language} onChange={e => setLanguage(e.target.value)}>
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Verb (in {language} or English)</label>
            <Input value={verb} onChange={e => setVerb(e.target.value)} placeholder={`e.g., ${language === 'Spanish' ? 'hablar, ser, tener' : language === 'French' ? 'parler, être, avoir' : language === 'German' ? 'sprechen, sein, haben' : 'parlare, essere, avere'}`} />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !verb.trim()}>
            {loading ? <><Spinner /> Conjugating...</> : 'Conjugate Verb'}
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
