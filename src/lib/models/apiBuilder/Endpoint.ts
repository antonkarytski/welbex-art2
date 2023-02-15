import { ServerManager } from 'altek-toolkit'
import { bodyToParams, getUrlEnd, removeSlashes } from './helpers'
import {
  ContentType,
  MapperFn,
  Method,
  RequestProps,
  RequestPropsGetter,
  RequestRouteSettings,
} from './types'

export type MethodSettings = {
  endpoint?: string | number
} & RequestRouteSettings

type SpecificMethodSettings<T> = Omit<MethodSettings, 'method'> & {
  fn?: MapperFn<T>
}
type SpecificMethodProps<T> = MapperFn<T> | SpecificMethodSettings<T>

function convertToFormData(list: Record<string, any>) {
  const formData = new FormData()
  Object.entries(list).forEach(([key, value]) => {
    formData.append(key, value)
  })
  return formData
}

function isObjectNotFormData(body: any): body is FormData {
  return body && typeof body === 'object' && !(body instanceof FormData)
}

export class Endpoint {
  private readonly server: ServerManager | null = null
  private readonly _endpoint: string = ''
  private isProtected = false

  private get endpoint() {
    if (!this.server) return this._endpoint
    return this.server.api + this._endpoint
  }

  public constructor(server: ServerManager | null, endpoint: string)
  public constructor(server: ServerManager, endpoint?: string)
  public constructor(endpoint: string)
  public constructor(
    serverOrEndpoint: string | ServerManager | null,
    endpoint?: string
  ) {
    if (typeof serverOrEndpoint === 'string') {
      this._endpoint = removeSlashes(serverOrEndpoint)
      return
    }
    if (serverOrEndpoint) {
      this.server = serverOrEndpoint
      this._endpoint = endpoint ? `/${removeSlashes(endpoint)}` : ''
      return
    }
    this._endpoint = removeSlashes(endpoint || '')
  }

  public setProtection(state: boolean) {
    this.isProtected = state
    return this
  }

  public unprotect() {
    return this.setProtection(false)
  }

  public protect() {
    return this.setProtection(true)
  }

  private createCommonResponse(method: Method | MethodSettings): RequestProps {
    if (typeof method === 'string') {
      return {
        withToken: this.isProtected,
        url: this.endpoint,
        method,
      }
    }
    const result: RequestProps = {
      method: method.method,
      withToken: method.withToken ?? this.isProtected,
      url: `${this.endpoint}${getUrlEnd(method.endpoint || '')}`,
    }
    if (method.contentType) result.contentType = method.contentType
    return result
  }

  private methodWithBody<T>(
    method: Method | MethodSettings,
    fn?: MapperFn<T>
  ): RequestPropsGetter<T> {
    const response = this.createCommonResponse(method)
    return ((props: T) => {
      if (!fn) {
        if (props === undefined || props === null) return { ...response }
        if (
          response.contentType === ContentType.FORM &&
          isObjectNotFormData(props)
        ) {
          const formData = convertToFormData(props)
          return { ...response, body: formData }
        }
        return { ...response, body: props }
      }
      const result = fn(props)
      if (typeof result === 'string' || typeof result === 'number') {
        return { ...response, url: `${this.endpoint}${getUrlEnd(result)}` }
      }
      const { body, url, ...rest } = result
      const urlEnd = getUrlEnd(url)
      const urlFull = `${this.endpoint}${urlEnd}`
      if (
        (response.contentType === ContentType.FORM ||
          rest.contentType === ContentType.FORM) &&
        isObjectNotFormData(body)
      ) {
        const formData = convertToFormData(body)
        return { ...response, ...rest, body: formData, url: urlFull }
      }
      return { ...response, ...rest, body, url: urlFull }
    }) as RequestPropsGetter<T>
  }

  private methodWithParams<T>(
    method: Method | MethodSettings,
    fn?: MapperFn<T>
  ): RequestPropsGetter<T> {
    const response = this.createCommonResponse(method)
    return ((props: T) => {
      if (!fn) {
        if (props === undefined || props === null) return response
        if (typeof props === 'object') {
          const params = bodyToParams(props)
          const url = params ? `${this.endpoint}?${params}` : this.endpoint
          return { ...response, url }
        }
        const url = `${this.endpoint}/${props}`
        return { ...response, url }
      }
      const result = fn(props)
      if (typeof result === 'string' || typeof result === 'number') {
        return { ...response, url: `${this.endpoint}${getUrlEnd(result)}` }
      }
      const { body, url, ...rest } = result
      const params = body ? bodyToParams(body) : ''
      const urlEnd = getUrlEnd(url)
      const urlParams = params ? `?${params}` : ''
      return {
        ...response,
        ...rest,
        url: `${this.endpoint}${urlEnd}${urlParams}`,
      }
    }) as RequestPropsGetter<T>
  }

  public method<T>(
    method: Method | MethodSettings,
    fn?: MapperFn<T>
  ): RequestPropsGetter<T> {
    if (method === 'GET') {
      return this.methodWithParams(method, fn)
    }
    return this.methodWithBody(method, fn)
  }

  private specificMethod(method: Method) {
    return <T>(props?: SpecificMethodProps<T>): RequestPropsGetter<T> => {
      if (!props || typeof props === 'function') {
        return this.method(method, props)
      }
      const { fn, ...rest } = props
      return this.method({ method, ...rest }, fn)
    }
  }
  public readonly post = this.specificMethod('POST')
  public readonly get = this.specificMethod('GET')
  public readonly put = this.specificMethod('PUT')
  public readonly delete = this.specificMethod('DELETE')
  public readonly patch = this.specificMethod('PATCH')
  public createEndpoint(rawEndpoint: string) {
    const endpoint = removeSlashes(rawEndpoint)
    const endpointEntity = new Endpoint(
      this.server,
      `${this._endpoint}/${endpoint}`
    )
    if (this.isProtected) endpointEntity.protect()
    return endpointEntity
  }
}
