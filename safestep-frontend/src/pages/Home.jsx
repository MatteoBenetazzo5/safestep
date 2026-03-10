import "../styles/pages/Home.css"

function Home() {
  const categories = [
    {
      id: 1,
      title: "Terme",
      icon: "bi-water",
      className: "category-card-blue",
    },
    {
      id: 2,
      title: "Ristoranti",
      icon: "bi-fork-knife",
      className: "category-card-orange",
    },
    {
      id: 3,
      title: "Hotel",
      icon: "bi-building",
      className: "category-card-lightblue",
    },
    {
      id: 4,
      title: "Parchi",
      icon: "bi-tree",
      className: "category-card-green",
    },
  ]

  const nearbyPlaces = [
    { id: 1, name: "Hotel Aurora", city: "Mestre", image: "" },
    { id: 2, name: "Terme di Abano", city: "Abano Terme", image: "" },
    { id: 3, name: "Pizzeria Al Vesuvio", city: "Napoli", image: "" },
    { id: 4, name: "Villa Borghese", city: "Roma", image: "" },
    { id: 5, name: "Parco Sempione", city: "Milano", image: "" },
    { id: 6, name: "Hotel Cristallo", city: "Cortina", image: "" },
    { id: 7, name: "Terme Sensoriali", city: "Chianciano", image: "" },
    { id: 8, name: "Ristorante Mare Blu", city: "Bari", image: "" },
    { id: 9, name: "Parco degli Ulivi", city: "Lecce", image: "" },
    { id: 10, name: "Hotel Olimpia", city: "Padova", image: "" },
  ]

  const infoCards = [
    {
      id: 1,
      title: "Cerca",
      text: "Trova locali e servizi accessibili vicino a te",
      icon: "bi-search",
      image: "",
    },
    {
      id: 2,
      title: "Recensisci",
      text: "Lascia una valutazione sui posti accessibili che hai visitato",
      icon: "bi-universal-access-circle",
      image: "",
    },
    {
      id: 3,
      title: "Condividi",
      text: "Aiuta gli altri condividendo informazioni utili e consigli",
      icon: "bi-chat-dots",
      image: "",
    },
  ]

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-overlay">
          <div className="home-hero-content">
            <h1>Trova e recensisci locali accessibili</h1>
            <p>
              Scopri e condividi i migliori luoghi accessibili per persone con
              disabilità
            </p>

            <div className="home-main-search">
              <div className="home-main-search-input">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Cerca luoghi accessibili" />
              </div>
              <button>Cerca</button>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-header">
          <h2>Categorie popolari</h2>
          <span>
            Più popolare <i className="bi bi-chevron-right"></i>
          </span>
        </div>

        <div className="home-categories-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-card ${category.className}`}
            >
              <i className={`bi ${category.icon}`}></i>
              <h3>{category.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2 className="home-big-title">I più accessibili vicino a te</h2>

        <div className="home-carousel">
          {nearbyPlaces.map((place) => (
            <div key={place.id} className="place-card">
              <div className="place-card-image">
                {place.image ? (
                  <img src={place.image} alt={place.name} />
                ) : (
                  <div className="image-placeholder">
                    <i className="bi bi-image"></i>
                    <span>Immagine</span>
                  </div>
                )}
              </div>

              <div className="place-card-body">
                <h3>{place.name}</h3>
                <p>{place.city}</p>

                <div className="place-card-icons">
                  <i className="bi bi-universal-access-circle"></i>
                  <i className="bi bi-universal-access-circle"></i>
                  <i className="bi bi-universal-access-circle"></i>
                  <i className="bi bi-universal-access-circle"></i>
                  <i className="bi bi-person-wheelchair"></i>
                  <span>4.5</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-info-section">
        <div className="home-info-text">
          <h2>Scopri luoghi accessibili e condividi le tue esperienze</h2>
          <p>
            SafeStep ti aiuta a trovare locali, terme, ristoranti e parchi
            accessibili, consentendoti di aggiungere recensioni e valutare i
            luoghi in base al loro livello di accessibilità. Unisciti alla
            nostra community e contribuisci a rendere il mondo più accessibile
          </p>
        </div>

        <div className="home-info-cards">
          {infoCards.map((card) => (
            <div key={card.id} className="info-card">
              <div className="info-card-top">
                <i className={`bi ${card.icon}`}></i>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </div>

              <div className="info-card-image">
                {card.image ? (
                  <img src={card.image} alt={card.title} />
                ) : (
                  <div className="image-placeholder info-placeholder">
                    <i className="bi bi-image"></i>
                    <span>Immagine</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
