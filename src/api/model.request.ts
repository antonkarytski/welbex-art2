import { Effect, createEffect, createEvent, restore } from 'effector'

type ApiRequest<T> = Effect<any, T, Error>

type RequestProps = void | Record<string, any> | number

export const createRequestModel = <T>(request: ApiRequest<T>) => {
  const setData = createEvent<T>()
  const $data = restore(setData, null)

  const get = createEffect((props: RequestProps) => request(props))

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
