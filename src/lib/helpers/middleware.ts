import { OrArray } from 'altek-toolkit'
import { toArray } from './array'

export async function withMiddleware<T, S extends OrArray<T> = OrArray<T>>(
  sourceString: S,
  middlewareList?: ((source: T) => Promise<T>)[]
): Promise<S> {
  if (!middlewareList) return sourceString
  let uriList = toArray<T>(sourceString)
  for (let middleware of middlewareList) {
    uriList = await Promise.all(uriList.map(middleware))
  }
  if (Array.isArray(sourceString)) return uriList as S
  return uriList[0] as any as S
}
