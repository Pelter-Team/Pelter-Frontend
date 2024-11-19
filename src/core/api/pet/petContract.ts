import { initContract } from "@ts-rest/core"
import { z } from "zod"
import { ErrorResponse, Response, SortOption } from "../type"
import { GraphSelectRangeEnumValue } from "@/features/admin/components/GraphSelectRange"

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

export enum PetStatus {
  LookingForHome = "Looking For Home",
  AdoptionPending = "Adoption Pending",
  Adopted = "Adopted",
}

export const PetListVerificationSchema = z.object({
  petId: z.number(),
  petName: z.string(),
  color: z.string(),
  bread: z.string(),
  document: z.string().optional(),
  pedIdUrl: z.string().optional(),
  createdAt: z.date(),
})
export type PetListVerification = z.infer<typeof PetListVerificationSchema>

export const Graph = z.object({
  key: z.string(),
  value: z.number(),
})
export type Graph = z.infer<typeof Graph>

export enum PetVerificationStatus {
  Request = "Request",
  Declined = "Declined",
  Verified = "Verified",
}

export const petVerificationOptions = [
  { value: "Request", label: "Request" },
  { value: "Declined", label: "Declined" },
  { value: "Verified", label: "Verified" },
]

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
      category: string
      search: string
      sort: SortOption
    }>(),
  },
  getListPetVerification: {
    method: "GET",
    path: "/pets/verification",
    responses: {
      200: c.type<Response<PetListVerification[]>>(),
      400: c.type<Response<ErrorResponse>>(),
    },
    query: c.type<{
      sort: SortOption
      search: string
      status: PetVerificationStatus
    }>(),
  },
  verificationPet: {
    method: "PATCH",
    path: "/pets/verification/:petId",
    responses: {
      200: c.type<Response<PetListVerification>>(),
      400: c.type<Response<ErrorResponse>>(),
    },
    body: c.type<{
      status: PetVerificationStatus
    }>(),
    pathParams: c.type<{
      petId: number
    }>(),
  },
  getGraphAdoptAnimal: {
    method: "GET",
    query: c.type<{
      graphRange: keyof typeof GraphSelectRangeEnumValue
    }>(),
    path: "/pets/graph/adopt-animal",
    responses: {
      200: c.type<Response<Graph[]>>(),
      400: c.type<Response<ErrorResponse>>(),
    },
  },
  getGraphAnimalLookingForHome: {
    method: "GET",
    query: c.type<{
      graphRange: keyof typeof GraphSelectRangeEnumValue
    }>(),
    path: "/pets/graph/animal-looking-for-home",
    responses: {
      200: c.type<Response<Graph[]>>(),
      400: c.type<Response<ErrorResponse>>(),
    },
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
