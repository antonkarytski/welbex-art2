import { attach, createEffect, createEvent, restore } from 'effector'
import { noop } from '../../helpers'
import { createNextPageModel, getNextPage } from './model.page'
import {
  GetNextProps,
  PaginationListModelProps as ModelProps,
  PaginationListModelResponse as ModelResponse,
  Request,
  RequestProps,
} from './types'

export const createPaginationListModel = <R, P>({
  pageSize,
  request,
  idExtractor,
  staticProps,
}: ModelProps<R, P>): ModelResponse<R, P> => {
  const { $nextPage, setNextPage, reset: resetPage } = createNextPageModel()

  const get = createEffect((props: P) =>
    request({ page: 1, size: pageSize, ...staticProps, ...props })
  )
  const $isLoading = get.pending
  const getSync = (props: P) => {
    get(props).catch(noop)
  }

  const getNextPageData = attach({
    source: $nextPage,
    mapParams: (props: P, nextPage) => ({
      nextPage,
      props,
    }),
    effect: createEffect(({ props, nextPage }: GetNextProps<P>) => {
      if (!nextPage) return null
      return request({
        page: nextPage,
        size: pageSize,
        ...staticProps,
        ...props,
      })
    }),
  })
  const $isNextLoading = getNextPageData.pending

  const getNext = attach({
    source: $isNextLoading,
    mapParams: (props: P, isNextLoading) => ({
      isNextLoading,
      props,
    }),
    effect: createEffect(
      ({ props, isNextLoading }: { props: P; isNextLoading: boolean }) => {
        if (!isNextLoading) getNextPageData(props)
      }
    ),
  })

  const getNextSync = (props: P) => {
    getNext(props).catch(noop)
  }

  const refresh = createEffect((props: P) =>
    request({ page: 1, size: pageSize, ...staticProps, ...props })
  )
  const $isRefreshing = refresh.pending
  const refreshSync = (props: P) => {
    refresh(props).catch(noop)
  }

  const setItems = createEvent<R[]>()
  const addItems = createEvent<R[]>()
  const updateItemFx = createEffect(
    ({ item, items }: { item: Partial<R>; items: R[] }) => {
      return items.map((i) =>
        idExtractor?.(item) === idExtractor?.(i) ? { ...i, ...item } : i
      )
    }
  )

  const $items = restore<R[]>(setItems, [])
    .on(addItems, (state, payload) => [...state, ...payload])
    .on(updateItemFx.doneData, (_, payload) => payload)

  const updateItem = attach({
    source: $items,
    mapParams: (item: R, items) => ({ item, items }),
    effect: updateItemFx,
  })

  get.done.watch(({ result }) => {
    setNextPage(result)
    setItems(result?.items || [])
  })

  getNextPageData.done.watch(({ result }) => {
    if (!result) return
    setNextPage(result)
    addItems(result.items)
  })

  refresh.done.watch(({ result }) => {
    setNextPage(result)
    setItems(result?.items || [])
  })

  const reset = () => {
    resetPage()
    setItems([])
  }

  return {
    $nextPage,
    setNextPage,
    get,
    getSync,
    getNext,
    getNextSync,
    $items,
    $isLoading,
    $isNextLoading,
    setItems,
    reset,
    updateItem,
    refresh,
    refreshSync,
    $isRefreshing,
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
