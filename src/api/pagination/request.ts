import { Effect, attach, createEffect, createEvent, restore } from 'effector'
import { PaginatedListProps, PaginatedListResponse } from '../types'
import { createNextPageModel, getNextPage } from './model.page'

type RequestProps = void | (PaginatedListProps & Record<string, any>)

type GetNextProps<Q extends RequestProps> = {
  props: Q
  nextPage: number | null
}

type Request<T, Q extends RequestProps> = Effect<
  Q,
  PaginatedListResponse<T>,
  Error
>

type CreatePaginationListModelProps<T, Q extends RequestProps> = {
  pageSize: number
  request: Request<T, Q>
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
  const $isNextLoading = getNext.pending

  return {
    $nextPage,
    setNextPage,
    get,
    getNext,
    $items,
    $isLoading,
    $isNextLoading,
  }
}

export const createRequestAllModel = <T, Q extends RequestProps>(
  request: Request<T, Q>
) => {
  const setItems = createEvent<T[]>()
  const addItems = createEvent<T[]>()

  const $items = restore<T[]>(setItems, []).on(addItems, (state, payload) => [
    ...state,
    ...payload,
  ])

  const get = createEffect((props: Q) => request(props))

  get.done.watch(({ params, result }) => {
    const { items } = result
    const nextPage = getNextPage(result)
    result.page === 1 ? setItems(items) : addItems(items)

    if (nextPage) {
      get({ ...params, page: nextPage })
    }
  })

  const $isLoading = get.pending

  return {
    get,
    $items,
    $isLoading,
  }
}
