import { APIError } from "../../error"
import { apiContract } from "../.."
import { Router } from "../../router"
import { TransactionStatus } from "../transactionContract"
import { GraphSelectRangeEnumValue } from "@/features/admin/components/GraphSelectRange"

export class TransactionRouter extends Router<typeof apiContract> {
  async getTransactions(
    status: (typeof TransactionStatus)[keyof typeof TransactionStatus]
  ) {
    const response = await this.client.transaction.getTransactions({
      query: { status: status },
    })
    switch (response.status) {
      case 200:
        return response.body.result
      default:
        throw new APIError(response.status, "Failed to fetch transactions data")
    }
  }

  async insertTransaction(id: number) {
    const response = await this.client.transaction.insertTransaction({
      params: { id: id },
      body: {},
    })
    switch (response.status) {
      case 201:
        return response.body.result
      default:
        throw new APIError(response.status, "Failed to insert transaction")
    }
  }

  async getTotalBenefitAndInncome() {
    const response = await this.client.transaction.getTotalBenefitAndInncome()
    switch (response.status) {
      case 200:
        return response.body.result
      default:
        throw new APIError(
          response.status,
          "Failed to fetch total benefit and income"
        )
    }
  }

  async getGraphStatistic(graphRange: keyof typeof GraphSelectRangeEnumValue) {
    const response = await this.client.transaction.getGraphStatistic({
      query: {
        graphRange: graphRange,
      },
    })
    switch (response.status) {
      case 200:
        return response.body.result
      default:
        throw new APIError(
          response.status,
          "Failed to fetch total benefit and income"
        )
    }
  }
}
