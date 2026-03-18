import { Link } from "react-router-dom"
import "../styles/pages/ConsigliVisitaTerme.css"

function ConsigliVisitaTerme() {
  const primaDiPartire = [
    "Controlla gli orari e i giorni meno affollati",
    "Verifica se serve prenotazione per aree benessere o trattamenti",
    "Chiedi se ci sono spazi di attesa accessibili",
    "Informati su eventuali accompagnatori ammessi",
  ]

  const duranteLaVisita = [
    "Segnala subito eventuali ostacoli al personale",
    "Valuta la sicurezza dei pavimenti bagnati",
    "Controlla se gli spogliatoi hanno panche comode e spazio sufficiente",
    "Preferisci percorsi semplici e vicini ai servizi essenziali",
  ]

  const domandeUtili = [
    "L’ingresso principale è senza gradini?",
    "I bagni accessibili sono aperti e utilizzabili?",
    "C’è un ascensore per raggiungere tutte le aree?",
    "Esistono ausili per l’accesso alle vasche?",
    "Il personale è disponibile per assistenza?",
    "Ci sono camere o spazi relax accessibili?",
  ]

  return (
    <div className="consigli-terme-page">
      <section className="consigli-terme-hero">
        <div className="consigli-terme-overlay">
          <div className="consigli-terme-content">
            <div className="consigli-terme-label">
              Pianifica meglio la visita
            </div>

            <h1>Consigli per organizzare una visita alle terme</h1>

            <p>
              Una guida pratica per preparare la giornata, ridurre gli
              imprevisti e sapere quali domande fare prima di arrivare in
              struttura.
            </p>

            <Link to="/terme" className="consigli-terme-back-btn">
              Torna alle terme
            </Link>
          </div>
        </div>
      </section>

      <main className="consigli-terme-container">
        <section className="consigli-terme-grid">
          <article className="consigli-terme-card">
            <h2>Prima di partire</h2>

            <div className="consigli-terme-list">
              {primaDiPartire.map((item, index) => (
                <div key={index} className="consigli-terme-list-item">
                  <i className="bi bi-check2-circle"></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="consigli-terme-card">
            <h2>Durante la visita</h2>

            <div className="consigli-terme-list">
              {duranteLaVisita.map((item, index) => (
                <div key={index} className="consigli-terme-list-item">
                  <i className="bi bi-check2-circle"></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="consigli-terme-wide-card">
          <h2>Domande utili da fare prima di prenotare</h2>
          <p>
            Molte strutture usano descrizioni generiche come “accessibile” o
            “adatta a tutti”, ma senza dettagli concreti. Fare alcune domande
            precise ti aiuta a capire la situazione reale.
          </p>

          <div className="consigli-terme-question-grid">
            {domandeUtili.map((item, index) => (
              <div key={index} className="consigli-terme-question-card">
                <i className="bi bi-question-circle-fill"></i>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="consigli-terme-note-box">
          <h2>Nota importante</h2>
          <p>
            Anche una struttura ben organizzata può avere differenze tra una
            zona e l’altra. Per questo conviene sempre chiedere informazioni su
            reception, spogliatoi, bagni, percorsi interni, ascensore e accesso
            alle vasche, non solo sull’ingresso principale.
          </p>
        </section>
      </main>
    </div>
  )
}

export default ConsigliVisitaTerme
