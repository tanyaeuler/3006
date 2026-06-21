import Card from '../ui/Card'

function formatDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString(undefined, {
    weekday: 'short', day: 'numeric', month: 'short',
  })
}

export default function BookingList({ bookings, onCancel }) {
  const today = new Date().toISOString().slice(0, 10)
  const upcoming = bookings
    .filter(b => b.end_date >= today)
    .sort((a, b) => a.start_date.localeCompare(b.start_date))

  if (upcoming.length === 0) {
    return <p className="text-sm text-gray-400">No upcoming bookings yet.</p>
  }

  return (
    <div className="space-y-3">
      {upcoming.map(b => (
        <Card key={b.id} className="p-4 flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-900">{b.name}</div>
            <div className="text-sm text-gray-500">
              {b.start_date === b.end_date
                ? formatDate(b.start_date)
                : `${formatDate(b.start_date)} → ${formatDate(b.end_date)}`}
              {' · pickup '}{b.pickup_time}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onCancel(b.id)}
            className="text-xs text-red-500 hover:text-red-700 font-medium"
          >
            Cancel
          </button>
        </Card>
      ))}
    </div>
  )
}
