import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getAvatar,
  getEmail,
  getIdUtente,
  getNomeVisualizzato,
  logout,
} from "../utils/auth"
import { API_BASE_URL, getAuthHeaders } from "../utils/api"
import "../styles/pages/AdminDashboard.css"

function AdminDashboard() {
  const navigate = useNavigate()

  const nomeVisualizzato = getNomeVisualizzato() || "Admin"
  const email = getEmail() || "admin@safestep.com"
  const avatar = getAvatar()
  const initial = nomeVisualizzato.charAt(0).toUpperCase()
  const idUtente = getIdUtente()

  const [structures, setStructures] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)

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

  const stats = [
    {
      id: 1,
      icon: "bi-grid-1x2-fill",
      number: structures.length,
      label: "Strutture",
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
    setSelectedImage(null)
    setEditingId(null)
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

  useEffect(() => {
    fetchStructures()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0])
    }
  }

  const uploadImage = async () => {
    if (!selectedImage) {
      return (
        formData.immagineCopertina ||
        "https://via.placeholder.com/800x500?text=SafeStep"
      )
    }

    const data = new FormData()
    data.append("file", selectedImage)

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
    return result.url
  }

  const handleCreateOrUpdateStructure = async (e) => {
    e.preventDefault()

    try {
      setSaving(true)

      const imageUrl = await uploadImage()

      const body = {
        categoria: formData.categoria,
        nome: formData.nome,
        descrizione: formData.descrizione,
        indirizzo: formData.indirizzo,
        citta: formData.citta,
        paese: formData.paese,
        telefono: formData.telefono,
        sitoWeb: formData.sitoWeb,
        immagineCopertina: imageUrl || "",
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
    setSelectedImage(null)

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
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-icon">
            <i className="bi bi-shield-check"></i>
          </div>
          <div>
            <h2>SafeStep</h2>
            <p>Area Admin</p>
          </div>
        </div>

        <nav className="admin-menu">
          <button className="admin-menu-link active">
            <i className="bi bi-grid-1x2"></i>
            Dashboard
          </button>

          <button className="admin-menu-link">
            <i className="bi bi-building"></i>
            Gestione strutture
          </button>
        </nav>

        <button className="admin-logout-button" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
          Logout
        </button>
      </aside>

      <main className="admin-content">
        <header className="admin-topbar">
          <div>
            <h1>Benvenuto nell'area Admin!</h1>
            <p>
              {nomeVisualizzato} · {email}
            </p>
          </div>

          <div className="admin-user-pill">
            {avatar ? (
              <img
                src={avatar}
                alt={nomeVisualizzato}
                className="admin-user-image"
              />
            ) : (
              <div className="admin-user-avatar">{initial}</div>
            )}
          </div>
        </header>

        <section className="admin-stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="admin-stat-card">
              <div className="admin-stat-icon">
                <i className={`bi ${stat.icon}`}></i>
              </div>

              <div>
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
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
              <form
                className="admin-side-card mb-4"
                onSubmit={handleCreateOrUpdateStructure}
              >
                <h3>
                  {editingId ? "Modifica struttura" : "Crea nuova struttura"}
                </h3>

                <div className="mb-3">
                  <label>Nome</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Descrizione</label>
                  <textarea
                    name="descrizione"
                    value={formData.descrizione}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label>Indirizzo</label>
                  <input
                    type="text"
                    name="indirizzo"
                    value={formData.indirizzo}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label>Città</label>
                  <input
                    type="text"
                    name="citta"
                    value={formData.citta}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label>Paese</label>
                  <input
                    type="text"
                    name="paese"
                    value={formData.paese}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label>Telefono</label>
                  <input
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label>Sito Web</label>
                  <input
                    type="text"
                    name="sitoWeb"
                    value={formData.sitoWeb}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label>Latitudine</label>
                  <input
                    type="number"
                    step="any"
                    name="latitudine"
                    value={formData.latitudine}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label>Longitudine</label>
                  <input
                    type="number"
                    step="any"
                    name="longitudine"
                    value={formData.longitudine}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label>Stato</label>
                  <select
                    name="stato"
                    value={formData.stato}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="APPROVATA">APPROVATA</option>
                    <option value="BOZZA">BOZZA</option>
                    <option value="IN_REVISIONE">IN_REVISIONE</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label>Immagine</label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="form-control"
                    accept="image/*"
                  />
                </div>

                {formData.immagineCopertina && (
                  <div className="mb-3">
                    <img
                      src={formData.immagineCopertina}
                      alt="Anteprima"
                      style={{ width: "220px", borderRadius: "12px" }}
                    />
                  </div>
                )}

                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    type="submit"
                    className="admin-add-button"
                    disabled={saving}
                  >
                    {saving
                      ? "Salvataggio..."
                      : editingId
                        ? "Aggiorna struttura"
                        : "Salva struttura"}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={resetForm}
                    >
                      Annulla modifica
                    </button>
                  )}
                </div>
              </form>
            )}

            {loading ? (
              <p>Caricamento strutture...</p>
            ) : (
              <div className="admin-cards-grid">
                {structures.map((structure) => (
                  <div
                    key={structure.idStruttura}
                    className="admin-structure-card"
                  >
                    <img
                      src={
                        structure.immagineCopertina ||
                        "https://via.placeholder.com/800x500?text=No+Image"
                      }
                      alt={structure.nome}
                    />

                    <div className="admin-structure-body">
                      <h3>{structure.nome}</h3>
                      <p>{structure.citta}</p>

                      <div className="admin-structure-rating">
                        <span>{structure.categoria}</span>
                      </div>

                      <div className="admin-card-actions">
                        <button
                          className="edit-btn"
                          onClick={() =>
                            navigate(`/struttura/${structure.idStruttura}`)
                          }
                        >
                          Apri
                        </button>

                        <button
                          className="edit-btn"
                          onClick={() => handleEditStructure(structure)}
                        >
                          Modifica
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDeleteStructure(structure.idStruttura)
                          }
                        >
                          Elimina
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="admin-right-column">
            <div className="admin-side-card">
              <h3>Note rapide</h3>
              <div className="admin-side-list">
                <p>Ora puoi creare, modificare ed eliminare strutture.</p>
                <p>L'immagine viene caricata davvero sul backend.</p>
                <p>La parte stile la rifiniamo dopo.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminDashboard
