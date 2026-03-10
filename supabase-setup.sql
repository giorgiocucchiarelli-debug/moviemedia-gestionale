-- Esegui questo nella Supabase SQL Editor (una volta sola)
-- Dashboard → SQL Editor → New Query → incolla → Run

CREATE TABLE IF NOT EXISTS kv_store (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Permetti lettura/scrittura pubblica (l'app usa auth propria)
ALTER TABLE kv_store ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all" ON kv_store
  FOR ALL USING (true) WITH CHECK (true);
