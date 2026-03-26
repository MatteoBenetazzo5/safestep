package matteobenetazzo.safestepbackend.services;

import matteobenetazzo.safestepbackend.entities.Struttura;
import matteobenetazzo.safestepbackend.entities.StrutturaSalvata;
import matteobenetazzo.safestepbackend.entities.Utente;
import matteobenetazzo.safestepbackend.exceptions.NotFoundException;
import matteobenetazzo.safestepbackend.payloads.StrutturaSalvataCreateDTO;
import matteobenetazzo.safestepbackend.repositories.StrutturaRepository;
import matteobenetazzo.safestepbackend.repositories.StrutturaSalvataRepository;
import matteobenetazzo.safestepbackend.repositories.UtenteRepository;
import matteobenetazzo.safestepbackend.security.SecurityUtils;
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

    @Autowired
    private SecurityUtils securityUtils;

    public List<StrutturaSalvata> findAll() {
        return this.strutturaSalvataRepository.findAll();
    }

    public StrutturaSalvata findById(UUID idStrutturaSalvata) {
        StrutturaSalvata found = this.strutturaSalvataRepository.findById(idStrutturaSalvata)
                .orElseThrow(() -> new NotFoundException("Struttura salvata con id " + idStrutturaSalvata + " non trovata"));

        this.securityUtils.checkOwnerOrAdmin(found.getUtente());

        return found;
    }

    public List<StrutturaSalvata> findByUtente(UUID idUtente) {
        Utente utente = this.utenteRepository.findById(idUtente)
                .orElseThrow(() -> new NotFoundException("Utente non trovato"));

        this.securityUtils.checkOwnerOrAdmin(utente);

        return this.strutturaSalvataRepository.findByUtente_IdUtente(idUtente);
    }

    public List<StrutturaSalvata> findMine() {
        Utente utenteAutenticato = this.securityUtils.getCurrentAuthenticatedUser();
        return this.strutturaSalvataRepository.findByUtente_IdUtente(utenteAutenticato.getIdUtente());
    }

    public StrutturaSalvata save(StrutturaSalvataCreateDTO body) {
        Utente utenteAutenticato = this.securityUtils.getCurrentAuthenticatedUser();

        Struttura struttura = this.strutturaRepository.findById(body.strutturaId())
                .orElseThrow(() -> new NotFoundException("Struttura non trovata"));

        boolean esisteGia = this.strutturaSalvataRepository
                .existsByUtente_IdUtenteAndStruttura_IdStruttura(
                        utenteAutenticato.getIdUtente(),
                        body.strutturaId()
                );

        if (esisteGia) {
            throw new IllegalArgumentException("Struttura gia salvata da questo utente");
        }

        StrutturaSalvata nuovaStrutturaSalvata = new StrutturaSalvata(
                utenteAutenticato,
                struttura
        );

        return this.strutturaSalvataRepository.save(nuovaStrutturaSalvata);
    }

    public void removeByUtenteAndStruttura(UUID idUtente, UUID idStruttura) {
        Utente utente = this.utenteRepository.findById(idUtente)
                .orElseThrow(() -> new NotFoundException("Utente non trovato"));

        this.securityUtils.checkOwnerOrAdmin(utente);

        this.strutturaSalvataRepository.deleteByUtente_IdUtenteAndStruttura_IdStruttura(idUtente, idStruttura);
    }

    public void removeMineByStruttura(UUID idStruttura) {
        Utente utenteAutenticato = this.securityUtils.getCurrentAuthenticatedUser();

        this.strutturaSalvataRepository.deleteByUtente_IdUtenteAndStruttura_IdStruttura(
                utenteAutenticato.getIdUtente(),
                idStruttura
        );
    }

    public void findByIdAndDelete(UUID idStrutturaSalvata) {
        StrutturaSalvata found = this.strutturaSalvataRepository.findById(idStrutturaSalvata)
                .orElseThrow(() -> new NotFoundException("Struttura salvata con id " + idStrutturaSalvata + " non trovata"));

        this.securityUtils.checkOwnerOrAdmin(found.getUtente());

        this.strutturaSalvataRepository.delete(found);
    }
}
