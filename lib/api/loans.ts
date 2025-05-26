import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "./client"
import type { LoanApplication, LoanRequest, ApiResponse } from "./types"

// Query Keys
export const loanKeys = {
  all: ["loans"] as const,
  lists: () => [...loanKeys.all, "list"] as const,
  details: () => [...loanKeys.all, "detail"] as const,
  detail: (id: string) => [...loanKeys.details(), id] as const,
  myLoans: (userId: string) => [...loanKeys.all, "my-loans", userId] as const,
  eligibility: (userId: string) => [...loanKeys.all, "eligibility", userId] as const,
}

// Loan API Functions
export const loanApi = {
  // Apply for loan
  applyForLoan: async (loanData: LoanRequest): Promise<LoanApplication> => {
    return apiClient.post<LoanApplication>("/loans/apply", loanData)
  },

  // Get loan applications
  getMyLoanApplications: async (): Promise<LoanApplication[]> => {
    return apiClient.get<LoanApplication[]>("/loans/my-applications")
  },

  // Get loan by ID
  getLoanById: async (id: string): Promise<LoanApplication> => {
    return apiClient.get<LoanApplication>(`/loans/${id}`)
  },

  // Update loan application
  updateLoanApplication: async (id: string, data: Partial<LoanRequest>): Promise<LoanApplication> => {
    return apiClient.put<LoanApplication>(`/loans/${id}`, data)
  },

  // Cancel loan application
  cancelLoanApplication: async (id: string): Promise<ApiResponse> => {
    return apiClient.delete<ApiResponse>(`/loans/${id}`)
  },

  // Get loan eligibility
  getLoanEligibility: async (): Promise<{ eligible: boolean; maxAmount: number; reasons?: string[] }> => {
    return apiClient.get("/loans/eligibility")
  },

  // Calculate loan payment
  calculateLoanPayment: async (data: { amount: number; term: number; rate?: number }): Promise<{
    monthlyPayment: number
    totalPayment: number
    totalInterest: number
  }> => {
    return apiClient.post("/loans/calculate", data)
  },

  // Get loan terms
  getLoanTerms: async (): Promise<{
    minAmount: number
    maxAmount: number
    terms: number[]
    interestRates: Record<string, number>
  }> => {
    return apiClient.get("/loans/terms")
  },

  // Make loan payment
  makeLoanPayment: async (data: { loanId: string; amount: number; paymentMethod: string }): Promise<ApiResponse> => {
    return apiClient.post("/loans/payment", data)
  },

  // Get loan payment history
  getLoanPaymentHistory: async (loanId: string): Promise<any[]> => {
    return apiClient.get(`/loans/${loanId}/payments`)
  },

  // Get loan documents
  getLoanDocuments: async (loanId: string): Promise<any[]> => {
    return apiClient.get(`/loans/${loanId}/documents`)
  },

  // Upload loan document
  uploadLoanDocument: async (loanId: string, file: File): Promise<ApiResponse> => {
    const formData = new FormData()
    formData.append("document", file)

    return fetch(`/api/loans/${loanId}/documents`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    }).then((res) => res.json())
  },
}

// Loan Hooks
export const useApplyForLoan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: loanApi.applyForLoan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: loanKeys.lists() })
    },
  })
}

export const useMyLoanApplications = () => {
  return useQuery({
    queryKey: loanKeys.lists(),
    queryFn: loanApi.getMyLoanApplications,
  })
}

export const useLoanById = (id: string) => {
  return useQuery({
    queryKey: loanKeys.detail(id),
    queryFn: () => loanApi.getLoanById(id),
    enabled: !!id,
  })
}

export const useUpdateLoanApplication = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<LoanRequest> }) => loanApi.updateLoanApplication(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: loanKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: loanKeys.lists() })
    },
  })
}

export const useCancelLoanApplication = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: loanApi.cancelLoanApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: loanKeys.lists() })
    },
  })
}

export const useLoanEligibility = () => {
  return useQuery({
    queryKey: loanKeys.eligibility("current"),
    queryFn: loanApi.getLoanEligibility,
  })
}

export const useCalculateLoanPayment = () => {
  return useMutation({
    mutationFn: loanApi.calculateLoanPayment,
  })
}

export const useLoanTerms = () => {
  return useQuery({
    queryKey: ["loan-terms"],
    queryFn: loanApi.getLoanTerms,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useMakeLoanPayment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: loanApi.makeLoanPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: loanKeys.all })
    },
  })
}

export const useLoanPaymentHistory = (loanId: string) => {
  return useQuery({
    queryKey: ["loan-payments", loanId],
    queryFn: () => loanApi.getLoanPaymentHistory(loanId),
    enabled: !!loanId,
  })
}

export const useUploadLoanDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ loanId, file }: { loanId: string; file: File }) => loanApi.uploadLoanDocument(loanId, file),
    onSuccess: (_, { loanId }) => {
      queryClient.invalidateQueries({ queryKey: ["loan-documents", loanId] })
    },
  })
}
