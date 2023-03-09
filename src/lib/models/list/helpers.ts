import { Id, IdExtractor } from './types'

export const deleteItemFromList = <T extends Record<string, any>>(
  array: T[],
  itemIdToDelete: Id,
  idExtractor?: IdExtractor<T>
) => {
  return array.filter((item) => {
    if (idExtractor) {
      return idExtractor(item) !== itemIdToDelete
    }
    if (item.id) {
      return item.id !== itemIdToDelete
    }
  })
}

export const updateListItem = <T extends Record<string, any>>(
  array: T[],
  itemToUpdate: Partial<T>,
  idExtractor?: IdExtractor<T>
) => {
  return array.map((item) => {
    let targetItem: boolean = false
    if (idExtractor) {
      targetItem = idExtractor(item) === idExtractor(itemToUpdate)
    }
    if (item.id) {
      targetItem = item.id === itemToUpdate.id
    }
    return targetItem ? { ...item, ...itemToUpdate } : item
  })
}
