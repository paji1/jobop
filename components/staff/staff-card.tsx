"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Clock, TrendingUp, MessageCircle } from "lucide-react"
import { useStore } from "@/lib/store"
import type { Staff } from "@/app/dashboard/company/staff/page"

interface StaffCardProps {
  staff: Staff
}

export default function StaffCard({ staff }: StaffCardProps) {
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
    <Card className="h-full hover:shadow-lg dark:hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={staff.avatar || `/placeholder.svg?height=64&width=64`} />
            <AvatarFallback className="text-lg dark:bg-gray-700 dark:text-gray-200">
              {staff.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate dark:text-white">{staff.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">{staff.rating}</span>
              </div>
              <span>•</span>
              <span>{staff.experience} years</span>
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="truncate">{staff.location}</span>
            </div>
          </div>
          <Badge
            variant={
              staff.availability === "Available" ? "default" : staff.availability === "Busy" ? "secondary" : "outline"
            }
            className="text-xs"
          >
            {staff.availability}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Bio */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{staff.bio}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {staff.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-300">
              {skill}
            </Badge>
          ))}
          {staff.skills.length > 4 && (
            <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-400">
              +{staff.skills.length - 4}
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-gray-600 dark:text-gray-400">{staff.successRate}% success</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="text-gray-600 dark:text-gray-400">{staff.responseTime}</span>
          </div>
        </div>

        {/* Rate and Projects */}
        <div className="flex justify-between items-center pt-2 border-t dark:border-gray-700">
          <div>
            <div className="text-2xl font-bold dark:text-white">${staff.hourlyRate}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">per hour</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium dark:text-white">{staff.completedProjects}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">projects</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={handleContact}>
            <MessageCircle className="h-4 w-4 mr-1" />
            Contact
          </Button>
          <Button size="sm" className="flex-1" onClick={handleHire} disabled={staff.availability !== "Available"}>
            {staff.availability === "Available" ? "Hire Now" : "Unavailable"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
