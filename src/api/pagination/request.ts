import { attach, createEffect, createEvent, restore } from 'effector'
import { createNextPageModel, getNextPage } from './model.page'
import {
  CreatePaginationListModelProps,
  GetNextProps,
  Item,
  Request,
  RequestProps,
} from './types'

export const createPaginationListModel = <
  R extends Item,
  P extends RequestProps
>({
  pageSize,
  request,
}: CreatePaginationListModelProps<R, P>) => {
  const { $nextPage, setNextPage } = createNextPageModel()

  const get = createEffect((props: P) =>
    request({ page: 1, size: pageSize, ...props })
  )

  const getNext = attach({
    source: $nextPage,
    mapParams: (props: P, nextPage) => ({
      nextPage,
      props,
    }),
    effect: createEffect(({ props, nextPage }: GetNextProps<P>) => {
      if (!nextPage) return
      return request({ page: nextPage, size: pageSize, ...props })
    }),
  })

  const setItems = createEvent<R[]>()
  const addItems = createEvent<R[]>()

  const $items = restore<R[]>(setItems, []).on(addItems, (state, payload) => [
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

export const createRequestAllModel = <R, P extends RequestProps>(
  request: Request<R, P>
) => {
  const setItems = createEvent<R[]>()
  const addItems = createEvent<R[]>()

  const $items = restore<R[]>(setItems, []).on(addItems, (state, payload) => [
    ...state,
    ...payload,
  ])

  const get = createEffect((props: P) => request(props))

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
