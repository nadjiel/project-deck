
interface Env {
  supabaseUrl: string;
  supabaseKey: string;
  email: string;
}

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
export const email = process.env.NEXT_PUBLIC_EMAIL!;

if (!supabaseUrl) throw new Error("No supabaseUrl found! Set it with NEXT_PUBLIC_SUPABASE_URL");
if (!supabaseKey) throw new Error("No supabaseKey found! Set it with NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY");
if (!email) throw new Error("No email found! Set it with NEXT_PUBLIC_EMAIL");

export default {
  supabaseUrl,
  supabaseKey,
  email,
} as Env;
