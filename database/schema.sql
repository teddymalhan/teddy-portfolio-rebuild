-- Resume Management Database Schema
-- Run this SQL in your Vercel Postgres database

CREATE TABLE IF NOT EXISTS resumes (
  id SERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  blob_url TEXT NOT NULL,
  blob_key TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT FALSE,
  uploaded_by TEXT,
  uploaded_at TIMESTAMP DEFAULT NOW(),
  file_size INTEGER,
  mime_type TEXT DEFAULT 'application/pdf',
  notes TEXT
);

-- Create index for active resume lookups
CREATE INDEX IF NOT EXISTS idx_resumes_active ON resumes(is_active) WHERE is_active = TRUE;

-- Create index for faster queries by upload date
CREATE INDEX IF NOT EXISTS idx_resumes_uploaded_at ON resumes(uploaded_at DESC);


