import { Effect } from 'effector'
import { PaginatedListProps, PaginatedListResponse } from '../types'

export type RequestProps = void | (PaginatedListProps & Record<string, any>)

export type ItemId = {
  id: number | string
}
export type Item = Record<string, any> & ItemId

export type GetNextProps<Q extends RequestProps> = {
  props: Q
  nextPage: number | null
}

export type Request<T, Q extends RequestProps> = Effect<
  Q,
  PaginatedListResponse<T>,
  Error
>

export type CreatePaginationListModelProps<T, Q extends RequestProps> = {
  pageSize: number
  request: Request<T, Q>
}
