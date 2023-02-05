type Method = 'POST' | 'GET' | 'PUT'
type RequestProps<Body = any> = {
  url: string
  method?: Method
  token?: boolean
  body?: Body
}
type RequestPropsSettings<Body = any> = {
  url?: string
  body?: Body
}
type Mapper = (...params: any[]) => Partial<RequestPropsSettings>
type GetterWithMap<Fn extends Mapper> = (
  ...params: Parameters<Fn>
) => RequestProps<ReturnType<Fn>['body']>
type RequestPropsGetter<T> = (body: T) => RequestProps<T>
type GetterRouter<T> = T extends Mapper
  ? GetterWithMap<T>
  : RequestPropsGetter<T>
type MethodFn<T> = T extends Mapper ? T : never
type MethodProps<T> = T extends Mapper ? Parameters<T> : [T]
type MethodParamsProps<T> = T extends Mapper
  ? Parameters<T>
  : T extends Record<string, string | number | boolean>
  ? [T]
  : never

function bodyToParams(body: Record<string, string | number | boolean>) {
  return Object.entries(body)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
}

function getUrlEnd(value: string | undefined) {
  return value ? `${value.startsWith('/') ? '' : '/'}${value}` : ''
}

class Endpoint {
  private readonly endpoint
  private isProtected = false

  public constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  public protect() {
    this.isProtected = true
    return this
  }

  private methodWithBody<T = void>(method: Method): RequestPropsGetter<T>
  private methodWithBody<Fn extends Mapper>(
    method: Method,
    fn: Fn
  ): GetterWithMap<Fn>
  private methodWithBody<T>(method: Method, fn?: MethodFn<T>): GetterRouter<T> {
    return ((...props: MethodProps<T>) => {
      if (!fn) {
        return {
          body: props[0],
          token: this.isProtected,
          url: this.endpoint,
          method,
        }
      }
      const fnResult = fn(...props)
      const urlEnd = getUrlEnd(fnResult.url)

      return {
        body: fnResult.body,
        token: this.isProtected,
        url: `${this.endpoint}${urlEnd}`,
        method,
      }
    }) as GetterRouter<T>
  }

  private methodWithParams<T = void>(method: Method): RequestPropsGetter<T>
  private methodWithParams<Fn extends Mapper>(
    method: Method,
    fn: Fn
  ): GetterWithMap<Fn>
  private methodWithParams<T>(
    method: Method,
    fn?: MethodFn<T>
  ): GetterRouter<T> {
    return ((...props: MethodParamsProps<T>) => {
      if (!fn) {
        const params = props[0] ? bodyToParams(props[0]) : ''
        const url = params ? `${this.endpoint}?${params}` : this.endpoint
        return { token: this.isProtected, url, method }
      }
      const fnResult = fn(...props)
      const params = fnResult.body ? bodyToParams(fnResult.body) : ''
      const urlEnd = getUrlEnd(fnResult.url)
      const urlParams = params ? `?${params}` : ''
      return {
        token: this.isProtected,
        url: `${this.endpoint}/${urlEnd}?${urlParams}`,
        method,
      }
    }) as GetterRouter<T>
  }

  public method<T = void>(method: Method): RequestPropsGetter<T>
  public method<Fn extends Mapper>(method: Method, fn: Fn): GetterWithMap<Fn>
  public method<T>(method: Method, fn?: MethodFn<T>): GetterRouter<T> {
    if (method === 'GET') {
      //@ts-ignore
      return this.methodWithParams(method, fn) as GetterRouter<T>
    }
    //@ts-ignore
    return this.methodWithBody(method, fn) as GetterRouter<T>
  }

  public post<T = void>(): RequestPropsGetter<T>
  public post<Fn extends Mapper>(fn: Fn): GetterWithMap<Fn>
  public post<T>(fn?: T extends Mapper ? T : never): GetterRouter<T> {
    //@ts-ignore
    return this.method('POST', fn) as GetterRouter<T>
  }
}

function createEndpoint(endpoint: string) {
  return new Endpoint(endpoint)
}

const sms = createEndpoint('fdf').method<{ hello: number; value?: string }>(
  'GET'
)
sms({ hello: 22 })
