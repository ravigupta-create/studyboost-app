'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface SoundChannel {
  id: string;
  name: string;
  icon: string;
  playing: boolean;
  volume: number;
}

const SOUNDS: SoundChannel[] = [
  { id: 'white', name: 'White Noise', icon: '\u{1F4A8}', playing: false, volume: 0.3 },
  { id: 'brown', name: 'Brown Noise', icon: '\u{1F33F}', playing: false, volume: 0.3 },
  { id: 'rain', name: 'Rain', icon: '\u{1F327}\uFE0F', playing: false, volume: 0.3 },
  { id: 'binaural', name: 'Binaural Beats', icon: '\u{1F9E0}', playing: false, volume: 0.3 },
];

export default function StudyMusicPage() {
  const [channels, setChannels] = useState<SoundChannel[]>(SOUNDS);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<Record<string, { source: AudioBufferSourceNode | OscillatorNode; gain: GainNode } | null>>({});

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
    return audioCtxRef.current;
  }, []);

  const createNoiseBuffer = useCallback((type: 'white' | 'brown') => {
    const ctx = getCtx();
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    if (type === 'white') {
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    } else {
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }
    }
    return buffer;
  }, [getCtx]);

  const createRainBuffer = useCallback(() => {
    const ctx = getCtx();
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Filter to sound more like rain
      data[i] = white * (0.1 + Math.random() * 0.05) * (Math.sin(i / 500) * 0.5 + 0.5);
    }
    return buffer;
  }, [getCtx]);

  const startSound = useCallback((id: string, volume: number) => {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();

    const gain = ctx.createGain();
    gain.gain.value = volume;
    gain.connect(ctx.destination);

    if (id === 'binaural') {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      gain2.gain.value = volume;
      gain2.connect(ctx.destination);
      osc1.frequency.value = 200;
      osc2.frequency.value = 210; // 10Hz alpha wave
      osc1.connect(gain);
      osc2.connect(gain2);
      osc1.start();
      osc2.start();
      nodesRef.current[id] = { source: osc1, gain };
      nodesRef.current[id + '_2'] = { source: osc2, gain: gain2 };
    } else {
      const buffer = id === 'rain' ? createRainBuffer() : createNoiseBuffer(id as 'white' | 'brown');
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      source.connect(gain);
      source.start();
      nodesRef.current[id] = { source, gain };
    }
  }, [getCtx, createNoiseBuffer, createRainBuffer]);

  const stopSound = useCallback((id: string) => {
    const node = nodesRef.current[id];
    if (node) { try { node.source.stop(); } catch {} nodesRef.current[id] = null; }
    if (id === 'binaural') {
      const node2 = nodesRef.current[id + '_2'];
      if (node2) { try { node2.source.stop(); } catch {} nodesRef.current[id + '_2'] = null; }
    }
  }, []);

  const toggleSound = (id: string) => {
    setChannels(channels.map(c => {
      if (c.id !== id) return c;
      if (c.playing) { stopSound(id); return { ...c, playing: false }; }
      else { startSound(id, c.volume); return { ...c, playing: true }; }
    }));
  };

  const setVolume = (id: string, volume: number) => {
    setChannels(channels.map(c => {
      if (c.id !== id) return c;
      const node = nodesRef.current[id];
      if (node) node.gain.gain.value = volume;
      if (id === 'binaural') {
        const node2 = nodesRef.current[id + '_2'];
        if (node2) node2.gain.gain.value = volume;
      }
      return { ...c, volume };
    }));
  };

  useEffect(() => {
    return () => {
      Object.keys(nodesRef.current).forEach(id => stopSound(id));
      audioCtxRef.current?.close();
    };
  }, [stopSound]);

  const anyPlaying = channels.some(c => c.playing);

  const stopAll = () => {
    channels.forEach(c => { if (c.playing) stopSound(c.id); });
    setChannels(channels.map(c => ({ ...c, playing: false })));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="\u{1F3B5}" title="Study Music" description="Layer ambient sounds for focus. Powered by Web Audio API." />

      <div className="space-y-4 mb-6">
        {channels.map(c => (
          <Card key={c.id}>
            <div className="flex items-center gap-4">
              <span className="text-2xl">{c.icon}</span>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{c.name}</h3>
                  <Button size="sm" variant={c.playing ? 'danger' : 'primary'} onClick={() => toggleSound(c.id)}>
                    {c.playing ? 'Stop' : 'Play'}
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-8">Vol</span>
                  <input type="range" min="0" max="1" step="0.01" value={c.volume}
                    onChange={e => setVolume(c.id, parseFloat(e.target.value))}
                    className="flex-1 accent-purple-500" />
                  <span className="text-xs text-gray-500 w-8">{Math.round(c.volume * 100)}%</span>
                </div>
              </div>
              {c.playing && (
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1 bg-purple-500 rounded-full animate-pulse" style={{ height: `${12 + Math.random() * 16}px`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {anyPlaying && (
        <div className="text-center">
          <Button variant="secondary" onClick={stopAll}>Stop All</Button>
        </div>
      )}
    </div>
  );
}
