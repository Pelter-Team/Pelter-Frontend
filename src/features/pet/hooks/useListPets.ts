import { PetLists, PetStatus, PriceOption } from "@/core/api/pet/petContract"
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
    const response = await apiClient.petRouter.getListPets()
    // const response = await mockListPets()
    if (response) {
      return response
        .filter((pet) => {
          const searchCondition: boolean = search
            ? pet.name.toLowerCase().includes(search.toLowerCase())
            : true

          const statusCondition: boolean =
            activeTab === PetStatus.All
              ? true
              : pet.is_sold === (activeTab === PetStatus.Adopted)

          const priceCondition: boolean =
            priceOption === PriceOption.All
              ? true
              : priceOption === PriceOption.Free
                ? pet.price === 0
                : true
          return searchCondition && statusCondition && priceCondition
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
  }

  const query = useQuery({
    queryKey: ["get-list-pets", search, activeTab, priceOption, sortOption],
    queryFn: queryFn,
    refetchInterval: 30 * 1000,
  })
  return query
}

export const mockListPets = async (): Promise<PetLists[]> => {
  const data: PetLists[] = [
    {
      id: 2,
      user_id: 1,
      owner: "Mix",
      transaction_id: 0,
      review_id: null,
      name: "Nepal",
      is_sold: false,
      category: "Dog",
      subcategory: "Bulldog",
      description: "Woof WOOF",
      is_verified: false,
      price: 2050,
      image_url: "",
      vaccine_book_url: null,
      created_at: "2024-11-21T23:15:48.181434+07:00",
      updated_at: "2024-11-21T23:15:48.181434+07:00",
    },
    {
      id: 3,
      user_id: 2,
      owner: "Mix",
      transaction_id: 0,
      review_id: null,
      name: "Mark",
      is_sold: false,
      category: "Dog",
      subcategory: "Bulldog",
      description: "Woof WOOF",
      is_verified: false,
      price: 2050,
      image_url: "",
      vaccine_book_url: null,
      created_at: "2024-11-21T23:16:22.204157+07:00",
      updated_at: "2024-11-21T23:16:22.204157+07:00",
    },
  ]
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 2000)
  })
}
