import Link from "next/link"
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons"

export default function Navbar() {
  const menu = [
    { name: "Pets", link: "/" },
    { name: "Mock1", link: "/" },
    { name: "Mock2", link: "/" },
  ]
  return (
    <div className="z-30 flex absolute items-center justify-between px-4 md:px-8 py-2 lg:px-12 lg:py-4 h-[4.5rem] w-full bg-transparent text-white">
      <div className="flex flex-row">
        <Link href="/" className="text-2xl font-bold mr-20 text-white">
          Pelter
        </Link>

        <div className="flex gap-11 items-center justify-center">
          {menu.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="text-lg font-semibold"
            >
              <div className="group relative inline-block">
                {item.name}
                <div className="hidden group-hover:block absolute border-t-2 border-white -bottom-1 left-0 w-full"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-row gap-6 justify-center items-center">
        <Link href="/">
          <HeartOutlined className="text-3xl hover:text-black" />
        </Link>
        <Link href="/">
          <ShoppingCartOutlined className="text-3xl hover:text-black" />
        </Link>
        <Link
          href="/"
          className="flex py-2 px-4 bg-yellow-800 text-white justify-center items-center rounded-md hover:bg-yellow-600"
        >
          Sign Up
        </Link>
        <Link
          href="/signin"
          className="flex py-2 px-4 border-2 justify-center items-center rounded-md hover:bg-white text-white hover:text-black"
        >
          Sign In
        </Link>
      </div>
    </div>
  )
}
