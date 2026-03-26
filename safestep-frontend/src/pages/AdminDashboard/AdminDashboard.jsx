import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getAvatar,
  getEmail,
  getIdUtente,
  getNomeVisualizzato,
  logout,
} from "../../utils/auth"
import "./styles/AdminDashboardLayout.css"
import AdminSidebar from "./components/AdminSidebar"
import AdminTopbar from "./components/AdminTopbar"
import AdminStats from "./components/AdminStats"
import AdminStructureForm from "./components/AdminStructureForm"
import AdminStructureCard from "./components/AdminStructureCard"
import AdminNotesCard from "./components/AdminNotesCard"
import AdminUsersList from "./components/AdminUsersList"
import UseAdminDashboardData from "./components/useAdminDashboardData"
import UseAdminDashboardFilters from "./components/UseAdminDashboardFilters"
import UseAdminDashboardForm from "./components/UseAdminDashboardForm"
import { scrollToElement } from "./components/adminDashboardHelpers"
import { registerAdminUser } from "../../services/adminDashboardService"

function AdminDashboard() {
  const navigate = useNavigate()

  const nomeVisualizzato = getNomeVisualizzato() || "Admin"
  const email = getEmail() || "admin@safestep.com"
  const avatar = getAvatar() || ""
  const idUtente = getIdUtente()

  const [activeSection, setActiveSection] = useState("dashboard")
  const [showUserForm, setShowUserForm] = useState(false)
  const [creatingUser, setCreatingUser] = useState(false)
  const [userFormData, setUserFormData] = useState({
    nomeVisualizzato: "",
    email: "",
    password: "",
    telefono: "",
    avatar: "",
  })

  const formSectionRef = useRef(null)
  const listSectionRef = useRef(null)

  const {
    structures,
    caratteristiche,
    latestReviews,
    loading,
    usersCount,
    users,
    savedCount,
    totalReviewsCount,
    refreshDashboardData,
  } = UseAdminDashboardData()

  const {
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
  } = UseAdminDashboardFilters(structures)

  const {
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
  } = UseAdminDashboardForm({
    idUtente,
    refreshDashboardData,
    setActiveSection,
    formSectionRef,
  })

  const initial = nomeVisualizzato.charAt(0).toUpperCase()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleApplyFilters = () => {
    setActiveSection("structures")
    scrollToElement(listSectionRef)
  }

  const handleShowOnlyWithAccessibility = () => {
    setFilterAccessibilita("accessibile")
    setActiveSection("structures")
    scrollToElement(listSectionRef)
  }

  const handleUserFormChange = (e) => {
    const { name, value } = e.target

    setUserFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const resetUserForm = () => {
    setUserFormData({
      nomeVisualizzato: "",
      email: "",
      password: "",
      telefono: "",
      avatar: "",
    })
  }

  const handleToggleUserForm = () => {
    setShowUserForm((prev) => !prev)
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()

    if (
      !userFormData.nomeVisualizzato.trim() ||
      !userFormData.email.trim() ||
      !userFormData.password.trim()
    ) {
      alert("Compila almeno nome visualizzato, email e password.")
      return
    }

    try {
      setCreatingUser(true)

      const response = await registerAdminUser(userFormData)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Errore creazione utente:", errorText)
        alert("Creazione utente non riuscita.")
        return
      }

      alert("Utente creato con successo!")
      resetUserForm()
      setShowUserForm(false)
      await refreshDashboardData()
    } catch (error) {
      console.error("Errore creazione utente:", error)
      alert("Errore durante la creazione dell'utente.")
    } finally {
      setCreatingUser(false)
    }
  }

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
          setActiveSection("users")
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        onContentsClick={() => {
          setActiveSection("reviews")
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        onCategoriesClick={() => {
          setFilterCategoria("TERME")
          setActiveSection("structures")
          scrollToElement(listSectionRef)
        }}
        onFeaturesClick={() => {
          setActiveSection("structures")
          handleOpenCreateForm()
        }}
        onAccessibilityClick={() => {
          handleShowOnlyWithAccessibility()
        }}
      />

      <main className="admin-page">
        <div className="admin-content">
          <AdminTopbar
            nomeVisualizzato={nomeVisualizzato}
            email={email}
            avatar={avatar}
            initial={initial}
          />

          <AdminStats stats={stats} />

          {activeSection !== "users" && (
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
          )}

          <section className="admin-main-grid">
            <div className="admin-left-column">
              {activeSection === "users" ? (
                <AdminUsersList users={users} />
              ) : (
                <>
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
                      handleCreateOrUpdateStructure={
                        handleCreateOrUpdateStructure
                      }
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
                      <div className="admin-cards-scroll-area">
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
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="admin-right-column">
              <AdminNotesCard
                latestReviews={latestReviews}
                onCreateStructure={handleOpenCreateForm}
                onAddUser={handleToggleUserForm}
                onManageCategories={() => {
                  setActiveSection("users")
                  window.scrollTo({ top: 0, behavior: "smooth" })
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
                showUserForm={showUserForm}
                userFormData={userFormData}
                onUserFormChange={handleUserFormChange}
                onCreateUser={handleCreateUser}
                onCancelUserForm={() => {
                  resetUserForm()
                  setShowUserForm(false)
                }}
                creatingUser={creatingUser}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
