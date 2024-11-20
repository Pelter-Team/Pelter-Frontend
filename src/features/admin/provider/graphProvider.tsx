"use client"
import React, { createContext, useContext, useState, ReactNode } from "react"
import { GraphSelectRangeEnumValue } from "../components/GraphSelectRange"
import { AdminGraph, useDashboardGraph } from "../hooks/useDashboardGraph"

type GraphRangeType = keyof typeof GraphSelectRangeEnumValue

interface GraphRangeContextType {
  graphRange: GraphRangeType
  handleGraphRangeChange: (value: GraphRangeType) => Promise<void>
  graph: AdminGraph | undefined
  isGraphLoading: boolean
}

const GraphRangeContext = createContext<GraphRangeContextType | undefined>(
  undefined
)

export const GraphRangeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [graphRange, setGraphRange] = useState<GraphRangeType>("dayly")
  const { data: graph, isLoading: isGraphLoading } = useDashboardGraph({
    graphRange: graphRange,
  })

  const handleGraphRangeChange = async (value: GraphRangeType) => {
    try {
      setGraphRange(value)
    } catch (error) {
      console.error("Error updating graph range:", error)
    }
  }

  return (
    <GraphRangeContext.Provider
      value={{ graphRange, handleGraphRangeChange, graph, isGraphLoading }}
    >
      {children}
    </GraphRangeContext.Provider>
  )
}

export const useGraphRange = () => {
  const context = useContext(GraphRangeContext)
  if (!context) {
    throw new Error("useGraphRange must be used within a GraphRangeProvider")
  }
  return context
}
