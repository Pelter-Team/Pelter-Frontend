import CardTotal, { CardTotalType } from "@/features/admin/components/CardTotal"
import CPage from "./CPage"

const cards: CardTotalType[] = [
  {
    title: "Total Number of User",
    value: "001",
    bgColor: "bg-[#E9C9C1]",
    textColor: "text-[#873800]",
  },
  {
    title: "Total Number of Individuals",
    value: "200",
    bgColor: "bg-[#E9C9C1]",
    textColor: "text-[#873800]",
  },
  {
    title: "Total Number of Foundation",
    value: "001",
    bgColor: "bg-[#E9C9C1]",
    textColor: "text-[#873800]",
  },
]

export default function page({}: {}) {
  return (
    <>
      <h1 className="text-gray-950 text-4xl font-semibold">
        Customer Information
      </h1>
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
