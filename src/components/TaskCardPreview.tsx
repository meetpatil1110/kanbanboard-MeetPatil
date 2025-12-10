// src/components/TaskCardPreview.tsx
import React from "react";
import type { Task } from "./KanbanBoard/KanbanBoard.types";

export default function TaskCardPreview({ task }: { task: Task }) {
  return (
    <div className="bg-white border rounded p-3 shadow-lg w-64">
      <div className="font-medium text-sm">{task.title}</div>
    </div>
  );
}
