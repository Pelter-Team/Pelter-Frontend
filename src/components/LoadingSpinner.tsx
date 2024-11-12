import { Spin } from "antd"

export default function LoadingSpinner({ className }: { className?: string }) {
  return <Spin className={className} />
}
