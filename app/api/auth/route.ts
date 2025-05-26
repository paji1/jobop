import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, action } = body

    // Simulate authentication logic
    if (action === "login") {
      // In a real app, verify credentials against database
      const user = {
        id: "1",
        email,
        name: email.split("@")[0],
        role: email.includes("company") ? "company" : "staff",
        rating: 4.8,
        experience: 5,
      }

      return NextResponse.json({ success: true, user })
    }

    if (action === "register") {
      // In a real app, create user in database
      const newUser = {
        id: Date.now().toString(),
        ...body,
      }

      return NextResponse.json({ success: true, user: newUser })
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
