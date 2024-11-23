import { useQuery } from "@tanstack/react-query"
import { GraphSelectRangeEnumValue } from "../components/GraphSelectRange"
import { Graph } from "@/core/api/pet/petContract"
import apiClient from "@/core/api/api"
import { getDateRanges } from "@/utils/formatDate"

export interface AdminGraph {
  "adopt-animal": Graph[]
  "animal-looking-for-home": Graph[]
  "commission-statistic-sale": Graph[]
  "total-users": Graph[]
  totalAnimal: number
  totalDog: number
  totalCat: number
}

export const useDashboardGraph = ({
  graphRange,
}: {
  graphRange: keyof typeof GraphSelectRangeEnumValue
}) => {
  const queryFn = async (
    graphRange: keyof typeof GraphSelectRangeEnumValue
  ) => {
    const transactions = await apiClient.transactionRouter.getTransactions()
    const pets = await apiClient.petRouter.getListPets()
    const users = await apiClient.userRouter.getUserList()
    const dateRanges = getDateRanges(graphRange)

    const totalAnimal = pets.length
    let totalDog = 0
    let totalCat = 0

    const totalTransactions = dateRanges.map(({ start, end, label }) => ({
      key: label,
      value: transactions
        .filter((transaction) => {
          const createdAt = new Date(transaction.created_at)
          return createdAt >= start && createdAt < end
        })
        .reduce((acc, curr) => acc + curr.amount, 0),
    }))

    const petAdopted = pets.filter((pet) => {
      if (pet.category.toLowerCase() === "dog") {
        totalDog++
      } else if (pet.category.toLowerCase() === "cat") {
        totalCat++
      }
      return pet.is_sold === true
    })
    const petLookingForHome = pets.filter((pet) => pet.is_sold === false)

    const totalPetAdopted = dateRanges.map(({ start, end, label }) => ({
      key: label,
      value: petAdopted.filter((pet) => {
        const createdAt = new Date(pet.created_at)
        return createdAt >= start && createdAt < end
      }).length,
    }))

    const totalPetLookingForHome = dateRanges.map(({ start, end, label }) => ({
      key: label,
      value: petLookingForHome.filter((pet) => {
        const createdAt = new Date(pet.created_at)
        return createdAt >= start && createdAt < end
      }).length,
    }))

    const totalUsers = dateRanges.map(({ start, end, label }) => ({
      key: label,
      value: users.filter((user) => {
        const createdAt = new Date(user.created_at)
        return createdAt >= start && createdAt < end
      }).length,
    }))

    const graph: AdminGraph = {
      "adopt-animal": totalPetAdopted,
      "animal-looking-for-home": totalPetLookingForHome,
      "commission-statistic-sale": totalTransactions,
      "total-users": totalUsers,
      totalAnimal,
      totalCat,
      totalDog,
    }

    return graph
  }

  const query = useQuery({
    queryKey: ["dashboard-graph", graphRange],
    queryFn: () => queryFn(graphRange),
    refetchInterval: 30 * 1000,
  })
  return query
}

export const mockDashboardGraph = async (): Promise<Graph[]> => {
  const data: Graph[] = [
    { key: "Company A", value: 1000 },
    { key: "Company B", value: 2000 },
    { key: "Company C", value: 3000 },
  ]

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}
