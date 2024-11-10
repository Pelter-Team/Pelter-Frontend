// import apiClient from "@/core/api/api"
import { GetTransactionsResponse } from "@/core/api/transaction/transaction"
import { useQuery } from "@tanstack/react-query"

export const useTransactions = (status: string) => {
  const query = useQuery({
    queryKey: ["transactions", status],
    // queryFn: apiClient.transactionRouter.getTransactions,
    queryFn: mockUseTransactions,
    refetchInterval: 30 * 1000,
  })
  return query
}

export const mockUseTransactions = (): Promise<GetTransactionsResponse[]> => {
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
