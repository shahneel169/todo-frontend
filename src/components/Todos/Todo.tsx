import { useState } from "react";
import { toast } from "react-toastify";
import useTodos from "../../hooks/useTodos";
import TodoItem from "./TodoItem";
import { sortedTodos } from "../../helper";
import type { TodoUpdateRequest } from "../../types/todo";
import "./Todo.css";

const Todo = () => {
  const { todos, addTodo, updateTodo, removeTodo } = useTodos();
  const [title, setTitle] = useState<string>("");

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title) {
      try {
        await addTodo(title);
        setTitle("");
        toast.success("Todo added successfully");
      } catch (error) {
        toast.error("Failed to add todo");
      }
    }
  };

  const handleUpdateTodo = async (id: number, todo: TodoUpdateRequest) => {
    try {
      await updateTodo(id, todo);
    } catch (error) {
      toast.error("Failed to update todo");
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await removeTodo(id);
      toast.success("Todo deleted successfully");
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };

  return (
    <div>
      <h1>Todo</h1>

      <div>
        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </div>

      <ul>
        {sortedTodos(todos)?.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleUpdateTodo={handleUpdateTodo}
            handleDeleteTodo={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default Todo;
