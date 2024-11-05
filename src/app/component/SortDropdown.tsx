import { Dropdown, Menu } from "antd"
import { DownOutlined } from "@ant-design/icons"

const SortDropdown = ({
  sortBy,
  sortOrder,
  onSortChange,
  onSortOrderChange,
}: SortDropdownProps) => {
  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case "latest":
        onSortChange("date")
        onSortOrderChange("desc")
        break
      case "priceLowToHigh":
        onSortChange("price")
        onSortOrderChange("asc")
        break
      case "priceHighToLow":
        onSortChange("price")
        onSortOrderChange("desc")
        break
      case "Oldest":
        onSortChange("date")
        onSortOrderChange("asc")
        break
      case "Alphabet":
        onSortChange("name")
        onSortOrderChange("asc")
        break
    }
  }

  const sortMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="latest">Latest</Menu.Item>
      <Menu.Item key="Oldest">Oldest</Menu.Item>
      <Menu.Item key="Alphabet">Alphabet</Menu.Item>
      <Menu.Item key="priceLowToHigh">Lowest Price</Menu.Item>
      <Menu.Item key="priceHighToLow">Highest Price</Menu.Item>
    </Menu>
  )

  const getSortDisplayText = () => {
    if (sortBy === "price") {
      return sortOrder === "asc"
        ? "Sort by Price: Low to High"
        : "Sort by Price: High to Low"
    }
    if (sortBy === "name") {
      return "Sort by Alphabet"
    }
    if (sortBy === "date") {
      return sortOrder === "desc" ? "Sort by Latest" : "Sor by Oldest"
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
