"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { MonthView } from "@/components/MonthView";
import { WeekView } from "@/components/WeekView";
import { DaySheet } from "@/components/DaySheet";
import { EventForm } from "@/components/EventForm";
import { Fab } from "@/components/Fab";
import { AlarmToast } from "@/components/AlarmToast";
import { useEvents } from "@/hooks/useEvents";
import { useAlarms } from "@/hooks/useAlarms";
import { ScheduleItem, ViewMode } from "@/lib/types";
import { addDays, addMonths, toDateKey } from "@/lib/dateUtils";
import { unlockAlarmAudio } from "@/lib/alarm";


export default function Home() {
  const { items, itemsByDate, addItem, updateItem, removeItem, toggleDone } = useEvents();
  const { activeAlarm, dismissAlarm, permission, requestPermission } = useAlarms(items);

  const [view, setView] = useState<ViewMode>("month");
  const [anchor, setAnchor] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const [daySheetOpen, setDaySheetOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);

  // Unlock alarm audio on the very first tap anywhere, so iOS allows the
  // automatic alarm sound to play later without needing another gesture.
  useEffect(() => {
    function unlockOnce() {
      unlockAlarmAudio();
      window.removeEventListener("pointerdown", unlockOnce);
    }
    window.addEventListener("pointerdown", unlockOnce);
    return () => window.removeEventListener("pointerdown", unlockOnce);
  }, []);

  function handlePrev() {
    setAnchor((a) => (view === "month" ? addMonths(a, -1) : addDays(a, -7)));
  }

  function handleNext() {
    setAnchor((a) => (view === "month" ? addMonths(a, 1) : addDays(a, 7)));
  }

  function handleToday() {
    const now = new Date();
    setAnchor(now);
    setSelectedDate(now);
  }

  function handleSelectDay(d: Date) {
    setSelectedDate(d);
    setDaySheetOpen(true);
  }

  function openAddForm() {
    setEditingItem(null);
    setFormOpen(true);
  }

  function openEditForm(item: ScheduleItem) {
    setEditingItem(item);
    setFormOpen(true);
  }

  function handleSaveForm(data: Omit<ScheduleItem, "id" | "createdAt">, id?: string) {
    if (id) {
      updateItem(id, data);
    } else {
      addItem(data);
    }
  }

  async function handleRequestNotification() {
    alert("클릭됨 1");
    try {
    unlockAlarmAudio();
      alert("오디오 언락 성공");
    } catch (err) {
      alert("오디오 에러: " + err);
    }
    await requestPermission();
    alert("권한 요청 끝");
  }

  const selectedKey = toDateKey(selectedDate);
  const selectedDayItems = itemsByDate.get(selectedKey) ?? [];

  return (
    <main className="min-h-screen pb-28">
      <AlarmToast item={activeAlarm} onDismiss={dismissAlarm} onComplete={toggleDone} />

      <Header
        anchor={anchor}
        view={view}
        onViewChange={setView}
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={handleToday}
        notificationPermission={permission}
        onRequestNotification={handleRequestNotification}
      />

      {view === "month" ? (
        <MonthView
          anchor={anchor}
          selectedDate={selectedDate}
          itemsByDate={itemsByDate}
          onSelectDay={handleSelectDay}
        />
      ) : (
        <WeekView
          anchor={anchor}
          selectedDate={selectedDate}
          itemsByDate={itemsByDate}
          onSelectDay={handleSelectDay}
        />
      )}

      <Fab onClick={openAddForm} />

      <DaySheet
        open={daySheetOpen}
        date={selectedDate}
        items={selectedDayItems}
        onClose={() => setDaySheetOpen(false)}
        onAdd={openAddForm}
        onEdit={openEditForm}
        onToggleDone={toggleDone}
        onDelete={removeItem}
      />

      <EventForm
        open={formOpen}
        date={selectedDate}
        initial={editingItem}
        onClose={() => setFormOpen(false)}
        onSave={handleSaveForm}
        onDelete={removeItem}
      />
    </main>
  );
}
