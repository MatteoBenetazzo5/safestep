import { Link } from "react-router-dom"

function TermeCard({ terma, renderWheelchairs }) {
  return (
    <Link to={`/struttura/${terma.idStruttura}`} className="terme-card-link">
      <article className="terme-card">
        <img
          src={
            terma.immagineCopertina ||
            "https://via.placeholder.com/800x500?text=SafeStep"
          }
          alt={terma.nome || "Struttura termale"}
          className="terme-card-image"
        />

        <div className="terme-card-body">
          <h3>{terma.nome || "Nome non disponibile"}</h3>
          <p className="terme-card-city">
            {terma.citta || "Città non disponibile"}
          </p>

          <div className="terme-card-bottom">{renderWheelchairs(terma)}</div>
        </div>
      </article>
    </Link>
  )
}

export default TermeCard
