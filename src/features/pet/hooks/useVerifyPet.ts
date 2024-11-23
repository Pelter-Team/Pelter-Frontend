import apiClient from "@/core/api/api"
import { PetLists, PetVerificationStatus } from "@/core/api/pet/petContract"
import { queryClient } from "@/providers/queryProvider"
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
      const response = await apiClient.petRouter.verifyPet(
        petId,
        status === PetVerificationStatus.Verified ? true : false
      )

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
    { response: PetLists },
    Error,
    VerifyPetInput
  > = useMutation({
    mutationFn: flowFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-list-pet-verification"],
      })
    },
  })

  return {
    verificationFlow: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
