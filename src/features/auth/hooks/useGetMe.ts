import apiClient from "@/core/api/api"
import { useQuery } from "@tanstack/react-query"

export const useMe = async () => {
  try {
    const response = await apiClient.userRouter.me()
    return { response: response }
  } catch (error) {
    // Ignore the error if a user is not logged in
    let _ = error
  }
}
