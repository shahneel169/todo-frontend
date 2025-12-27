export interface TodoItemType {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string | null;
}

export interface TodoResponse {
  id: number;
  title: string;
  completed: boolean;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface TodoCreateRequest {
  title: string;
  completed?: boolean;
  due_date?: string | null;
}

export interface TodoUpdateRequest {
  title?: string;
  completed?: boolean;
  due_date?: string | null;
}
