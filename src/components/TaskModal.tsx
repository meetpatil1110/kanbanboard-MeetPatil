// src/components/TaskModal.tsx
import React, { useEffect, useState } from "react";
import type { Task } from "./KanbanBoard/KanbanBoard.types";

type Props = {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onSave: (updated: Task) => void;
  onDelete?: (id: number) => void;
};

export default function TaskModal({ task, open, onClose, onSave, onDelete }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Task["status"]>("todo");
  const [priority, setPriority] = useState<string | undefined>(undefined);
  const [assignee, setAssignee] = useState<string | undefined>(undefined);
  const [dueDate, setDueDate] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status);
      setPriority(task.priority);
      setAssignee(task.assignee);
      setDueDate(task.dueDate);
    }
  }, [task]);

  if (!open || !task) return null;

  function handleSave() {
    const updated: Task = {
      ...task,
      title: title.trim() || task.title,
      status,
      description: description.trim() || undefined,
      priority: priority as any,
      assignee: assignee || undefined,
      dueDate: dueDate || undefined,
    };
    onSave(updated);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div className="bg-white rounded-lg w-full max-w-xl p-6" onClick={(e) => e.stopPropagation()}>
        <h2 id="modal-title" className="text-lg font-semibold mb-4">Edit Task</h2>

        <label className="block mb-2 text-sm">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2 rounded mb-3" />

        <label className="block mb-2 text-sm">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded mb-3" rows={4} />

        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="block text-sm">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as Task["status"])} className="border p-2 rounded w-full">
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="block text-sm">Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value || undefined)} className="border p-2 rounded">
              <option value="">—</option>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
              <option value="urgent">urgent</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 items-end mb-4">
          <div className="flex-1">
            <label className="block text-sm">Assignee</label>
            <input value={assignee || ""} onChange={(e) => setAssignee(e.target.value || undefined)} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block text-sm">Due date</label>
            <input type="date" value={dueDate || ""} onChange={(e) => setDueDate(e.target.value || undefined)} className="border p-2 rounded" />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          {onDelete ? (
            <button
              onClick={() => onDelete(task.id)}
              className="px-3 py-2 border rounded text-red-600"
            >
              Delete
            </button>
          ) : null}
          <button onClick={onClose} className="px-3 py-2 border rounded">Cancel</button>
          <button onClick={handleSave} className="px-3 py-2 bg-primary-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
