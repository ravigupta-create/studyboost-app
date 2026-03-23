'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editing, setEditing] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [search, setSearch] = useState('');
  const [filterTag, setFilterTag] = useState('');

  useEffect(() => { const s = localStorage.getItem('sb-notes'); if (s) setNotes(JSON.parse(s)); }, []);
  const save = (d: Note[]) => { setNotes(d); localStorage.setItem('sb-notes', JSON.stringify(d)); };

  const saveNote = () => {
    if (!title.trim()) return;
    const tagList = tags.split(',').map(t => t.trim()).filter(t => t);
    if (editing) {
      const updated = { ...editing, title: title.trim(), content: content.trim(), tags: tagList, updatedAt: new Date().toISOString() };
      save(notes.map(n => n.id === editing.id ? updated : n));
    } else {
      const n: Note = { id: Date.now().toString(), title: title.trim(), content: content.trim(), tags: tagList, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      save([n, ...notes]);
    }
    setEditing(null); setTitle(''); setContent(''); setTags('');
  };

  const editNote = (n: Note) => {
    setEditing(n); setTitle(n.title); setContent(n.content); setTags(n.tags.join(', '));
  };

  const deleteNote = (id: string) => {
    save(notes.filter(n => n.id !== id));
    if (editing?.id === id) { setEditing(null); setTitle(''); setContent(''); setTags(''); }
  };

  const exportNote = (n: Note) => {
    const text = `${n.title}\n${'='.repeat(n.title.length)}\nTags: ${n.tags.join(', ') || 'none'}\nDate: ${new Date(n.createdAt).toLocaleDateString()}\n\n${n.content}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${n.title.replace(/\s+/g, '_')}.txt`;
    a.click(); URL.revokeObjectURL(url);
  };

  const allTags = [...new Set(notes.flatMap(n => n.tags))].sort();

  const filtered = notes.filter(n => {
    if (filterTag && !n.tags.includes(filterTag)) return false;
    if (!search) return true;
    const s = search.toLowerCase();
    return n.title.toLowerCase().includes(s) || n.content.toLowerCase().includes(s) || n.tags.some(t => t.toLowerCase().includes(s));
  }).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader icon="&#128196;" title="Notes" description="Create, organize, and search notes with tags." />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <h3 className="text-sm font-semibold mb-2">Tags</h3>
            <div className="space-y-1">
              <button onClick={() => setFilterTag('')}
                className={`block w-full text-left px-2 py-1 rounded text-sm ${!filterTag ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                All Notes ({notes.length})
              </button>
              {allTags.map(tag => (
                <button key={tag} onClick={() => setFilterTag(tag === filterTag ? '' : tag)}
                  className={`block w-full text-left px-2 py-1 rounded text-sm ${filterTag === tag ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                  #{tag} ({notes.filter(n => n.tags.includes(tag)).length})
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Main */}
        <div className="md:col-span-3">
          <Card className="mb-6">
            <h2 className="text-lg font-semibold mb-3">{editing ? 'Edit Note' : 'New Note'}</h2>
            <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="mb-3" />
            <Textarea placeholder="Write your note..." value={content} onChange={e => setContent(e.target.value)} className="min-h-[150px] mb-3" />
            <Input placeholder="Tags (comma-separated)" value={tags} onChange={e => setTags(e.target.value)} className="mb-3" />
            <div className="flex gap-2">
              <Button onClick={saveNote} disabled={!title.trim()}>{editing ? 'Update' : 'Save'} Note</Button>
              {editing && <Button variant="ghost" onClick={() => { setEditing(null); setTitle(''); setContent(''); setTags(''); }}>Cancel</Button>}
            </div>
          </Card>

          <div className="mb-4">
            <Input placeholder="Search notes..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          {filtered.length === 0 ? (
            <Card><p className="text-gray-500 text-sm text-center">No notes found.</p></Card>
          ) : (
            <div className="space-y-3">
              {filtered.map(n => (
                <Card key={n.id} hover className="cursor-pointer" onClick={() => editNote(n)}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{n.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{n.content}</p>
                      {n.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {n.tags.map(t => (
                            <span key={t} className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded text-xs">#{t}</span>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-gray-400 mt-2">{new Date(n.updatedAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-1 ml-3" onClick={e => e.stopPropagation()}>
                      <Button variant="ghost" size="sm" onClick={() => exportNote(n)}>Export</Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteNote(n.id)}>Delete</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
