import React from "react"
import { Tabs } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useListPets } from "../../hooks/useListPets"
import { PetLists, PetStatus, PriceOption } from "@/core/api/pet/petContract"
import PetAdminTable from "./PetAdminTable"
import { SortOption } from "@/core/api/type"

const TabContent: React.FC<{
  data: PetLists[] | undefined
  loading: boolean
}> = ({ data, loading }) => {
  return loading ? (
    <LoadingSpinner className="mt-8 flex justify-center" />
  ) : data ? (
    <PetAdminTable data={data} />
  ) : (
    <h6 className="text-lg text-gray-400 font-normal">No data</h6>
  )
}
const TAB_CONFIG = [
  { label: "All", value: PetStatus.All },
  { label: "Adopted", value: PetStatus.Adopted },
  { label: "Adopt pending", value: PetStatus.AdoptionPending },
] as const

export interface PetAdminStatusTabProps {
  search: string
  priceOption: PriceOption
  sortOption: SortOption
  activeTab: PetStatus
}
interface PetAdminStatus extends PetAdminStatusTabProps {
  setActiveTab: React.Dispatch<React.SetStateAction<PetStatus>>
}
const PetAdminStatusTab: React.FC<PetAdminStatus> = ({
  search,
  priceOption,
  sortOption,
  activeTab,
  setActiveTab,
}) => {
  const { data, isLoading: isGetListPetsLoading } = useListPets({
    activeTab,
    search,
    priceOption,
    sortOption,
  })
  function onChangeTab(key: string) {
    setActiveTab(key as PetStatus)
  }

  return (
    <Tabs defaultActiveKey="1" onChange={onChangeTab}>
      {TAB_CONFIG.map(({ label, value }) => (
        <TabPane key={value} tab={label}>
          <TabContent data={data} loading={isGetListPetsLoading} />
        </TabPane>
      ))}
    </Tabs>
  )
}

export default PetAdminStatusTab
