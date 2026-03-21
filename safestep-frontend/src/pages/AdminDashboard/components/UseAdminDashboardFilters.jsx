import { useMemo, useState } from "react"
import { hasAccessibility } from "./adminDashboardHelpers"

function UseAdminDashboardFilters(structures) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategoria, setFilterCategoria] = useState("")
  const [filterAccessibilita, setFilterAccessibilita] = useState("")
  const [filterStato, setFilterStato] = useState("")

  const filteredStructures = useMemo(() => {
    let list = [...structures]

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase()

      list = list.filter((structure) => {
        const nome = structure.nome?.toLowerCase() || ""
        const citta = structure.citta?.toLowerCase() || ""
        const categoria = structure.categoria?.toLowerCase() || ""
        const descrizione = structure.descrizione?.toLowerCase() || ""

        return (
          nome.includes(query) ||
          citta.includes(query) ||
          categoria.includes(query) ||
          descrizione.includes(query)
        )
      })
    }

    if (filterCategoria) {
      list = list.filter((structure) => structure.categoria === filterCategoria)
    }

    if (filterStato) {
      list = list.filter((structure) => structure.stato === filterStato)
    }

    if (filterAccessibilita === "accessibile") {
      list = list.filter((structure) => hasAccessibility(structure))
    }

    if (filterAccessibilita === "non-accessibile") {
      list = list.filter((structure) => !hasAccessibility(structure))
    }

    return list
  }, [
    structures,
    searchTerm,
    filterCategoria,
    filterAccessibilita,
    filterStato,
  ])

  const handleResetFilters = () => {
    setSearchTerm("")
    setFilterCategoria("")
    setFilterAccessibilita("")
    setFilterStato("")
  }

  return {
    searchTerm,
    setSearchTerm,
    filterCategoria,
    setFilterCategoria,
    filterAccessibilita,
    setFilterAccessibilita,
    filterStato,
    setFilterStato,
    filteredStructures,
    handleResetFilters,
  }
}

export default UseAdminDashboardFilters
