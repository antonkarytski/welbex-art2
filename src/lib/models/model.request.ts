import { Effect, createEffect, createEvent, restore } from 'effector'

export class RequestModel<P, R> {
  constructor(
    public readonly request: Effect<P, R>,
    public readonly staticProps?: Partial<P>
  ) {
    this.get.done.watch(({ result }) => {
      this.setData(result)
    })
  }

  public readonly setData = createEvent<R>()
  public readonly update = createEffect<Partial<R>, R>()
  public readonly $data = restore(this.setData, null).on(
    this.update.doneData,
    (state, payload) => (state ? { ...state, ...payload } : payload)
  )

  public readonly get = createEffect((props: P) =>
    this.request(this.staticProps ? { ...this.staticProps, ...props } : props)
  )

  public readonly $isLoading = this.get.pending
}
export const createRequestModel = <P, R>(
  request: Effect<P, R>,
  staticProps?: Partial<P>
) => {
  return new RequestModel(request, staticProps)
}
