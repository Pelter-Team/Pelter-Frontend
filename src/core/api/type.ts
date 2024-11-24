export interface Response<T> {
  result: T
  success: boolean
}

export interface ErrorResponse extends Response<null> {
  error: string
}

export enum SortOption {
  SortByLatest = "Sort By Latest",
  SortByOldest = "Sort By Oldest",
  AToZ = "A to Z",
  ZToA = "Z",
}
