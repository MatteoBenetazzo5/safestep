package matteobenetazzo.safestepbackend.services;

import matteobenetazzo.safestepbackend.entities.ImmagineStruttura;
import matteobenetazzo.safestepbackend.entities.Struttura;
import matteobenetazzo.safestepbackend.exceptions.NotFoundException;
import matteobenetazzo.safestepbackend.payloads.ImmagineStrutturaCreateDTO;
import matteobenetazzo.safestepbackend.repositories.ImmagineStrutturaRepository;
import matteobenetazzo.safestepbackend.repositories.StrutturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ImmaginiStrutturaService {

    @Autowired
    private ImmagineStrutturaRepository immagineStrutturaRepository;

    @Autowired
    private StrutturaRepository strutturaRepository;

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

    public ImmagineStruttura save(ImmagineStrutturaCreateDTO body) {
        Struttura struttura = this.strutturaRepository.findById(body.strutturaId())
                .orElseThrow(() -> new NotFoundException("Struttura non trovata"));

        ImmagineStruttura nuovaImmagine = new ImmagineStruttura(
                struttura,
                body.url(),
                body.ordineVisualizzazione(),
                body.copertina()
        );

        return this.immagineStrutturaRepository.save(nuovaImmagine);
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
