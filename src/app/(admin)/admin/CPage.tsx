"use client"

import LoadingSpinner from "@/components/LoadingSpinner"
import CardTotal, { CardTotalType } from "@/features/admin/components/CardTotal"
import AdoptCard from "@/features/admin/components/graph/AdoptCard"
import CommissionStaticCard from "@/features/admin/components/graph/CommissionStaticCard"
import TotalUserCard from "@/features/admin/components/graph/TotalUserCard"
import WaitCard from "@/features/admin/components/graph/WaitCard"
import { useGraphRange } from "@/features/admin/provider/graphProvider"
import { formatNumber } from "@/utils/formatNumber"

export default function Cpage({}: {}) {
  const { graph, isGraphLoading } = useGraphRange()

  const cards: CardTotalType[] = [
    {
      title: "Total Number of Animals",
      value: formatNumber(graph?.["adopt-animal"]?.length || 0),
      bgColor: "bg-[#E9C9C1]",
      textColor: "text-[#873800]",
    },
    {
      title: "Total Number of Dogs",
      value: formatNumber(graph?.["animal-looking-for-home"]?.length || 0),
      bgColor: "bg-[#E9C9C1]",
      textColor: "text-[#873800]",
    },
    {
      title: "Total Number of Cats",
      value: formatNumber(graph?.["animal-looking-for-home"]?.length || 0),
      bgColor: "bg-[#E9C9C1]",
      textColor: "text-[#873800]",
    },
  ]

  return (
    <div className="flex gap-8 w-full flex-wrap">
      {!isGraphLoading ? (
        <>
          {cards.map((card, i) => (
            <CardTotal
              bgColor={card.bgColor}
              textColor={card.textColor}
              title={card.title}
              value={card.value}
              key={i}
            />
          ))}
        </>
      ) : (
        <LoadingSpinner className="mx-auto flex justify-center items-center self-center" />
      )}
      <div className="grid grid-cols-2 gap-8 w-full min-h-[300px]">
        <AdoptCard />
        <WaitCard />
        <CommissionStaticCard />
        <TotalUserCard />
      </div>
      {/* <Bar datasets={data} fill="#8884d8" radius={[10, 10, 0, 0]} /> */}
    </div>
  )
}
