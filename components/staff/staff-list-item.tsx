"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Clock, TrendingUp, MessageCircle, Globe, Languages } from "lucide-react"
import { useStore } from "@/lib/store"
import type { Staff } from "@/app/dashboard/company/staff/page"

interface StaffListItemProps {
  staff: Staff
}

export default function StaffListItem({ staff }: StaffListItemProps) {
  const addActivity = useStore((state) => state.addActivity)
  const user = useStore((state) => state.user)

  const handleContact = () => {
    addActivity({
      type: "match",
      title: "Staff Contacted",
      description: `Contacted ${staff.name} for potential collaboration`,
      timestamp: new Date(),
      userId: user?.id || "",
    })
  }

  const handleHire = () => {
    addActivity({
      type: "match",
      title: "Staff Hired",
      description: `Hired ${staff.name} for your project`,
      timestamp: new Date(),
      userId: user?.id || "",
    })
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-start space-x-4 flex-1">
            <Avatar className="h-20 w-20">
              <AvatarImage src={staff.avatar || `/placeholder.svg?height=80&width=80`} />
              <AvatarFallback className="text-xl">
                {staff.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-xl">{staff.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{staff.rating}</span>
                      <span className="ml-1">rating</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span>{staff.successRate}% success rate</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-blue-500 mr-1" />
                      <span>{staff.responseTime} response</span>
                    </div>
                  </div>
                </div>
                <Badge
                  variant={
                    staff.availability === "Available"
                      ? "default"
                      : staff.availability === "Busy"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {staff.availability}
                </Badge>
              </div>

              <p className="text-gray-600 mb-3 line-clamp-2">{staff.bio}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-3">
                {staff.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{staff.location}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  <span>{staff.timezone}</span>
                </div>
                <div className="flex items-center">
                  <Languages className="h-4 w-4 mr-1" />
                  <span>{staff.languages?.join(", ")}</span>
                </div>
                <div>
                  <span className="font-medium">{staff.completedProjects}</span> projects completed
                </div>
              </div>
            </div>
          </div>

          {/* Rate and Actions */}
          <div className="text-right space-y-4">
            <div>
              <div className="text-3xl font-bold">${staff.hourlyRate}</div>
              <div className="text-sm text-gray-500">per hour</div>
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={handleContact}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <Button className="w-full" onClick={handleHire} disabled={staff.availability !== "Available"}>
                {staff.availability === "Available" ? "Hire Now" : "Unavailable"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
