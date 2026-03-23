'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Task {
  id: string;
  name: string;
  status: 'todo' | 'in-progress' | 'done';
  estimatedHours: number;
}

interface Project {
  id: string;
  name: string;
  tasks: Task[];
  createdAt: string;
}

const LS_KEY = 'sb-project-planner';

export default function ProjectPlannerPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskHours, setNewTaskHours] = useState('1');
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'hours'>('name');

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (projects.length > 0 || localStorage.getItem(LS_KEY)) {
      localStorage.setItem(LS_KEY, JSON.stringify(projects));
    }
  }, [projects]);

  const addProject = () => {
    if (!newProjectName.trim()) return;
    const p: Project = { id: Date.now().toString(), name: newProjectName.trim(), tasks: [], createdAt: new Date().toISOString() };
    setProjects([...projects, p]);
    setNewProjectName('');
    setActiveProject(p.id);
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
    if (activeProject === id) setActiveProject(null);
  };

  const addTask = (projectId: string) => {
    if (!newTaskName.trim()) return;
    const t: Task = { id: Date.now().toString(), name: newTaskName.trim(), status: 'todo', estimatedHours: parseFloat(newTaskHours) || 1 };
    setProjects(projects.map(p => p.id === projectId ? { ...p, tasks: [...p.tasks, t] } : p));
    setNewTaskName('');
    setNewTaskHours('1');
  };

  const updateTaskStatus = (projectId: string, taskId: string, status: Task['status']) => {
    setProjects(projects.map(p => p.id === projectId ? {
      ...p, tasks: p.tasks.map(t => t.id === taskId ? { ...t, status } : t)
    } : p));
  };

  const deleteTask = (projectId: string, taskId: string) => {
    setProjects(projects.map(p => p.id === projectId ? {
      ...p, tasks: p.tasks.filter(t => t.id !== taskId)
    } : p));
  };

  const getProgress = (tasks: Task[]) => {
    if (tasks.length === 0) return 0;
    return Math.round((tasks.filter(t => t.status === 'done').length / tasks.length) * 100);
  };

  const sortTasks = (tasks: Task[]) => {
    const sorted = [...tasks];
    const statusOrder = { 'in-progress': 0, 'todo': 1, 'done': 2 };
    if (sortBy === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === 'status') sorted.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    else sorted.sort((a, b) => b.estimatedHours - a.estimatedHours);
    return sorted;
  };

  const active = projects.find(p => p.id === activeProject);

  const statusColors: Record<string, string> = {
    'todo': 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300',
    'in-progress': 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
    'done': 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <PageHeader icon="📋" title="Project Planner" description="Create projects, manage tasks, and track your progress." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <h2 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">Projects</h2>
            <div className="flex gap-2 mb-4">
              <Input placeholder="New project..." value={newProjectName} onChange={e => setNewProjectName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addProject()} />
              <Button size="sm" onClick={addProject}>+</Button>
            </div>
            <div className="space-y-2">
              {projects.map(p => (
                <div key={p.id} onClick={() => setActiveProject(p.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${activeProject === p.id ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-300 dark:border-purple-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-transparent'}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm text-gray-900 dark:text-gray-100">{p.name}</span>
                    <button onClick={e => { e.stopPropagation(); deleteProject(p.id); }} className="text-red-400 hover:text-red-600 text-xs">Delete</button>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full transition-all" style={{ width: `${getProgress(p.tasks)}%` }} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{getProgress(p.tasks)}% complete - {p.tasks.length} tasks</div>
                </div>
              ))}
              {projects.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No projects yet</p>}
            </div>
          </Card>
        </div>

        <div className="md:col-span-2">
          {active ? (
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-xl text-gray-900 dark:text-gray-100">{active.name}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort:</span>
                  {(['name', 'status', 'hours'] as const).map(s => (
                    <button key={s} onClick={() => setSortBy(s)}
                      className={`text-xs px-2 py-1 rounded ${sortBy === s ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full transition-all" style={{ width: `${getProgress(active.tasks)}%` }} />
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>{getProgress(active.tasks)}% complete</span>
                  <span>{active.tasks.reduce((s, t) => s + t.estimatedHours, 0)}h estimated total</span>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <Input placeholder="Task name..." value={newTaskName} onChange={e => setNewTaskName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask(active.id)} />
                <Input type="number" min="0.5" step="0.5" value={newTaskHours} onChange={e => setNewTaskHours(e.target.value)} className="w-20" placeholder="Hrs" />
                <Button size="sm" onClick={() => addTask(active.id)}>Add</Button>
              </div>

              <div className="space-y-2">
                {sortTasks(active.tasks).map(t => (
                  <div key={t.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <select value={t.status} onChange={e => updateTaskStatus(active.id, t.id, e.target.value as Task['status'])}
                      className="text-xs rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-2 py-1 text-gray-900 dark:text-gray-100">
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                    <span className={`flex-1 text-sm ${t.status === 'done' ? 'line-through text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>{t.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[t.status]}`}>{t.status}</span>
                    <span className="text-xs text-gray-500">{t.estimatedHours}h</span>
                    <button onClick={() => deleteTask(active.id, t.id)} className="text-red-400 hover:text-red-600 text-sm">x</button>
                  </div>
                ))}
                {active.tasks.length === 0 && <p className="text-sm text-gray-400 text-center py-8">Add tasks to get started</p>}
              </div>
            </Card>
          ) : (
            <Card className="flex items-center justify-center py-16">
              <p className="text-gray-400">Select or create a project to get started</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
