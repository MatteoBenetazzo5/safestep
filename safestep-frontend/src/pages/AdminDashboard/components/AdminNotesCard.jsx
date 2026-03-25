import "../styles/AdminNotesCard.css"

function AdminNotesCard({
  latestReviews = [],
  onCreateStructure,
  onAddUser,
  onManageCategories,
  onShowStructuresWithAccessibility,
  onResetFilters,
  onOpenReview,
  showUserForm,
  userFormData,
  onUserFormChange,
  onCreateUser,
  onCancelUserForm,
  creatingUser,
}) {
  const getInitial = (review) => {
    const name = review?.utente?.nomeVisualizzato || "U"
    return name.charAt(0).toUpperCase()
  }

  const getUserName = (review) => {
    return review?.utente?.nomeVisualizzato || "Utente"
  }

  const getReviewDate = (review) => {
    const rawDate = review?.dataAggiornamento || review?.dataCreazione

    if (!rawDate) return ""

    return new Date(rawDate).toLocaleDateString("it-IT")
  }

  return (
    <>
      <div className="admin-side-card admin-reviews-card">
        <h3>Ultime recensioni</h3>

        <div className="admin-side-list admin-side-list-scrollable">
          {latestReviews.length === 0 ? (
            <p>Nessuna recensione trovata.</p>
          ) : (
            latestReviews.map((review) => (
              <button
                key={review.idRecensione}
                type="button"
                className="admin-side-item"
                onClick={() => onOpenReview && onOpenReview(review)}
              >
                <div className="admin-side-avatar">{getInitial(review)}</div>

                <div className="admin-side-item-content">
                  <h4>{getUserName(review)}</h4>
                  <p>{review.strutturaNome || "Struttura"}</p>
                  <span>
                    {review.testo || "Recensione"}
                    {getReviewDate(review) ? ` · ${getReviewDate(review)}` : ""}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="admin-side-card">
        <h3>Operazioni rapide</h3>

        <div className="admin-quick-actions">
          <button className="admin-quick-button" onClick={onCreateStructure}>
            <i className="bi bi-plus-square"></i>
            Crea nuova struttura
          </button>

          <button className="admin-quick-button" onClick={onAddUser}>
            <i className="bi bi-person-plus"></i>
            Aggiungi utente
          </button>

          <button className="admin-quick-button" onClick={onManageCategories}>
            <i className="bi bi-people"></i>
            Gestisci utenti
          </button>

          <button
            className="admin-quick-button"
            onClick={onShowStructuresWithAccessibility}
          >
            <i className="bi bi-universal-access"></i>
            Solo accessibili
          </button>

          <button className="admin-quick-button" onClick={onResetFilters}>
            <i className="bi bi-arrow-counterclockwise"></i>
            Reset filtri
          </button>
        </div>

        {showUserForm && (
          <form className="admin-user-form" onSubmit={onCreateUser}>
            <div className="admin-user-form-field">
              <label>Nome visualizzato</label>
              <input
                type="text"
                name="nomeVisualizzato"
                value={userFormData.nomeVisualizzato}
                onChange={onUserFormChange}
                placeholder="Inserisci il nome"
              />
            </div>

            <div className="admin-user-form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userFormData.email}
                onChange={onUserFormChange}
                placeholder="Inserisci l'email"
              />
            </div>

            <div className="admin-user-form-field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={userFormData.password}
                onChange={onUserFormChange}
                placeholder="Inserisci la password"
              />
            </div>

            <div className="admin-user-form-field">
              <label>Telefono</label>
              <input
                type="text"
                name="telefono"
                value={userFormData.telefono}
                onChange={onUserFormChange}
                placeholder="Inserisci il telefono"
              />
            </div>

            <div className="admin-user-form-field">
              <label>Avatar URL</label>
              <input
                type="text"
                name="avatar"
                value={userFormData.avatar}
                onChange={onUserFormChange}
                placeholder="Inserisci URL avatar (facoltativo)"
              />
            </div>

            <div className="admin-user-form-actions">
              <button
                type="button"
                className="admin-user-cancel"
                onClick={onCancelUserForm}
              >
                Annulla
              </button>

              <button
                type="submit"
                className="admin-user-submit"
                disabled={creatingUser}
              >
                {creatingUser ? "Creazione..." : "Crea utente"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  )
}

export default AdminNotesCard
