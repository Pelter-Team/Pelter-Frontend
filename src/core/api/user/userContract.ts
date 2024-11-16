import { initContract } from "@ts-rest/core"
import { z } from "zod"
import { ErrorResponse, Response, SortOption } from "../type"

export const UserListchema = z.object({
  userId: z.string(),
  username: z.string(),
  phone: z.string(),
  address: z.string(),
  createdAt: z.date(),
})

export type UserList = z.infer<typeof UserListchema>

const c = initContract()
export const userContract = c.router({
  getUserList: {
    method: "GET",
    path: "/customer-info",
    responses: {
      200: c.type<Response<UserList[]>>(),
      400: c.type<Response<ErrorResponse>>(),
    },
    query: c.type<{
      sort: SortOption
      search: string
    }>(),
  },
})

export enum UserType {
  Individual = "Individual",
  Foundation = "Foundation",
}
