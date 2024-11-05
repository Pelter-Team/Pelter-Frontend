"use client"

import CardTotal, { CardTotalType } from "@/features/admin/components/CardTotal"
import AdoptCard from "@/features/admin/components/graph/AdoptCard"
import WaitCard from "@/features/admin/components/graph/WaitCard"

const cards: CardTotalType[] = [
  {
    title: "Total Number of Animals",
    value: "001",
    bgColor: "bg-[#EAF6FE]",
    textColor: "text-[#0452AD]",
  },
  {
    title: "Total Number of Dogs",
    value: "001",
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
export default function Cpage({}: {}) {
  // const data = cards.map((card) => ({
  //   name: card.title,
  //   value: card.value,
  // }))

  return (
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
      <div className="grid grid-cols-2 gap-8 w-full min-h-[300px]">
        <AdoptCard />
        <WaitCard />
      </div>
      {/* <Bar datasets={data} fill="#8884d8" radius={[10, 10, 0, 0]} /> */}
    </div>
  )
}
