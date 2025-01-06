"use client";

import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import  { MouseEvent as ReactMouseEvent } from "react";
import { cn } from "~/lib/utils";

export const CardSpotlight = ({
  children,
  radius = 400,
  color = "rgba(14, 165, 233, 0.15)",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group/spotlight relative rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none",
        className
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 70%
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 70%
            )
          `,
        }}
      />
      {children}
    </div>
  );
}; 