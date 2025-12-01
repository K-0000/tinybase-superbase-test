import { initialLoad } from "./initialLoad.js";
import { enableRealtimeSync } from "./realtimeSync.js";
import { enableTinyBaseToSupabaseSync } from "./tinybaseToSupabase.js";

export async function startSync(store) {
  await initialLoad(store);
  enableRealtimeSync(store);
  enableTinyBaseToSupabaseSync(store);
}
