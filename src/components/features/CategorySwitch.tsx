import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import "./CategorySwitch.css"; 

type Category<T extends string> = {
  value: T;
  label: string;
};

type CategorySwitchProps<T extends string> = {
  categories: readonly Category<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
};

export function CategorySwitch<T extends string>({
  categories,
  value,
  onChange,
  ariaLabel = "Select category",
}: CategorySwitchProps<T>) {
  const switchId = useId();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="category-switch"
      role="group"
      aria-label={ariaLabel}
    >
      {categories.map((category) => {
        const isActive = value === category.value;

        return (
          <button
            key={category.value}
            type="button"
            className={`category-switch__button ${
              isActive ? "is-active" : ""
            }`}
            onClick={() => onChange(category.value)}
            aria-pressed={isActive}
          >
            {isActive && (
              <motion.span
                className="category-switch__indicator"
                layoutId={`${switchId}-active-indicator`}
                transition={{
                  layout: {
                    duration: shouldReduceMotion ? 0 : 0.32,
                    ease: [0.4, 0, 0.2, 1],
                  },
                }}
                aria-hidden="true"
              />
            )}
            <span className="category-switch__label">{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}
