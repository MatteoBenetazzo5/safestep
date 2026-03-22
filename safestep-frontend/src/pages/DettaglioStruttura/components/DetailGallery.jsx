import "../styles/DetailGallery.css"

function DetailGallery({
  structure,
  selectedImage,
  placeholderImage,
  allGalleryImages,
  setSelectedImage,
}) {
  const currentIndex = allGalleryImages.findIndex(
    (image) => image.url === selectedImage,
  )

  const safeCurrentIndex = currentIndex >= 0 ? currentIndex : 0

  const handlePrevImage = () => {
    if (allGalleryImages.length === 0) return

    const newIndex =
      safeCurrentIndex === 0
        ? allGalleryImages.length - 1
        : safeCurrentIndex - 1

    setSelectedImage(allGalleryImages[newIndex].url)
  }

  const handleNextImage = () => {
    if (allGalleryImages.length === 0) return

    const newIndex =
      safeCurrentIndex === allGalleryImages.length - 1
        ? 0
        : safeCurrentIndex + 1

    setSelectedImage(allGalleryImages[newIndex].url)
  }

  return (
    <div className="detail-gallery-column">
      <div className="detail-main-image-card">
        <img
          src={selectedImage || placeholderImage}
          alt={structure.nome}
          className="detail-main-image"
        />

        {allGalleryImages.length > 1 && (
          <>
            <button
              type="button"
              className="detail-gallery-arrow detail-gallery-arrow-left"
              onClick={handlePrevImage}
              aria-label="Immagine precedente"
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            <button
              type="button"
              className="detail-gallery-arrow detail-gallery-arrow-right"
              onClick={handleNextImage}
              aria-label="Immagine successiva"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </>
        )}

        <div className="detail-gallery-counter">
          {safeCurrentIndex + 1} / {allGalleryImages.length}
        </div>
      </div>

      <div className="detail-thumbnails">
        {allGalleryImages.map((image) => (
          <button
            key={image.id}
            type="button"
            className={`detail-thumbnail-button ${
              selectedImage === image.url ? "active" : ""
            }`}
            onClick={() => setSelectedImage(image.url)}
          >
            <img src={image.url} alt="Anteprima struttura" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default DetailGallery
