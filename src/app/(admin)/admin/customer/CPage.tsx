"use client"
import { DebounceInput } from "@/components/DebounceInput"
import { sortOptions } from "@/core/api/pet/petContract"
import { SortOption } from "@/core/api/type"
import UserTab from "@/features/user/components/Tab"
import { SearchOutlined } from "@ant-design/icons"
import { Select } from "antd"
import { useMemo, useState } from "react"
import CardTotal, { CardTotalType } from "@/features/admin/components/CardTotal"
import { useListUser, useUserCount } from "@/features/user/hooks/useListUser"
import { formatNumber } from "@/utils/formatNumber"
import { UserType } from "@/core/api/user/userContract"

export default function Cpage({}: {}) {
  const [search, setSearch] = useState<string>("")
  const [sortOption, setSortOption] = useState<SortOption>(
    SortOption.SortByLatest
  )

  const handleSortOptionChange = (value: SortOption) => {
    setSortOption(value)
  }

  const { data: users } = useListUser({
    activeTab: UserType.All,
    search: "",
    sortOption: SortOption.SortByLatest,
  })
  const userCount = useMemo(() => {
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
  }, [users])

  const cards: CardTotalType[] = [
    {
      title: "Total Number of User",
      value: formatNumber(userCount?.total || 0),
      bgColor: "bg-[#E9C9C1]",
      textColor: "text-[#873800]",
    },
    {
      title: "Total Number of Individuals",
      value: formatNumber(userCount?.totalCustomer || 0),
      bgColor: "bg-[#E9C9C1]",
      textColor: "text-[#873800]",
    },
    {
      title: "Total Number of Foundation",
      value: formatNumber(userCount?.totalFoundation || 0),
      bgColor: "bg-[#E9C9C1]",
      textColor: "text-[#873800]",
    },
  ]

  return (
    <>
      <div className="flex gap-8 w-full flex-wrap">
        {cards.map((card) => (
          <CardTotal
            bgColor={card.bgColor}
            textColor={card.textColor}
            title={card.title}
            value={card.value}
            key={card.title}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap ">
          <div className="flex flex-shrink-0">
            <DebounceInput
              onChange={(e) => setSearch(e.target.value)}
              debounceTimeout={300}
              value={search}
              placeholder="Search username"
              className="debounce-input"
            />
            <div className="rounded-r-md px-2 py-1 flex justify-center items-center border-r border-t border-b bg-gray-50 ">
              <SearchOutlined />
            </div>
          </div>

          <Select
            value={sortOption}
            onChange={handleSortOptionChange}
            options={sortOptions}
            className="w-40 h-full"
          />
        </div>
        <UserTab search={search} sortOption={sortOption} />
      </div>
    </>
  )
}
