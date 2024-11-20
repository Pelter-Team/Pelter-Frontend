import { useQuery } from "@tanstack/react-query"
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
}) => {
  const queryFn = async () => {
    try {
      const users = await mockListUser()
      if (users) {
        return (
          users
            .filter((user) => user.username.includes(search))
            // .filter((user) => user.foundation === activeTab)
            .sort((a, b) => {
              switch (sortOption) {
                case SortOption.SortByLatest:
                  return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                  )
                case SortOption.SortByOldest:
                  return (
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                  )
                case SortOption.AToZ:
                  return a.username.localeCompare(b.username)
                case SortOption.ZToA:
                  return b.username.localeCompare(a.username)
              }
            })
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  const query = useQuery({
    queryKey: ["get-list-user", search, sortOption, activeTab],
    // queryFn: () => apiClient.userRouter.getUserList(sortOption, search),
    queryFn: queryFn,
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
