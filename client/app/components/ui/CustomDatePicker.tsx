"use client";

// Custome DatePicker By Claude

import { useState, useRef, useEffect } from "react";

// Define props interface
interface CustomDatePickerProps {
  onDateChange: (date: Date) => void;
  dateFor: string;
}

function CustomDatePicker({ onDateChange, dateFor }: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // ✅ typed state
  const wrapperRef = useRef<HTMLDivElement>(null); // ✅ typed ref

  const [viewDate, setViewDate] = useState(new Date());

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // ✅ typed event
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date: Date) => {
    // ✅ typed parameter
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysInMonth = (date: Date) => {
    // ✅ typed parameter
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    // ✅ typed parameter
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateSelect = (day: number) => {
    // ✅ typed parameter
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    setSelectedDate(newDate); // ✅ works now because state is Date | null
    onDateChange(newDate);
    setIsOpen(false);
  };

  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const days = [];
  const daysInMonth = getDaysInMonth(viewDate);
  const firstDay = getFirstDayOfMonth(viewDate);

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} />);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isSelected =
      selectedDate &&
      selectedDate.getDate() === day && // ✅ works now because selectedDate is Date | null
      selectedDate.getMonth() === viewDate.getMonth() &&
      selectedDate.getFullYear() === viewDate.getFullYear();

    days.push(
      <button
        key={day}
        onClick={() => handleDateSelect(day)}
        className={`w-8 h-8 rounded-full text-sm transition-colors
          ${isSelected ? "bg-primary text-white" : "hover:bg-gray-100"}`}
      >
        {day}
      </button>,
    );
  }

  return (
    <div className="relative" ref={wrapperRef}>
      {/* Input Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-card-glass text-text border 
                   border-text-muted rounded-lg py-2 px-3 w-full
                   focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <svg
          className="w-4 h-4 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className={selectedDate ? "text-text" : "text-text-muted"}>
          {selectedDate
            ? `${dateFor} Date: ${formatDate(selectedDate)}`
            : `Select ${dateFor} Date`}
        </span>
      </button>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute z-50 -mt-12 p-4 bg-card-modal rounded-xl shadow-lg border border-text-muted">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <span className="font-semibold text-text">
              {viewDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 mb-2 text-center text-xs text-text-muted">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">{days}</div>
        </div>
      )}
    </div>
  );
}

export default CustomDatePicker;
