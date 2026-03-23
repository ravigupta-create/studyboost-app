'use client';

import { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

export default function TTSReaderPage() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentSentence, setCurrentSentence] = useState(-1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
      if (v.length > 0 && !selectedVoice) setSelectedVoice(v[0].name);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { window.speechSynthesis.cancel(); };
  }, []);

  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);

  const speak = () => {
    if (!text.trim()) return;
    window.speechSynthesis.cancel();

    let sentenceIdx = 0;
    const speakSentence = (idx: number) => {
      if (idx >= sentences.length) { setSpeaking(false); setCurrentSentence(-1); return; }
      const u = new SpeechSynthesisUtterance(sentences[idx]);
      const voice = voices.find(v => v.name === selectedVoice);
      if (voice) u.voice = voice;
      u.rate = rate;
      u.pitch = pitch;
      setCurrentSentence(idx);
      u.onend = () => speakSentence(idx + 1);
      utteranceRef.current = u;
      window.speechSynthesis.speak(u);
    };

    setSpeaking(true);
    setPaused(false);
    speakSentence(0);
  };

  const pause = () => { window.speechSynthesis.pause(); setPaused(true); };
  const resume = () => { window.speechSynthesis.resume(); setPaused(false); };
  const stop = () => { window.speechSynthesis.cancel(); setSpeaking(false); setPaused(false); setCurrentSentence(-1); };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="\u{1F50A}" title="Text-to-Speech Reader" description="Listen to text read aloud with customizable voice, speed, and pitch." />

      <Card className="mb-6">
        <Textarea placeholder="Paste your text here..." value={text} onChange={e => setText(e.target.value)}
          className="mb-4 min-h-[150px]" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Voice</label>
            <Select value={selectedVoice} onChange={e => setSelectedVoice(e.target.value)}>
              {voices.map(v => <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>)}
            </Select>
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Speed: {rate}x</label>
            <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={e => setRate(parseFloat(e.target.value))}
              className="w-full accent-purple-500" />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Pitch: {pitch}</label>
            <input type="range" min="0.5" max="2" step="0.1" value={pitch} onChange={e => setPitch(parseFloat(e.target.value))}
              className="w-full accent-purple-500" />
          </div>
        </div>

        <div className="flex gap-2">
          {!speaking ? (
            <Button onClick={speak} disabled={!text.trim()}>Play</Button>
          ) : paused ? (
            <Button onClick={resume}>Resume</Button>
          ) : (
            <Button onClick={pause} variant="secondary">Pause</Button>
          )}
          {speaking && <Button onClick={stop} variant="danger">Stop</Button>}
        </div>
      </Card>

      {text.trim() && sentences.length > 0 && (
        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Reading Progress</h3>
          <div className="space-y-1">
            {sentences.map((s, i) => (
              <p key={i} className={`text-sm p-2 rounded transition-colors ${i === currentSentence ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium' : i < currentSentence ? 'text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
                {s}
              </p>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
