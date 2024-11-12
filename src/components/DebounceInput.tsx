import { DebounceInput as ReactDebounceInput } from "react-debounce-input"

export const DebounceInput = ({
  onChange,
  className,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}) => {
  return (
    <ReactDebounceInput
      minLength={2}
      className={className}
      onChange={onChange}
    />
  )
}

DebounceInput.displayName = "DebounceInput"
