import type { TodoItemType } from "@/types";
import { vi } from "vitest";

export const mockTodos: TodoItemType[] = [
  {
    id: 1,
    title: "Test Todo 1",
    completed: false,
    dueDate: null,
  },
  {
    id: 2,
    title: "Test Todo 2",
    completed: true,
    dueDate: "2025-12-28",
  },
];

export const mockUseTodos = {
  todos: mockTodos,
  loading: false,
  error: null,
  fetchTodos: vi.fn(),
  addTodo: vi.fn(),
  updateTodo: vi.fn(),
  removeTodo: vi.fn(),
};

const useTodos = vi.fn(() => mockUseTodos);

export default useTodos;
