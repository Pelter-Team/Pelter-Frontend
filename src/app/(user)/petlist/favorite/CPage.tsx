"use client"
import { useState, useMemo, useEffect } from "react"
import PetCard from "@/features/user/components/PetCard"
import { Pagination, Button } from "antd"
import { useFavPets } from "@/features/pet/hooks/useFavoritePet"
import Link from "next/link"
import LoadingSpinner from "@/components/LoadingSpinner"

const currentPetsPerPage = 20
const petsPerPage = 20
const CFavoritePetList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const indexOfLastPet = currentPage * petsPerPage
  const indexOfFirstPet = indexOfLastPet - petsPerPage
  const [favoriteIds, setFavoriteIds] = useState<number[]>([])
  const { data: pets, isLoading: isFavLoading } = useFavPets({
    petIds: favoriteIds,
  })

  const currentPets = useMemo(() => {
    return pets?.slice(indexOfFirstPet, indexOfLastPet) ?? []
  }, [pets])

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setFavoriteIds(favorites)
  }, [])

  const onRemoveFav = (petId: number) => {
    setFavoriteIds((prev) => prev.filter((id) => id !== petId))
  }

  if (isFavLoading) {
    return (
      <div className="container mx-auto flex justify-center items-center min-h-screen flex-col gap-4">
        <LoadingSpinner />
      </div>
    )
  }

  if (!pets) {
    return (
      <div className="container mx-auto flex justify-center items-center min-h-screen flex-col gap-4">
        <h6 className="text-2xl text-gray-600 font-normal">
          You got no favorite! yet
        </h6>
        <Link href="/petlist">
          <Button variant="filled" type="primary" className="px-4 py-2">
            Back to petlist
          </Button>
        </Link>
      </div>
    )
  }

  const handlePageChange = (page: number) => setCurrentPage(page)

  return (
    <div className="container mx-auto p-4 pt-[4.5rem]">
      <div className="flex flex-col mb-4 p-4 w-full">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">Your Wish List</h2>
            <span className="text-gray-500 text-sm">
              {currentPets.length} lists in total
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 min-[300px]:grid-cols-2 min-[450px]:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {currentPets.length === 0 ? (
            <h6 className="text-lg font-normal text-gray-600 mx-auto py-4">
              No favorite pet yet!
            </h6>
          ) : (
            currentPets.map((pet) => (
              <PetCard
                pet={{
                  id: pet.id,
                  image: pet.image_url,
                  name: pet.name,
                  price: pet.price,
                  is_sold: pet.is_sold,
                }}
                key={pet.id}
                onRemoveFav={onRemoveFav}
              />
            ))
          )}
        </div>
        <div className="flex justify-center mt-4">
          <Pagination
            current={currentPage}
            total={currentPets.length}
            pageSize={currentPetsPerPage}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  )
}

export default function FavoritePetListPage() {
  return <CFavoritePetList />
}
