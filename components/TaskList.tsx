'use client';
import { useState } from 'react';
import { Task } from '../lib/types';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([task, ...tasks]);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <TaskForm onAdd={addTask} />
      {tasks.map(task => <TaskItem key={task.id} task={task} />)}
    </div>
  );
}
