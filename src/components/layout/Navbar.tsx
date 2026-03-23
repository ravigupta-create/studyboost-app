'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { FEATURES, FEATURE_CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/cn';

const TOP_NAV = FEATURES.slice(0, 6);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set());
  const pathname = usePathname();

  const moreFeatures = FEATURES.slice(6);

  const filteredMore = useMemo(() => {
    if (!search) return moreFeatures;
    const q = search.toLowerCase();
    return moreFeatures.filter(f => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q));
  }, [search, moreFeatures]);

  const groupedMore = useMemo(() => {
    const groups: Record<string, typeof moreFeatures> = {};
    for (const cat of FEATURE_CATEGORIES) {
      const items = filteredMore.filter(f => f.category === cat);
      if (items.length > 0) groups[cat] = items;
    }
    return groups;
  }, [filteredMore]);

  const toggleCat = (cat: string) => {
    setExpandedCats(prev => {
      const n = new Set(prev);
      if (n.has(cat)) n.delete(cat); else n.add(cat);
      return n;
    });
  };

  // Mobile groups — all features
  const allGrouped = useMemo(() => {
    const q = search.toLowerCase();
    const feats = search ? FEATURES.filter(f => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q)) : FEATURES;
    const groups: Record<string, typeof FEATURES> = {};
    for (const cat of FEATURE_CATEGORIES) {
      const items = feats.filter(f => f.category === cat);
      if (items.length > 0) groups[cat] = items;
    }
    return groups;
  }, [search]);

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              StudyBoost
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {TOP_NAV.map((f) => (
              <Link
                key={f.id}
                href={f.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === f.href
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                {f.name.split(' ')[0]}
              </Link>
            ))}
            <div className="relative group"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => { setMoreOpen(false); setSearch(''); }}
            >
              <button
                aria-haspopup="true"
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                More
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full mt-1 w-72 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg max-h-[75vh] overflow-y-auto">
                  <div className="sticky top-0 bg-white dark:bg-gray-800 p-2 border-b border-gray-100 dark:border-gray-700">
                    <input
                      type="text"
                      placeholder="Search tools..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="w-full px-3 py-1.5 text-sm rounded-md border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                  <div className="py-1">
                    {Object.entries(groupedMore).map(([cat, features]) => (
                      <div key={cat}>
                        <button
                          onClick={() => toggleCat(cat)}
                          className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <span>{cat}</span>
                          <span className="text-gray-300 dark:text-gray-600">{expandedCats.has(cat) ? '−' : `+${features.length}`}</span>
                        </button>
                        {(search || expandedCats.has(cat)) && features.map((f) => (
                          <Link
                            key={f.id}
                            href={f.href}
                            onClick={() => { setMoreOpen(false); setSearch(''); }}
                            className={cn(
                              'flex items-center gap-2 px-4 py-1.5 text-sm transition-colors',
                              pathname === f.href
                                ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                            )}
                          >
                            <span className="text-xs">{f.icon}</span>
                            <span>{f.name}</span>
                            {f.aiPowered && <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">AI</span>}
                          </Link>
                        ))}
                      </div>
                    ))}
                    {Object.keys(groupedMore).length === 0 && (
                      <p className="px-4 py-3 text-sm text-gray-400">No tools found</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="lg:hidden rounded-lg p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 animate-fade-in max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3">
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500 mb-2"
            />
            {Object.entries(allGrouped).map(([cat, features]) => (
              <div key={cat}>
                <button
                  onClick={() => toggleCat(cat)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider"
                >
                  <span>{cat}</span>
                  <span className="text-gray-300 dark:text-gray-600">{expandedCats.has(cat) ? '−' : features.length}</span>
                </button>
                {(search || expandedCats.has(cat)) && features.map((f) => (
                  <Link
                    key={f.id}
                    href={f.href}
                    onClick={() => { setOpen(false); setSearch(''); }}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      pathname === f.href
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    )}
                  >
                    <span>{f.icon}</span>
                    <span>{f.name}</span>
                    {f.aiPowered && <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">AI</span>}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
