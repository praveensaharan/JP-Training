import React, { useMemo } from "react"
import { schedule } from "./scheduleData1"

function getWeekday(month, day) {
  const date = new Date(2025, month - 1, day)
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  return weekdays[date.getDay()]
}

export default function ScheduleSelector({
  month,
  day,
  selectedSlotId,
  onSlotChange,
}) {
  const availableSlots = useMemo(() => {
    const m = Number(month)
    const d = Number(day)
    if (!Number.isNaN(m) && m >= 1 && m <= 12 && !Number.isNaN(d) && d >= 1 && d <= 31) {
      const weekday = getWeekday(m, d)
      return schedule.filter((s) => s.day_of_week === weekday)
    }
    return []
  }, [month, day])

  // Helper to safely pad month and day as 2-digit strings
  const pad2 = (str) => {
    const s = String(str)
    return s.length === 1 ? "0" + s : s
  }

  if (!month || !day) {
    return (
      <p className="text-center text-sm font-medium text-gray-400 mb-6 backdrop-blur-sm bg-white/5 border border-white/10 px-4 py-3 rounded-2xl">
        Please select a valid date to view available class slots.
      </p>
    )
  }

  if (availableSlots.length === 0) {
    return (
      <p className="text-center text-sm font-medium text-red-300 mb-6 backdrop-blur-sm bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-2xl">
        No classes available for the selected date.
      </p>
    )
  }

  return (
    <div className="space-y-4 relative">
      <h3 className="text-white text-center tracking-wide mb-2">
        General Slots on{" "}
        <span className="text-cyan-300">
          2025-{pad2(month)}-{pad2(day)}
        </span>{" "}
        ({availableSlots[0].day_of_week})
      </h3>

      <div className="relative">
        <select
          value={selectedSlotId || ""}
          onChange={(e) => {
            const selected = availableSlots.find((s) => s.id === Number(e.target.value))
            onSlotChange(selected) // send whole slot object up
          }}
          required
          aria-label="Select a time slot"
          className="w-full appearance-none rounded-2xl bg-white/10 border border-white/20 px-5 py-3 pr-12 text-white shadow-inner backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:bg-white/20"
        >
          <option value="" disabled className="text-gray-400">
            Select a slot
          </option>
          {availableSlots.map((slot) => (
            <option key={slot.id} value={slot.id} className="text-black">
              {slot.start_time} - {slot.end_time} | {slot.room}
            </option>
          ))}
        </select>

        {/* Custom Arrow Icon */}
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  )
}
