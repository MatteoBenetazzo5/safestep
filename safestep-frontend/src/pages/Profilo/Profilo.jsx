import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getAvatar,
  getEmail,
  getIdUtente,
  getNomeVisualizzato,
  logout,
} from "../../utils/auth"

import ProfileHeader from "./components/ProfileHeader"
import AccountForm from "./components/AccountForm"
import AccessibilityProfileForm from "./components/AccessibilityProfileForm"
import PreferencesForm from "./components/PreferencesForm"
import PreferencesList from "./components/PreferencesList"
import SavedPlaces from "./components/SavedPlaces"

import {
  createPreference,
  createProfile,
  deletePreferenceById,
  getCompleteProfileData,
  removeSavedPlaceByUserAndStructure,
  updateProfileById,
  updateUserById,
} from "../../services/profileService"

import "./styles/ProfiloLayout.css"

function Profilo() {
  const navigate = useNavigate()
  const idUtente = getIdUtente()

  const initialNome = getNomeVisualizzato() || "Utente"
  const initialEmail = getEmail() || ""
  const initialAvatar = getAvatar() || ""

  const [loading, setLoading] = useState(true)
  const [savingUser, setSavingUser] = useState(false)
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPreference, setSavingPreference] = useState(false)

  const [_utente, setUtente] = useState(null)
  const [profilo, setProfilo] = useState(null)
  const [preferenze, setPreferenze] = useState([])
  const [savedPlaces, setSavedPlaces] = useState([])
  const [caratteristiche, setCaratteristiche] = useState([])

  const [userForm, setUserForm] = useState({
    nomeVisualizzato: initialNome,
    email: initialEmail,
    telefono: "",
    avatar: initialAvatar,
  })

  const [profileForm, setProfileForm] = useState({
    tipoMobilita: "",
    note: "",
    coloreTema: "",
  })

  const [preferenceForm, setPreferenceForm] = useState({
    caratteristicaId: "",
    livelloPreferenza: "IMPORTANTE",
  })

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const fetchProfileData = useCallback(async () => {
    if (!idUtente) {
      navigate("/login")
      return
    }

    try {
      setLoading(true)

      const data = await getCompleteProfileData(idUtente)

      setUtente(data.utente)

      setUserForm({
        nomeVisualizzato: data.utente?.nomeVisualizzato || initialNome,
        email: data.utente?.email || initialEmail,
        telefono: data.utente?.telefono || "",
        avatar: data.utente?.avatar || initialAvatar,
      })

      setProfilo(data.profilo)

      if (data.profilo) {
        setProfileForm({
          tipoMobilita: data.profilo.tipoMobilita || "",
          note: data.profilo.note || "",
          coloreTema: data.profilo.coloreTema || "",
        })
      } else {
        setProfileForm({
          tipoMobilita: "",
          note: "",
          coloreTema: "",
        })
      }

      setPreferenze(Array.isArray(data.preferenze) ? data.preferenze : [])
      setSavedPlaces(Array.isArray(data.savedPlaces) ? data.savedPlaces : [])
      setCaratteristiche(
        Array.isArray(data.caratteristiche) ? data.caratteristiche : [],
      )
    } catch (error) {
      console.error("Errore caricamento profilo:", error)
      alert("Errore nel caricamento del profilo")
    } finally {
      setLoading(false)
    }
  }, [idUtente, navigate, initialNome, initialEmail, initialAvatar])

  useEffect(() => {
    fetchProfileData()
  }, [fetchProfileData])

  const handleUserChange = (e) => {
    const { name, value } = e.target
    setUserForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target
    setPreferenceForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveUser = async (e) => {
    e.preventDefault()

    try {
      setSavingUser(true)

      const updatedUser = await updateUserById(idUtente, {
        email: userForm.email,
        nomeVisualizzato: userForm.nomeVisualizzato,
        telefono: userForm.telefono,
        avatar: userForm.avatar,
      })

      setUtente(updatedUser)

      localStorage.setItem("email", updatedUser.email || "")
      localStorage.setItem(
        "nomeVisualizzato",
        updatedUser.nomeVisualizzato || "",
      )
      localStorage.setItem("avatar", updatedUser.avatar || "")

      alert("Dati account aggiornati con successo!")
    } catch (error) {
      console.error("Errore aggiornamento utente:", error)
      alert(error.message || "Errore durante l'aggiornamento utente")
    } finally {
      setSavingUser(false)
    }
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()

    if (!profileForm.tipoMobilita.trim()) {
      alert("Inserisci il tipo di mobilità")
      return
    }

    try {
      setSavingProfile(true)

      let updatedProfile

      if (profilo?.idProfilo) {
        updatedProfile = await updateProfileById(profilo.idProfilo, {
          tipoMobilita: profileForm.tipoMobilita,
          note: profileForm.note,
          coloreTema: profileForm.coloreTema,
        })
      } else {
        updatedProfile = await createProfile({
          utenteId: idUtente,
          tipoMobilita: profileForm.tipoMobilita,
          note: profileForm.note,
          coloreTema: profileForm.coloreTema,
        })
      }

      setProfilo(updatedProfile)

      alert("Profilo salvato con successo!")
    } catch (error) {
      console.error("Errore salvataggio profilo:", error)
      alert(error.message || "Errore durante il salvataggio del profilo")
    } finally {
      setSavingProfile(false)
    }
  }

  const handleAddPreference = async (e) => {
    e.preventDefault()

    if (!preferenceForm.caratteristicaId) {
      alert("Seleziona una caratteristica")
      return
    }

    try {
      setSavingPreference(true)

      await createPreference({
        utenteId: idUtente,
        caratteristicaId: preferenceForm.caratteristicaId,
        livelloPreferenza: preferenceForm.livelloPreferenza,
      })

      alert("Preferenza aggiunta con successo!")

      setPreferenceForm({
        caratteristicaId: "",
        livelloPreferenza: "IMPORTANTE",
      })

      fetchProfileData()
    } catch (error) {
      console.error("Errore creazione preferenza:", error)
      alert(error.message || "Errore durante l'aggiunta della preferenza")
    } finally {
      setSavingPreference(false)
    }
  }

  const handleDeletePreference = async (idPreferenza) => {
    const conferma = window.confirm("Vuoi eliminare questa preferenza?")

    if (!conferma) return

    try {
      await deletePreferenceById(idPreferenza)

      alert("Preferenza eliminata")
      fetchProfileData()
    } catch (error) {
      console.error("Errore eliminazione preferenza:", error)
      alert(error.message || "Errore durante l'eliminazione della preferenza")
    }
  }

  const handleRemoveSavedPlace = async (idStruttura) => {
    try {
      await removeSavedPlaceByUserAndStructure(idUtente, idStruttura)

      alert("Struttura rimossa dai preferiti")
      fetchProfileData()
    } catch (error) {
      console.error("Errore rimozione preferito:", error)
      alert(error.message || "Errore durante la rimozione dai preferiti")
    }
  }

  const nomeVisualizzato = userForm.nomeVisualizzato || "Utente"
  const email = userForm.email || "email@example.com"
  const avatar = userForm.avatar || ""
  const initial = nomeVisualizzato.charAt(0).toUpperCase()

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <p>Caricamento profilo...</p>
        </div>
      </div>
    )
  }

  return (
    <section className="profile-page">
      <div className="profile-container">
        <ProfileHeader
          avatar={avatar}
          nomeVisualizzato={nomeVisualizzato}
          email={email}
          telefono={userForm.telefono}
          initial={initial}
          onLogout={handleLogout}
        />

        <div className="profile-grid">
          <div className="profile-left-column">
            <AccountForm
              userForm={userForm}
              onChange={handleUserChange}
              onSubmit={handleSaveUser}
              savingUser={savingUser}
            />

            <AccessibilityProfileForm
              profileForm={profileForm}
              onChange={handleProfileChange}
              onSubmit={handleSaveProfile}
              savingProfile={savingProfile}
            />

            <PreferencesForm
              preferenceForm={preferenceForm}
              caratteristiche={caratteristiche}
              onChange={handlePreferenceChange}
              onSubmit={handleAddPreference}
              savingPreference={savingPreference}
            />

            <PreferencesList
              preferenze={preferenze}
              onDeletePreference={handleDeletePreference}
            />
          </div>

          <div className="profile-right-column">
            <SavedPlaces
              savedPlaces={savedPlaces}
              onOpenStructure={(idStruttura) =>
                navigate(`/struttura/${idStruttura}`)
              }
              onRemoveSavedPlace={handleRemoveSavedPlace}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profilo
