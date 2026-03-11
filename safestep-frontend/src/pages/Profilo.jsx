function Profilo() {
  const nomeVisualizzato = localStorage.getItem("nomeVisualizzato")
  const email = localStorage.getItem("email")
  const ruolo = localStorage.getItem("ruolo")

  return (
    <div style={{ padding: "40px" }}>
      <h1>Area personale utente</h1>
      <p>Benvenuto {nomeVisualizzato}</p>
      <p>Email: {email}</p>
      <p>Ruolo: {ruolo}</p>
    </div>
  )
}

export default Profilo
