import "../styles/DetailGallery.css"

function DetailGallery({
  structure,
  selectedImage,
  placeholderImage,
  allGalleryImages,
  setSelectedImage,
}) {
  return (
    <div className="detail-gallery-column">
      <div className="detail-main-image-card">
        <img
          src={selectedImage || placeholderImage}
          alt={structure.nome}
          className="detail-main-image"
        />

        <div className="detail-gallery-counter">
          1 / {allGalleryImages.length}
        </div>
      </div>

      <div className="detail-thumbnails">
        {allGalleryImages.slice(0, 3).map((image) => (
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
