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

export function MonthView({ anchor, selectedDate, itemsByDate, onSelectDay }: MonthViewProps) {
  const grid = buildMonthGrid(anchor);
  const currentMonth = anchor.getMonth();

  return (
    <div className="mx-auto max-w-md px-3 pb-4">
      <div className="grid grid-cols-7 px-2 pb-2">
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
      <div className="grid grid-cols-7 gap-y-1">
        {grid.map((day) => {
          const inMonth = day.getMonth() === currentMonth;
          const key = toDateKey(day);
          const dayItems = itemsByDate.get(key) ?? [];
          const today = isToday(day);
          const selected = isSameDay(day, selectedDate);
          const dow = day.getDay();

          return (
            <button
              key={key}
              onClick={() => onSelectDay(day)}
              className="flex flex-col items-center gap-1 py-1 outline-none"
            >
              <span
                className={[
                  "relative grid h-8 w-8 place-items-center rounded-full text-[15px] font-sf transition-all duration-200",
                  today
                    ? "font-bold text-white bg-coral animate-pulse-ring"
                    : selected
                    ? "bg-ink text-white font-semibold"
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
              <span className="flex h-3 items-center gap-0.5">
                {dayItems.length > 0 &&
                  dayItems
                    .slice(0, 3)
                    .map((it) => (
                      <span
                        key={it.id}
                        className={`h-[5px] w-[5px] rounded-full ${TAG_STYLES[it.tag].dot} ${
                          it.type === "todo" && it.done ? "opacity-30" : ""
                        }`}
                      />
                    ))}
                {dayItems.length > 3 && (
                  <span className="text-[9px] font-semibold text-ink-soft">
                    +{dayItems.length - 3}
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
