import { APIError } from "../../error"
import { apiContract } from "../.."
import { Router } from "../../router"
import { CreatePetRequest, UpdatePetRequest } from "../petContract"
import { GraphSelectRangeEnumValue } from "@/features/admin/components/GraphSelectRange"
import { ApiError } from "next/dist/server/api-utils"

export class PetRouter extends Router<typeof apiContract> {
  async getListPets() {
    const response = await this.client.pet.getListPets()
    switch (response.status) {
      case 200:
        return response.body.result
      case 400:
        throw new ApiError(response.status, response.body.error)
      default:
        throw new APIError(response.status, "Failed to fetch get list of pets")
    }
  }

  async getMyPets() {
    const response = await this.client.pet.getMyPets()
    switch (response.status) {
      case 200:
        return response.body.result
      case 400:
        throw new ApiError(response.status, response.body.error)
      default:
        throw new APIError(
          response.status,
          "Failed to fetch get my list of pets"
        )
    }
  }

  async getListPetVerification() {
    const response = await this.client.pet.getListPetVerification()
    switch (response.status) {
      case 200:
        return response.body.result
      case 400:
        throw new ApiError(response.status, response.body.error)
      default:
        throw new APIError(
          response.status,
          "Failed to fetch get list of pet verification"
        )
    }
  }

  async verifyPet(petId: number, is_verified: boolean) {
    const response = await this.client.pet.verificationPet({
      body: { is_verified: is_verified },
      params: { petId: petId },
    })
    switch (response.status) {
      case 200:
        return response.body.result
      case 400:
        throw new ApiError(response.status, response.body.error)
      default:
        throw new APIError(response.status, "Failed to verify pet")
    }
  }

  async getGraphAdoptAnimal(
    graphRange: keyof typeof GraphSelectRangeEnumValue
  ) {
    const response = await this.client.pet.getGraphAdoptAnimal({
      query: { graphRange },
    })
    switch (response.status) {
      case 200:
        return response.body.result
      case 400:
        throw new ApiError(response.status, response.body.error)
      default:
        throw new APIError(
          response.status,
          "Failed to fetch graph adopt animal"
        )
    }
  }

  async getGraphAnimalLookingForHome(
    graphRange: keyof typeof GraphSelectRangeEnumValue
  ) {
    const response = await this.client.pet.getGraphAnimalLookingForHome({
      query: { graphRange },
    })
    switch (response.status) {
      case 200:
        return response.body.result
      case 400:
        throw new ApiError(response.status, response.body.error)
      default:
        throw new APIError(
          response.status,
          "Failed to fetch graph animal looking for home"
        )
    }
  }

  async getPetId(petId: number) {
    const response = await this.client.pet.getPetId({
      params: { petId },
    })
    switch (response.status) {
      case 200:
        return response.body.result
      case 400:
        throw new ApiError(response.status, response.body.error)
      default:
        throw new APIError(
          response.status,
          "Failed to fetch pet detail by petId"
        )
    }
  }

  async updateIsSold(petId: number, is_sold: boolean) {
    const response = await this.client.pet.updateIsSold({
      params: { petId },
      body: {
        is_sold: is_sold,
      },
    })
    switch (response.status) {
      case 200:
        return response.body.result
      case 400:
        throw new ApiError(response.status, response.body.error)
      default:
        throw new APIError(
          response.status,
          "Failed to fetch pet detail by petId"
        )
    }
  }

  async insertPet(body: CreatePetRequest) {
    const response = await this.client.pet.insertPet({
      body,
    })
    switch (response.status) {
      case 201:
        return response.body.result
      case 400:
        throw new ApiError(response.status, response.body.error)
      default:
        throw new APIError(response.status, "Failed to insert pet")
    }
  }

  async updatePet(petId: number, body: UpdatePetRequest) {
    const response = await this.client.pet.updatePet({
      body: body,
      params: { petId: petId },
    })
    switch (response.status) {
      case 200:
        return response.body.result
      case 400:
        throw new ApiError(response.status, response.body.error)
      default:
        throw new APIError(response.status, "Failed to update pet")
    }
  }

  async deletePet(petId: number) {
    const response = await this.client.pet.deletePet({
      params: { petId },
    })
    switch (response.status) {
      case 200:
        return response.body.result
      case 400:
        throw new ApiError(response.status, response.body.error)
      default:
        throw new APIError(response.status, "Failed to delete pet")
    }
  }

  async deleteAdminPet(petId: number) {
    const response = await this.client.pet.deleteAdminPet({
      params: { petId },
    })
    switch (response.status) {
      case 200:
        return response.body.result
      case 400:
        throw new ApiError(response.status, response.body.error)
      default:
        throw new APIError(response.status, "Failed to delete admin pet")
    }
  }
}
