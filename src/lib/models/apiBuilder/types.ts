import { ServerManager, StateModel } from 'altek-toolkit'

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
  ? (body?: unknown) => RequestProps<T>
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
export type Tokens = {
  access: string
  refresh: string
}
export type TokensProps = Tokens & {
  type?: TokenType
}
export type TokenRefresher = (props: TokensProps) => Promise<Tokens>

export type TokenSettings = {
  accessLifeTime?: number
  refreshLifeTime?: number
  dbField?: string
}

export type RequestModelProps = {
  server?: ServerManager
  tokenRefresher: TokenRefresher
  tokenSettings?: TokenSettings
}
export type TokenType = 'Bearer' | 'JWT'

export type CreateRequestProps<Params> = {
  endpoint: string
  method: Method
  withToken?: boolean
  fn?: MapperFn<Params>
}
export type CreateRequestEffectProps<Response, Params> = {
  props: RequestPropsGetter<Params>
  request: (props: DoRequestProps<Params>) => Promise<Response>
}
