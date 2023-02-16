import {
  Effect,
  attach,
  createEffect,
  createEvent,
  createStore,
} from 'effector'
import { createNextPageModel } from './model.page'

type ApiListResponse<T> = {
  items: T[]
  total: number
  page: number
  size: number
}

type CreatePaginationListModelProps<T> = {
  pageSize: number
  apiRequest: Effect<any, ApiListResponse<T>, Error> // TODO:
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
      if (!nextPage) throw new Error('Next page is null')
      return apiRequest({
        page: nextPage,
        size: pageSize,
      })
    }),
  })

  const setItems = createEvent<T[]>()
  const setNextItems = createEvent<T[]>()

  const $items = createStore<T[]>([])
    .on(setItems, (_, payload) => payload)
    .on(setNextItems, (state, payload) => [...state, ...payload])

  getItems.done.watch(({ result }) => {
    setNextPage(result)
    setItems(result.items)
  })

  getNextItems.done.watch(({ result }) => {
    setNextPage(result)
    setNextItems(result.items)
  })

  const $isLoading = getItems.pending || getNextItems.pending

  return {
    $nextPage,
    setNextPage,
    getItems,
    getNextItems,
    $items,
    $isLoading,
  }
}
