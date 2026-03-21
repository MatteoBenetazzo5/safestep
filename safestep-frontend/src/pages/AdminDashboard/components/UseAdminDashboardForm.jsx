import { useState } from "react"
import { API_BASE_URL, getAuthHeaders } from "../../../utils/api"
import {
  getInitialAccessibilitaRow,
  getInitialFormData,
} from "./adminDashboardInitialState"
import { scrollToElement } from "./adminDashboardHelpers"

function UseAdminDashboardForm({
  idUtente,
  refreshDashboardData,
  setActiveSection,
  formSectionRef,
}) {
  const [showForm, setShowForm] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState(getInitialFormData())

  const [accessibilitaForm, setAccessibilitaForm] = useState([
    getInitialAccessibilitaRow(),
  ])
  const [removedAccessibilitaIds, setRemovedAccessibilitaIds] = useState([])

  const resetForm = () => {
    setFormData(getInitialFormData())
    setSelectedImages([])
    setEditingId(null)
    setRemovedAccessibilitaIds([])
    setAccessibilitaForm([getInitialAccessibilitaRow()])
    setShowForm(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (files) => {
    if (Array.isArray(files)) {
      setSelectedImages((prev) => [...prev, ...files])
    } else if (files && files[0]) {
      setSelectedImages((prev) => [...prev, files[0]])
    }
  }

  const handleRemoveImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAccessibilitaChange = (index, field, value) => {
    setAccessibilitaForm((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    )
  }

  const addAccessibilitaRow = () => {
    setAccessibilitaForm((prev) => [...prev, getInitialAccessibilitaRow()])
  }

  const removeAccessibilitaRow = (index) => {
    setAccessibilitaForm((prev) => {
      const currentItem = prev[index]

      if (currentItem?.idAccessibilita) {
        setRemovedAccessibilitaIds((old) => [
          ...old,
          currentItem.idAccessibilita,
        ])
      }

      const updated = prev.filter((_, i) => i !== index)

      return updated.length > 0 ? updated : [getInitialAccessibilitaRow()]
    })
  }

  const uploadImages = async () => {
    if (selectedImages.length === 0) {
      return formData.immagineCopertina ? [formData.immagineCopertina] : []
    }

    const uploadedUrls = []

    for (const image of selectedImages) {
      if (typeof image === "string") {
        uploadedUrls.push(image)
        continue
      }

      try {
        const data = new FormData()
        data.append("file", image)

        const response = await fetch(`${API_BASE_URL}/upload/image`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: data,
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error("Errore upload immagine:", errorText)
          throw new Error("Upload immagine non riuscito")
        }

        const result = await response.json()
        uploadedUrls.push(result.url)
      } catch (error) {
        console.error("Errore caricamento immagine:", error)
      }
    }

    return uploadedUrls.length > 0
      ? uploadedUrls
      : formData.immagineCopertina
        ? [formData.immagineCopertina]
        : []
  }

  const syncAccessibilita = async (strutturaIdFinale) => {
    for (const accessibilitaId of removedAccessibilitaIds) {
      try {
        await fetch(`${API_BASE_URL}/accessibilita/${accessibilitaId}`, {
          method: "DELETE",
          headers: getAuthHeaders(),
        })
      } catch (error) {
        console.error("Errore eliminazione accessibilità:", error)
      }
    }

    const accessibilitaValide = accessibilitaForm.filter(
      (item) => item.caratteristicaId && item.valore.trim(),
    )

    for (const item of accessibilitaValide) {
      try {
        if (item.idAccessibilita) {
          const updateResponse = await fetch(
            `${API_BASE_URL}/accessibilita/${item.idAccessibilita}`,
            {
              method: "PUT",
              headers: getAuthHeaders(),
              body: JSON.stringify({
                valore: item.valore,
                nota: item.nota,
              }),
            },
          )

          if (!updateResponse.ok) {
            const errorText = await updateResponse.text()
            console.error("Errore aggiornamento accessibilità:", errorText)
          }
        } else {
          const createResponse = await fetch(`${API_BASE_URL}/accessibilita`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({
              strutturaId: strutturaIdFinale,
              caratteristicaId: item.caratteristicaId,
              valore: item.valore,
              nota: item.nota,
            }),
          })

          if (!createResponse.ok) {
            const errorText = await createResponse.text()
            console.error("Errore salvataggio accessibilità:", errorText)
          }
        }
      } catch (error) {
        console.error("Errore sync accessibilità:", error)
      }
    }
  }

  const handleCreateOrUpdateStructure = async (e) => {
    e.preventDefault()

    try {
      setSaving(true)

      const imageUrls = await uploadImages()
      const immagineCopertina = imageUrls.length > 0 ? imageUrls[0] : ""

      const body = {
        categoria: formData.categoria,
        nome: formData.nome,
        descrizione: formData.descrizione,
        indirizzo: formData.indirizzo,
        citta: formData.citta,
        paese: formData.paese,
        telefono: formData.telefono,
        sitoWeb: formData.sitoWeb,
        immagineCopertina: immagineCopertina || "",
        latitudine: formData.latitudine ? Number(formData.latitudine) : null,
        longitudine: formData.longitudine ? Number(formData.longitudine) : null,
        stato: formData.stato,
      }

      let response

      if (editingId) {
        response = await fetch(`${API_BASE_URL}/strutture/${editingId}`, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify(body),
        })
      } else {
        response = await fetch(`${API_BASE_URL}/strutture`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            ...body,
            creataDaId: idUtente,
          }),
        })
      }

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Errore salvataggio struttura:", errorText)
        alert("Salvataggio struttura non riuscito")
        return
      }

      const savedStructure = await response.json()
      const strutturaIdFinale = editingId || savedStructure.idStruttura

      if (imageUrls.length > 1) {
        for (let i = 1; i < imageUrls.length; i++) {
          try {
            await fetch(`${API_BASE_URL}/immagini-struttura`, {
              method: "POST",
              headers: getAuthHeaders(),
              body: JSON.stringify({
                strutturaId: strutturaIdFinale,
                url: imageUrls[i],
                ordineVisualizzazione: i,
                copertina: false,
              }),
            })
          } catch (error) {
            console.error("Errore salvataggio immagine galleria:", error)
          }
        }
      }

      await syncAccessibilita(strutturaIdFinale)

      alert(
        editingId
          ? "Struttura aggiornata con successo!"
          : "Struttura creata con successo!",
      )

      resetForm()
      await refreshDashboardData()
    } catch (error) {
      console.error("Errore salvataggio struttura:", error)
      alert("Errore durante il salvataggio della struttura")
    } finally {
      setSaving(false)
    }
  }

  const handleEditStructure = async (structure) => {
    setEditingId(structure.idStruttura)
    setShowForm(true)
    setSelectedImages([])
    setRemovedAccessibilitaIds([])
    setActiveSection("structures")

    setFormData({
      categoria: structure.categoria || "TERME",
      nome: structure.nome || "",
      descrizione: structure.descrizione || "",
      indirizzo: structure.indirizzo || "",
      citta: structure.citta || "",
      paese: structure.paese || "Italia",
      telefono: structure.telefono || "",
      sitoWeb: structure.sitoWeb || "",
      immagineCopertina: structure.immagineCopertina || "",
      latitudine: structure.latitudine || "",
      longitudine: structure.longitudine || "",
      stato: structure.stato || "APPROVATA",
    })

    try {
      const response = await fetch(
        `${API_BASE_URL}/accessibilita/struttura/${structure.idStruttura}`,
        {
          headers: getAuthHeaders(),
        },
      )

      let accessibilitaData = []

      if (response.ok) {
        accessibilitaData = await response.json()
      } else if (Array.isArray(structure.accessibilita)) {
        accessibilitaData = structure.accessibilita
      }

      if (Array.isArray(accessibilitaData) && accessibilitaData.length > 0) {
        setAccessibilitaForm(
          accessibilitaData.map((item) => ({
            idAccessibilita: item.idAccessibilita || "",
            caratteristicaId:
              item.caratteristica?.idCaratteristiche ||
              item.caratteristicaId ||
              "",
            valore: item.valore || "",
            nota: item.nota || "",
          })),
        )
      } else {
        setAccessibilitaForm([getInitialAccessibilitaRow()])
      }
    } catch (error) {
      console.error("Errore caricamento accessibilità per modifica:", error)
      setAccessibilitaForm([getInitialAccessibilitaRow()])
    }

    scrollToElement(formSectionRef)
  }

  const handleDeleteStructure = async (idStruttura) => {
    const conferma = window.confirm(
      "Sei sicuro di voler eliminare questa struttura?",
    )

    if (!conferma) {
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/strutture/${idStruttura}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Errore eliminazione struttura:", errorText)
        alert("Eliminazione non riuscita")
        return
      }

      alert("Struttura eliminata con successo!")
      await refreshDashboardData()
    } catch (error) {
      console.error("Errore eliminazione struttura:", error)
      alert("Errore durante l'eliminazione")
    }
  }

  const handleOpenCreateForm = () => {
    resetForm()
    setShowForm(true)
    setActiveSection("structures")
    scrollToElement(formSectionRef)
  }

  return {
    showForm,
    setShowForm,
    selectedImages,
    editingId,
    saving,
    formData,
    accessibilitaForm,
    resetForm,
    handleChange,
    handleImageChange,
    handleRemoveImage,
    handleAccessibilitaChange,
    addAccessibilitaRow,
    removeAccessibilitaRow,
    handleCreateOrUpdateStructure,
    handleEditStructure,
    handleDeleteStructure,
    handleOpenCreateForm,
  }
}

export default UseAdminDashboardForm
