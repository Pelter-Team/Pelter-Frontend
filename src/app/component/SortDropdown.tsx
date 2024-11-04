import { Dropdown, Menu } from "antd"
import { DownOutlined } from "@ant-design/icons"

const sortMenu = (
  <Menu>
    <Menu.Item key="latest">Sort by Latest</Menu.Item>
    <Menu.Item key="Free">Free</Menu.Item>
    <Menu.Item key="priceLowToHigh">Lowest Price</Menu.Item>
    <Menu.Item key="priceHighToLow">Highest Price</Menu.Item>
    <Menu.Item key="CreateDate">Create Date</Menu.Item>
    <Menu.Item key="Alphabet">Alphabet</Menu.Item>
  </Menu>
)

const SortDropdown = () => (
  <Dropdown overlay={sortMenu} trigger={["click"]}>
    <a className="ant-dropdown-link">
      Sort By <DownOutlined />
    </a>
  </Dropdown>
)

export default SortDropdown
