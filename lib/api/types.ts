// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Auth Types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  role: "company" | "staff"
  company?: string
  location: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

// User Types
export interface User {
  id: string
  email: string
  name: string
  role: "company" | "staff"
  avatar?: string
  rating?: number
  experience?: number
  skills?: string[]
  company?: string
  location?: string
  bio?: string
  experienceLevel?: string
  hourlyRate?: number
  portfolio?: string
  workExperience?: WorkExperience[]
  certifications?: Certification[]
  profileCompleted?: boolean
  createdAt: string
  updatedAt: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  duration: string
  description: string
  skills: string[]
  startDate?: string
  endDate?: string
  current?: boolean
}

export interface Certification {
  id: string
  name: string
  issuer: string
  year: string
  credentialId?: string
  verificationUrl?: string
  expiryDate?: string
}

// Staff Types
export interface StaffProfile extends User {
  availability: "Available" | "Busy" | "Unavailable"
  completedProjects: number
  successRate: number
  responseTime: string
  languages: string[]
  timezone: string
  verificationStatus: "verified" | "pending" | "unverified"
}

export interface StaffFilters {
  skills?: string[]
  location?: string
  minRating?: number
  maxRate?: number
  minExperience?: number
  availability?: string[]
  sortBy?: string
  page?: number
  limit?: number
}

// Job Types
export interface Job {
  id: string
  title: string
  description: string
  company: string
  companyId: string
  budget: string
  duration: string
  skills: string[]
  requirements: string[]
  location: string
  remote: boolean
  type: "full-time" | "part-time" | "contract" | "freelance"
  status: "open" | "closed" | "in-progress"
  applicants: number
  postedAt: string
  deadline?: string
}

export interface JobApplication {
  id: string
  jobId: string
  staffId: string
  coverLetter: string
  proposedRate: number
  estimatedDuration: string
  status: "pending" | "accepted" | "rejected" | "withdrawn"
  appliedAt: string
}

// Company Types
export interface Company {
  id: string
  name: string
  description: string
  website?: string
  industry: string
  size: string
  location: string
  logo?: string
  verified: boolean
  rating: number
  totalHires: number
  activeJobs: number
}

// Loan Types
export interface LoanApplication {
  id: string
  staffId: string
  amount: number
  purpose: string
  description?: string
  term: number
  status: "pending" | "approved" | "rejected" | "disbursed" | "completed"
  interestRate?: number
  monthlyPayment?: number
  appliedAt: string
  approvedAt?: string
  disbursedAt?: string
}

export interface LoanRequest {
  amount: number
  purpose: string
  description?: string
  term: number
}

// Activity Types
export interface Activity {
  id: string
  type: "match" | "application" | "rating" | "loan" | "hire" | "payment"
  title: string
  description: string
  timestamp: string
  userId: string
  metadata?: Record<string, any>
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: "info" | "success" | "warning" | "error"
  title: string
  message: string
  read: boolean
  actionUrl?: string
  createdAt: string
}

// Review Types
export interface Review {
  id: string
  fromUserId: string
  toUserId: string
  jobId?: string
  rating: number
  comment: string
  skills?: string[]
  createdAt: string
}

// Message Types
export interface Message {
  id: string
  conversationId: string
  senderId: string
  receiverId: string
  content: string
  type: "text" | "file" | "image"
  read: boolean
  createdAt: string
}

export interface Conversation {
  id: string
  participants: string[]
  lastMessage?: Message
  unreadCount: number
  createdAt: string
  updatedAt: string
}

// Analytics Types
export interface DashboardStats {
  totalEarnings?: number
  completedJobs?: number
  activeJobs?: number
  successRate?: number
  rating?: number
  totalHires?: number
  activeProjects?: number
  pendingApplications?: number
}

export interface AnalyticsData {
  earnings: { month: string; amount: number }[]
  applications: { date: string; count: number }[]
  ratings: { period: string; rating: number }[]
  skills: { skill: string; demand: number }[]
}
