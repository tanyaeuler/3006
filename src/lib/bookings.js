import { supabase } from './supabase'

const STORAGE_KEY = 'camper_bookings_demo'

function loadLocalBookings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function saveLocalBookings(bookings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
}

export async function fetchBookings() {
  if (!supabase) return loadLocalBookings()

  const { data, error } = await supabase
    .from('camper_bookings')
    .select('*')
    .order('start_date', { ascending: true })

  if (error) throw error
  return data
}

export async function createBooking({ name, startDate, endDate, pickupTime }) {
  const booking = {
    name,
    start_date: startDate,
    end_date: endDate,
    pickup_time: pickupTime,
  }

  if (!supabase) {
    const bookings = loadLocalBookings()
    const newBooking = { ...booking, id: crypto.randomUUID(), created_at: new Date().toISOString() }
    bookings.push(newBooking)
    saveLocalBookings(bookings)
    return newBooking
  }

  const { data, error } = await supabase
    .from('camper_bookings')
    .insert([booking])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteBooking(id) {
  if (!supabase) {
    const bookings = loadLocalBookings().filter(b => b.id !== id)
    saveLocalBookings(bookings)
    return
  }

  const { error } = await supabase.from('camper_bookings').delete().eq('id', id)
  if (error) throw error
}

export function datesOverlap(startA, endA, startB, endB) {
  return startA <= endB && startB <= endA
}
