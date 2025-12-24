import { useState } from "react";
import type { TodoItemType } from "../../types/todo";
import { toast } from "react-toastify";
import TodoItem from "./TodoItem";
import "./Todo.css";
import { isDuplicateTitle, sortedTodos } from "../../helper";

const Todo = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [title, setTitle] = useState<string>("");

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && !isDuplicateTitle(todos, title)) {
      const newTodo: TodoItemType = {
        id: Date.now(),
        title,
        completed: false,
        dueDate: "",
      };
      setTodos([...todos, newTodo]);
      setTitle("");

      // toast.success("Todo added successfully");
    } else {
      toast.error("Todo already exists");
    }
  };

  const handleToggleTodo = (id: number, completed: boolean) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  };

  const handleDueDateChange = (id: number, dueDate: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, dueDate } : todo))
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    toast.success("Todo deleted successfully");
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
            onToggle={handleToggleTodo}
            onDueDateChange={handleDueDateChange}
            handleDeleteTodo={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default Todo;
