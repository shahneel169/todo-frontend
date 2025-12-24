import { createBrowserRouter } from "react-router";
import TodoPage from "../pages/Todo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoPage />,
  },
]);
