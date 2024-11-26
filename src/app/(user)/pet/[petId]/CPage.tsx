"use client"

import LoadingSpinner from "@/components/LoadingSpinner"
import PetContract from "@/features/pet/components/Descriptions/Contact"
import PetDescription from "@/features/pet/components/Descriptions/Pet"
import { useAdoptPet } from "@/features/pet/hooks/useAdoptPet"
import { usePetId } from "@/features/pet/hooks/usePetId"
import { HomeOutlined } from "@ant-design/icons"
import {
  Breadcrumb,
  Button,
  Image as ImageAntd,
  notification,
  Popconfirm,
} from "antd"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function CPage({}: {}) {
  const { petId } = useParams()
  const { data: pet, isLoading } = usePetId({ petId: Number(petId) })
  const { adoptFlow, isPending: isAdoptPending } = useAdoptPet()
  const [api, contextHolder] = notification.useNotification()
  const [success, setSuccess] = useState<boolean>(false)
  const onSubmit = async () => {
    try {
      await adoptFlow({ petId: Number(petId) })
      api.success({ message: "Success to adopt pet" })
      setSuccess(true)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred"
      api.error({
        message: "Failed to adopt pet",
        description: errorMessage,
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto min-h-screen flex justify-center items-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  if (!pet) {
    return <h6>Pet data not found</h6>
  }

  // NOTE: can split more but data from api is still ambigous
  return (
    <div className="container mx-auto p-4 pt-[6rem] my-auto">
      {contextHolder}
      <div className="flex flex-col mb-4 p-4 w-full">
        <Breadcrumb
          className="my-2"
          items={[
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              href: "/petlist",
              title: <span>Pet</span>,
            },
            {
              title: pet.name,
            },
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div className="relative w-full h-full min-h-96 max-h-96">
              <Image
                fill
                src={pet.image_url}
                alt="pet"
                className="w-full h-full"
              />
            </div>
            <div className="flex-1" />
            <h6 className="text-xl font-medium">Posted By</h6>
            <div className="bg-white p-2 w-full flex rounded-lg gap-2">
              <Image
                src={
                  pet.user_profile_url ||
                  "https://www.w3schools.com/howto/img_avatar.png"
                }
                width={48}
                height={48}
                alt="posted-by"
                className="rounded-full"
              />
              {/* TODO: wondering where is owner of this product since api doesnt return? */}
              <div className="flex flex-col gap-1">
                <h6 className="text-base font-normal">{pet.owner}</h6>
                <h6 className="text-sm font-normal">
                  {pet.phone
                    ? `Phone: ${pet.phone}`
                    : "No phone number provided"}
                </h6>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h6 className="text-3xl font-semibold">{pet.name}</h6>
            <div className="flex gap-4">
              <div className="px-4 py-1 rounded-2xl bg-[#D0B8A8]">
                <h6 className="text-white">{pet.category}</h6>
              </div>
              <div className="px-4 py-1 rounded-2xl bg-[#DFD3C3]">
                <h6 className="text-white">{pet.subcategory}</h6>
              </div>
            </div>
            <hr />
            <PetDescription petId={Number(petId)} />
            <PetContract petId={Number(petId)} />

            <Popconfirm
              title="Are you sure you  want do adopt this pet?"
              description="This action cannot be undone"
              onConfirm={onSubmit}
              okText="Yes"
              cancelText="No"
            >
              <Button
                loading={isAdoptPending}
                type="primary"
                className="py-5"
                disabled={pet.is_sold || success}
              >
                {pet.is_sold ? (
                  <p className="text-red-300">Pet already got adopted</p>
                ) : (
                  <p>Adopt</p>
                )}
              </Button>
            </Popconfirm>
          </div>
        </div>
      </div>
    </div>
  )
}
