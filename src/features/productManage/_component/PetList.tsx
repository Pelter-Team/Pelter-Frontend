import { Input, Button, Dropdown, Spin } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useGetPets } from "@/features/pet/hooks/ีuseMyPet";
import PetCard from "./PetCard";

export default function PetList() {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const { data: pets, isLoading, error } = useGetPets();

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
  ];

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
  ];

  const filteredPets = pets?.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchText.toLowerCase()) ||
      pet.description.toLowerCase().includes(searchText.toLowerCase());

    const matchesType = selectedType ? pet.category === selectedType : true;

    const matchesStatus =
      selectedStatus === "Adopted"
        ? pet.is_sold
        : selectedStatus === "Looking for home"
        ? !pet.is_sold
        : true;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <>
      <div className="flex flex-col w-4/5 p-8 gap-4 h-full">
        <div className="w-full h-10 flex flex-row justify-between gap-6">
          <Input
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
            className="w-1/6 h-10 flex items-center"
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
          {isLoading && <Spin size="large" />}
          {error && (
            <div className="text-red-500">{error.message}</div>
          )}
          {filteredPets?.map((pet) => (
            <PetCard
              key={pet.id}
              card={{
                name: pet.name,
                type: pet.category,
                description: pet.description,
                isAdopt: pet.is_sold,
                updatedAt: pet.updated_at.toISOString(),
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
