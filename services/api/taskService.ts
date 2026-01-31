import { Task } from '@/types/task';
import api from './authService';

// Note: API_BASE_URL is no longer used since we're using the axios instance from authService
// which has the correct baseURL configured

// Get all tasks with optional filters
export const getTasks = async (
  status?: 'all' | 'completed' | 'pending',
  priority?: 'all' | 'low' | 'medium' | 'high',
  sort?: 'created_at' | 'due_date' | 'priority' | 'title',
  order?: 'asc' | 'desc',
  limit: number = 50,
  offset: number = 0
): Promise<Task[]> => {
  const params = new URLSearchParams();
  if (status && status !== 'all') params.append('status', status);
  if (priority && priority !== 'all') params.append('priority', priority);
  if (sort) params.append('sort', sort);
  if (order) params.append('order', order);
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  const response = await api.get(`/api/v1/tasks?${params.toString()}`);

  return response.data.tasks as Task[];
};

// Get a single task by ID
export const getTaskById = async (id: string): Promise<Task> => {
  const response = await api.get(`/api/v1/tasks/${id}`);
  return response.data;
};

// Create a new task
export const createTask = async (
  taskData: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'user_id'>
): Promise<Task> => {
  const response = await api.post('/api/v1/tasks', taskData);
  return response.data;
};

// Update an existing task
export const updateTask = async (
  id: string,
  taskData: Partial<Omit<Task, 'id' | 'created_at' | 'updated_at' | 'user_id'>>
): Promise<Task> => {
  const response = await api.put(`/api/v1/tasks/${id}`, taskData);
  return response.data;
};

// Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/api/v1/tasks/${id}`);
};

// Toggle task completion status
export const toggleTaskStatus = async (id: string): Promise<{ id: string; is_completed: boolean }> => {
  const response = await api.patch(`/api/v1/tasks/${id}/toggle-status`);
  return response.data;
};