import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { staffId, amount, purpose, term } = body

    // Simulate loan application processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const loanApplication = {
      id: Date.now().toString(),
      staffId,
      amount: Number.parseFloat(amount),
      purpose,
      term: Number.parseInt(term),
      status: "pending",
      appliedAt: new Date(),
      interestRate: 3.5,
      monthlyPayment: Math.round((Number.parseFloat(amount) * 1.035) / Number.parseInt(term)),
    }

    return NextResponse.json({ success: true, application: loanApplication })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to process loan application" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Mock loan applications for demo
    const mockApplications = [
      {
        id: "1",
        staffId: "1",
        amount: 5000,
        purpose: "Equipment Purchase",
        status: "approved",
        appliedAt: new Date("2024-01-15"),
        interestRate: 3.5,
      },
      {
        id: "2",
        staffId: "1",
        amount: 2500,
        purpose: "Professional Training",
        status: "pending",
        appliedAt: new Date("2024-01-20"),
        interestRate: 3.5,
      },
    ]

    return NextResponse.json(mockApplications)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch loan applications" }, { status: 500 })
  }
}
