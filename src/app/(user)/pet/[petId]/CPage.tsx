"use client"

import LoadingSpinner from "@/components/LoadingSpinner"
import PetContract from "@/features/pet/components/Descriptions/Contract"
import PetDescription from "@/features/pet/components/Descriptions/Pet"
import { useAdoptPet } from "@/features/pet/hooks/useAdoptPet"
import { usePetId } from "@/features/pet/hooks/usePetId"
import { HomeOutlined } from "@ant-design/icons"
import { Breadcrumb, Button } from "antd"
import Image from "next/image"
import { useParams } from "next/navigation"

const images = [
  "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9",
]

export default function CPage({}: {}) {
  const { petId } = useParams()
  const { data: pet, isLoading } = usePetId({ petId: Number(petId) })
  const { adoptFlow, isPending: isAdoptPending } = useAdoptPet()

  if (isLoading) {
    return (
      <div className="container mx-auto min-h-screen flex justify-center items-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  if (!pet) {
    return <h6>Contract data not found</h6>
  }

  // NOTE: can split more but data from api is still ambigous
  return (
    <div className="container mx-auto p-4 pt-[6rem] my-auto">
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
              <Image fill src={images[0]} alt="pet" className="w-full h-full" />
            </div>
            <div className="flex-1" />
            <h6 className="text-xl font-medium">Posted By</h6>
            <div className="bg-white p-2 w-full flex rounded-lg gap-2">
              <Image
                src={images[0]}
                width={74}
                height={74}
                alt="posted-by"
                className="rounded-full"
              />
              {/* TODO: wondering where is owner of this product since api doesnt return? */}
              <div className="flex flex-col gap-1">
                <h6 className="text-base font-normal">Joseph Hwang</h6>
                <h6 className="text-sm font-normal">
                  I am a cat lover , please contact me via phone call
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
            <Button
              loading={isAdoptPending}
              onClick={() => adoptFlow({ petId: pet.id })}
              type="primary"
              className="py-5"
            >
              Adopt
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
