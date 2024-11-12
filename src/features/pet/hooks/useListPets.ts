import { PetLists, PetStatus } from "@/core/api/pet/petContract"
import { useQuery } from "@tanstack/react-query"
import { PetStatusTabProps } from "../components/Tab"

interface UseListPetProps extends PetStatusTabProps {
  activeTab: PetStatus
}
export const useListPets = ({
  activeTab,
  priceOption,
  sortOption,
  search,
}: UseListPetProps) => {
  const query = useQuery({
    queryKey: ["get-list-pets", search, activeTab, priceOption, sortOption],
    // queryFn: apiClient.petRouter.getListPets,
    queryFn: mockListPets,
    refetchInterval: 30 * 1000,
  })
  return query
}

export const mockListPets = async (): Promise<PetLists[]> => {
  const data: PetLists[] = [
    {
      petId: 1,
      petName: "dog",
      color: "black",
      price: 1000,
      owner: "John",
      createdAt: new Date(),
    },
    {
      petId: 2,
      petName: "cat",
      color: "white",
      price: 2000,
      owner: "Doe",
      createdAt: new Date(),
    },
  ]
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 2000)
  })
}
