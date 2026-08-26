import { ScheduleItem } from "./types";

const STORAGE_KEY = "ios-scheduler:items:v1";

export function loadItems(): ScheduleItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as ScheduleItem[];
  } catch {
    return [];
  }
}

export function saveItems(items: ScheduleItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage full or unavailable — fail silently, app still works in-memory
  }
}
