import { Effect } from 'effector'
import { PaginatedListProps, PaginatedListResponse } from '../types'

export type RequestProps = void | (PaginatedListProps & Record<string, any>)

export type Item = Record<string, any>

export type GetNextProps<P extends RequestProps> = {
  props: P
  nextPage: number | null
}

export type Request<R, P extends RequestProps> = Effect<
  P,
  PaginatedListResponse<R>,
  Error
>

export type CreatePaginationListModelProps<R, P extends RequestProps> = {
  pageSize: number
  request: Request<R, P>
}
