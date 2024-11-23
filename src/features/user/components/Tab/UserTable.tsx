import React from "react"
import { Table } from "antd"
import type { TableProps } from "antd"
import { formatDateAdminPage } from "@/utils/formatDate"
import { UserList } from "@/core/api/user/userContract"

const columns: TableProps<UserList>["columns"] = [
  {
    title: "UserID",
    dataIndex: "user_id",
    key: "user_id",
  },
  {
    title: "UserName",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Phone",
    render: (_, { phone }) => <>{phone ? phone : "No data provided"}</>,
  },
  {
    title: "Address",
    render: (_, { address }) => <>{address ? address : "No data provided"}</>,
  },
  {
    title: "CreatedAt",
    render: (_, { created_at }) => (
      <>{formatDateAdminPage(new Date(created_at))}</>
    ),
  },
]

export default function UserTable({ data }: { data: UserList[] | undefined }) {
  return (
    <>
      <Table<UserList>
        rowKey={(record) => record.userId}
        columns={columns}
        dataSource={data}
      />
    </>
  )
}
