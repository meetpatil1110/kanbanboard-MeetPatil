// src/components/KanbanColumn.tsx
import React, { useCallback, useState } from "react";
import TaskCard from "./TaskCard";
import type { Task } from "./KanbanBoard/KanbanBoard.types";

type Props = {
  title: string;
  tasks: Task[];
  statusKey: Task["status"];
  onDropTask: (taskId: number, toStatus: Task["status"], toIndex?: number) => void;
  onDeleteTask?: (id: number) => void;
  onKeyboardMove?: (taskId: number, e: React.KeyboardEvent) => void;
  registerTaskRef?: (taskId: number, el: HTMLDivElement | null) => void;
  onAddInColumn?: (status: Task["status"]) => void;
  wipLimit?: number | null;
  onOpenTask?: (task: Task) => void;
};

export default function KanbanColumn({
  title,
  tasks,
  statusKey,
  onDropTask,
  onDeleteTask,
  onKeyboardMove,
  registerTaskRef,
  onAddInColumn,
  wipLimit = null,
  onOpenTask,
}: Props) {
  const [isOver, setIsOver] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsOver(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsOver(false), []);

  const parsePayload = (e: React.DragEvent) => {
    let payload: { id?: number } | null = null;
    try {
      const txt = e.dataTransfer.getData("text/plain");
      payload = txt ? JSON.parse(txt) : null;
    } catch {
      const txt = e.dataTransfer.getData("text/plain");
      payload = txt ? { id: Number(txt) } : null;
    }
    return payload;
  };

  const handleDropOnColumn = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsOver(false);
      const payload = parsePayload(e);
      if (!payload || !payload.id) return;
      onDropTask(payload.id as number, statusKey, undefined);
    },
    [onDropTask, statusKey]
  );

  const handleDropOnTask = useCallback(
    (e: React.DragEvent, idx: number) => {
      e.preventDefault();
      setIsOver(false);
      const payload = parsePayload(e);
      if (!payload || !payload.id) return;
      onDropTask(payload.id as number, statusKey, idx);
    },
    [onDropTask, statusKey]
  );

  return (
    <section
      role="region"
      aria-label={`${title} column. ${tasks.length} tasks.`}
      className={`bg-neutral-50 p-4 rounded-lg min-h-[160px] transition-shadow flex flex-col ${
        isOver ? "ring-2 ring-primary-300" : ""
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDropOnColumn}
      onDragLeave={handleDragLeave}
    >
      <header className="mb-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold">{title}</h3>
            <span className="text-sm text-neutral-500">{tasks.length}</span>
            {typeof wipLimit === "number" ? (
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  tasks.length > wipLimit
                    ? "bg-red-100 text-red-700"
                    : "bg-neutral-100"
                }`}
              >
                WIP {tasks.length}/{wipLimit}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            title={collapsed ? "Expand column" : "Collapse column"}
            onClick={() => setCollapsed((s) => !s)}
            className="px-2 py-1 border rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            {collapsed ? "▸" : "▾"}
          </button>

          <div className="relative">
            <button
              title="Column options"
              className="px-2 py-1 border rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              ⋯
            </button>
          </div>
        </div>
      </header>

      <div className={`flex-1 overflow-auto ${collapsed ? "hidden" : ""}`}>
        <div className="space-y-4">
          {tasks.map((t, idx) => (
            <div
              key={t.id}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
              }}
              onDrop={(e) => handleDropOnTask(e, idx)}
            >
              <TaskCard
                task={t}
                onDelete={onDeleteTask}
                onKeyboardMove={onKeyboardMove}
                registerRef={registerTaskRef}
                onOpen={onOpenTask}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-neutral-200">
        <button
          onClick={() => onAddInColumn?.(statusKey)}
          className="w-full px-3 py-2 bg-primary-600 text-black rounded-lg hover:bg-primary-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          + Add task
        </button>
      </div>
    </section>
  );
}
