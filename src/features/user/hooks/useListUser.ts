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
      const users = await apiClient.userRouter.getUserList()
      // const users = await mockListUser()
      if (users) {
        return (
          users
            .filter((user) => {
              const searchCondition: boolean = user.username.includes(search)

              const roleCondition: boolean =
                activeTab === UserType.All ||
                (user.role as UserType) === activeTab

              return searchCondition && roleCondition
            })
            // .filter((user) => user.foundation === activeTab)
            .sort((a, b) => {
              switch (sortOption) {
                case SortOption.SortByLatest:
                  return (
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                  )
                case SortOption.SortByOldest:
                  return (
                    new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime()
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
      created_at: new Date(),
      phone: "0948652696",
      userId: "123214",
      username: "mix",
      role: "customer",
    },
    {
      address:
        "126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok 10140, Thailand.",
      created_at: new Date(),
      phone: "0948652696",
      userId: "123214",
      username: "mix",
      role: "foundation",
    },
  ]
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 2000)
  })
}

export const useUserCount = () => {
  const { data: users } = useListUser({
    activeTab: UserType.All,
    search: "",
    sortOption: SortOption.SortByLatest,
  })

  const calculateTotals = () => {
    if (!users) {
      return {
        total: 0,
        totalCustomer: 0,
        totalFoundation: 0,
      }
    }

    const total = users.length
    const totalCustomer = users.filter(
      (user) => user.role === UserType.Customer
    ).length
    const totalFoundation = users.filter(
      (user) => user.role === UserType.Foundation
    ).length
    return {
      total: total,
      totalCustomer: totalCustomer,
      totalFoundation: totalFoundation,
    }
  }

  const query = useQuery({
    queryKey: ["get-user-count"],
    queryFn: calculateTotals,
    refetchInterval: 30 * 1000,
  })

  return query
}
