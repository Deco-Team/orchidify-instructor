export type SuccessResponseDto = {
  success: boolean
}

export type IdResponseDto = {
  _id: string
}

export type ListResponseDto<T> = {
  docs: T[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
