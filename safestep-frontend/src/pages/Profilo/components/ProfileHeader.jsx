import "../styles/ProfileHeader.css"

function ProfileHeader({
  avatar,
  nomeVisualizzato,
  email,
  telefono,
  initial,
  onLogout,
}) {
  return (
    <div className="profile-header-card">
      <div className="profile-main-info">
        <div className="profile-avatar-wrapper">
          {avatar ? (
            <img
              src={avatar}
              alt={nomeVisualizzato}
              className="profile-avatar"
            />
          ) : (
            <div className="profile-avatar-fallback">{initial}</div>
          )}
        </div>

        <div>
          <h1>{nomeVisualizzato}</h1>
          <p>{email}</p>
          <p>{telefono || "Nessun telefono inserito"}</p>
        </div>
      </div>

      <button className="profile-logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

export default ProfileHeader
