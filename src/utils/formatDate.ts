export const formatDateAdminPage = (rDate: Date = new Date()): string => {
  const date = rDate
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  return formattedDate
}
