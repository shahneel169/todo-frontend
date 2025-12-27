import { Trash } from "lucide-react";
import type { TodoItemType, TodoUpdateRequest } from "../../types";
import "./TodoItem.css";

const TodoItem = ({
  todo,
  handleUpdateTodo,
  handleDeleteTodo,
}: {
  todo: TodoItemType;
  handleUpdateTodo: (id: number, todo: TodoUpdateRequest) => void;
  handleDeleteTodo: (id: number) => void;
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdateTodo(todo.id, { completed: e.target.checked });
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdateTodo(todo.id, { due_date: e.target.value });
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleCheckboxChange}
        id={todo.id.toString()}
      />
      <label className="todo-item-label" htmlFor={todo.id.toString()}>
        {todo.title}
      </label>
      <input
        type="date"
        value={todo.dueDate || ""}
        onChange={handleDueDateChange}
      />

      <button
        type="button"
        className="delete-btn"
        onClick={() => handleDeleteTodo(todo.id)}
      >
        <Trash size={14} color="red" />
      </button>
    </li>
  );
};

export default TodoItem;
