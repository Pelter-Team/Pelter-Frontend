import { AxiosInstance } from "axios"
import { initRawAPIClient, RawAPIClient } from "./rawClient"
import { apiContract } from "."
import { TransactionRouter } from "./transaction/router/transaction"
import { PetRouter } from "./pet/router/pet"

export class APIClient {
  private client: RawAPIClient<typeof apiContract>
  transactionRouter: TransactionRouter
  petRouter: PetRouter

  constructor(axios: AxiosInstance, apiURL: string | undefined) {
    this.client = initRawAPIClient(axios, apiURL, apiContract)
    this.transactionRouter = new TransactionRouter(this.client)
    this.petRouter = new PetRouter(this.client)
  }
}
