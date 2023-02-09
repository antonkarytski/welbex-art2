import { createEffect } from 'effector'
import { attach } from 'effector/effector.cjs'
import { StateModel, addStorePersist, createStateModel } from 'altek-toolkit'
import { ApiError } from '../../../api/errors'
import {
  CreateRequestProps,
  DoRequestProps,
  RequestFnProps,
  RequestModelProps,
  TokenRefresherProps,
} from './types'

function prepareData<Body>(props: RequestFnProps<Body>) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  if (props.withToken) headers.Authorization = `JWT ${props.token}`
  const data: RequestInit = { method: props.method, headers }
  if (props.body) data.body = JSON.stringify(props.body)
  return data
}

async function doRequest<Body>(props: RequestFnProps<Body>) {
  if (props.withToken && !props.token) {
    throw ApiError.noTokenProvided()
  }
  return fetch(props.url, prepareData(props))
}

export function createRequestEffect<Response, Params>({
  props: propsGetter,
  request,
}: CreateRequestProps<Response, Params>) {
  const effect = createEffect((...params: Parameters<typeof propsGetter>) => {
    const props = propsGetter(...(params as [any]))
    return request(props)
  }) as any as (...params: Parameters<typeof propsGetter>) => Response
  return () => {
    return effect
  }
}
const TOKEN_SAVE_DEFAULT_KEY = '@token_auto'

export class RequestManager {
  private readonly tokenModel: StateModel<string | null>
  private readonly tokenPersist
  private readonly tokenRefresher

  public readonly getToken
  public readonly refreshToken

  constructor({
    tokenModel,
    saveTo = TOKEN_SAVE_DEFAULT_KEY,
    tokenRefresher,
  }: RequestModelProps) {
    this.tokenRefresher = tokenRefresher
    this.tokenModel = tokenModel ?? createStateModel<string | null>(null)
    this.tokenPersist = addStorePersist({
      $store: this.tokenModel.$state,
      saveTo,
    })
    this.tokenPersist.onInit.watch(({ result }) => {
      if (result) this.tokenModel.set(result)
    })
    this.getToken = attach({
      source: this.tokenModel.$state,
      mapParams: (_: void, token) => token,
      effect: createEffect((token: string | null) => token),
    })
    this.refreshToken = attach({
      source: this.tokenModel.$state,
      mapParams: (_: void, token) => ({ currentToken: token }),
      effect: createEffect(async (props: TokenRefresherProps) => {
        const token = await this.tokenRefresher(props)
        this.tokenModel.set(token)
        return token
      }),
    })
  }

  public resetToken() {
    this.tokenModel.set(null)
  }

  public async setToken(token: string) {
    this.tokenModel.set(token)
  }

  private retrieveToken(props: RequestFnProps<any>) {
    if (!props.withToken) return null
    if (props.token) return props.token
    return this.getToken()
  }

  private async doRequest<Response, Params>(
    props: DoRequestProps<Params>
  ): Promise<Response> {
    const token = await this.retrieveToken(props)
    const response = await doRequest({ ...props, token })
    const contentType = response.headers.get('content-type')
    const isJsonAvailable = contentType === 'application/json'
    if (response.ok) {
      if (!isJsonAvailable) return null as Response
      return (await response.json()) as Response
    }
    if (Number(response.status) === 401 && token && !props._secondAttempt) {
      const newToken = await this.refreshToken()
      return this.doRequest({
        ...props,
        token: newToken,
        _secondAttempt: true,
      })
    }
    if (!isJsonAvailable) throw ApiError.unknown(response)
    throw await ApiError.fromResponse(response)
  }

  public request<Response>() {
    return async <Params>(props: DoRequestProps<Params>) => {
      return this.doRequest<Response, Params>(props)
    }
  }

  public readonly createRequestEffect = createRequestEffect
}
