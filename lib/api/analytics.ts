import { useQuery } from "@tanstack/react-query"
import { apiClient } from "./client"
import type { DashboardStats, AnalyticsData } from "./types"

// Query Keys
export const analyticsKeys = {
  all: ["analytics"] as const,
  dashboard: (userId: string) => [...analyticsKeys.all, "dashboard", userId] as const,
  earnings: (userId: string, period: string) => [...analyticsKeys.all, "earnings", userId, period] as const,
  performance: (userId: string) => [...analyticsKeys.all, "performance", userId] as const,
  trends: (type: string, period: string) => [...analyticsKeys.all, "trends", type, period] as const,
}

// Analytics API Functions
export const analyticsApi = {
  // Get dashboard stats
  getDashboardStats: async (userId: string): Promise<DashboardStats> => {
    return apiClient.get<DashboardStats>(`/analytics/dashboard/${userId}`)
  },

  // Get earnings analytics
  getEarningsAnalytics: async (userId: string, period = "12m"): Promise<AnalyticsData["earnings"]> => {
    return apiClient.get(`/analytics/earnings/${userId}`, { period })
  },

  // Get performance analytics
  getPerformanceAnalytics: async (userId: string): Promise<any> => {
    return apiClient.get(`/analytics/performance/${userId}`)
  },

  // Get market trends
  getMarketTrends: async (type = "skills", period = "6m"): Promise<any> => {
    return apiClient.get("/analytics/trends", { type, period })
  },

  // Get skill demand analytics
  getSkillDemand: async (): Promise<AnalyticsData["skills"]> => {
    return apiClient.get("/analytics/skill-demand")
  },

  // Get company analytics
  getCompanyAnalytics: async (companyId: string): Promise<any> => {
    return apiClient.get(`/analytics/company/${companyId}`)
  },

  // Get staff analytics
  getStaffAnalytics: async (staffId: string): Promise<any> => {
    return apiClient.get(`/analytics/staff/${staffId}`)
  },

  // Get platform analytics (admin)
  getPlatformAnalytics: async (): Promise<any> => {
    return apiClient.get("/analytics/platform")
  },
}

// Analytics Hooks
export const useDashboardStats = (userId: string) => {
  return useQuery({
    queryKey: analyticsKeys.dashboard(userId),
    queryFn: () => analyticsApi.getDashboardStats(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useEarningsAnalytics = (userId: string, period = "12m") => {
  return useQuery({
    queryKey: analyticsKeys.earnings(userId, period),
    queryFn: () => analyticsApi.getEarningsAnalytics(userId, period),
    enabled: !!userId,
  })
}

export const usePerformanceAnalytics = (userId: string) => {
  return useQuery({
    queryKey: analyticsKeys.performance(userId),
    queryFn: () => analyticsApi.getPerformanceAnalytics(userId),
    enabled: !!userId,
  })
}

export const useMarketTrends = (type = "skills", period = "6m") => {
  return useQuery({
    queryKey: analyticsKeys.trends(type, period),
    queryFn: () => analyticsApi.getMarketTrends(type, period),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useSkillDemand = () => {
  return useQuery({
    queryKey: ["skill-demand"],
    queryFn: analyticsApi.getSkillDemand,
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}
