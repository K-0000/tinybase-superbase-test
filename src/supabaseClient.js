import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

//dotenv.config();

const SUPABASE_URL="https://myxfprkdytpjswntohzn.supabase.co"
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15eGZwcmtkeXRwanN3bnRvaHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NjA1MzMsImV4cCI6MjA4MDEzNjUzM30.vxPrDqwptnn0s0agADZ8fmdEB6qPxTlkcJD0L41XkGw"

export const supabase = createClient(
  //process.env.SUPABASE_URL,
  //process.env.SUPABASE_ANON_KEY
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
