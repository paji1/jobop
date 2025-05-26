"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface StaffSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  placeholder?: string
}

export default function StaffSearch({
  searchQuery,
  onSearchChange,
  placeholder = "Search staff...",
}: StaffSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  )
}
