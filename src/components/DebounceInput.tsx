import { DebounceInput as ReactDebounceInput } from "react-debounce-input"

export const DebounceInput = ({
  onChange,
  className,
  debounceTimeout,
  value,
  placeholder,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  debounceTimeout: number
  value: any
  placeholder?: string
}) => {
  return (
    <ReactDebounceInput
      value={value}
      minLength={2}
      className={className}
      onChange={onChange}
      debounceTimeout={debounceTimeout}
      placeholder={placeholder}
    />
  )
}

DebounceInput.displayName = "DebounceInput"
