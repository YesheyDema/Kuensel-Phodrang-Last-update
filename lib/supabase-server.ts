// import { createClient } from "@supabase/supabase-js";

// const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

// if (!serviceRoleKey) {
//   throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY in environment");
// }

// export const supabaseAdmin = createClient(url, serviceRoleKey, {
//   auth: { persistSession: false },
// });

// export default supabaseAdmin;
import { createClient } from "@supabase/supabase-js";

let supabaseAdmin: ReturnType<typeof createClient> | null = null;

export function getAdminClient() {
  if (supabaseAdmin) return supabaseAdmin;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY in environment");
  }

  supabaseAdmin = createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });

  return supabaseAdmin;
}