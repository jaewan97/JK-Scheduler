"use client";

import { formatMonthTitle } from "@/lib/dateUtils";
import { SegmentedControl } from "./SegmentedControl";

interface HeaderProps {
  anchor: Date;
  view: "month" | "week";
  onViewChange: (v: "month" | "week") => void;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export function Header({ anchor, view, onViewChange, onPrev, onNext, onToday }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto max-w-md px-5 pb-3 pt-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onToday}
            className="text-[13px] font-semibold text-coral active:opacity-50"
          >
            오늘
          </button>
          <div className="flex items-center gap-1">
            <button
              aria-label="이전"
              onClick={onPrev}
              className="grid h-8 w-8 place-items-center rounded-full text-ink-soft transition active:scale-90 active:bg-black/5"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              aria-label="다음"
              onClick={onNext}
              className="grid h-8 w-8 place-items-center rounded-full text-ink-soft transition active:scale-90 active:bg-black/5"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
        </div>
        <div className="mt-1 flex items-end justify-between">
          <div>
            <p className="text-[13px] font-semibold text-coral">JK하루</p>
            <h1 className="font-sf text-[34px] font-bold leading-tight tracking-tight text-ink">
              {formatMonthTitle(anchor)}
            </h1>
          </div>
        </div>
        <div className="mt-3">
          <SegmentedControl
            value={view}
            onChange={(v) => onViewChange(v as "month" | "week")}
            options={[
              { value: "month", label: "월간" },
              { value: "week", label: "주간" },
            ]}
          />
        </div>
      </div>
    </header>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="10"
      height="16"
      viewBox="0 0 10 16"
      fill="none"
      className={direction === "right" ? "rotate-180" : ""}
    >
      <path
        d="M9 1L1.5 8L9 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
