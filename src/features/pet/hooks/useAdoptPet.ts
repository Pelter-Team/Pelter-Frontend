import apiClient from "@/core/api/api"
import { APIError } from "@/core/api/error"
import { useMutation } from "@tanstack/react-query"

interface VerifyPetInput {
  petId: number
}

export const useAdoptPet = () => {
  const flowFn = async ({ petId }: VerifyPetInput) => {
    try {
      const response =
        await apiClient.transactionRouter.insertTransaction(petId)
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
  })

  return {
    adoptFlow: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
