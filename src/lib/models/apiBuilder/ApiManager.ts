import { createEffect } from 'effector'
import { ServerManager } from 'altek-toolkit'
import { ApiEndpoint, CreateApiEndpointSettings } from './ApiEndpoint'
import { Endpoint } from './Endpoint'
import { TokenManager } from './TokenManager'
import { ApiError } from './errors'
import { doRequest } from './helpers'
import {
  CreateRequestProps,
  DoRequestProps,
  RequestFnProps,
  RequestModelProps,
} from './types'

export class ApiManager {
  private readonly server: ServerManager | null = null
  private readonly token

  constructor({ server, tokenRefresher, tokenSettings }: RequestModelProps) {
    if (server) this.server = server
    this.token = new TokenManager(tokenRefresher, tokenSettings)
  }

  private async retrieveToken(props: RequestFnProps<any>) {
    if (!props.withToken) return null
    if (props.token) return props.token
    const token = await this.token.get()
    if (!token) throw ApiError.needLogin()
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
    if (
      Number(response.status) === 401 &&
      props.withToken &&
      !props._secondAttempt
    ) {
      const newToken = await this.token.refresh()
      if (!newToken) throw ApiError.needLogin()
      return this.doRequest({
        ...props,
        token: newToken.access,
        _secondAttempt: true,
      })
    }
    if (!isJsonAvailable) throw ApiError.unknown(response)
    throw await ApiError.fromResponse(response)
  }

  public createRequest<Response = any, Params = void>(
    props: CreateRequestProps<Params>
  ) {
    const endpoint = new Endpoint(this.server, props.endpoint)
    if (props.withToken) endpoint.protect()
    const propsGetter = endpoint.method(props.method, props.fn)
    return createEffect((params: Params) => {
      const requestProps = propsGetter(params)
      return this.doRequest<Response, Params>(requestProps)
    })
  }

  public createEndpoint(
    endpoint: string,
    settings?: CreateApiEndpointSettings
  ) {
    const endpointEntity = new Endpoint(this.server, endpoint)
    if (settings?.withToken) endpointEntity.protect()
    return new ApiEndpoint({
      endpoint: endpointEntity,
      requestHandler: this.doRequest.bind(this),
    })
  }
}
