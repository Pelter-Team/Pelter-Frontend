import { ErrorResponse } from "./type"

export class APIError<T extends string> extends Error {
  name = "API Request Error"
  isAPIError = true

  private _error: ErrorResponse<T> | undefined = undefined

  constructor(
    public status: number,
    message?: string,
    response?: ErrorResponse<T>
  ) {
    super(message ?? status.toString())
    if (response) this._error = response
  }

  public get errorResponse(): ErrorResponse<T> | undefined {
    return this._error
  }
}
