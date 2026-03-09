package matteobenetazzo.safestepbackend.services;

import matteobenetazzo.safestepbackend.entities.Struttura;
import matteobenetazzo.safestepbackend.entities.StrutturaSalvata;
import matteobenetazzo.safestepbackend.entities.Utente;
import matteobenetazzo.safestepbackend.exceptions.NotFoundException;
import matteobenetazzo.safestepbackend.payloads.StrutturaSalvataCreateDTO;
import matteobenetazzo.safestepbackend.repositories.StrutturaRepository;
import matteobenetazzo.safestepbackend.repositories.StrutturaSalvataRepository;
import matteobenetazzo.safestepbackend.repositories.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class StruttureSalvateService {

    @Autowired
    private StrutturaSalvataRepository strutturaSalvataRepository;

    @Autowired
    private UtenteRepository utenteRepository;

    @Autowired
    private StrutturaRepository strutturaRepository;

    public List<StrutturaSalvata> findAll() {
        return this.strutturaSalvataRepository.findAll();
    }

    public StrutturaSalvata findById(UUID idStrutturaSalvata) {
        return this.strutturaSalvataRepository.findById(idStrutturaSalvata)
                .orElseThrow(() -> new NotFoundException("Struttura salvata con id " + idStrutturaSalvata + " non trovata"));
    }

    public List<StrutturaSalvata> findByUtente(UUID idUtente) {
        return this.strutturaSalvataRepository.findByUtente_IdUtente(idUtente);
    }

    public StrutturaSalvata save(StrutturaSalvataCreateDTO body) {
        Utente utente = this.utenteRepository.findById(body.utenteId())
                .orElseThrow(() -> new NotFoundException("Utente non trovato"));

        Struttura struttura = this.strutturaRepository.findById(body.strutturaId())
                .orElseThrow(() -> new NotFoundException("Struttura non trovata"));

        boolean esisteGia = this.strutturaSalvataRepository
                .existsByUtente_IdUtenteAndStruttura_IdStruttura(
                        body.utenteId(),
                        body.strutturaId()
                );

        if (esisteGia) {
            throw new IllegalArgumentException("Struttura gia salvata da questo utente");
        }

        StrutturaSalvata nuovaStrutturaSalvata = new StrutturaSalvata(
                utente,
                struttura
        );

        return this.strutturaSalvataRepository.save(nuovaStrutturaSalvata);
    }

    public void removeByUtenteAndStruttura(UUID idUtente, UUID idStruttura) {
        this.strutturaSalvataRepository.deleteByUtente_IdUtenteAndStruttura_IdStruttura(idUtente, idStruttura);
    }

    public void findByIdAndDelete(UUID idStrutturaSalvata) {
        StrutturaSalvata found = this.findById(idStrutturaSalvata);
        this.strutturaSalvataRepository.delete(found);
    }
}
