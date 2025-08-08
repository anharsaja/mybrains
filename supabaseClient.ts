import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qqlgdvxkltzhvyartmrj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxbGdkdnhrbHR6aHZ5YXJ0bXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2MDc5MzEsImV4cCI6MjA3MDE4MzkzMX0.5FhPtW_oEuarrNxMaCPQg9fUGRMzJc-RIetpSqg-GSU'
export const supabase = createClient(supabaseUrl, supabaseKey)
