"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ScheduleItem } from "@/lib/types";
import { loadItems, saveItems } from "@/lib/storage";
import { toDateKey } from "@/lib/dateUtils";

function seedItems(): ScheduleItem[] {
  const today = new Date();
  const key = toDateKey(today);
  return [
    {
      id: crypto.randomUUID(),
      title: "디자인 리뷰",
      date: key,
      time: "14:00",
      tag: "blue",
      type: "event",
      createdAt: Date.now(),
    },
    {
      id: crypto.randomUUID(),
      title: "장보기",
      date: key,
      tag: "green",
      type: "todo",
      done: false,
      createdAt: Date.now(),
    },
  ];
}

export function useEvents() {
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadItems();
    setItems(loaded.length > 0 ? loaded : seedItems());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveItems(items);
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<ScheduleItem, "id" | "createdAt">) => {
    setItems((prev) => [
      ...prev,
      { ...item, id: crypto.randomUUID(), createdAt: Date.now() },
    ]);
  }, []);

  const updateItem = useCallback((id: string, patch: Partial<ScheduleItem>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const toggleDone = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it))
    );
  }, []);

  const itemsByDate = useMemo(() => {
    const map = new Map<string, ScheduleItem[]>();
    for (const it of items) {
      const list = map.get(it.date) ?? [];
      list.push(it);
      map.set(it.date, list);
    }
    for (const list of map.values()) {
      list.sort((a, b) => (a.time ?? "99:99").localeCompare(b.time ?? "99:99"));
    }
    return map;
  }, [items]);

  return { items, itemsByDate, addItem, updateItem, removeItem, toggleDone, hydrated };
}
