import { create } from "zustand"
import { persist } from "zustand/middleware"

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
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  duration: string
  description: string
  skills: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  year: string
  credentialId?: string
}

export interface Activity {
  id: string
  type: "match" | "application" | "rating" | "loan"
  title: string
  description: string
  timestamp: Date
  userId: string
}

export interface LoanApplication {
  id: string
  staffId: string
  amount: number
  purpose: string
  status: "pending" | "approved" | "rejected"
  appliedAt: Date
}

interface AppState {
  user: User | null
  activities: Activity[]
  loanApplications: LoanApplication[]
  setUser: (user: User | null) => void
  addActivity: (activity: Omit<Activity, "id">) => void
  addLoanApplication: (application: Omit<LoanApplication, "id">) => void
  updateLoanStatus: (id: string, status: LoanApplication["status"]) => void
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      activities: [],
      loanApplications: [],
      setUser: (user) => set({ user }),
      addActivity: (activity) =>
        set((state) => ({
          activities: [{ ...activity, id: Date.now().toString() }, ...state.activities],
        })),
      addLoanApplication: (application) =>
        set((state) => ({
          loanApplications: [{ ...application, id: Date.now().toString() }, ...state.loanApplications],
        })),
      updateLoanStatus: (id, status) =>
        set((state) => ({
          loanApplications: state.loanApplications.map((app) => (app.id === id ? { ...app, status } : app)),
        })),
    }),
    {
      name: "staffmatch-storage",
    },
  ),
)
