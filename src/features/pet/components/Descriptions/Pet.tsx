import { Button, Descriptions, DescriptionsProps, Image, Modal } from "antd"
import { usePetId } from "../../hooks/usePetId"
import LoadingSpinner from "@/components/LoadingSpinner"
import { formatDateAdminPage } from "@/utils/formatDate"
import { formatNumber } from "@/utils/formatNumber"
import { childrenTextClassName, descClassName, labelStyle } from "."
import { useMemo, useState } from "react"

export default function PetDescription({ petId }: { petId: number }) {
  const { data: pet, isLoading } = usePetId({ petId })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const petDesc: DescriptionsProps["items"] = useMemo(() => {
    if (!pet) return []

    let temp = [
      {
        key: "1",
        label: "Pet ID",
        span: 3,
        className: descClassName,
        labelStyle: labelStyle,
        children: <p className={childrenTextClassName}>{pet.id}</p>,
      },
      {
        key: "2",
        label: "Name",
        span: 3,
        className: descClassName,
        labelStyle: labelStyle,
        children: <p className={childrenTextClassName}>{pet.name}</p>,
      },
      {
        key: "3",
        label: "Type",
        span: 3,
        labelStyle: labelStyle,
        className: descClassName,
        children: <p className={childrenTextClassName}>{pet.category}</p>,
      },
      {
        key: "4",
        label: "Breed",
        span: 3,
        labelStyle: labelStyle,
        className: descClassName,
        children: <p className={childrenTextClassName}>{pet.subcategory}</p>,
      },
      {
        key: "5",
        label: "Date of birth",
        span: 3,
        labelStyle: labelStyle,
        className: descClassName,
        children: (
          <p className={childrenTextClassName}>
            {formatDateAdminPage(new Date(pet.created_at))}
          </p>
        ),
      },
      {
        key: "6",
        label: "Price",
        span: 3,
        labelStyle: labelStyle,
        className: descClassName,
        children: <p className={childrenTextClassName}>{pet.price}</p>,
      },

      {
        key: "7",
        label: "Sold",
        span: 3,
        labelStyle: labelStyle,
        className: descClassName,
        children: (
          <p className={childrenTextClassName}>
            {pet.is_sold ? "Sold" : "Unsold"}
          </p>
        ),
      },
      {
        key: "8",
        label: "Verify",
        span: 3,
        labelStyle: labelStyle,
        className: descClassName,
        children: (
          <p className={childrenTextClassName}>
            {pet.is_verified ? "Verified" : "Unverified"}
          </p>
        ),
      },
      {
        key: "9",
        label: "Description",
        span: 3,
        labelStyle: labelStyle,
        className: descClassName,
        children: (
          <>
            <br />
            <p className={childrenTextClassName}>{pet.description}</p>
          </>
        ),
      },
    ]
    if (pet.vaccine_book_url) {
      temp.push({
        key: "10",
        label: "Pet Degree",
        span: 3,
        labelStyle: labelStyle,
        className: descClassName,
        children: (
          <Button onClick={() => setIsModalOpen(true)}>Vaccine book</Button>
        ),
      })
    }

    return temp
  }, [pet])

  if (isLoading) {
    return <LoadingSpinner className="flex items-center justify-center" />
  }

  if (!pet) {
    return <h6>Pet data not found</h6>
  }

  return (
    <>
      <Descriptions
        title="Pet details"
        className="text-2xl font-semibold"
        items={petDesc}
      />
      <Modal
        title=""
        open={isModalOpen}
        onOk={() => setIsModalOpen((prev) => !prev)}
        onCancel={() => setIsModalOpen(false)}
        width="80vw"
        className="flex items-center justify-center"
        footer={null}
      >
        <div className="w-full relative">
          <Image
            src={pet.vaccine_book_url!}
            alt="Vaccine Book"
            className="w-full h-auto object-contain"
            width={650}
            height={650}
          />
        </div>
      </Modal>
    </>
  )
}
