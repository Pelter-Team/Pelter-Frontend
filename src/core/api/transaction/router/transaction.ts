import { APIError } from "../../error"
import { apiContract } from "../.."
import { Router } from "../../router"

export class TransactionRouter extends Router<typeof apiContract> {
  async getTransactions() {
    const response = await this.client.transaction.getTransactions()
    switch (response.status) {
      case 200:
        return response.body.data
      default:
        throw new APIError(response.status, "Failed to fetch transactions data")
    }
  }
}
