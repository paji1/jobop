'use client'

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type Meteor = {
  left: string
  animationDelay: string
  animationDuration: string
}

export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number
  className?: string
}) => {
  const [meteors, setMeteors] = useState<Meteor[] | null>(null)

  useEffect(() => {
    const generated = Array.from({ length: number }, () => ({
      left: `${Math.floor(Math.random() * 800 - 400)}px`, // -400 to 400
      animationDelay: `${(Math.random() * (0.8 - 0.2) + 0.2).toFixed(3)}s`,
      animationDuration: `${Math.floor(Math.random() * (10 - 2) + 2)}s`,
    }))
    setMeteors(generated)
  }, [number])

  if (!meteors) return null

  return (
    <>
      {meteors.map((meteor, idx) => (
        <span
          key={`meteor-${idx}`}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className,
          )}
          style={{
            top: 0,
            left: meteor.left,
            animationDelay: meteor.animationDelay,
            animationDuration: meteor.animationDuration,
          }}
        />
      ))}
    </>
  )
}
