import { Effect, Event, Store } from 'effector'

type PaginatedListProps = {
  page?: number
  size?: number
}

type PaginatedListResponse<T> = {
  items: T[]
  total: number
  page: number
  size: number
}

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
  idExtractor?: (item: Partial<R>) => string | number | undefined
  staticProps?: P
}

export type PaginationListModelResponse<R, P> = {
  $items: Store<R[]>
  $nextPage: Store<number | null>
  setNextPage: Event<SetNextPageProps | null>
  get: Request<R, P>
  getSync: (props: P) => void
  getNext: Effect<P, void, Error>
  getNextSync: (props: P) => void
  $isLoading: Store<boolean>
  $isNextLoading: Store<boolean>
  setItems: Event<R[]>
  reset: () => void
  updateItem: Effect<Partial<R>, R[], Error>
  refresh: Request<R, P>
  refreshSync: (props: P) => void
  $isRefreshing: Store<boolean>
}

export type CreatePaginationListModel<R, P> = (
  props: PaginationListModelProps<R, P>
) => PaginationListModelResponse<R, P>
