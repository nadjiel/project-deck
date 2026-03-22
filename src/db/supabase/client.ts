import { createBrowserClient } from "@supabase/ssr";
import { supabaseUrl, supabaseKey } from "@/config/env";
import type { Database } from "./types";

export const createClient = () =>
  createBrowserClient<Database>(
    supabaseUrl!,
    supabaseKey!,
  );
