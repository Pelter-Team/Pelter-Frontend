import Link from "next/link"
import {
  SearchOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  PictureOutlined,
} from "@ant-design/icons"

export default function NavbarLogin({ white }: { white?: boolean }) {
  return (
    <div
      className={`z-30 flex fixed items-center justify-between px-4 md:px-8 py-2 lg:px-12 lg:py-4 h-[4.5rem] w-full backdrop-blur-sm ${
        white ? "bg-[#FFFAF5] text-primary" : "bg-FFFAF5 text-[#C5705D]"
      }`}
    >
      <div className="flex flex-row gap-6 items-center">
        <MenuOutlined className="text-2xl hover:text-black cursor-pointer" />
        <Link
          href="/"
          className="text-[45.33px] font-normal mr-20 font-lobster text-[#CD705D]"
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
        <Link href="/">
          <PictureOutlined className="text-3xl hover:text-black" />
        </Link>
      </div>
    </div>
  )
}
