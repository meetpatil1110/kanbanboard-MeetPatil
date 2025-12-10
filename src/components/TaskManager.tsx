import { useState } from "react";

type Task = {
  id: number;
  title: string;
};

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Demo task 1" },
    { id: 2, title: "Demo task 2" },
  ]);

  const [newTask, setNewTask] = useState("");

  function addTask() {
    if (newTask.trim() === "") return;

    setTasks([...tasks, { id: Date.now(), title: newTask }]);
    setNewTask("");
  }

  return (
    <div className="p-4 bg-orange-600 text-white rounded-lg space-y-3">
      <h2 className="text-xl font-semibold">Task Manager</h2>

      {/* Input Box */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="px-2 py-1 rounded text-black w-full"
          placeholder="Enter task..."
        />

        <button
          onClick={addTask}
          className="px-3 py-1 bg-white text-orange-600 rounded"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="p-2 bg-orange-300 text-black rounded">
            {task.title}
          </div>
        ))}
      </div>
    </div>
  );
}
