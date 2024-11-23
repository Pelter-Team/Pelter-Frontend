import React, { useState } from "react"
import { Tabs } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useTransactions } from "../../hooks/useTransactions"
import {
  TransactionStatus,
  TransactionWithProduct,
} from "@/core/api/transaction/transactionContract"
import TransactionTable from "./Table"

interface TabContentProps {
  data: TransactionWithProduct[] | undefined
  loading: boolean
}

const TAB_CONFIG = [
  { label: "All Transactions", value: TransactionStatus.AllTransactions },
  { label: "Verify", value: TransactionStatus.VerifyPet },
  { label: "Not-Verify", value: TransactionStatus.NotVerifyPet },
] as const

const TabContent: React.FC<TabContentProps> = ({ data, loading }) => {
  if (loading) {
    return <LoadingSpinner className="mt-8 flex justify-center" />
  }

  if (!data) {
    return <div className="text-gray-500">No transactions found</div>
  }

  return <TransactionTable data={data} />
}

const TransactionTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TransactionStatus>(
    TransactionStatus.AllTransactions
  )

  const { isLoading, data, error } = useTransactions(activeTab)

  const handleTabChange = (key: string) => {
    setActiveTab(key as TransactionStatus)
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error loading transactions: {error.message}
      </div>
    )
  }

  return (
    <Tabs
      defaultActiveKey={TransactionStatus.AllTransactions}
      onChange={handleTabChange}
    >
      {TAB_CONFIG.map(({ label, value }) => (
        <TabPane key={value} tab={label}>
          <TabContent data={data} loading={isLoading} />
        </TabPane>
      ))}
    </Tabs>
  )
}

export default TransactionTabs
