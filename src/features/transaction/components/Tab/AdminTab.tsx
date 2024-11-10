import React, { useState } from "react"
import { Tabs } from "antd"
import TransactionTab from "./Table"
import TabPane from "antd/es/tabs/TabPane"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useTransactions } from "../../hooks/useTransactions"

const TabContent: React.FC<{ data: any; loading: boolean }> = ({
  data,
  loading,
}) => {
  return loading ? (
    <LoadingSpinner className="mt-8 flex justify-center" />
  ) : (
    <TransactionTab data={data} />
  )
}
enum TransactionStatus {
  "All transactions" = "all",
  "Success" = "success",
  "Processing" = "processing",
  "Cancel" = "cancel",
}
const AdminTabTransaction: React.FC = () => {
  const [activeTab, setActiveTab] =
    useState<keyof typeof TransactionStatus>("All transactions")

  const { isLoading: getTransactionLoading, data } = useTransactions(activeTab)
  function onChangeTab(key: string) {
    setActiveTab(key as keyof typeof TransactionStatus)
  }

  return (
    <Tabs defaultActiveKey="1" onChange={onChangeTab}>
      <TabPane
        tab={"All transactions"}
        key={TransactionStatus["All transactions"]}
      >
        <TabContent data={data} loading={getTransactionLoading} />
      </TabPane>
      <TabPane tab={"Success"} key={TransactionStatus["Success"]}>
        <TabContent data={data} loading={getTransactionLoading} />
      </TabPane>
      <TabPane tab={"Processing"} key={TransactionStatus["Processing"]}>
        <TabContent data={data} loading={getTransactionLoading} />
      </TabPane>
      <TabPane tab={"Cancel"} key={TransactionStatus["Cancel"]}>
        <TabContent data={data} loading={getTransactionLoading} />
      </TabPane>
    </Tabs>
  )
}

export default AdminTabTransaction
