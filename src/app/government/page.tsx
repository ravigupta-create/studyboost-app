'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

const BRANCHES = [
  {
    name: 'Legislative Branch', icon: '\u{1F3DB}\uFE0F', body: 'Congress (Senate + House of Representatives)',
    details: [
      'Makes federal laws',
      'Senate: 100 members (2 per state), 6-year terms',
      'House of Representatives: 435 members (proportional to population), 2-year terms',
      'Power to declare war, regulate commerce, control federal spending',
      'Can impeach the President and federal judges',
      'Senate confirms presidential appointments and ratifies treaties',
      'Override presidential veto with 2/3 vote in both chambers',
    ]
  },
  {
    name: 'Executive Branch', icon: '\u{1F3E4}', body: 'President, Vice President, Cabinet',
    details: [
      'Enforces federal laws',
      'President serves 4-year terms (max 2 terms)',
      'Commander-in-Chief of the military',
      'Can veto legislation passed by Congress',
      'Appoints federal judges, ambassadors, and Cabinet members',
      'Negotiates treaties (with Senate ratification)',
      'Issues executive orders',
      'Vice President presides over the Senate',
    ]
  },
  {
    name: 'Judicial Branch', icon: '\u2696\uFE0F', body: 'Supreme Court and Federal Courts',
    details: [
      'Interprets the Constitution and federal laws',
      'Supreme Court: 9 justices, lifetime appointments',
      'Power of judicial review (Marbury v. Madison, 1803)',
      'Can declare laws unconstitutional',
      'Federal judges appointed by President, confirmed by Senate',
      'Handles cases involving federal law, treaties, and the Constitution',
      'Appellate courts review decisions of lower courts',
    ]
  },
];

const AMENDMENTS = [
  { num: 1, text: 'Freedom of religion, speech, press, assembly, and petition.' },
  { num: 2, text: 'Right to keep and bear arms.' },
  { num: 3, text: 'No quartering of soldiers in private homes without consent.' },
  { num: 4, text: 'Protection against unreasonable searches and seizures.' },
  { num: 5, text: 'Right to due process, protection against double jeopardy and self-incrimination.' },
  { num: 6, text: 'Right to a speedy and public trial, impartial jury, and legal counsel.' },
  { num: 7, text: 'Right to jury trial in civil cases exceeding $20.' },
  { num: 8, text: 'Protection against excessive bail, fines, and cruel/unusual punishment.' },
  { num: 9, text: 'Rights not listed in the Constitution are still retained by the people.' },
  { num: 10, text: 'Powers not delegated to the federal government are reserved to the states or people.' },
  { num: 11, text: 'Limits lawsuits against states in federal courts (1795).' },
  { num: 12, text: 'Revised presidential election procedures (1804).' },
  { num: 13, text: 'Abolished slavery (1865).' },
  { num: 14, text: 'Citizenship, equal protection, and due process for all persons (1868).' },
  { num: 15, text: 'Voting rights cannot be denied based on race (1870).' },
  { num: 16, text: 'Authorized federal income tax (1913).' },
  { num: 17, text: 'Direct election of Senators by the people (1913).' },
  { num: 18, text: 'Prohibition of alcohol (1919). Repealed by 21st Amendment.' },
  { num: 19, text: 'Women\'s suffrage — right to vote regardless of sex (1920).' },
  { num: 20, text: 'Changed presidential inauguration to January 20 (1933).' },
  { num: 21, text: 'Repealed Prohibition (18th Amendment) (1933).' },
  { num: 22, text: 'Presidential term limits — max two terms (1951).' },
  { num: 23, text: 'Granted Washington D.C. electoral votes (1961).' },
  { num: 24, text: 'Abolished poll taxes in federal elections (1964).' },
  { num: 25, text: 'Presidential succession and disability procedures (1967).' },
  { num: 26, text: 'Lowered voting age to 18 (1971).' },
  { num: 27, text: 'Congressional pay raises take effect after the next election (1992).' },
];

export default function GovernmentPage() {
  const [search, setSearch] = useState('');
  const [expandedBranch, setExpandedBranch] = useState<string | null>(null);
  const [expandedAmendment, setExpandedAmendment] = useState<number | null>(null);
  const [section, setSection] = useState<'branches' | 'bill' | 'all'>('branches');

  const filteredAmendments = AMENDMENTS.filter(a =>
    search === '' || a.text.toLowerCase().includes(search.toLowerCase()) || a.num.toString().includes(search)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <PageHeader icon="\u{1F3DB}\uFE0F" title="US Government Reference" description="Three branches, Bill of Rights, and all 27 amendments." />

      <div className="flex gap-2 mb-6 flex-wrap">
        {[{ k: 'branches', l: 'Three Branches' }, { k: 'bill', l: 'Bill of Rights' }, { k: 'all', l: 'All 27 Amendments' }].map(s => (
          <button key={s.k} onClick={() => setSection(s.k as typeof section)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${section === s.k ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            {s.l}
          </button>
        ))}
      </div>

      {(section === 'bill' || section === 'all') && (
        <div className="mb-4">
          <Input placeholder="Search amendments..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      )}

      {section === 'branches' && (
        <div className="space-y-4">
          {BRANCHES.map(b => (
            <Card key={b.name} hover className="cursor-pointer" onClick={() => setExpandedBranch(expandedBranch === b.name ? null : b.name)}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{b.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{b.name}</h3>
                  <p className="text-sm text-gray-500">{b.body}</p>
                </div>
                <span className="text-gray-400">{expandedBranch === b.name ? '\u25B2' : '\u25BC'}</span>
              </div>
              {expandedBranch === b.name && (
                <ul className="mt-4 space-y-2 ml-10">
                  {b.details.map((d, i) => (
                    <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                      <span className="text-purple-500 mt-1">&#x2022;</span>{d}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      )}

      {section === 'bill' && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Bill of Rights (Amendments 1-10)</h2>
          {filteredAmendments.filter(a => a.num <= 10).map(a => (
            <Card key={a.num} hover className="cursor-pointer" onClick={() => setExpandedAmendment(expandedAmendment === a.num ? null : a.num)}>
              <div className="flex items-start gap-3">
                <span className="font-bold text-purple-600 dark:text-purple-400 min-w-[40px]">#{a.num}</span>
                <p className={`text-sm flex-1 ${expandedAmendment === a.num ? 'text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400 line-clamp-1'}`}>{a.text}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {section === 'all' && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">All 27 Amendments</h2>
          {filteredAmendments.map(a => (
            <Card key={a.num} hover className="cursor-pointer" onClick={() => setExpandedAmendment(expandedAmendment === a.num ? null : a.num)}>
              <div className="flex items-start gap-3">
                <span className={`font-bold min-w-[40px] ${a.num <= 10 ? 'text-purple-600 dark:text-purple-400' : 'text-blue-600 dark:text-blue-400'}`}>#{a.num}</span>
                <p className={`text-sm flex-1 ${expandedAmendment === a.num ? 'text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400 line-clamp-1'}`}>{a.text}</p>
                {a.num <= 10 && <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">Bill of Rights</span>}
              </div>
            </Card>
          ))}
          {filteredAmendments.length === 0 && <p className="text-center text-gray-400 py-8">No amendments match your search.</p>}
        </div>
      )}
    </div>
  );
}
