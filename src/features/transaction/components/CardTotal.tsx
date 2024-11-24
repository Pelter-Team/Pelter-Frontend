"use client"

import LoadingSpinner from "@/components/LoadingSpinner"
import {
  useTotalBenefitAndIncome,
  useTransactions,
} from "../hooks/useTransactions"
import { formatNumber } from "@/utils/formatNumber"
import {
  TransactionStatus,
  TransactionWithProduct,
} from "@/core/api/transaction/transactionContract"
import { useMemo } from "react"

export default function CardTotal({}) {
  const { data: transactions, isLoading: isTransactionLoading } =
    useTransactions(TransactionStatus.AllTransactions)

  const totalData = useMemo(() => {
    return useTotalBenefitAndIncome(transactions as TransactionWithProduct[])
  }, [transactions])

  return (
    <div className="flex gap-8 w-full flex-wrap">
      {isTransactionLoading || !totalData ? (
        <div className="flex justify-center items-center w-full">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex gap-8 w-full flex-wrap">
          <div
            className={`flex flex-grow justify-center flex-col gap-2 rounded-md min-h-[6.5rem] px-4 py-2 bg-[#EAF6FE]`}
          >
            <h6 className="text-gray-800 text-lg font-semibold">
              Total Benefit
            </h6>
            <div className="flex justify-between items-end">
              <h6
                className={`text-start  text-4xl font-semibold text-[#0452AD]`}
              >
                {formatNumber(totalData.totalBenefit)}฿
              </h6>
            </div>
          </div>

          <div
            className={`flex flex-grow justify-center flex-col gap-2 rounded-md min-h-[6.5rem] px-4 py-2 bg-[#F6F4FE]`}
          >
            <h6 className="text-gray-800 text-lg font-semibold">
              Total Income
            </h6>
            <div className="flex justify-between items-end">
              <h6
                className={`text-start  text-4xl font-semibold text-[#4D3BB8]`}
              >
                {formatNumber(totalData.totalIncome)}฿
              </h6>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
