import React from "react"
import { Table } from "antd"
import type { TableProps } from "antd"
import { formatDateAdminPage } from "@/utils/formatDate"
import { UserList } from "@/core/api/user/userContract"

const columns: TableProps<UserList>["columns"] = [
  {
    title: "UserID",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "UserName",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Phone",
    key: "phone",
    dataIndex: "phone",
  },
  {
    title: "Address",
    key: "address",
    dataIndex: "address",
  },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, { createdAt }) => <>{formatDateAdminPage(createdAt)}</>,
  },
]

export default function UserTable({ data }: { data: UserList[] | undefined }) {
  return (
    <>
      <Table<UserList> columns={columns} dataSource={data} />
    </>
  )
}
