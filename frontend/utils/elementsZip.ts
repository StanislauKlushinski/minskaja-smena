import { IDBElement } from '@/utils/interface'

export async function * getModel (ids: number[]) {
  for (const id of ids) {
    if (!browserEvent) {
      yield []
      continue
    }
    const model: IDBElement[] = JSON.parse(
      await browserEvent.getModel(id))
    yield model
  }
}

export function splitIntoChunksBySize (
  items: IDBElement[], maxSizeBytes = 10_000_000): IDBElement[][] {
  const encoder = new TextEncoder()
  const chunks: IDBElement[][] = []
  let currentChunk: IDBElement[] = []
  let currentSize = 0

  for (const item of items) {
    const json = JSON.stringify(item)
    const size = encoder.encode(json).length

    // Если элемент сам больше maxSizeBytes — сохранить его отдельно
    if (size > maxSizeBytes) {
      if (currentChunk.length > 0) {
        chunks.push(currentChunk)
        currentChunk = []
        currentSize = 0
      }
      chunks.push([item]) // одиночный крупный объект
      continue
    }

    // Если добавление элемента превысит лимит — начать новый кластер
    if (currentSize + size > maxSizeBytes) {
      chunks.push(currentChunk)
      currentChunk = [item]
      currentSize = size
    } else {
      currentChunk.push(item)
      currentSize += size
    }
  }

  // Не забыть последний
  if (currentChunk.length > 0) {
    chunks.push(currentChunk)
  }

  return chunks
}