import { render, screen } from "@/helper/test-utils";
import Todo from "../Todo";
import userEvent from "@testing-library/user-event";

// Mock the useTodos hook - uses src/hooks/__mocks__/useTodos.tsx
vi.mock("@/hooks/useTodos");

// Mock react-toastify - uses src/__mocks__/react-toastify.ts
vi.mock("react-toastify");

describe("Todo component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the Todo component with title", () => {
    render(<Todo />);

    // Check if the main heading is rendered
    expect(screen.getByRole("heading", { name: /todo/i })).toBeInTheDocument();
  });

  it("should render input field and add button", () => {
    render(<Todo />);

    // check if input field exists
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    // check if add button exists
    const addButton = screen.getByRole("button", { name: /add/i });
    expect(addButton).toBeInTheDocument();
  });

  it("should display todos from useTodo hook", async () => {
    // Import the actual hook and the mock data
    const useTodos = (await import("@/hooks/useTodos")).default;
    const { mockUseTodos } = await import("@/hooks/__mocks__/useTodos");

    // Mock the return value of useTodos hook
    vi.mocked(useTodos).mockReturnValue(mockUseTodos);

    render(<Todo />);

    // Check if the todos are displayed
    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });

  it("should add a new Todo when form is submitted", async () => {
    const user = userEvent.setup();

    // Import mocks
    const useTodos = (await import("@/hooks/useTodos")).default;
    const { mockUseTodos } = await import("@/hooks/__mocks__/useTodos");

    // Mock the return value of useTodos hook
    vi.mocked(useTodos).mockReturnValue(mockUseTodos);
    const { toast } = await import("react-toastify");

    render(<Todo />);

    // Find input and button
    const input = screen.getByRole("textbox");
    const addButton = screen.getByRole("button", { name: /add/i });

    // Type in the input
    await user.type(input, "New todo item");

    // click add button
    await user.click(addButton);

    // Verify addTodo as called with correct argument
    expect(mockUseTodos.addTodo).toHaveBeenCalledWith("New todo item");
    expect(mockUseTodos.addTodo).toHaveBeenCalledTimes(1);

    // Verify toast.success is called
    expect(toast.success).toHaveBeenCalledWith("Todo added successfully");

    // Verify input is cleared
    expect(input).toHaveValue("");
  });

  it("should not add todo when input is empty", async () => {
    const user = userEvent.setup();

    // Import mocks
    const useTodos = (await import("@/hooks/useTodos")).default;
    const { mockUseTodos } = await import("@/hooks/__mocks__/useTodos");

    // Mock the return value of useTodos hook
    vi.mocked(useTodos).mockReturnValue(mockUseTodos);

    render(<Todo />);

    const addButton = screen.getByRole("button", { name: /add/i });

    // click add button
    await user.click(addButton);

    // Verify addTodo as called with correct argument
    expect(mockUseTodos.addTodo).not.toHaveBeenCalled();
  });

  it("should show error when failing to add todo", async () => {
    const user = userEvent.setup();

    const useTodos = (await import("@/hooks/useTodos")).default;
    const { mockUseTodos } = await import("@/hooks/__mocks__/useTodos");

    vi.mocked(useTodos).mockReturnValue(mockUseTodos);
    const { toast } = await import("react-toastify");

    mockUseTodos.addTodo.mockRejectedValueOnce(
      new Error("Something went wrong")
    );

    render(<Todo />);

    const input = screen.getByRole("textbox");
    const addButton = screen.getByRole("button", { name: /add/i });

    // Type in the input
    await user.type(input, "New todo");

    // click add button
    await user.click(addButton);

    // wait for error toast
    expect(toast.error).toHaveBeenCalledWith("Failed to add todo");
    expect(mockUseTodos.addTodo).toHaveBeenCalledTimes(1);
  });
});
