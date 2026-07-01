"use client";

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string;

export const supabase = createClient(url, key);

export default supabase;
