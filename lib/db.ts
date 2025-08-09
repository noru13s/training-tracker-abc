'use client'
import { openDB } from 'idb'

const DB_NAME = 'training-tracker'
const STORE = 'pending-logs'

export async function db() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true })
    }
  })
}

export async function queueLog(record: any) {
  const d = await db(); await d.add(STORE, record)
}
export async function getAllQueued() {
  const d = await db(); return d.getAll(STORE)
}
export async function clearQueued() {
  const d = await db(); const tx = d.transaction(STORE, 'readwrite'); await tx.store.clear(); await tx.done
}
