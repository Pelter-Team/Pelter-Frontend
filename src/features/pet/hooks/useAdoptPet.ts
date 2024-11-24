import apiClient from "@/core/api/api"
import { PetVerificationStatus } from "@/core/api/pet/petContract"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { notification } from "antd"

interface VerifyPetInput {
  petId: number
}

export const useAdoptPet = () => {
  const [api] = notification.useNotification()

  const flowFn = async ({ petId }: VerifyPetInput) => {
    try {
      // const response = await apiClient.petRouter.verifyPet(petId)

      //   return { response: response }
      return {}
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred"
      api.error({
        message: "Failed to update pet verification",
        description: errorMessage,
      })
      throw error
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
