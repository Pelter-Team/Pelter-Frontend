import React, { useState } from "react"
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

export interface PetAdminStatusTabProps {
  search: string
  priceOption: PriceOption
  sortOption: SortOption
}
const PetAdminStatusTab: React.FC<PetAdminStatusTabProps> = ({
  search,
  priceOption,
  sortOption,
}) => {
  const [activeTab, setActiveTab] = useState<PetStatus>(
    PetStatus.LookingForHome
  )

  const { data, isLoading: getTransactionLoading } = useListPets({
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
      <TabPane tab={PetStatus.LookingForHome} key={PetStatus.LookingForHome}>
        <TabContent data={data} loading={getTransactionLoading} />
      </TabPane>
      <TabPane tab={PetStatus.Adopted} key={PetStatus.Adopted}>
        <TabContent data={data} loading={getTransactionLoading} />
      </TabPane>
      <TabPane tab={PetStatus.AdoptionPending} key={PetStatus.AdoptionPending}>
        <TabContent data={data} loading={getTransactionLoading} />
      </TabPane>
    </Tabs>
  )
}

export default PetAdminStatusTab
