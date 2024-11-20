import { Input, Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useCards } from "../provider/PetProvider";
import PetCard from "./PetCard";

export default function PetList() {
  const cards = useCards();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div>Cat</div>,
    },
    {
      key: "2",
      label: <div>Dog</div>,
    },
  ];

  const statuses: MenuProps["items"] = [
    {
      key: "1",
      label: <div>Adopted</div>,
    },
    {
      key: "2",
      label: <div>Looking for home</div>,
    },
  ];

  return (
    <>
      <div className="flex flex-col w-4/5 p-8 gap-4">
        <div className="w-full h-10 flex flex-row justify-between gap-6">
          <Input className="" placeholder="Input search text" />
          <Dropdown menu={{ items }} className="w-1/6 h-10 flex items-center" placement="bottomRight">
            <Button>
              Type <DownOutlined />
            </Button>
          </Dropdown>

          <Dropdown menu={{ items: statuses }} className="w-1/6 h-10 flex items-center" placement="bottomRight">
            <Button>
              Status <DownOutlined />
            </Button>
          </Dropdown>

          <Button className="w-1/6 h-10" type="primary">Post Pet</Button>
        </div>

        <hr className="border-t border-gray-300 w-full" />
        
        <div className="flex flex-col">
          {cards.map((card) => (
            <PetCard key={card.name} card={card} />
          ))}
        </div>
      </div>
    </>
  );
}
