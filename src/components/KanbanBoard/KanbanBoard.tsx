// src/components/KanbanBoard/KanbanBoard.tsx
import React, { useCallback, useRef, useState } from "react";
import KanbanColumn from "../KanbanColumn";
import TaskModal from "../TaskModal";
import type { Task } from "./KanbanBoard.types";

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Design wireframes", status: "todo" },
    { id: 2, title: "Set up project", status: "todo" },
    { id: 3, title: "Implement drag & drop", status: "inprogress" },
    { id: 4, title: "Write README", status: "done" },
  ]);

  const [newTitle, setNewTitle] = useState("");

  // modal state
  const [modalTask, setModalTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function openTaskModal(task: Task) {
    setModalTask(task);
    setModalOpen(true);
  }
  function closeTaskModal() {
    setModalOpen(false);
    setModalTask(null);
  }
  function saveTask(updated: Task) {
    setTasks((prev) =>
      prev.map((t) => (t.id === updated.id ? { ...t, ...updated } : t))
    );
    closeTaskModal();
  }
  function deleteFromModal(id: number) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    closeTaskModal();
  }

  // refs to focus on moved tasks
  const taskRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const registerTaskRef = useCallback((taskId: number, el: HTMLDivElement | null) => {
    taskRefs.current[String(taskId)] = el;
  }, []);

  // helpers to group columns
  function getColumnsArrays() {
    const todo = tasks.filter((t) => t.status === "todo");
    const inprogress = tasks.filter((t) => t.status === "inprogress");
    const done = tasks.filter((t) => t.status === "done");
    return { todo, inprogress, done };
  }

  function setTasksFromColumns(cols: { todo: Task[]; inprogress: Task[]; done: Task[] }) {
    setTasks([...cols.todo, ...cols.inprogress, ...cols.done]);
  }

  // move logic
  function moveTaskTo(id: number, toStatus: Task["status"], toIndex?: number) {
    const cols = getColumnsArrays();
    const allCols = [cols.todo.slice(), cols.inprogress.slice(), cols.done.slice()];
    let taskItem: Task | undefined;

    for (let i = 0; i < allCols.length; i++) {
      const idx = allCols[i].findIndex((t) => t.id === id);
      if (idx !== -1) {
        taskItem = allCols[i][idx];
        allCols[i].splice(idx, 1);
        break;
      }
    }
    if (!taskItem) return;

    taskItem.status = toStatus;
    const statusToIndex = (s: Task["status"]) =>
      s === "todo" ? 0 : s === "inprogress" ? 1 : 2;

    const destColIdx = statusToIndex(toStatus);
    const destArr = allCols[destColIdx];
    const insertIndex =
      typeof toIndex === "number"
        ? Math.min(Math.max(0, toIndex), destArr.length)
        : destArr.length;

    destArr.splice(insertIndex, 0, taskItem);

    const newCols = {
      todo: allCols[0],
      inprogress: allCols[1],
      done: allCols[2],
    };

    setTasksFromColumns(newCols);

    requestAnimationFrame(() => {
      const el = taskRefs.current[String(id)];
      if (el) el.focus();
    });
  }

  // keyboard move handler
  const onKeyboardMove = useCallback(
    (taskId: number, e: React.KeyboardEvent) => {
      const key = e.key;
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) return;
      e.preventDefault();

      const cols = getColumnsArrays();
      const columnsArr = [cols.todo, cols.inprogress, cols.done];
      let curColIndex = -1;
      let curTaskIndex = -1;

      for (let i = 0; i < columnsArr.length; i++) {
        const idx = columnsArr[i].findIndex((t) => t.id === taskId);
        if (idx !== -1) {
          curColIndex = i;
          curTaskIndex = idx;
          break;
        }
      }
      if (curColIndex === -1) return;

      let targetColIndex = curColIndex;
      let targetTaskIndex = curTaskIndex;
      const shift = e.shiftKey;

      if (key === "ArrowUp") {
        if (curTaskIndex > 0) targetTaskIndex = curTaskIndex - 1;
        else return;
      } else if (key === "ArrowDown") {
        const colLen = columnsArr[curColIndex].length;
        if (curTaskIndex < colLen - 1) targetTaskIndex = curTaskIndex + 1;
        else return;
      } else if (key === "ArrowLeft") {
        if (curColIndex > 0) {
          targetColIndex = curColIndex - 1;
          targetTaskIndex = shift
            ? 0
            : Math.min(curTaskIndex, columnsArr[targetColIndex].length);
        } else return;
      } else if (key === "ArrowRight") {
        if (curColIndex < columnsArr.length - 1) {
          targetColIndex = curColIndex + 1;
          targetTaskIndex = shift
            ? columnsArr[targetColIndex].length
            : Math.min(curTaskIndex, columnsArr[targetColIndex].length);
        } else return;
      }

      if (targetColIndex === curColIndex && targetTaskIndex === curTaskIndex) return;

      const indexToStatus = (i: number): Task["status"] =>
        i === 0 ? "todo" : i === 1 ? "inprogress" : "done";

      moveTaskTo(taskId, indexToStatus(targetColIndex), targetTaskIndex);
    },
    [tasks]
  );

  // add/delete
  function addTask(status: Task["status"] = "todo") {
    const title = newTitle.trim();
    if (!title) return;
    const id = Date.now();
    setTasks((prev) => [...prev, { id, title, status }]);
    setNewTitle("");
  }

  function addEmptyInColumn(status: Task["status"]) {
    const id = Date.now();
    setTasks((prev) => [...prev, { id, title: "New task", status }]);
  }

  function deleteTask(id: number) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const { todo, inprogress, done } = getColumnsArrays();

  return (
    <div className="container py-8">
      <header className="mb-6 border-b border-neutral-200 pb-4">
        <h1 className="text-2xl font-semibold">KanbanBoard</h1>
      </header>

      {/* Input + Add Button */}
      <div className="mb-6 flex gap-3 items-center">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask("todo");
          }}
          placeholder="Add a new task and press Enter or click Add"
          className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-primary-500"
        />

        {/* ✅ CHANGED ONLY THIS: text-black */}
        <button
          onClick={() => addTask("todo")}
          className="px-4 py-2 bg-primary-600 text-black rounded-lg shadow 
                     hover:bg-primary-700 transition"
        >
          Add
        </button>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KanbanColumn
          title="To Do"
          tasks={todo}
          statusKey="todo"
          onDropTask={moveTaskTo}
          onDeleteTask={deleteTask}
          onKeyboardMove={onKeyboardMove}
          registerTaskRef={registerTaskRef}
          onAddInColumn={addEmptyInColumn}
          onOpenTask={openTaskModal}
          wipLimit={5}
        />
        <KanbanColumn
          title="In Progress"
          tasks={inprogress}
          statusKey="inprogress"
          onDropTask={moveTaskTo}
          onDeleteTask={deleteTask}
          onKeyboardMove={onKeyboardMove}
          registerTaskRef={registerTaskRef}
          onAddInColumn={addEmptyInColumn}
          onOpenTask={openTaskModal}
          wipLimit={3}
        />
        <KanbanColumn
          title="Done"
          tasks={done}
          statusKey="done"
          onDropTask={moveTaskTo}
          onDeleteTask={deleteTask}
          onKeyboardMove={onKeyboardMove}
          registerTaskRef={registerTaskRef}
          onAddInColumn={addEmptyInColumn}
          onOpenTask={openTaskModal}
        />
      </div>

      <TaskModal
        task={modalTask}
        open={modalOpen}
        onClose={closeTaskModal}
        onSave={saveTask}
        onDelete={deleteFromModal}
      />
    </div>
  );
}
