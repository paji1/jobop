import { NextResponse } from "next/server"

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
    description:
      "We are looking for an experienced React developer to join our team and help build our next-generation web application.",
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
    description:
      "Join our growing startup as a full stack engineer and help us scale our platform to serve millions of users.",
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
    description:
      "Create beautiful and intuitive user experiences for our client projects across web and mobile platforms.",
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(mockJobs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}
