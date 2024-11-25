import { Descriptions, DescriptionsProps } from "antd"
import { usePetId } from "../../hooks/usePetId"
import { childrenTextClassName, descClassName, labelStyle } from "."

export default function PetContract({ petId }: { petId: number }) {
  const { data: pet } = usePetId({ petId })

  if (!pet) {
    return <h6>Contact data not found</h6>
  }

  const petDesc: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Owner Name",
      span: 3,
      className: descClassName,
      labelStyle: labelStyle,
      children: <p className={childrenTextClassName}>{pet.id}</p>,
    },
    {
      key: "2",
      label: "Contact",
      span: 3,
      className: descClassName,
      labelStyle: labelStyle,
      children: <p className={childrenTextClassName}>{pet.category}</p>,
    },
  ]

  return (
    <>
      <Descriptions title="Contacts" className="" items={petDesc} />
    </>
  )
}
