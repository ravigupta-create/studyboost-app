'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

interface Book {
  id: string;
  title: string;
  author: string;
  pages: number;
  status: 'to-read' | 'reading' | 'done';
  rating: number;
  notes: string;
}

const LS_KEY = 'sb-reading-list';

export default function ReadingListPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title' | 'rating'>('title');
  const [form, setForm] = useState({ title: '', author: '', pages: '', status: 'to-read' as Book['status'], rating: 0, notes: '' });

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setBooks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (books.length > 0 || localStorage.getItem(LS_KEY)) localStorage.setItem(LS_KEY, JSON.stringify(books));
  }, [books]);

  const resetForm = () => { setForm({ title: '', author: '', pages: '', status: 'to-read', rating: 0, notes: '' }); setEditId(null); setShowForm(false); };

  const saveBook = () => {
    if (!form.title.trim()) return;
    const book: Book = { id: editId || Date.now().toString(), title: form.title.trim(), author: form.author.trim(), pages: parseInt(form.pages) || 0, status: form.status, rating: form.rating, notes: form.notes };
    if (editId) setBooks(books.map(b => b.id === editId ? book : b));
    else setBooks([...books, book]);
    resetForm();
  };

  const editBook = (b: Book) => {
    setForm({ title: b.title, author: b.author, pages: b.pages.toString(), status: b.status, rating: b.rating, notes: b.notes });
    setEditId(b.id);
    setShowForm(true);
  };

  const deleteBook = (id: string) => setBooks(books.filter(b => b.id !== id));

  const readingTime = (pages: number) => {
    const words = pages * 250;
    const minutes = words / 250;
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const filtered = books
    .filter(b => filter === 'all' || b.status === filter)
    .sort((a, b) => sortBy === 'title' ? a.title.localeCompare(b.title) : b.rating - a.rating);

  const stars = (rating: number, onClick?: (r: number) => void) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <button key={i} onClick={() => onClick?.(i)} className={`text-lg ${onClick ? 'cursor-pointer' : 'cursor-default'} ${i <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}>
          {i <= rating ? '\u2605' : '\u2606'}
        </button>
      ))}
    </div>
  );

  const statusBadge: Record<string, string> = {
    'to-read': 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
    'reading': 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
    'done': 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <PageHeader icon="📚" title="Reading List" description="Track your books, ratings, and estimated reading times." />

      <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
        <div className="flex gap-2">
          {['all', 'to-read', 'reading', 'done'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm ${filter === f ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              {f === 'all' ? 'All' : f.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-500">Sort:</span>
          <Select value={sortBy} onChange={e => setSortBy(e.target.value as 'title' | 'rating')} className="w-32">
            <option value="title">Title</option>
            <option value="rating">Rating</option>
          </Select>
          <Button onClick={() => { resetForm(); setShowForm(true); }}>+ Add Book</Button>
        </div>
      </div>

      {showForm && (
        <Card className="mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">{editId ? 'Edit Book' : 'Add Book'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <Input placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
            <Input type="number" placeholder="Pages" value={form.pages} onChange={e => setForm({ ...form, pages: e.target.value })} />
            <Select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as Book['status'] })}>
              <option value="to-read">To Read</option>
              <option value="reading">Reading</option>
              <option value="done">Done</option>
            </Select>
          </div>
          <div className="mb-4">
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Rating</label>
            {stars(form.rating, r => setForm({ ...form, rating: r }))}
          </div>
          <Textarea placeholder="Notes..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="mb-4" />
          <div className="flex gap-2">
            <Button onClick={saveBook}>{editId ? 'Update' : 'Add'}</Button>
            <Button variant="secondary" onClick={resetForm}>Cancel</Button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {filtered.map(b => (
          <Card key={b.id} hover>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{b.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge[b.status]}`}>{b.status.replace('-', ' ')}</span>
                </div>
                <p className="text-sm text-gray-500">by {b.author || 'Unknown'}</p>
                <div className="flex items-center gap-4 mt-2">
                  {stars(b.rating)}
                  {b.pages > 0 && <span className="text-xs text-gray-400">{b.pages} pages - ~{readingTime(b.pages)} reading time</span>}
                </div>
                {b.notes && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 bg-gray-50 dark:bg-gray-900 p-2 rounded">{b.notes}</p>}
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => editBook(b)} className="text-sm text-purple-500 hover:text-purple-700">Edit</button>
                <button onClick={() => deleteBook(b.id)} className="text-sm text-red-400 hover:text-red-600">Delete</button>
              </div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && <Card className="text-center py-8"><p className="text-gray-400">No books found. Add one to get started!</p></Card>}
      </div>

      {books.length > 0 && (
        <Card className="mt-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div><div className="text-2xl font-bold text-purple-600">{books.length}</div><div className="text-xs text-gray-500">Total Books</div></div>
            <div><div className="text-2xl font-bold text-blue-600">{books.filter(b => b.status === 'reading').length}</div><div className="text-xs text-gray-500">Currently Reading</div></div>
            <div><div className="text-2xl font-bold text-green-600">{books.filter(b => b.status === 'done').length}</div><div className="text-xs text-gray-500">Completed</div></div>
          </div>
        </Card>
      )}
    </div>
  );
}
