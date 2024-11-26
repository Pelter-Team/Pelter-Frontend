import apiClient from "@/core/api/api"
import { APIError } from "@/core/api/error"
import { useMutation } from "@tanstack/react-query"

export const useLogout = () => {
  const mutateFn = async () => {
    try {
      const response = await apiClient.userRouter.logout()
      return response
    } catch (error) {
      if (error instanceof APIError) {
        throw error.message
      }
      throw error
    }
  }

  const mutation = useMutation({
    mutationFn: mutateFn,
  })

  return {
    logoutFlow: mutation.mutateAsync,
    isPending: mutation.isPending,
  }
}
