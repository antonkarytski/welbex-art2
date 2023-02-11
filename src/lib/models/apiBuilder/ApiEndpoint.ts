import { createEffect } from 'effector'
import { Endpoint, MethodSettings } from './Endpoint'
import { DoRequestProps, MapperFn } from './types'

type CreateApiEndpointRequest<Params> = {
  fn?: MapperFn<Params>
} & MethodSettings
export type CreateApiEndpointSettings = {
  withToken?: boolean
}
type ApiEndpointProps = {
  endpoint: Endpoint
  requestHandler: <Response, Params>(
    props: DoRequestProps<Params>
  ) => Promise<Response>
} & CreateApiEndpointSettings

export class ApiEndpoint {
  private readonly endpoint
  private readonly requestHandler

  constructor(props: ApiEndpointProps) {
    this.requestHandler = props.requestHandler
    this.endpoint = props.endpoint
  }

  public createEndpoint(
    endpoint: string,
    settings?: CreateApiEndpointSettings
  ) {
    const newEndpoint = this.endpoint.createEndpoint(endpoint)
    if (settings?.withToken !== undefined) {
      newEndpoint.setProtection(settings.withToken)
    }
    return new ApiEndpoint({
      endpoint: newEndpoint,
      requestHandler: this.requestHandler,
    })
  }

  public createRequest<Response = any, Params = void>(
    props: CreateApiEndpointRequest<Params>
  ) {
    const propsGetter = this.endpoint.method(props, props.fn)
    return createEffect((params: Params) => {
      const requestProps = propsGetter(params)
      return this.requestHandler<Response, Params>(requestProps)
    })
  }
}
