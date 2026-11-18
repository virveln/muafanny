import type { Variants } from "motion/react";

export const staggeredGroupVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.12,
    },
  },
};

export const staggeredItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const softRevealVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.82,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const serviceCardTextGroupVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.08,
    },
  },
};

export const serviceCardTextVariants: Variants = {
  hidden: { y: 10 },
  visible: {
    y: 0,
    transition: {
      duration: 0.62,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const bookingTermVariants: Variants = {
  hidden: { opacity: 0.7, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};
