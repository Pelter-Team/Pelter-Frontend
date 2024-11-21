import React from "react"
import { Button, Table } from "antd"
import type { TableProps } from "antd"
import { formatDateAdminPage } from "@/utils/formatDate"
import { PetLists } from "@/core/api/pet/petContract"
import Link from "next/link"

const columns: TableProps<PetLists>["columns"] = [
  {
    title: "Pet ID",
    dataIndex: "petId",
    key: "petId",
  },
  {
    title: "PetName",
    dataIndex: "petName",
    key: "petName",
  },
  {
    title: "color",
    key: "color",
    dataIndex: "color",
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
      <Link href={`/${id}`}>
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
