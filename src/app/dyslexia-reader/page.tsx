'use client';

import { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Textarea';

interface Prefs {
  fontSize: number;
  letterSpacing: number;
  wordSpacing: number;
  lineHeight: number;
  bgColor: string;
  rulerEnabled: boolean;
}

const BG_COLORS = [
  { name: 'White', value: '#FFFFFF' },
  { name: 'Cream', value: '#FFF8E7' },
  { name: 'Light Blue', value: '#E8F4FD' },
  { name: 'Light Green', value: '#E8F5E9' },
  { name: 'Light Pink', value: '#FCE4EC' },
  { name: 'Light Yellow', value: '#FFFDE7' },
  { name: 'Lavender', value: '#F3E5F5' },
  { name: 'Peach', value: '#FFF3E0' },
];

const LS_KEY = 'sb-dyslexia-prefs';
const defaultPrefs: Prefs = { fontSize: 18, letterSpacing: 1, wordSpacing: 3, lineHeight: 2, bgColor: '#FFF8E7', rulerEnabled: false };

export default function DyslexiaReaderPage() {
  const [text, setText] = useState('');
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);
  const [rulerY, setRulerY] = useState(0);
  const readerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setPrefs(JSON.parse(saved));
  }, []);

  const updatePrefs = (p: Partial<Prefs>) => {
    const updated = { ...prefs, ...p };
    setPrefs(updated);
    localStorage.setItem(LS_KEY, JSON.stringify(updated));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!prefs.rulerEnabled || !readerRef.current) return;
    const rect = readerRef.current.getBoundingClientRect();
    setRulerY(e.clientY - rect.top);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <PageHeader icon="\u{1F4D6}" title="Dyslexia Reader" description="Read text with dyslexia-friendly formatting and customizable controls." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Controls</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex justify-between">
                  <span>Font Size</span><span>{prefs.fontSize}px</span>
                </label>
                <input type="range" min="14" max="28" value={prefs.fontSize} onChange={e => updatePrefs({ fontSize: parseInt(e.target.value) })} className="w-full accent-purple-500" />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex justify-between">
                  <span>Letter Spacing</span><span>{prefs.letterSpacing}px</span>
                </label>
                <input type="range" min="0" max="5" step="0.5" value={prefs.letterSpacing} onChange={e => updatePrefs({ letterSpacing: parseFloat(e.target.value) })} className="w-full accent-purple-500" />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex justify-between">
                  <span>Word Spacing</span><span>{prefs.wordSpacing}px</span>
                </label>
                <input type="range" min="0" max="10" step="1" value={prefs.wordSpacing} onChange={e => updatePrefs({ wordSpacing: parseFloat(e.target.value) })} className="w-full accent-purple-500" />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex justify-between">
                  <span>Line Height</span><span>{prefs.lineHeight}</span>
                </label>
                <input type="range" min="1.5" max="3" step="0.1" value={prefs.lineHeight} onChange={e => updatePrefs({ lineHeight: parseFloat(e.target.value) })} className="w-full accent-purple-500" />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Background Color</label>
                <div className="grid grid-cols-4 gap-2">
                  {BG_COLORS.map(c => (
                    <button key={c.value} onClick={() => updatePrefs({ bgColor: c.value })}
                      className={`w-full aspect-square rounded-lg border-2 transition-all ${prefs.bgColor === c.value ? 'border-purple-500 scale-110' : 'border-gray-200 dark:border-gray-600'}`}
                      style={{ backgroundColor: c.value }} title={c.name} />
                  ))}
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={prefs.rulerEnabled} onChange={e => updatePrefs({ rulerEnabled: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Reading Ruler</span>
                </label>
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-4">
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Paste Your Text</h3>
            <Textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste or type text here to apply dyslexia-friendly formatting..." className="min-h-[100px]" />
          </Card>

          {text.trim() && (
            <Card className="p-0 overflow-hidden">
              <div ref={readerRef} onMouseMove={handleMouseMove}
                className="relative p-6"
                style={{
                  backgroundColor: prefs.bgColor,
                  fontSize: `${prefs.fontSize}px`,
                  letterSpacing: `${prefs.letterSpacing}px`,
                  wordSpacing: `${prefs.wordSpacing}px`,
                  lineHeight: prefs.lineHeight,
                  fontFamily: 'Arial, Verdana, sans-serif',
                  color: '#333',
                }}>
                {text.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                ))}
                {prefs.rulerEnabled && (
                  <div className="absolute left-0 right-0 pointer-events-none" style={{ top: `${rulerY}px` }}>
                    <div className="h-0.5 bg-red-400 opacity-60" />
                    <div className="h-8 bg-yellow-200 opacity-20" style={{ marginTop: '-4px' }} />
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
