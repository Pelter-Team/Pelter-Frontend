export const formatNumber = (num: number): string => {
  const scales = [
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "K" },
  ]

  // Find the appropriate scale
  const scale = scales.find((scale) => num >= scale.value)

  if (scale) {
    // Format with the scale and keep 1 decimal place
    const formatted = (num / scale.value).toFixed(1)
    // Remove .0 if it's a whole number
    const cleanFormatted = formatted.endsWith(".0")
      ? formatted.slice(0, -2)
      : formatted
    return cleanFormatted + scale.symbol
  }

  // If number is smaller than 1000, return as is
  return num.toFixed(0)
}
