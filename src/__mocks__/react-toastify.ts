import { vi } from "vitest";

export const toast = {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
}

export const ToastContainer = () => null;