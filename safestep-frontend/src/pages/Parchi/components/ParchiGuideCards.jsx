import { Link } from "react-router-dom"
import guideImage from "../../../assets/images/PARCHI/guideImage.jpg"

function ParchiGuideCards() {
  return (
    <>
      <div className="parchi-guide-card">
        <h3>Guida all'accessibilità nei parchi</h3>
        <p>
          Scopri i percorsi, gli ingressi e i servizi più utili per vivere una
          giornata all'aperto senza ostacoli.
        </p>

        <Link
          to="/parchi/guida-accessibilita"
          className="parchi-guide-button-link"
        >
          Scopri di più
        </Link>
      </div>

      <div className="parchi-guide-card image-card">
        <img src={guideImage} alt="Guida parchi accessibili" />
        <h3>Consigli per visitare i parchi</h3>
        <p>
          Scopri i suggerimenti utili per organizzare la visita, capire cosa
          controllare prima di partire e quali percorsi preferire.
        </p>

        <Link to="/parchi/consigli-visita" className="parchi-guide-button-link">
          Scopri di più
        </Link>
      </div>
    </>
  )
}

export default ParchiGuideCards
