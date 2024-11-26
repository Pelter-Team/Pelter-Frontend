import { useQuery } from "@tanstack/react-query"
import apiClient from "@/core/api/api"
import { APIError } from "@/core/api/error"

export const useFavPets = ({ petIds }: { petIds: number[] }) => {
  const queryFn = async () => {
    try {
      const response = await apiClient.petRouter.getFavPets(petIds)
      return response
    } catch (error) {
      if (error instanceof APIError) {
        throw error.message
      } else {
        throw error
      }
    }
  }

  const query = useQuery({
    queryKey: ["get-fav-pets", petIds],
    queryFn: () => queryFn(),
    refetchInterval: 30 * 1000,
  })
  return query
}
