/**
 * API Endpoints Configuration
 * Centralized location for all API endpoints
 */

// Base endpoints for different resources
export const API_ENDPOINTS = {
  TODOS: "/todos",
} as const;

/**
 * Helper function to build endpoint URLs with dynamic segments
 */
export const buildEndpoint = {
  todo: (id: number) => `${API_ENDPOINTS.TODOS}/${id}`,
};
