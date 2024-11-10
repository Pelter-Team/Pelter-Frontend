import { APIError } from "../../error"
import { apiContract } from "../.."
import { Router } from "../../router"
import { TransactionStatus } from "../transaction"

export class TransactionRouter extends Router<typeof apiContract> {
  async getTransactions(
    status: (typeof TransactionStatus)[keyof typeof TransactionStatus]
  ) {
    const response = await this.client.transaction.getTransactions({
      query: { status: status },
    })
    switch (response.status) {
      case 200:
        return response.body.data
      default:
        throw new APIError(response.status, "Failed to fetch transactions data")
    }
  }

  async getTotalBenefitAndInncome() {
    const response = await this.client.transaction.getTotalBenefitAndInncome()
    switch (response.status) {
      case 200:
        return response.body.data
      default:
        throw new APIError(
          response.status,
          "Failed to fetch total benefit and income"
        )
    }
  }
}
