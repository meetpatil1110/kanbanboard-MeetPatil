import { useState } from 'react';
import type { Task } from '../components/KanbanBoard/KanbanBoard.types';

export function useKanbanBoard(initial: Task[] = []) {
  const [tasks, setTasks] = useState<Task[]>(initial);
  function addTask(t: Task) { setTasks(s => [...s, t]); }
  function moveTask(id: string, status: Task['status']) {
    setTasks(s => s.map(x => x.id === id ? { ...x, status } : x));
  }
  function deleteTask(id: string) { setTasks(s => s.filter(x => x.id !== id)); }
  return { tasks, addTask, moveTask, deleteTask, setTasks };
}
