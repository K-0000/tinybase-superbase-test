import { supabase } from "../supabaseClient.js";
import { mapSupabaseRowToTinyBase } from "../utils/rowMapper.js";

export async function initialLoad(store) {
  const { data, error } = await supabase.from("todos").select("*");

  if (error) {
    console.error("Initial load error:", error);
    return;
  }

  data.forEach((row) => {
    store.setRow("todos", row.id, mapSupabaseRowToTinyBase(row));
  });

  console.log("Initial load complete:", store.getTable("todos"));
}
