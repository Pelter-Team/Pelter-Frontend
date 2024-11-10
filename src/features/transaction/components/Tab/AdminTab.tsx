import React, { useState } from "react"
import { Tabs } from "antd"
import TransactionTab from "./Table"
import TabPane from "antd/es/tabs/TabPane"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useTransactions } from "../../hooks/useTransactions"
import { TransactionStatus } from "@/core/api/transaction/transaction"

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

const AdminTabTransaction: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TransactionStatus>(
    TransactionStatus.AllTransactions
  )

  const { isLoading: getTransactionLoading, data } = useTransactions(activeTab)
  function onChangeTab(key: string) {
    setActiveTab(key as TransactionStatus)
  }

  return (
    <Tabs defaultActiveKey="1" onChange={onChangeTab}>
      <TabPane tab="All Transactions" key={TransactionStatus.AllTransactions}>
        <TabContent data={data} loading={getTransactionLoading} />
      </TabPane>
      <TabPane tab="Success" key={TransactionStatus.Success}>
        <TabContent data={data} loading={getTransactionLoading} />
      </TabPane>
      <TabPane tab="Processing" key={TransactionStatus.Processing}>
        <TabContent data={data} loading={getTransactionLoading} />
      </TabPane>
      <TabPane tab="Cancel" key={TransactionStatus.Cancel}>
        <TabContent data={data} loading={getTransactionLoading} />
      </TabPane>
    </Tabs>
  )
}

export default AdminTabTransaction
