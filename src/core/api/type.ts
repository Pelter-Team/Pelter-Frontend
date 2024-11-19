export interface Response<T> {
  data: T
  msg: string
}

export interface ErrorResponse<T = string> {
  code: T
  msg: string
}

export enum SortOption {
  SortByLatest = "Sort By Latest",
  SortByOldest = "Sort By Oldest",
  AToZ = "A to Z",
  ZToA = "Z",
}
