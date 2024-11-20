import { PetLists, PetStatus } from "@/core/api/pet/petContract"
import { useQuery } from "@tanstack/react-query"
import { PetAdminStatusTabProps } from "../components/Tab/PetAdminTab"
import apiClient from "@/core/api/api"
import { SortOption } from "@/core/api/type"

interface UseListPetProps extends PetAdminStatusTabProps {
  activeTab: PetStatus
}
export const useListPets = ({
  activeTab,
  priceOption,
  sortOption,
  search,
}: UseListPetProps) => {
  const queryFn = async () => {
    // const response = await apiClient.petRouter.getListPets(
    //   activeTab,
    //   search,
    //   sortOption
    // )
    const response = await mockListPets()
    if (response) {
      return (
        response
          .filter((pet) => pet.petName.includes(search))
          // .filter((pet) => {
          //   if(pet.price === 0 && priceOption === PriceOption.Free) {
          //     return true
          //   }
          // })
          .sort((a, b) => {
            switch (sortOption) {
              case SortOption.SortByLatest:
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                )
              case SortOption.SortByOldest:
                return (
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
                )
              case SortOption.AToZ:
                return a.petName.localeCompare(b.petName)
              case SortOption.ZToA:
                return b.petName.localeCompare(a.petName)
            }
          })
      )
    }
  }

  const query = useQuery({
    queryKey: ["get-list-pets", search, activeTab, priceOption, sortOption],
    // queryFn: apiClient.petRouter.getListPets,
    queryFn: queryFn,
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
