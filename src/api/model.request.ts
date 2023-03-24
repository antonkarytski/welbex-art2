import { Effect, createEffect, createEvent, restore } from 'effector'

export const createRequestModel = <P, R>(
  request: Effect<P, R>,
  staticProps?: Partial<P>
) => {
  const setData = createEvent<R>()
  const update = createEffect<Partial<R>, R>()
  const $data = restore(setData, null).on(update.doneData, (state, payload) =>
    state
      ? {
          ...state,
          ...payload,
        }
      : payload
  )

  const get = createEffect((props: P) => request({ ...staticProps, ...props }))

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
