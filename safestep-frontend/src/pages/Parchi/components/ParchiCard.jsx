import { Link } from "react-router-dom"

function ParchiCard({ parco, renderWheelchairs }) {
  return (
    <Link to={`/struttura/${parco.idStruttura}`} className="parchi-card-link">
      <div className="parchi-card">
        <img
          src={
            parco.immagineCopertina ||
            "https://via.placeholder.com/800x500?text=SafeStep"
          }
          alt={parco.nome || "Parco"}
        />

        <div className="parchi-card-body">
          <h3>{parco.nome || "Nome non disponibile"}</h3>
          <p>{parco.citta || "Città non disponibile"}</p>

          <div className="parchi-card-footer">{renderWheelchairs(parco)}</div>
        </div>
      </div>
    </Link>
  )
}

export default ParchiCard
