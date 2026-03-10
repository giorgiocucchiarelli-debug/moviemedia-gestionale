import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL  || ''
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON || ''

export const supabase = (SUPABASE_URL && SUPABASE_ANON)
  ? createClient(SUPABASE_URL, SUPABASE_ANON)
  : null

// Simple key-value store backed by Supabase table "kv_store"
// Falls back to localStorage if Supabase not configured
export async function dbGet(key) {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('kv_store')
        .select('value')
        .eq('key', key)
        .maybeSingle()
      if (!error && data?.value != null) return JSON.parse(data.value)
    } catch(e) { console.warn('dbGet error', e) }
  }
  // fallback
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null } catch { return null }
}

export async function dbSet(key, value) {
  const serialized = JSON.stringify(value)
  if (supabase) {
    try {
      await supabase.from('kv_store').upsert(
        { key, value: serialized, updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      )
    } catch(e) { console.warn('dbSet error', e) }
  }
  // always also write localStorage as cache
  try { localStorage.setItem(key, serialized) } catch {}
}
