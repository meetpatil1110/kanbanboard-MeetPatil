import type { Task } from '../components/KanbanBoard/KanbanBoard.types';
export function uid() { return String(Date.now()) + Math.random().toString(36).slice(2, 8); }
export function groupByStatus(tasks: Task[]) {
  return {
    todo: tasks.filter(t => t.status === 'todo'),
    inprogress: tasks.filter(t => t.status === 'inprogress'),
    done: tasks.filter(t => t.status === 'done'),
  };
}
