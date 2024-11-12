import { initContract } from "@ts-rest/core"
import { z } from "zod"
import { ErrorResponse, Response } from "../type"

export const PetListSchhema = z.object({
  petId: z.number(),
  petName: z.string(),
  color: z.string(),
  price: z.number(),
  owner: z.string(),
  createdAt: z.date(),
})
export type PetLists = z.infer<typeof PetListSchhema>

export enum PriceOption {
  Free = "Free",
  Commercial = "Commercial",
}

export enum SortOption {
  SortByLatest = "Sort By Latest",
  SortByOldest = "Sort By Oldest",
  AToZ = "A to Z",
  ZToA = "Z",
}

export enum PetStatus {
  LookingForHome = "Looking For Home",
  AdoptionPending = "Adoption Pending",
  Adopted = "Adopted",
}

const c = initContract()
export const petContract = c.router({
  getListPets: {
    method: "GET",
    path: "/pets",
    responses: {
      200: c.type<Response<PetLists[]>>(),
      400: c.type<Response<ErrorResponse>>(),
    },
    query: c.type<{
      search: string
      category: string
      sort: string
    }>(),
  },
})

export const priceOptions: {
  value: keyof typeof PriceOption
  label: keyof typeof PriceOption
}[] = [
  { value: "Free", label: "Free" },
  { value: "Commercial", label: "Commercial" },
]

export const sortOptions = [
  { value: "Sort By Latest", label: "Sort By Latest" },
  { value: "Sort By Oldest", label: "Sort By Oldest" },
  { value: "A to Z", label: "A to Z" },
  { value: "Z to A", label: "Z to A" },
]
