import { bodyToParams, getUrlEnd, removeSlashes } from './helpers'
import { MapperFn, Method, RequestProps, RequestPropsGetter } from './types'

class Endpoint {
  private readonly _endpoint
  private isProtected = false

  public constructor(endpoint: string) {
    this._endpoint = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint
  }

  public protect() {
    this.isProtected = true
    return this
  }

  private createCommonResponse(method: Method): RequestProps {
    return {
      withToken: this.isProtected,
      url: this._endpoint,
      method,
    }
  }

  private methodWithBody<T>(
    method: Method,
    fn?: MapperFn<T>
  ): RequestPropsGetter<T> {
    return ((props: T) => {
      const response = this.createCommonResponse(method)
      if (!fn) {
        return { ...response, body: props }
      }
      const { body, url, ...rest } = fn(props)
      const urlEnd = getUrlEnd(url)
      return { ...response, ...rest, body, url: `${this._endpoint}${urlEnd}` }
    }) as RequestPropsGetter<T>
  }

  private methodWithParams<T>(
    method: Method,
    fn?: MapperFn<T>
  ): RequestPropsGetter<T> {
    return ((props: T) => {
      const response = this.createCommonResponse(method)
      if (!fn) {
        if (props === undefined || props === null) return response
        if (typeof props === 'object') {
          const params = bodyToParams(props)
          const url = params ? `${this._endpoint}?${params}` : this._endpoint
          return { ...response, url }
        }
        const url = `${this._endpoint}/${props}`
        return { ...response, url }
      }
      const { body, url, ...rest } = fn(props)
      const params = body ? bodyToParams(body) : ''
      const urlEnd = getUrlEnd(url)
      const urlParams = params ? `?${params}` : ''
      return {
        ...response,
        ...rest,
        url: `${this._endpoint}${urlEnd}${urlParams}`,
      }
    }) as RequestPropsGetter<T>
  }

  public method<T>(method: Method, fn?: MapperFn<T>): RequestPropsGetter<T> {
    if (method === 'GET') {
      return this.methodWithParams(method, fn)
    }
    return this.methodWithBody(method, fn)
  }
  public post<T>(fn?: MapperFn<T>): RequestPropsGetter<T> {
    return this.method('POST', fn)
  }
  public get<T>(fn?: MapperFn<T>): RequestPropsGetter<T> {
    return this.method('GET', fn)
  }
  public put<T>(fn?: MapperFn<T>): RequestPropsGetter<T> {
    return this.method('PUT', fn)
  }
  public delete<T>(fn?: MapperFn<T>): RequestPropsGetter<T> {
    return this.method('DELETE', fn)
  }
  public patch<T>(fn?: MapperFn<T>): RequestPropsGetter<T> {
    return this.method('PATCH', fn)
  }
  public createEndpoint(rawEndpoint: string) {
    const endpoint = removeSlashes(rawEndpoint)
    return new Endpoint(`${this._endpoint}/${endpoint}`)
  }
}

export const createEndpoint = (endpoint: string) => {
  return new Endpoint(endpoint)
}
