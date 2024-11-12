"use client"
import { useState } from "react"
import GraphSelectRange, {
  GraphSelectRangeEnumValue,
} from "../GraphSelectRange"
import { VerticalBarChart } from "./basic/Barchart"

export default function WaitCard({}: {}) {
  const chartData = [
    { key: "Company A", value: 1000 },
    { key: "Company B", value: 2000 },
    { key: "Company C", value: 3000 },
  ]

  const [graphRange, setGraphRange] =
    useState<keyof typeof GraphSelectRangeEnumValue>("dayly")

  const handleGraphRangeChange = async (
    value: keyof typeof GraphSelectRangeEnumValue
  ) => {
    setGraphRange(value)
  }

  return (
    <div className="flex flex-col gap-8 bg-background rounded-xl shadow-md border p-4">
      <div className="flex justify-between">
        <h6 className="text-gray-800 text-lg font-medium">
          Total Number of Waiting Animal
        </h6>
        <GraphSelectRange
          value={graphRange}
          handleChange={handleGraphRangeChange}
        />
      </div>
      <VerticalBarChart ChartData={chartData} />
    </div>
  )
}
