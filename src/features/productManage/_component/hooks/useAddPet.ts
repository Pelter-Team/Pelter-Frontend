import apiClient from "@/core/api/api"
import { APIError } from "@/core/api/error"
import { CreatePetRequest } from "@/core/api/pet/petContract"
import { useMutation, UseMutationResult } from "@tanstack/react-query"

interface PetFormInput {
  name: string
  is_sold: boolean
  category: string
  subcategory: string
  description: string
  is_verified: boolean
  price: number
  image_url: string
  vaccine_book_url: string | null
}

export const useAddPet = () => {
  const mutateFn = async (petData: PetFormInput) => {
    try {
      const response = await apiClient.petRouter.insertPet(
        petData as CreatePetRequest
      )
      return { response: response }
    } catch (error) {
      if (error instanceof APIError) {
        throw error.message
      } else {
        throw error
      }
    }
  }

  const mutation: UseMutationResult<
    { response: PetFormInput },
    Error,
    PetFormInput
  > = useMutation({
    mutationFn: mutateFn,
  })

  return {
    createPet: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
