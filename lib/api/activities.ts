import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query"
import { apiClient } from "./client"
import type { Activity, PaginatedResponse, ApiResponse } from "./types"

// Query Keys
export const activityKeys = {
  all: ["activities"] as const,
  lists: () => [...activityKeys.all, "list"] as const,
  list: (filters: any) => [...activityKeys.lists(), filters] as const,
  user: (userId: string) => [...activityKeys.all, "user", userId] as const,
}

// Activity API Functions
export const activityApi = {
  // Get activities
  getActivities: async (filters: any = {}): Promise<PaginatedResponse<Activity>> => {
    return apiClient.get<PaginatedResponse<Activity>>("/activities", filters)
  },

  // Get user activities
  getUserActivities: async (userId: string, filters: any = {}): Promise<PaginatedResponse<Activity>> => {
    return apiClient.get<PaginatedResponse<Activity>>(`/activities/user/${userId}`, filters)
  },

  // Create activity
  createActivity: async (activityData: Omit<Activity, "id" | "timestamp">): Promise<Activity> => {
    return apiClient.post<Activity>("/activities", activityData)
  },

  // Mark activity as read
  markActivityAsRead: async (activityId: string): Promise<ApiResponse> => {
    return apiClient.patch<ApiResponse>(`/activities/${activityId}/read`)
  },

  // Mark all activities as read
  markAllActivitiesAsRead: async (): Promise<ApiResponse> => {
    return apiClient.patch<ApiResponse>("/activities/mark-all-read")
  },

  // Delete activity
  deleteActivity: async (activityId: string): Promise<ApiResponse> => {
    return apiClient.delete<ApiResponse>(`/activities/${activityId}`)
  },

  // Get activity stats
  getActivityStats: async (userId: string): Promise<any> => {
    return apiClient.get(`/activities/stats/${userId}`)
  },
}

// Activity Hooks
export const useActivities = (filters: any = {}) => {
  return useQuery({
    queryKey: activityKeys.list(filters),
    queryFn: () => activityApi.getActivities(filters),
    staleTime: 30 * 1000, // 30 seconds
  })
}

export const useInfiniteActivities = (filters: any = {}) => {
  return useInfiniteQuery({
    queryKey: activityKeys.list(filters),
    queryFn: ({ pageParam = 1 }) => activityApi.getActivities({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination
      return page < totalPages ? page + 1 : undefined
    },
    initialPageParam: 1,
  })
}

export const useUserActivities = (userId: string, filters: any = {}) => {
  return useQuery({
    queryKey: activityKeys.user(userId),
    queryFn: () => activityApi.getUserActivities(userId, filters),
    enabled: !!userId,
  })
}

export const useCreateActivity = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: activityApi.createActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activityKeys.lists() })
    },
  })
}

export const useMarkActivityAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: activityApi.markActivityAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activityKeys.all })
    },
  })
}

export const useMarkAllActivitiesAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: activityApi.markAllActivitiesAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activityKeys.all })
    },
  })
}

export const useDeleteActivity = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: activityApi.deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activityKeys.all })
    },
  })
}
