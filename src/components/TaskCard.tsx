// src/components/TaskCard.tsx
import React from "react";
import type { Task } from "./KanbanBoard/KanbanBoard.types";

type Props = {
  task: Task;
  isDragging?: boolean;
  registerRef?: (taskId: number, el: HTMLDivElement | null) => void;
  onDelete?: (id: number) => void;
  onKeyboardMove?: (taskId: number, e: React.KeyboardEvent) => void;
  onTogglePick?: (taskId: number) => void;
  onOpen?: (task: Task) => void;
};

export default function TaskCard({
  task,
  isDragging = false,
  registerRef,
  onDelete,
  onKeyboardMove,
  onTogglePick,
  onOpen,
}: Props) {
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === " " || e.code === "Space") {
      e.preventDefault();
      onTogglePick?.(task.id);
      return;
    }
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      onKeyboardMove?.(task.id, e);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      onOpen?.(task);
    }
  }

  function handleClick() {
    onOpen?.(task);
  }

  function handleDragStart(e: React.DragEvent) {
    // include minimal payload
    try {
      e.dataTransfer.setData("text/plain", JSON.stringify({ id: task.id, status: task.status }));
    } catch {
      e.dataTransfer.setData("text/plain", String(task.id));
    }
    e.dataTransfer.effectAllowed = "move";
  }

  const ariaLabel = `${task.title}. Status: ${task.status}. Press space to grab.`;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-grabbed={isDragging ? "true" : "false"}
      onKeyDown={handleKeyDown}
      ref={(el) => registerRef?.(task.id, el)}
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
      className="bg-white border border-neutral-200 rounded-lg p-3 shadow-sm hover:shadow transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium truncate">{task.title}</div>
        <button
          aria-label={`Delete ${task.title}`}
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(task.id);
          }}
          className="ml-4 px-2 py-1 border rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          ✕
        </button>
      </div>

      {task.description ? (
        <p className="text-xs text-neutral-600 mt-2 line-clamp-2">{task.description}</p>
      ) : null}

      <div className="mt-3 flex items-center gap-2 text-xs">
        {task.priority ? <span className="px-2 py-0.5 rounded bg-neutral-100">{task.priority}</span> : null}
        {task.assignee ? <span className="px-2 py-0.5 rounded bg-neutral-100">{task.assignee}</span> : null}
        {task.dueDate ? <span className="px-2 py-0.5 rounded bg-neutral-100">Due: {task.dueDate.slice(0,10)}</span> : null}
      </div>
    </div>
  );
}
