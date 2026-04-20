import { Link } from "react-router-dom"

function RistorantiCard({ ristorante, renderWheelchairs }) {
  return (
    <Link
      to={`/struttura/${ristorante.idStruttura}`}
      className="ristoranti-card-link"
    >
      <div className="ristoranti-card">
        <img
          src={
            ristorante.immagineCopertina ||
            "https://via.placeholder.com/800x500?text=SafeStep"
          }
          alt={ristorante.nome || "Ristorante"}
        />

        <div className="ristoranti-card-body">
          <h3>{ristorante.nome || "Nome non disponibile"}</h3>
          <p>{ristorante.citta || "Città non disponibile"}</p>

          <div className="ristoranti-card-footer">
            {renderWheelchairs(ristorante)}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RistorantiCard
