import { Input, Button, Dropdown } from "antd"
import type { MenuProps } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { useState } from "react"
import PetCard from "./PetCard"

export default function PetList() {
  interface Card {
    name: string
    type: string
    description: string
    isAdopt: boolean
    updatedAt: string
  }

  const [searchText, setSearchText] = useState<string>("")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

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

  const cards: Card[] = [
    {
      name: "N'Chacha",
      type: "Cat",
      description:
        "A dumb cat who likes luxury food every meal. Sleeps all day, does nothing but snore.",
      isAdopt: true,
      updatedAt: "Diao Kon",
    },
    {
      name: "N'Wut",
      type: "Cat",
      description:
        "A dumb cat who likes luxury food every meal. Sleeps all day, does nothing but snore.",
      isAdopt: false,
      updatedAt: "Diao Kon",
    },
    {
      name: "N'Tee",
      type: "Dog",
      description:
        "A dumb cat who likes luxury food every meal. Sleeps all day, does nothing but snore.",
      isAdopt: false,
      updatedAt: "Diao Kon",
    },
    {
      name: "N'Test",
      type: "Cat",
      description:
        "A dumb cat who likes luxury food every meal. Sleeps all day, does nothing but snore.",
      isAdopt: true,
      updatedAt: "Diao Kon",
    },
    {
      name: "N'Wit",
      type: "Cat",
      description:
        "A dumb cat who likes luxury food every meal. Sleeps all day, does nothing but snore.",
      isAdopt: false,
      updatedAt: "Diao Kon",
    },
    {
      name: "N'Rak",
      type: "Dog",
      description:
        "A dumb cat who likes luxury food every meal. Sleeps all day, does nothing but snore.",
      isAdopt: false,
      updatedAt: "Diao Kon",
    },
  ]

  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      card.name.toLowerCase().includes(searchText.toLowerCase()) ||
      card.description.toLowerCase().includes(searchText.toLowerCase())

    const matchesType = selectedType ? card.type == selectedType : true

    const matchesStatus =
      selectedStatus === "Adopted"
        ? card.isAdopt
        : selectedStatus === "Looking for home"
          ? !card.isAdopt
          : true

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <>
      <div className="flex flex-col w-4/5 p-8 gap-4 h-full">
        <div className="w-full h-10 flex flex-row justify-between gap-6">
          <Input
            className=""
            placeholder="Input search text"
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
            className="w-1/6 h-10 flex items-center "
            placement="bottomRight"
          >
            <Button>
              Status <DownOutlined />
            </Button>
          </Dropdown>

          <Button className="w-1/6 h-10" type="primary">
            Post Pet
          </Button>
        </div>

        <hr className="border-t border-gray-300 w-full" />

        <div className="flex flex-col overflow-y-scroll h-[calc(100%-8rem)]">
          {filteredCards.map((card) => (
            <PetCard key={card.name} card={card} />
          ))}
        </div>
      </div>
    </>
  )
}
