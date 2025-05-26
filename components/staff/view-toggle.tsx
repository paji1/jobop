"use client"

import { Button } from "@/components/ui/button"
import { Grid, List } from "lucide-react"

interface ViewToggleProps {
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

export default function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center border rounded-lg p-1">
      <Button
        variant={viewMode === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("grid")}
        className="h-8 w-8 p-0"
      >
        <Grid className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("list")}
        className="h-8 w-8 p-0"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  )
}
