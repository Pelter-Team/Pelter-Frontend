import React from "react"
import { Table } from "antd"
import type { TableProps } from "antd"
import { formatDateAdminPage } from "@/utils/formatDate"
import {
  GetTransactionsResponse,
  TransactionWithProduct,
} from "@/core/api/transaction/transactionContract"

const columns: TableProps<TransactionWithProduct>["columns"] = [
  {
    title: "Transaction ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Transaction Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, { created_at }) => (
      <>{formatDateAdminPage(new Date(created_at))}</>
    ),
  },
  {
    title: "Pet ID",
    dataIndex: "product_id",
    key: "product_id",
  },
  {
    title: "Price",
    key: "price",
    align: "center",
    dataIndex: "price",
    render: (_, { price }) => <>{price}</>,
  },
  {
    title: "Verify Pet",
    key: "is_verified",
    align: "center",
    dataIndex: "is_verified",
    render: (_, { is_verified }) => {
      return (
        <div
          className={`
        ${is_verified ? "border-green-500 text-green-500 hover:bg-green-100" : "border-red-500 text-red-500 hover:bg-red-100"}
        px-3 py-0.5 border rounded-full text-center w-fit mx-auto`}
        >
          <h6 className="text-sm font-normal ">
            {is_verified ? "Verified" : "Not Verified"}
          </h6>
        </div>
      )
    },
  },
  // NOTE: This column is commented out because the status field is not available in the data
  // {
  //   title: "Status",
  //   key: "status",
  //   dataIndex: "status",
  //   align: "center",
  //   render: (_, { status }) => {
  //     switch (status) {
  //       case "success":
  //         return (
  //           <div className="px-3 py-0.5 border border-green-500 hover:bg-green-100 rounded-full text-center w-fit mx-auto">
  //             <h6 className="text-sm font-normal text-green-500">{status}</h6>
  //           </div>
  //         )
  //       case "cancel":
  //         return (
  //           <div className="px-3 py-0.5 border border-red-500 hover:bg-red-100 rounded-full text-center w-fit mx-auto">
  //             <h6 className="text-sm font-normal text-red-500">{status}</h6>
  //           </div>
  //         )
  //       case "processing":
  //         return (
  //           <div className="px-3 py-0.5 border border-blue-500 hover:bg-blue-100 rounded-full text-center w-fit mx-auto">
  //             <h6 className="text-sm font-normal text-blue-500">{status}</h6>
  //           </div>
  //         )
  //     }
  //   },
  // },
]

export default function TransactionTab({
  data,
}: {
  data: TransactionWithProduct[] | undefined
}) {
  return (
    <>
      <Table<TransactionWithProduct>
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
      />
    </>
  )
}
