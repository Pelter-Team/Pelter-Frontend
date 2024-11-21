import { APIError } from "../../error"
import { apiContract } from "../.."
import { Router } from "../../router"
import { SortOption } from "../../type"
import {
  CreatePetRequest,
  PetVerificationStatus,
  UpdatePetRequest,
} from "../petContract"
import { GraphSelectRangeEnumValue } from "@/features/admin/components/GraphSelectRange"

export class PetRouter extends Router<typeof apiContract> {
  async getListPets(category: string, search: string, sort: SortOption) {
    const response = await this.client.pet.getListPets({
      query: { category, search, sort },
    })
    switch (response.status) {
      case 200:
        return response.body.result
      default:
        throw new APIError(response.status, "Failed to fetch get list of pets")
    }
  }

  async getListPetVerification(
    sort: SortOption,
    search: string,
    status: PetVerificationStatus
  ) {
    const response = await this.client.pet.getListPetVerification({
      query: { sort: sort, search: search, status },
    })
    switch (response.status) {
      case 200:
        return response.body.result
      default:
        throw new APIError(
          response.status,
          "Failed to fetch get list of pet verification"
        )
    }
  }

  async verifyPet(petId: number, status: PetVerificationStatus) {
    const response = await this.client.pet.verificationPet({
      body: { status: status },
      params: { petId: petId },
    })
    switch (response.status) {
      case 200:
        return response.body.result
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
      default:
        throw new APIError(response.status, "Failed to delete admin pet")
    }
  }
}
