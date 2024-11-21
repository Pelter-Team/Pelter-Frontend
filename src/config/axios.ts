import axios from "axios"

export const axiosClient = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})
