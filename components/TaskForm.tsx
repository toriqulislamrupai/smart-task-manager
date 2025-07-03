"use client";

import { useState } from "react";
import { Task } from "../lib/types";
import { v4 as uuidv4 } from "uuid";

export default function TaskForm({ onAdd }: { onAdd: (task: Task) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      status: "pending",
      dueDate: undefined,
    };

    onAdd(newTask);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <input
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
      />
      <textarea
        className="w-full border p-2 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button
        type="submit"
        className="bg-emerald-400 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-emerald-500 hover:scale-105 animate-pulse"
      >
        Add Task
      </button>
    </form>
  );
}
