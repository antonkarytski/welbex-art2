import { TokenType } from './types.token'

export enum ContentType {
  JSON = 'application/json',
  FORM = 'application/x-www-form-urlencoded',
}
export type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'
export type RequestRouteSettings = {
  method: Method
  withToken?: boolean
  contentType?: ContentType
}
type RequestData<Body = any> = {
  contentType?: ContentType
  url: string
  body?: Body
}
export type RequestProps<Body = any> = RequestRouteSettings & RequestData<Body>
export type MapperFn<Body> = (
  props: Body
) =>
  | Partial<
      Omit<RequestData, 'url'> & {
        url: string | number
        entityId?: number | string
      }
    >
  | string
  | number
export type RequestPropsGetter<T> = unknown extends T
  ? (body?: unknown) => RequestProps<T>
  : (body: T) => RequestProps<T>
export type RequestFnProps<Body> = RequestProps<Body> & {
  token?: string | null
  tokenType?: TokenType
}
export type DoRequestProps<Body> = RequestFnProps<Body> & {
  attempt?: number
}

export type CreateRequestProps<Params> = {
  endpoint: string
  fn?: MapperFn<Params>
} & RequestRouteSettings
