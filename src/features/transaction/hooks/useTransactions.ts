// import apiClient from "@/core/api/api"
import {
  GetTotalBenefit,
  GetTransactionsResponse,
  TransactionStatus,
} from "@/core/api/transaction/transactionContract"
import { useQuery } from "@tanstack/react-query"

export const useTransactions = (status: TransactionStatus) => {
  const queryFn = async () => {
    try {
      const transactions =
        // await apiClient.transactionRouter.getTransactions(status)
        await mockGetTransactions()
      if (status === TransactionStatus.AllTransactions) {
        return transactions
      } else {
        return transactions.filter(
          (transaction) => transaction.status === status
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  const query = useQuery({
    queryKey: ["transactions", status],
    queryFn: () => queryFn(),
    // queryFn: mockGetTransactions,
    refetchInterval: 30 * 1000,
  })
  return query
}

export const mockGetTransactions = (): Promise<GetTransactionsResponse[]> => {
  const data: GetTransactionsResponse[] = [
    {
      transactionId: "John Brown",
      createdAt: new Date(),
      petId: 1,
      price: 500,
      status: "success",
    },
    {
      transactionId: "John Brown",
      createdAt: new Date(),
      petId: 2,
      price: 500,
      status: "cancel",
    },
    {
      transactionId: "John Brown",
      createdAt: new Date(),
      petId: 3,
      price: 500,
      status: "processing",
    },
  ]
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 2000)
  })
}

export const useTotalBenefitAndIncome = () => {
  const query = useQuery({
    queryKey: ["get-total-benefit-and-income"],
    // queryFn: apiClient.transactionRouter.getTotalBenefitAndInncome,
    queryFn: mockGetTotalBenefitAndInncome,
    refetchInterval: 30 * 1000,
  })
  return query
}

export const mockGetTotalBenefitAndInncome = (): Promise<GetTotalBenefit> => {
  const data: GetTotalBenefit = {
    totalBenefit: 12322442,
    totalIncome: 128283992,
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 2000)
  })
}
