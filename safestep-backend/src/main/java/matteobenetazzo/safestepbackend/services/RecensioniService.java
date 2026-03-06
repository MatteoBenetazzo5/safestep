package matteobenetazzo.safestepbackend.services;

import matteobenetazzo.safestepbackend.entities.Recensione;
import matteobenetazzo.safestepbackend.exceptions.NotFoundException;
import matteobenetazzo.safestepbackend.repositories.RecensioneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RecensioniService {

    @Autowired
    private RecensioneRepository recensioneRepository;

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

    public Recensione save(Recensione recensione) {
        return this.recensioneRepository.save(recensione);
    }

    public Recensione findByIdAndUpdate(UUID idRecensione, Recensione body) {
        Recensione found = this.findById(idRecensione);

        found.setVoto(body.getVoto());
        found.setTesto(body.getTesto());

        return this.recensioneRepository.save(found);
    }

    public void findByIdAndDelete(UUID idRecensione) {
        Recensione found = this.findById(idRecensione);
        this.recensioneRepository.delete(found);
    }
}
