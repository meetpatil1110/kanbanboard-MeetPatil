// src/components/KanbanBoard/KanbanBoard.types.ts
export type Task = {
  id: number;
  title: string;
  status: "todo" | "inprogress" | "done";
  description?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  assignee?: string;
  tags?: string[];
  createdAt?: string;
  dueDate?: string; // ISO date string
};
