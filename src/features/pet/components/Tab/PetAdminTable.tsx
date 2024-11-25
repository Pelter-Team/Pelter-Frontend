import React from "react"
import { Button, Table } from "antd"
import type { TableProps } from "antd"
import { formatDateAdminPage } from "@/utils/formatDate"
import { PetLists } from "@/core/api/pet/petContract"
import Link from "next/link"

const columns: TableProps<PetLists>["columns"] = [
  {
    title: "Pet ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "PetName",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Category",
    key: "category",
    dataIndex: "category",
  },
  {
    title: "Price",
    key: "price",
    render: (_, { price }) => <>{price}</>,
    align: "center",
    dataIndex: "price",
  },
  {
    title: "Owner",
    key: "owner",
    dataIndex: "owner",
  },
  {
    title: "Status",
    align: "center",
    render: (_, { is_sold }) => {
      return (
        <div
          className={`
        ${is_sold ? "border-green-500 text-green-500 hover:bg-green-100" : "border-red-500 text-red-500 hover:bg-red-100"}
        px-3 py-0.5 border rounded-full text-center w-fit mx-auto`}
        >
          <h6 className="text-sm font-normal ">
            {is_sold ? "Adopted" : "Not pending"}
          </h6>
        </div>
      )
    },
  },
  {
    title: "Verify",
    align: "center",
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
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, { created_at }) => (
      <>{formatDateAdminPage(new Date(created_at))}</>
    ),
  },
  {
    title: "Detail",
    render: (_, { id }) => (
      <Link href={`/pet/${id}`}>
        <Button variant="filled" type="primary">
          Details
        </Button>
      </Link>
    ),
  },
]

export default function PetAdminTable({
  data,
}: {
  data: PetLists[] | undefined
}) {
  return (
    <>
      <Table<PetLists>
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
      />
    </>
  )
}
