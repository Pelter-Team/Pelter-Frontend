import CPetList from "./CPage"
import { Suspense } from "react"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function PetListPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CPetList />
    </Suspense>
  )
}
