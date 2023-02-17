import { Effect, attach, createEffect, createEvent, restore } from 'effector'
import { PaginatedListProps, PaginatedListResponse } from '../types'
import { createNextPageModel } from './model.page'

type CreatePaginationListModelProps<T> = {
  pageSize: number
  apiRequest: Effect<void | PaginatedListProps, PaginatedListResponse<T>, Error>
}

export const createPaginationListModel = <T>({
  pageSize,
  apiRequest,
}: CreatePaginationListModelProps<T>) => {
  const { $nextPage, setNextPage } = createNextPageModel()

  const getItems = createEffect(() => apiRequest({ size: pageSize, page: 1 }))

  const getNextItems = attach({
    source: $nextPage,
    effect: createEffect((nextPage: number | null) => {
      if (!nextPage) return
      return apiRequest({
        page: nextPage,
        size: pageSize,
      })
    }),
  })

  const setItems = createEvent<T[]>()
  const addItems = createEvent<T[]>()

  const $items = restore<T[]>(setItems, []).on(addItems, (state, payload) => [
    ...state,
    ...payload,
  ])

  getItems.done.watch(({ result }) => {
    setNextPage(result)
    setItems(result.items)
  })

  getNextItems.done.watch(({ result }) => {
    if (!result) return
    setNextPage(result)
    addItems(result.items)
  })

  const $isLoading = getItems.pending

  return {
    $nextPage,
    setNextPage,
    getItems,
    getNextItems,
    $items,
    $isLoading,
  }
}
