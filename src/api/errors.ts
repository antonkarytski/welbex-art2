type ErrorProps = {
  status: number
  message: string
  data?: any
}

export class ApiError extends Error {
  static noTokenProvided() {
    return new ApiError({
      status: 0,
      message: 'No token provided',
    })
  }

  static unknown(body: any) {
    return {
      status: body?.status ?? 0,
      message: 'Unknown error',
      data: body,
    }
  }

  static async fromResponse(response: Response) {
    const errorBody = await response.json()
    return new ApiError({
      status: response.status,
      message: errorBody.error,
      data: errorBody,
    })
  }

  public readonly responseError = true
  public status
  public data

  constructor({ message = '', status, data }: ErrorProps) {
    super()
    this.message = message
    this.status = status
    this.data = data
  }
}
