import { Card } from "../provider/PetProvider"
import { Button } from "antd"
import { EditOutlined } from "@ant-design/icons"

export default function PetCard({ card }: { card: Card }) {
  return (
    <>
      <div className="flex flex-col w-full mt-6 gap-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-4 text-browntext items-center">
            <div className="font-bold text-3xl">{card.name}</div>
            <div className="min-w-14 h-7 rounded-l-full rounded-r-full bg-transparent border border-browntext flex justify-center items-center">
              {card.type}
            </div>
          </div>

          <Button className="bg-primary text-white h-10">
            Update Status <EditOutlined />
          </Button>
        </div>

        <div className="text-sm text-gray-400 w-3/4">{card.description}</div>

        <div className="flex flex-row gap-4 items-center text-xs text-gray-400">
          <div className="flex flex-row gap-2">
            <span
              className={`font-bold ${card.isAdopt ? "text-green-300" : "text-yellow-300"}`}
            >
              ●
            </span>
            {card.isAdopt ? "Adopted" : "Looking for home"}
          </div>
          Updated on {card.updatedAt}
        </div>

        <hr className="mt-2 border-t-2 border-gray-300 w-full" />
      </div>
    </>
  )
}