import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import BookingCalendar from '../components/booking/BookingCalendar'
import BookingForm from '../components/booking/BookingForm'
import BookingList from '../components/booking/BookingList'
import { fetchBookings, createBooking, deleteBooking, datesOverlap } from '../lib/bookings'
import { supabase } from '../lib/supabase'

export default function CamperBookingPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })
  const [selectedRange, setSelectedRange] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function loadBookings() {
      setLoading(true)
      setLoadError('')
      try {
        const data = await fetchBookings()
        setBookings(data)
      } catch (err) {
        setLoadError(err.message || 'Could not load bookings.')
      } finally {
        setLoading(false)
      }
    }

    loadBookings()
  }, [])

  function handleSelectDate(iso) {
    setSelectedRange(prev => {
      if (!prev?.start || prev.end) {
        return { start: iso, end: null }
      }
      return { start: prev.start, end: iso }
    })
  }

  async function handleSubmitBooking({ name, startDate, endDate, pickupTime }) {
    const conflict = bookings.some(b => datesOverlap(startDate, endDate, b.start_date, b.end_date))
    if (conflict) {
      throw new Error('Those dates overlap with an existing booking. Pick again.')
    }

    setSubmitting(true)
    try {
      const newBooking = await createBooking({ name, startDate, endDate, pickupTime })
      setBookings(prev => [...prev, newBooking])
      setSelectedRange(null)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleCancel(id) {
    if (!confirm('Cancel this booking?')) return
    await deleteBooking(id)
    setBookings(prev => prev.filter(b => b.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center text-white text-base">
              🚐
            </div>
            <span className="font-bold text-gray-900 text-sm">Camper Trailer Bookings</span>
          </div>
          <Link to="/" className="text-xs text-gray-400 hover:text-gray-600">
            ← Back
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {!supabase && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-xl px-4 py-3">
            Supabase isn't configured, so bookings are saved only on this device for now.
            Set <code className="font-mono">VITE_SUPABASE_URL</code> and <code className="font-mono">VITE_SUPABASE_ANON_KEY</code> to share the calendar with the whole family.
          </div>
        )}

        {loadError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
            {loadError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-5">
            {loading ? (
              <p className="text-sm text-gray-400">Loading calendar…</p>
            ) : (
              <BookingCalendar
                viewDate={viewDate}
                onViewDateChange={setViewDate}
                bookings={bookings}
                selectedRange={selectedRange}
                onSelectDate={handleSelectDate}
              />
            )}
          </Card>

          <Card className="p-5">
            <h3 className="font-bold text-gray-900 mb-4">Book the camper</h3>
            <BookingForm
              selectedRange={selectedRange}
              onClearSelection={() => setSelectedRange(null)}
              onSubmit={handleSubmitBooking}
              submitting={submitting}
            />
          </Card>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 mb-3">Upcoming bookings</h3>
          <BookingList bookings={bookings} onCancel={handleCancel} />
        </div>
      </main>
    </div>
  )
}
