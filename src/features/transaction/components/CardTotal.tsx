"use client"
export interface CardTotalType {
  title: string
  value: string
  bgColor: string
  textColor: string
}
export default function CardTotal({
  title,
  value,
  bgColor,
  textColor,
}: CardTotalType) {
  return (
    <div
      className={`flex flex-grow justify-center flex-col gap-2 rounded-md min-h-[6.5rem] px-4 py-2 ${bgColor}`}
    >
      <h6 className="text-gray-800 text-lg font-semibold">{title}</h6>
      <div className="flex justify-between items-end">
        <h6 className={`text-start  text-4xl font-semibold ${textColor}`}>
          {value}฿
        </h6>
        <h6 className="text-end text-base font-medium">per month</h6>
      </div>
    </div>
  )
}
