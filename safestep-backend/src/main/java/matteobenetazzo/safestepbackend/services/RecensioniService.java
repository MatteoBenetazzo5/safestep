package matteobenetazzo.safestepbackend.services;

import matteobenetazzo.safestepbackend.entities.Recensione;
import matteobenetazzo.safestepbackend.entities.Struttura;
import matteobenetazzo.safestepbackend.entities.Utente;
import matteobenetazzo.safestepbackend.exceptions.NotFoundException;
import matteobenetazzo.safestepbackend.payloads.RecensioneCreateDTO;
import matteobenetazzo.safestepbackend.payloads.RecensioneUpdateDTO;
import matteobenetazzo.safestepbackend.repositories.RecensioneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RecensioniService {

    @Autowired
    private RecensioneRepository recensioneRepository;

    @Autowired
    private StruttureService struttureService;

    @Autowired
    private UtentiService utentiService;

    public List<Recensione> findAll() {
        return this.recensioneRepository.findAll();
    }

    public Recensione findById(UUID idRecensione) {
        return this.recensioneRepository.findById(idRecensione)
                .orElseThrow(() -> new NotFoundException("Recensione con id " + idRecensione + " non trovata"));
    }

    public List<Recensione> findByStruttura(UUID idStruttura) {
        return this.recensioneRepository.findByStruttura_IdStruttura(idStruttura);
    }

    public List<Recensione> findByUtente(UUID idUtente) {
        return this.recensioneRepository.findByUtente_IdUtente(idUtente);
    }

    public Recensione save(RecensioneCreateDTO body) {
        if (this.recensioneRepository.existsByUtente_IdUtenteAndStruttura_IdStruttura(body.utenteId(), body.strutturaId())) {
            throw new IllegalArgumentException("L'utente ha gia recensito questa struttura");
        }

        Struttura struttura = this.struttureService.findById(body.strutturaId());
        Utente utente = this.utentiService.findById(body.utenteId());

        Recensione nuovaRecensione = new Recensione(
                struttura,
                utente,
                body.voto(),
                body.testo()
        );

        return this.recensioneRepository.save(nuovaRecensione);
    }

    public Recensione findByIdAndUpdate(UUID idRecensione, RecensioneUpdateDTO body) {
        Recensione found = this.findById(idRecensione);

        found.setVoto(body.voto());
        found.setTesto(body.testo());

        return this.recensioneRepository.save(found);
    }

    public void findByIdAndDelete(UUID idRecensione) {
        Recensione found = this.findById(idRecensione);
        this.recensioneRepository.delete(found);
    }
}
