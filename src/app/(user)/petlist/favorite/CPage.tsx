"use client"

import { useState, useMemo } from "react"
import PetCard from "@/features/user/components/PetCard"
import Tag from "@/features/user/components/tag"
import { Pagination, Button, Row, Col } from "antd"
import Image from "../../../public/Pelter_5.png"

const favoritePets = [
  {
    id: "1",
    image: Image,
    name: "Luna",
    breed: "Persian",
    dateOfBirth: "2022-01-01",
    price: 0,
    color: "White",
    description: "Friendly and playful Persian cat",
    location: "New York",
    ownerName: "John Smith",
    ownerType: "Individual",
    contact: "+1234567890",
    review: 4.5,
    gender: "Female",
    vaccinationStatus: true,
    petType: { strayDog: false, strayCat: true, catBreed: "Persian" },
  },
  {
    id: "3",
    image: Image,
    name: "Mickey",
    breed: "Golden Retriever",
    dateOfBirth: "2023-03-20",
    price: 250,
    color: "Golden",
    description: "Loving and well-trained Golden Retriever",
    location: "Chicago",
    ownerName: "Happy Paws Shelter",
    ownerType: "Foundation",
    contact: "+1122334455",
    review: 4.8,
    gender: "Male",
    vaccinationStatus: true,
    petType: { strayDog: false, strayCat: false, dogBreed: "Golden Retriever" },
  },
]

const CFavoritePetList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [sort, setSort] = useState<{
    category: "date" | "name" | "price"
    order: "asc" | "desc"
  }>({
    category: "date",
    order: "desc",
  })
  const [filteredPets, setFilteredPets] = useState(favoritePets)
  const [petsPerPage] = useState(8)
  const [selectedTag, setSelectedTag] = useState("all")

  const sortedPets = useMemo(() => {
    return [...filteredPets].sort((a, b) => {
      switch (sort.category) {
        case "price":
          return sort.order === "asc" ? a.price - b.price : b.price - a.price
        case "date":
          const dateA = new Date(a.dateOfBirth)
          const dateB = new Date(b.dateOfBirth)
          return sort.order === "asc"
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime()
        case "name":
          return sort.order === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        default:
          return 0
      }
    })
  }, [filteredPets, sort])

  const indexOfLastPet = currentPage * petsPerPage
  const indexOfFirstPet = indexOfLastPet - petsPerPage
  const currentPets = sortedPets.slice(indexOfFirstPet, indexOfLastPet)

  const getPetCounts = () => {
    return {
      all: favoritePets.length,
      dogs: favoritePets.filter(
        (pet) => pet.petType.strayDog || pet.petType.dogBreed
      ).length,
      cats: favoritePets.filter(
        (pet) => pet.petType.strayCat || pet.petType.catBreed
      ).length,
    }
  }

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag)
    let filtered = [...favoritePets]

    if (tag === "dogs") {
      filtered = favoritePets.filter(
        (pet) => pet.petType.strayDog || pet.petType.dogBreed
      )
    } else if (tag === "cats") {
      filtered = favoritePets.filter(
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
              {favoritePets.length} lists in
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
