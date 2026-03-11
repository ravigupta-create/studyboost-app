'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { PageHeader } from '@/components/shared/PageHeader';
import { Citation, CitationStyle } from '@/types';
import { generateCitation } from '@/lib/citation-generator';
import { cn } from '@/lib/cn';

type SourceType = Citation['type'];

const SOURCE_TYPES: { value: SourceType; label: string }[] = [
  { value: 'book', label: 'Book' },
  { value: 'website', label: 'Website' },
  { value: 'journal', label: 'Journal Article' },
  { value: 'article', label: 'Article' },
];

const STYLES: { value: CitationStyle; label: string }[] = [
  { value: 'mla', label: 'MLA 9th' },
  { value: 'apa', label: 'APA 7th' },
  { value: 'chicago', label: 'Chicago 17th' },
];

function createEmptyCitation(type: SourceType): Citation {
  return {
    type,
    authors: '',
    title: '',
    year: '',
    publisher: '',
    url: '',
    journal: '',
    volume: '',
    issue: '',
    pages: '',
    accessDate: '',
  };
}

export default function CitationsPage() {
  const [sourceType, setSourceType] = useState<SourceType>('book');
  const [citation, setCitation] = useState<Citation>(createEmptyCitation('book'));
  const [activeTab, setActiveTab] = useState<CitationStyle>('mla');
  const [generated, setGenerated] = useState(false);
  const [copiedStyle, setCopiedStyle] = useState<CitationStyle | null>(null);

  const updateField = (field: keyof Citation, value: string) => {
    setCitation((prev) => ({ ...prev, [field]: value }));
    setGenerated(false);
  };

  const handleTypeChange = (type: SourceType) => {
    setSourceType(type);
    setCitation(createEmptyCitation(type));
    setGenerated(false);
  };

  const handleGenerate = () => {
    if (!citation.authors.trim() || !citation.title.trim() || !citation.year.trim()) return;
    setGenerated(true);
  };

  const citations = useMemo(() => {
    if (!generated) return null;
    return {
      mla: generateCitation(citation, 'mla'),
      apa: generateCitation(citation, 'apa'),
      chicago: generateCitation(citation, 'chicago'),
    };
  }, [generated, citation]);

  const handleCopy = async (style: CitationStyle) => {
    if (!citations) return;
    // Strip HTML tags for clipboard
    const plain = citations[style].replace(/<\/?i>/g, '');
    try {
      await navigator.clipboard.writeText(plain);
      setCopiedStyle(style);
      setTimeout(() => setCopiedStyle(null), 2000);
    } catch {
      // fallback
    }
  };

  const canGenerate = citation.authors.trim() && citation.title.trim() && citation.year.trim();

  // Determine which fields to show based on source type
  const showPublisher = sourceType === 'book' || sourceType === 'website' || sourceType === 'article';
  const showUrl = sourceType === 'website' || sourceType === 'journal' || sourceType === 'article';
  const showJournal = sourceType === 'journal';
  const showVolume = sourceType === 'journal';
  const showIssue = sourceType === 'journal';
  const showPages = sourceType === 'journal' || sourceType === 'article';
  const showAccessDate = sourceType === 'website';

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        icon="📖"
        title="Citation Generator"
        description="Generate properly formatted MLA, APA, and Chicago citations."
        aiPowered={false}
      />

      {/* Source Type Selection */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Source Type
        </h2>
        <div className="flex flex-wrap gap-2">
          {SOURCE_TYPES.map((st) => (
            <button
              key={st.value}
              onClick={() => handleTypeChange(st.value)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                sourceType === st.value
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              )}
            >
              {st.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Citation Form */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Source Details
        </h2>
        <div className="space-y-4">
          {/* Authors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Author(s) <span className="text-xs text-gray-400">(comma-separated for multiple)</span>
            </label>
            <Input
              placeholder="e.g. John Smith, Jane Doe"
              value={citation.authors}
              onChange={(e) => updateField('authors', e.target.value)}
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <Input
              placeholder={sourceType === 'book' ? 'Book title' : sourceType === 'website' ? 'Page or article title' : 'Article title'}
              value={citation.title}
              onChange={(e) => updateField('title', e.target.value)}
            />
          </div>

          {/* Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Year
              </label>
              <Input
                placeholder="e.g. 2024"
                value={citation.year}
                onChange={(e) => updateField('year', e.target.value)}
              />
            </div>

            {/* Publisher */}
            {showPublisher && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {sourceType === 'website' ? 'Website Name' : 'Publisher'}
                </label>
                <Input
                  placeholder={sourceType === 'website' ? 'e.g. BBC News' : 'e.g. Oxford University Press'}
                  value={citation.publisher || ''}
                  onChange={(e) => updateField('publisher', e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Journal-specific fields */}
          {showJournal && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Journal Name
              </label>
              <Input
                placeholder="e.g. Nature"
                value={citation.journal || ''}
                onChange={(e) => updateField('journal', e.target.value)}
              />
            </div>
          )}

          {(showVolume || showIssue || showPages) && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {showVolume && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Volume
                  </label>
                  <Input
                    placeholder="e.g. 12"
                    value={citation.volume || ''}
                    onChange={(e) => updateField('volume', e.target.value)}
                  />
                </div>
              )}
              {showIssue && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Issue
                  </label>
                  <Input
                    placeholder="e.g. 3"
                    value={citation.issue || ''}
                    onChange={(e) => updateField('issue', e.target.value)}
                  />
                </div>
              )}
              {showPages && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Pages
                  </label>
                  <Input
                    placeholder="e.g. 45-67"
                    value={citation.pages || ''}
                    onChange={(e) => updateField('pages', e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          {/* URL */}
          {showUrl && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                URL
              </label>
              <Input
                placeholder="https://..."
                value={citation.url || ''}
                onChange={(e) => updateField('url', e.target.value)}
              />
            </div>
          )}

          {/* Access Date */}
          {showAccessDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Access Date
              </label>
              <Input
                placeholder="e.g. 11 Mar. 2026"
                value={citation.accessDate || ''}
                onChange={(e) => updateField('accessDate', e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="mt-6">
          <Button onClick={handleGenerate} disabled={!canGenerate}>
            Generate Citations
          </Button>
        </div>
      </Card>

      {/* Generated Citations */}
      {citations && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Formatted Citations
          </h2>

          {/* Style Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
            {STYLES.map((style) => (
              <button
                key={style.value}
                onClick={() => setActiveTab(style.value)}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px',
                  activeTab === style.value
                    ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                )}
              >
                {style.label}
              </button>
            ))}
          </div>

          {/* Active citation display */}
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 mb-4">
            <p
              className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: citations[activeTab] }}
            />
            <div className="mt-3 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(activeTab)}
              >
                {copiedStyle === activeTab ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>

          {/* All styles at once */}
          <div className="space-y-3">
            {STYLES.filter((s) => s.value !== activeTab).map((style) => (
              <div
                key={style.value}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {style.label}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(style.value)}
                  >
                    {copiedStyle === style.value ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <p
                  className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: citations[style.value] }}
                />
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
