import type { MotionProps } from "framer-motion";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatsMove(movePixels: number): MotionProps {
  return {
    initial: {
      opacity: 0,
      y: -movePixels,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: movePixels,
    },
    transition: {
      type: "tween",
      duration: 0.15,
    },
  };
}
