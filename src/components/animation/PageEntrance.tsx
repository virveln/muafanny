import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type PageEntranceProps = {
  children: ReactNode;
  animate?: boolean;
};

export function PageEntrance({ children, animate = true }: PageEntranceProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="page-entrance"
      initial={prefersReducedMotion || !animate ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.72,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
