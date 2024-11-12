"use client"
import React from "react"
import {
  BarChartOutlined,
  BankOutlined,
  ProfileOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons"

import { Button } from "antd"
import PelterLogo from "@/app/public/Pelter-Logo.png"
import Image from "next/image"
import { usePathname } from "next/navigation"
import Link from "next/link"
interface LinkItemType {
  title: string
  path: string
  icon: React.ReactNode
}

const LinkItems: LinkItemType[] = [
  {
    title: "Overview",
    icon: <BarChartOutlined />,
    path: "/admin",
  },
  {
    title: "Transaction",
    icon: <BankOutlined />,
    path: "/admin/transactions",
  },
  {
    title: "Pet status",
    icon: <ProfileOutlined />,
    path: "/admin/pet-status",
  },
  {
    title: "Order",
    icon: <ShopOutlined />,
    path: "/admin/orders",
  },
  {
    title: "Customer Info",
    icon: <UserOutlined />,
    path: "/admin/customer",
  },
]

export default function Sidebar({}: {}) {
  const pathname = usePathname()

  return (
    <div className="w-[25vw] flex flex-col flex-1 h-full min-h-screen border-r pt-6 bg-[#F8EDE3]">
      <div className="flex flex-col gap-2 my-4 ">
        <div className="flex items-center  gap-2 justify-center px-4">
          <Image alt="pelter-logo" src={PelterLogo} className="w-24 h-24" />
          <div className="flex flex-col gap-2">
            {/* NOTE: need to change front here */}
            <h6 className="text-4xl font-semibold text-center text-primary">
              Pelter
            </h6>
            <h6 className="text-sm font-medium text-center text-gray-950">
              Administration
            </h6>
          </div>
        </div>
      </div>
      <hr className="mx-4 border-[#D9D9D9] border-[0.5px]" />
      <div className="flex flex-col gap-6 px-12 pt-6">
        {LinkItems.map((item, i) => (
          <Button
            key={i}
            color="default"
            type={pathname === item.path ? "primary" : "default"}
            className="px-2 py-5 flex items-center justify-center border-primary hover:border-primary/90"
            icon={item.icon}
          >
            <Link href={`${item.path}`}>{item.title}</Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
