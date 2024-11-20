import CardTotal from "@/features/transaction/components/CardTotal"
import CPage from "./CPage"

export default function page({}: {}) {
  return (
    <>
      <h1 className="text-gray-950 text-4xl font-semibold">Transactions</h1>
      <div className="">
        <CardTotal />
      </div>
      <CPage />
    </>
  )
}
