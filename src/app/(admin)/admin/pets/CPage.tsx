"use client"
import { DebounceInput } from "@/components/DebounceInput"
import {
  PriceOption,
  priceOptions,
  sortOptions,
} from "@/core/api/pet/petContract"
import PetAdminStatusTab from "@/features/pet/components/Tab/PetAdminTab"
import { SearchOutlined } from "@ant-design/icons"
import { Select } from "antd"
import { useState } from "react"
import { SortOption } from "@/core/api/type"

export default function Cpage({}: {}) {
  const [search, setSearch] = useState<string>("")
  const [priceOption, setPriceOption] = useState<PriceOption>(PriceOption.Free)
  const [sortOption, setSortOption] = useState<SortOption>(
    SortOption.SortByLatest
  )

  const handlePriceOptionChange = (value: PriceOption) => {
    setPriceOption(value)
  }
  const handleSortOptionChange = (value: SortOption) => {
    setSortOption(value)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 flex-wrap ">
        <div className="flex items-center flex-shrink-0">
          <DebounceInput
            onChange={(e) => setSearch(e.target.value)}
            debounceTimeout={300}
            value={search}
            placeholder="input search text"
            className="debounce-input"
          />
          <div className="rounded-r-md px-2 py-1 flex justify-center items-center border-r border-t border-b bg-gray-50 ">
            <SearchOutlined />
          </div>
        </div>
        <Select
          value={priceOption}
          onChange={handlePriceOptionChange}
          options={priceOptions}
          className="w-28"
        />
        <Select
          value={sortOption}
          onChange={handleSortOptionChange}
          options={sortOptions}
          className="w-40 h-full"
        />
      </div>
      <PetAdminStatusTab
        search={search}
        priceOption={priceOption}
        sortOption={sortOption}
      />
    </div>
  )
}