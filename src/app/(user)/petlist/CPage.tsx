"use client"

import { useState } from "react"
import PetCard from "@/features/user/components/PetCard"
import SortDropdown from "@/features/user/components/SortDropdown"
import FilterDrawer from "@/features/user/components/FilterDrawer"
import Tag from "@/features/user/components/tag"
import { Pagination, Button, Row, Col } from "antd"
import Image from "../../public/Pelter_5.png"
import { useMemo } from "react"

enum SortBy {
  DATE = "date",
  PRICE = "price",
  NAME = "name",
}

enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

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
    strayDog: boolean
    dogBreed?: string
    strayCat: boolean
    catBreed?: string
  }
}

const pets: Pet[] = [
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
    id: "2",
    image: Image,
    name: "Jidrid",
    breed: "Mixed",
    dateOfBirth: "2023-02-15",
    price: 180,

    color: "Brown",
    description: "Energetic stray dog looking for a home",
    location: "Los Angeles",
    ownerName: "Gugugaga foundation",
    ownerType: "Foundation",
    contact: "+1987654321",
    review: 4.2,
    gender: "Male",
    vaccinationStatus: true,
    petType: { strayDog: true, strayCat: false },
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
  {
    id: "4",
    image: Image,
    name: "Bella",
    breed: "Siamese",
    dateOfBirth: "2022-11-30",
    price: 0,

    color: "Cream",
    description: "Elegant Siamese cat with blue eyes",
    location: "Miami",
    ownerName: "Sarah Johnson",
    ownerType: "Individual",
    contact: "+1445566778",
    review: 4.6,
    gender: "Female",
    vaccinationStatus: true,
    petType: { strayDog: false, strayCat: true, catBreed: "Siamese" },
  },
  {
    id: "5",
    image: Image,
    name: "Rocky",
    breed: "Mixed",
    dateOfBirth: "2023-05-10",
    price: 150,
    color: "Black and White",
    description: "Playful stray dog with lots of energy",
    location: "Seattle",
    ownerName: "Paws Foundation",
    ownerType: "Foundation",
    contact: "+1667788990",
    review: 4.3,
    gender: "Male",
    vaccinationStatus: false,
    petType: { strayDog: true, strayCat: false },
  },
  {
    id: "6",
    image: Image,
    name: "Chasha",
    breed: "Persian",
    dateOfBirth: "2023-01-15",
    price: 200,
    color: "White",
    description: "Elegant Persian cat with a gentle personality",
    location: "Boston",
    ownerName: "Feline Friends",
    ownerType: "Foundation",
    contact: "+1223344556",
    review: 4.7,
    gender: "Female",
    vaccinationStatus: true,
    petType: { strayDog: false, strayCat: false, catBreed: "Persian" },
  },
  {
    id: "7",
    image: Image,
    name: "Charlie",
    breed: "Labrador",
    dateOfBirth: "2023-04-20",
    price: 300,
    color: "Chocolate",
    description: "Friendly Labrador puppy, great with kids",
    location: "Denver",
    ownerName: "Happy Tails",
    ownerType: "Foundation",
    contact: "+1334455667",
    review: 4.9,
    gender: "Male",
    vaccinationStatus: true,
    petType: { strayDog: false, strayCat: false, dogBreed: "Labrador" },
  },
  {
    id: "8",
    image: Image,
    name: "Milo",
    breed: "Mixed",
    dateOfBirth: "2023-02-28",
    price: 0,
    color: "Orange",
    description: "Sweet stray cat seeking forever home",
    location: "Portland",
    ownerName: "Cat Haven",
    ownerType: "Foundation",
    contact: "+1445566778",
    review: 4.4,
    gender: "Male",
    vaccinationStatus: true,
    petType: { strayDog: false, strayCat: true },
  },
  {
    id: "9",
    image: Image,
    name: "Bella",
    breed: "Siamese",
    dateOfBirth: "2023-03-15",
    price: 250,
    color: "Cream",
    description: "Elegant Siamese cat with blue eyes",
    location: "Miami",
    ownerName: "Kitty Palace",
    ownerType: "Individual",
    contact: "+1556677889",
    review: 4.6,
    gender: "Female",
    vaccinationStatus: true,
    petType: { strayDog: false, strayCat: false, catBreed: "Siamese" },
  },
  {
    id: "10",
    image: Image,
    name: "Max",
    breed: "German Shepherd",
    dateOfBirth: "2023-06-01",
    price: 400,
    color: "Black and Tan",
    description: "Intelligent German Shepherd puppy",
    location: "Chicago",
    ownerName: "Elite K9",
    ownerType: "Foundation",
    contact: "+1667788990",
    review: 4.8,
    gender: "Male",
    vaccinationStatus: true,
    petType: { strayDog: false, strayCat: false, dogBreed: "German Shepherd" },
  },
  {
    id: "11",
    image: Image,
    name: "Whiskers",
    breed: "Mixed",
    dateOfBirth: "2023-01-10",
    price: 0,
    color: "Gray",
    description: "Friendly stray cat with unique markings",
    location: "Austin",
    ownerName: "Rescue Paws",
    ownerType: "Foundation",
    contact: "+1778899001",
    review: 4.2,
    gender: "Female",
    vaccinationStatus: false,
    petType: { strayDog: false, strayCat: true },
  },
]

