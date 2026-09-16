import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xbfpcvoaozgmgtfmbwow.supabase.co";

const supabaseAnonKey =
  "sb_publishable_DoGdhcn9iy2367QESUz1Bg_JNKoZpQu";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
