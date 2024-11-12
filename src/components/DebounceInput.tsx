import { forwardRef } from "react"
import {
  DebounceInputProps,
  DebounceInput as ReactDebounceInput,
} from "react-debounce-input"

interface CustomDebounceInputProps
  extends Omit<
    DebounceInputProps<
      HTMLInputElement,
      React.InputHTMLAttributes<HTMLInputElement>
    >,
    "onChange" | "size"
  > {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export const DebounceInput = forwardRef<
  HTMLInputElement,
  CustomDebounceInputProps
>(({ onChange, className, ...props }) => {
  return (
    <ReactDebounceInput
      minLength={2}
      className={className}
      onChange={onChange}
      {...props}
    />
  )
})

DebounceInput.displayName = "DebounceInput"
