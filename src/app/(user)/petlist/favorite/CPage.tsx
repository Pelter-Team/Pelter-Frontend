"use client"
import { useState, useMemo, useEffect } from "react"
import PetCard from "@/features/user/components/PetCard"
import Tag from "@/features/user/components/tag"
import { Pagination, Row, Col } from "antd"
import { useParams } from "next/navigation"
import { pets } from "@/app/(user)/petlist/CPage"

interface Pet {
  id: string
  image: any
  name: string
  breed: string
  dateOfBirth: string
  price: number
  color: string
  description: string
  location: string
  ownerName: string
  ownerType: string
  contact: string
  review: number
  gender: string
  vaccinationStatus: boolean
  petType: {
    strayDog?: boolean
    strayCat?: boolean
    dogBreed?: string
    catBreed?: string
  }
}

const CFavoritePetList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredPets, setFilteredPets] = useState<Pet[]>([])
  const [petsPerPage] = useState(8)
  const [selectedTag, setSelectedTag] = useState("all")

  useEffect(() => {
    // Retrieve favorites from local storage
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")

    // Filter pets based on favorites
    const favoritePets = pets.filter((pet) =>
      favorites.includes(Number(pet.id))
    )

    setFilteredPets(favoritePets)
  }, [])

  const indexOfLastPet = currentPage * petsPerPage
  const indexOfFirstPet = indexOfLastPet - petsPerPage
  const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet)

  const getPetCounts = () => {
    return {
      all: filteredPets.length,
      dogs: filteredPets.filter(
        (pet) => pet.petType.strayDog || pet.petType.dogBreed
      ).length,
      cats: filteredPets.filter(
        (pet) => pet.petType.strayCat || pet.petType.catBreed
      ).length,
    }
  }

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag)
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    const allFavoritePets = pets.filter((pet) =>
      favorites.includes(Number(pet.id))
    )

    let filtered = [...allFavoritePets]
    if (tag === "dogs") {
      filtered = allFavoritePets.filter(
        (pet) => pet.petType.strayDog || pet.petType.dogBreed
      )
    } else if (tag === "cats") {
      filtered = allFavoritePets.filter(
        (pet) => pet.petType.strayCat || pet.petType.catBreed
      )
    }

    setFilteredPets(filtered)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => setCurrentPage(page)

  return (
    <div className="container mx-auto p-4 pt-[4.5rem]">
      <div className="flex flex-col mb-4 p-4 w-full">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">Your Wish List</h2>
            <span className="text-gray-500 text-sm">
              {filteredPets.length} lists in total
            </span>
          </div>
          <Tag
            selectedTag={selectedTag}
            onTagSelect={handleTagSelect}
            counts={getPetCounts()}
          />
        </div>
        <Row gutter={[24, 32]}>
          {currentPets.map((pet) => (
            <Col key={pet.id} xs={24} sm={12} md={8} lg={6}>
              <PetCard pet={pet} />
            </Col>
          ))}
        </Row>
        <div className="flex justify-center mt-4">
          <Pagination
            current={currentPage}
            total={filteredPets.length}
            pageSize={petsPerPage}
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
