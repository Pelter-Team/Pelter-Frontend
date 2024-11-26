import { Select } from "antd"
export enum GraphSelectRangeEnumValue {
  "dayly",
  "monthly",
  "annual",
}
export interface GraphSelectRangeOption {
  value: keyof typeof GraphSelectRangeEnumValue
  label: string
}
let defaultOptions: GraphSelectRangeOption[] = [
  { value: "dayly", label: "Daily" },
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Annual" },
]

interface GraphSelectRangeProps {
  value?: keyof typeof GraphSelectRangeEnumValue
  defaultValue?: keyof typeof GraphSelectRangeEnumValue
  handleChange: (value: keyof typeof GraphSelectRangeEnumValue) => void
}
export default function GraphSelectRange({
  value = "dayly",
  defaultValue,
  handleChange,
}: GraphSelectRangeProps) {
  return (
    <Select
      defaultValue={defaultValue}
      value={value}
      className="w-32 rounded-full"
      onChange={handleChange}
      options={defaultOptions}
    />
  )
}
