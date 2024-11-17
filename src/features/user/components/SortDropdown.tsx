import { Dropdown, Menu } from "antd"
import { DownOutlined } from "@ant-design/icons"

interface SortDropdownProps {
  sortBy: string

  sortOrder: "asc" | "desc"
  onSortChange: (category: string) => void
  onSortOrderChange: (order: "asc" | "desc") => void
}

const SORT_OPTIONS = {
  latest: { category: "date", order: "desc", label: "Latest" },
  oldest: { category: "date", order: "asc", label: "Oldest" },
  alphabet: { category: "name", order: "asc", label: "Alphabet" },
  priceLowToHigh: { category: "price", order: "asc", label: "Lowest Price" },
  priceHighToLow: { category: "price", order: "desc", label: "Highest Price" },
} as const

const SortDropdown = ({
  sortBy,
  sortOrder,
  onSortChange,
  onSortOrderChange,
}: SortDropdownProps) => {
  const handleMenuClick = ({ key }: { key: string }) => {
    const option = SORT_OPTIONS[key as keyof typeof SORT_OPTIONS]
    onSortChange(option.category)
    onSortOrderChange(option.order)
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
    if (sortBy === "price") {
      return `Sort by Price: ${sortOrder === "asc" ? "Low to High" : "High to Low"}`
    }
    if (sortBy === "name") {
      return "Sort by Alphabet"
    }
    if (sortBy === "date") {
      return `Sort by ${sortOrder === "desc" ? "Latest" : "Oldest"}`
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
