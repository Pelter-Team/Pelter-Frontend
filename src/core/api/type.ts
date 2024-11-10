export interface Response<T> {
  data: T
  msg: string
}

export interface ErrorResponse<T = string> {
  code: T
  msg: string
}
