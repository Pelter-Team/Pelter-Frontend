import { APIError } from "../../error"
import { apiContract } from "../.."
import { Router } from "../../router"
import { SortOption } from "../../type"
import {
  LoginResponse,
  RegisterRequest,
  UserList,
  UserResponse,
} from "../userContract"
import { GraphSelectRangeEnumValue } from "@/features/admin/components/GraphSelectRange"
import { ApiError } from "next/dist/server/api-utils"

export class UserRouter extends Router<typeof apiContract> {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await this.client.user.login({
      body: { email: email, password: password },
    })
    switch (response.status) {
      case 200:
        return response.body.result
      case 400:
        console.log("hello 400", response.body)
        throw new ApiError(response.status, response.body.error)
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

  async me(): Promise<UserResponse> {
    const response = await this.client.user.me()
    switch (response.status) {
      case 200:
        return response.body.result
      default:
        throw new APIError(response.status, "Failed to get me")
    }
  }

  async getUserList(): Promise<UserList[]> {
    // status: (typeof TransactionStatus)[keyof typeof TransactionStatus]
    const response = await this.client.user.getUserList()
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
