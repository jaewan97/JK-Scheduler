"use client";

import { useEffect } from "react";
import { ScheduleItem } from "@/lib/types";
import { formatTime12h } from "@/lib/dateUtils";
import { TAG_STYLES } from "@/lib/tagStyles";

interface AlarmToastProps {
  item: ScheduleItem | null;
  onDismiss: () => void;
  onComplete: (id: string) => void;
}

export function AlarmToast({ item, onDismiss, onComplete }: AlarmToastProps) {
  useEffect(() => {
    if (!item) return;
    const timer = window.setTimeout(onDismiss, 8000);
    return () => window.clearTimeout(timer);
  }, [item, onDismiss]);

  if (!item) return null;
  const style = TAG_STYLES[item.tag];

  return (
    <div className="fixed inset-x-0 top-0 z-[60] flex justify-center px-3 pt-3">
      <div className="w-full max-w-md animate-[bannerDown_0.4s_cubic-bezier(0.34,1.56,0.64,1)] rounded-2xl bg-white/95 px-4 py-3 shadow-sheet backdrop-blur-xl sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        <div className="flex items-start gap-3">
          <span
            className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${style.dot} animate-pulse-ring`}
          />
          <button
            onClick={onDismiss}
            className="flex min-w-0 flex-1 flex-col items-start text-left"
          >
            <span className="text-[11px] font-semibold text-ink-soft">
              JK하루{item.time ? ` · ${formatTime12h(item.time)}` : ""}
            </span>
            <span className="truncate text-[15px] font-semibold text-ink">{item.title}</span>
          </button>
          <div className="flex shrink-0 items-center gap-2">
            {item.type === "todo" && (
              <button
                onClick={() => {
                  onComplete(item.id);
                  onDismiss();
                }}
                className="rounded-full bg-coral px-2.5 py-1 text-[12px] font-semibold text-white active:opacity-70"
              >
                완료
              </button>
            )}
            <button
              onClick={onDismiss}
              aria-label="닫기"
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-ink-soft/60 active:bg-black/5"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M1 1L9 9M9 1L1 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
