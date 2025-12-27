import { useEffect, useState } from "react";
import type { TodoItemType, TodoResponse, TodoUpdateRequest } from "../types";
import * as todosAPI from "../api/todos";

// Transfer backend response to frontend format
const transferTodoResponse = (apiTodo: TodoResponse): TodoItemType => {
  return {
    id: apiTodo.id,
    title: apiTodo.title,
    completed: apiTodo.completed,
    dueDate: apiTodo.due_date,
  };
};

const useTodos = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await todosAPI.getTodos();
      console.log("fetchTodos", response);
      const transferedTodos = response.map(transferTodoResponse);
      setTodos(transferedTodos);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title: string) => {
    setLoading(true);
    setError(null);
    try {
      const newTodoRequest = {
        title,
        completed: false,
        dueDate: null,
      };
      const response = await todosAPI.createTodo(newTodoRequest);
      const transferedTodo = transferTodoResponse(response);
      setTodos((prevTodos) => [...prevTodos, transferedTodo]);
      return transferedTodo;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || "Failed to add todo";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (
    id: number,
    updatedTodoRequest: TodoUpdateRequest
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await todosAPI.updateTodo(id, updatedTodoRequest);
      const transferedTodo = transferTodoResponse(response);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? transferedTodo : todo))
      );
      return transferedTodo;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail || "Failed to update todo";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeTodo = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await todosAPI.deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail || "Failed to delete todo";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch all todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    // States
    todos,
    loading,
    error,

    // Actions
    fetchTodos,
    addTodo,
    updateTodo,
    removeTodo,
  };
};

export default useTodos;
