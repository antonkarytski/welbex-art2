import { Effect, createEffect, createEvent, restore } from 'effector'

type ApiRequest<T> = Effect<any, T, Error>

export const createRequestItemModel = <T>(request: ApiRequest<T>) => {
  const setData = createEvent<T>()
  const $data = restore(setData, null)

  const get = createEffect((id: number | string) => request(id))

  get.done.watch(({ result }) => {
    setData(result)
  })

  const $isLoading = get.pending

  return {
    get,
    $data,
    $isLoading,
  }
}
