"use client";

import { ScheduleItem } from "@/lib/types";
import {
  WEEKDAYS_KO,
  buildMonthGrid,
  isSameDay,
  isToday,
  toDateKey,
} from "@/lib/dateUtils";
import { TAG_STYLES } from "@/lib/tagStyles";

interface MonthViewProps {
  anchor: Date;
  selectedDate: Date;
  itemsByDate: Map<string, ScheduleItem[]>;
  onSelectDay: (d: Date) => void;
}

const MAX_VISIBLE_ITEMS = 3;

export function MonthView({ anchor, selectedDate, itemsByDate, onSelectDay }: MonthViewProps) {
  const grid = buildMonthGrid(anchor);
  const currentMonth = anchor.getMonth();

  return (
    <div className="mx-auto w-full max-w-md px-2 pb-4 sm:max-w-xl sm:px-4 md:max-w-2xl md:px-6 lg:max-w-3xl lg:px-8 xl:max-w-4xl xl:px-10">
      <div className="grid grid-cols-7 px-1 pb-2">
        {WEEKDAYS_KO.map((w, i) => (
          <div
            key={w}
            className={`text-center text-[11px] font-semibold sm:text-[13px] md:text-[14px] lg:text-[15px] ${
              i === 0 ? "text-[#FF3B30]" : i === 6 ? "text-tag-blue" : "text-ink-soft"
            }`}
          >
            {w}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-x-[2px] gap-y-[2px]">
        {grid.map((day) => {
          const inMonth = day.getMonth() === currentMonth;
          const key = toDateKey(day);
          const dayItems = itemsByDate.get(key) ?? [];
          const today = isToday(day);
          const selected = isSameDay(day, selectedDate);
          const dow = day.getDay();
          const visibleItems = dayItems.slice(0, MAX_VISIBLE_ITEMS);
          const hiddenCount = dayItems.length - visibleItems.length;

          return (
            <button
              key={key}
              onClick={() => onSelectDay(day)}
              className={`flex min-h-[74px] flex-col items-center gap-[3px] rounded-lg pb-1 pt-1 outline-none transition-colors duration-150 sm:min-h-[92px] sm:gap-1 sm:pb-1.5 sm:pt-1.5 md:min-h-[108px] lg:min-h-[124px] lg:pb-2 lg:pt-2 xl:min-h-[136px] ${
                selected ? "bg-white shadow-card" : ""
              }`}
            >
              <span
                className={[
                  "relative grid h-7 w-7 shrink-0 place-items-center rounded-full text-[14px] font-sf transition-all duration-200 sm:h-8 sm:w-8 sm:text-[15px] md:h-9 md:w-9 md:text-[16px] lg:h-10 lg:w-10 lg:text-[18px]",
                  today
                    ? "font-bold text-white bg-coral animate-pulse-ring"
                    : inMonth
                    ? dow === 0
                      ? "text-[#FF3B30]"
                      : dow === 6
                      ? "text-tag-blue"
                      : "text-ink"
                    : "text-ink-soft/40",
                ].join(" ")}
              >
                {day.getDate()}
              </span>

              <span className="flex w-full flex-1 flex-col gap-[2px] px-[3px] sm:gap-1 sm:px-1 lg:gap-1.5 lg:px-1.5">
                {visibleItems.map((it) => {
                  const style = TAG_STYLES[it.tag];
                  const done = it.type === "todo" && it.done;
                  return (
                    <span
                      key={it.id}
                      className={`w-full truncate rounded-[4px] px-[4px] py-[1px] text-left text-[9px] font-medium leading-[12px] sm:rounded-[5px] sm:px-1.5 sm:py-[2px] sm:text-[11px] sm:leading-[15px] md:text-[12px] md:leading-[16px] lg:rounded-[6px] lg:px-2 lg:text-[13px] lg:leading-[18px] ${
                        style.pillBg
                      } ${style.pillText} ${done ? "line-through opacity-45" : ""}`}
                    >
                      {it.title}
                    </span>
                  );
                })}
                {hiddenCount > 0 && (
                  <span className="w-full truncate px-[4px] text-left text-[9px] font-semibold text-ink-soft sm:px-1.5 sm:text-[11px] md:text-[12px] lg:px-2 lg:text-[13px]">
                    +{hiddenCount}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
