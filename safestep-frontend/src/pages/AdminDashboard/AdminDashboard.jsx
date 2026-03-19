import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getAvatar,
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
  const avatar = getAvatar() || ""
  const idUtente = getIdUtente()

  const [structures, setStructures] = useState([])
  const [caratteristiche, setCaratteristiche] = useState([])
  const [latestReviews, setLatestReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [usersCount, setUsersCount] = useState(0)
  const [savedCount, setSavedCount] = useState(0)
  const [totalReviewsCount, setTotalReviewsCount] = useState(0)

  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategoria, setFilterCategoria] = useState("")
  const [filterAccessibilita, setFilterAccessibilita] = useState("")
  const [filterStato, setFilterStato] = useState("")
  const [activeSection, setActiveSection] = useState("dashboard")

  const formSectionRef = useRef(null)
  const listSectionRef = useRef(null)

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
    { idAccessibilita: "", caratteristicaId: "", valore: "", nota: "" },
  ])
  const [removedAccessibilitaIds, setRemovedAccessibilitaIds] = useState([])

  const initial = nomeVisualizzato.charAt(0).toUpperCase()

  const scrollToElement = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const hasAccessibility = (structure) => {
    return (
      Array.isArray(structure?.accessibilita) &&
      structure.accessibilita.length > 0
    )
  }

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
    setRemovedAccessibilitaIds([])
    setAccessibilitaForm([
      { idAccessibilita: "", caratteristicaId: "", valore: "", nota: "" },
    ])
    setShowForm(false)
  }

  const fetchStructures = async () => {
    try {
      setLoading(true)

      let response = await fetch(`${API_BASE_URL}/strutture`, {
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        response = await fetch(`${API_BASE_URL}/strutture/categoria/TERME`, {
          headers: getAuthHeaders(),
        })
      }

      if (!response.ok) {
        throw new Error("Errore nel recupero delle strutture")
      }

      const data = await response.json()
      setStructures(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Errore caricamento strutture:", error)
      alert("Errore nel caricamento delle strutture")
      setStructures([])
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
      setCaratteristiche(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Errore caricamento caratteristiche:", error)
      setCaratteristiche([])
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
      } else {
        setUsersCount(0)
      }
    } catch (error) {
      console.error("Errore caricamento numero utenti:", error)
      setUsersCount(0)
    }
  }

  const fetchSavedCount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/strutture-salvate`, {
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error("Errore nel recupero delle strutture salvate")
      }

      const data = await response.json()
      setSavedCount(Array.isArray(data) ? data.length : 0)
    } catch (error) {
      console.error("Errore caricamento salvataggi:", error)
      setSavedCount(0)
    }
  }

  const fetchReviewsData = async () => {
    try {
      let structuresResponse = await fetch(`${API_BASE_URL}/strutture`, {
        headers: getAuthHeaders(),
      })

      if (!structuresResponse.ok) {
        structuresResponse = await fetch(
          `${API_BASE_URL}/strutture/categoria/TERME`,
          {
            headers: getAuthHeaders(),
          },
        )
      }

      if (!structuresResponse.ok) {
        throw new Error("Errore nel recupero strutture per recensioni")
      }

      const structuresData = await structuresResponse.json()
      const safeStructures = Array.isArray(structuresData) ? structuresData : []

      const reviewResponses = await Promise.all(
        safeStructures.map(async (structure) => {
          try {
            const response = await fetch(
              `${API_BASE_URL}/recensioni/struttura/${structure.idStruttura}`,
              {
                headers: getAuthHeaders(),
              },
            )

            if (!response.ok) {
              return []
            }

            const reviews = await response.json()

            return Array.isArray(reviews)
              ? reviews.map((review) => ({
                  ...review,
                  strutturaNome: structure.nome,
                  strutturaId: structure.idStruttura,
                }))
              : []
          } catch (error) {
            console.error(
              "Errore caricamento recensioni struttura:",
              structure.idStruttura,
              error,
            )
            return []
          }
        }),
      )

      const allReviews = reviewResponses.flat()

      allReviews.sort((a, b) => {
        const dateA = new Date(a.dataAggiornamento || a.dataCreazione || 0)
        const dateB = new Date(b.dataAggiornamento || b.dataCreazione || 0)
        return dateB - dateA
      })

      setTotalReviewsCount(allReviews.length)
      setLatestReviews(allReviews.slice(0, 5))
    } catch (error) {
      console.error("Errore caricamento recensioni admin:", error)
      setTotalReviewsCount(0)
      setLatestReviews([])
    }
  }

  const refreshDashboardData = async () => {
    await Promise.all([
      fetchStructures(),
      fetchCaratteristiche(),
      fetchUsersCount(),
      fetchSavedCount(),
      fetchReviewsData(),
    ])
  }

  useEffect(() => {
    refreshDashboardData()
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
    setAccessibilitaForm((prev) => [
      ...prev,
      { idAccessibilita: "", caratteristicaId: "", valore: "", nota: "" },
    ])
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

      return updated.length > 0
        ? updated
        : [{ idAccessibilita: "", caratteristicaId: "", valore: "", nota: "" }]
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
        setAccessibilitaForm([
          { idAccessibilita: "", caratteristicaId: "", valore: "", nota: "" },
        ])
      }
    } catch (error) {
      console.error("Errore caricamento accessibilità per modifica:", error)
      setAccessibilitaForm([
        { idAccessibilita: "", caratteristicaId: "", valore: "", nota: "" },
      ])
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

  const handleApplyFilters = () => {
    setActiveSection("structures")
    scrollToElement(listSectionRef)
  }

  const handleResetFilters = () => {
    setSearchTerm("")
    setFilterCategoria("")
    setFilterAccessibilita("")
    setFilterStato("")
  }

  const handleOpenCreateForm = () => {
    resetForm()
    setShowForm(true)
    setActiveSection("structures")
    scrollToElement(formSectionRef)
  }

  const handleShowOnlyWithAccessibility = () => {
    setFilterAccessibilita("accessibile")
    setActiveSection("structures")
    scrollToElement(listSectionRef)
  }

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
      number: totalReviewsCount,
      label: "Recensioni",
      tone: "purple",
    },
    {
      id: 4,
      icon: "bi-heart",
      number: savedCount,
      label: "Salvataggi",
      tone: "pink",
    },
  ]

  return (
    <div className="admin-shell">
      <AdminSidebar
        handleLogout={handleLogout}
        activeSection={activeSection}
        onDashboardClick={() => {
          setActiveSection("dashboard")
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        onStructuresClick={() => {
          setActiveSection("structures")
          scrollToElement(listSectionRef)
        }}
        onUsersClick={() => {
          alert(
            "La sezione utenti dedicata non è ancora stata costruita come vista separata. Intanto qui hai il conteggio utenti reale.",
          )
        }}
        onContentsClick={() => {
          setActiveSection("reviews")
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        onCategoriesClick={() => {
          setFilterCategoria("TERME")
          scrollToElement(listSectionRef)
        }}
        onFeaturesClick={() => {
          handleOpenCreateForm()
        }}
        onAccessibilityClick={() => {
          handleShowOnlyWithAccessibility()
        }}
      />

      <main className="admin-page">
        <AdminTopbar
          nomeVisualizzato={nomeVisualizzato}
          email={email}
          avatar={avatar}
          initial={initial}
        />

        <AdminStats stats={stats} />

        <section className="admin-toolbar-card">
          <div className="admin-toolbar-search">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Cerca per nome, città, descrizione o categoria"
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

          <select
            className="admin-toolbar-select"
            value={filterStato}
            onChange={(e) => setFilterStato(e.target.value)}
          >
            <option value="">Stato</option>
            <option value="APPROVATA">APPROVATA</option>
            <option value="BOZZA">BOZZA</option>
            <option value="IN_REVISIONE">IN_REVISIONE</option>
          </select>

          <button
            className="admin-toolbar-primary"
            onClick={handleApplyFilters}
          >
            Filtra
          </button>
        </section>

        <section className="admin-main-grid">
          <div className="admin-left-column">
            <div className="admin-section-header" ref={formSectionRef}>
              <h2>Gestione strutture</h2>

              <button
                className="admin-add-button"
                onClick={() => {
                  if (showForm && editingId) {
                    resetForm()
                  } else if (showForm) {
                    setShowForm(false)
                  } else {
                    handleOpenCreateForm()
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

            <div ref={listSectionRef}>
              {loading ? (
                <p>Caricamento strutture...</p>
              ) : filteredStructures.length === 0 ? (
                <p>Nessuna struttura trovata con i filtri selezionati.</p>
              ) : (
                <div className="admin-cards-grid">
                  {filteredStructures.map((structure) => (
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
          </div>

          <div className="admin-right-column">
            <AdminNotesCard
              latestReviews={latestReviews}
              onCreateStructure={handleOpenCreateForm}
              onAddUser={() => {
                alert("work in progress...")
              }}
              onManageCategories={() => {
                setFilterCategoria("")
                alert("work in progress...")
              }}
              onShowStructuresWithAccessibility={
                handleShowOnlyWithAccessibility
              }
              onResetFilters={handleResetFilters}
              onOpenReview={(review) => {
                if (review?.strutturaId) {
                  navigate(`/struttura/${review.strutturaId}`)
                }
              }}
            />
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminDashboard
