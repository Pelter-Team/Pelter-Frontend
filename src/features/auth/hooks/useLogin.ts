import apiClient from "@/core/api/api"
import { APIError } from "@/core/api/error"
import { LoginResponse } from "@/core/api/user/userContract"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
interface LoginInput {
  email: string
  password: string
}

export const useLogin = () => {
  const mutateFn = async ({ email, password }: LoginInput) => {
    try {
      const response = await apiClient.userRouter.login(email, password)
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
    { response: LoginResponse },
    Error,
    LoginInput
  > = useMutation({
    mutationFn: mutateFn,
  })

  return {
    loginFlow: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
