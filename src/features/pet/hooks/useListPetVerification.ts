import {
  PetListVerification,
  PetVerificationStatus,
} from "@/core/api/pet/petContract"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import apiClient from "@/core/api/api"
import { SortOption } from "@/core/api/type"

interface UseListPetProps {
  activeTab: PetVerificationStatus
  sortOption: SortOption
  search: string
}
export const useListPetVerification = ({
  activeTab,
  sortOption,
  search,
}: UseListPetProps) => {
  const query: UseQueryResult<PetListVerification[], Error> = useQuery({
    queryKey: ["get-list-pet-verification", search, activeTab, sortOption],
    // queryFn: apiClient.petRouter.getListPetVerification,
    queryFn: mockListPetVerification,
    refetchInterval: 30 * 1000,
  })
  return query
}

export const mockListPetVerification = async (): Promise<
  PetListVerification[]
> => {
  const data: PetListVerification[] = [
    {
      petId: 1,
      petName: "dog",
      color: "black",
      createdAt: new Date(),
      bread: "bread",
      document:
        "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      pedIdUrl:
        "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      petId: 2,
      petName: "dog",
      color: "black",
      createdAt: new Date(),
      bread: "bread",
      document:
        "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      pedIdUrl:
        "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ]
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 2000)
  })
}
