import { PetLists, PetVerificationStatus } from "@/core/api/pet/petContract"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import apiClient from "@/core/api/api"
import { SortOption } from "@/core/api/type"
import { mockListPets } from "./useListPets"

export interface UseListPetProps {
  activeTab: PetVerificationStatus
  sortOption: SortOption
  search: string
}
export const useListPetVerification = ({
  activeTab,
  sortOption,
  search,
}: UseListPetProps) => {
  const queryFn = async () => {
    try {
      const response = await apiClient.petRouter.getListPets()
      // const response = await mockListPets()
      if (response) {
        return response
          .filter((pet) => {
            const searchCondition: boolean = search
              ? pet.name.toLowerCase().includes(search.toLowerCase())
              : true

            const statusCondition: boolean =
              activeTab === PetVerificationStatus.Verified
                ? pet.is_verified
                : !pet.is_verified

            return searchCondition && statusCondition
          })
          .sort((a, b) => {
            switch (sortOption) {
              case SortOption.SortByLatest:
                return (
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
                )
              case SortOption.SortByOldest:
                return (
                  new Date(a.created_at).getTime() -
                  new Date(b.created_at).getTime()
                )
              case SortOption.AToZ:
                return a.name.localeCompare(b.name)
              case SortOption.ZToA:
                return b.name.localeCompare(a.name)
            }
          })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const query: UseQueryResult<PetLists[], Error> = useQuery({
    queryKey: ["get-list-pet-verification", search, activeTab, sortOption],
    // queryFn: apiClient.petRouter.getListPetVerification,
    queryFn: queryFn,
    refetchInterval: 30 * 1000,
  })
  return query
}
