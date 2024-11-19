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
import { useState, useCallback, SetStateAction } from "react"

interface FilterValues {
  ownerTypes: string[]
  priceRange: {
    isFree: boolean
    min?: number | undefined
    max?: number | undefined
  }
  gender: string
  petTypes: {
    strayDog: boolean
    dogBreed?: string
    strayCat: boolean
    catBreed?: string
  }
  foundationName?: string
}

interface FilterDrawerProps {
  visible: boolean
  onClose: () => void
  onFilter: (filters: FilterValues) => void
  onClear: () => void
}

const inititalPetType = {
  strayDog: false,
  dogBreed: "",
  strayCat: false,
  catBreed: "",
}

const FilterDrawer = ({ visible, onClose, onFilter }: FilterDrawerProps) => {
  const [ownerTypes, setOwnerTypes] = useState<string[]>([])
  const [foundationName, setFoundationName] = useState<string>("")
  const [priceRange, setPriceRange] = useState({
    isFree: false,
    min: undefined,
    max: undefined,
  })
  const [gender, setGender] = useState<string>("")
  const [petTypes, setPetTypes] =
    useState<FilterValues["petTypes"]>(inititalPetType)
  const handleApplyFilters = useCallback(() => {
    onFilter({
      ownerTypes,
      priceRange,
      gender,
      petTypes,
      foundationName: ownerTypes.includes("Foundation")
        ? foundationName
        : undefined,
    })
    onClose()
  }, [ownerTypes, priceRange, gender, petTypes, foundationName, onFilter])

  const handleClearFilters = () => {
    setOwnerTypes([])
    setFoundationName("")
    setPriceRange({ isFree: false, min: undefined, max: undefined })
    setGender("")
    setPetTypes({
      strayDog: false,
      dogBreed: "",
      strayCat: false,
      catBreed: "",
    })
    onFilter({
      ownerTypes: [],
      priceRange: { isFree: false, min: undefined, max: undefined },
      gender: "",
      petTypes: {
        strayDog: false,
        dogBreed: "",
        strayCat: false,
        catBreed: "",
      },
      foundationName: undefined,
    })
  }

  return (
    <Drawer
      title="Filters"
      placement="right"
      onClose={onClose}
      open={visible}
      width={320}
    >
      <Checkbox.Group
        value={ownerTypes}
        onChange={(values) => setOwnerTypes(values as string[])}
      >
        <p className="font-semibold">Owner Types</p>
        <Space direction="vertical">
          <Checkbox value="Individual">Individual</Checkbox>
          <Checkbox value="Foundation">Foundation</Checkbox>
          {ownerTypes.includes("Foundation") && (
            <Input
              placeholder="Enter foundation name"
              className="w-[200px] ml-6"
              value={foundationName}
              onChange={(e) => setFoundationName(e.target.value)}
            />
          )}
        </Space>
      </Checkbox.Group>

      <Divider />

      {/* Price Range */}
      <p className="font-semibold">Price Range</p>
      <Checkbox
        checked={priceRange.isFree}
        onChange={() =>
          setPriceRange({ isFree: true, min: undefined, max: undefined })
        }
      >
        Free
      </Checkbox>
      <Checkbox
        checked={!priceRange.isFree}
        onChange={() => setPriceRange((prev) => ({ ...prev, isFree: false }))}
      >
        Price Range
      </Checkbox>
      {!priceRange.isFree && (
        <div className="flex justify-between mt-2">
          <Input
            placeholder="MIN"
            className="w-[120px]"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange((prev) => ({
                ...prev,
                min: Number(e.target.value),
              }))
            }
          />
          <span>—</span>
          <Input
            placeholder="MAX"
            className="w-[120px]"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange((prev) => ({
                ...prev,
                max: Number(e.target.value),
              }))
            }
          />
        </div>
      )}

      <Divider />

      {/* Gender */}
      <p className="font-semibold">Gender</p>
      <Radio.Group value={gender} onChange={(e) => setGender(e.target.value)}>
        <Space direction="vertical">
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </Space>
      </Radio.Group>

      <Divider />

      {/* Pet Types */}
      <p className="font-semibold">Pet Types</p>
      <Checkbox
        checked={petTypes.strayDog}
        onChange={(e) =>
          setPetTypes((prev) => ({ ...prev, strayDog: e.target.checked }))
        }
      >
        Stray Dog
      </Checkbox>
      <Checkbox
        checked={petTypes.dogBreed !== undefined}
        onChange={(e) =>
          setPetTypes((prev) => ({
            ...prev,
            dogBreed: e.target.checked ? "" : undefined,
          }))
        }
      >
        Dog Breed
      </Checkbox>
      {petTypes.dogBreed !== undefined && (
        <AutoComplete
          options={[
            { value: "Golden Retriever" },
            { value: "Bulldog" },
            { value: "Poodle" },
          ]}
          className="w-full mt-2"
          placeholder="e.g., Golden Retriever"
          onChange={(value) =>
            setPetTypes((prev) => ({ ...prev, dogBreed: value }))
          }
        />
      )}

      <Checkbox
        checked={petTypes.strayCat}
        onChange={(e) =>
          setPetTypes((prev) => ({ ...prev, strayCat: e.target.checked }))
        }
      >
        Stray Cat
      </Checkbox>
      <Checkbox
        checked={petTypes.catBreed !== undefined}
        onChange={(e) =>
          setPetTypes((prev) => ({
            ...prev,
            catBreed: e.target.checked ? "" : undefined,
          }))
        }
      >
        Cat Breed
      </Checkbox>
      {petTypes.catBreed !== undefined && (
        <AutoComplete
          options={[
            { value: "Persian" },
            { value: "Siamese" },
            { value: "Bengal" },
          ]}
          className="w-full mt-2"
          placeholder="e.g., Persian"
          onChange={(value) =>
            setPetTypes((prev) => ({ ...prev, catBreed: value }))
          }
        />
      )}

      <Divider />

      <Button
        className="w-full mt-4 bg-[#B95F5F] text-white"
        onClick={handleApplyFilters}
      >
        Apply Filters
      </Button>
      <Button
        className="w-full mt-2 text-[#B95F5F]"
        onClick={handleClearFilters}
      >
        Clear All
      </Button>
    </Drawer>
  )
}

export default FilterDrawer
