
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";


export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="p-4 border-b bg-white/80">
        <div className="max-w-6xl mx-auto text-lg font-semibold">Kanban — Demo</div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <KanbanBoard />
      </main>
    </div>
  );
}