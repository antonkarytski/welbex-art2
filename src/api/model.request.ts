import { Effect, createEffect, createEvent, createStore } from 'effector'

type ApiRequest<T> = Effect<any, T, Error>

type RequestProps = void | Record<string, any> | number

export const createRequestModel = <T>(request: ApiRequest<T>) => {
  const setData = createEvent<T>()
  const update = createEvent<Partial<T>>()
  const $data = createStore<Partial<T> | null>(null)
    .on(setData, (_, payload) => payload)
    .on(update, (state, payload) => ({
      ...state,
      ...payload,
    }))

  const get = createEffect((props: RequestProps) => request(props))

  get.done.watch(({ result }) => {
    setData(result)
  })

  const $isLoading = get.pending

  return {
    get,
    $data,
    $isLoading,
    update,
  }
}
