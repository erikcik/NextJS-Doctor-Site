import * as React from "react"
import { cn } from "~/lib/utils"

const Toolbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1 rounded-md border bg-black p-1 text-white",
      className
    )}
    {...props}
  />
))
Toolbar.displayName = "Toolbar"

export { Toolbar } 