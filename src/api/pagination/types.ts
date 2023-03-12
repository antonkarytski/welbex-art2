import { Effect, Event, Store } from 'effector'
import { PaginatedListProps, PaginatedListResponse } from '../types'

export type SetNextPageProps = {
  total: number
  page: number
  size: number
}

export type RequestProps = void | (PaginatedListProps & Record<string, any>)

export type GetNextProps<P> = {
  props: P
  nextPage: number | null
}

export type Request<R, P> = Effect<P, PaginatedListResponse<R>, Error>

export type PaginationListModelProps<R, P> = {
  pageSize: number
  request: Request<R, P>
}

export type PaginationListModelResponse<R, P> = {
  $items: Store<R[]>
  $nextPage: Store<number | null>
  setNextPage: Event<SetNextPageProps | null>
  get: Request<R, P>
  getNext: Effect<P, PaginatedListResponse<R> | null, Error>
  $isLoading: Store<boolean>
  $isNextLoading: Store<boolean>
  setItems: Event<R[]>
  reset: () => void
}

export type CreatePaginationListModel<R, P> = (
  props: PaginationListModelProps<R, P>
) => PaginationListModelResponse<R, P>
