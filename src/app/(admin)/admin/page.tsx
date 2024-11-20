import { GraphRangeProvider } from "@/features/admin/provider/graphProvider"
import Cpage from "./CPage"

export default function page({}: {}) {
  return (
    <GraphRangeProvider>
      <Cpage />
    </GraphRangeProvider>
  )
}
