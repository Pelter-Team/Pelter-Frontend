"use client"
import GraphSelectRange from "../GraphSelectRange"
import { VerticalBarChart } from "./basic/Barchart"
import { useGraphRange } from "../../provider/graphProvider"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function AdoptCard({}: {}) {
  const { graphRange, handleGraphRangeChange, graph, isGraphLoading } =
    useGraphRange()
  if (isGraphLoading) {
    return (
      <LoadingSpinner className="flex justify-center items-center self-center" />
    )
  }

  return (
    <div className="flex flex-col gap-8 bg-background rounded-xl shadow-md border p-4">
      <div className="flex items-center justify-between">
        <h6 className="text-gray-800 text-base font-semibold">
          Total Number of Adopted Animal
        </h6>
        <GraphSelectRange
          value={graphRange}
          handleChange={handleGraphRangeChange}
        />
      </div>
      {graph && graph["adopt-animal"] && (
        <VerticalBarChart ChartData={graph["adopt-animal"]} />
      )}
    </div>
  )
}
