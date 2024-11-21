import { APIError } from "../../error"
import { apiContract } from "../.."
import { Router } from "../../router"
import { SortOption } from "../../type"
import { LoginResponse, RegisterRequest, UserList } from "../userContract"
import { GraphSelectRangeEnumValue } from "@/features/admin/components/GraphSelectRange"

export class UserRouter extends Router<typeof apiContract> {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await this.client.user.login({
      body: { username: username, password: password },
    })
    switch (response.status) {
      case 200:
        return response.body.result
      default:
        throw new APIError(response.status, "Failed to login")
    }
  }

  async register(body: RegisterRequest): Promise<LoginResponse> {
    const response = await this.client.user.register({
      body: body,
    })
    switch (response.status) {
      case 201:
        return response.body.result
      default:
        throw new APIError(response.status, "Failed to register")
    }
  }

  async logout(): Promise<string> {
    const response = await this.client.user.logout()
    switch (response.status) {
      case 200:
        return response.body.result
      default:
        throw new APIError(response.status, "Failed to logout")
    }
  }

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
        return response.body.result
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
        return response.body.result
      default:
        throw new APIError(response.status, "Failed to fetch transactions data")
    }
  }
}
