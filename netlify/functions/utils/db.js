const { createClient } = require('@supabase/supabase-js');

/**
 * Initialize and return a Supabase client
 * Uses service role key for server-side operations
 * @returns {object} Supabase client instance
 */
function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials are not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.');
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

// Export a singleton instance
let supabaseInstance = null;

function getSupabase() {
  if (!supabaseInstance) {
    supabaseInstance = getSupabaseClient();
  }
  return supabaseInstance;
}

module.exports = {
  getSupabase,
  getSupabaseClient
};
