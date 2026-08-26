"use client";

import { useEffect, useState } from "react";
import { ScheduleItem, TAG_LABELS, TAG_ORDER, TagKey, ItemType } from "@/lib/types";
import { formatDayLabel, toDateKey } from "@/lib/dateUtils";
import { TAG_STYLES } from "@/lib/tagStyles";
import { BottomSheet } from "./BottomSheet";

interface EventFormProps {
  open: boolean;
  date: Date;
  initial: ScheduleItem | null;
  onClose: () => void;
  onSave: (data: Omit<ScheduleItem, "id" | "createdAt">, id?: string) => void;
  onDelete?: (id: string) => void;
}

export function EventForm({ open, date, initial, onClose, onSave, onDelete }: EventFormProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<ItemType>("event");
  const [time, setTime] = useState("");
  const [tag, setTag] = useState<TagKey>("coral");

  useEffect(() => {
    if (open) {
      setTitle(initial?.title ?? "");
      setType(initial?.type ?? "event");
      setTime(initial?.time ?? "");
      setTag(initial?.tag ?? "coral");
    }
  }, [open, initial]);

  function handleSave() {
    const trimmed = title.trim();
    if (!trimmed) return;
    onSave(
      {
        title: trimmed,
        date: initial?.date ?? toDateKey(date),
        time: type === "event" ? time || undefined : undefined,
        tag,
        type,
        done: initial?.done ?? false,
      },
      initial?.id
    );
    onClose();
  }

  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="px-5 pb-2">
        <div className="flex items-center justify-between pb-1">
          <button onClick={onClose} className="text-[15px] text-ink-soft active:opacity-50">
            취소
          </button>
          <span className="text-[13px] font-semibold text-ink-soft">
            {formatDayLabel(initial ? new Date(initial.date) : date)}
          </span>
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="text-[15px] font-semibold text-coral disabled:opacity-30 active:opacity-50"
          >
            저장
          </button>
        </div>

        <div className="mt-3 flex flex-col gap-4 pb-6">
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full rounded-ios bg-white px-4 py-3.5 text-[17px] font-medium text-ink placeholder:text-ink-soft/50 shadow-card outline-none"
          />

          <div className="flex overflow-hidden rounded-ios shadow-card">
            <TypeTab
              label="일정"
              active={type === "event"}
              onClick={() => setType("event")}
            />
            <TypeTab label="할 일" active={type === "todo"} onClick={() => setType("todo")} />
          </div>

          {type === "event" && (
            <label className="flex items-center justify-between rounded-ios bg-white px-4 py-3 shadow-card">
              <span className="text-[15px] text-ink">시간</span>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-transparent text-[15px] tabular-nums text-coral outline-none"
              />
            </label>
          )}

          <div className="rounded-ios bg-white px-4 py-3.5 shadow-card">
            <span className="mb-2.5 block text-[13px] font-semibold text-ink-soft">태그</span>
            <div className="flex flex-wrap gap-2.5">
              {TAG_ORDER.map((t) => {
                const style = TAG_STYLES[t];
                const active = tag === t;
                return (
                  <button
                    key={t}
                    onClick={() => setTag(t)}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all duration-150 ${
                      active ? `${style.pillBg} ${style.pillText} scale-105` : "text-ink-soft"
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                    {TAG_LABELS[t]}
                  </button>
                );
              })}
            </div>
          </div>

          {initial && onDelete && (
            <button
              onClick={() => {
                onDelete(initial.id);
                onClose();
              }}
              className="rounded-ios bg-white py-3.5 text-[15px] font-semibold text-[#FF3B30] shadow-card active:opacity-60"
            >
              삭제
            </button>
          )}
        </div>
      </div>
    </BottomSheet>
  );
}

function TypeTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 text-[14px] font-semibold transition-colors ${
        active ? "bg-ink text-white" : "bg-white text-ink-soft"
      }`}
    >
      {label}
    </button>
  );
}
