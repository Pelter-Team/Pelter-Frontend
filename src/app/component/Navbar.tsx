import Link from "next/link"
import { useState } from "react"
import { Drawer } from "antd"
import {
  SearchOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons"

export default function Navbar({ white }: { white?: boolean }) {
  const [open, setOpen] = useState(false)

  const menu = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/" },
    { name: "Register your pet / stray", link: "/" },
    { name: "Contact us ", link: "/" },
  ]

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }
  return (
    <div
      className={`z-30 flex fixed items-center justify-between px-4 md:px-8 py-2 lg:px-12 lg:py-4 h-[4.5rem] w-full ${
        white ? "bg-white text-primary" : "bg-transparent text-white"
      }`}
    >
      <div className="flex flex-row gap-6 items-center">
        <MenuOutlined
          className="text-2xl hover:text-black cursor-pointer"
          onClick={showDrawer}
        />
        <Drawer
          onClose={onClose}
          open={open}
          placement="left"
          keyboard
          footer={
            <div className="flex flex-col gap-4 bottom-0 text-lg w-full pb-4 pt-2">
              <Link href="/" className="flex items-center hover:text-primary">
                <ShoppingCartOutlined className="text-3xl hover:text-black pr-2" />
                Shopping Cart
              </Link>
              <hr />
              <Link href="/" className="flex items-center hover:text-primary">
                <HeartOutlined className="text-3xl hover:text-black pr-2" />
                Wish list
              </Link>
              <hr />
              <Link href="/" className="flex items-center hover:text-primary">
                <UserOutlined className="text-3xl hover:text-black pr-2" />
                Login
              </Link>
            </div>
          }
        >
          <div className="flex flex-col gap-4 text-lg">
            {menu.map((item, index) => (
              <p key={index} className="group relative items-center flex">
                <div className="group-hover:flex hidden border-4 border-primary absolute -translate-x-[1.9rem] w-3 h-3 rounded-full"></div>
                <Link className="hover:text-primary" href={item.link}>
                  {item.name}
                </Link>
              </p>
            ))}
          </div>
        </Drawer>
        <Link
          href="/"
          className={`text-4xl font-bold mr-20 font-lobster ${white ? "flex" : "hidden"}`}
        >
          Pelter
        </Link>
      </div>

      <div className="flex flex-row gap-6 justify-center items-center">
        <Link href="/">
          <SearchOutlined className="text-3xl hover:text-black" />
        </Link>
        <Link href="/">
          <ShoppingCartOutlined className="text-3xl hover:text-black" />
        </Link>
        <Link
          href="/"
          className="flex py-2 px-4 border-2 border-yellow-800 bg-yellow-800 text-white justify-center items-center rounded-md hover:bg-yellow-700 hover:border-yellow-700"
        >
          Sign Up
        </Link>
        <Link
          href="/signin"
          className={`flex py-2 px-4 border-2 justify-center items-center rounded-md ${white ? "bg-secondary border-secondary hover:bg-#E9C9C1 hover:bg-opacity-80 text-black" : "border-white hover:bg-white text-white hover:text-black"}`}
        >
          Log In
        </Link>
      </div>
    </div>
  )
}
