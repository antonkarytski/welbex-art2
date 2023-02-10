import { Effect, createEffect } from 'effector'
import { attach } from 'effector/effector.cjs'
import { StateModel, addStorePersist, createStateModel } from 'altek-toolkit'
import { ApiError } from '../../../api/errors'
import { createEndpoint } from './endpoint'
import { doRequest } from './helpers'
import {
  DoRequestProps,
  MapperFn,
  Method,
  RequestFnProps,
  RequestModelProps,
  RequestPropsGetter,
  TokenRefresherProps,
} from './types'

const TOKEN_SAVE_DEFAULT_KEY = '@token_auto'
function createPropsGetter<Params>(props: CreateRequestProps<Params>) {
  const endpoint = createEndpoint(props.endpoint)
  if (props.withToken) endpoint.protect()
  return endpoint.method(props.method, props.fn)
}

type CreateRequestProps<Params> = {
  endpoint: string
  method: Method
  withToken?: boolean
  fn?: MapperFn<Params>
}

type CreateRequestEffectProps<Response, Params> = {
  props: RequestPropsGetter<Params>
  request: (props: DoRequestProps<Params>) => Promise<Response>
}

export function createRequestEffect<Response, Params>({
  props: propsGetter,
  request,
}: CreateRequestEffectProps<Response, Params>) {
  return createEffect((params: Params) => {
    const requestProps = propsGetter(params as any)
    return request(requestProps)
  })
}

export class ApiManager {
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

  public createRequest<Response = any, Params = void>(
    props: CreateRequestProps<Params>
  ) {
    const propsGetter = createPropsGetter(props)
    return createEffect((params: Parameters<typeof propsGetter>[0]) => {
      const requestProps = propsGetter(params as any)
      return this.doRequest(requestProps)
    }) as Effect<Params, Response>
  }
}
