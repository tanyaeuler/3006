import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only initialise the client when both env vars are present — otherwise the
// app runs in demo mode and data is kept in memory only.
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export async function saveBusiness(data) {
  if (!supabase) throw new Error('Supabase not configured')

  const { data: result, error } = await supabase
    .from('businesses')
    .insert([data])
    .select()
    .single()

  if (error) throw error
  return result
}

export async function updateBusinessStatus(id, platformStatuses) {
  if (!supabase) throw new Error('Supabase not configured')

  const { data, error } = await supabase
    .from('businesses')
    .update({ platform_statuses: platformStatuses })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateChecklist(id, checklist) {
  if (!supabase) throw new Error('Supabase not configured')

  const { data, error } = await supabase
    .from('businesses')
    .update({ checklist })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}
