import { GraphSelectRangeEnumValue } from "@/features/admin/components/GraphSelectRange"

export const formatDateAdminPage = (rDate: Date = new Date()): string => {
  const date = rDate
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  return formattedDate
}

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate()
}

export const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export const getDateRanges = (
  range: keyof typeof GraphSelectRangeEnumValue
) => {
  const now = new Date()
  const ranges: { start: Date; end: Date; label: string }[] = []

  switch (range) {
    case "dayly":
      for (let i = 29; i >= 0; i--) {
        const date = new Date()
        date.setDate(now.getDate() - i)
        date.setHours(0, 0, 0, 0)

        const nextDate = new Date(date)
        nextDate.setDate(date.getDate() + 1)

        ranges.push({
          start: date,
          end: nextDate,
          label: `${date.getDate()}/${date.getMonth() + 1}`,
        })
      }
      break

    case "monthly":
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const nextDate = new Date(date.getFullYear(), date.getMonth() + 1, 1)

        ranges.push({
          start: date,
          end: nextDate,
          label: date.toLocaleString("default", { month: "short" }),
        })
      }
      break

    case "annual":
      for (let i = 4; i >= 0; i--) {
        const date = new Date(now.getFullYear() - i, 0, 1)
        const nextDate = new Date(date.getFullYear() + 1, 0, 1)

        ranges.push({
          start: date,
          end: nextDate,
          label: date.getFullYear().toString(),
        })
      }
      break
  }

  return ranges
}
