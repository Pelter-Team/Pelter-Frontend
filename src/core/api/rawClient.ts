import {
  AppRouter,
  ClientArgs,
  InitClientReturn,
  initClient,
} from "@ts-rest/core"
import { AxiosInstance, Method, isAxiosError } from "axios"

export const defaultAPIURL = "https://localhost:5000"

export type RawAPIClient<T extends AppRouter> = InitClientReturn<T, ClientArgs>

export function initRawAPIClient<T extends AppRouter>(
  axiosClient: AxiosInstance,
  apiURL = defaultAPIURL,
  contract: T
): RawAPIClient<T> {
  const client = initClient(contract, {
    baseUrl: apiURL,
    baseHeaders: {},
    api: async (args) => {
      try {
        const result = await axiosClient.request({
          method: args.method as Method,
          url: encodeURI(args.path),
          headers: {
            ...args.headers,
          },
          data: args.body,
        })
        return {
          status: result.status,
          body: result.data,
          headers: result.headers as any,
        }
      } catch (e) {
        if (isAxiosError(e)) {
          const error = e
          if (error.response) {
            return {
              status: error.response.status,
              body: error.response.data,
              headers: error.response.headers,
            }
          }
        }
        throw e
      }
    },
  })
  return client
}
