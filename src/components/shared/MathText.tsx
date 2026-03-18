'use client';

import { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export function MathText({ text }: { text: string }) {
  const html = useMemo(() => {
    return text.replace(/\$([^$]+)\$/g, (_, tex) => {
      try {
        return katex.renderToString(tex, { throwOnError: false });
      } catch {
        return tex;
      }
    });
  }, [text]);

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
