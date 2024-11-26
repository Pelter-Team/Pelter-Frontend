import { initContract } from "@ts-rest/core"
import { z } from "zod"
import { ErrorResponse, Response } from "../type"
import { GraphSelectRangeEnumValue } from "@/features/admin/components/GraphSelectRange"

export const PetListSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  transaction_id: z.number(),
  review_id: z.null(),
  name: z.string(),
  owner: z.string(),
  is_sold: z.boolean(),
  category: z.string(),
  role: z.string(),
  subcategory: z.string(),
  description: z.string(),
  is_verified: z.boolean(),
  price: z.number(),
  image_url: z.string(),
  vaccine_book_url: z.string().or(z.null()),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})
export type PetLists = z.infer<typeof PetListSchema>

export enum PriceOption {
  All = "All",
  Free = "Free",
  Commercial = "Commercial",
}

export enum PetStatus {
  All = "All",
  AdoptionPending = "Adoption Pending",
  Adopted = "Adopted",
}

export const CreatePetRequestSchema = z.object({
  name: z.string(),
  category: z.string(),
  subcategory: z.string(),
  description: z.string(),
  price: z.number(),
  image_url: z.string(),
  vaccine_book_url: z.string(),
})
export type CreatePetRequest = z.infer<typeof CreatePetRequestSchema>

export const UpdatePetRequestSchema = z.object({
  is_sold: z.boolean().default(false),
  is_verified: z.boolean().default(true),
  price: z.number().min(0).default(0),
})
export type UpdatePetRequest = z.infer<typeof UpdatePetRequestSchema>

export const Graph = z.object({
  key: z.string(),
  value: z.number(),
})
export type Graph = z.infer<typeof Graph>

export enum PetVerificationStatus {
  Pending = "Pending",
  Verified = "Verified",
}

export const petVerificationOptions = [
  { value: PetVerificationStatus.Pending, label: "Pending" },
  { value: PetVerificationStatus.Verified, label: "Verified" },
]

const PetDetail = z.object({
  id: z.number(),
  user_id: z.number(),
  transaction_id: z.number(),
  review_id: z.array(z.number()),
  name: z.string().min(1),
  is_sold: z.boolean(),
  category: z.string().min(1),
  subcategory: z.string().min(1),
  description: z.string().min(1),
  is_verified: z.boolean(),
  price: z.number().positive(),
  image_url: z.string().url(),
  vaccine_book_url: z.string().url().nullable().optional(),
  user_profile_url: z.string().url().nullable().optional(),
  phone: z.string().nullable().optional(),
  owner: z.string(),
  created_at: z.string().date(),
  updated_at: z.string().date(),
})
export type PetDetail = z.infer<typeof PetDetail>

const c = initContract()
export const petContract = c.router({
  getListPets: {
    method: "GET",
    path: "/products/",
    responses: {
      200: c.type<Response<PetLists[]>>(),
      400: c.type<ErrorResponse>(),
    },
  },
  getPetId: {
    method: "GET",
    pathParams: c.type<{
      petId: number
    }>(),
    path: "/product/:petId",
    responses: {
      200: c.type<Response<PetDetail>>(),
      400: c.type<ErrorResponse>(),
    },
  },
  // RECHECK: can replace with getListPets?
  getListPetVerification: {
    method: "GET",
    path: "/products",
    responses: {
      200: c.type<Response<PetLists[]>>(),
      400: c.type<ErrorResponse>(),
    },
  },
  verificationPet: {
    method: "PATCH",
    path: "/product/verification/:petId",
    responses: {
      200: c.type<Response<PetLists>>(),
      400: c.type<ErrorResponse>(),
    },
    body: c.type<{
      is_verified: boolean
    }>(),
    pathParams: c.type<{
      petId: number
    }>(),
  },
  insertPet: {
    method: "POST",
    body: c.type<CreatePetRequest>(),
    path: "/product/add",
    responses: {
      201: c.type<Response<PetLists>>(),
      400: c.type<ErrorResponse>(),
    },
  },
  updatePet: {
    method: "PUT",
    body: c.type<UpdatePetRequest>(),
    pathParams: c.type<{
      petId: number
    }>(),
    path: "/product/:petId",
    responses: {
      200: c.type<Response<PetLists>>(),
      400: c.type<ErrorResponse>(),
    },
  },
  deletePet: {
    method: "DELETE",
    pathParams: c.type<{
      petId: number
    }>(),
    path: "/product/:petId",
    responses: {
      200: c.type<Response<string>>(),
      400: c.type<ErrorResponse>(),
    },
  },
  deleteAdminPet: {
    method: "DELETE",
    pathParams: c.type<{
      petId: number
    }>(),
    path: "/product/admin/:petId",
    responses: {
      200: c.type<Response<string>>(),
      400: c.type<ErrorResponse>(),
    },
  },
  // TODO: Mix will implement this in backend
  getGraphAdoptAnimal: {
    method: "GET",
    query: c.type<{
      graphRange: keyof typeof GraphSelectRangeEnumValue
    }>(),
    path: "/pets/graph/adopt-animal",
    responses: {
      200: c.type<Response<Graph[]>>(),
      400: c.type<ErrorResponse>(),
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
      400: c.type<ErrorResponse>(),
    },
  },
})

export const priceOptions: {
  value: keyof typeof PriceOption
  label: keyof typeof PriceOption
}[] = [
  { value: PriceOption.All, label: "All" },
  { value: PriceOption.Free, label: "Free" },
  { value: PriceOption.Commercial, label: "Commercial" },
]

export const sortOptions = [
  { value: "Sort By Latest", label: "Sort By Latest" },
  { value: "Sort By Oldest", label: "Sort By Oldest" },
  { value: "A to Z", label: "A to Z" },
  { value: "Z to A", label: "Z to A" },
]
