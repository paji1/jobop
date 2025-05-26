"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { CreditCard, DollarSign, CheckCircle } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function LoanApplicationPage() {
  const [formData, setFormData] = useState({
    amount: "",
    purpose: "",
    description: "",
    term: "",
  })
  const [loading, setLoading] = useState(false)
  const user = useStore((state) => state.user)
  const loanApplications = useStore((state) => state.loanApplications)
  const addLoanApplication = useStore((state) => state.addLoanApplication)
  const addActivity = useStore((state) => state.addActivity)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate loan application
    setTimeout(() => {
      const newApplication = {
        staffId: user?.id || "",
        amount: Number.parseFloat(formData.amount),
        purpose: formData.purpose,
        status: "pending" as const,
        appliedAt: new Date(),
      }

      addLoanApplication(newApplication)
      addActivity({
        type: "loan",
        title: "Loan Application Submitted",
        description: `Applied for $${formData.amount} loan for ${formData.purpose}`,
        timestamp: new Date(),
        userId: user?.id || "",
      })

      toast({
        title: "Application submitted!",
        description: "Your loan application has been submitted for review.",
      })

      setFormData({ amount: "", purpose: "", description: "", term: "" })
      setLoading(false)
    }, 1000)
  }

  const userApplications = loanApplications.filter((app) => app.staffId === user?.id)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Loan Application</h1>
          <p className="text-gray-600">Apply for financial support to grow your career</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Application Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Apply for Loan
              </CardTitle>
              <CardDescription>Get the financial support you need for professional development</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Loan Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="5000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose</Label>
                  <Select
                    value={formData.purpose}
                    onValueChange={(value) => setFormData({ ...formData, purpose: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equipment">Equipment Purchase</SelectItem>
                      <SelectItem value="training">Professional Training</SelectItem>
                      <SelectItem value="certification">Certification</SelectItem>
                      <SelectItem value="software">Software/Tools</SelectItem>
                      <SelectItem value="workspace">Workspace Setup</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="term">Repayment Term</Label>
                  <Select value={formData.term} onValueChange={(value) => setFormData({ ...formData, term: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select repayment term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="18">18 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Explain how this loan will help your professional growth..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Loan Info & Benefits */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Loan Benefits</CardTitle>
                <CardDescription>Why choose our professional loans?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Competitive Rates</h4>
                      <p className="text-sm text-gray-600">Starting from 3.5% APR for qualified professionals</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Quick Approval</h4>
                      <p className="text-sm text-gray-600">Get approved within 24-48 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Flexible Terms</h4>
                      <p className="text-sm text-gray-600">Choose repayment terms that work for you</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">No Prepayment Penalty</h4>
                      <p className="text-sm text-gray-600">Pay off your loan early without extra fees</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loan Calculator</CardTitle>
                <CardDescription>Estimate your monthly payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Amount</Label>
                      <div className="text-lg font-semibold">${formData.amount || "0"}</div>
                    </div>
                    <div>
                      <Label className="text-sm">Term</Label>
                      <div className="text-lg font-semibold">{formData.term || "0"} months</div>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Estimated Monthly Payment:</span>
                      <span className="text-xl font-bold text-blue-600">
                        $
                        {formData.amount && formData.term
                          ? Math.round((Number.parseFloat(formData.amount) * 1.035) / Number.parseInt(formData.term))
                          : "0"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">*Based on 3.5% APR</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Application History */}
        {userApplications.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Applications</CardTitle>
              <CardDescription>Track your loan application status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userApplications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <DollarSign className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium">${application.amount.toLocaleString()}</h4>
                        <p className="text-sm text-gray-600">{application.purpose}</p>
                        <p className="text-xs text-gray-500">Applied on {application.appliedAt.toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        application.status === "approved"
                          ? "default"
                          : application.status === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
