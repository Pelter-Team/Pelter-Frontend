import { APIError } from "../../error"
import { apiContract } from "../.."
import { Router } from "../../router"
import { SortOption } from "../../type"
import { UserList } from "../userContract"
import { GraphSelectRangeEnumValue } from "@/features/admin/components/GraphSelectRange"

export class UserRouter extends Router<typeof apiContract> {
  async getUserList(sort: SortOption, search: string): Promise<UserList[]> {
    // status: (typeof TransactionStatus)[keyof typeof TransactionStatus]
    const response = await this.client.user.getUserList({
      query: {
        sort: sort,
        search: search,
      },
    })
    switch (response.status) {
      case 200:
        return response.body.data
      default:
        throw new APIError(response.status, "Failed to fetch transactions data")
    }
  }

  async getGraphTotalUser(graphRange: keyof typeof GraphSelectRangeEnumValue) {
    const response = await this.client.user.getGraphTotalUser({
      query: {
        graphRange: graphRange,
      },
    })
    switch (response.status) {
      case 200:
        return response.body.data
      default:
        throw new APIError(response.status, "Failed to fetch transactions data")
    }
  }
}
