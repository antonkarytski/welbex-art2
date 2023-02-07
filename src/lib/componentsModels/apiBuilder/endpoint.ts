type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'
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
type RequestPropsGetter<T> = unknown extends T
  ? (body?: never) => RequestProps<T>
  : (body: T) => RequestProps<T>
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
type MethodCreator = <T>(
  endpoint: string,
  fn?: T extends Mapper ? T : never
) => GetterRouter<T>

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
    this.endpoint = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint
  }

  public protect() {
    this.isProtected = true
    return this
  }

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

  private methodWithParams<T>(
    method: Method,
    fn?: MethodFn<T>
  ): GetterRouter<T> {
    return ((...props: MethodParamsProps<T>) => {
      if (!fn) {
        const firstProp = props[0]
        const response = { token: this.isProtected, url: this.endpoint, method }
        if (!firstProp && firstProp !== 0) return response
        if (typeof firstProp === 'object') {
          const params = bodyToParams(props[0])
          const url = params ? `${this.endpoint}?${params}` : this.endpoint
          return { ...response, url }
        }
        const url = `${this.endpoint}/${firstProp}`
        return { ...response, url }
      }
      const fnResult = fn(...props)
      const params = fnResult.body ? bodyToParams(fnResult.body) : ''
      const urlEnd = getUrlEnd(fnResult.url)
      const urlParams = params ? `?${params}` : ''
      return {
        token: this.isProtected,
        url: `${this.endpoint}${urlEnd}${urlParams}`,
        method,
      }
    }) as GetterRouter<T>
  }

  public method<T>(method: Method, fn?: MethodFn<T>): GetterRouter<T> {
    if (method === 'GET') {
      return this.methodWithParams(method, fn)
    }
    return this.methodWithBody(method, fn)
  }

  public post<T>(fn?: T extends Mapper ? T : never): GetterRouter<T> {
    return this.method('POST', fn)
  }
  public get<T>(fn?: T extends Mapper ? T : never): GetterRouter<T> {
    return this.method('GET', fn)
  }
  public put<T>(fn?: T extends Mapper ? T : never): GetterRouter<T> {
    return this.method('PUT', fn)
  }
  public delete<T>(fn?: T extends Mapper ? T : never): GetterRouter<T> {
    return this.method('DELETE', fn)
  }
  public patch<T>(fn?: T extends Mapper ? T : never): GetterRouter<T> {
    return this.method('PATCH', fn)
  }
}

export const createEndpoint = (endpoint: string) => {
  return new Endpoint(endpoint)
}
export const createMethod = <T>(
  endpoint: string,
  method: Method,
  fn?: T extends Mapper ? T : never
) => {
  return new Endpoint(endpoint).get(fn)
}
export const createGet: MethodCreator = (endpoint, fn) => {
  return new Endpoint(endpoint).get(fn)
}
export const createPost: MethodCreator = (endpoint, fn) => {
  return new Endpoint(endpoint).post(fn)
}
export const createPut: MethodCreator = (endpoint, fn) => {
  return new Endpoint(endpoint).put(fn)
}
export const createDelete: MethodCreator = (endpoint, fn) => {
  return new Endpoint(endpoint).delete(fn)
}
export const createPatch: MethodCreator = (endpoint, fn) => {
  return new Endpoint(endpoint).delete(fn)
}

const getEnd = createEndpoint('get')

//GET-empty
const getEmpty = getEnd.method('GET')
getEmpty()
//GET-props
const getPropsObj = getEnd.method<{ go: number }>('GET')
getPropsObj({ go: 1 }) //true
getPropsObj('hello') //false
getPropsObj({ go: '22' }) //false
const getPropsNumber = getEnd.method<number>('GET')
getPropsNumber() //false
getPropsNumber(22) //true
getPropsNumber('hh') //false
//GET-function
const getFnBody = getEnd.method('GET', (go: number) => ({
  body: { go },
}))
getFnBody(2) //true
getFnBody('2') //false
getFnBody(2, '2') //false
const getFnSomeProps = getEnd.method('GET', (go: number, ro: string) => ({
  body: { go },
}))
getFnSomeProps(2, '2') //true
getFnSomeProps(2, 2) //false
getFnSomeProps() //false
const getFnOptionalProp1 = getEnd.method('GET', (go?: number) => ({
  body: { go },
}))
getFnOptionalProp1(2) //true
getFnOptionalProp1() //true
getFnOptionalProp1('ho') //false
const getFnOptionalProp2 = getEnd.method('GET', (go: number, ro?: string) => ({
  body: { go },
}))
getFnOptionalProp2(22) //true
getFnOptionalProp2(22, 'hell;') //true
getFnOptionalProp2(22, 23) //false
const getFnUrl = getEnd.method('GET', (go: number, ro: string) => ({
  body: { go },
  url: ro,
}))
getFnUrl(2, '2') //true

//POST-empty
const emptyPost = getEnd.method('POST')
emptyPost()
emptyPost(22)
emptyPost({ go: 2 })
//POST-props
const postProps = getEnd.method<number>('POST')
postProps(22)
postProps('22')
postProps()
const postPropsObj = getEnd.method<{ hello: 22 }>('POST')
postPropsObj(22)
postPropsObj('22')
postPropsObj()
postPropsObj({ hello: 22 })
//POST-function
const postPropsFn = getEnd.method('POST', (go: string) => ({
  body: { hello: go },
  url: '22',
}))

postPropsFn({ hey: 22 })
postPropsFn('22')

const postPropsFnEmpty = getEnd.method('POST', () => ({
  body: { hello: 22 },
  url: '22',
}))
postPropsFnEmpty()
