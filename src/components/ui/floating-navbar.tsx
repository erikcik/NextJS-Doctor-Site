"use client";
import React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "~/lib/utils";

export const FloatingNav = ({
  navItems,
  children,
}: {
  navItems: Array<{ name: string; link: string }>;
  children: React.ReactNode;
}) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = React.useState(true);
  const [hasScrolled, setHasScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious();

    setVisible(current < previous! || current < 150);
    setHasScrolled(current > 150);
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "fixed inset-x-0 top-0 z-[100] w-full bg-white bg-opacity-80 backdrop-blur-lg",
          hasScrolled && "border-b border-gray-200 shadow-sm",
        )}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
