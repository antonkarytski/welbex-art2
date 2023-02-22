import { Effect, attach, createEffect, createEvent, restore } from 'effector'
import { PaginatedListProps, PaginatedListResponse } from '../types'
import { createNextPageModel } from './model.page'

type RequestProps = void | (PaginatedListProps & Record<string, any>)

type GetNextProps<Q extends RequestProps> = {
  props: Q
  nextPage: number | null
}

type CreatePaginationListModelProps<T, Q> = {
  pageSize: number
  request: Effect<Q, PaginatedListResponse<T>, Error>
}

export const createPaginationListModel = <T, Q extends RequestProps>({
  pageSize,
  request,
}: CreatePaginationListModelProps<T, Q>) => {
  const { $nextPage, setNextPage } = createNextPageModel()

  const get = createEffect((props: Q) =>
    request({ page: 1, size: pageSize, ...props })
  )

  const getNext = attach({
    source: $nextPage,
    mapParams: (props: Q, nextPage) => ({
      nextPage,
      props,
    }),
    effect: createEffect(({ props, nextPage }: GetNextProps<Q>) => {
      if (!nextPage) throw new Error('No more pages')
      return request({ page: nextPage, size: pageSize, ...props })
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
