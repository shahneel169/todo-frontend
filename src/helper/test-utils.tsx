import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";

/**
 * Custom render function - extend this as needed
 */
export function customRender(ui: ReactElement, options?: RenderOptions) {
  return render(ui, options);
}

// Re-export everything from React Testing Library
export * from "@testing-library/react";

// Override render with custom version
export { customRender as render };
