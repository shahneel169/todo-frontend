import type { TodoItemType } from "../types";

export const sortedTodos = (todos: TodoItemType[]) => {
  return [...todos].sort((a, b) => Number(a.completed) - Number(b.completed));
};
