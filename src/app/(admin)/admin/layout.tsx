"use client"
import Sidebar from "@/features/admin/components/Sidebar"
import { useUser } from "@/features/auth/provider/UserContext"
import { formatDateAdminPage } from "@/utils/formatDate"
import { CalendarOutlined } from "@ant-design/icons"
import { Button } from "antd"
import Link from "next/link"

export default function Layout({ children }: { children: React.ReactNode }) {
  const { userState } = useUser?.()!
  if (userState?.user?.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Unauthorized Access
          </h1>
          <p className="text-gray-600 text-lg">
            Sorry, you dont have permission to access this page.
          </p>
          <Link href="/">
            <Button
              type="primary"
              size="large"
              className="shadow-md hover:scale-105 transition-transform mt-2"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col">
        <Sidebar />
      </div>
      <div className="pt-12 px-16 flex flex-col gap-8 w-full">
        <div className="flex gap-3 items-center">
          <CalendarOutlined
            size={24}
            className="text-lg text-gray-800 font-semibold"
          />
          <h6 className="text-xl text-gray-800 font-semibold">
            {formatDateAdminPage()}
          </h6>
        </div>
        {children}
      </div>
    </div>
  )
}
