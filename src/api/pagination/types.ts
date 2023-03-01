import { Effect } from 'effector'
import { PaginatedListProps, PaginatedListResponse } from '../types'

export type RequestProps = void | (PaginatedListProps & Record<string, any>)

export type GetNextProps<P> = {
  props: P
  nextPage: number | null
}

export type Request<R, P> = Effect<P, PaginatedListResponse<R>, Error>

export type CreatePaginationListModelProps<R, P> = {
  pageSize: number
  request: Request<R, P>
}
