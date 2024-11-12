import { initContract } from "@ts-rest/core"
import { transactionContract } from "./transaction/transactionContract"
import { petContract } from "./pet/petContract"

const c = initContract()

export const apiContract = c.router({
  transaction: transactionContract,
  pet: petContract,
})
