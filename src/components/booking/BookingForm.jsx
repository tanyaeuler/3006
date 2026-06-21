import { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'

export default function BookingForm({ selectedRange, onClearSelection, onSubmit, submitting }) {
  const [name, setName] = useState('')
  const [pickupTime, setPickupTime] = useState('09:00')
  const [error, setError] = useState('')

  const hasRange = Boolean(selectedRange?.start)
  const startDate = hasRange
    ? (selectedRange.end && selectedRange.end < selectedRange.start ? selectedRange.end : selectedRange.start)
    : null
  const endDate = hasRange
    ? (selectedRange.end && selectedRange.end < selectedRange.start ? selectedRange.start : (selectedRange.end || selectedRange.start))
    : null

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!hasRange) {
      setError('Pick the start and end date on the calendar first.')
      return
    }
    if (!name.trim()) {
      setError('Enter your name.')
      return
    }
    if (!pickupTime) {
      setError('Enter a pickup time.')
      return
    }

    try {
      await onSubmit({ name: name.trim(), startDate, endDate, pickupTime })
      setName('')
      setPickupTime('09:00')
    } catch (err) {
      setError(err.message || 'Something went wrong, try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="block text-sm font-semibold text-gray-700 mb-1.5">Selected dates</div>
        {hasRange ? (
          <div className="flex items-center justify-between bg-blue-50 text-blue-700 rounded-xl px-4 py-3 text-sm font-medium">
            <span>
              {startDate === endDate ? startDate : `${startDate} → ${endDate}`}
            </span>
            <button type="button" onClick={onClearSelection} className="text-blue-500 hover:text-blue-700 text-xs underline">
              Clear
            </button>
          </div>
        ) : (
          <div className="text-sm text-gray-400 bg-gray-50 rounded-xl px-4 py-3">
            Click a start date, then an end date on the calendar.
          </div>
        )}
      </div>

      <Input
        id="name"
        label="Your name"
        placeholder="e.g. Sarah Smith"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <Input
        id="pickupTime"
        label="Pickup time"
        type="time"
        value={pickupTime}
        onChange={e => setPickupTime(e.target.value)}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? 'Booking…' : 'Book the camper'}
      </Button>
    </form>
  )
}
