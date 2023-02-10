import { StateModel } from 'altek-toolkit'

export type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'
export type RequestProps<Body = any> = {
  url: string
  method?: Method
  withToken?: boolean
  body?: Body
}
type MapperReturn<Body = any> = {
  url?: string
  body?: Body
}
export type MapperFn<Body> = (props: Body) => Partial<MapperReturn<Body>>
export type Mapper = (...params: any[]) => Partial<MapperReturn>
export type GetterWithMap<Fn extends Mapper> = (
  ...params: Parameters<Fn>
) => RequestProps<ReturnType<Fn>['body']>
export type RequestPropsGetter<T> = unknown extends T
  ? (body?: never) => RequestProps<T>
  : (body: T) => RequestProps<T>
export type GetterRouter<T> = T extends Mapper
  ? GetterWithMap<T>
  : RequestPropsGetter<T>
export type TokenRefresherProps = {
  currentToken: string | null
  refreshToken?: string
}
export type RequestFnProps<Body> = RequestProps<Body> & {
  token?: string | null
}
export type DoRequestProps<Body> = RequestFnProps<Body> & {
  _secondAttempt?: boolean
}
export type RequestModelProps = {
  tokenModel?: StateModel<string | null>
  saveTo?: string
  tokenRefresher: (props: TokenRefresherProps) => Promise<string>
}
