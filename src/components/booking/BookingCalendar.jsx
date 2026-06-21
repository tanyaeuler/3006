const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function toISODate(date) {
  return date.toISOString().slice(0, 10)
}

function isDateBooked(isoDate, bookings) {
  return bookings.some(b => isoDate >= b.start_date && isoDate <= b.end_date)
}

export default function BookingCalendar({ viewDate, onViewDateChange, bookings, selectedRange, onSelectDate }) {
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const firstOfMonth = new Date(year, month, 1)
  const startWeekday = firstOfMonth.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const today = toISODate(new Date())

  const cells = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  function goToMonth(offset) {
    onViewDateChange(new Date(year, month + offset, 1))
  }

  function isInSelectedRange(isoDate) {
    if (!selectedRange?.start) return false
    const end = selectedRange.end || selectedRange.start
    const lo = selectedRange.start < end ? selectedRange.start : end
    const hi = selectedRange.start < end ? end : selectedRange.start
    return isoDate >= lo && isoDate <= hi
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => goToMonth(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500"
          aria-label="Previous month"
        >
          ‹
        </button>
        <div className="font-bold text-gray-900">
          {MONTH_NAMES[month]} {year}
        </div>
        <button
          type="button"
          onClick={() => goToMonth(1)}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 mb-1">
        {DAY_LABELS.map((d, i) => <div key={i}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={i} />

          const iso = toISODate(new Date(year, month, day))
          const booked = isDateBooked(iso, bookings)
          const past = iso < today
          const selected = isInSelectedRange(iso)
          const isToday = iso === today

          let classes = 'aspect-square rounded-lg flex items-center justify-center text-sm transition-colors '
          if (past) {
            classes += 'text-gray-300 cursor-not-allowed'
          } else if (booked) {
            classes += 'bg-red-100 text-red-600 cursor-not-allowed font-medium'
          } else if (selected) {
            classes += 'bg-blue-600 text-white font-semibold cursor-pointer'
          } else {
            classes += 'bg-green-50 text-gray-700 hover:bg-green-100 cursor-pointer'
          }
          if (isToday && !selected) classes += ' ring-2 ring-blue-400'

          return (
            <button
              key={i}
              type="button"
              disabled={past || booked}
              onClick={() => onSelectDate(iso)}
              className={classes}
            >
              {day}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-green-50 border border-green-200 inline-block" /> Available
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-red-100 inline-block" /> Booked
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-blue-600 inline-block" /> Selected
        </div>
      </div>
    </div>
  )
}
