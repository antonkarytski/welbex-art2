import { ServerManager } from 'altek-toolkit'
import { bodyToParams, getUrlEnd, removeSlashes } from './helpers'
import { MapperFn, Method, RequestProps, RequestPropsGetter } from './types'

export type MethodSettings = {
  endpoint?: string
  withToken?: boolean
  method: Method
}

type SpecificMethodSettings<T> = Omit<MethodSettings, 'method'> & {
  fn?: MapperFn<T>
}
type SpecificMethodProps<T> = MapperFn<T> | SpecificMethodSettings<T>

export class Endpoint {
  private readonly server: ServerManager | null = null
  private readonly _endpoint: string = ''
  private isProtected = false

  private get endpoint() {
    if (!this.server) return this._endpoint
    return this.server.url + this._endpoint
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
    const methodValue = typeof method === 'string' ? method : method.method
    const withToken =
      typeof method === 'string' ? this.isProtected : method.withToken
    const suffix = typeof method === 'string' ? '' : method.endpoint || ''
    return {
      withToken,
      url: `${this._endpoint}${getUrlEnd(suffix)}`,
      method: methodValue,
    }
  }

  private methodWithBody<T>(
    method: Method | MethodSettings,
    fn?: MapperFn<T>
  ): RequestPropsGetter<T> {
    const response = this.createCommonResponse(method)
    return ((props: T) => {
      if (!fn) return { ...response, body: props }
      const { body, url, ...rest } = fn(props)
      const urlEnd = getUrlEnd(url)
      return { ...response, ...rest, body, url: `${this.endpoint}${urlEnd}` }
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
      const { body, url, ...rest } = fn(props)
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

  private methodRoute<T>(method: Method, props?: SpecificMethodProps<T>) {
    if (!props || typeof props === 'function') {
      return this.method(method, props)
    }
    const { fn, ...rest } = props
    return this.method({ method, ...rest }, fn)
  }
  public post<T>(fn?: SpecificMethodProps<T>): RequestPropsGetter<T> {
    return this.methodRoute('POST', fn)
  }
  public get<T>(fn?: SpecificMethodProps<T>): RequestPropsGetter<T> {
    return this.methodRoute('GET', fn)
  }
  public put<T>(fn?: SpecificMethodProps<T>): RequestPropsGetter<T> {
    return this.methodRoute('PUT', fn)
  }
  public delete<T>(fn?: SpecificMethodProps<T>): RequestPropsGetter<T> {
    return this.methodRoute('DELETE', fn)
  }
  public patch<T>(fn?: SpecificMethodProps<T>): RequestPropsGetter<T> {
    return this.methodRoute('PATCH', fn)
  }
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
