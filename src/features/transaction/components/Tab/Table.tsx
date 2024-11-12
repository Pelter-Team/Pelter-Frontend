import React from "react"
import { Table } from "antd"
import type { TableProps } from "antd"
import { formatDateAdminPage } from "@/utils/formatDate"
import { GetTransactionsResponse } from "@/core/api/transaction/transactionContract"

const columns: TableProps<GetTransactionsResponse>["columns"] = [
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
  },
  {
    title: "Transaction Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, { createdAt }) => <>{formatDateAdminPage(createdAt)}</>,
  },
  {
    title: "Pet ID",
    dataIndex: "petId",
    key: "petId",
  },
  {
    title: "Price",
    key: "price",
    align: "center",
    dataIndex: "price",
    render: (_, { price }) => <>{price}</>,
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    align: "center",
    render: (_, { status }) => {
      switch (status) {
        case "success":
          return (
            <div className="px-3 py-0.5 border border-green-500 hover:bg-green-100 rounded-full text-center w-fit mx-auto">
              <h6 className="text-sm font-normal text-green-500">{status}</h6>
            </div>
          )
        case "cancel":
          return (
            <div className="px-3 py-0.5 border border-red-500 hover:bg-red-100 rounded-full text-center w-fit mx-auto">
              <h6 className="text-sm font-normal text-red-500">{status}</h6>
            </div>
          )
        case "processing":
          return (
            <div className="px-3 py-0.5 border border-blue-500 hover:bg-blue-100 rounded-full text-center w-fit mx-auto">
              <h6 className="text-sm font-normal text-blue-500">{status}</h6>
            </div>
          )
      }
    },
  },
]

export default function TransactionTab({
  data,
}: {
  data: GetTransactionsResponse[] | undefined
}) {
  return (
    <>
      <Table<GetTransactionsResponse> columns={columns} dataSource={data} />
    </>
  )
}
