import { ApiError } from '../../../api/errors'
import { RequestFnProps } from './types'

export function bodyToParams(body: object) {
  return Object.entries(body)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
}

export function getUrlEnd(value: string | undefined) {
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
