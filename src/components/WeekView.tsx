"use client";

import { ScheduleItem } from "@/lib/types";
import {
  WEEKDAYS_KO,
  buildWeekGrid,
  formatTime12h,
  isSameDay,
  isToday,
  toDateKey,
} from "@/lib/dateUtils";
import { TAG_STYLES } from "@/lib/tagStyles";

interface WeekViewProps {
  anchor: Date;
  selectedDate: Date;
  itemsByDate: Map<string, ScheduleItem[]>;
  onSelectDay: (d: Date) => void;
}

export function WeekView({ anchor, selectedDate, itemsByDate, onSelectDay }: WeekViewProps) {
  const week = buildWeekGrid(anchor);

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-4 sm:max-w-xl sm:px-6 md:max-w-2xl md:px-8 lg:max-w-3xl">
      <div className="flex flex-col gap-2 sm:gap-2.5">
        {week.map((day) => {
          const key = toDateKey(day);
          const dayItems = itemsByDate.get(key) ?? [];
          const today = isToday(day);
          const selected = isSameDay(day, selectedDate);
          const dow = day.getDay();

          return (
            <button
              key={key}
              onClick={() => onSelectDay(day)}
              className={`flex items-start gap-3 rounded-ios px-3 py-3 text-left transition-all duration-200 ease-spring-soft sm:gap-4 sm:px-4 sm:py-4 ${
                selected ? "bg-white shadow-card" : "bg-white/40"
              }`}
            >
              <div className="flex w-11 shrink-0 flex-col items-center sm:w-12">
                <span
                  className={`text-[11px] font-semibold sm:text-[12px] ${
                    dow === 0 ? "text-[#FF3B30]" : dow === 6 ? "text-tag-blue" : "text-ink-soft"
                  }`}
                >
                  {WEEKDAYS_KO[dow]}
                </span>
                <span
                  className={`mt-0.5 grid h-8 w-8 place-items-center rounded-full text-[15px] font-sf sm:h-9 sm:w-9 sm:text-[16px] ${
                    today ? "bg-coral font-bold text-white animate-pulse-ring" : "text-ink"
                  }`}
                >
                  {day.getDate()}
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1 pt-0.5 sm:gap-1.5">
                {dayItems.length === 0 ? (
                  <span className="text-[13px] text-ink-soft/60 sm:text-[14px]">일정 없음</span>
                ) : (
                  dayItems.map((it) => <WeekItemRow key={it.id} item={it} />)
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WeekItemRow({ item }: { item: ScheduleItem }) {
  const style = TAG_STYLES[item.tag];
  return (
    <div
      className={`flex items-center gap-1.5 truncate text-[13px] sm:text-[14px] ${
        item.type === "todo" && item.done ? "text-ink-soft/50 line-through" : "text-ink"
      }`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} />
      {item.time && (
        <span className="shrink-0 tabular-nums text-ink-soft">{formatTime12h(item.time)}</span>
      )}
      <span className="truncate">{item.title}</span>
    </div>
  );
}

