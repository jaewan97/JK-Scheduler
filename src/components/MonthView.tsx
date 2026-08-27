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
    <div className="mx-auto max-w-md px-2 pb-4">
      <div className="grid grid-cols-7 px-1 pb-2">
        {WEEKDAYS_KO.map((w, i) => (
          <div
            key={w}
            className={`text-center text-[11px] font-semibold ${
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
              className={`flex min-h-[74px] flex-col items-center gap-[3px] rounded-lg pb-1 pt-1 outline-none transition-colors duration-150 ${
                selected ? "bg-white shadow-card" : ""
              }`}
            >
              <span
                className={[
                  "relative grid h-7 w-7 shrink-0 place-items-center rounded-full text-[14px] font-sf transition-all duration-200",
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

              <span className="flex w-full flex-1 flex-col gap-[2px] px-[3px]">
                {visibleItems.map((it) => {
                  const style = TAG_STYLES[it.tag];
                  const done = it.type === "todo" && it.done;
                  return (
                    <span
                      key={it.id}
                      className={`w-full truncate rounded-[4px] px-[4px] py-[1px] text-left text-[9px] font-medium leading-[12px] ${
                        style.pillBg
                      } ${style.pillText} ${done ? "line-through opacity-45" : ""}`}
                    >
                      {it.title}
                    </span>
                  );
                })}
                {hiddenCount > 0 && (
                  <span className="w-full truncate px-[4px] text-left text-[9px] font-semibold text-ink-soft">
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
