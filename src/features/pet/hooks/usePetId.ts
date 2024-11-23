import { PetDetail } from "@/core/api/pet/petContract"
import { useQuery } from "@tanstack/react-query"
import apiClient from "@/core/api/api"

interface UseListPetIdProps {
  petId: number
}
export const usePetId = ({ petId }: UseListPetIdProps) => {
  const queryFn = async () => {
    try {
      const result = await apiClient.petRouter.getPetId(petId)
      // const result = await mockPetId()
      return result
    } catch (error) {
      console.error(error)
    }
  }

  const query = useQuery({
    queryKey: ["get-petId", petId],
    // queryFn: apiClient.petRouter.getPetId,
    queryFn: queryFn,
    refetchInterval: 30 * 1000,
  })
  return query
}

export const mockPetId = async (): Promise<PetDetail> => {
  const data: PetDetail = {
    id: 1,
    user_id: 101,
    transaction_id: 1001,
    review_id: [1, 2, 3],
    name: "Luna",
    is_sold: false,
    category: "Cat",
    subcategory: "Persian",
    description: "Beautiful white Persian cat, very friendly and well-groomed",
    is_verified: true,
    price: 1200,
    image_url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    created_at: new Date("2024-02-01"),
    updated_at: new Date("2024-03-01"),
    vaccine_book_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlP9PCpci2g2Nk9n_BZTEXj1d9uZeb6kOWlQ&s",
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 500)
  })
}
