"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, DollarSign, Clock, TrendingUp, Briefcase, CreditCard } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import Link from "next/link"

const mockJobs = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    budget: "$5000-8000",
    duration: "3 months",
    skills: ["React", "TypeScript", "Node.js"],
    posted: "2 days ago",
    applicants: 12,
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    budget: "$4000-6000",
    duration: "6 months",
    skills: ["Python", "Django", "React"],
    posted: "1 week ago",
    applicants: 8,
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "Design Studio",
    budget: "$3000-5000",
    duration: "2 months",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    posted: "3 days ago",
    applicants: 15,
  },
]

export default function StaffDashboard() {
  const user = useStore((state) => state.user)
  const activities = useStore((state) => state.activities)
  const addActivity = useStore((state) => state.addActivity)
  const router = useRouter()

  useEffect(() => {
    if (!user || user.role !== "staff") {
      router.push("/auth/login")
    } else if (!user.profileCompleted) {
      router.push("/onboarding/skills")
    }
  }, [user, router])

  const handleApplyJob = (job: (typeof mockJobs)[0]) => {
    addActivity({
      type: "application",
      title: "Job Application",
      description: `Applied for ${job.title} at ${job.company}`,
      timestamp: new Date(),
      userId: user?.id || "",
    })
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Staff Dashboard</h1>
          <p className="text-gray-600">Discover opportunities and manage your career</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.rating}</div>
              <p className="text-xs text-muted-foreground">Based on 24 reviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">+3 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,450</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96%</div>
              <p className="text-xs text-muted-foreground">Project completion</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Need Financial Support?
              </CardTitle>
              <CardDescription>Apply for a loan to invest in your professional growth</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/staff/loan">
                <Button className="w-full">Apply for Loan</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Profile Completion</CardTitle>
              <CardDescription>Your profile is {user.profileCompleted ? "complete" : "incomplete"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Profile Strength</span>
                  <span>{user.profileCompleted ? "100%" : "85%"}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: user.profileCompleted ? "100%" : "85%" }}
                  ></div>
                </div>
                <Button variant="outline" className="w-full mt-2">
                  {user.profileCompleted ? "Edit Profile" : "Complete Profile"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended Jobs</CardTitle>
            <CardDescription>Jobs matching your skills and experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockJobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                    <Badge variant="outline">{job.posted}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.budget}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.duration}
                    </div>
                    <span>{job.applicants} applicants</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button onClick={() => handleApplyJob(job)}>Apply Now</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                  <div className="text-sm text-gray-500">{new Date(activity.timestamp).toLocaleDateString()}</div>
                </div>
              ))}
              {activities.length === 0 && <p className="text-gray-500 text-center py-4">No recent activity</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
