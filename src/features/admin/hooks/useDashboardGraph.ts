import { useQuery } from "@tanstack/react-query"
import { GraphSelectRangeEnumValue } from "../components/GraphSelectRange"
import { Graph } from "@/core/api/pet/petContract"

export interface AdminGraph {
  "adopt-animal": Graph[]
  "animal-looking-for-home": Graph[]
  "commission-statistic-sale": Graph[]
  "total-users": Graph[]
}

export const useDashboardGraph = ({
  graphRange,
}: {
  graphRange: keyof typeof GraphSelectRangeEnumValue
}) => {
  const queryFn = async (
    graphRange: keyof typeof GraphSelectRangeEnumValue
  ) => {
    // const graphAdopt = await apiClient.petRouter.getGraphAdoptAnimal(graphRange)
    // const graphAnimalLookingForHome =
    //   await apiClient.petRouter.getGraphAnimalLookingForHome(graphRange)
    // const totalUser = await apiClient.userRouter.getGraphTotalUser(graphRange)
    // const commission =
    //   await apiClient.transactionRouter.getGraphStatistic(graphRange)
    const graphAdopt = await mockDashboardGraph()
    const graphAnimalLookingForHome = await mockDashboardGraph()
    const commission = await mockDashboardGraph()
    const totalUser = await mockDashboardGraph()

    const graph: AdminGraph = {
      "adopt-animal": graphAdopt,
      "animal-looking-for-home": graphAnimalLookingForHome,
      "commission-statistic-sale": commission,
      "total-users": totalUser,
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
