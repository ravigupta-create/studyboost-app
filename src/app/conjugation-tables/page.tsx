'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';

type Language = 'Spanish' | 'French' | 'German';
type Tense = 'Present' | 'Past' | 'Future';

const PRONOUNS: Record<Language, string[]> = {
  Spanish: ['yo', 'tú', 'él/ella', 'nosotros', 'ellos/ellas'],
  French: ['je', 'tu', 'il/elle', 'nous', 'ils/elles'],
  German: ['ich', 'du', 'er/sie', 'wir', 'sie (plural)'],
};

interface VerbData {
  infinitive: string;
  meaning: string;
  conjugations: Record<Tense, string[]>;
}

const VERBS: Record<Language, VerbData[]> = {
  Spanish: [
    { infinitive: 'hablar', meaning: 'to speak', conjugations: {
      Present: ['hablo', 'hablas', 'habla', 'hablamos', 'hablan'],
      Past: ['hablé', 'hablaste', 'habló', 'hablamos', 'hablaron'],
      Future: ['hablaré', 'hablarás', 'hablará', 'hablaremos', 'hablarán'],
    }},
    { infinitive: 'comer', meaning: 'to eat', conjugations: {
      Present: ['como', 'comes', 'come', 'comemos', 'comen'],
      Past: ['comí', 'comiste', 'comió', 'comimos', 'comieron'],
      Future: ['comeré', 'comerás', 'comerá', 'comeremos', 'comerán'],
    }},
    { infinitive: 'vivir', meaning: 'to live', conjugations: {
      Present: ['vivo', 'vives', 'vive', 'vivimos', 'viven'],
      Past: ['viví', 'viviste', 'vivió', 'vivimos', 'vivieron'],
      Future: ['viviré', 'vivirás', 'vivirá', 'viviremos', 'vivirán'],
    }},
    { infinitive: 'ser', meaning: 'to be', conjugations: {
      Present: ['soy', 'eres', 'es', 'somos', 'son'],
      Past: ['fui', 'fuiste', 'fue', 'fuimos', 'fueron'],
      Future: ['seré', 'serás', 'será', 'seremos', 'serán'],
    }},
    { infinitive: 'tener', meaning: 'to have', conjugations: {
      Present: ['tengo', 'tienes', 'tiene', 'tenemos', 'tienen'],
      Past: ['tuve', 'tuviste', 'tuvo', 'tuvimos', 'tuvieron'],
      Future: ['tendré', 'tendrás', 'tendrá', 'tendremos', 'tendrán'],
    }},
  ],
  French: [
    { infinitive: 'parler', meaning: 'to speak', conjugations: {
      Present: ['parle', 'parles', 'parle', 'parlons', 'parlent'],
      Past: ['ai parlé', 'as parlé', 'a parlé', 'avons parlé', 'ont parlé'],
      Future: ['parlerai', 'parleras', 'parlera', 'parlerons', 'parleront'],
    }},
    { infinitive: 'manger', meaning: 'to eat', conjugations: {
      Present: ['mange', 'manges', 'mange', 'mangeons', 'mangent'],
      Past: ['ai mangé', 'as mangé', 'a mangé', 'avons mangé', 'ont mangé'],
      Future: ['mangerai', 'mangeras', 'mangera', 'mangerons', 'mangeront'],
    }},
    { infinitive: 'vivre', meaning: 'to live', conjugations: {
      Present: ['vis', 'vis', 'vit', 'vivons', 'vivent'],
      Past: ['ai vécu', 'as vécu', 'a vécu', 'avons vécu', 'ont vécu'],
      Future: ['vivrai', 'vivras', 'vivra', 'vivrons', 'vivront'],
    }},
    { infinitive: 'être', meaning: 'to be', conjugations: {
      Present: ['suis', 'es', 'est', 'sommes', 'sont'],
      Past: ['ai été', 'as été', 'a été', 'avons été', 'ont été'],
      Future: ['serai', 'seras', 'sera', 'serons', 'seront'],
    }},
    { infinitive: 'avoir', meaning: 'to have', conjugations: {
      Present: ['ai', 'as', 'a', 'avons', 'ont'],
      Past: ['ai eu', 'as eu', 'a eu', 'avons eu', 'ont eu'],
      Future: ['aurai', 'auras', 'aura', 'aurons', 'auront'],
    }},
  ],
  German: [
    { infinitive: 'sprechen', meaning: 'to speak', conjugations: {
      Present: ['spreche', 'sprichst', 'spricht', 'sprechen', 'sprechen'],
      Past: ['sprach', 'sprachst', 'sprach', 'sprachen', 'sprachen'],
      Future: ['werde sprechen', 'wirst sprechen', 'wird sprechen', 'werden sprechen', 'werden sprechen'],
    }},
    { infinitive: 'essen', meaning: 'to eat', conjugations: {
      Present: ['esse', 'isst', 'isst', 'essen', 'essen'],
      Past: ['aß', 'aßt', 'aß', 'aßen', 'aßen'],
      Future: ['werde essen', 'wirst essen', 'wird essen', 'werden essen', 'werden essen'],
    }},
    { infinitive: 'leben', meaning: 'to live', conjugations: {
      Present: ['lebe', 'lebst', 'lebt', 'leben', 'leben'],
      Past: ['lebte', 'lebtest', 'lebte', 'lebten', 'lebten'],
      Future: ['werde leben', 'wirst leben', 'wird leben', 'werden leben', 'werden leben'],
    }},
    { infinitive: 'sein', meaning: 'to be', conjugations: {
      Present: ['bin', 'bist', 'ist', 'sind', 'sind'],
      Past: ['war', 'warst', 'war', 'waren', 'waren'],
      Future: ['werde sein', 'wirst sein', 'wird sein', 'werden sein', 'werden sein'],
    }},
    { infinitive: 'haben', meaning: 'to have', conjugations: {
      Present: ['habe', 'hast', 'hat', 'haben', 'haben'],
      Past: ['hatte', 'hattest', 'hatte', 'hatten', 'hatten'],
      Future: ['werde haben', 'wirst haben', 'wird haben', 'werden haben', 'werden haben'],
    }},
  ],
};

