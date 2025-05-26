"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import type { FilterState, Staff } from "@/app/dashboard/company/staff/page"

interface StaffFiltersProps {
  filters: FilterState
  onFilterChange: (filters: Partial<FilterState>) => void
  staffData: Staff[]
}

const allSkills = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Java",
  "AWS",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "PostgreSQL",
  "MongoDB",
  "Django",
  "Spring Boot",
  "Flutter",
  "iOS",
  "Android",
  "UI/UX Design",
  "Figma",
  "DevOps",
  "Terraform",
]

const availabilityOptions = ["Available", "Busy", "Unavailable"]

export default function StaffFilters({ filters, onFilterChange, staffData }: StaffFiltersProps) {
  const handleSkillToggle = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter((s) => s !== skill)
      : [...filters.skills, skill]
    onFilterChange({ skills: newSkills })
  }

  const handleAvailabilityToggle = (availability: string) => {
    const newAvailability = filters.availability.includes(availability)
      ? filters.availability.filter((a) => a !== availability)
      : [...filters.availability, availability]
    onFilterChange({ availability: newAvailability })
  }

  const removeSkill = (skill: string) => {
    onFilterChange({ skills: filters.skills.filter((s) => s !== skill) })
  }

  return (
    <div className="space-y-6">
      {/* Skills Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Skills</CardTitle>
          <CardDescription>Filter by required skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {filters.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {filters.skills.map((skill) => (
                <Badge key={skill} variant="default" className="text-xs">
                  {skill}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                    onClick={() => removeSkill(skill)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
          <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
            {allSkills.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={skill}
                  checked={filters.skills.includes(skill)}
                  onCheckedChange={() => handleSkillToggle(skill)}
                />
                <Label htmlFor={skill} className="text-sm font-normal cursor-pointer">
                  {skill}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Location</CardTitle>
          <CardDescription>Filter by location</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Enter city or state"
            value={filters.location}
            onChange={(e) => onFilterChange({ location: e.target.value })}
          />
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Minimum Rating</CardTitle>
          <CardDescription>Filter by minimum rating</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-2">
            <Slider
              value={[filters.minRating]}
              onValueChange={(value) => onFilterChange({ minRating: value[0] })}
              max={5}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>
          <div className="text-center text-sm text-gray-600">
            {filters.minRating > 0 ? `${filters.minRating}+ stars` : "Any rating"}
          </div>
        </CardContent>
      </Card>

      {/* Hourly Rate Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hourly Rate</CardTitle>
          <CardDescription>Filter by maximum hourly rate</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-2">
            <Slider
              value={[filters.maxRate]}
              onValueChange={(value) => onFilterChange({ maxRate: value[0] })}
              max={200}
              min={20}
              step={5}
              className="w-full"
            />
          </div>
          <div className="text-center text-sm text-gray-600">Up to ${filters.maxRate}/hour</div>
        </CardContent>
      </Card>

      {/* Experience Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Experience</CardTitle>
          <CardDescription>Minimum years of experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-2">
            <Slider
              value={[filters.minExperience]}
              onValueChange={(value) => onFilterChange({ minExperience: value[0] })}
              max={15}
              min={0}
              step={1}
              className="w-full"
            />
          </div>
          <div className="text-center text-sm text-gray-600">
            {filters.minExperience > 0 ? `${filters.minExperience}+ years` : "Any experience"}
          </div>
        </CardContent>
      </Card>

      {/* Availability Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Availability</CardTitle>
          <CardDescription>Filter by availability status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {availabilityOptions.map((availability) => (
            <div key={availability} className="flex items-center space-x-2">
              <Checkbox
                id={availability}
                checked={filters.availability.includes(availability)}
                onCheckedChange={() => handleAvailabilityToggle(availability)}
              />
              <Label htmlFor={availability} className="text-sm font-normal cursor-pointer">
                {availability}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sort By */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sort By</CardTitle>
          <CardDescription>Order results by</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={filters.sortBy} onValueChange={(value) => onFilterChange({ sortBy: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="experience">Most Experience</SelectItem>
              <SelectItem value="rate-low">Lowest Rate</SelectItem>
              <SelectItem value="rate-high">Highest Rate</SelectItem>
              <SelectItem value="projects">Most Projects</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  )
}
