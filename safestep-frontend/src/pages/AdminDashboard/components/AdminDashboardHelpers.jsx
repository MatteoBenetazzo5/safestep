export const scrollToElement = (ref) => {
  if (ref.current) {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

export const hasAccessibility = (structure) => {
  return (
    Array.isArray(structure?.accessibilita) &&
    structure.accessibilita.length > 0
  )
}
