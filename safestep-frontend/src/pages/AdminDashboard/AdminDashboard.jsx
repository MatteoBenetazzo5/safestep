import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getEmail,
  getIdUtente,
  getNomeVisualizzato,
  logout,
} from "../../utils/auth"
import { API_BASE_URL, getAuthHeaders } from "../../utils/api"
import "./styles/AdminDashboardLayout.css"
import AdminSidebar from "./components/AdminSidebar"
import AdminTopbar from "./components/AdminTopbar"
import AdminStats from "./components/AdminStats"
import AdminStructureForm from "./components/AdminStructureForm"
import AdminStructureCard from "./components/AdminStructureCard"
import AdminNotesCard from "./components/AdminNotesCard"

function AdminDashboard() {
  const navigate = useNavigate()

  const nomeVisualizzato = getNomeVisualizzato() || "Admin"
  const email = getEmail() || "admin@safestep.com"
  const idUtente = getIdUtente()

  const [structures, setStructures] = useState([])
  const [caratteristiche, setCaratteristiche] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [usersCount, setUsersCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategoria, setFilterCategoria] = useState("")
  const [filterAccessibilita, setFilterAccessibilita] = useState("")

  const [formData, setFormData] = useState({
    categoria: "TERME",
    nome: "",
    descrizione: "",
    indirizzo: "",
    citta: "",
    paese: "Italia",
    telefono: "",
    sitoWeb: "",
    immagineCopertina: "",
    latitudine: "",
    longitudine: "",
    stato: "APPROVATA",
  })

  const [accessibilitaForm, setAccessibilitaForm] = useState([
    { caratteristicaId: "", valore: "", nota: "" },
  ])

  const stats = [
    {
      id: 1,
      icon: "bi-people",
      number: usersCount,
      label: "Utenti",
      tone: "blue",
    },
    {
      id: 2,
      icon: "bi-buildings",
      number: structures.length,
      label: "Strutture",
      tone: "green",
    },
    {
      id: 3,
      icon: "bi-chat-left-text",
      number: 0,
      label: "Recensioni",
      tone: "purple",
    },
    {
      id: 4,
      icon: "bi-heart",
      number: 0,
      label: "Salvataggi",
      tone: "pink",
    },
  ]

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const resetForm = () => {
    setFormData({
      categoria: "TERME",
      nome: "",
      descrizione: "",
      indirizzo: "",
      citta: "",
      paese: "Italia",
      telefono: "",
      sitoWeb: "",
      immagineCopertina: "",
      latitudine: "",
      longitudine: "",
      stato: "APPROVATA",
    })
    setSelectedImages([])
    setEditingId(null)
    setAccessibilitaForm([{ caratteristicaId: "", valore: "", nota: "" }])
    setShowForm(false)
  }

  const fetchStructures = async () => {
    try {
      setLoading(true)

      const response = await fetch(
        `${API_BASE_URL}/strutture/categoria/TERME`,
        {
          headers: getAuthHeaders(),
        },
      )

      if (!response.ok) {
        throw new Error("Errore nel recupero delle strutture")
      }

      const data = await response.json()
      setStructures(data)
    } catch (error) {
      console.error("Errore caricamento strutture:", error)
      alert("Errore nel caricamento delle strutture")
    } finally {
      setLoading(false)
    }
  }

  const fetchCaratteristiche = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/caratteristiche`, {
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error("Errore nel recupero delle caratteristiche")
      }

      const data = await response.json()
      setCaratteristiche(data)
    } catch (error) {
      console.error("Errore caricamento caratteristiche:", error)
    }
  }

  const fetchUsersCount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/utenti/count`, {
        headers: getAuthHeaders(),
      })

      if (response.ok) {
        const data = await response.json()
        setUsersCount(data.count || 0)
      }
    } catch (error) {
      console.error("Errore caricamento numero utenti:", error)
    }
  }

  useEffect(() => {
    fetchStructures()
    fetchCaratteristiche()
    fetchUsersCount()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (files) => {
    if (Array.isArray(files)) {
      setSelectedImages(files)
    } else if (files && files[0]) {
      setSelectedImages([files[0]])
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
    setAccessibilitaForm((prev) => [
      ...prev,
      { caratteristicaId: "", valore: "", nota: "" },
    ])
  }

  const removeAccessibilitaRow = (index) => {
    setAccessibilitaForm((prev) => prev.filter((_, i) => i !== index))
  }

  const uploadImages = async () => {
    if (selectedImages.length === 0) {
      return formData.immagineCopertina ? [formData.immagineCopertina] : []
    }

    const uploadedUrls = []

    for (const image of selectedImages) {
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

  const handleCreateOrUpdateStructure = async (e) => {
    e.preventDefault()

    try {
      setSaving(true)

      const imageUrls = await uploadImages()
      const imagineCopertina = imageUrls.length > 0 ? imageUrls[0] : ""

      const body = {
        categoria: formData.categoria,
        nome: formData.nome,
        descrizione: formData.descrizione,
        indirizzo: formData.indirizzo,
        citta: formData.citta,
        paese: formData.paese,
        telefono: formData.telefono,
        sitoWeb: formData.sitoWeb,
        immagineCopertina: imagineCopertina || "",
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

      // Upload additional images as gallery if more than one
      if (imageUrls.length > 1) {
        for (let i = 1; i < imageUrls.length; i++) {
          try {
            await fetch(`${API_BASE_URL}/immagini-struttura`, {
              method: "POST",
              headers: getAuthHeaders(),
              body: JSON.stringify({
                strutturaId: strutturaIdFinale,
                url: imageUrls[i],
              }),
            })
          } catch (error) {
            console.error("Errore salvataggio immagine galleria:", error)
          }
        }
      }

      const accessibilitaValide = accessibilitaForm.filter(
        (item) => item.caratteristicaId && item.valore.trim(),
      )

      for (const item of accessibilitaValide) {
        const accessibilitaResponse = await fetch(
          `${API_BASE_URL}/accessibilita`,
          {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({
              strutturaId: strutturaIdFinale,
              caratteristicaId: item.caratteristicaId,
              valore: item.valore,
              nota: item.nota,
            }),
          },
        )

        if (!accessibilitaResponse.ok) {
          const errorText = await accessibilitaResponse.text()
          console.error("Errore salvataggio accessibilità:", errorText)
        }
      }

      alert(
        editingId
          ? "Struttura aggiornata con successo!"
          : "Struttura creata con successo!",
      )

      resetForm()
      fetchStructures()
    } catch (error) {
      console.error("Errore salvataggio struttura:", error)
      alert("Errore durante il salvataggio della struttura")
    } finally {
      setSaving(false)
    }
  }

  const handleEditStructure = (structure) => {
    setEditingId(structure.idStruttura)
    setShowForm(true)
    setSelectedImages([])

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

    setAccessibilitaForm([{ caratteristicaId: "", valore: "", nota: "" }])
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
      fetchStructures()
    } catch (error) {
      console.error("Errore eliminazione struttura:", error)
      alert("Errore durante l'eliminazione")
    }
  }

  return (
    <div className="admin-shell">
      <AdminSidebar handleLogout={handleLogout} />

      <main className="admin-page">
        <AdminTopbar nomeVisualizzato={nomeVisualizzato} email={email} />

        <AdminStats stats={stats} />

        <section className="admin-toolbar-card">
          <div className="admin-toolbar-search">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Cerca per nome o per categorie"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="admin-toolbar-select"
            value={filterCategoria}
            onChange={(e) => setFilterCategoria(e.target.value)}
          >
            <option value="">Categorie</option>
            <option value="TERME">Terme</option>
            <option value="HOTEL">Hotel</option>
            <option value="RISTORANTE">Ristorante</option>
            <option value="PARCO">Parco</option>
          </select>

          <select
            className="admin-toolbar-select"
            value={filterAccessibilita}
            onChange={(e) => setFilterAccessibilita(e.target.value)}
          >
            <option value="">Accessibilità</option>
            <option value="accessibile">Accessibile</option>
            <option value="non-accessibile">Non accessibile</option>
          </select>

          <select className="admin-toolbar-select">
            <option value="">Salvate</option>
          </select>

          <button className="admin-toolbar-primary">Filtra</button>
        </section>

        <section className="admin-main-grid">
          <div className="admin-left-column">
            <div className="admin-section-header">
              <h2>Gestione strutture termali</h2>

              <button
                className="admin-add-button"
                onClick={() => {
                  if (showForm && editingId) {
                    resetForm()
                  } else {
                    setShowForm(!showForm)
                  }
                }}
              >
                <i className="bi bi-plus-lg"></i>
                {showForm ? "Chiudi form" : "Aggiungi nuova struttura"}
              </button>
            </div>

            {showForm && (
              <AdminStructureForm
                editingId={editingId}
                formData={formData}
                handleChange={handleChange}
                handleImageChange={handleImageChange}
                handleRemoveImage={handleRemoveImage}
                caratteristiche={caratteristiche}
                accessibilitaForm={accessibilitaForm}
                handleAccessibilitaChange={handleAccessibilitaChange}
                addAccessibilitaRow={addAccessibilitaRow}
                removeAccessibilitaRow={removeAccessibilitaRow}
                handleCreateOrUpdateStructure={handleCreateOrUpdateStructure}
                saving={saving}
                resetForm={resetForm}
                selectedImages={selectedImages}
              />
            )}

            {loading ? (
              <p>Caricamento strutture...</p>
            ) : (
              <div className="admin-cards-grid">
                {structures.map((structure) => (
                  <AdminStructureCard
                    key={structure.idStruttura}
                    structure={structure}
                    onOpen={() =>
                      navigate(`/struttura/${structure.idStruttura}`)
                    }
                    onEdit={() => handleEditStructure(structure)}
                    onDelete={() =>
                      handleDeleteStructure(structure.idStruttura)
                    }
                  />
                ))}
              </div>
            )}
          </div>

          <div className="admin-right-column">
            <AdminNotesCard />
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminDashboard
