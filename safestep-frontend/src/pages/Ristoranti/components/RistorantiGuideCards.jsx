import { Link } from "react-router-dom"
import guideImage from "../../../assets/images/RISTORANTI/guideImage.jpg"

function RistorantiGuideCards() {
  return (
    <>
      <div className="ristoranti-guide-card">
        <h3>Guida all'accessibilità nei ristoranti</h3>
        <p>
          Scopri cosa controllare prima di prenotare e trova locali più comodi,
          inclusivi e facili da raggiungere.
        </p>

        <Link
          to="/ristoranti/guida-accessibilita"
          className="ristoranti-guide-button-link"
        >
          Scopri di più
        </Link>
      </div>

      <div className="ristoranti-guide-card image-card">
        <img src={guideImage} alt="Guida ristoranti accessibili" />
        <h3>Consigli per visitare i ristoranti</h3>
        <p>
          Leggi i suggerimenti utili per organizzare la visita, capire cosa
          controllare prima di prenotare e quali domande fare al locale.
        </p>

        <Link
          to="/ristoranti/consigli-visita"
          className="ristoranti-guide-button-link"
        >
          Scopri di più
        </Link>
      </div>
    </>
  )
}

export default RistorantiGuideCards
