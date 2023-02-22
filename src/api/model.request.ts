import { Effect, createEffect, createEvent, restore } from 'effector'

type ApiRequest<T> = Effect<any, T, Error>

export const createRequestItemModel = <T>(apiRequest: ApiRequest<T>) => {
  const setData = createEvent<T>()
  const $item = restore(setData, null)

  const get = createEffect((id: number | string) => apiRequest(id))

  get.done.watch(({ result }) => {
    setData(result)
  })

  const $isLoading = get.pending

  return {
    get,
    $item,
    $isLoading,
  }
}
