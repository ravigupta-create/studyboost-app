import { Citation, CitationStyle } from '@/types';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function generateCitation(citation: Citation, style: CitationStyle): string {
  const safe: Citation = {
    ...citation,
    authors: escapeHtml(citation.authors),
    title: escapeHtml(citation.title),
    year: escapeHtml(citation.year),
    publisher: citation.publisher ? escapeHtml(citation.publisher) : undefined,
    url: citation.url ? escapeHtml(citation.url) : undefined,
    journal: citation.journal ? escapeHtml(citation.journal) : undefined,
    volume: citation.volume ? escapeHtml(citation.volume) : undefined,
    issue: citation.issue ? escapeHtml(citation.issue) : undefined,
    pages: citation.pages ? escapeHtml(citation.pages) : undefined,
    accessDate: citation.accessDate ? escapeHtml(citation.accessDate) : undefined,
  };

  switch (style) {
    case 'mla':
      return generateMLA(safe);
    case 'apa':
      return generateAPA(safe);
    case 'chicago':
      return generateChicago(safe);
    default:
      return '';
  }
}

// ─── MLA 9th Edition ────────────────────────────────────────────────────────

function generateMLA(c: Citation): string {
  const authors = formatMLAAuthors(c.authors);

  switch (c.type) {
    case 'book': {
      let cite = `${authors} `;
      cite += `<i>${c.title}</i>. `;
      if (c.publisher) cite += `${c.publisher}, `;
      cite += `${c.year}.`;
      return cite;
    }
    case 'website': {
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
      let cite = `${authors} (${c.year}). `;
      cite += `<i>${c.title}</i>. `;
      if (c.publisher) cite += `${c.publisher}.`;
      return cite;
    }
    case 'website': {
      let cite = `${authors} (${c.year}). `;
      cite += `${c.title}. `;
      if (c.publisher) cite += `<i>${c.publisher}</i>. `;
      if (c.url) cite += c.url;
      return cite;
    }
    case 'journal': {
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
      let cite = `${authors} `;
      cite += `<i>${c.title}</i>. `;
      if (c.publisher) cite += `${c.publisher}, `;
      cite += `${c.year}.`;
      return cite;
    }
    case 'website': {
      let cite = `${authors} `;
      cite += `"${c.title}." `;
      if (c.publisher) cite += `${c.publisher}. `;
      if (c.accessDate) cite += `Accessed ${c.accessDate}. `;
      if (c.url) cite += `${c.url}.`;
      return cite;
    }
    case 'journal': {
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
