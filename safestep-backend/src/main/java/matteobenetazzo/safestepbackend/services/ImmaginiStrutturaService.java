package matteobenetazzo.safestepbackend.services;

import jakarta.validation.Valid;
import matteobenetazzo.safestepbackend.entities.ImmagineStruttura;
import matteobenetazzo.safestepbackend.exceptions.NotFoundException;
import matteobenetazzo.safestepbackend.payloads.ImmagineStrutturaCreateDTO;
import matteobenetazzo.safestepbackend.repositories.ImmagineStrutturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ImmaginiStrutturaService {

    @Autowired
    private ImmagineStrutturaRepository immagineStrutturaRepository;

    public List<ImmagineStruttura> findAll() {
        return this.immagineStrutturaRepository.findAll();
    }

    public ImmagineStruttura findById(UUID idImmagineStruttura) {
        return this.immagineStrutturaRepository.findById(idImmagineStruttura)
                .orElseThrow(() -> new NotFoundException("Immagine struttura con id " + idImmagineStruttura + " non trovata"));
    }

    public List<ImmagineStruttura> findByStruttura(UUID idStruttura) {
        return this.immagineStrutturaRepository.findByStruttura_IdStruttura(idStruttura);
    }

    public ImmagineStruttura save(@Valid ImmagineStrutturaCreateDTO immagineStruttura) {
        return this.immagineStrutturaRepository.save(immagineStruttura);
    }

    public ImmagineStruttura findByIdAndUpdate(UUID idImmagineStruttura, ImmagineStruttura body) {
        ImmagineStruttura found = this.findById(idImmagineStruttura);

        found.setUrl(body.getUrl());
        found.setOrdineVisualizzazione(body.getOrdineVisualizzazione());
        found.setCopertina(body.isCopertina());

        return this.immagineStrutturaRepository.save(found);
    }

    public void findByIdAndDelete(UUID idImmagineStruttura) {
        ImmagineStruttura found = this.findById(idImmagineStruttura);
        this.immagineStrutturaRepository.delete(found);
    }
}
