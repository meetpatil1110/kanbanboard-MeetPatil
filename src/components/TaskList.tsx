type Task = {
  id: number;
  title: string;
};

export default function TaskList() {
  const tasks: Task[] = [
    { id: 1, title: "Complete assignment" },
    { id: 2, title: "Learn React basics" },
    { id: 3, title: "Setup Storybook" },
  ];

  return (
    <div className="p-4 bg-purple-600 text-white rounded-lg space-y-2">
      <h2 className="text-xl font-semibold">Tasks</h2>

      {tasks.map((task) => (
        <div
          key={task.id}
          className="p-2 bg-purple-300 text-black rounded shadow"
        >
          {task.title}
        </div>
      ))}
    </div>
  );
}
