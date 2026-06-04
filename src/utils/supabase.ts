import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Create an infinitely chainable mock function proxy
const makeChainedMock = (): any => {
  const mock: any = new Proxy(() => {}, {
    get(target, prop) {
      if (prop === "then") {
        // Return a resolver that resolves to empty values to prevent crashes
        return (resolve: any) => resolve({ data: null, error: null });
      }
      return mock;
    },
    apply() {
      return mock;
    }
  });
  return mock;
};

// Initialize the Supabase client if keys are present.
// Otherwise, export a dummy Proxy client to prevent runtime crashes during build/startup,
// allowing the storage layer to fallback to local storage cache gracefully.
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : new Proxy({} as any, {
      get(target, prop) {
        return makeChainedMock();
      }
    });
