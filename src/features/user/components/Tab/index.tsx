import React, { useState } from "react"
import { Tabs } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useListUser } from "../../hooks/useListUser"
import { SortOption } from "@/core/api/type"
import UserTable from "./UserTable"
import { UserList, UserType } from "@/core/api/user/userContract"

const TabContent: React.FC<{
  data: UserList[] | undefined
  loading: boolean
}> = ({ data, loading }) => {
  return loading ? (
    <LoadingSpinner className="mt-8 flex justify-center" />
  ) : data ? (
    <UserTable data={data} />
  ) : (
    <h6 className="text-lg text-gray-400 font-normal">No data</h6>
  )
}
const TAB_CONFIG = [
  { label: "All", value: UserType.All },
  { label: "Customer", value: UserType.Customer },
  { label: "Foundation", value: UserType.Foundation },
] as const

export interface UserTabProps {
  search: string
  sortOption: SortOption
}
const UserTab: React.FC<UserTabProps> = ({ search, sortOption }) => {
  const [activeTab, setActiveTab] = useState<UserType>(UserType.All)

  const { data, isLoading: isListUserLoading } = useListUser({
    activeTab,
    sortOption,
    search,
  })

  function onChangeTab(key: string) {
    setActiveTab(key as UserType)
  }

  return (
    <Tabs defaultActiveKey={UserType.All} onChange={onChangeTab}>
      {TAB_CONFIG.map(({ label, value }) => (
        <TabPane key={value} tab={label}>
          <TabContent data={data} loading={isListUserLoading} />
        </TabPane>
      ))}
    </Tabs>
  )
}

export default UserTab
