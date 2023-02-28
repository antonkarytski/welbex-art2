import { attach, createEffect, createEvent, restore } from 'effector'
import { createNextPageModel, getNextPage } from './model.page'
import {
  CreatePaginationListModelProps,
  GetNextProps,
  Item,
  ItemId,
  Request,
  RequestProps,
} from './types'

export const createPaginationListModel = <
  T extends Item,
  Q extends RequestProps
>({
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
      if (!nextPage) return
      return request({ page: nextPage, size: pageSize, ...props })
    }),
  })

  const setItems = createEvent<T[]>()
  const addItems = createEvent<T[]>()
  const updateItem = createEvent<ItemId & Partial<T>>()

  const $items = restore<T[]>(setItems, [])
    .on(addItems, (state, payload) => [...state, ...payload])
    .on(updateItem, (state, payload) =>
      state.map((item) =>
        item.id.toString() === payload.id.toString()
          ? { ...item, ...payload }
          : item
      )
    )

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
