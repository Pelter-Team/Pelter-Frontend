export interface Response<T> {
  result: T
  success: boolean
}

export interface ErrorResponse<T = string> extends Response<null> {
  error: T
}

export enum SortOption {
  SortByLatest = "Sort By Latest",
  SortByOldest = "Sort By Oldest",
  AToZ = "A to Z",
  ZToA = "Z",
}
