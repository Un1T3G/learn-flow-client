export interface PaginatorQuery {
  perPage?: number
  page?: number
}

export interface PaginatorWithSearchTermQuery extends PaginatorQuery {
  searchTerm?: string
}

export interface PaginationResult<T> {
  data: T[]
  meta: {
    total: number
    prev: number | null
    next: number | null
  }
}
