package matteobenetazzo.safestepbackend.services;

import matteobenetazzo.safestepbackend.entities.Struttura;
import matteobenetazzo.safestepbackend.entities.Utente;
import matteobenetazzo.safestepbackend.exceptions.NotFoundException;
import matteobenetazzo.safestepbackend.payloads.StrutturaCreateDTO;
import matteobenetazzo.safestepbackend.payloads.StrutturaUpdateDTO;
import matteobenetazzo.safestepbackend.repositories.StrutturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class StruttureService {

    @Autowired
    private StrutturaRepository strutturaRepository;

    @Autowired
    private UtentiService utentiService;

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

    public Struttura save(StrutturaCreateDTO body) {
        if (this.strutturaRepository.existsByNomeAndIndirizzo(body.nome(), body.indirizzo())) {
            throw new IllegalArgumentException("Esiste gia una struttura con questo nome e indirizzo");
        }

        Utente creatore = this.utentiService.findById(body.creataDaId());

        Struttura nuovaStruttura = new Struttura(
                body.categoria(),
                body.nome(),
                body.descrizione(),
                body.indirizzo(),
                body.citta(),
                body.paese(),
                body.telefono(),
                body.sitoWeb(),
                body.immagineCopertina(),
                body.stato(),
                creatore
        );

        nuovaStruttura.setLatitudine(body.latitudine());
        nuovaStruttura.setLongitudine(body.longitudine());

        return this.strutturaRepository.save(nuovaStruttura);
    }

    public Struttura findByIdAndUpdate(UUID idStruttura, StrutturaUpdateDTO body) {
        Struttura found = this.findById(idStruttura);

        found.setCategoria(body.categoria());
        found.setNome(body.nome());
        found.setDescrizione(body.descrizione());
        found.setIndirizzo(body.indirizzo());
        found.setCitta(body.citta());
        found.setPaese(body.paese());
        found.setTelefono(body.telefono());
        found.setSitoWeb(body.sitoWeb());
        found.setImmagineCopertina(body.immagineCopertina());
        found.setLatitudine(body.latitudine());
        found.setLongitudine(body.longitudine());
        found.setStato(body.stato());

        return this.strutturaRepository.save(found);
    }

    public void findByIdAndDelete(UUID idStruttura) {
        Struttura found = this.findById(idStruttura);
        this.strutturaRepository.delete(found);
    }
}
