'use client';

import { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface SpellingWord {
  word: string;
  definition: string;
}

const WORD_BANKS: Record<string, SpellingWord[]> = {
  easy: [
    { word: 'because', definition: 'For the reason that' },
    { word: 'friend', definition: 'A person with whom one has a bond of mutual affection' },
    { word: 'different', definition: 'Not the same as another' },
    { word: 'believe', definition: 'Accept something as true' },
    { word: 'beginning', definition: 'The point in time at which something starts' },
    { word: 'calendar', definition: 'A chart showing the days, weeks, and months of a year' },
    { word: 'certain', definition: 'Known for sure; established beyond doubt' },
    { word: 'description', definition: 'A spoken or written account of a person or thing' },
    { word: 'disappear', definition: 'Cease to be visible' },
    { word: 'favorite', definition: 'Preferred before all others of the same kind' },
    { word: 'grammar', definition: 'The rules of a language' },
    { word: 'imagine', definition: 'Form a mental image of something' },
    { word: 'knowledge', definition: 'Facts, information, and skills acquired through experience' },
    { word: 'library', definition: 'A building or room containing collections of books' },
    { word: 'minute', definition: 'A period of sixty seconds' },
    { word: 'necessary', definition: 'Required to be done' },
    { word: 'opposite', definition: 'Having a position on the other side' },
    { word: 'probably', definition: 'Almost certainly' },
    { word: 'separate', definition: 'Forming a unit by itself' },
    { word: 'thought', definition: 'An idea or opinion produced by thinking' },
  ],
  medium: [
    { word: 'accommodate', definition: 'Provide lodging or sufficient space for' },
    { word: 'achievement', definition: 'A thing done successfully with effort or skill' },
    { word: 'apparently', definition: 'As far as one knows or can see' },
    { word: 'bureaucracy', definition: 'A system of government with many departments' },
    { word: 'conscience', definition: 'An inner feeling about the rightness of behavior' },
    { word: 'discipline', definition: 'The practice of training people to obey rules' },
    { word: 'embarrass', definition: 'Cause someone to feel awkward or ashamed' },
    { word: 'exaggerate', definition: 'Represent something as being larger or greater' },
    { word: 'guarantee', definition: 'A formal promise that something will be done' },
    { word: 'independent', definition: 'Free from outside control' },
    { word: 'lightning', definition: 'A flash of light in the sky during a storm' },
    { word: 'maintenance', definition: 'The process of keeping something in good condition' },
    { word: 'occurrence', definition: 'An incident or event' },
    { word: 'parliament', definition: 'The highest legislature of a country' },
    { word: 'questionnaire', definition: 'A set of printed questions for a survey' },
    { word: 'restaurant', definition: 'A place where people pay to eat meals' },
    { word: 'surveillance', definition: 'Close observation of a person or group' },
    { word: 'temperature', definition: 'The degree of heat present in a substance' },
    { word: 'vacuum', definition: 'A space entirely devoid of matter' },
    { word: 'Wednesday', definition: 'The day of the week following Tuesday' },
  ],
  hard: [
    { word: 'acquiesce', definition: 'Accept something reluctantly but without protest' },
    { word: 'bourgeoisie', definition: 'The middle class, typically with reference to its values' },
    { word: 'chrysanthemum', definition: 'A plant with brightly colored ornamental flowers' },
    { word: 'connoisseur', definition: 'An expert judge in matters of fine taste' },
    { word: 'desiccate', definition: 'Remove moisture from something' },
    { word: 'entrepreneurial', definition: 'Characterized by the taking of financial risks' },
    { word: 'fluorescent', definition: 'Vividly colorful and apparently luminous' },
    { word: 'hemorrhage', definition: 'An escape of blood from a ruptured blood vessel' },
    { word: 'idiosyncrasy', definition: 'A distinctive or peculiar behavior of an individual' },
    { word: 'juxtaposition', definition: 'Placing things close together for contrasting effect' },
    { word: 'knowledgeable', definition: 'Intelligent and well-informed' },
    { word: 'liaison', definition: 'Communication or cooperation between people or groups' },
    { word: 'mischievous', definition: 'Causing or showing a fondness for causing trouble' },
    { word: 'occasionally', definition: 'At infrequent or irregular intervals' },
    { word: 'pneumonia', definition: 'Lung inflammation caused by bacterial or viral infection' },
    { word: 'reconnaissance', definition: 'Military observation of a region to locate an enemy' },
    { word: 'sacrilegious', definition: 'Violating something regarded as sacred' },
    { word: 'thoroughfare', definition: 'A road or path forming a route between two places' },
    { word: 'unequivocally', definition: 'In a way that leaves no doubt' },
    { word: 'verisimilitude', definition: 'The appearance of being true or real' },
  ],
};

const LS_KEY = 'sb-spelling-scores';

export default function SpellingPracticePage() {
  const [difficulty, setDifficulty] = useState<string>('easy');
  const [playing, setPlaying] = useState(false);
  const [words, setWords] = useState<SpellingWord[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { const s = localStorage.getItem(LS_KEY); if (s) setScores(JSON.parse(s)); }, []);

  const speak = (word: string) => {
    const u = new SpeechSynthesisUtterance(word);
    u.rate = 0.8;
    window.speechSynthesis.speak(u);
  };

  const start = () => {
    const shuffled = [...WORD_BANKS[difficulty]].sort(() => Math.random() - 0.5);
    setWords(shuffled);
    setCurrentIdx(0); setCorrect(0); setTotal(0); setFeedback(null);
    setPlaying(true);
    setTimeout(() => { speak(shuffled[0].word); inputRef.current?.focus(); }, 300);
  };

  const submit = () => {
    if (!answer.trim()) return;
    const isCorrect = answer.trim().toLowerCase() === words[currentIdx].word.toLowerCase();
    setFeedback(isCorrect ? 'Correct!' : `Wrong! Correct spelling: ${words[currentIdx].word}`);
    if (isCorrect) setCorrect(c => c + 1);
    setTotal(t => t + 1);

    setTimeout(() => {
      if (currentIdx + 1 >= words.length) {
        setPlaying(false);
        const finalCorrect = correct + (isCorrect ? 1 : 0);
        if (finalCorrect > (scores[difficulty] || 0)) {
          const updated = { ...scores, [difficulty]: finalCorrect };
          setScores(updated);
          localStorage.setItem(LS_KEY, JSON.stringify(updated));
        }
      } else {
        setCurrentIdx(i => i + 1);
        speak(words[currentIdx + 1].word);
        setFeedback(null);
      }
      setAnswer('');
      inputRef.current?.focus();
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="\u{1F4DD}" title="Spelling Practice" description="Practice spelling with word banks by difficulty and audio pronunciation." />

      {!playing && total === 0 ? (
        <Card>
          <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">Choose Difficulty</h2>
          <Select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="mb-4">
            <option value="easy">Easy (20 words)</option>
            <option value="medium">Medium (20 words)</option>
            <option value="hard">Hard (20 words)</option>
          </Select>
          {scores[difficulty] !== undefined && <p className="text-sm text-gray-500 mb-4">Best: {scores[difficulty]}/{WORD_BANKS[difficulty].length}</p>}
          <Button onClick={start}>Start Practice</Button>
        </Card>
      ) : playing ? (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Word {currentIdx + 1} / {words.length}</span>
            <span className="text-sm font-medium text-green-600">{correct} correct</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-6">
            <div className="bg-purple-500 h-2 rounded-full transition-all" style={{ width: `${((currentIdx + 1) / words.length) * 100}%` }} />
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-400 mb-2">{words[currentIdx].definition}</p>
            <Button size="sm" variant="secondary" onClick={() => speak(words[currentIdx].word)}>
              {'\u{1F50A}'} Hear Word
            </Button>
          </div>

          <div className="flex gap-3 max-w-sm mx-auto">
            <Input ref={inputRef} value={answer} onChange={e => setAnswer(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()} placeholder="Type the spelling..." autoFocus />
            <Button onClick={submit}>Check</Button>
          </div>

          {feedback && (
            <p className={`text-center mt-4 font-medium ${feedback.startsWith('Correct') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>
          )}
        </Card>
      ) : (
        <Card className="text-center py-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{correct} / {total}</h2>
          <p className="text-gray-500 mb-1">{correct >= total * 0.9 ? 'Excellent speller!' : correct >= total * 0.7 ? 'Good job!' : 'Keep practicing!'}</p>
          <p className="text-sm text-gray-400 mb-6">Best ({difficulty}): {Math.max(scores[difficulty] || 0, correct)}</p>
          <div className="flex gap-2 justify-center">
            <Button onClick={start}>Try Again</Button>
            <Button variant="secondary" onClick={() => { setTotal(0); setPlaying(false); }}>Change Difficulty</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
