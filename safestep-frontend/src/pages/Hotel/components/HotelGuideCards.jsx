import { Link } from "react-router-dom"
import guideImage from "../../../assets/images/HOTEL/guideImage.jpg"

function HotelGuideCards() {
  return (
    <>
      <div className="hotel-guide-card">
        <h3>Guida all'accessibilità negli hotel</h3>
        <p>
          Scopri i servizi più importanti da controllare prima di prenotare il
          tuo soggiorno.
        </p>

        <Link
          to="/hotel/guida-accessibilita"
          className="hotel-guide-button-link"
        >
          Scopri di più
        </Link>
      </div>

      <div className="hotel-guide-card image-card">
        <img src={guideImage} alt="Guida hotel accessibili" />
        <h3>Consigli per visitare gli hotel</h3>
        <p>
          Scopri i suggerimenti utili per organizzare il soggiorno, capire cosa
          controllare prima di prenotare e quali domande fare alla struttura.
        </p>

        <Link to="/hotel/consigli-visita" className="hotel-guide-button-link">
          Scopri di più
        </Link>
      </div>
    </>
  )
}

export default HotelGuideCards
