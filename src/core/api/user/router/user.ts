import { APIError } from "../../error"
import { apiContract } from "../.."
import { Router } from "../../router"
import { SortOption } from "../../type"
import { UserList } from "../userContract"

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
}
