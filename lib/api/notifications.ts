import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "./client"
import type { Notification, PaginatedResponse, ApiResponse } from "./types"

// Query Keys
export const notificationKeys = {
  all: ["notifications"] as const,
  lists: () => [...notificationKeys.all, "list"] as const,
  unread: () => [...notificationKeys.all, "unread"] as const,
  count: () => [...notificationKeys.all, "count"] as const,
}

// Notification API Functions
export const notificationApi = {
  // Get notifications
  getNotifications: async (filters: any = {}): Promise<PaginatedResponse<Notification>> => {
    return apiClient.get<PaginatedResponse<Notification>>("/notifications", filters)
  },

  // Get unread notifications
  getUnreadNotifications: async (): Promise<Notification[]> => {
    return apiClient.get<Notification[]>("/notifications/unread")
  },

  // Get notification count
  getNotificationCount: async (): Promise<{ total: number; unread: number }> => {
    return apiClient.get("/notifications/count")
  },

  // Mark notification as read
  markAsRead: async (notificationId: string): Promise<ApiResponse> => {
    return apiClient.patch<ApiResponse>(`/notifications/${notificationId}/read`)
  },

  // Mark all notifications as read
  markAllAsRead: async (): Promise<ApiResponse> => {
    return apiClient.patch<ApiResponse>("/notifications/mark-all-read")
  },

  // Delete notification
  deleteNotification: async (notificationId: string): Promise<ApiResponse> => {
    return apiClient.delete<ApiResponse>(`/notifications/${notificationId}`)
  },

  // Update notification preferences
  updatePreferences: async (preferences: any): Promise<ApiResponse> => {
    return apiClient.put<ApiResponse>("/notifications/preferences", preferences)
  },

  // Get notification preferences
  getPreferences: async (): Promise<any> => {
    return apiClient.get("/notifications/preferences")
  },
}

// Notification Hooks
export const useNotifications = (filters: any = {}) => {
  return useQuery({
    queryKey: notificationKeys.lists(),
    queryFn: () => notificationApi.getNotifications(filters),
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  })
}

export const useUnreadNotifications = () => {
  return useQuery({
    queryKey: notificationKeys.unread(),
    queryFn: notificationApi.getUnreadNotifications,
    refetchInterval: 15 * 1000, // Refetch every 15 seconds
  })
}

export const useNotificationCount = () => {
  return useQuery({
    queryKey: notificationKeys.count(),
    queryFn: notificationApi.getNotificationCount,
    refetchInterval: 10 * 1000, // Refetch every 10 seconds
  })
}

export const useMarkAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: notificationApi.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all })
    },
  })
}

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: notificationApi.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all })
    },
  })
}

export const useDeleteNotification = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: notificationApi.deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all })
    },
  })
}
