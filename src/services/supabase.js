import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vhhexaadpcszfjhzlqlg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoaGV4YWFkcGNzemZqaHpscWxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYwMTM1OTQsImV4cCI6MjAxMTU4OTU5NH0.193tMQdmQxyzbqa1FFsc65kyiLaKRuOY83rw326fWXg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
