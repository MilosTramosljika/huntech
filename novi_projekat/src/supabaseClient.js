// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ingdrannrpansfcjyvab.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluZ2RyYW5ucnBhbnNmY2p5dmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNzQ0NzIsImV4cCI6MjA3MDg1MDQ3Mn0.07V8DbUz9YSiciLVK_29oyAq3GB4yG1FhXfk-d8hkF0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
