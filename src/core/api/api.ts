import { axiosClient } from "@/config/axios"
import { APIClient } from "./client"

export const apiClient = new APIClient(axiosClient, "https://localhost:5000")
export default apiClient
