import React, { useEffect, useState } from 'react';
import './TaskList.css';
import toast from "react-hot-toast";
import { Task } from '../../interfaces/Task';
import { getTasks, createTask, updateTask, deleteTask } from '../../api/taskService';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState('');

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      console.log('Fetching tasks...');
      const fetchedTasks = await getTasks();
      console.log('Fetched tasks:', fetchedTasks);
      setTasks(fetchedTasks.data);
    } catch (error: any) {
      console.error('Error fetching tasks:', error);
      setError('Failed to load tasks.');
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async () => {
    if (newTitle.trim() === '') {
      toast.error("Add a title for task");
      return;
    }
    try {
      await createTask(newTitle, newDescription);
      setNewTitle('');
      setNewDescription('');
      console.log('Task added successfully.');
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Start editing a task
  const handleEdit = (task: Task) => {
    console.log('Editing task:', task);
    setEditingTask({ ...task });
  };

  // Handle input changes while editing
  const handleEditChange = (field: keyof Task, value: string | boolean) => {
    if (editingTask) {
      //console.log(`Updating field "${field}" to:`, value);
      setEditingTask({ ...editingTask, [field]: value });
    }
  };

  // Update an existing task
  const updateExistingTask = async (task: Task) => {
    try {
      //console.log('Updating task:', task);
      await updateTask(task.id, {
        title: task.title,
        description: task.description,
        isComplete: task.isComplete,
      });
      console.log('Task updated:', task);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? task : t))
      );
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Toggle task completion
  const toggleComplete = async (task: Task) => {
    try {
      const updatedTask = { ...task, isComplete: !task.isComplete };
      await updateTask(task.id, updatedTask);
      console.log('Task updated:', updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
      );
      if (!task.isComplete) {
        toast.success('Task completed!');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete a task
  const removeTask = async (id: number) => {
    try {
      await deleteTask(id);
      console.log('Task deleted with ID:', id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Remove token from storage
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div>
      <h2>Task List</h2>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <input
          type="text"
          placeholder="Task Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isComplete}
                onChange={() => toggleComplete(task)}
                style={{ float: 'right', marginTop: '10px', transform: 'scale(1.2)', cursor: 'pointer' }}
              />

              {editingTask?.id === task.id ? (
                <div>
                  <input
                    type="text"
                    value={editingTask.title}
                    onChange={(e) =>
                      handleEditChange('title', e.target.value)
                    }
                  />
                  <input
                    type="text"
                    value={editingTask.description}
                    onChange={(e) =>
                      handleEditChange('description', e.target.value)
                    }
                  />
                  <button onClick={() => updateExistingTask(editingTask)}>Save</button>
                  <button onClick={() => setEditingTask(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Status: {task.isComplete ? 'Complete' : 'Incomplete'}</p>
                  <button onClick={() => handleEdit(task)}>Edit</button>
                  <button onClick={() => removeTask(task.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