const PetListPage = () => {
  const [foundationName, setFoundationName] = useState("")
  const [filterVisible, setFilterVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.DATE)
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC)
  const [petsPerPage] = useState(8)
  const [filteredPets, setFilteredPets] = useState(pets)
  const [displayedPets, setDisplayedPets] = useState(pets)
  const indexOfLastPet = currentPage * petsPerPage
  const indexOfFirstPet = indexOfLastPet - petsPerPage
  const sortedPets = useMemo(() => {
    return [...filteredPets].sort((a, b) => {
      switch (sortBy) {
        case "price":
          return sortOrder === "asc" ? a.price - b.price : b.price - a.price
        case "date":
          const dateA = new Date(a.dateOfBirth)
          const dateB = new Date(b.dateOfBirth)
          return sortOrder === "asc"
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime()
        case "name":
          return sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        default:
          return 0
      }
    })
  }, [filteredPets, sortBy, sortOrder])

  const [selectedTag, setSelectedTag] = useState("all")

  const getPetCounts = () => {
    return {
      all: pets.length,
      dogs: pets.filter((pet) => pet.petType.strayDog || pet.petType.dogBreed)
        .length,
      cats: pets.filter((pet) => pet.petType.strayCat || pet.petType.catBreed)
        .length,
    }
  }

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag)
    let filtered = [...pets]

    if (tag === "dogs") {
      filtered = pets.filter(
        (pet) => pet.petType.strayDog || pet.petType.dogBreed
      )
    } else if (tag === "cats") {
      filtered = pets.filter(
        (pet) => pet.petType.strayCat || pet.petType.catBreed
      )
    }

    setFilteredPets(filtered)
    setCurrentPage(1)
  }
  // Update the handler types
  const handleSortChange = (value: SortBy) => {
    setSortBy(value)
    setCurrentPage(1)
  }

  const handleSortOrderChange = (value: SortOrder) => {
    setSortOrder(value)
    setCurrentPage(1)
  }
  const currentPets = sortedPets.slice(indexOfFirstPet, indexOfLastPet)
  const handlePageChange = (page: number) => setCurrentPage(page)

  const handleFilter = (filters: {
    ownerTypes: string[]
    priceRange: { isFree: boolean; min?: number; max?: number }
    gender: string
    petTypes: {
      strayDog: boolean
      dogBreed?: string
      strayCat: boolean
      catBreed?: string
    }
    foundationName?: string
  }) => {
    let result = [...pets]

    // Add foundation name filter for foundations only
    if (filters.foundationName) {
      result = result.filter(
        (pet) =>
          pet.ownerType === "Foundation" &&
          pet.ownerName
            .toLowerCase()
            .includes(filters.foundationName.toLowerCase())
      )
    }

    // Filter by owner types
    if (filters.ownerTypes.length > 0) {
      result = result.filter((pet) =>
        filters.ownerTypes.includes(pet.ownerType)
      )
    }

    // Filter by price range
    if (filters.priceRange.isFree) {
      result = result.filter((pet) => pet.price === 0)
    } else if (
      filters.priceRange.min !== undefined ||
      filters.priceRange.max !== undefined
    ) {
      result = result.filter((pet) => {
        const meetsMin =
          filters.priceRange.min === undefined ||
          pet.price >= filters.priceRange.min
        const meetsMax =
          filters.priceRange.max === undefined ||
          pet.price <= filters.priceRange.max
        return meetsMin && meetsMax
      })
    }

    // Filter by gender
    if (filters.gender) {
      result = result.filter((pet) => pet.gender === filters.gender)
    }

    // Filter by pet types
    const activeFilters = Object.entries(filters.petTypes).filter(
      ([_, value]) => value
    )
    if (activeFilters.length) {
      result = result.filter((pet) =>
        activeFilters.some(
          ([key, value]) =>
            pet.petType[key] === value || pet.petType[key] === true
        )
      )
    }

    setFilteredPets(result)
    setCurrentPage(1)
  }
  const handleClearFilters = () => {
    setFilteredPets(pets)
    setCurrentPage(1)
  }

  return (
    <div className="container mx-auto p-4 pt-[4.5rem]">
      <div className="flex flex-col mb-4 p-4 w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Tag
              selectedTag={selectedTag}
              onTagSelect={handleTagSelect}
              counts={getPetCounts()}
            />
          </div>

          <div className="flex items-center gap-4">
            <SortDropdown
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
              onSortOrderChange={handleSortOrderChange}
            />
            <Button
              onClick={() => setFilterVisible(true)}
              type="primary"
              className="flex items-center gap-2"
            >
              Filters
            </Button>
            <FilterDrawer
              visible={filterVisible}
              onClose={() => setFilterVisible(false)}
              onFilter={handleFilter}
              onClear={handleClearFilters}
            />
          </div>
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

export default PetListPage
