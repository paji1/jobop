import StaffListItem from "./staff-list-item"
import type { Staff } from "@/app/dashboard/company/staff/page"

interface StaffListProps {
  staff: Staff[]
}

export default function StaffList({ staff }: StaffListProps) {
  return (
    <div className="space-y-4">
      {staff.map((member) => (
        <StaffListItem key={member.id} staff={member} />
      ))}
    </div>
  )
}
