import { Link } from "react-router-dom"
import guideImage from "../../../assets/images/guida-terme.jpg"

function TermeGuideCards() {
  return (
    <aside className="terme-side-column">
      <div className="terme-guide-card small-guide">
        <h3>Guida all'accessibilità nelle terme</h3>
        <p>
          Scopri di più sulle caratteristiche delle terme accessibili e leggi i
          nostri consigli per pianificare la tua visita.
        </p>

        <Link
          to="/terme/guida-accessibilita"
          className="terme-guide-button-link"
        >
          Scopri di più
        </Link>
      </div>

      <div className="terme-guide-card image-guide">
        <img src={guideImage} alt="Guida terme accessibili" />

        <div className="terme-guide-card-body">
          <h3>Consigli per visitare le terme</h3>
          <p>
            Leggi i suggerimenti utili per organizzare la visita, capire cosa
            controllare prima di partire e quali domande fare alla struttura.
          </p>

          <Link to="/terme/consigli-visita" className="terme-guide-button-link">
            Scopri di più
          </Link>
        </div>
      </div>
    </aside>
  )
}

export default TermeGuideCards
