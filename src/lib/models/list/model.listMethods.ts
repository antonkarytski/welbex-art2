import { Store, createEvent } from 'effector'
import { deleteItemFromList, updateListItem } from './helpers'
import { Id, IdExtractor } from './types'

export const createListMethodsModel = <T extends Record<string, any>>(
  $store: Store<T[]>,
  idExtractor?: IdExtractor<T>
) => {
  const updateItem = createEvent<Partial<T>>()
  const deleteItem = createEvent<Id>()
  const addItem = createEvent<T>()

  $store
    .on(updateItem, (state, payload) =>
      updateListItem(state, payload, idExtractor)
    )
    .on(deleteItem, (state, payload) =>
      deleteItemFromList(state, payload, idExtractor)
    )
    .on(addItem, (state, payload) => [...state, payload])

  return {
    updateItem,
    deleteItem,
    addItem,
  }
}
