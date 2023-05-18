export type PaginatedListProps = {
  page?: number
  size?: number
}

export type LocalizedPaginatedListProps = {
  language?: string
} & PaginatedListProps

export type PaginatedListResponse<T> = {
  items: T[]
  total: number
  page: number
  size: number
}
