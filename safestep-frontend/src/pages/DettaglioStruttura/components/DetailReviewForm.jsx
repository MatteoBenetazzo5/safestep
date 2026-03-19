import "../styles/DetailReviewForm.css"

function DetailReviewForm({
  idUtente,
  navigate,
  reviewForm,
  handleReviewChange,
  handleReviewSubmit,
  sendingReview,
  renderWheelchairs,
}) {
  return (
    <div className="review-form-box">
      <h2>Valutazioni e recensioni</h2>
      <p>Condividi la tua esperienza con questo luogo!</p>

      {!idUtente ? (
        <div className="review-login-box">
          <p>Effettua il login per scrivere una recensione.</p>

          <button
            type="button"
            className="review-submit-button"
            onClick={() => navigate("/login")}
          >
            Vai al login
          </button>
        </div>
      ) : (
        <form onSubmit={handleReviewSubmit} className="review-input-card">
          <div className="review-user-header">
            <div className="review-user-info">
              <div className="detail-mini-review-avatar big-avatar">
                <i className="bi bi-person-fill"></i>
              </div>

              <div>
                <h4>La tua recensione</h4>

                <div className="review-vote-selector">
                  <label>Voto</label>

                  <div className="review-wheelchair-selector">
                    {renderWheelchairs(reviewForm.voto, true)}
                    <span className="review-current-vote">
                      {Number(reviewForm.voto).toFixed(1)} / 5
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button type="button" className="upload-photo-button">
              <i className="bi bi-camera-fill"></i>
              Carica foto
            </button>
          </div>

          <textarea
            name="testo"
            value={reviewForm.testo}
            onChange={handleReviewChange}
            placeholder="Scrivi la tua recensione"
          ></textarea>

          <div className="review-form-footer">
            <div className="review-upload-preview"></div>

            <div className="review-actions">
              <button type="button">
                <i className="bi bi-circle-fill"></i>
              </button>

              <button type="button">
                <i className="bi bi-hand-thumbs-up-fill"></i>
              </button>

              <button
                type="submit"
                className="review-submit-button"
                disabled={sendingReview}
              >
                {sendingReview ? "Invio in corso..." : "Invia recensione"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default DetailReviewForm
