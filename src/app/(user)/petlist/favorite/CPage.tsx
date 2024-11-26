"use client"
import { useState, useMemo, useEffect } from "react"
import PetCard from "@/features/user/components/PetCard"
import { Pagination, Row, Col, Button } from "antd"
import { useFavPets } from "@/features/pet/hooks/useFavoritePet"
import Link from "next/link"
import LoadingSpinner from "@/components/LoadingSpinner"

const currentPetsPerPage = 8
const petsPerPage = 8
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
          {/* <Tag
            selectedTag={selectedTag}
            onTagSelect={handleTagSelect}
            counts={getPetCounts()}
          /> */}
        </div>
        <Row gutter={[24, 32]}>
          {currentPets.length === 0 ? (
            <h6>You got no favorite yet!</h6>
          ) : (
            currentPets.map((pet) => (
              <Col key={pet.id} xs={24} sm={12} md={8} lg={6}>
                <PetCard
                  pet={{
                    id: pet.id,
                    image: pet.image_url,
                    name: pet.name,
                    is_sold: pet.is_sold,
                    price: pet.price,
                  }}
                  onRemoveFav={onRemoveFav}
                />
              </Col>
            ))
          )}
        </Row>
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
