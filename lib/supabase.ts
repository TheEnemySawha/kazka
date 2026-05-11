import { createClient } from '@supabase/supabase-js';

// Prefer NEXT_PUBLIC_* for client-safe usage, but fall back to server vars if set.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
	// Warn instead of throwing so dev server can still start for local debugging.
	// The app will fail at runtime when making requests if keys are missing.
	// Instruct the developer how to set env vars.
	// eslint-disable-next-line no-console
	console.warn(
		'Supabase URL or anon key is not set. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment.'
	);
}

export const supabase = createClient(SUPABASE_URL ?? '', SUPABASE_ANON_KEY ?? '');
