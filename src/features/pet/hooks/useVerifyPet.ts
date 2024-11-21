import apiClient from "@/core/api/api"
import {
  PetListVerification,
  PetVerificationStatus,
} from "@/core/api/pet/petContract"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { notification } from "antd"

interface VerifyPetInput {
  petId: number
  status: PetVerificationStatus
}

export const useVerificationPet = () => {
  const [api] = notification.useNotification()

  const flowFn = async ({ petId, status }: VerifyPetInput) => {
    try {
      const response = await apiClient.petRouter.verifyPet(petId, status)

      return { response: response }
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

  const mutation: UseMutationResult<
    { response: PetListVerification },
    Error,
    VerifyPetInput
  > = useMutation({
    mutationFn: flowFn,
  })

  return {
    verificationFlow: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
