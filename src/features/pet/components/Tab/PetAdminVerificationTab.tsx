import React, { useState } from "react"
import { Tabs } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import LoadingSpinner from "@/components/LoadingSpinner"
import { SortOption } from "@/core/api/type"
import { useListPetVerification } from "../../hooks/useListPetVerification"
import PetAdminVerificationTable from "./PetAdminVerificationTable"
import { PetLists, PetVerificationStatus } from "@/core/api/pet/petContract"

const TabContent: React.FC<{
  data: PetLists[] | undefined
  loading: boolean
  status: PetVerificationStatus
}> = ({ data, loading, status }) => {
  return loading ? (
    <LoadingSpinner className="mt-8 flex justify-center" />
  ) : data ? (
    <PetAdminVerificationTable data={data} key={status} />
  ) : (
    <h6 className="text-lg text-gray-400 font-normal">No data</h6>
  )
}

export interface PetAdminVerificationTabProps {
  search: string
  sortOption: SortOption
}
const PetAdminVerificationTab: React.FC<PetAdminVerificationTabProps> = ({
  search,
  sortOption,
}) => {
  const [activeTab, setActiveTab] = useState<PetVerificationStatus>(
    PetVerificationStatus.Pending
  )

  const { data, isLoading: isListPetVerificationLoading } =
    useListPetVerification({
      activeTab: activeTab,
      search: search,
      sortOption: sortOption,
    })

  function onChangeTab(key: string) {
    setActiveTab(key as PetVerificationStatus)
  }

  return (
    <Tabs
      defaultActiveKey={PetVerificationStatus.Pending}
      onChange={onChangeTab}
    >
      {Object.values(PetVerificationStatus).map((status) => (
        <TabPane key={status} tab={status}>
          <TabContent
            data={data}
            loading={isListPetVerificationLoading}
            status={status}
          />
        </TabPane>
      ))}
    </Tabs>
  )
}

export default PetAdminVerificationTab
