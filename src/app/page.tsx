"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { MonthView } from "@/components/MonthView";
import { WeekView } from "@/components/WeekView";
import { DaySheet } from "@/components/DaySheet";
import { EventForm } from "@/components/EventForm";
import { Fab } from "@/components/Fab";
import { useEvents } from "@/hooks/useEvents";
import { ScheduleItem } from "@/lib/types";
import { addDays, addMonths, toDateKey } from "@/lib/dateUtils";

type ViewMode = "month" | "week";

export default function Home() {
  const { itemsByDate, addItem, updateItem, removeItem, toggleDone } = useEvents();

  const [view, setView] = useState<ViewMode>("month");
  const [anchor, setAnchor] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const [daySheetOpen, setDaySheetOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);

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

  const selectedKey = toDateKey(selectedDate);
  const selectedDayItems = itemsByDate.get(selectedKey) ?? [];

  return (
    <main className="min-h-screen pb-28">
      <Header
        anchor={anchor}
        view={view}
        onViewChange={setView}
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={handleToday}
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
