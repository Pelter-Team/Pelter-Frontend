import React, { useState } from "react"
import { Tabs } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import LoadingSpinner from "@/components/LoadingSpinner"
import { TransactionStatus } from "@/core/api/transaction/transactionContract"
import { useListPets } from "../../hooks/useListPets"
import {
  PetLists,
  PetStatus,
  PriceOption,
  SortOption,
} from "@/core/api/pet/petContract"
import PetsTable from "./PetTable"

const TabContent: React.FC<{
  data: PetLists[] | undefined
  loading: boolean
}> = ({ data, loading }) => {
  return loading ? (
    <LoadingSpinner className="mt-8 flex justify-center" />
  ) : data ? (
    <PetsTable data={data} />
  ) : (
    <h6 className="text-lg text-gray-400 font-normal">No data</h6>
  )
}

export interface PetStatusTabProps {
  search: string
  priceOption: PriceOption
  sortOption: SortOption
}
const PetStatusTab: React.FC<PetStatusTabProps> = ({
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
      <TabPane
        tab={PetStatus.LookingForHome}
        key={TransactionStatus.AllTransactions}
      >
        <TabContent data={data} loading={getTransactionLoading} />
      </TabPane>
      <TabPane tab={PetStatus.Adopted} key={TransactionStatus.Success}>
        <TabContent data={data} loading={getTransactionLoading} />
      </TabPane>
      <TabPane
        tab={PetStatus.AdoptionPending}
        key={TransactionStatus.Processing}
      >
        <TabContent data={data} loading={getTransactionLoading} />
      </TabPane>
    </Tabs>
  )
}

export default PetStatusTab
