import { DownOutlined } from "@ant-design/icons"
import { Button, Dropdown, Menu } from "antd"

interface SortDropdownProps {
  currentSort: string
  onSort: (value: string) => void
}

const SORT_OPTIONS = {
  latest: "Latest",
  oldest: "Oldest",
  alphabet: "Alphabet",
  priceLowToHigh: "Lowest Price",
  priceHighToLow: "Highest Price",
} as const

const SortDropdown = ({ currentSort, onSort }: SortDropdownProps) => {
  const handleMenuClick = ({ key }: { key: string }) => {
    onSort(key)
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

  return (
    <Dropdown overlay={sortMenu}>
      <Button>
        {SORT_OPTIONS[currentSort as keyof typeof SORT_OPTIONS]}{" "}
        <DownOutlined />
      </Button>
    </Dropdown>
  )
}

export default SortDropdown
