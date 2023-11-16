import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sajzvmfcvgcysyuuxmdn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhanp2bWZjdmdjeXN5dXV4bWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzODc4ODcsImV4cCI6MjAxNDk2Mzg4N30.w3oSf7BgjfOD-kvb62Cqorf1oWnQjUiIrtm-9xIG36s'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;