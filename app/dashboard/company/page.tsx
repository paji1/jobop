"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Users, TrendingUp, MapPin, Briefcase } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import Link from "next/link"

const mockStaff = [
  {
    id: "1",
    name: "Sarah Johnson",
    rating: 4.9,
    experience: 8,
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    location: "San Francisco, CA",
    hourlyRate: 85,
    availability: "Available",
    completedProjects: 127,
  },
  {
    id: "2",
    name: "Michael Chen",
    rating: 4.8,
    experience: 6,
    skills: ["Python", "Django", "PostgreSQL", "Docker"],
    location: "New York, NY",
    hourlyRate: 75,
    availability: "Available",
    completedProjects: 89,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    rating: 4.7,
    experience: 5,
    skills: ["UI/UX Design", "Figma", "React", "CSS"],
    location: "Austin, TX",
    hourlyRate: 70,
    availability: "Busy",
    completedProjects: 156,
  },
]

export default function CompanyDashboard() {
  const user = useStore((state) => state.user)
  const activities = useStore((state) => state.activities)
  const addActivity = useStore((state) => state.addActivity)
  const router = useRouter()

  useEffect(() => {
    if (!user || user.role !== "company") {
      router.push("/auth/login")
    }
  }, [user, router])

  const handleHireStaff = (staff: (typeof mockStaff)[0]) => {
    addActivity({
      type: "match",
      title: "Staff Hired",
      description: `You hired ${staff.name} for your project`,
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
          <h1 className="text-3xl font-bold">Company Dashboard</h1>
          <p className="text-gray-600">Find and hire the best talent for your projects</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hired Staff</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">+5 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">+1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">From hired staff</p>
            </CardContent>
          </Card>
        </div>

        {/* Top Rated Staff */}
        <Card>
          <CardHeader>
            <CardTitle>Top Rated Staff</CardTitle>
            <CardDescription>Discover highly-rated professionals perfect for your projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStaff.map((staff) => (
                <div key={staff.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                      <AvatarFallback>
                        {staff.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{staff.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          {staff.rating}
                        </div>
                        <span>•</span>
                        <span>{staff.experience} years exp</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {staff.location}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {staff.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {staff.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{staff.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">${staff.hourlyRate}/hr</div>
                    <Badge variant={staff.availability === "Available" ? "default" : "secondary"} className="mb-2">
                      {staff.availability}
                    </Badge>
                    <div>
                      <Button onClick={() => handleHireStaff(staff)} disabled={staff.availability !== "Available"}>
                        {staff.availability === "Available" ? "Hire Now" : "Contact"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Link href="/dashboard/company/staff">
                <Button>Find More Staff</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
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
