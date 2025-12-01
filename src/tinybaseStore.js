// src/tinybaseStore.js
import { createStore } from "tinybase";
import { createLocalPersister } from "tinybase/persisters/persister-browser";

// 1️⃣ Create the TinyBase store and table
export const store = createStore().setTable("todos", {});

// 2️⃣ Create the persister to persist the 'todos' table to localStorage
const persister = createLocalPersister(store, {
  tables: ['todos'],
  writeDelay: 100, // batch writes to storage
});

// 3️⃣ Load existing data from localStorage
await persister.load();

// 4️⃣ Start auto-saving local changes
persister.startAutoSave();

import { enableRealtimeSync } from './sync/realtimeSync.js';
enableRealtimeSync(store);