// src/api/taskService.ts
import apiClient from './apiClient';
import { Task } from '../interfaces/Task';

// Get all tasks
export const getTasks = async () => {
  return await apiClient.get('/tasks');
};

// Create a new task
export const createTask = async (title: string, description: string) => {
  return await apiClient.post('/tasks', { title, description });
};

// Update a task
export const updateTask = async (id: number, updates: Partial<Task>) => {
  return await apiClient.put(`/tasks/${id}`, updates);
};

// Delete a task by ID
export const deleteTask = async (id: number) => {
  return await apiClient.delete(`/tasks/${id}`);
};
