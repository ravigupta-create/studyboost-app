'use client';

import { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface ColorNote {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const COLORS = [
  { name: 'Yellow', color: '#FEF3C7', darkColor: '#78350F', label: 'Definitions', class: 'bg-yellow-200 dark:bg-yellow-900/40' },
  { name: 'Green', color: '#D1FAE5', darkColor: '#064E3B', label: 'Key Terms', class: 'bg-green-200 dark:bg-green-900/40' },
  { name: 'Blue', color: '#DBEAFE', darkColor: '#1E3A5F', label: 'Examples', class: 'bg-blue-200 dark:bg-blue-900/40' },
  { name: 'Pink', color: '#FCE7F3', darkColor: '#831843', label: 'Questions', class: 'bg-pink-200 dark:bg-pink-900/40' },
];

const LS_KEY = 'sb-color-notes';

export default function ColorNotesPage() {
  const [notes, setNotes] = useState<ColorNote[]>([]);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  const saveNotes = (updated: ColorNote[]) => {
    setNotes(updated);
    localStorage.setItem(LS_KEY, JSON.stringify(updated));
  };

  const createNote = () => {
    const note: ColorNote = { id: Date.now().toString(), title: 'Untitled Note', content: '', createdAt: new Date().toISOString() };
    const updated = [...notes, note];
    saveNotes(updated);
    setActiveNote(note.id);
    setTitle(note.title);
    setTimeout(() => { if (editorRef.current) editorRef.current.innerHTML = ''; }, 50);
  };

  const selectNote = (id: string) => {
    // save current first
    if (activeNote && editorRef.current) {
      const updated = notes.map(n => n.id === activeNote ? { ...n, title, content: editorRef.current!.innerHTML } : n);
      saveNotes(updated);
    }
    setActiveNote(id);
    const note = notes.find(n => n.id === id);
    if (note) {
      setTitle(note.title);
      setTimeout(() => { if (editorRef.current) editorRef.current.innerHTML = note.content; }, 50);
    }
  };

  const deleteNote = (id: string) => {
    saveNotes(notes.filter(n => n.id !== id));
    if (activeNote === id) { setActiveNote(null); setTitle(''); }
  };

  const saveCurrentNote = () => {
    if (!activeNote || !editorRef.current) return;
    const updated = notes.map(n => n.id === activeNote ? { ...n, title, content: editorRef.current!.innerHTML } : n);
    saveNotes(updated);
  };

  const applyHighlight = (color: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return;
    document.execCommand('hiliteColor', false, color);
    saveCurrentNote();
  };

  const clearHighlights = () => {
    if (!editorRef.current) return;
    const spans = editorRef.current.querySelectorAll('span[style*="background-color"]');
    spans.forEach(span => {
      const parent = span.parentNode;
      if (parent) {
        while (span.firstChild) parent.insertBefore(span.firstChild, span);
        parent.removeChild(span);
      }
    });
    saveCurrentNote();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <PageHeader icon="\u{1F3A8}" title="Color Notes" description="Take notes with color-coded highlights for different types of information." />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Notes</h3>
              <Button size="sm" onClick={createNote}>+</Button>
            </div>
            <div className="space-y-1">
              {notes.map(n => (
                <div key={n.id} onClick={() => selectNote(n.id)}
                  className={`p-2 rounded-lg cursor-pointer text-sm flex justify-between items-center ${activeNote === n.id ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'}`}>
                  <span className="truncate">{n.title}</span>
                  <button onClick={e => { e.stopPropagation(); deleteNote(n.id); }} className="text-red-400 hover:text-red-600 text-xs ml-2">x</button>
                </div>
              ))}
              {notes.length === 0 && <p className="text-xs text-gray-400 text-center py-4">No notes yet</p>}
            </div>
          </Card>
        </div>

        <div className="md:col-span-3">
          {activeNote ? (
            <Card>
              <Input placeholder="Note title..." value={title} onChange={e => setTitle(e.target.value)} onBlur={saveCurrentNote}
                className="mb-3 text-lg font-semibold border-none focus:ring-0 px-0" />

              <div className="flex flex-wrap gap-2 mb-3 p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                {COLORS.map(c => (
                  <button key={c.name} onClick={() => applyHighlight(c.color)}
                    className={`px-3 py-1.5 rounded text-xs font-medium ${c.class} hover:opacity-80 transition-opacity`}>
                    {c.name} ({c.label})
                  </button>
                ))}
                <button onClick={clearHighlights} className="px-3 py-1.5 rounded text-xs font-medium text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700">
                  Clear Highlights
                </button>
              </div>

              <div ref={editorRef} contentEditable suppressContentEditableWarning
                onBlur={saveCurrentNote}
                className="min-h-[300px] p-4 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900"
                style={{ whiteSpace: 'pre-wrap' }} />

              <div className="flex gap-2 mt-3">
                <Button size="sm" onClick={saveCurrentNote}>Save</Button>
              </div>
            </Card>
          ) : (
            <Card className="flex items-center justify-center py-16">
              <p className="text-gray-400">Select or create a note to get started</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
