// src/utils/sampleData.ts
type Task = {
  id: string;
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
};

type Column = { id: string; title: string; taskIds: string[] };

function makeId() {
  // crypto.randomUUID is available in modern browsers & Node 16.9+ used by Vite
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // fallback
  return Math.random().toString(36).slice(2, 9);
}

export function generateSampleData(withPriorities = false) {
  const tasks: Record<string, Task> = {};
  const columns: Column[] = [];

  const starter = [
    { title: "Design wireframes" },
    { title: "Set up project" },
    { title: "Implement drag & drop" },
    { title: "Write README" }
  ];

  const todoIds: string[] = [];
  starter.forEach((s, i) => {
    const id = makeId();
    tasks[id] = {
      id,
      title: s.title,
      priority: withPriorities ? (i % 3 === 0 ? "high" : i % 2 === 0 ? "medium" : "low") : undefined
    };
    todoIds.push(id);
  });

  columns.push({ id: "col-1", title: "To Do", taskIds: todoIds });
  columns.push({ id: "col-2", title: "In Progress", taskIds: [] });
  columns.push({ id: "col-3", title: "Done", taskIds: [] });

  return { columns, tasks };
}

export function generateManyTasks(n = 50) {
  const tasks: Record<string, Task> = {};
  const columns: Column[] = [
    { id: "col-1", title: "To Do", taskIds: [] },
    { id: "col-2", title: "In Progress", taskIds: [] },
    { id: "col-3", title: "Done", taskIds: [] },
  ];

  for (let i = 0; i < n; i++) {
    const id = makeId();
    tasks[id] = { id, title: `Task ${i + 1}`, priority: (i % 3 === 0 ? "high" : i % 3 === 1 ? "medium" : "low") };
    const colIndex = i % columns.length;
    columns[colIndex].taskIds.push(id);
  }

  return { columns, tasks };
}
