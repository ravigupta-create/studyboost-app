'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { MathText } from '@/components/shared/MathText';

interface Constant {
  name: string;
  symbol: string;
  value: string;
  units: string;
  category: string;
}

const CONSTANTS: Constant[] = [
  { name: 'Speed of Light', symbol: '$c$', value: '2.998 \u00D7 10\u2078', units: 'm/s', category: 'Physics' },
  { name: 'Gravitational Constant', symbol: '$G$', value: '6.674 \u00D7 10\u207B\u00B9\u00B9', units: 'N\u00B7m\u00B2/kg\u00B2', category: 'Physics' },
  { name: 'Planck Constant', symbol: '$h$', value: '6.626 \u00D7 10\u207B\u00B3\u2074', units: 'J\u00B7s', category: 'Physics' },
  { name: 'Boltzmann Constant', symbol: '$k_B$', value: '1.381 \u00D7 10\u207B\u00B2\u00B3', units: 'J/K', category: 'Physics' },
  { name: 'Elementary Charge', symbol: '$e$', value: '1.602 \u00D7 10\u207B\u00B9\u2079', units: 'C', category: 'Physics' },
  { name: 'Permeability of Free Space', symbol: '$\\mu_0$', value: '1.257 \u00D7 10\u207B\u2076', units: 'H/m', category: 'Physics' },
  { name: 'Permittivity of Free Space', symbol: '$\\varepsilon_0$', value: '8.854 \u00D7 10\u207B\u00B9\u00B2', units: 'F/m', category: 'Physics' },
  { name: 'Avogadro Number', symbol: '$N_A$', value: '6.022 \u00D7 10\u00B2\u00B3', units: 'mol\u207B\u00B9', category: 'Physics' },
  { name: 'Gas Constant', symbol: '$R$', value: '8.314', units: 'J/(mol\u00B7K)', category: 'Chemistry' },
  { name: 'Faraday Constant', symbol: '$F$', value: '96,485', units: 'C/mol', category: 'Chemistry' },
  { name: 'Ion-Product of Water', symbol: '$K_w$', value: '1.0 \u00D7 10\u207B\u00B9\u2074', units: 'mol\u00B2/L\u00B2', category: 'Chemistry' },
  { name: 'Pi', symbol: '$\\pi$', value: '3.14159265358979...', units: '', category: 'Math' },
  { name: "Euler's Number", symbol: '$e$', value: '2.71828182845904...', units: '', category: 'Math' },
  { name: 'Golden Ratio', symbol: '$\\varphi$', value: '1.61803398874989...', units: '', category: 'Math' },
  { name: 'Square Root of 2', symbol: '$\\sqrt{2}$', value: '1.41421356237309...', units: '', category: 'Math' },
];

export default function ConstantsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = CONSTANTS.filter(c => {
    const matchSearch = search === '' || c.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || c.category === category;
    return matchSearch && matchCat;
  });

  const catColors: Record<string, string> = {
    'Physics': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    'Chemistry': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    'Math': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="\u{1F52C}" title="Science Constants" description="Physics, chemistry, and math constants for quick reference." />

      <div className="flex flex-wrap gap-3 mb-6">
        <Input placeholder="Search constants..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 min-w-[200px]" />
        <div className="flex gap-2">
          {['all', 'Physics', 'Chemistry', 'Math'].map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-sm ${category === c ? (c === 'all' ? 'bg-gray-200 dark:bg-gray-600 font-medium text-gray-900 dark:text-gray-100' : catColors[c] + ' font-medium') : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              {c === 'all' ? 'All' : c}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((c, i) => (
          <Card key={i}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{c.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${catColors[c.category]}`}>{c.category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-lg"><MathText text={c.symbol} /></div>
                  <span className="text-gray-600 dark:text-gray-300 font-mono">{c.value}</span>
                  {c.units && <span className="text-sm text-gray-500">{c.units}</span>}
                </div>
              </div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && <p className="text-center text-gray-400 py-8">No constants found.</p>}
      </div>
    </div>
  );
}
