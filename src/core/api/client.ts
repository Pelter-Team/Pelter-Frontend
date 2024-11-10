import { AxiosInstance } from "axios"
import { initRawAPIClient, RawAPIClient } from "./rawClient"
import { apiContract } from "."
import { TransactionRouter } from "./transaction/router/transaction"

export class APIClient {
  private client: RawAPIClient<typeof apiContract>
  transactionRouter: TransactionRouter

  constructor(axios: AxiosInstance, apiURL: string | undefined) {
    this.client = initRawAPIClient(axios, apiURL, apiContract)
    this.transactionRouter = new TransactionRouter(this.client)
  }
}
