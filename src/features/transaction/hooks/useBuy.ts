import apiClient from "@/core/api/api"
import { useMutation } from "@tanstack/react-query"

export const useBuy = () => {
  const fn = async (productId: number) => {
    try {
      const response =
        await apiClient.transactionRouter.insertTransaction(productId)
      return { response: response }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred"
      throw errorMessage
    }
  }

  const mutation = useMutation({
    mutationFn: (productId: number) => fn(productId),
  })

  return {
    buyFlow: mutation.mutateAsync,
    isPending: mutation.isPending,
  }
}
