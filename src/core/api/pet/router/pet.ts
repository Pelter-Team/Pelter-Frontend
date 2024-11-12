import { APIError } from "../../error"
import { apiContract } from "../.."
import { Router } from "../../router"

export class PetRouter extends Router<typeof apiContract> {
  async getListPets() {
    const response = await this.client.pet.getListPets({
      query: { category: "dog", search: "dog", sort: "asc" },
    })
    switch (response.status) {
      case 200:
        return response.body.data
      default:
        throw new APIError(
          response.status,
          "Failed to fetch total benefit and income"
        )
    }
  }
}
