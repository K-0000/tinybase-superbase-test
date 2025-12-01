import { store } from "./tinybaseStore.js";
import { startSync } from "./sync/index.js";
import crypto from "crypto";

async function main() {
  console.log("Starting TinyBase ↔ Supabase sync...");
  await startSync(store);

  console.log("Sync active!");

  // Test insert after 1s
  setTimeout(() => {
    const id = crypto.randomUUID();
    store.setRow("todos", id, {
      title: "Hello from TinyBase",
      is_done: false,
      updated_at: new Date().toISOString(),
    });

    console.log("Inserted test row:", id);
  }, 1000);
}

main();
