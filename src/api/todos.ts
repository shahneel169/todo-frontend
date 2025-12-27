import apiClient from "./client";
import type {
  TodoResponse,
  TodoCreateRequest,
  TodoUpdateRequest,
} from "../types/todo";
import { API_ENDPOINTS, buildEndpoint } from "./endpoints";

/**
 * Get all todos
 */
export const getTodos = async (): Promise<TodoResponse[]> => {
  const response = await apiClient.get<TodoResponse[]>(API_ENDPOINTS.TODOS);
  return response.data;
};

/**
 * Get single todo by ID
 */
export const getTodoById = async (id: number): Promise<TodoResponse> => {
  const response = await apiClient.get<TodoResponse>(buildEndpoint.todo(id));
  return response.data;
};

/**
 * Create new todo
 */
export const  createTodo = async (
  todo: TodoCreateRequest
): Promise<TodoResponse> => {
  const response = await apiClient.post<TodoResponse>(
    API_ENDPOINTS.TODOS,
    todo
  );
  return response.data;
};

/**
 * Update existing todo
 */
export const updateTodo = async (
  id: number,
  todo: TodoUpdateRequest
): Promise<TodoResponse> => {
  const response = await apiClient.put<TodoResponse>(
    buildEndpoint.todo(id),
    todo
  );
  return response.data;
};

/**
 * Delete todo
 */
export const deleteTodo = async (id: number): Promise<void> => {
  await apiClient.delete(buildEndpoint.todo(id));
};
