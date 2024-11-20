import React, { useState } from "react"
import { Button, Select, Table, Popconfirm, message } from "antd"
import type { TableProps } from "antd"
import { formatDateAdminPage } from "@/utils/formatDate"
import {
  PetListVerification,
  petVerificationOptions,
  PetVerificationStatus,
} from "@/core/api/pet/petContract"
import Link from "next/link"
import Image from "next/image"
import { useVerificationPet } from "../../hooks/useVerifyPet"

export default function PetAdminVerificationTable({
  data,
}: {
  data: PetListVerification[] | undefined
}) {
  const { verificationFlow } = useVerificationPet()
  const [selectedStatus, setSelectedStatus] = useState<{
    petId: number
    status: string
  } | null>(null)

  const handleStatusChange = (petId: number, value: string) => {
    setSelectedStatus({ petId, status: value })
  }

  const handleConfirm = async () => {
    if (selectedStatus) {
      try {
        await verificationFlow({
          petId: selectedStatus.petId,
          status: selectedStatus.status as PetVerificationStatus,
        })
        message.success("Verification status updated successfully")
      } catch (error) {
        message.error("Failed to update verification status")
      }
    }
    setSelectedStatus(null)
  }

  const handleCancel = () => {
    setSelectedStatus(null)
  }

  const columns: TableProps<PetListVerification>["columns"] = [
    {
      title: "Pet ID",
      dataIndex: "petId",
      key: "petId",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, { createdAt }) => <>{formatDateAdminPage(createdAt)}</>,
    },
    {
      title: "PetName",
      dataIndex: "petName",
      key: "petName",
    },
    {
      title: "bread",
      key: "bread",
      dataIndex: "bread",
    },
    {
      title: "color",
      key: "color",
      dataIndex: "color",
    },
    {
      title: "Document",
      key: "document",
      render: (_, { document }) => (
        <Image
          // @/public/Pelter-Logo.png
          src={document!}
          width={40}
          height={40}
          alt="document-image"
          className="mx-auto"
        />
      ),
      align: "center",
      dataIndex: "document",
    },
    {
      title: "Verify",
      render: (_, { petId }) => (
        <Popconfirm
          title="Change Verification Status"
          description="Are you sure you want to change the verification status?"
          open={selectedStatus?.petId === petId}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <Select
            options={petVerificationOptions}
            onChange={(value: string) => handleStatusChange(petId, value)}
            className="w-32"
          />
        </Popconfirm>
      ),
    },
  ]

  return (
    <Table<PetListVerification>
      rowKey={(record) => record.petId}
      columns={columns}
      dataSource={data}
    />
  )
}
