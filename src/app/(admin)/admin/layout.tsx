import Sidebar from "@/features/admin/components/Sidebar"
import { formatDateAdminPage } from "@/utils/formatDate"
import { CalendarOutlined } from "@ant-design/icons"

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="h-full min-h-screen flex flex-col">
        <Sidebar />
      </div>
      <div className="py-12 px-16 flex flex-col gap-8 w-full">
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
