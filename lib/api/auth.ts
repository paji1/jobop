import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "./client"
import type { LoginRequest, RegisterRequest, AuthResponse, User, ApiResponse } from "./types"

// Query Keys
export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
  profile: (id: string) => [...authKeys.all, "profile", id] as const,
}

// Auth API Functions
export const authApi = {
  // Login user
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/auth/login", credentials)
  },

  // Register user
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/auth/register", userData)
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    return apiClient.get<User>("/auth/me")
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/auth/refresh", { refreshToken })
  },

  // Logout
  logout: async (): Promise<ApiResponse> => {
    return apiClient.post<ApiResponse>("/auth/logout")
  },

  // Update profile
  updateProfile: async (profileData: Partial<User>): Promise<User> => {
    return apiClient.patch<User>("/auth/profile", profileData)
  },

  // Change password
  changePassword: async (data: { currentPassword: string; newPassword: string }): Promise<ApiResponse> => {
    return apiClient.post<ApiResponse>("/auth/change-password", data)
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<ApiResponse> => {
    return apiClient.post<ApiResponse>("/auth/forgot-password", { email })
  },

  // Reset password
  resetPassword: async (data: { token: string; password: string }): Promise<ApiResponse> => {
    return apiClient.post<ApiResponse>("/auth/reset-password", data)
  },

  // Verify email
  verifyEmail: async (token: string): Promise<ApiResponse> => {
    return apiClient.post<ApiResponse>("/auth/verify-email", { token })
  },
}

// Auth Hooks
export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // Store tokens
      localStorage.setItem("auth_token", data.token)
      localStorage.setItem("refresh_token", data.refreshToken)

      // Cache user data
      queryClient.setQueryData(authKeys.user(), data.user)
    },
  })
}

export const useRegister = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      localStorage.setItem("auth_token", data.token)
      localStorage.setItem("refresh_token", data.refreshToken)
      queryClient.setQueryData(authKeys.user(), data.user)
    },
  })
}

export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: authApi.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  })
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.user(), data)
      queryClient.invalidateQueries({ queryKey: authKeys.profile(data.id) })
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("refresh_token")
      queryClient.clear()
    },
  })
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: authApi.changePassword,
  })
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authApi.forgotPassword,
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: authApi.resetPassword,
  })
}
