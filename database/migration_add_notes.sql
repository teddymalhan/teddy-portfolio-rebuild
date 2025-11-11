-- Migration: Add notes column to resumes table
-- Run this SQL in your Vercel Postgres database if the table already exists

ALTER TABLE resumes 
ADD COLUMN IF NOT EXISTS notes TEXT;

