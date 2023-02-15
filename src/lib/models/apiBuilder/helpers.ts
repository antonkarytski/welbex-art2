import { ApiError } from './errors'
import { ContentType, RequestFnProps } from './types'

export function bodyToParams(body: object) {
  return Object.entries(body)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
}

export function getUrlEnd(value: number | string | undefined) {
  if (typeof value === 'number') return `/${value}`
  return value ? `${value.startsWith('/') ? '' : '/'}${value}` : ''
}

export function removeSlashes(value: string) {
  let result = value
  if (result.startsWith('/')) {
    result = result.slice(1)
  }
  if (result.endsWith('/')) {
    result = result.slice(0, -1)
  }
  return result
}

export function prepareRequestData<Body>({
  withToken,
  tokenType = 'Bearer',
  token,
  body,
  method,
  contentType = ContentType.JSON,
}: RequestFnProps<Body>) {
  const headers: HeadersInit = {
    'Content-Type': contentType,
  }
  if (withToken) headers.Authorization = `${tokenType} ${token}`
  const data: RequestInit = { method, headers }
  if (body) {
    if (contentType === ContentType.JSON) {
      data.body = JSON.stringify(body)
    }
    if (contentType === ContentType.FORM) {
      data.body = body as any as FormData
    }
  }
  return data
}

export async function doRequest<Body>(props: RequestFnProps<Body>) {
  if (props.withToken && !props.token) {
    throw ApiError.noTokenProvided()
  }
  return fetch(props.url, prepareRequestData(props))
}

export async function request<Response, Body = any>(
  props: RequestFnProps<Body>
) {
  const response = await doRequest(props)
  const contentType = response.headers.get('content-type')
  const isJsonAvailable = contentType === 'application/json'
  if (response.ok) {
    if (!isJsonAvailable) return null as Response
    return (await response.json()) as Response
  }
  throw await ApiError.fromResponse(response)
}
