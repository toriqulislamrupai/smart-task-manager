import TaskList from '../components/TaskList';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">🧠 Smart Task Manager</h1>
      <TaskList />
    </main>
  );
}
