'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const PASSAGES = [
  "The scientific method is a systematic approach to understanding the natural world. It begins with observation and the formulation of a question. From there, a hypothesis is developed, which is a testable prediction about the outcome of an experiment. Data is collected and analyzed, and conclusions are drawn based on the evidence gathered.",
  "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water. This process generates oxygen as a byproduct and is fundamental to life on Earth. The light reactions occur in the thylakoid membranes, while the Calvin cycle takes place in the stroma of the chloroplast.",
  "The Renaissance was a period of cultural, artistic, and intellectual rebirth that began in Italy in the fourteenth century and spread throughout Europe. It marked the transition from the medieval period to the modern age. Key figures include Leonardo da Vinci, Michelangelo, and Galileo, who made groundbreaking contributions to art, science, and philosophy.",
  "In mathematics, a function is a relation between a set of inputs and a set of possible outputs where each input is related to exactly one output. Functions are fundamental to calculus, algebra, and virtually every branch of mathematics. They can be represented as equations, graphs, tables, or verbal descriptions.",
  "The water cycle describes the continuous movement of water within the Earth and atmosphere. It involves evaporation from surface water, transpiration from plants, condensation into clouds, and precipitation as rain or snow. This cycle is essential for distributing fresh water across the planet and supporting all forms of life.",
];

export default function TypingPage() {
  const [passageIdx, setPassageIdx] = useState(0);
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const passage = PASSAGES[passageIdx];

  const calcStats = useCallback((typed: string) => {
    if (!started || typed.length === 0) return;
    const elapsed = (Date.now() - startTime) / 1000 / 60;
    const words = typed.split(/\s+/).filter(Boolean).length;
    setWpm(Math.round(words / Math.max(elapsed, 0.01)));

    let correctChars = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === passage[i]) correctChars++;
    }
    setAccuracy(Math.round((correctChars / typed.length) * 100));
  }, [started, startTime, passage]);

  const handleInput = (val: string) => {
    if (finished) return;
    if (!started && val.length > 0) {
      setStarted(true);
      setStartTime(Date.now());
    }
    setInput(val);
    calcStats(val);
    if (val.length >= passage.length) {
      setFinished(true);
    }
  };

  useEffect(() => {
    if (started && !finished) {
      const interval = setInterval(() => calcStats(input), 500);
      return () => clearInterval(interval);
    }
  }, [started, finished, input, calcStats]);

  const restart = (newIdx?: number) => {
    setPassageIdx(newIdx ?? passageIdx);
    setInput('');
    setStarted(false);
    setFinished(false);
    setWpm(0);
    setAccuracy(100);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const progress = Math.round((input.length / passage.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="\u2328\uFE0F" title="Typing Speed Test" description="Test your typing speed with academic passages." />

      <Card className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <span className="text-sm"><span className="font-medium text-purple-600">{wpm}</span> WPM</span>
            <span className="text-sm"><span className="font-medium text-green-600">{accuracy}%</span> accuracy</span>
            <span className="text-sm text-gray-500">{progress}% done</span>
          </div>
          <div className="flex gap-2">
            {PASSAGES.map((_, i) => (
              <button key={i} onClick={() => restart(i)}
                className={`w-8 h-8 rounded text-xs ${passageIdx === i ? 'bg-purple-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mb-6">
          <div className="bg-purple-500 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg mb-4 font-mono text-sm leading-relaxed select-none">
          {passage.split('').map((char, i) => {
            let color = 'text-gray-400';
            if (i < input.length) {
              color = input[i] === char ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
            }
            if (i === input.length) color = 'text-gray-900 dark:text-gray-100 border-b-2 border-purple-500';
            return <span key={i} className={color}>{char}</span>;
          })}
        </div>

        <textarea
          ref={inputRef}
          value={input}
          onChange={e => handleInput(e.target.value)}
          disabled={finished}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-mono focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          rows={3}
          placeholder="Start typing here..."
          autoFocus
        />

        {finished && (
          <div className="mt-4 text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Done! {wpm} WPM at {accuracy}% accuracy</h3>
            <p className="text-sm text-gray-500 mb-3">
              {wpm >= 80 ? 'Lightning fast!' : wpm >= 50 ? 'Great speed!' : wpm >= 30 ? 'Good job, keep practicing!' : 'Keep at it!'}
            </p>
            <Button onClick={() => restart()}>Try Again</Button>
          </div>
        )}
      </Card>
    </div>
  );
}
