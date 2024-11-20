import { Dropdown, Menu } from "antd"
import { DownOutlined } from "@ant-design/icons"

type SortOption = {
  category: "date" | "name" | "price"
  order: "asc" | "desc"
}

interface SortDropdownProps {
  currentSort: SortOption
  onSort: (sort: SortOption) => void
}

const SORT_OPTIONS = {
  latest: { category: "date", order: "desc", label: "Latest" },
  oldest: { category: "date", order: "asc", label: "Oldest" },
  alphabet: { category: "name", order: "asc", label: "Alphabet" },
  priceLowToHigh: { category: "price", order: "asc", label: "Lowest Price" },
  priceHighToLow: { category: "price", order: "desc", label: "Highest Price" },
} as const

const SortDropdown = ({ currentSort, onSort }: SortDropdownProps) => {
  const handleMenuClick = ({ key }: { key: string }) => {
    const option = SORT_OPTIONS[key as keyof typeof SORT_OPTIONS]
    onSort({ category: option.category, order: option.order })
  }

  const sortMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="latest">Latest</Menu.Item>
      <Menu.Item key="oldest">Oldest</Menu.Item>
      <Menu.Item key="alphabet">Alphabet</Menu.Item>
      <Menu.Item key="priceLowToHigh">Lowest Price</Menu.Item>
      <Menu.Item key="priceHighToLow">Highest Price</Menu.Item>
    </Menu>
  )

  const getSortDisplayText = () => {
    const { category, order } = currentSort
    if (category === "price") {
      return `Sort by Price: ${order === "asc" ? "Low to High" : "High to Low"}`
    }
    if (category === "name") {
      return "Sort by Alphabet"
    }
    if (category === "date") {
      return `Sort by ${order === "desc" ? "Latest" : "Oldest"}`
    }
    return "Sort By"
  }

  return (
    <Dropdown overlay={sortMenu} trigger={["click"]}>
      <a className="ant-dropdown-link cursor-pointer">
        {getSortDisplayText()} <DownOutlined />
      </a>
    </Dropdown>
  )
}

export default SortDropdown
