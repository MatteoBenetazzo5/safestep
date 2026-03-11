import { useParams } from "react-router-dom"
import "../styles/pages/DettaglioStruttura.css"
import mainImage from "../assets/images/terme-card-1.jpg"
import galleryImage2 from "../assets/images/terme-card-2.jpg"
import galleryImage3 from "../assets/images/terme-card-3.jpg"
import galleryImage4 from "../assets/images/terme-card-4.jpg"
import mapImage from "../assets/images/map-placeholder.jpg"
import avatar1 from "../assets/images/avatar-1.jpg"
import avatar2 from "../assets/images/avatar-2.jpg"

function DettaglioStruttura() {
  const { id } = useParams()

  const structures = {
    1: {
      name: "Hotel Terme Olympia",
      city: "Montegrotto Terme",
      category: "Hotel",
      rating: 4.6,
      heroImage: mainImage,
      gallery: [mainImage, galleryImage2, galleryImage3, galleryImage4],
    },
    2: {
      name: "Terme Sensoriali",
      city: "Chianciano Terme",
      category: "Terme",
      rating: 4.8,
      heroImage: galleryImage2,
      gallery: [galleryImage2, mainImage, galleryImage3, galleryImage4],
    },
    3: {
      name: "Terme di Abano",
      city: "Abano Terme",
      category: "Terme",
      rating: 4.7,
      heroImage: galleryImage3,
      gallery: [galleryImage3, mainImage, galleryImage2, galleryImage4],
    },
    4: {
      name: "Terme di Sirmione",
      city: "Sirmione",
      category: "Terme",
      rating: 4.9,
      heroImage: galleryImage4,
      gallery: [galleryImage4, mainImage, galleryImage2, galleryImage3],
    },
  }

  const selectedStructure = structures[id] || structures[1]

  const reviews = [
    {
      id: 1,
      name: "Marta Bianchi",
      city: "Padova",
      avatar: avatar1,
      rating: 4.6,
      text: "Esperienza fantastica! La piscina è accessibile con una sedia a rotelle e ci sono molte camere adatte. Il personale è stato molto gentile e disponibile. Torneremo sicuramente.",
      image: mainImage,
      likes: 56,
    },
    {
      id: 2,
      name: "Marco Rossi",
      city: "Verona",
      avatar: avatar2,
      rating: 4.4,
      text: "Struttura molto curata e facile da raggiungere. Ho apprezzato i percorsi senza barriere e la disponibilità del personale all'ingresso.",
      image: galleryImage2,
      likes: 34,
    },
  ]

  return (
    <div className="detail-page">
      <section
        className="detail-hero"
        style={{ backgroundImage: `url(${selectedStructure.heroImage})` }}
      >
        <div className="detail-hero-overlay">
          <div className="detail-hero-content">
            <div className="detail-breadcrumb">
              Home <i className="bi bi-chevron-right"></i>{" "}
              {selectedStructure.name}
            </div>

            <h1>{selectedStructure.name}</h1>

            <div className="detail-location-row">
              <span>
                <i className="bi bi-geo-alt-fill"></i> {selectedStructure.city}
              </span>

              <span className="detail-category-badge">
                {selectedStructure.rating} {selectedStructure.category}
              </span>
            </div>

            <div className="detail-action-buttons">
              <button className="detail-btn light-btn">
                <i className="bi bi-heart"></i> Salva
              </button>

              <button className="detail-btn blue-btn">Sito ufficiale</button>

              <button className="detail-btn circle-btn">
                <i className="bi bi-send-fill"></i>
              </button>

              <button className="detail-btn green-btn">Indicazioni</button>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-main-section">
        <div className="detail-top-layout">
          <div className="detail-gallery-column">
            <div className="detail-main-image-card">
              <img
                src={selectedStructure.gallery[0]}
                alt={selectedStructure.name}
              />

              <div className="detail-gallery-counter">1 / 5</div>
            </div>

            <div className="detail-thumbnails">
              <img src={selectedStructure.gallery[1]} alt="Anteprima 1" />
              <img src={selectedStructure.gallery[2]} alt="Anteprima 2" />
              <img src={selectedStructure.gallery[3]} alt="Anteprima 3" />
            </div>
          </div>

          <div className="detail-side-column">
            <div className="detail-rating-card">
              <h3>Valutazioni e recensioni</h3>

              <div className="detail-big-rating">
                <div className="wheelchair-icons">
                  <i className="bi bi-person-wheelchair"></i>
                  <i className="bi bi-person-wheelchair"></i>
                  <i className="bi bi-person-wheelchair"></i>
                  <i className="bi bi-person-wheelchair"></i>
                  <i className="bi bi-person-wheelchair"></i>
                </div>

                <div className="rating-number">
                  {selectedStructure.rating} / 5
                </div>
              </div>

              <div className="rating-bars">
                <div className="rating-bar-row">
                  <span>5</span>
                  <div className="bar">
                    <div className="bar-fill fill-77"></div>
                  </div>
                  <span>77%</span>
                </div>

                <div className="rating-bar-row">
                  <span>4</span>
                  <div className="bar">
                    <div className="bar-fill fill-15"></div>
                  </div>
                  <span>15%</span>
                </div>

                <div className="rating-bar-row">
                  <span>3</span>
                  <div className="bar">
                    <div className="bar-fill fill-4"></div>
                  </div>
                  <span>4%</span>
                </div>

                <div className="rating-bar-row">
                  <span>2</span>
                  <div className="bar">
                    <div className="bar-fill fill-2"></div>
                  </div>
                  <span>2%</span>
                </div>

                <div className="rating-bar-row">
                  <span>1</span>
                  <div className="bar">
                    <div className="bar-fill fill-1"></div>
                  </div>
                  <span>{"<1%"}</span>
                </div>
              </div>

              <button className="follow-button">Segui il rilievo</button>
            </div>

            <div className="detail-mini-review-card">
              <img src={avatar1} alt="utente" />

              <div>
                <h4>Marta Bianchi</h4>
                <p>Padova</p>

                <div className="mini-review-rating">
                  <div className="wheelchair-icons small-icons">
                    <i className="bi bi-person-wheelchair"></i>
                    <i className="bi bi-person-wheelchair"></i>
                    <i className="bi bi-person-wheelchair"></i>
                    <i className="bi bi-person-wheelchair"></i>
                    <i className="bi bi-person-wheelchair"></i>
                  </div>

                  <span>4.6 / 5</span>
                </div>
              </div>

              <i className="bi bi-check-circle-fill verified-icon"></i>
            </div>
          </div>
        </div>

        <div className="detail-bottom-layout">
          <div className="detail-info-column">
            <div className="info-box">
              <h2>Informazioni</h2>

              <img src={mapImage} alt="Mappa struttura" className="map-image" />

              <p className="address-line">
                <i className="bi bi-geo-alt-fill"></i> Via Agordat, 4, 35036
                Montegrotto Terme PD
              </p>

              <div className="accessibility-block">
                <h3>
                  <i className="bi bi-person-wheelchair"></i> Livello di
                  accessibilità
                </h3>

                <div className="accessibility-rating-row">
                  <div className="wheelchair-icons">
                    <i className="bi bi-person-wheelchair"></i>
                    <i className="bi bi-person-wheelchair"></i>
                    <i className="bi bi-person-wheelchair"></i>
                    <i className="bi bi-person-wheelchair"></i>
                    <i className="bi bi-person-wheelchair"></i>
                  </div>

                  <span>{selectedStructure.rating} / 5</span>
                </div>

                <ul className="accessibility-list">
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Piscina con
                    accesso facilitato
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Camere
                    attrezzate
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i> Bagni spaziosi
                  </li>
                </ul>
              </div>
            </div>

            <div className="comments-box">
              <h2>Commentari (304)</h2>

              <div className="comment-preview-card">
                <div className="comment-user-row">
                  <img src={avatar2} alt="utente" />

                  <div>
                    <h4>Marta Bianchi</h4>
                    <p>Padova</p>

                    <div className="mini-review-rating">
                      <div className="wheelchair-icons small-icons">
                        <i className="bi bi-person-wheelchair"></i>
                        <i className="bi bi-person-wheelchair"></i>
                        <i className="bi bi-person-wheelchair"></i>
                        <i className="bi bi-person-wheelchair"></i>
                        <i className="bi bi-person-wheelchair"></i>
                      </div>

                      <span>4.8 / 5</span>
                    </div>
                  </div>
                </div>

                <img
                  src={galleryImage3}
                  alt="commento visuale"
                  className="comment-preview-image"
                />
              </div>
            </div>
          </div>

          <div className="detail-reviews-column">
            <div className="review-form-box">
              <h2>Valutazioni e recensioni</h2>
              <p>Condividi la tua esperienza con questo luogo!</p>

              <div className="review-input-card">
                <div className="review-user-header">
                  <div className="review-user-info">
                    <img src={avatar2} alt="Matteo" />
                    <div>
                      <h4>Matteo</h4>
                      <div className="wheelchair-icons small-icons">
                        <i className="bi bi-person-wheelchair"></i>
                        <i className="bi bi-person-wheelchair"></i>
                        <i className="bi bi-person-wheelchair"></i>
                        <i className="bi bi-person-wheelchair"></i>
                        <i className="bi bi-person-wheelchair"></i>
                      </div>
                    </div>
                  </div>

                  <button className="upload-photo-button">
                    <i className="bi bi-camera-fill"></i> Carica foto
                  </button>
                </div>

                <textarea placeholder="Scrivi la tua recensione"></textarea>

                <div className="review-form-footer">
                  <div className="review-upload-preview"></div>

                  <div className="review-actions">
                    <button>
                      <i className="bi bi-hand-thumbs-up-fill"></i>
                    </button>
                    <button>Rispondi</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="reviews-list-box">
              <div className="reviews-pagination">
                <button className="active-page">1</button>
                <button>2</button>
                <button>3</button>
                <button>...</button>
                <button>5</button>
              </div>

              {reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-card-header">
                    <div className="review-card-user">
                      <img src={review.avatar} alt={review.name} />
                      <div>
                        <div className="review-name-row">
                          <h4>{review.name}</h4>
                          <span>{review.city}</span>
                        </div>

                        <div className="mini-review-rating">
                          <div className="wheelchair-icons small-icons">
                            <i className="bi bi-person-wheelchair"></i>
                            <i className="bi bi-person-wheelchair"></i>
                            <i className="bi bi-person-wheelchair"></i>
                            <i className="bi bi-person-wheelchair"></i>
                            <i className="bi bi-person-wheelchair"></i>
                          </div>

                          <span>{review.rating} / 5</span>
                        </div>
                      </div>
                    </div>

                    <div className="review-donations">3 doni</div>
                  </div>

                  <p className="review-text">{review.text}</p>

                  <img
                    src={review.image}
                    alt="review"
                    className="review-image"
                  />

                  <div className="review-bottom-row">
                    <button>
                      <i className="bi bi-hand-thumbs-up"></i> {review.likes}
                    </button>
                    <button>Rispondi</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DettaglioStruttura
