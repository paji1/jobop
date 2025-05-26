import { NextResponse } from "next/server"

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

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(mockStaff)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch staff" }, { status: 500 })
  }
}
