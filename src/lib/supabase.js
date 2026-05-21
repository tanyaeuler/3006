import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function saveBusiness(data) {
  const { data: result, error } = await supabase
    .from('businesses')
    .insert([data])
    .select()
    .single()

  if (error) throw error
  return result
}

export async function updateBusinessStatus(id, platformStatuses) {
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
  const { data, error } = await supabase
    .from('businesses')
    .update({ checklist })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}
