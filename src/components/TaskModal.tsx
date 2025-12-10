
import React, { useEffect, useState } from "react";
import type { Task } from "./KanbanBoard/KanbanBoard.types";

type Props = {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete?: (id: number) => void;
};

export default function TaskModal({ task, open, onClose, onSave, onDelete }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Task["status"]>("todo");
  const [priority, setPriority] = useState<"low" | "medium" | "high" | "urgent">("low");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState<string | "">("");

  useEffect(() => {
    if (task) {
      setTitle(task.title ?? "");
      setDescription(task.description ?? "");
      setStatus(task.status ?? "todo");
      setPriority((task.priority as any) ?? "low");
      setAssignee(task.assignee ?? "");
      // If task.dueDate is a Date object or string — normalize to "YYYY-MM-DD" string or ""
      if (task.dueDate instanceof Date && !isNaN(task.dueDate.getTime())) {
        setDueDate(task.dueDate.toISOString().slice(0, 10));
      } else if (typeof task.dueDate === "string" && task.dueDate.length > 0) {
        // if it's already an ISO-ish string, keep the first 10 chars (yyyy-mm-dd)
        setDueDate(task.dueDate.slice(0, 10));
      } else {
        setDueDate("");
      }
    } else {
      setTitle("");
      setDescription("");
      setStatus("todo");
      setPriority("low");
      setAssignee("");
      setDueDate("");
    }
  }, [task, open]);

  if (!open) return null;

  const handleSave = () => {
    if (!task) return;
    const safeTitle = (title || "Untitled").trim();
    const updated: Task = {
      ...task,
      id: task.id, // keep the same id
      title: safeTitle,
      description: description.trim() || undefined,
      status,
      priority,
      assignee: assignee.trim() || undefined,
      // **Important:** store dueDate as a string (yyyy-mm-dd) so other parts of app can call string methods
      dueDate: dueDate ? dueDate : undefined,
    };

    try {
      console.log("[TaskModal] saving task:", updated);
      onSave(updated);
    } catch (err) {
      console.error("[TaskModal] error in onSave:", err);
      alert("An error occurred while saving. Check console for details.");
      return;
    }

    try {
      onClose();
    } catch (err) {
      console.error("[TaskModal] error closing modal:", err);
    }
  };

  const handleDelete = () => {
    if (!task || !onDelete) return;
    try {
      onDelete(task.id as number);
      onClose();
    } catch (err) {
      console.error("[TaskModal] error deleting task:", err);
      alert("Delete failed — check console.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="task-modal-title"
    >
      {/* backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* modal */}
      <div className="relative z-10 w-[min(900px,96%)] bg-white rounded shadow-lg p-6">
        <h2 id="task-modal-title" className="text-xl font-semibold mb-4">
          Edit Task
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Task["status"])}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
                <option value="urgent">urgent</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Assignee</label>
              <input
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Due date</label>
              <input
                type="date"
                value={dueDate ?? ""}
                onChange={(e) => setDueDate(e.target.value || "")}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            {onDelete && task && (
              <button
                onClick={handleDelete}
                className="px-4 py-2 border border-red-500 text-red-500 rounded mr-3"
              >
                Delete
              </button>
            )}
            <button onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
          </div>

          {/* SAVE button — highly visible (white bg + black text) to avoid being hidden */}
          <div>
            <button
              onClick={handleSave}
              style={{ background: "white", color: "black", border: "1px solid rgba(0,0,0,0.12)" }}
              className="px-4 py-2 rounded shadow-sm"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
