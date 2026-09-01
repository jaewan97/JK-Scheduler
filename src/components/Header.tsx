"use client";
import { Dispatch, SetStateAction } from "react";
import { ViewMode } from "@/lib/types";
import { AlarmPermission } from "@/lib/alarm";
import { formatMonthTitle } from "@/lib/dateUtils";
import { SegmentedControl } from "./SegmentedControl";

interface HeaderProps {
  anchor: Date;
  view: ViewMode;
  onViewChange: Dispatch<SetStateAction<ViewMode>>;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  notificationPermission: AlarmPermission;
  onRequestNotification: () => void;
}

export function Header({
  anchor,
  view,
  onViewChange,
  onPrev,
  onNext,
  onToday,
  notificationPermission,
  onRequestNotification,
}: HeaderProps) {
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
            {notificationPermission !== "unsupported" && (
              <button
                aria-label="알림 설정"
                onClick={onRequestNotification}
                className="grid h-8 w-8 place-items-center rounded-full text-ink-soft transition active:scale-90 active:bg-black/5"
              >
                <BellIcon active={notificationPermission === "granted"} />
              </button>
            )}
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

function BellIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5C6.067 1.5 4.5 3.067 4.5 5V7.2C4.5 7.68 4.33 8.14 4.02 8.5L3 9.7C2.6 10.17 2.93 10.9 3.55 10.9H12.45C13.07 10.9 13.4 10.17 13 9.7L11.98 8.5C11.67 8.14 11.5 7.68 11.5 7.2V5C11.5 3.067 9.933 1.5 8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        fill={active ? "currentColor" : "none"}
      />
      <path
        d="M6.3 12.6C6.55 13.25 7.22 13.7 8 13.7C8.78 13.7 9.45 13.25 9.7 12.6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
