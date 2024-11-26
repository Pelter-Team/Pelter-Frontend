"use client"

import { useEffect, useState } from "react"
import PetCard from "@/features/user/components/PetCard"
import SortDropdown from "@/features/user/components/SortDropdown"
import FilterDrawer from "@/features/user/components/FilterDrawer"
import Tag from "@/features/user/components/tag"
import { Pagination, Button, Row, Col } from "antd"
import Image from "../../public/Pelter_5.png"
import { useMemo } from "react"
import { useListPets } from "@/features/pet/hooks/useListPets"
import { PetLists, PetStatus, PriceOption } from "@/core/api/pet/petContract"
import { SortOption } from "@/core/api/type"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useSearchParams } from "next/navigation"
export interface FilterState {
  ownerType: "all" | "customer" | "foundation"
  priceRange: {
    isFree: boolean
    min: number | undefined
    max: number | undefined
  }
  selectedTag: "all" | "Dog" | "Cat"
  orderBy: string
  subCategory: string
  isVerify: "all" | "verified" | "unverified"
  isSold: "all" | "sold" | "unsold"
}

const initialFilterState: FilterState = {
  ownerType: "all",
  priceRange: {
    isFree: false,
    min: undefined,
    max: undefined,
  },
  selectedTag: "all",
  orderBy: "latest",
  subCategory: "",
  isVerify: "all",
  isSold: "all",
}

const petsPerPage = 20
const PetListPage = () => {
  const [filterVisible, setFilterVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const searchParams = useSearchParams()
  const free = searchParams.get("free") === "true"

  const [filterState, setFilterState] = useState<FilterState>({
    ...initialFilterState,
    priceRange: { ...initialFilterState.priceRange, isFree: free },
  })

  // it can be better if we just change this useListPets into useSomething that we can custom our queryKey
  const { data: pets, isLoading: isListPetLoading } = useListPets({
    activeTab: PetStatus.All,
    priceOption: PriceOption.All,
    sortOption: SortOption.SortByLatest,
    search: "",
  })

  const filteredPets = useMemo(() => {
    const handleOwner = (role: string) => {
      if (role === "admin" || role === "foundation") {
        return "foundation"
      } else {
        return "customer"
      }
    }

    setCurrentPage(1)
    return (
      pets
        ?.filter((pet) => {
          const ownerTypeCondition =
            filterState.ownerType === "all"
              ? true
              : filterState.ownerType === handleOwner(pet.role)

          const selectedTagCondition =
            filterState.selectedTag === "all"
              ? true
              : pet.category === filterState.selectedTag

          const matchesPrice = filterState.priceRange.isFree
            ? pet.price === 0
            : (!filterState.priceRange.min ||
                pet.price >= filterState.priceRange.min) &&
              (!filterState.priceRange.max ||
                pet.price <= filterState.priceRange.max)

          const matchSubCategory =
            filterState.subCategory.length === 0
              ? true
              : pet.subcategory.includes(filterState.subCategory)

          const isVerifyCondition =
            filterState.isVerify === "all"
              ? true
              : filterState.isVerify === "verified"
                ? pet.is_verified
                : !pet.is_verified

          const isSoldCondition =
            filterState.isSold === "all"
              ? true
              : filterState.isSold === "sold"
                ? pet.is_sold
                : !pet.is_sold

          return (
            ownerTypeCondition &&
            selectedTagCondition &&
            matchesPrice &&
            matchSubCategory &&
            isVerifyCondition &&
            isSoldCondition
          )
        })
        .sort((a, b) => {
          switch (filterState.orderBy) {
            case "priceLowToHigh":
              return a.price - b.price
            case "priceHighToLow":
              return b.price - a.price
            case "latest":
              return (
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
              )
            case "oldest":
              return (
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
              )
            case "alphabet":
              return a.name.localeCompare(b.name)
            default:
              return 0
          }
        }) ?? []
    )
  }, [pets, filterState])

  const petCount = useMemo(() => {
    return {
      all: pets?.length ?? 0,
      dogs: pets?.filter((pet) => pet.category === "Dog").length ?? 0,
      cats: pets?.filter((pet) => pet.category === "Cat").length ?? 0,
    }
  }, [pets])

  const subCategoryOptions = useMemo(() => {
    const uniqueSubcategories = Array.from(
      new Set(pets?.map((pet) => pet.subcategory).flat() ?? [])
    )
    return uniqueSubcategories.map((category) => ({
      value: category,
      label: category,
    }))
  }, [pets])
  if (!pets) return
  const indexOfLastPet = currentPage * petsPerPage
  const indexOfFirstPet = indexOfLastPet - petsPerPage

  const currentPets = filteredPets!.slice(indexOfFirstPet, indexOfLastPet)
  const handlePageChange = (page: number) => setCurrentPage(page)

  const handleClearFilters = () => {
    setFilterState(initialFilterState)
    setCurrentPage(1)
  }

  if (isListPetLoading) {
    return (
      <div className="container mx-auto ">
        <div className="flex items-center justify-center self-center min-h-screen">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 pt-[4.5rem]">
      <div className="flex flex-col mb-4 p-4 w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Tag
              selectedTag={filterState.selectedTag}
              onTagSelect={(tag) =>
                // @ts-ignore FIXME: i know this need to be enum
                setFilterState((prev) => ({ ...prev, selectedTag: tag }))
              }
              counts={petCount}
            />
          </div>
          <div className="flex items-center gap-4">
            <SortDropdown
              currentSort={filterState.orderBy}
              onSort={(key) =>
                setFilterState((prev) => ({ ...prev, orderBy: key }))
              }
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
              setFilterState={setFilterState}
              filterState={filterState}
              onClear={handleClearFilters}
              subCategoryOptions={subCategoryOptions}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 min-[300px]:grid-cols-2 min-[450px]:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {currentPets.length === 0 ? (
            <h6 className="text-lg font-normal text-gray-600 mx-auto py-4">
              No data found
            </h6>
          ) : (
            currentPets.map((pet) => (
              // <Col key={pet.id} xs={24} sm={12} md={8} lg={6}>
              <PetCard
                pet={{
                  id: pet.id,
                  image: pet.image_url,
                  name: pet.name,
                  price: pet.price,
                  is_sold: pet.is_sold,
                }}
                key={pet.id}
              />
              // </Col>
            ))
          )}
        </div>

        <div className="flex justify-center mt-4">
          <Pagination
            current={currentPage}
            total={filteredPets?.length ?? 0}
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
