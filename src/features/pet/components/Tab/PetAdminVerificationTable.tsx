import React, { useState } from "react"
import {
  Select,
  Table,
  Popconfirm,
  message,
  Modal,
  Image as ImageAntd,
} from "antd"
import type { TableProps } from "antd"
import { formatDateAdminPage } from "@/utils/formatDate"
import {
  PetLists,
  petVerificationOptions,
  PetVerificationStatus,
} from "@/core/api/pet/petContract"
import { useVerificationPet } from "../../hooks/useVerifyPet"

export default function PetAdminVerificationTable({
  data,
}: {
  data: PetLists[] | undefined
}) {
  const [selectedStatus, setSelectedStatus] = useState<{
    petId: number
    status: string
  } | null>(null)

  const { verificationFlow } = useVerificationPet()
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
      title: "Subcategory",
      key: "subcategory",
      dataIndex: "subcategory",
    },
    {
      title: "CreatedAt",
      render: (_, { created_at }) => (
        <>{formatDateAdminPage(new Date(created_at))}</>
      ),
    },
    {
      title: "Document",
      key: "document",
      render: (_, { vaccine_book_url }) => {
        if (vaccine_book_url) {
          return (
            <ImageAntd
              src={vaccine_book_url}
              width={40}
              height={40}
              alt="document-image"
              className="mx-auto"
            />
          )
        } else {
          return <h6>No vaccine book url</h6>
        }
      },
      align: "center",
      dataIndex: "document",
    },
    {
      title: "Verify",
      render: (_, { id, is_verified }) => (
        <Popconfirm
          title="Change Verification Status"
          description="Are you sure you want to change the verification status?"
          open={selectedStatus?.petId === id}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <Select
            options={petVerificationOptions}
            onChange={(value: string) => handleStatusChange(id, value)}
            className="w-32"
            value={
              is_verified
                ? PetVerificationStatus.Verified
                : PetVerificationStatus.Pending
            }
          />
        </Popconfirm>
      ),
    },
  ]

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
