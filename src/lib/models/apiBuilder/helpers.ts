import { ApiError } from './errors'
import { RequestFnProps } from './types'

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

function prepareData<Body>(props: RequestFnProps<Body>) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  if (props.withToken) headers.Authorization = `JWT ${props.token}`
  const data: RequestInit = { method: props.method, headers }
  if (props.body) data.body = JSON.stringify(props.body)
  return data
}

export async function doRequest<Body>(props: RequestFnProps<Body>) {
  if (props.withToken && !props.token) {
    throw ApiError.noTokenProvided()
  }
  return fetch(props.url, prepareData(props))
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
