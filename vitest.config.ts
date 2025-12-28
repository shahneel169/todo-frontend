import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    // Enable global test APIs (describe, it, expect, vi)
    globals: true,

    // Use jsdom for browser-like environment
    environment: "jsdom",

    // Path to global test setup file
    setupFiles: "./src/__tests__/setup.ts",

    // Process CSS imports in tests
    css: true,

    // Suppress React act warnings (optional)
    onConsoleLog(log: string, type: "stdout" | "stderr"): boolean | void {
      if (
        log.includes("Warning: An update to") &&
        log.includes("was not wrapped in act")
      ) {
        return false;
      }
    },

    // Coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/__tests__/",
        "**/*.test.{ts,tsx}",
        "**/*.config.{ts,js}",
        "**/vite-env.d.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
