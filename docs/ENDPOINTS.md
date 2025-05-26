# API Endpoints Documentation

This document provides a comprehensive overview of all API endpoints available in the JobOP platform, organized by feature modules as defined in the `lib/api` directory.

## Table of Contents

- [Authentication Endpoints](#authentication-endpoints)
- [Staff Management Endpoints](#staff-management-endpoints)
- [Jobs & Applications Endpoints](#jobs--applications-endpoints)
- [Loan System Endpoints](#loan-system-endpoints)
- [Activities Endpoints](#activities-endpoints)
- [Notifications Endpoints](#notifications-endpoints)
- [Analytics Endpoints](#analytics-endpoints)
- [Query Keys Reference](#query-keys-reference)
- [Error Handling](#error-handling)
- [Usage Examples](#usage-examples)

---

## Authentication Endpoints

**File:** `lib/api/auth.ts`

### Core Authentication Flow

#### `POST /auth/login`
Authenticate user credentials and receive access tokens.

**Hook:** `useLogin()`
**Query Key:** N/A (Mutation)

\`\`\`typescript
// Request
{
  email: string
  password: string
}

// Response
{
  user: User
  token: string
  refreshToken: string
}
\`\`\`

**Usage:**
\`\`\`typescript
const loginMutation = useLogin()
await loginMutation.mutateAsync({
  email: 'user@example.com',
  password: 'password123'
})
\`\`\`

#### `POST /auth/register`
Create a new user account.

**Hook:** `useRegister()`
**Query Key:** N/A (Mutation)

\`\`\`typescript
// Request
{
  name: string
  email: string
  password: string
  role: "company" | "staff"
  company?: string
  location: string
}

// Response
{
  user: User
  token: string
  refreshToken: string
}
\`\`\`

#### `GET /auth/me`
Retrieve current authenticated user information.

**Hook:** `useCurrentUser()`
**Query Key:** `["auth", "user"]`
**Cache Time:** 5 minutes

\`\`\`typescript
// Response
{
  id: string
  email: string
  name: string
  role: "company" | "staff"
  avatar?: string
  rating?: number
  skills?: string[]
  // ... other user fields
}
\`\`\`

#### `POST /auth/refresh`
Refresh access token using refresh token.

**Function:** `authApi.refreshToken(refreshToken: string)`

#### `PATCH /auth/profile`
Update user profile information.

**Hook:** `useUpdateProfile()`
**Invalidates:** User cache and profile cache

\`\`\`typescript
// Request (partial update)
{
  name?: string
  bio?: string
  skills?: string[]
  hourlyRate?: number
  portfolio?: string
}
\`\`\`

#### `POST /auth/change-password`
Change user password.

**Hook:** `useChangePassword()`

\`\`\`typescript
// Request
{
  currentPassword: string
  newPassword: string
}
\`\`\`

#### `POST /auth/forgot-password`
Request password reset email.

**Hook:** `useForgotPassword()`

\`\`\`typescript
// Request
{
  email: string
}
\`\`\`

#### `POST /auth/reset-password`
Reset password using reset token.

**Hook:** `useResetPassword()`

\`\`\`typescript
// Request
{
  token: string
  password: string
}
\`\`\`

#### `POST /auth/logout`
Logout and invalidate tokens.

**Hook:** `useLogout()`
**Side Effect:** Clears all cached data

#### `POST /auth/verify-email`
Verify email address using verification token.

**Function:** `authApi.verifyEmail(token: string)`

---

## Staff Management Endpoints

**File:** `lib/api/staff.ts`

### Staff Discovery & Search

#### `GET /staff`
Retrieve paginated list of staff members with filtering options.

**Hook:** `useStaff(filters: StaffFilters)`
**Infinite Hook:** `useInfiniteStaff(filters: StaffFilters)`
**Query Key:** `["staff", "list", filters]`
**Cache Time:** 2 minutes

\`\`\`typescript
// Filters
interface StaffFilters {
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

// Response
{
  data: StaffProfile[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
\`\`\`

**Usage:**
\`\`\`typescript
const { data, isLoading } = useStaff({
  skills: ['React', 'TypeScript'],
  minRating: 4.5,
  availability: ['Available'],
  sortBy: 'rating'
})
\`\`\`

#### `GET /staff/:id`
Get detailed staff profile by ID.

**Hook:** `useStaffById(id: string)`
**Query Key:** `["staff", "detail", id]`

\`\`\`typescript
// Response
{
  id: string
  name: string
  rating: number
  experience: number
  skills: string[]
  location: string
  hourlyRate: number
  availability: "Available" | "Busy" | "Unavailable"
  completedProjects: number
  successRate: number
  responseTime: string
  languages: string[]
  timezone: string
  bio: string
  workExperience: WorkExperience[]
  certifications: Certification[]
}
\`\`\`

#### `GET /staff/search`
Search staff members by query and filters.

**Hook:** `useSearchStaff(query: string, filters: StaffFilters)`
**Query Key:** `["staff", "search", query]`
**Cache Time:** 30 seconds
**Enabled:** Only when query length > 2

\`\`\`typescript
// Query Parameters
{
  q: string // Search query
  ...StaffFilters
}
\`\`\`

#### `GET /staff/recommendations/:companyId`
Get AI-recommended staff for a specific company.

**Hook:** `useRecommendedStaff(companyId: string)`
**Query Key:** `["staff", "recommendations", companyId]`

\`\`\`typescript
// Response
StaffProfile[] // Ordered by relevance/match score
\`\`\`

#### `POST /staff/by-skills`
Find staff members by specific skill set.

**Function:** `staffApi.getStaffBySkills(skills: string[])`

\`\`\`typescript
// Request
{
  skills: string[]
}

// Response
StaffProfile[]
\`\`\`

### Staff Interaction

#### `POST /staff/hire`
Initiate hiring process for a staff member.

**Hook:** `useHireStaff()`
**Invalidates:** Staff lists

\`\`\`typescript
// Request
{
  staffId: string
  jobId?: string
  message?: string
}

// Response
{
  success: boolean
  message: string
}
\`\`\`

#### `POST /staff/contact`
Send message to a staff member.

**Hook:** `useContactStaff()`

\`\`\`typescript
// Request
{
  staffId: string
  message: string
  subject?: string
}
\`\`\`

#### `PATCH /staff/:id/availability`
Update staff availability status (staff only).

**Hook:** `useUpdateAvailability()`
**Invalidates:** Staff detail and lists

\`\`\`typescript
// Request
{
  availability: "Available" | "Busy" | "Unavailable"
}
\`\`\`

### Staff Favorites

#### `POST /staff/:id/save`
Add staff to favorites list.

**Hook:** `useSaveStaff()`
**Invalidates:** Saved staff list

#### `DELETE /staff/:id/save`
Remove staff from favorites.

**Hook:** `useUnsaveStaff()`
**Invalidates:** Saved staff list

#### `GET /staff/saved`
Get user's saved/favorite staff members.

**Hook:** `useSavedStaff()`
**Query Key:** `["saved-staff"]`

### Staff Analytics

#### `GET /staff/:id/analytics`
Get analytics data for a specific staff member.

**Function:** `staffApi.getStaffAnalytics(staffId: string)`

---

## Jobs & Applications Endpoints

**File:** `lib/api/jobs.ts`

### Job Management

#### `GET /jobs`
Retrieve paginated list of job postings with filtering.

**Hook:** `useJobs(filters: any)`
**Infinite Hook:** `useInfiniteJobs(filters: any)`
**Query Key:** `["jobs", "list", filters]`
**Cache Time:** 2 minutes

\`\`\`typescript
// Filters
{
  skills?: string[]
  location?: string
  remote?: boolean
  type?: "full-time" | "part-time" | "contract" | "freelance"
  minBudget?: number
  maxBudget?: number
  sortBy?: string
  companyId?: string
  page?: number
  limit?: number
}

// Response
{
  data: Job[]
  pagination: PaginationInfo
}
\`\`\`

#### `GET /jobs/:id`
Get detailed job information.

**Hook:** `useJobById(id: string)`
**Query Key:** `["jobs", "detail", id]`

\`\`\`typescript
// Response
{
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
  type: string
  status: "open" | "closed" | "in-progress"
  applicants: number
  postedAt: string
  deadline?: string
}
\`\`\`

#### `POST /jobs`
Create new job posting (company only).

**Hook:** `useCreateJob()`
**Invalidates:** Job lists

\`\`\`typescript
// Request
{
  title: string
  description: string
  skills: string[]
  requirements: string[]
  budget: string
  duration: string
  location: string
  remote: boolean
  type: string
  deadline?: string
}
\`\`\`

#### `PUT /jobs/:id`
Update existing job posting (company only).

**Hook:** `useUpdateJob()`
**Invalidates:** Job detail and lists

\`\`\`typescript
// Request
{
  id: string
  data: Partial<Job>
}
\`\`\`

#### `DELETE /jobs/:id`
Delete job posting (company only).

**Hook:** `useDeleteJob()`
**Invalidates:** Job lists

### Job Applications

#### `POST /jobs/apply`
Apply to a job posting (staff only).

**Hook:** `useApplyToJob()`
**Invalidates:** Applications cache

\`\`\`typescript
// Request
{
  jobId: string
  coverLetter: string
  proposedRate: number
  estimatedDuration: string
}

// Response
JobApplication
\`\`\`

#### `GET /jobs/:id/applications`
Get applications for a specific job (company only).

**Hook:** `useJobApplications(jobId: string)`
**Query Key:** `["jobs", "applications", jobId]`

\`\`\`typescript
// Response
JobApplication[]
\`\`\`

#### `GET /jobs/my-applications`
Get current user's job applications (staff only).

**Hook:** `useMyApplications()`
**Query Key:** `["my-applications"]`

#### `PATCH /jobs/applications/:id`
Update application status (company only).

**Hook:** `useUpdateApplicationStatus()`
**Invalidates:** Applications cache

\`\`\`typescript
// Request
{
  applicationId: string
  status: "pending" | "accepted" | "rejected"
}
\`\`\`

#### `DELETE /jobs/applications/:id`
Withdraw job application (staff only).

**Hook:** `useWithdrawApplication()`
**Invalidates:** Applications cache

### Job Discovery

#### `GET /jobs/search`
Search job postings by query and filters.

**Hook:** `useSearchJobs(query: string, filters: any)`
**Query Key:** `["jobs", "search", query, filters]`
**Cache Time:** 30 seconds
**Enabled:** Only when query length > 2

#### `GET /jobs/recommendations/:staffId`
Get recommended jobs for a staff member.

**Hook:** `useRecommendedJobs(staffId: string)`
**Query Key:** `["jobs", "recommendations", staffId]`

#### `GET /jobs/company/:companyId`
Get all jobs posted by a specific company.

**Function:** `jobApi.getCompanyJobs(companyId: string)`

### Job Status Management

#### `PATCH /jobs/:id/close`
Close job posting.

**Function:** `jobApi.closeJob(jobId: string)`

#### `PATCH /jobs/:id/reopen`
Reopen closed job posting.

**Function:** `jobApi.reopenJob(jobId: string)`

---

## Loan System Endpoints

**File:** `lib/api/loans.ts`

### Loan Applications

#### `POST /loans/apply`
Submit loan application (staff only).

**Hook:** `useApplyForLoan()`
**Invalidates:** Loan lists

\`\`\`typescript
// Request
{
  amount: number
  purpose: "equipment" | "training" | "certification" | "software" | "workspace" | "other"
  description?: string
  term: number // months
}

// Response
LoanApplication
\`\`\`

#### `GET /loans/my-applications`
Get user's loan applications.

**Hook:** `useMyLoanApplications()`
**Query Key:** `["loans", "list"]`

\`\`\`typescript
// Response
LoanApplication[]
\`\`\`

#### `GET /loans/:id`
Get specific loan application details.

**Hook:** `useLoanById(id: string)`
**Query Key:** `["loans", "detail", id]`

#### `PUT /loans/:id`
Update loan application (if status is pending).

**Hook:** `useUpdateLoanApplication()`
**Invalidates:** Loan detail and lists

\`\`\`typescript
// Request
{
  id: string
  data: Partial<LoanRequest>
}
\`\`\`

#### `DELETE /loans/:id`
Cancel loan application (if status is pending).

**Hook:** `useCancelLoanApplication()`
**Invalidates:** Loan lists

### Loan Services

#### `GET /loans/eligibility`
Check loan eligibility for current user.

**Hook:** `useLoanEligibility()`
**Query Key:** `["loans", "eligibility", "current"]`

\`\`\`typescript
// Response
{
  eligible: boolean
  maxAmount: number
  reasons?: string[]
}
\`\`\`

#### `POST /loans/calculate`
Calculate loan payment details.

**Hook:** `useCalculateLoanPayment()`

\`\`\`typescript
// Request
{
  amount: number
  term: number
  rate?: number
}

// Response
{
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
}
\`\`\`

#### `GET /loans/terms`
Get available loan terms and interest rates.

**Hook:** `useLoanTerms()`
**Query Key:** `["loan-terms"]`
**Cache Time:** 10 minutes

\`\`\`typescript
// Response
{
  minAmount: number
  maxAmount: number
  terms: number[]
  interestRates: Record<string, number>
}
\`\`\`

### Loan Payments

#### `POST /loans/payment`
Make loan payment.

**Hook:** `useMakeLoanPayment()`
**Invalidates:** All loan data

\`\`\`typescript
// Request
{
  loanId: string
  amount: number
  paymentMethod: string
}
\`\`\`

#### `GET /loans/:id/payments`
Get payment history for a loan.

**Hook:** `useLoanPaymentHistory(loanId: string)`
**Query Key:** `["loan-payments", loanId]`

### Loan Documents

#### `GET /loans/:id/documents`
Get documents associated with a loan.

**Function:** `loanApi.getLoanDocuments(loanId: string)`

#### `POST /loans/:id/documents`
Upload document for a loan.

**Hook:** `useUploadLoanDocument()`
**Invalidates:** Loan documents cache

\`\`\`typescript
// Request (FormData)
{
  loanId: string
  file: File
}
\`\`\`

---

## Activities Endpoints

**File:** `lib/api/activities.ts`

### Activity Management

#### `GET /activities`
Get paginated list of activities with filtering.

**Hook:** `useActivities(filters: any)`
**Infinite Hook:** `useInfiniteActivities(filters: any)`
**Query Key:** `["activities", "list", filters]`
**Cache Time:** 30 seconds

\`\`\`typescript
// Filters
{
  type?: string[]
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
}

// Response
{
  data: Activity[]
  pagination: PaginationInfo
}
\`\`\`

#### `GET /activities/user/:userId`
Get activities for a specific user.

**Hook:** `useUserActivities(userId: string, filters: any)`
**Query Key:** `["activities", "user", userId]`

#### `POST /activities`
Create new activity entry.

**Hook:** `useCreateActivity()`
**Invalidates:** Activity lists

\`\`\`typescript
// Request
{
  type: "match" | "application" | "rating" | "loan"
  title: string
  description: string
  userId: string
  metadata?: Record<string, any>
}

// Response
Activity
\`\`\`

### Activity Actions

#### `PATCH /activities/:id/read`
Mark activity as read.

**Hook:** `useMarkActivityAsRead()`
**Invalidates:** All activities

#### `PATCH /activities/mark-all-read`
Mark all activities as read.

**Hook:** `useMarkAllActivitiesAsRead()`
**Invalidates:** All activities

#### `DELETE /activities/:id`
Delete activity.

**Hook:** `useDeleteActivity()`
**Invalidates:** All activities

### Activity Analytics

#### `GET /activities/stats/:userId`
Get activity statistics for a user.

**Function:** `activityApi.getActivityStats(userId: string)`

---

## Notifications Endpoints

**File:** `lib/api/notifications.ts`

### Notification Management

#### `GET /notifications`
Get paginated list of notifications.

**Hook:** `useNotifications(filters: any)`
**Query Key:** `["notifications", "list"]`
**Refetch Interval:** 30 seconds

\`\`\`typescript
// Response
{
  data: Notification[]
  pagination: PaginationInfo
}
\`\`\`

#### `GET /notifications/unread`
Get only unread notifications.

**Hook:** `useUnreadNotifications()`
**Query Key:** `["notifications", "unread"]`
**Refetch Interval:** 15 seconds

#### `GET /notifications/count`
Get notification counts.

**Hook:** `useNotificationCount()`
**Query Key:** `["notifications", "count"]`
**Refetch Interval:** 10 seconds

\`\`\`typescript
// Response
{
  total: number
  unread: number
}
\`\`\`

### Notification Actions

#### `PATCH /notifications/:id/read`
Mark specific notification as read.

**Hook:** `useMarkAsRead()`
**Invalidates:** All notifications

#### `PATCH /notifications/mark-all-read`
Mark all notifications as read.

**Hook:** `useMarkAllAsRead()`
**Invalidates:** All notifications

#### `DELETE /notifications/:id`
Delete notification.

**Hook:** `useDeleteNotification()`
**Invalidates:** All notifications

### Notification Preferences

#### `PUT /notifications/preferences`
Update notification preferences.

**Function:** `notificationApi.updatePreferences(preferences: any)`

#### `GET /notifications/preferences`
Get current notification preferences.

**Function:** `notificationApi.getPreferences()`

---

## Analytics Endpoints

**File:** `lib/api/analytics.ts`

### Dashboard Analytics

#### `GET /analytics/dashboard/:userId`
Get dashboard statistics for a user.

**Hook:** `useDashboardStats(userId: string)`
**Query Key:** `["analytics", "dashboard", userId]`
**Cache Time:** 5 minutes

\`\`\`typescript
// Response
{
  totalEarnings?: number
  completedJobs?: number
  activeJobs?: number
  successRate?: number
  rating?: number
  totalHires?: number
  activeProjects?: number
  pendingApplications?: number
}
\`\`\`

### Performance Analytics

#### `GET /analytics/earnings/:userId`
Get earnings analytics over time.

**Hook:** `useEarningsAnalytics(userId: string, period: string)`
**Query Key:** `["analytics", "earnings", userId, period]`

\`\`\`typescript
// Query Parameters
{
  period: "1m" | "3m" | "6m" | "12m" | "all"
}

// Response
{
  month: string
  amount: number
}[]
\`\`\`

#### `GET /analytics/performance/:userId`
Get performance metrics for a user.

**Hook:** `usePerformanceAnalytics(userId: string)`
**Query Key:** `["analytics", "performance", userId]`

### Market Analytics

#### `GET /analytics/trends`
Get market trends data.

**Hook:** `useMarketTrends(type: string, period: string)`
**Query Key:** `["analytics", "trends", type, period]`
**Cache Time:** 10 minutes

\`\`\`typescript
// Query Parameters
{
  type: "skills" | "rates" | "demand"
  period: "1m" | "3m" | "6m" | "12m"
}
\`\`\`

#### `GET /analytics/skill-demand`
Get skill demand analytics.

**Hook:** `useSkillDemand()`
**Query Key:** `["skill-demand"]`
**Cache Time:** 30 minutes

\`\`\`typescript
// Response
{
  skill: string
  demand: number
}[]
\`\`\`

### Specialized Analytics

#### `GET /analytics/company/:companyId`
Get analytics for a specific company.

**Function:** `analyticsApi.getCompanyAnalytics(companyId: string)`

#### `GET /analytics/staff/:staffId`
Get analytics for a specific staff member.

**Function:** `analyticsApi.getStaffAnalytics(staffId: string)`

#### `GET /analytics/platform`
Get platform-wide analytics (admin only).

**Function:** `analyticsApi.getPlatformAnalytics()`

---

## Query Keys Reference

### Authentication
\`\`\`typescript
authKeys = {
  all: ["auth"]
  user: () => ["auth", "user"]
  profile: (id: string) => ["auth", "profile", id]
}
\`\`\`

### Staff
\`\`\`typescript
staffKeys = {
  all: ["staff"]
  lists: () => ["staff", "list"]
  list: (filters: StaffFilters) => ["staff", "list", filters]
  details: () => ["staff", "detail"]
  detail: (id: string) => ["staff", "detail", id]
  search: (query: string) => ["staff", "search", query]
  recommendations: (userId: string) => ["staff", "recommendations", userId]
}
\`\`\`

### Jobs
\`\`\`typescript
jobKeys = {
  all: ["jobs"]
  lists: () => ["jobs", "list"]
  list: (filters: any) => ["jobs", "list", filters]
  details: () => ["jobs", "detail"]
  detail: (id: string) => ["jobs", "detail", id]
  applications: () => ["jobs", "applications"]
  application: (id: string) => ["jobs", "applications", id]
  myJobs: (userId: string) => ["jobs", "my-jobs", userId]
  myApplications: (userId: string) => ["jobs", "my-applications", userId]
}
\`\`\`

### Loans
\`\`\`typescript
loanKeys = {
  all: ["loans"]
  lists: () => ["loans", "list"]
  details: () => ["loans", "detail"]
  detail: (id: string) => ["loans", "detail", id]
  myLoans: (userId: string) => ["loans", "my-loans", userId]
  eligibility: (userId: string) => ["loans", "eligibility", userId]
}
\`\`\`

### Activities
\`\`\`typescript
activityKeys = {
  all: ["activities"]
  lists: () => ["activities", "list"]
  list: (filters: any) => ["activities", "list", filters]
  user: (userId: string) => ["activities", "user", userId]
}
\`\`\`

### Notifications
\`\`\`typescript
notificationKeys = {
  all: ["notifications"]
  lists: () => ["notifications", "list"]
  unread: () => ["notifications", "unread"]
  count: () => ["notifications", "count"]
}
\`\`\`

### Analytics
\`\`\`typescript
analyticsKeys = {
  all: ["analytics"]
  dashboard: (userId: string) => ["analytics", "dashboard", userId]
  earnings: (userId: string, period: string) => ["analytics", "earnings", userId, period]
  performance: (userId: string) => ["analytics", "performance", userId]
  trends: (type: string, period: string) => ["analytics", "trends", type, period]
}
\`\`\`

---

## Error Handling

### Standard Error Response
\`\`\`typescript
interface ApiError {
  message: string
  status: number
  code?: string
}
\`\`\`

### Error Handling Utility
\`\`\`typescript
import { handleApiError } from '@/lib/api'

try {
  await mutation.mutateAsync(data)
} catch (error) {
  handleApiError(error)
  // Automatically handles:
  // - 401: Redirect to login
  // - 403: Access forbidden
  // - 500+: Server errors
  // - Other: Generic error handling
}
\`\`\`

### Retry Configuration
\`\`\`typescript
// Defined in lib/api/utils.ts
export const retryConfig = {
  retry: (failureCount: number, error: any) => {
    // Don't retry on client errors (4xx)
    if (error?.status >= 400 && error?.status < 500) {
      return false
    }
    // Retry up to 3 times for server errors
    return failureCount < 3
  },
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
}
\`\`\`

---

## Usage Examples

### Basic Query
\`\`\`typescript
import { useStaff } from '@/lib/api'

function StaffList() {
  const { data, isLoading, error } = useStaff({
    skills: ['React', 'TypeScript'],
    minRating: 4.5
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {data?.data.map(staff => (
        <div key={staff.id}>{staff.name}</div>
      ))}
    </div>
  )
}
\`\`\`

### Infinite Query
\`\`\`typescript
import { useInfiniteStaff } from '@/lib/api'

function InfiniteStaffList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteStaff({ skills: ['React'] })

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.data.map(staff => (
            <div key={staff.id}>{staff.name}</div>
          ))}
        </div>
      ))}
      
      {hasNextPage && (
        <button 
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  )
}
\`\`\`

### Mutation with Optimistic Updates
\`\`\`typescript
import { useHireStaff, useQueryClient } from '@/lib/api'

function HireButton({ staffId }: { staffId: string }) {
  const queryClient = useQueryClient()
  const hireStaffMutation = useHireStaff()

  const handleHire = async () => {
    try {
      await hireStaffMutation.mutateAsync({
        staffId,
        message: 'We would like to hire you for our project'
      })
      
      // Optionally show success message
      toast.success('Hire request sent successfully!')
    } catch (error) {
      toast.error('Failed to send hire request')
    }
  }

  return (
    <button 
      onClick={handleHire}
      disabled={hireStaffMutation.isPending}
    >
      {hireStaffMutation.isPending ? 'Hiring...' : 'Hire Now'}
    </button>
  )
}
\`\`\`

### Conditional Queries
\`\`\`typescript
import { useStaffById, useCurrentUser } from '@/lib/api'

function StaffProfile({ staffId }: { staffId?: string }) {
  const { data: currentUser } = useCurrentUser()
  
  // Only fetch staff data if staffId exists and user is authenticated
  const { data: staff } = useStaffById(staffId!, {
    enabled: !!staffId && !!currentUser
  })

  if (!staffId) return <div>No staff selected</div>
  if (!staff) return <div>Loading...</div>

  return <div>{staff.name}</div>
}
\`\`\`

### Cache Invalidation
\`\`\`typescript
import { useQueryClient } from '@tanstack/react-query'
import { staffKeys } from '@/lib/api'

function RefreshButton() {
  const queryClient = useQueryClient()

  const refreshStaffData = () => {
    // Invalidate all staff queries
    queryClient.invalidateQueries({ queryKey: staffKeys.all })
    
    // Or invalidate specific queries
    queryClient.invalidateQueries({ queryKey: staffKeys.lists() })
  }

  return <button onClick={refreshStaffData}>Refresh</button>
}
\`\`\`

---

This documentation provides a complete reference for all API endpoints available in the JobOP platform. Each endpoint includes its purpose, parameters, response format, associated React hooks, and usage examples.

For implementation details and additional utilities, refer to the individual files in the `lib/api` directory.
