import { FilterState } from "@/app/(user)/petlist/CPage"
import {
  Drawer,
  Button,
  Checkbox,
  Input,
  Radio,
  AutoComplete,
  Divider,
  Space,
} from "antd"
import { useState, SetStateAction } from "react"

interface FilterDrawerProps {
  visible: boolean
  onClose: () => void
  setFilterState: React.Dispatch<SetStateAction<FilterState>>
  filterState: FilterState
  onClear: () => void
  subCategoryOptions: {
    value: string
    label: string
  }[]
}

const FilterDrawer = ({
  visible,
  onClose,
  filterState,
  setFilterState,
  subCategoryOptions,
  onClear,
}: FilterDrawerProps) => {
  return (
    <Drawer
      title="Filters"
      placement="right"
      onClose={onClose}
      open={visible}
      width={320}
    >
      <p className="font-semibold mb-2">Owner Types</p>
      <div className="flex flex-col gap-2">
        <Checkbox
          checked={filterState.ownerType === "all"}
          onChange={() =>
            setFilterState((prev) => ({ ...prev, ownerType: "all" }))
          }
        >
          All
        </Checkbox>
        <Checkbox
          checked={filterState.ownerType === "customer"}
          onChange={() =>
            setFilterState((prev) => ({ ...prev, ownerType: "customer" }))
          }
        >
          Individual
        </Checkbox>
        <Checkbox
          checked={filterState.ownerType === "foundation"}
          onChange={() =>
            setFilterState((prev) => ({ ...prev, ownerType: "foundation" }))
          }
        >
          Foundation
        </Checkbox>
      </div>

      <Divider />

      <p className="font-semibold mb-2">Pet verify</p>
      <div className="flex flex-col gap-2">
        <Checkbox
          checked={filterState.isVerify === "all"}
          onChange={() =>
            setFilterState((prev) => ({ ...prev, isVerify: "all" }))
          }
        >
          All
        </Checkbox>
        <Checkbox
          checked={filterState.isVerify === "verified"}
          onChange={() =>
            setFilterState((prev) => ({ ...prev, isVerify: "verified" }))
          }
        >
          Verify
        </Checkbox>
        <Checkbox
          checked={filterState.isVerify === "unverified"}
          onChange={() =>
            setFilterState((prev) => ({ ...prev, isVerify: "unverified" }))
          }
        >
          Unverify
        </Checkbox>
      </div>

      <Divider />

      <p className="font-semibold mb-2">Pet sold</p>
      <div className="flex flex-col gap-2">
        <Checkbox
          checked={filterState.isSold === "all"}
          onChange={() =>
            setFilterState((prev) => ({ ...prev, isSold: "all" }))
          }
        >
          All
        </Checkbox>
        <Checkbox
          checked={filterState.isSold === "sold"}
          onChange={() =>
            setFilterState((prev) => ({ ...prev, isSold: "sold" }))
          }
        >
          Sold
        </Checkbox>
        <Checkbox
          checked={filterState.isSold === "unsold"}
          onChange={() =>
            setFilterState((prev) => ({ ...prev, isSold: "unsold" }))
          }
        >
          Unsold
        </Checkbox>
      </div>

      <Divider />

      {/* Price Range */}
      <div className="flex flex-col gap-2">
        <p className="font-semibold">Price Range</p>
        <div className="flex gap-2">
          <Checkbox
            checked={filterState.priceRange.isFree}
            onChange={() =>
              // setPriceRange({ isFree: true, min: undefined, max: undefined })
              setFilterState((prev) => ({
                ...prev,
                priceRange: {
                  isFree: true,
                  min: undefined,
                  max: undefined,
                },
              }))
            }
          >
            Free
          </Checkbox>
          <Checkbox
            checked={!filterState.priceRange.isFree}
            onChange={() =>
              setFilterState((prev) => ({
                ...prev,
                priceRange: {
                  isFree: false,
                  min: prev.priceRange.min,
                  max: prev.priceRange.max,
                },
              }))
            }
          >
            Price Range
          </Checkbox>
        </div>
      </div>

      {!filterState.priceRange.isFree && (
        <div className="flex justify-between mt-2">
          <Input
            placeholder="MIN"
            className="w-[120px]"
            value={filterState.priceRange.min}
            onChange={(e) =>
              setFilterState((prev) => ({
                ...prev,
                priceRange: {
                  isFree: false,
                  min: Number(e.target.value),
                  max: prev.priceRange.max,
                },
              }))
            }
          />
          <span>—</span>
          <Input
            placeholder="MAX"
            className="w-[120px]"
            value={filterState.priceRange.max}
            onChange={(e) =>
              setFilterState((prev) => ({
                ...prev,
                priceRange: {
                  isFree: prev.priceRange.isFree,
                  min: prev.priceRange.min,
                  max: Number(e.target.value),
                },
              }))
            }
          />
        </div>
      )}

      <Divider />

      {/* Pet Types */}
      <p className="font-semibold">Pet Types</p>
      <AutoComplete
        options={subCategoryOptions}
        className="w-full mt-2"
        placeholder="e.g., Golden Retriever"
        onChange={(value) =>
          setFilterState((prev) => ({ ...prev, subCategory: value }))
        }
        value={filterState.subCategory}
      />
      <Divider />

      <Button
        className="w-full mt-4 bg-[#B95F5F] text-white"
        // onClick={handleApplyFilters}
      >
        Apply Filters
      </Button>
      <Button className="w-full mt-2 text-[#B95F5F]" onClick={onClear}>
        Clear All
      </Button>
    </Drawer>
  )
}

export default FilterDrawer
