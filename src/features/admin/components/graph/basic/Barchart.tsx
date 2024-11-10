"use client"
import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface ChartDataItem {
  key: string
  value: number
}

interface VerticalBarChartProps {
  ChartData: ChartDataItem[]
}

export function VerticalBarChart({ ChartData }: VerticalBarChartProps) {
  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        border: { dash: [4, 8] }, // for the grid lines
        grid: {
          offset: true,
          drawTicks: true, // true is default
          drawOnChartArea: true, // true is default
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (data: any) {
            // return "Custom Label Text:" + data.formattedValue
            return data.formattedValue
          },
        },
      },
      datalabels: {
        color: "white",
        font: {
          weight: "bold" as const,
          size: 14,
          family: "poppins",
        },
      },
    },
  }
  // The following colors will be used sequentially for the chart bars
  const backgroundColors = ["#C5705D61"]
  const data = {
    labels: ChartData.map((item) => item.key),
    datasets: [
      {
        label: "Progress Payment Price",
        data: ChartData.map((item) => item.value),
        backgroundColor: backgroundColors,
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  }

  return <Bar data={data} options={options} />
}
