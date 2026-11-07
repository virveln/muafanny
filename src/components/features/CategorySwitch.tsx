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
  return (
    <div
      className="portfolio-category-switch"
      role="group"
      aria-label={ariaLabel}
    >
      {categories.map((category) => {
        const isActive = value === category.value;

        return (
          <button
            key={category.value}
            type="button"
            className={`portfolio-category-switch__button ${
              isActive ? "is-active" : ""
            }`}
            onClick={() => onChange(category.value)}
            aria-pressed={isActive}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
