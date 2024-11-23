// import apiClient from "@/core/api/api"
import apiClient from "@/core/api/api"
import {
  GetTotalBenefit,
  TransactionStatus,
  TransactionWithProduct,
} from "@/core/api/transaction/transactionContract"
import { useQuery } from "@tanstack/react-query"

export const useTransactions = (status: TransactionStatus) => {
  const queryFn = async () => {
    try {
      const transactions = await apiClient.transactionRouter.getTransactions()
      // const transactions = await mockGetTransactions()
      if (status === TransactionStatus.AllTransactions) {
        return transactions
      } else {
        return transactions.filter(
          (t) => t.is_verified === (status === TransactionStatus.VerifyPet)
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

export const mockGetTransactions = (): Promise<TransactionWithProduct[]> => {
  const data: TransactionWithProduct[] = [
    {
      id: 1,
      product_id: 1,
      buyer_id: 2,
      seller_id: 1,
      amount: 2050,
      created_at: "2024-11-21 23:16:28.995955 +0700 +07",
      price: 2050,
      is_verified: false,
      is_sold: true,
    },
  ]
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 2000)
  })
}

export const useTotalBenefitAndIncome = (
  transactions: TransactionWithProduct[]
) => {
  if (!transactions) {
    return {
      totalBenefit: 0,
      totalIncome: 0,
    }
  }

  const totalIncome = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  )
  const totalBenefit = totalIncome * 0.05 // 5% of total income

  return {
    totalBenefit,
    totalIncome,
  }
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
