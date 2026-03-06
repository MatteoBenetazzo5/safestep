package matteobenetazzo.safestepbackend.services;

import matteobenetazzo.safestepbackend.entities.Struttura;
import matteobenetazzo.safestepbackend.exceptions.NotFoundException;
import matteobenetazzo.safestepbackend.repositories.StrutturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class StruttureService {

    @Autowired
    private StrutturaRepository strutturaRepository;

    public List<Struttura> findAll() {
        return this.strutturaRepository.findAll();
    }

    public Struttura findById(UUID idStruttura) {
        return this.strutturaRepository.findById(idStruttura)
                .orElseThrow(() -> new NotFoundException("Struttura con id " + idStruttura + " non trovata"));
    }

    public List<Struttura> findByCategoria(String categoria) {
        return this.strutturaRepository.findByCategoria(categoria);
    }

    public List<Struttura> findByStato(String stato) {
        return this.strutturaRepository.findByStato(stato);
    }

    public List<Struttura> findByCreatore(UUID idUtente) {
        return this.strutturaRepository.findByCreataDa_IdUtente(idUtente);
    }

    public Struttura save(Struttura struttura) {
        return this.strutturaRepository.save(struttura);
    }

    public Struttura findByIdAndUpdate(UUID idStruttura, Struttura body) {
        Struttura found = this.findById(idStruttura);

        found.setCategoria(body.getCategoria());
        found.setNome(body.getNome());
        found.setDescrizione(body.getDescrizione());
        found.setIndirizzo(body.getIndirizzo());
        found.setCitta(body.getCitta());
        found.setPaese(body.getPaese());
        found.setTelefono(body.getTelefono());
        found.setSitoWeb(body.getSitoWeb());
        found.setImmagineCopertina(body.getImmagineCopertina());
        found.setLatitudine(body.getLatitudine());
        found.setLongitudine(body.getLongitudine());
        found.setStato(body.getStato());

        return this.strutturaRepository.save(found);
    }

    public void findByIdAndDelete(UUID idStruttura) {
        Struttura found = this.findById(idStruttura);
        this.strutturaRepository.delete(found);
    }
}
