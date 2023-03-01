import { Effect, Event, createEffect } from 'effector'
import { createXhr } from '../../request/xhr'
import { Endpoint, MethodSettings } from './Endpoint'
import { DoRequestProps, MapperFn, Method } from './types'

type CreateApiEndpointRequest<Params> = {
  fn?: MapperFn<Params>
} & MethodSettings

export type CreateApiEndpointSettings = {
  withToken?: boolean
}

type ApiEndpointProps = {
  endpoint: Endpoint
  requestHandler: <Response, Params>(
    props: DoRequestProps<Params>,
    driver?: typeof fetch
  ) => Promise<Response>
} & CreateApiEndpointSettings

export type SpecificRequestProps<Params> =
  | Omit<CreateApiEndpointRequest<Params>, 'method'>
  | MapperFn<Params>
  | string
  | number

function prepareRequestProps<Params = void>(
  method: Method,
  props?: SpecificRequestProps<Params>
): CreateApiEndpointRequest<Params> {
  if (!props) return { method }
  if (typeof props === 'function') return { fn: props, method }
  if (typeof props === 'string' || typeof props === 'number') {
    return { endpoint: props, method }
  }
  return { ...props, method }
}

export class ApiEndpoint {
  private readonly _endpoint
  private readonly requestHandler

  constructor(props: ApiEndpointProps) {
    this.requestHandler = props.requestHandler
    this._endpoint = props.endpoint
  }

  public protect() {
    this._endpoint.protect()
    return this
  }

  public unprotect() {
    this._endpoint.unprotect()
    return this
  }

  public endpoint(endpoint: string, settings?: CreateApiEndpointSettings) {
    const newEndpoint = this._endpoint.createEndpoint(endpoint)
    if (settings?.withToken !== undefined) {
      newEndpoint.setProtection(settings.withToken)
    }
    return new ApiEndpoint({
      endpoint: newEndpoint,
      requestHandler: this.requestHandler,
    })
  }

  public request<Response = any, Params = void>(
    props: CreateApiEndpointRequest<Params>
  ) {
    const propsGetter = this._endpoint.method(props, props.fn)
    const effect = createEffect((params: Params) => {
      const requestProps = propsGetter(params)
      return this.requestHandler<Response, Params>(requestProps)
    }) as Effect<Params, Response> & ExtEffectMethods<Params, Response>

    effect.withProgress = () => {
      const effectWithProgress = effect as Effect<Params, Response> &
        EffectProgressSettings &
        ExtEffectMethods<Params, Response>
      const xhr = createXhr()
      effectWithProgress.use((params: Params) => {
        const requestProps = propsGetter(params)
        return this.requestHandler<Response, Params>(requestProps, xhr.request)
      })
      effectWithProgress.progress = xhr.progress
      return effectWithProgress
    }
    return effect
  }

  public method<Response = any, Params = void>(
    method: Method,
    props?: SpecificRequestProps<Params>
  ) {
    const requestProps = prepareRequestProps(method, props)
    return this.request<Response, Params>(requestProps)
  }

  private specificMethodGetter(method: Method) {
    return <Response = any, Params = void>(
      props?: SpecificRequestProps<Params>
    ) => {
      return this.method<Response, Params>(method, props)
    }
  }

  public readonly get = this.specificMethodGetter('GET')
  public readonly post = this.specificMethodGetter('POST')
  public readonly put = this.specificMethodGetter('PUT')
  public readonly delete = this.specificMethodGetter('DELETE')
  public readonly patch = this.specificMethodGetter('PATCH')
}

type EffectProgressSettings = {
  progress: Event<ProgressEvent>
}

type ExtEffectMethods<Params, Response> = {
  withProgress: () => Effect<Params, Response> & EffectProgressSettings
}
