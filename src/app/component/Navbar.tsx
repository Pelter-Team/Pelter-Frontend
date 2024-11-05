import Link from "next/link"
import {
  SearchOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
} from "@ant-design/icons"

export default function Navbar({ white }: { white?: boolean }) {
  return (
    <div
      className={`z-30 flex fixed items-center justify-between px-4 md:px-8 py-2 lg:px-12 lg:py-4 h-[4.5rem] w-full ${
        white ? "bg-white text-primary" : "bg-transparent text-white"
      }`}
    >
      <div className="flex flex-row gap-6 items-center">
        <MenuOutlined className="text-2xl hover:text-black cursor-pointer" />
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
          href="/"
          className={`flex py-2 px-4 border-2 justify-center items-center rounded-md ${white ? "bg-secondary border-secondary hover:bg-#E9C9C1 hover:bg-opacity-80 text-black" : "border-white hover:bg-white text-white hover:text-black"}`}
        >
          Log In
        </Link>
      </div>
    </div>
  )
}
