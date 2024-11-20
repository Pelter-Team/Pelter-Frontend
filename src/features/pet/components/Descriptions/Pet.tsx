import { Descriptions, DescriptionsProps } from "antd"
import { usePetId } from "../../hooks/usePetId"
import LoadingSpinner from "@/components/LoadingSpinner"
import { formatDateAdminPage } from "@/utils/formatDate"
import { formatNumber } from "@/utils/formatNumber"
import { childrenTextClassName, descClassName, labelStyle } from "."

export default function PetDescription({ petId }: { petId: number }) {
  const { data: pet, isLoading } = usePetId({ petId })

  if (isLoading) {
    return <LoadingSpinner className="flex items-center justify-center" />
  }

  if (!pet) {
    return <h6>Pet data not found</h6>
  }

  const petDesc: DescriptionsProps["items"] = [
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
      label: "Breed",
      span: 3,
      labelStyle: labelStyle,
      className: descClassName,
      children: <p className={childrenTextClassName}>{pet.category}</p>,
    },
    {
      key: "3",
      label: "Date of birth",
      span: 3,
      labelStyle: labelStyle,
      className: descClassName,
      children: (
        <p className={childrenTextClassName}>
          {formatDateAdminPage(pet.created_at)}
        </p>
      ),
    },
    {
      key: "4",
      label: "Price",
      span: 3,
      labelStyle: labelStyle,
      className: descClassName,
      children: (
        <p className={childrenTextClassName}>{formatNumber(pet.price)}</p>
      ),
    },
    {
      key: "5",
      label: "Color",
      span: 3,
      labelStyle: labelStyle,
      className: descClassName,
      children: <p className={childrenTextClassName}>{pet.subcategory}</p>,
    },
    {
      key: "6",
      label: "Location",
      span: 3,
      labelStyle: labelStyle,
      className: descClassName,
      children: <p className={childrenTextClassName}>{pet.name}</p>,
    },
    {
      key: "7",
      label: "Description",
      span: 3,
      labelStyle: labelStyle,
      className: descClassName,
      children: <p className={childrenTextClassName}>{pet.name}</p>,
    },
  ]
  return (
    <>
      <Descriptions
        title="Pet details"
        className="text-xl font-normal"
        items={petDesc}
      />
    </>
  )
}
