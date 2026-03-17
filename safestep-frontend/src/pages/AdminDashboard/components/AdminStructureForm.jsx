import "../styles/AdminStructureForm.css"
function AdminStructureForm({
  editingId,
  formData,
  handleChange,
  handleImageChange,
  caratteristiche,
  accessibilitaForm,
  handleAccessibilitaChange,
  addAccessibilitaRow,
  removeAccessibilitaRow,
  handleCreateOrUpdateStructure,
  saving,
  resetForm,
}) {
  return (
    <form
      className="admin-side-card admin-structure-form"
      onSubmit={handleCreateOrUpdateStructure}
    >
      <h3>{editingId ? "Modifica struttura" : "Crea nuova struttura"}</h3>

      <div className="mb-3">
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label>Descrizione</label>
        <textarea
          name="descrizione"
          value={formData.descrizione}
          onChange={handleChange}
          className="form-control"
          rows="4"
        ></textarea>
      </div>

      <div className="mb-3">
        <label>Indirizzo</label>
        <input
          type="text"
          name="indirizzo"
          value={formData.indirizzo}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Città</label>
        <input
          type="text"
          name="citta"
          value={formData.citta}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Paese</label>
        <input
          type="text"
          name="paese"
          value={formData.paese}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Telefono</label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Sito Web</label>
        <input
          type="text"
          name="sitoWeb"
          value={formData.sitoWeb}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Latitudine</label>
        <input
          type="number"
          step="any"
          name="latitudine"
          value={formData.latitudine}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Longitudine</label>
        <input
          type="number"
          step="any"
          name="longitudine"
          value={formData.longitudine}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Stato</label>
        <select
          name="stato"
          value={formData.stato}
          onChange={handleChange}
          className="form-control"
        >
          <option value="APPROVATA">APPROVATA</option>
          <option value="BOZZA">BOZZA</option>
          <option value="IN_REVISIONE">IN_REVISIONE</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Immagine</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="form-control"
          accept="image/*"
        />
      </div>

      {formData.immagineCopertina && (
        <div className="mb-3">
          <img
            src={formData.immagineCopertina}
            alt="Anteprima"
            className="admin-form-preview-image"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="form-label fw-bold">Accessibilità struttura</label>

        {accessibilitaForm.map((item, index) => (
          <div key={index} className="admin-accessibilita-box">
            <div className="mb-3">
              <label>Caratteristica</label>
              <select
                className="form-control"
                value={item.caratteristicaId}
                onChange={(e) =>
                  handleAccessibilitaChange(
                    index,
                    "caratteristicaId",
                    e.target.value,
                  )
                }
              >
                <option value="">Seleziona caratteristica</option>

                {caratteristiche.map((caratteristica) => (
                  <option
                    key={caratteristica.idCaratteristiche}
                    value={caratteristica.idCaratteristiche}
                  >
                    {caratteristica.etichetta}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label>Valore</label>
              <input
                type="text"
                className="form-control"
                placeholder="Es. Presente"
                value={item.valore}
                onChange={(e) =>
                  handleAccessibilitaChange(index, "valore", e.target.value)
                }
              />
            </div>

            <div className="mb-3">
              <label>Nota</label>
              <input
                type="text"
                className="form-control"
                placeholder="Es. Ingresso senza gradini"
                value={item.nota}
                onChange={(e) =>
                  handleAccessibilitaChange(index, "nota", e.target.value)
                }
              />
            </div>

            {accessibilitaForm.length > 1 && (
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeAccessibilitaRow(index)}
              >
                Rimuovi riga
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={addAccessibilitaRow}
        >
          Aggiungi caratteristica
        </button>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="admin-add-button" disabled={saving}>
          {saving
            ? "Salvataggio..."
            : editingId
              ? "Aggiorna struttura"
              : "Salva struttura"}
        </button>

        {editingId && (
          <button type="button" className="delete-btn" onClick={resetForm}>
            Annulla modifica
          </button>
        )}
      </div>
    </form>
  )
}

export default AdminStructureForm
