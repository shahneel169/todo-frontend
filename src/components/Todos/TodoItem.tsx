import { Trash } from "lucide-react";
import type { TodoItemType } from "../../types";
import "./TodoItem.css";

const TodoItem = ({
  todo,
  onToggle,
  onDueDateChange,
  handleDeleteTodo,
}: {
  todo: TodoItemType;
  onToggle: (id: number, completed: boolean) => void;
  onDueDateChange: (id: number, dueDate: string) => void;
  handleDeleteTodo: (id: number) => void;
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(todo.id, e.target.checked);
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDueDateChange(todo.id, e.target.value);
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
      <input type="date" value={todo.dueDate} onChange={handleDueDateChange} />

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
