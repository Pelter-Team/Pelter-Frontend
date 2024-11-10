import { initContract } from "@ts-rest/core"
import { transactionContract } from "./transaction/transaction"

const c = initContract()

export const apiContract = c.router({
  transaction: transactionContract,
})
