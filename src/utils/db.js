import { openDB } from "idb";

export const dbPromise = openDB("zingmp3-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("songs")) {
      db.createObjectStore("songs", { keyPath: "encodeId" });
    }
  },
});
