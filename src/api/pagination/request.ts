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

  const get = createEffect(() => apiRequest({ size: pageSize, page: 1 }))

  const getNext = attach({
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

  get.done.watch(({ result }) => {
    setNextPage(result)
    setItems(result.items)
  })

  getNext.done.watch(({ result }) => {
    if (!result) return
    setNextPage(result)
    addItems(result.items)
  })

  const $isLoading = get.pending

  return {
    $nextPage,
    setNextPage,
    get,
    getNext,
    $items,
    $isLoading,
  }
}
