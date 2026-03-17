import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getAvatar,
  getEmail,
  getIdUtente,
  getNomeVisualizzato,
  logout,
} from "../../utils/auth"
import { API_BASE_URL, getAuthHeaders } from "../../utils/api"

import ProfileHeader from "./components/ProfileHeader"
import AccountForm from "./components/AccountForm"
import AccessibilityProfileForm from "./components/AccessibilityProfileForm"
import PreferencesForm from "./components/PreferencesForm"
import PreferencesList from "./components/PreferencesList"
import SavedPlaces from "./components/SavedPlaces"

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

      const responses = await Promise.all([
        fetch(`${API_BASE_URL}/utenti/${idUtente}`, {
          headers: getAuthHeaders(),
        }),
        fetch(`${API_BASE_URL}/profili/utente/${idUtente}`, {
          headers: getAuthHeaders(),
        }),
        fetch(`${API_BASE_URL}/preferenze/utente/${idUtente}`, {
          headers: getAuthHeaders(),
        }),
        fetch(`${API_BASE_URL}/strutture-salvate/utente/${idUtente}`, {
          headers: getAuthHeaders(),
        }),
        fetch(`${API_BASE_URL}/caratteristiche`, {
          headers: getAuthHeaders(),
        }),
      ])

      const userResponse = responses[0]
      const profileResponse = responses[1]
      const preferencesResponse = responses[2]
      const savedResponse = responses[3]
      const caratteristicheResponse = responses[4]

      if (userResponse.ok) {
        const userData = await userResponse.json()
        setUtente(userData)

        setUserForm({
          nomeVisualizzato: userData.nomeVisualizzato || initialNome,
          email: userData.email || initialEmail,
          telefono: userData.telefono || "",
          avatar: userData.avatar || initialAvatar,
        })
      }

      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        setProfilo(profileData)

        setProfileForm({
          tipoMobilita: profileData.tipoMobilita || "",
          note: profileData.note || "",
          coloreTema: profileData.coloreTema || "",
        })
      } else {
        setProfilo(null)
      }

      if (preferencesResponse.ok) {
        const preferencesData = await preferencesResponse.json()
        setPreferenze(preferencesData)
      } else {
        setPreferenze([])
      }

      if (savedResponse.ok) {
        const savedData = await savedResponse.json()
        setSavedPlaces(savedData)
      } else {
        setSavedPlaces([])
      }

      if (caratteristicheResponse.ok) {
        const caratteristicheData = await caratteristicheResponse.json()
        setCaratteristiche(caratteristicheData)
      } else {
        setCaratteristiche([])
      }
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

      const response = await fetch(`${API_BASE_URL}/utenti/${idUtente}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          email: userForm.email,
          nomeVisualizzato: userForm.nomeVisualizzato,
          telefono: userForm.telefono,
          avatar: userForm.avatar,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Errore aggiornamento utente:", errorText)
        alert("Aggiornamento utente non riuscito")
        return
      }

      const updatedUser = await response.json()
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
      alert("Errore durante l'aggiornamento utente")
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

      let response

      if (profilo?.idProfilo) {
        response = await fetch(`${API_BASE_URL}/profili/${profilo.idProfilo}`, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            tipoMobilita: profileForm.tipoMobilita,
            note: profileForm.note,
            coloreTema: profileForm.coloreTema,
          }),
        })
      } else {
        response = await fetch(`${API_BASE_URL}/profili`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            utenteId: idUtente,
            tipoMobilita: profileForm.tipoMobilita,
            note: profileForm.note,
            coloreTema: profileForm.coloreTema,
          }),
        })
      }

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Errore salvataggio profilo:", errorText)
        alert("Salvataggio profilo non riuscito")
        return
      }

      const updatedProfile = await response.json()
      setProfilo(updatedProfile)

      alert("Profilo salvato con successo!")
    } catch (error) {
      console.error("Errore salvataggio profilo:", error)
      alert("Errore durante il salvataggio del profilo")
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

      const response = await fetch(`${API_BASE_URL}/preferenze`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          utenteId: idUtente,
          caratteristicaId: preferenceForm.caratteristicaId,
          livelloPreferenza: preferenceForm.livelloPreferenza,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Errore creazione preferenza:", errorText)
        alert("Preferenza non aggiunta")
        return
      }

      alert("Preferenza aggiunta con successo!")

      setPreferenceForm({
        caratteristicaId: "",
        livelloPreferenza: "IMPORTANTE",
      })

      fetchProfileData()
    } catch (error) {
      console.error("Errore creazione preferenza:", error)
      alert("Errore durante l'aggiunta della preferenza")
    } finally {
      setSavingPreference(false)
    }
  }

  const handleDeletePreference = async (idPreferenza) => {
    const conferma = window.confirm("Vuoi eliminare questa preferenza?")

    if (!conferma) return

    try {
      const response = await fetch(
        `${API_BASE_URL}/preferenze/${idPreferenza}`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        },
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Errore eliminazione preferenza:", errorText)
        alert("Eliminazione preferenza non riuscita")
        return
      }

      alert("Preferenza eliminata")
      fetchProfileData()
    } catch (error) {
      console.error("Errore eliminazione preferenza:", error)
      alert("Errore durante l'eliminazione della preferenza")
    }
  }

  const handleRemoveSavedPlace = async (idStruttura) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/strutture-salvate/utente/${idUtente}/struttura/${idStruttura}`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        },
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Errore rimozione preferito:", errorText)
        alert("Rimozione dai preferiti non riuscita")
        return
      }

      alert("Struttura rimossa dai preferiti")
      fetchProfileData()
    } catch (error) {
      console.error("Errore rimozione preferito:", error)
      alert("Errore durante la rimozione dai preferiti")
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
