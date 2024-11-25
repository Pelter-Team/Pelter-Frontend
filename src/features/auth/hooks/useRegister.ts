import apiClient from "@/core/api/api"
import { APIError } from "@/core/api/error"
import { RegisterRequest, RegisterResponse } from "@/core/api/user/userContract"
import { useMutation, UseMutationResult } from "@tanstack/react-query"

export const useRegister = () => {
  const mutateFn = async (req: RegisterRequest) => {
    try {
      const response = await apiClient.userRouter.register(req)
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
    { response: RegisterResponse },
    Error,
    RegisterRequest
  > = useMutation({
    mutationFn: mutateFn,
  })

  return {
    registerFlow: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
