import StaffCard from "./staff-card"
import type { Staff } from "@/app/dashboard/company/staff/page"

interface StaffGridProps {
  staff: Staff[]
}

export default function StaffGrid({ staff }: StaffGridProps) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {staff.map((member) => (
        <StaffCard key={member.id} staff={member} />
      ))}
    </div>
  )
}
