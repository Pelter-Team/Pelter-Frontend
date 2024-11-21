import { APIError } from "../../error"
import { apiContract } from "../.."
import { Router } from "../../router"
import { TransactionStatus } from "../transactionContract"
import { GraphSelectRangeEnumValue } from "@/features/admin/components/GraphSelectRange"

export class TransactionRouter extends Router<typeof apiContract> {
  async getTransactions() {
    const response = await this.client.transaction.getTransactions()
    switch (response.status) {
      case 200:
        return response.body.result
      default:
        throw new APIError(response.status, "Failed to fetch transactions data")
    }
  }

  async insertTransaction(productId: number) {
    const response = await this.client.transaction.insertTransaction({
      params: { id: productId },
      body: {},
    })
    switch (response.status) {
      case 201:
        return response.body.result
      default:
        throw new APIError(response.status, "Failed to insert transaction")
    }
  }

  async getTransactionById(transactionId: number) {
    const response = await this.client.transaction.getTransactionById({
      params: { id: transactionId },
    })
    switch (response.status) {
      case 200:
        return response.body.result
      default:
        throw new APIError(
          response.status,
          "Failed to get transaction by transactionId"
        )
    }
  }

  async getTransactionByUserId(userId: number) {
    const response = await this.client.transaction.getTransactionByUserId({
      params: { id: userId },
    })
    switch (response.status) {
      case 200:
        return response.body.result
      default:
        throw new APIError(
          response.status,
          "Failed to get transaction by userId"
        )
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
