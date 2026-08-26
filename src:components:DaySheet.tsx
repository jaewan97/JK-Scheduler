"use client";

import { ScheduleItem } from "@/lib/types";
import { formatDayLabel, formatTime12h } from "@/lib/dateUtils";
import { TAG_STYLES } from "@/lib/tagStyles";
import { BottomSheet } from "./BottomSheet";

interface DaySheetProps {
  open: boolean;
  date: Date;
  items: ScheduleItem[];
  onClose: () => void;
  onAdd: () => void;
  onEdit: (item: ScheduleItem) => void;
  onToggleDone: (id: string) => void;
  onDelete: (id: string) => void;
}

export function DaySheet({
  open,
  date,
  items,
  onClose,
  onAdd,
  onEdit,
  onToggleDone,
  onDelete,
}: DaySheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="max-h-[70vh] overflow-y-auto px-5">
        <div className="flex items-center justify-between pb-4">
          <h2 className="font-sf text-[20px] font-bold text-ink">{formatDayLabel(date)}</h2>
          <button
            onClick={onAdd}
            className="grid h-8 w-8 place-items-center rounded-full bg-coral text-white shadow-fab transition active:scale-90"
            aria-label="일정 추가"
          >
            <PlusIcon />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <p className="text-[15px] font-medium text-ink-soft">아직 등록된 일정이 없어요</p>
            <p className="text-[13px] text-ink-soft/70">
              오른쪽 위 + 버튼으로 새 일정을 추가해보세요
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2 pb-6">
            {items.map((item) => (
              <li key={item.id}>
                <ItemRow
                  item={item}
                  onEdit={() => onEdit(item)}
                  onToggleDone={() => onToggleDone(item.id)}
                  onDelete={() => onDelete(item.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </BottomSheet>
  );
}

function ItemRow({
  item,
  onEdit,
  onToggleDone,
  onDelete,
}: {
  item: ScheduleItem;
  onEdit: () => void;
  onToggleDone: () => void;
  onDelete: () => void;
}) {
  const style = TAG_STYLES[item.tag];
  const isDone = item.type === "todo" && item.done;

  return (
    <div
      className={`flex items-center gap-3 rounded-ios bg-white px-3.5 py-3 shadow-card transition-opacity ${
        isDone ? "opacity-60" : ""
      }`}
    >
      {item.type === "todo" ? (
        <button
          onClick={onToggleDone}
          aria-label={isDone ? "완료 취소" : "완료로 표시"}
          className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition active:scale-90 ${
            isDone ? `${style.bg} border-transparent` : "border-black/15"
          }`}
        >
          {isDone && (
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path
                d="M1 5L4.2 8.2L11 1.2"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      ) : (
        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${style.dot}`} />
      )}

      <button onClick={onEdit} className="flex min-w-0 flex-1 flex-col items-start text-left">
        <span
          className={`truncate text-[15px] font-medium text-ink ${
            isDone ? "line-through text-ink-soft" : ""
          }`}
        >
          {item.title}
        </span>
        <span className="flex items-center gap-1.5 text-[12px] text-ink-soft">
          {item.time && <span className="tabular-nums">{formatTime12h(item.time)}</span>}
          <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${style.pillBg} ${style.pillText}`}>
            {item.type === "todo" ? "할 일" : "일정"}
          </span>
        </span>
      </button>

      <button
        onClick={onDelete}
        aria-label="삭제"
        className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-ink-soft/50 transition active:scale-90 active:bg-black/5"
      >
        <TrashIcon />
      </button>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1V13M1 7H13" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M2 4H12M5.5 4V2.5C5.5 2.22386 5.72386 2 6 2H8C8.27614 2 8.5 2.22386 8.5 2.5V4M6 6.5V10M8 6.5V10M3 4L3.5 11.5C3.5 11.7761 3.72386 12 4 12H10C10.2761 12 10.5 11.7761 10.5 11.5L11 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
