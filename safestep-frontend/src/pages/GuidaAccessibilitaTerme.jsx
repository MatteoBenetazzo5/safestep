import { Link } from "react-router-dom"
import "../styles/pages/GuidaAccessibilitaTerme.css"
import guideImage from "../assets/images/guida-terme.jpg"

function GuidaAccessibilitaTerme() {
  const checklist = [
    "Ingresso a livello strada oppure con rampa stabile",
    "Parcheggio riservato o area di sosta vicina all’ingresso",
    "Spogliatoi accessibili con spazio di manovra",
    "Bagni accessibili realmente utilizzabili",
    "Piscine o aree termali con accesso facilitato",
    "Ascensore se la struttura ha più piani",
    "Personale disponibile ad assistere in caso di necessità",
    "Camminamenti ampi e senza ostacoli",
  ]

  const consigli = [
    {
      title: "Chiama prima della visita",
      text: "Una telefonata può evitarti brutte sorprese. Chiedi se l’ingresso è davvero senza gradini, se i bagni accessibili sono disponibili e se esistono sollevatori o sedie da piscina.",
      icon: "bi-telephone-fill",
    },
    {
      title: "Controlla il parcheggio",
      text: "Verifica se ci sono posti auto riservati, quanto sono vicini all’ingresso e se il percorso dal parcheggio alla reception è semplice e senza dislivelli.",
      icon: "bi-p-square-fill",
    },
    {
      title: "Chiedi foto reali",
      text: "Quando possibile, chiedi foto di ingresso, spogliatoi, piscina e bagni. Le foto aiutano molto più di una descrizione generica.",
      icon: "bi-image-fill",
    },
    {
      title: "Valuta gli spazi interni",
      text: "Corsie strette, porte pesanti o pavimenti scivolosi possono rendere difficile la visita anche in una struttura dichiarata accessibile.",
      icon: "bi-sign-turn-right-fill",
    },
  ]

  return (
    <div className="guida-terme-page">
      <section className="guida-terme-hero">
        <div className="guida-terme-hero-content">
          <div className="guida-terme-badge">SafeStep Terme</div>
          <h1>Guida all'accessibilità nelle terme</h1>
          <p>
            Una panoramica chiara delle caratteristiche più importanti da
            controllare prima di prenotare o visitare una struttura termale.
          </p>

          <div className="guida-terme-hero-actions">
            <Link to="/terme" className="guida-terme-primary-btn">
              Torna alle terme
            </Link>

            <a href="#cosa-controllare" className="guida-terme-secondary-btn">
              Vai alla guida
            </a>
          </div>
        </div>
      </section>

      <main className="guida-terme-container">
        <section className="guida-terme-intro-card">
          <div className="guida-terme-intro-text">
            <h2>Perché questa guida è utile</h2>
            <p>
              Non tutte le terme accessibili lo sono allo stesso modo. In alcuni
              casi è facile entrare ma difficile usare spogliatoi o piscine. In
              altri casi il bagno è presente ma il percorso interno è scomodo.
            </p>
            <p>
              Questa guida serve proprio a capire <strong>cosa chiedere</strong>
              ,<strong> cosa osservare</strong> e{" "}
              <strong>quali dettagli non sottovalutare</strong> prima della
              visita.
            </p>
          </div>

          <div className="guida-terme-intro-image">
            <img src={guideImage} alt="Area termale accessibile" />
          </div>
        </section>

        <section id="cosa-controllare" className="guida-terme-section">
          <div className="guida-terme-section-header">
            <h2>Cosa controllare prima di scegliere una struttura</h2>
            <p>
              Questi sono gli elementi più importanti da verificare in anticipo.
            </p>
          </div>

          <div className="guida-terme-checklist-grid">
            {checklist.map((item, index) => (
              <div key={index} className="guida-terme-check-card">
                <i className="bi bi-check-circle-fill"></i>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="guida-terme-section">
          <div className="guida-terme-section-header">
            <h2>Consigli pratici</h2>
            <p>Piccole verifiche che possono fare una grande differenza.</p>
          </div>

          <div className="guida-terme-tips-grid">
            {consigli.map((consiglio, index) => (
              <article key={index} className="guida-terme-tip-card">
                <div className="guida-terme-tip-icon">
                  <i className={`bi ${consiglio.icon}`}></i>
                </div>
                <h3>{consiglio.title}</h3>
                <p>{consiglio.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="guida-terme-highlight-box">
          <h2>Un buon segnale da cercare</h2>
          <p>
            Le strutture più attente all’accessibilità di solito forniscono
            informazioni concrete: misure, foto, percorsi, presenza di rampe,
            bagno accessibile, ascensore, personale di supporto e modalità di
            accesso alle vasche.
          </p>
        </section>
      </main>
    </div>
  )
}

export default GuidaAccessibilitaTerme
