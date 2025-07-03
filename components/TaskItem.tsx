'use client';
import { useState, useEffect } from 'react';
import { Task } from '@/lib/types';

interface Props {
  task: Task;
}

export default function TaskItem({ task }: Props) {
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(task.dueDate);

  useEffect(() => {
    if (!task.dueDate) {
      const futureDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      setDueDate(futureDate);
    }
  }, [task.dueDate]);

  const handleSuggest = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        body: JSON.stringify({ title: task.title }),
      });
      const data = await res.json();

      if (data.suggestions && Array.isArray(data.suggestions)) {
        setSubtasks(data.suggestions);
        setStatus('completed');
      } else {
        setSubtasks([]);
        setStatus('pending');
      }
    } catch {
      setSubtasks([]);
      setStatus('pending');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg p-6 transition-transform hover:-translate-y-1 hover:shadow-xl duration-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-white">{task.title}</h3>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            status === 'completed' ? 'bg-green-600 text-white' : 'bg-yellow-500 text-black'
          }`}
        >
          {status}
        </span>
      </div>

      <p className="text-gray-200 mb-2">{task.description}</p>
      <p className="text-sm text-gray-400 mb-4">🗓 Due: {dueDate}</p>

      <button
        onClick={handleSuggest}
        disabled={loading}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition duration-150 flex items-center gap-2 justify-center"
      >
        {loading && (
          <span className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 border-t-white h-5 w-5 animate-spin"></span>
        )}
        {loading ? 'Thinking...' : '💡 Suggest Subtasks'}
      </button>

      {subtasks.length > 0 ? (
        <ul className="mt-4 space-y-2 text-gray-100 text-sm transition-all">
          {subtasks.map((s, idx) => (
            <li key={idx} className="bg-white/10 p-2 rounded-lg border border-white/20 flex items-center gap-2">
              <span>✅</span> {s}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-gray-400 text-sm italic">No suggestions yet.</p>
      )}
    </div>
  );
}
