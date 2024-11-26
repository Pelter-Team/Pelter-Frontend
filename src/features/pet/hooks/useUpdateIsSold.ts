import apiClient from "@/core/api/api"
import { APIError } from "@/core/api/error"
import { queryClient } from "@/providers/queryProvider"
import { useMutation } from "@tanstack/react-query"

interface UpdateIsSoldInput {
  petId: number
  is_sold: boolean
}

export const useUpdateIsSold = () => {
  const flowFn = async ({ petId, is_sold }: UpdateIsSoldInput) => {
    try {
      const response = await apiClient.petRouter.updateIsSold(petId, is_sold)

      return { response: response }
    } catch (error) {
      if (error instanceof APIError) {
        throw error.message
      } else {
        throw error
      }
    }
  }

  const mutation = useMutation({
    mutationFn: flowFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["pets"],
      })
    },
  })

  return {
    updateIsSoldFlow: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
