import { Citation, CitationStyle } from '@/types';

export function generateCitation(citation: Citation, style: CitationStyle): string {
  switch (style) {
    case 'mla':
      return generateMLA(citation);
    case 'apa':
      return generateAPA(citation);
    case 'chicago':
      return generateChicago(citation);
    default:
      return '';
  }
}

// ─── MLA 9th Edition ────────────────────────────────────────────────────────

function generateMLA(c: Citation): string {
  const authors = formatMLAAuthors(c.authors);

  switch (c.type) {
    case 'book': {
      // Author(s). Title. Publisher, Year.
      let cite = `${authors} `;
      cite += `<i>${c.title}</i>. `;
      if (c.publisher) cite += `${c.publisher}, `;
      cite += `${c.year}.`;
      return cite;
    }
    case 'website': {
      // Author(s). "Title." Website/Publisher, Year, URL. Accessed Date.
      let cite = `${authors} `;
      cite += `"${c.title}." `;
      if (c.publisher) cite += `<i>${c.publisher}</i>, `;
      if (c.year) cite += `${c.year}`;
      if (c.url) cite += `, ${c.url}`;
      cite += '.';
      if (c.accessDate) cite += ` Accessed ${c.accessDate}.`;
      return cite;
    }
    case 'journal': {
      // Author(s). "Title." Journal, vol. V, no. I, Year, pp. Pages.
      let cite = `${authors} `;
      cite += `"${c.title}." `;
      if (c.journal) cite += `<i>${c.journal}</i>`;
      if (c.volume) cite += `, vol. ${c.volume}`;
      if (c.issue) cite += `, no. ${c.issue}`;
      cite += `, ${c.year}`;
      if (c.pages) cite += `, pp. ${c.pages}`;
      cite += '.';
      if (c.url) cite += ` ${c.url}.`;
      return cite;
    }
    case 'article': {
      // Author(s). "Title." Publisher/Source, Year.
      let cite = `${authors} `;
      cite += `"${c.title}." `;
      if (c.publisher) cite += `<i>${c.publisher}</i>, `;
      cite += `${c.year}`;
      if (c.pages) cite += `, pp. ${c.pages}`;
      cite += '.';
      if (c.url) cite += ` ${c.url}.`;
      return cite;
    }
  }
}

function formatMLAAuthors(authors: string): string {
  if (!authors.trim()) return '';
  const parts = authors.split(',').map((a) => a.trim()).filter(Boolean);
  if (parts.length === 1) return `${invertName(parts[0])}.`;
  if (parts.length === 2) return `${invertName(parts[0])}, and ${parts[1]}.`;
  return `${invertName(parts[0])}, et al.`;
}

// ─── APA 7th Edition ────────────────────────────────────────────────────────

function generateAPA(c: Citation): string {
  const authors = formatAPAAuthors(c.authors);

  switch (c.type) {
    case 'book': {
      // Author(s). (Year). Title. Publisher.
      let cite = `${authors} (${c.year}). `;
      cite += `<i>${c.title}</i>. `;
      if (c.publisher) cite += `${c.publisher}.`;
      return cite;
    }
    case 'website': {
      // Author(s). (Year). Title. Site Name. URL
      let cite = `${authors} (${c.year}). `;
      cite += `${c.title}. `;
      if (c.publisher) cite += `<i>${c.publisher}</i>. `;
      if (c.url) cite += c.url;
      return cite;
    }
    case 'journal': {
      // Author(s). (Year). Title. Journal, Volume(Issue), Pages. URL
      let cite = `${authors} (${c.year}). `;
      cite += `${c.title}. `;
      if (c.journal) cite += `<i>${c.journal}</i>`;
      if (c.volume) cite += `, <i>${c.volume}</i>`;
      if (c.issue) cite += `(${c.issue})`;
      if (c.pages) cite += `, ${c.pages}`;
      cite += '.';
      if (c.url) cite += ` ${c.url}`;
      return cite;
    }
    case 'article': {
      // Author(s). (Year). Title. Source. URL
      let cite = `${authors} (${c.year}). `;
      cite += `${c.title}. `;
      if (c.publisher) cite += `<i>${c.publisher}</i>`;
      if (c.pages) cite += `, ${c.pages}`;
      cite += '.';
      if (c.url) cite += ` ${c.url}`;
      return cite;
    }
  }
}

function formatAPAAuthors(authors: string): string {
  if (!authors.trim()) return '';
  const parts = authors.split(',').map((a) => a.trim()).filter(Boolean);

  const formatted = parts.map((name) => {
    const words = name.split(' ').filter(Boolean);
    if (words.length === 1) return words[0];
    const last = words[words.length - 1];
    const initials = words.slice(0, -1).map((w) => `${w[0].toUpperCase()}.`).join(' ');
    return `${last}, ${initials}`;
  });

  if (formatted.length === 1) return formatted[0];
  if (formatted.length === 2) return `${formatted[0]}, & ${formatted[1]}`;
  const allButLast = formatted.slice(0, -1).join(', ');
  return `${allButLast}, & ${formatted[formatted.length - 1]}`;
}

// ─── Chicago 17th Edition (Notes-Bibliography) ─────────────────────────────

function generateChicago(c: Citation): string {
  const authors = formatChicagoAuthors(c.authors);

  switch (c.type) {
    case 'book': {
      // Author(s). Title. Place: Publisher, Year.
      let cite = `${authors} `;
      cite += `<i>${c.title}</i>. `;
      if (c.publisher) cite += `${c.publisher}, `;
      cite += `${c.year}.`;
      return cite;
    }
    case 'website': {
      // Author(s). "Title." Publisher. Accessed Date. URL.
      let cite = `${authors} `;
      cite += `"${c.title}." `;
      if (c.publisher) cite += `${c.publisher}. `;
      if (c.accessDate) cite += `Accessed ${c.accessDate}. `;
      if (c.url) cite += `${c.url}.`;
      return cite;
    }
    case 'journal': {
      // Author(s). "Title." Journal Volume, no. Issue (Year): Pages.
      let cite = `${authors} `;
      cite += `"${c.title}." `;
      if (c.journal) cite += `<i>${c.journal}</i>`;
      if (c.volume) cite += ` ${c.volume}`;
      if (c.issue) cite += `, no. ${c.issue}`;
      cite += ` (${c.year})`;
      if (c.pages) cite += `: ${c.pages}`;
      cite += '.';
      if (c.url) cite += ` ${c.url}.`;
      return cite;
    }
    case 'article': {
      // Author(s). "Title." Source, Year.
      let cite = `${authors} `;
      cite += `"${c.title}." `;
      if (c.publisher) cite += `<i>${c.publisher}</i>, `;
      cite += `${c.year}`;
      if (c.pages) cite += `, ${c.pages}`;
      cite += '.';
      if (c.url) cite += ` ${c.url}.`;
      return cite;
    }
  }
}

function formatChicagoAuthors(authors: string): string {
  if (!authors.trim()) return '';
  const parts = authors.split(',').map((a) => a.trim()).filter(Boolean);
  if (parts.length === 1) return `${invertName(parts[0])}.`;
  if (parts.length === 2) return `${invertName(parts[0])}, and ${parts[1]}.`;
  if (parts.length === 3) return `${invertName(parts[0])}, ${parts[1]}, and ${parts[2]}.`;
  return `${invertName(parts[0])}, et al.`;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function invertName(name: string): string {
  const words = name.trim().split(' ').filter(Boolean);
  if (words.length <= 1) return name;
  const last = words[words.length - 1];
  const rest = words.slice(0, -1).join(' ');
  return `${last}, ${rest}`;
}
