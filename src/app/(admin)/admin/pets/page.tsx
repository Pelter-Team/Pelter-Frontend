import CardTotal, { CardTotalType } from "@/features/admin/components/CardTotal"
import CPage from "./CPage"

const cards: CardTotalType[] = [
  {
    title: "Total Number of Animals",
    value: "001",
    bgColor: "bg-[#EAF6FE]",
    textColor: "text-[#0452AD]",
  },
  {
    title: "Total Number of Dogs",
    value: "200",
    bgColor: "bg-[#F6F4FE]",
    textColor: "text-[#4D3BB8]",
  },
  {
    title: "Total Number of Cats",
    value: "001",
    bgColor: "bg-[#FFECE7]",
    textColor: "text-[#FF5016]",
  },
]
export default function page({}: {}) {
  return (
    <>
      <h1 className="text-gray-950 text-4xl font-semibold">Pet status</h1>
      <div className="flex gap-8 w-full flex-wrap">
        {cards.map((card, i) => (
          <CardTotal
            bgColor={card.bgColor}
            textColor={card.textColor}
            title={card.title}
            value={card.value}
            key={i}
          />
        ))}
      </div>
      <CPage />
    </>
  )
}
