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
    key: "phone",
    render: (_, { phone }) => (
      <span key={`phone-${_.user_id}`}>
        {phone ? phone : "No data provided"}
      </span>
    ),
  },
  {
    title: "Role",
    key: "role",
    render: (_, { role }) => <span key={`role-${_.user_id}`}>{role}</span>,
  },
  {
    title: "Address",
    key: "address",
    render: (_, { address }) => (
      <span key={`address-${_.user_id}`}>
        {address ? address : "No data provided"}
      </span>
    ),
  },
  {
    title: "CreatedAt",
    key: "created_at",
    render: (_, { created_at }) => (
      <span key={`created-${_.user_id}`}>
        {formatDateAdminPage(new Date(created_at))}
      </span>
    ),
  },
]
export default function UserTable({ data }: { data: UserList[] | undefined }) {
  return (
    <Table<UserList>
      rowKey={(record) => record.userId + record.username}
      columns={columns}
      dataSource={data}
      key={""}
    />
  )
}
