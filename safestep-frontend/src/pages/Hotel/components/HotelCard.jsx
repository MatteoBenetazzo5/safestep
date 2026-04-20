import { Link } from "react-router-dom"

function HotelCard({ hotel, renderWheelchairs }) {
  return (
    <Link to={`/struttura/${hotel.idStruttura}`} className="hotel-card-link">
      <div className="hotel-card">
        <img
          src={
            hotel.immagineCopertina ||
            "https://via.placeholder.com/800x500?text=SafeStep"
          }
          alt={hotel.nome || "Hotel"}
        />

        <div className="hotel-card-body">
          <h3>{hotel.nome || "Nome non disponibile"}</h3>
          <p>{hotel.citta || "Città non disponibile"}</p>

          <div className="hotel-card-footer">{renderWheelchairs(hotel)}</div>
        </div>
      </div>
    </Link>
  )
}

export default HotelCard
