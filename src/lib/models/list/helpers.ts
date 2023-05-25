import { Id, IdExtractor } from './types'

export const deleteItemFromList = <T extends Record<string, any>>(
  array: T[],
  itemIdToDelete: Id,
  idExtractor?: IdExtractor<T>
) => {
  const itemIndexToRemove = array.findIndex((item) =>
    idExtractor
      ? idExtractor(item) === itemIdToDelete
      : item.id === itemIdToDelete
  )
  const copy = [...array]
  if (itemIndexToRemove !== -1) copy.splice(itemIndexToRemove, 1)
  return copy
}

export const updateListItem = <T extends Record<string, any>>(
  array: T[],
  itemToUpdate: Partial<T>,
  idExtractor?: IdExtractor<T>
) => {
  const indexToUpdate = array.findIndex((item) =>
    idExtractor
      ? idExtractor(item) === idExtractor(itemToUpdate)
      : item.id === itemToUpdate.id
  )
  const copy = [...array]
  if (indexToUpdate !== -1) {
    const item = array[indexToUpdate]
    copy[indexToUpdate] = { ...item, ...itemToUpdate }
  }
  return copy
}
