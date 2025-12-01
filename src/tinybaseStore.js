import { createStore } from "tinybase";
import { createLocalStoragePersister } from "tinybase";

export const store = createStore().setTable("todos", {});

// Persist local changes
createLocalStoragePersister(store, {
  namespace: 'todos',
  tables: ['todos'],
  writeDelay: 100,
});