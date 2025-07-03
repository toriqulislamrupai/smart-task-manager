"use client";

import { useState, useEffect } from "react";
import { Task } from "../lib/types";

interface Props {
  task: Task;
  onDelete: () => void;
  onUpdate: (updatedTask: Task) => void;
}

export default function TaskItem({ task, onDelete, onUpdate }: Props) {
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  useEffect(() => {
    if (!task.dueDate) {
      const futureDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
      setDueDate(futureDate);
    }
  }, [task.dueDate]);

  const handleSuggest = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: task.title }),
      });
      const data = await res.json();

      if (data.suggestions && Array.isArray(data.suggestions)) {
        setSubtasks(data.suggestions);
        setStatus("completed");
        onUpdate({ ...task, status: "completed", dueDate: data.dueDate || dueDate });
        setDueDate(data.dueDate || dueDate);
      } else {
        setSubtasks([]);
        setStatus("pending");
        onUpdate({ ...task, status: "pending" });
      }
    } catch {
      setSubtasks([]);
      setStatus("pending");
      onUpdate({ ...task, status: "pending" });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return;

    onUpdate({
      ...task,
      title: editTitle,
      description: editDescription,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg p-6 transition-transform hover:-translate-y-1 hover:shadow-xl duration-200 mb-4">
      <div className="flex justify-between items-start mb-2 gap-4">
        {isEditing ? (
          <div className="flex-grow space-y-2">
            <input
              type="text"
              className="w-full border rounded px-2 py-1 text-black"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Task Title"
            />
            <textarea
              className="w-full border rounded px-2 py-1 text-black"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
        ) : (
          <div className="flex-grow">
            <h3 className="text-xl font-semibold text-white">{task.title}</h3>
            <p className="text-gray-200 mt-1">{task.description}</p>
          </div>
        )}

        <div className="flex flex-col items-end space-y-2">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              status === "completed" ? "bg-green-600 text-white" : "bg-yellow-500 text-black"
            }`}
          >
            {status}
          </span>
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                title="Edit Task"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                title="Delete Task"
              >
                Delete
              </button>
            </>
          )}

          {isEditing && (
            <div className="flex gap-2">
              <button
                onClick={handleSaveEdit}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-400 mb-4">🗓 Due: {dueDate}</p>

      <button
        onClick={handleSuggest}
        disabled={loading}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition duration-150 flex items-center gap-2 justify-center"
      >
        {loading && (
          <span className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 border-t-white h-5 w-5 animate-spin"></span>
        )}
        {loading ? "Thinking..." : "💡 Suggest Subtasks"}
      </button>

      {subtasks.length > 0 ? (
        <ul className="mt-4 space-y-2 text-gray-100 text-sm transition-all">
          {subtasks.map((s, idx) => (
            <li
              key={idx}
              className="bg-white/10 p-2 rounded-lg border border-white/20 flex items-center gap-2"
            >
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
