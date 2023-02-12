export type PaginatedListProps = {
  page?: number
  size?: number
}

export type PaginatedListResponse<T> = {
  items: T[]
  total: number
  page: number
  size: number
}
