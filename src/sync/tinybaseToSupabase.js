import { supabase } from "../supabaseClient.js";

export function enableTinyBaseToSupabaseSync(store) {
  store.addRowListener(
    "todos",
    null,
    async (store, tableId, rowId, newRow) => {
      const { error } = await supabase.from("todos").upsert({
        id: rowId,
        title: newRow.title,
        is_done: newRow.is_done,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error("TinyBase → Supabase error:", error);
      } else {
        console.log("TinyBase → Supabase synced:", rowId);
      }
    }
  );

  console.log("TinyBase → Supabase sync enabled.");
}
