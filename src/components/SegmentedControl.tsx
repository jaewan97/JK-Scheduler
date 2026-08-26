"use client";

interface SegmentedControlProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  const activeIndex = options.findIndex((o) => o.value === value);

  return (
    <div className="relative flex rounded-full bg-black/[0.06] p-1 font-sf">
      <div
        className="absolute inset-y-1 rounded-full bg-white shadow-card transition-transform duration-300 ease-spring-soft"
        style={{
          width: `calc(${100 / options.length}% - 4px)`,
          transform: `translateX(calc(${activeIndex * 100}% + ${activeIndex * 4}px))`,
        }}
      />
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`relative z-10 flex-1 rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors ${
            value === opt.value ? "text-ink" : "text-ink-soft"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
