// Main API exports
export * from "./types"
export * from "./client"
export * from "./auth"
export * from "./staff"
export * from "./jobs"
export * from "./loans"
export * from "./activities"
export * from "./notifications"
export * from "./analytics"

// Re-export TanStack Query for convenience
export {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"

// Query Client Configuration
import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 1000, // 1 minute
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false
        }
        return failureCount < 3
      },
    },
    mutations: {
      retry: false,
    },
  },
})

// Error handling utility
export const handleApiError = (error: any) => {
  if (error?.status === 401) {
    // Handle unauthorized - redirect to login
    window.location.href = "/auth/login"
  } else if (error?.status === 403) {
    // Handle forbidden
    console.error("Access forbidden:", error.message)
  } else if (error?.status >= 500) {
    // Handle server errors
    console.error("Server error:", error.message)
  } else {
    // Handle other errors
    console.error("API error:", error.message)
  }
}
