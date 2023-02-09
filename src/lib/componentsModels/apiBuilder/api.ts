import { GetterRouter, Mapper } from './types'

export class Api<L extends Record<string, GetterRouter<Mapper>>> {
  public readonly endpoints: L

  constructor(list: L) {
    this.endpoints = list
  }
}

export function createApi<L extends Record<string, GetterRouter<Mapper>>>(
  list: L
) {
  return new Api(list)
}
