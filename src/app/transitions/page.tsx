'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

const DATA: Record<string, string[]> = {
  'Addition': ['Furthermore', 'Moreover', 'In addition', 'Additionally', 'Also', 'Besides', 'Likewise', 'Similarly', 'As well as', 'Not only...but also', 'Coupled with', 'Together with', 'Along with', 'Equally important', 'What is more', 'To say nothing of', 'In the same way', 'By the same token', 'First', 'Second', 'Third', 'Finally', 'Last', 'Next', 'Then', 'Too', 'And', 'Nor', 'As a matter of fact', 'Indeed', 'In fact'],
  'Contrast': ['However', 'Nevertheless', 'Nonetheless', 'On the other hand', 'In contrast', 'Conversely', 'Although', 'Even though', 'Despite', 'In spite of', 'While', 'Whereas', 'But', 'Yet', 'Still', 'Rather', 'Instead', 'On the contrary', 'Notwithstanding', 'Be that as it may', 'Admittedly', 'Granted', 'Albeit', 'Though', 'Even so', 'Regardless', 'Alternatively', 'Otherwise', 'Differently', 'Unlike'],
  'Cause / Effect': ['Therefore', 'Consequently', 'As a result', 'Thus', 'Hence', 'Accordingly', 'For this reason', 'Because', 'Since', 'Due to', 'Owing to', 'So', 'So that', 'Because of this', 'As a consequence', 'It follows that', 'For this purpose', 'With this in mind', 'Resulting from', 'Leading to', 'Caused by', 'Given that', 'In order to', 'Thereby', 'Wherefore', 'On account of', 'Inasmuch as'],
  'Time / Sequence': ['First', 'Second', 'Third', 'Next', 'Then', 'After', 'Afterward', 'Before', 'Previously', 'Meanwhile', 'Subsequently', 'Finally', 'Eventually', 'At last', 'In the meantime', 'Simultaneously', 'During', 'Later', 'Earlier', 'Soon', 'Immediately', 'Formerly', 'In the first place', 'To begin with', 'At the same time', 'Following this', 'Henceforth', 'Presently', 'Whenever', 'Until now'],
  'Example': ['For example', 'For instance', 'Such as', 'Including', 'Namely', 'Specifically', 'To illustrate', 'As an illustration', 'In particular', 'Particularly', 'Especially', 'To demonstrate', 'As shown by', 'As seen in', 'Consider', 'Take the case of', 'In this case', 'As evidence', 'Proof of this', 'One example is', 'This can be seen in', 'Like', 'As', 'As proof', 'Evidenced by'],
  'Emphasis': ['Indeed', 'In fact', 'Of course', 'Certainly', 'Undoubtedly', 'Without a doubt', 'Absolutely', 'Clearly', 'Obviously', 'Surely', 'Naturally', 'Unquestionably', 'Most importantly', 'Above all', 'Especially', 'Particularly', 'Significantly', 'Notably', 'Without question', 'Truly', 'Definitely', 'Emphatically', 'It should be noted', 'Chiefly', 'Primarily', 'Mainly'],
  'Summary / Conclusion': ['In conclusion', 'To summarize', 'In summary', 'To sum up', 'Overall', 'All in all', 'In short', 'In brief', 'Briefly', 'On the whole', 'To conclude', 'As mentioned', 'As stated', 'As noted above', 'In other words', 'That is', 'To put it differently', 'In essence', 'Ultimately', 'Altogether', 'Given these points', 'As has been shown', 'In the final analysis', 'To review', 'As can be seen', 'After all'],
};

export default function TransitionsPage() {
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const copy = (word: string) => {
    navigator.clipboard.writeText(word);
    setCopied(word);
    setTimeout(() => setCopied(null), 1500);
  };

  const categories = Object.keys(DATA);
  const filtered = activeCategory ? { [activeCategory]: DATA[activeCategory] } : DATA;

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader icon="&#128279;" title="Transition Words" description="200+ categorized transition words and phrases. Click to copy." />
      <div className="mb-6">
        <Input placeholder="Search transition words..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${!activeCategory ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
          All
        </button>
        {categories.map(c => (
          <button key={c} onClick={() => setActiveCategory(c === activeCategory ? null : c)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${c === activeCategory ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="space-y-6">
        {Object.entries(filtered).map(([cat, words]) => {
          const filteredWords = search ? words.filter(w => w.toLowerCase().includes(search.toLowerCase())) : words;
          if (filteredWords.length === 0) return null;
          return (
            <Card key={cat}>
              <h2 className="text-lg font-semibold mb-3">{cat} ({filteredWords.length})</h2>
              <div className="flex flex-wrap gap-2">
                {filteredWords.map((w, i) => (
                  <button key={i} onClick={() => copy(w)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${copied === w ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300'}`}>
                    {copied === w ? 'Copied!' : w}
                  </button>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
