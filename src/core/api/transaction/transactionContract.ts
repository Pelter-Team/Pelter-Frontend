import { initContract } from "@ts-rest/core"
import { z } from "zod"
import { ErrorResponse, Response } from "../type"
import { Graph } from "../pet/petContract"
import { GraphSelectRangeEnumValue } from "@/features/admin/components/GraphSelectRange"

export const GetTransactionsSchema = z.object({
  transactionId: z.string(),
  createdAt: z.date(),
  petId: z.number(),
  price: z.number(),
  status: z.enum(["cancel", "processing", "success"]),
})
export type GetTransactionsResponse = z.infer<typeof GetTransactionsSchema>

export const GetTotalBenefitSchema = z.object({
  totalBenefit: z.number(),
  totalIncome: z.number(),
})
export type GetTotalBenefit = z.infer<typeof GetTotalBenefitSchema>

export const TransactionSchema = z.object({
  id: z.number(),
  product_id: z.number(),
  buyer_id: z.number(),
  seller_id: z.number(),
  amount: z.number().positive(),
  created_at: z.string().datetime(),
})
export type Transaction = z.infer<typeof TransactionSchema>

const c = initContract()
// FIXME: tranasction is not ok right now in api docs, have to fix it
export const transactionContract = c.router({
  getTransactions: {
    method: "GET",
    path: "/transactions",
    responses: {
      200: c.type<Response<GetTransactionsResponse[]>>(),
      400: c.type<Response<ErrorResponse>>(),
    },
    query: c.type<{
      status: TransactionStatus
    }>(),
  },
  insertTransaction: {
    method: "POST",
    body: c.type<{}>(),
    path: "/transaction/buy/:id",
    pathParams: c.type<{
      id: number
    }>(),
    responses: {
      201: c.type<Response<Transaction>>(),
      400: c.type<Response<ErrorResponse>>(),
    },
  },
  getTotalBenefitAndInncome: {
    method: "GET",
    path: "/transactions/total",
    responses: {
      200: c.type<Response<GetTotalBenefit>>(),
      400: c.type<Response<ErrorResponse>>(),
    },
  },
  getGraphStatistic: {
    method: "GET",
    path: "/graph-statistic",
    responses: {
      200: c.type<Response<Graph[]>>(),
      400: c.type<Response<ErrorResponse>>(),
    },
    query: c.type<{
      graphRange: keyof typeof GraphSelectRangeEnumValue
    }>(),
  },
})

export enum TransactionStatus {
  AllTransactions = "all",
  Success = "success",
  Processing = "processing",
  Cancel = "cancel",
}
