import { StateModel } from 'altek-toolkit'

export type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'
export type RequestProps<Body = any> = {
  url: string
  method?: Method
  withToken?: boolean
  body?: Body
}
type RequestPropsSettings<Body = any> = {
  url?: string
  body?: Body
}
export type Mapper = (...params: any[]) => Partial<RequestPropsSettings>
export type GetterWithMap<Fn extends Mapper> = (
  ...params: Parameters<Fn>
) => RequestProps<ReturnType<Fn>['body']>
type RequestPropsGetter<T> = unknown extends T
  ? (body?: never) => RequestProps<T>
  : (body: T) => RequestProps<T>
export type GetterRouter<T> = T extends Mapper
  ? GetterWithMap<T>
  : RequestPropsGetter<T>
export type MethodFn<T> = T extends Mapper ? T : never
export type MethodProps<T> = T extends Mapper ? Parameters<T> : [T]
export type MethodParamsProps<T> = T extends Mapper
  ? Parameters<T>
  : T extends Record<string, string | number | boolean>
  ? [T]
  : never
export type MethodCreator = <T>(
  endpoint: string,
  fn?: T extends Mapper ? T : never
) => GetterRouter<T>
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
type RequestFn<Return> = (props: RequestFnProps<any>) => Promise<Return>
export type CreateRequestProps<Return, Props> = {
  props: GetterRouter<Props>
  request: RequestFn<Return>
}
