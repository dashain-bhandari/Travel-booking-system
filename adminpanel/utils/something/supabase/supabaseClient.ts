// import { createClient } from "@supabase/supabase-js";
// const supabaseUrl = "https://lkhtghtfdgzssgfepmxfhlw.supabase.co";

// // service role secret key
// const supabaseKey = "eyJhbGciOiJdfIUzI1NiIdfdsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzddfXBhYmFzZSfdfIsInJlZiI6ImxraHRnaHR6c3NpZmVwbXhmaGx3Ifdfdiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDQ2MjIxMSwiZXhwIjoyMDM2MDM4MjExfQ.WAnLzpAc3B5Xl5pnzsHE_HUYC3ULBG2400Xmx6tLGzM";

// // anonymous key
// export const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://lkhtghtzssifepmxfhlw.supabase.co";

// service role secret key
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxraHRnaHR6c3NpZmVwbXhmaGx3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDQ2MjIxMSwiZXhwIjoyMDM2MDM4MjExfQ.WAnLzpAc3B5Xl5pnzsHE_HUYC3ULBG2400Xmx6tLGzM";

// anonymous key
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxraHRnaHR6c3NpZmVwbXhmaGx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA0NjIyMTEsImV4cCI6MjAzNjAzODIxMX0.WfuNRUYQhveNyR3xa5f8xuhMF1-YjfwXH7ir8HKvDSQ";
export const supabase = createClient(supabaseUrl, supabaseKey);