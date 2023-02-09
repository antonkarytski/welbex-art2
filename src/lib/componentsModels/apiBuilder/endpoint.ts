import {
  GetterRouter,
  Mapper,
  Method,
  MethodCreator,
  MethodFn,
  MethodParamsProps,
  MethodProps,
  RequestProps,
} from './types'

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

  private createCommonResponse(method: Method): RequestProps {
    return {
      withToken: this.isProtected,
      url: this.endpoint,
      method,
    }
  }

  private methodWithBody<T>(method: Method, fn?: MethodFn<T>): GetterRouter<T> {
    return ((...props: MethodProps<T>) => {
      const response = this.createCommonResponse(method)
      if (!fn) {
        return { ...response, body: props[0] }
      }
      const { body, url, ...rest } = fn(...props)
      const urlEnd = getUrlEnd(url)
      return { ...response, ...rest, body, url: `${this.endpoint}${urlEnd}` }
    }) as GetterRouter<T>
  }

  private methodWithParams<T>(
    method: Method,
    fn?: MethodFn<T>
  ): GetterRouter<T> {
    return ((...props: MethodParamsProps<T>) => {
      const response = this.createCommonResponse(method)
      if (!fn) {
        const firstProp = props[0]

        if (!firstProp && firstProp !== 0) return response
        if (typeof firstProp === 'object') {
          const params = bodyToParams(props[0])
          const url = params ? `${this.endpoint}?${params}` : this.endpoint
          return { ...response, url }
        }
        const url = `${this.endpoint}/${firstProp}`
        return { ...response, url }
      }
      const { body, url, ...rest } = fn(...props)
      const params = body ? bodyToParams(body) : ''
      const urlEnd = getUrlEnd(url)
      const urlParams = params ? `?${params}` : ''
      return {
        ...response,
        ...rest,
        url: `${this.endpoint}${urlEnd}${urlParams}`,
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

const artWorksEndpoint = createEndpoint('artWorks')

const createArtWork = artWorksEndpoint.post<{ post: string; author: string }>()

createArtWork({ post: 'post', author: 'author' }) //✅
// @ts-expect-error
createArtWork('post') //❌

//Если body - это примитив то он будет добавлен к url
//если это объект то в посте/путе/патче итд он будет помещен в боди
//в гете он будет преобразован в параметры
//в данном случае результат будет таким
//{ url: 'artWorks/1', method: 'GET', withToken: false }
const getArtWorkById = artWorksEndpoint.get<number>()
getArtWorkById(1) //✅
// @ts-expect-error
getArtWorkById({ id: 1 }) //❌

type Filters = {
  age?: number
  country?: string
}

export const getArtWorksByFilter = artWorksEndpoint.get((filters: Filters) => {
  return {
    url: 'filters',
    body: filters,
  }
})

//В данном случае результат будет таким
//{ url: 'artWorks/filters?age=1&country=country', method: 'GET', withToken: false }
getArtWorksByFilter({ age: 1, country: 'country' }) //✅
// @ts-expect-error
getArtWorksByFilter('age=1') //❌

const getCategories = createGet<number>('categories')
getCategories(22) //✅

type CategoryUpdates = {
  image?: string
  author?: string
}

export const updateCategory = createPut(
  'categories/update',
  (updates: CategoryUpdates & { id: number }) => {
    return {
      url: `/${updates.id}`,
      body: updates,
    }
  }
)

//В данном случае результат будет таким
//{ url: 'categories/update/2?author=me', method: 'PUT', withToken: false }
updateCategory({ author: 'me', id: 2 })
