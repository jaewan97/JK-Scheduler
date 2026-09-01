"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ScheduleItem } from "@/lib/types";
import { fromDateKey } from "@/lib/dateUtils";
import {
  AlarmPermission,
  getNotificationPermission,
  playAlarmSound,
  requestNotificationPermission,
  showBrowserNotification,
} from "@/lib/alarm";

const FIRED_KEY = "ios-scheduler:firedAlarms:v1";
const CHECK_INTERVAL_MS = 15_000;
/** Fire an alarm if "now" is within this many ms after the scheduled time. */
const GRACE_WINDOW_MS = 60_000;

function loadFired(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(FIRED_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function saveFired(set: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(FIRED_KEY, JSON.stringify(Array.from(set)));
  } catch {
    // ignore
  }
}

function getItemDateTime(item: ScheduleItem): Date | null {
  if (!item.time) return null;
  const day = fromDateKey(item.date);
  const [h, m] = item.time.split(":").map(Number);
  day.setHours(h, m, 0, 0);
  return day;
}

export function useAlarms(items: ScheduleItem[]) {
  const [activeAlarm, setActiveAlarm] = useState<ScheduleItem | null>(null);
  const [permission, setPermission] = useState<AlarmPermission>("default");
  const firedRef = useRef<Set<string>>(new Set());
  const itemsRef = useRef(items);
  itemsRef.current = items;

  useEffect(() => {
    firedRef.current = loadFired();
    setPermission(getNotificationPermission());
  }, []);

  const checkAlarms = useCallback(() => {
    const now = Date.now();
    for (const item of itemsRef.current) {
      if (item.type === "todo" && item.done) continue;
      const dt = getItemDateTime(item);
      if (!dt) continue;
      const diff = now - dt.getTime();
      if (diff >= 0 && diff <= GRACE_WINDOW_MS && !firedRef.current.has(item.id)) {
        firedRef.current.add(item.id);
        saveFired(firedRef.current);
        setActiveAlarm(item);
        playAlarmSound();
        showBrowserNotification(item.title, `${item.time} 일정 시간이에요`);
      }
    }
  }, []);

  useEffect(() => {
    checkAlarms();
    const id = window.setInterval(checkAlarms, CHECK_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [checkAlarms]);

  const dismissAlarm = useCallback(() => setActiveAlarm(null), []);

  const requestPermission = useCallback(async () => {
    const result = await requestNotificationPermission();
    setPermission(result);
    return result;
  }, []);

  return { activeAlarm, dismissAlarm, permission, requestPermission };
}
