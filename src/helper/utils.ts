import type { TodoItemType } from "../types";

export const isDuplicateTitle = (todos: TodoItemType[], title: string) => {
  return todos.some(
    (todo) => todo.title.toLocaleLowerCase() === title.toLocaleLowerCase()
  );
};

export const sortedTodos = (todos: TodoItemType[]) => {
  return [...todos].sort((a, b) => Number(a.completed) - Number(b.completed));
};
