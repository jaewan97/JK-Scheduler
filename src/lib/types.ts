export type TagKey = "coral" | "blue" | "green" | "purple" | "yellow" | "pink";

export type ItemType = "event" | "todo";

export interface ScheduleItem {
  id: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  /** HH:mm, optional */
  time?: string;
  tag: TagKey;
  type: ItemType;
  done?: boolean;
  memo?: string;
  createdAt: number;
}

export const TAG_LABELS: Record<TagKey, string> = {
  coral: "중요",
  blue: "업무",
  green: "개인",
  purple: "약속",
  yellow: "기념일",
  pink: "건강",
};

export const TAG_ORDER: TagKey[] = ["coral", "blue", "green", "purple", "yellow", "pink"]
export type ViewMode = "month" | "week";
