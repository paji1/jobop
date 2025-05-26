import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query"
import { apiClient } from "./client"
import type { StaffProfile, StaffFilters, PaginatedResponse, ApiResponse } from "./types"

// Query Keys
export const staffKeys = {
  all: ["staff"] as const,
  lists: () => [...staffKeys.all, "list"] as const,
  list: (filters: StaffFilters) => [...staffKeys.lists(), filters] as const,
  details: () => [...staffKeys.all, "detail"] as const,
  detail: (id: string) => [...staffKeys.details(), id] as const,
  search: (query: string) => [...staffKeys.all, "search", query] as const,
  recommendations: (userId: string) => [...staffKeys.all, "recommendations", userId] as const,
}

// Staff API Functions
export const staffApi = {
  // Get staff list with filters
  getStaff: async (filters: StaffFilters = {}): Promise<PaginatedResponse<StaffProfile>> => {
    return apiClient.get<PaginatedResponse<StaffProfile>>("/staff", filters)
  },

  // Get staff by ID
  getStaffById: async (id: string): Promise<StaffProfile> => {
    return apiClient.get<StaffProfile>(`/staff/${id}`)
  },

  // Search staff
  searchStaff: async (query: string, filters: StaffFilters = {}): Promise<PaginatedResponse<StaffProfile>> => {
    return apiClient.get<PaginatedResponse<StaffProfile>>("/staff/search", { q: query, ...filters })
  },

  // Get recommended staff for company
  getRecommendedStaff: async (companyId: string): Promise<StaffProfile[]> => {
    return apiClient.get<StaffProfile[]>(`/staff/recommendations/${companyId}`)
  },

  // Get staff by skills
  getStaffBySkills: async (skills: string[]): Promise<StaffProfile[]> => {
    return apiClient.post<StaffProfile[]>("/staff/by-skills", { skills })
  },

  // Update staff availability
  updateAvailability: async (staffId: string, availability: string): Promise<ApiResponse> => {
    return apiClient.patch<ApiResponse>(`/staff/${staffId}/availability`, { availability })
  },

  // Get staff analytics
  getStaffAnalytics: async (staffId: string): Promise<any> => {
    return apiClient.get(`/staff/${staffId}/analytics`)
  },

  // Hire staff
  hireStaff: async (data: { staffId: string; jobId?: string; message?: string }): Promise<ApiResponse> => {
    return apiClient.post<ApiResponse>("/staff/hire", data)
  },

  // Contact staff
  contactStaff: async (data: { staffId: string; message: string; subject?: string }): Promise<ApiResponse> => {
    return apiClient.post<ApiResponse>("/staff/contact", data)
  },

  // Save staff to favorites
  saveStaff: async (staffId: string): Promise<ApiResponse> => {
    return apiClient.post<ApiResponse>(`/staff/${staffId}/save`)
  },

  // Remove staff from favorites
  unsaveStaff: async (staffId: string): Promise<ApiResponse> => {
    return apiClient.delete<ApiResponse>(`/staff/${staffId}/save`)
  },

  // Get saved staff
  getSavedStaff: async (): Promise<StaffProfile[]> => {
    return apiClient.get<StaffProfile[]>("/staff/saved")
  },
}

// Staff Hooks
export const useStaff = (filters: StaffFilters = {}) => {
  return useQuery({
    queryKey: staffKeys.list(filters),
    queryFn: () => staffApi.getStaff(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useInfiniteStaff = (filters: StaffFilters = {}) => {
  return useInfiniteQuery({
    queryKey: staffKeys.list(filters),
    queryFn: ({ pageParam = 1 }) => staffApi.getStaff({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination
      return page < totalPages ? page + 1 : undefined
    },
    initialPageParam: 1,
  })
}

export const useStaffById = (id: string) => {
  return useQuery({
    queryKey: staffKeys.detail(id),
    queryFn: () => staffApi.getStaffById(id),
    enabled: !!id,
  })
}

export const useSearchStaff = (query: string, filters: StaffFilters = {}) => {
  return useQuery({
    queryKey: staffKeys.search(query),
    queryFn: () => staffApi.searchStaff(query, filters),
    enabled: query.length > 2,
    staleTime: 30 * 1000, // 30 seconds
  })
}

export const useRecommendedStaff = (companyId: string) => {
  return useQuery({
    queryKey: staffKeys.recommendations(companyId),
    queryFn: () => staffApi.getRecommendedStaff(companyId),
    enabled: !!companyId,
  })
}

export const useHireStaff = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: staffApi.hireStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffKeys.all })
    },
  })
}

export const useContactStaff = () => {
  return useMutation({
    mutationFn: staffApi.contactStaff,
  })
}

export const useUpdateAvailability = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ staffId, availability }: { staffId: string; availability: string }) =>
      staffApi.updateAvailability(staffId, availability),
    onSuccess: (_, { staffId }) => {
      queryClient.invalidateQueries({ queryKey: staffKeys.detail(staffId) })
      queryClient.invalidateQueries({ queryKey: staffKeys.lists() })
    },
  })
}

export const useSaveStaff = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: staffApi.saveStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-staff"] })
    },
  })
}

export const useUnsaveStaff = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: staffApi.unsaveStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-staff"] })
    },
  })
}

export const useSavedStaff = () => {
  return useQuery({
    queryKey: ["saved-staff"],
    queryFn: staffApi.getSavedStaff,
  })
}
