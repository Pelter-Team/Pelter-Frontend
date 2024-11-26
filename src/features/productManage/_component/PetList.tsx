import {
  Input,
  Button,
  Dropdown,
  Spin,
  Modal,
  Radio,
  notification,
  Popconfirm,
} from "antd"
import type { MenuProps, RadioChangeEvent } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { useMemo, useState } from "react"
import { useGetPets } from "@/features/pet/hooks/useMyPet"
import PetCard from "./PetCard"
import { useUpdateIsSold } from "@/features/pet/hooks/useUpdateIsSold"
import Link from "next/link"

interface SelectPet {
  petId: number
  name: string
  is_sold: boolean
}

export default function PetList() {
  const [searchText, setSearchText] = useState<string>("")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [selectPet, setSelectPet] = useState<SelectPet>({
    petId: -1,
    name: "",
    is_sold: false,
  })
  const { isPending: isUpdatePetLoading, updateIsSoldFlow } = useUpdateIsSold()
  const [api, contextHolder] = notification.useNotification()
  const { data: pets, isLoading, error } = useGetPets()

  const filteredPets = useMemo(() => {
    return (
      pets?.filter((pet) => {
        const matchesSearch =
          pet.name.toLowerCase().includes(searchText.toLowerCase()) ||
          pet.description.toLowerCase().includes(searchText.toLowerCase())

        const matchesType = selectedType ? pet.category === selectedType : true

        const matchesStatus =
          selectedStatus === "Adopted"
            ? pet.is_sold
            : selectedStatus === "Looking for home"
              ? !pet.is_sold
              : true

        return matchesSearch && matchesType && matchesStatus
      }) ?? []
    )
  }, [pets, searchText, selectedType, selectedStatus])

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={() => setSelectedType("Cat")}>Cat</a>,
    },
    {
      key: "2",
      label: <a onClick={() => setSelectedType("Dog")}>Dog</a>,
    },
    {
      key: "3",
      label: <a onClick={() => setSelectedType(null)}>All</a>,
    },
  ]

  const statuses: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={() => setSelectedStatus("Adopted")}>Adopted</a>,
    },
    {
      key: "2",
      label: (
        <a onClick={() => setSelectedStatus("Looking for home")}>
          Looking for home
        </a>
      ),
    },
    {
      key: "3",
      label: <a onClick={() => setSelectedStatus(null)}>All</a>,
    },
  ]

  const handleOpen = (petId: number, name: string, is_sold: boolean) => {
    setOpen((prev) => !prev)
    setSelectPet({
      petId: petId,
      name: name,
      is_sold: is_sold,
    })
  }

  const onChangeStatus = (e: RadioChangeEvent) => {
    setSelectPet((prev) => ({ ...prev, is_sold: e.target.value === "yes" }))
  }

  const handleSubmit = async () => {
    try {
      const { is_sold, name, petId } = selectPet
      const { response } = await updateIsSoldFlow({
        is_sold: is_sold,
        petId: petId,
      })
      api.success({
        message: "Update status is sold of pet" + name + " successfully",
      })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred"
      api.error({
        message: "Failed to adopt pet",
        description: errorMessage,
      })
    } finally {
      setOpen(false)
    }
  }

  return (
    <>
      {contextHolder}

      <Modal
        footer={null}
        title={`You updating status of pet ${selectPet.name}`}
        open={open}
        onClose={() => setOpen((prev) => false)}
        onCancel={() => setOpen((prev) => false)}
      >
        <div className="flex flex-col gap-4 mt-4">
          <Radio.Group
            onChange={onChangeStatus}
            value={selectPet.is_sold ? "yes" : "no"}
          >
            <Radio value={"yes"}>Yes</Radio>
            <Radio value={"no"}>No</Radio>
          </Radio.Group>
          <Popconfirm
            title={`Are you sure you want to update status is sold ${selectPet.name} ?`}
            description="This action will update status is sold of pet"
            onConfirm={() => handleSubmit()}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">Submit</Button>
          </Popconfirm>
        </div>
      </Modal>
      <div className="flex flex-col w-4/5 p-8 gap-4 h-full">
        <div className="w-full h-10 flex flex-row justify-between gap-6">
          <Input
            placeholder="Search pet by name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            menu={{ items }}
            className="w-1/6 h-10 flex items-center"
            placement="bottomRight"
          >
            <Button>
              Type <DownOutlined />
            </Button>
          </Dropdown>

          <Dropdown
            menu={{ items: statuses }}
            className="w-1/6 h-10 flex items-center"
            placement="bottomRight"
          >
            <Button>
              Status <DownOutlined />
            </Button>
          </Dropdown>

          <Link href={"/newProduct"} className="w-1/6 h-10">
            <Button type="primary">Post Pet</Button>
          </Link>
        </div>

        <hr className="border-t border-gray-300 w-full" />

        <div className="flex flex-col overflow-y-scroll h-[calc(100%-8rem)]">
          {isLoading && <Spin size="large" />}
          {error && <div className="text-red-500">{error.message}</div>}
          {filteredPets?.map((pet) => (
            <PetCard
              key={pet.id}
              card={{
                id: pet.id,
                name: pet.name,
                type: pet.category,
                description: pet.description,
                isAdopt: pet.is_sold,
                updatedAt: pet.updated_at.toISOString(),
              }}
              handleOpen={handleOpen}
            />
          ))}
        </div>
      </div>
    </>
  )
}
