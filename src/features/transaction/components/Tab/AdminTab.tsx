import React, { useState } from "react"
import { Tabs } from "antd"
import TransactionTab, { DataType } from "./Table"
import TabPane from "antd/es/tabs/TabPane"
import LoadingSpinner from "@/components/LoadingSpinner"

const AdminTabTransaction: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const data: DataType[] = [
    {
      transactionId: "John Brown",
      createdAt: new Date(),
      petId: "New York No. 1 Lake Park",
      price: 500,
      status: "success",
    },
    {
      transactionId: "John Brown",
      createdAt: new Date(),
      petId: "New York No. 1 Lake Park",
      price: 500,
      status: "cancel",
    },
    {
      transactionId: "John Brown",
      createdAt: new Date(),
      petId: "New York No. 1 Lake Park",
      price: 500,
      status: "processing",
    },
  ]
  const data2: DataType[] = [
    {
      transactionId: "John Brown",
      createdAt: new Date(),
      petId: "New York No. 1 Lake Park",
      price: 500,
      status: "success",
    },
  ]

  // NOTE: I know this code is trash but if have time will rewrite later
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="All transactions" key={"1"}>
        {loading ? (
          <LoadingSpinner className="mt-8 flex justify-center" />
        ) : (
          <TransactionTab data={data} />
        )}
      </TabPane>
      <TabPane tab="Success" key={"2"}>
        {loading ? (
          <LoadingSpinner className="mt-8 flex justify-center" />
        ) : (
          <TransactionTab data={data2} />
        )}
      </TabPane>
      <TabPane tab="Processing" key={"3"}>
        {loading ? (
          <LoadingSpinner className="mt-8 flex justify-center" />
        ) : (
          <TransactionTab data={data} />
        )}
      </TabPane>
      <TabPane tab="Cancel" key={"4"}>
        {loading ? (
          <LoadingSpinner className="mt-8 flex justify-center" />
        ) : (
          <TransactionTab data={data} />
        )}
      </TabPane>
    </Tabs>
  )
}

export default AdminTabTransaction
