import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query"
import { apiClient } from "./client"
import type { Job, JobApplication, PaginatedResponse, ApiResponse } from "./types"

// Query Keys
export const jobKeys = {
  all: ["jobs"] as const,
  lists: () => [...jobKeys.all, "list"] as const,
  list: (filters: any) => [...jobKeys.lists(), filters] as const,
  details: () => [...jobKeys.all, "detail"] as const,
  detail: (id: string) => [...jobKeys.details(), id] as const,
  applications: () => [...jobKeys.all, "applications"] as const,
  application: (id: string) => [...jobKeys.applications(), id] as const,
  myJobs: (userId: string) => [...jobKeys.all, "my-jobs", userId] as const,
  myApplications: (userId: string) => [...jobKeys.all, "my-applications", userId] as const,
}

// Job API Functions
export const jobApi = {
  // Get jobs list
  getJobs: async (filters: any = {}): Promise<PaginatedResponse<Job>> => {
    return apiClient.get<PaginatedResponse<Job>>("/jobs", filters)
  },

  // Get job by ID
  getJobById: async (id: string): Promise<Job> => {
    return apiClient.get<Job>(`/jobs/${id}`)
  },

  // Create job
  createJob: async (jobData: Partial<Job>): Promise<Job> => {
    return apiClient.post<Job>("/jobs", jobData)
  },

  // Update job
  updateJob: async (id: string, jobData: Partial<Job>): Promise<Job> => {
    return apiClient.put<Job>(`/jobs/${id}`, jobData)
  },

  // Delete job
  deleteJob: async (id: string): Promise<ApiResponse> => {
    return apiClient.delete<ApiResponse>(`/jobs/${id}`)
  },

  // Apply to job
  applyToJob: async (data: {
    jobId: string
    coverLetter: string
    proposedRate: number
    estimatedDuration: string
  }): Promise<JobApplication> => {
    return apiClient.post<JobApplication>("/jobs/apply", data)
  },

  // Get job applications
  getJobApplications: async (jobId: string): Promise<JobApplication[]> => {
    return apiClient.get<JobApplication[]>(`/jobs/${jobId}/applications`)
  },

  // Get my applications
  getMyApplications: async (): Promise<JobApplication[]> => {
    return apiClient.get<JobApplication[]>("/jobs/my-applications")
  },

  // Update application status
  updateApplicationStatus: async (applicationId: string, status: string): Promise<ApiResponse> => {
    return apiClient.patch<ApiResponse>(`/jobs/applications/${applicationId}`, { status })
  },

  // Withdraw application
  withdrawApplication: async (applicationId: string): Promise<ApiResponse> => {
    return apiClient.delete<ApiResponse>(`/jobs/applications/${applicationId}`)
  },

  // Get recommended jobs
  getRecommendedJobs: async (staffId: string): Promise<Job[]> => {
    return apiClient.get<Job[]>(`/jobs/recommendations/${staffId}`)
  },

  // Search jobs
  searchJobs: async (query: string, filters: any = {}): Promise<PaginatedResponse<Job>> => {
    return apiClient.get<PaginatedResponse<Job>>("/jobs/search", { q: query, ...filters })
  },

  // Get company jobs
  getCompanyJobs: async (companyId: string): Promise<Job[]> => {
    return apiClient.get<Job[]>(`/jobs/company/${companyId}`)
  },

  // Close job
  closeJob: async (jobId: string): Promise<ApiResponse> => {
    return apiClient.patch<ApiResponse>(`/jobs/${jobId}/close`)
  },

  // Reopen job
  reopenJob: async (jobId: string): Promise<ApiResponse> => {
    return apiClient.patch<ApiResponse>(`/jobs/${jobId}/reopen`)
  },
}

// Job Hooks
export const useJobs = (filters: any = {}) => {
  return useQuery({
    queryKey: jobKeys.list(filters),
    queryFn: () => jobApi.getJobs(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useInfiniteJobs = (filters: any = {}) => {
  return useInfiniteQuery({
    queryKey: jobKeys.list(filters),
    queryFn: ({ pageParam = 1 }) => jobApi.getJobs({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination
      return page < totalPages ? page + 1 : undefined
    },
    initialPageParam: 1,
  })
}

export const useJobById = (id: string) => {
  return useQuery({
    queryKey: jobKeys.detail(id),
    queryFn: () => jobApi.getJobById(id),
    enabled: !!id,
  })
}

export const useCreateJob = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: jobApi.createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() })
    },
  })
}

export const useUpdateJob = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Job> }) => jobApi.updateJob(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() })
    },
  })
}

export const useDeleteJob = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: jobApi.deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() })
    },
  })
}

export const useApplyToJob = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: jobApi.applyToJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.applications() })
    },
  })
}

export const useJobApplications = (jobId: string) => {
  return useQuery({
    queryKey: jobKeys.application(jobId),
    queryFn: () => jobApi.getJobApplications(jobId),
    enabled: !!jobId,
  })
}

export const useMyApplications = () => {
  return useQuery({
    queryKey: ["my-applications"],
    queryFn: jobApi.getMyApplications,
  })
}

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ applicationId, status }: { applicationId: string; status: string }) =>
      jobApi.updateApplicationStatus(applicationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.applications() })
    },
  })
}

export const useWithdrawApplication = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: jobApi.withdrawApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.applications() })
    },
  })
}

export const useSearchJobs = (query: string, filters: any = {}) => {
  return useQuery({
    queryKey: ["jobs", "search", query, filters],
    queryFn: () => jobApi.searchJobs(query, filters),
    enabled: query.length > 2,
    staleTime: 30 * 1000, // 30 seconds
  })
}

export const useRecommendedJobs = (staffId: string) => {
  return useQuery({
    queryKey: ["jobs", "recommendations", staffId],
    queryFn: () => jobApi.getRecommendedJobs(staffId),
    enabled: !!staffId,
  })
}
