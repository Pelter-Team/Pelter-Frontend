import { axiosClient } from "@/config/axios"
import { APIClient } from "./client"

export const apiClient = new APIClient(axiosClient, "https://localhost:8080")
export default apiClient
