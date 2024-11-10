import { initContract } from "@ts-rest/core"
import { z } from "zod"
import { ErrorResponse, Response } from "../type"

export const TransactionSchema = z.object({
  transactionId: z.string(),
  createdAt: z.date(),
  petId: z.number(),
  price: z.number(),
  status: z.enum(["cancel", "processing", "success"]),
})

const c = initContract()

export type GetTransactionsResponse = z.infer<typeof TransactionSchema>
export const transactionContract = c.router({
  getTransactions: {
    method: "GET",
    path: "/transactions",
    responses: {
      200: c.type<Response<GetTransactionsResponse>>(),
      400: c.type<Response<ErrorResponse>>(),
    },
  },
})