export default function ConjugationTablesPage() {
  const [language, setLanguage] = useState<Language>('Spanish');
  const [tense, setTense] = useState<Tense>('Present');
  const [mode, setMode] = useState<'view' | 'practice'>('view');
  const [practiceVerb, setPracticeVerb] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '', '', '']);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  const verbs = VERBS[language];
  const pronouns = PRONOUNS[language];

  const startPractice = () => {
    setPracticeVerb(Math.floor(Math.random() * verbs.length));
    setAnswers(['', '', '', '', '']);
    setChecked(false);
    setScore(0);
    setMode('practice');
  };

  const checkAnswers = () => {
    const correct = verbs[practiceVerb].conjugations[tense];
    let s = 0;
    answers.forEach((a, i) => { if (a.trim().toLowerCase() === correct[i].toLowerCase()) s++; });
    setScore(s);
    setChecked(true);
  };

  const nextPractice = () => {
    setPracticeVerb((practiceVerb + 1) % verbs.length);
    setAnswers(['', '', '', '', '']);
    setChecked(false);
    setScore(0);
  };

  const flagEmoji: Record<Language, string> = { Spanish: '\u{1F1EA}\u{1F1F8}', French: '\u{1F1EB}\u{1F1F7}', German: '\u{1F1E9}\u{1F1EA}' };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="\u{1F30D}" title="Conjugation Tables" description="Verb conjugation tables and practice for Spanish, French, and German." />

      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <Select value={language} onChange={e => setLanguage(e.target.value as Language)} className="w-40">
          {(['Spanish', 'French', 'German'] as Language[]).map(l => (
            <option key={l} value={l}>{flagEmoji[l]} {l}</option>
          ))}
        </Select>
        <Select value={tense} onChange={e => setTense(e.target.value as Tense)} className="w-32">
          <option value="Present">Present</option>
          <option value="Past">Past</option>
          <option value="Future">Future</option>
        </Select>
        <div className="flex gap-2 ml-auto">
          <Button variant={mode === 'view' ? 'primary' : 'secondary'} size="sm" onClick={() => setMode('view')}>View</Button>
          <Button variant={mode === 'practice' ? 'primary' : 'secondary'} size="sm" onClick={startPractice}>Practice</Button>
        </div>
      </div>

      {mode === 'view' ? (
        <div className="space-y-4">
          {verbs.map((v, vi) => (
            <Card key={vi}>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{v.infinitive}</h3>
                <span className="text-sm text-gray-500">({v.meaning})</span>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 text-gray-500 font-medium w-1/3">Pronoun</th>
                    <th className="text-left py-2 text-gray-500 font-medium">{tense} Tense</th>
                  </tr>
                </thead>
                <tbody>
                  {pronouns.map((p, pi) => (
                    <tr key={pi} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2 text-gray-600 dark:text-gray-400 font-medium">{p}</td>
                      <td className="py-2 text-gray-900 dark:text-gray-100">{v.conjugations[tense][pi]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100">{verbs[practiceVerb].infinitive}</h3>
            <span className="text-gray-500">({verbs[practiceVerb].meaning})</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 ml-auto">{tense}</span>
          </div>

          <div className="space-y-3 mb-6">
            {pronouns.map((p, i) => {
              const correct = verbs[practiceVerb].conjugations[tense][i];
              const isCorrect = checked && answers[i].trim().toLowerCase() === correct.toLowerCase();
              const isWrong = checked && !isCorrect;
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-24 text-sm font-medium text-gray-600 dark:text-gray-400">{p}</span>
                  <Input
                    value={answers[i]}
                    onChange={e => { const a = [...answers]; a[i] = e.target.value; setAnswers(a); }}
                    disabled={checked}
                    className={`flex-1 ${isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : isWrong ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''}`}
                    placeholder="..."
                  />
                  {isWrong && <span className="text-sm text-red-600">{correct}</span>}
                  {isCorrect && <span className="text-green-500">\u2713</span>}
                </div>
              );
            })}
          </div>

          {!checked ? (
            <Button onClick={checkAnswers}>Check Answers</Button>
          ) : (
            <div className="flex items-center gap-4">
              <p className="font-medium text-gray-900 dark:text-gray-100">{score}/5 correct</p>
              <Button onClick={nextPractice}>Next Verb</Button>
              <Button variant="secondary" onClick={startPractice}>Random Verb</Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
