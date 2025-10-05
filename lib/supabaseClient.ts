import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://psyxrnhtyqnafrzzebyh.supabase.co"; // ton URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyamxuY3NqanFkY2xxc254Z3JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNzU5OTIsImV4cCI6MjA3MTk1MTk5Mn0.42YaeiSiF2THr2roECa60Om8YnViB027CHlkHx-Do8c"; 
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
