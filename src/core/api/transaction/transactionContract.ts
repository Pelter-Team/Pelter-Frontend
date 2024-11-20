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

const c = initContract()
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
