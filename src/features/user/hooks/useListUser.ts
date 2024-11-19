import { useQuery, UseQueryResult } from "@tanstack/react-query"
import apiClient from "@/core/api/api"
import { SortOption } from "@/core/api/type"
import { UserList, UserType } from "@/core/api/user/userContract"

export const useListUser = ({
  activeTab,
  sortOption,
  search,
}: {
  activeTab: UserType
  search: string
  sortOption: SortOption
}): UseQueryResult<UserList[], Error> => {
  const query = useQuery({
    queryKey: ["get-list-user", search, sortOption, activeTab],
    // queryFn: () => apiClient.userRouter.getUserList(sortOption, search),
    queryFn: mockListUser,
    refetchInterval: 30 * 1000,
  })
  return query
}

export const mockListUser = async (): Promise<UserList[]> => {
  const data: UserList[] = [
    {
      address:
        "126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok 10140, Thailand.",
      createdAt: new Date(),
      phone: "0948652696",
      userId: "123214",
      username: "mix",
    },
    {
      address:
        "126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok 10140, Thailand.",
      createdAt: new Date(),
      phone: "0948652696",
      userId: "123214",
      username: "mix",
    },
  ]
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 2000)
  })
}
