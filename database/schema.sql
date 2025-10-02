CREATE TABLE IF NOT EXISTS fatwas (
  id SERIAL PRIMARY KEY,
  query_text TEXT NOT NULL,
  verdict VARCHAR(100),          -- حلال / حرام / مكروه / مستحب...
  category VARCHAR(100),         -- فقه / حديث / معاملات...
  hadith_grade VARCHAR(100),     -- صحيح / حسن / ضعيف / موضوع...
  source TEXT,                   -- اسم العالم/الهيئة/المرجع + الرابط
  notes TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_fatwas_query ON fatwas USING gin (to_tsvector('arabic', query_text));
