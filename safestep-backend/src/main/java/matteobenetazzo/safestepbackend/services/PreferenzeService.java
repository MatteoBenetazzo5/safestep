package matteobenetazzo.safestepbackend.services;

import matteobenetazzo.safestepbackend.entities.Caratteristica;
import matteobenetazzo.safestepbackend.entities.Preferenza;
import matteobenetazzo.safestepbackend.entities.Utente;
import matteobenetazzo.safestepbackend.exceptions.NotFoundException;
import matteobenetazzo.safestepbackend.payloads.PreferenzaCreateDTO;
import matteobenetazzo.safestepbackend.repositories.CaratteristicaRepository;
import matteobenetazzo.safestepbackend.repositories.PreferenzaRepository;
import matteobenetazzo.safestepbackend.repositories.UtenteRepository;
import matteobenetazzo.safestepbackend.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PreferenzeService {

    @Autowired
    private PreferenzaRepository preferenzaRepository;

    @Autowired
    private UtenteRepository utenteRepository;

    @Autowired
    private CaratteristicaRepository caratteristicaRepository;

    @Autowired
    private SecurityUtils securityUtils;

    public List<Preferenza> findAll() {
        return this.preferenzaRepository.findAll();
    }

    public Preferenza findById(UUID idPreferenza) {
        Preferenza found = this.preferenzaRepository.findById(idPreferenza)
                .orElseThrow(() -> new NotFoundException("Preferenza con id " + idPreferenza + " non trovata"));

        this.securityUtils.checkOwnerOrAdmin(found.getUtente());

        return found;
    }

    public List<Preferenza> findByUtente(UUID idUtente) {
        Utente utente = this.utenteRepository.findById(idUtente)
                .orElseThrow(() -> new NotFoundException("Utente non trovato"));

        this.securityUtils.checkOwnerOrAdmin(utente);

        return this.preferenzaRepository.findByUtente_IdUtente(idUtente);
    }

    public List<Preferenza> findMine() {
        Utente utenteAutenticato = this.securityUtils.getCurrentAuthenticatedUser();
        return this.preferenzaRepository.findByUtente_IdUtente(utenteAutenticato.getIdUtente());
    }

    public Preferenza save(PreferenzaCreateDTO body) {
        Utente utenteAutenticato = this.securityUtils.getCurrentAuthenticatedUser();

        Caratteristica caratteristica = this.caratteristicaRepository.findById(body.caratteristicaId())
                .orElseThrow(() -> new NotFoundException("Caratteristica non trovata"));

        boolean esisteGia = this.preferenzaRepository
                .existsByUtente_IdUtenteAndCaratteristica_IdCaratteristiche(
                        utenteAutenticato.getIdUtente(),
                        body.caratteristicaId()
                );

        if (esisteGia) {
            throw new IllegalArgumentException("Preferenza gia presente per questo utente e caratteristica");
        }

        Preferenza nuovaPreferenza = new Preferenza(
                utenteAutenticato,
                caratteristica,
                body.livelloPreferenza()
        );

        return this.preferenzaRepository.save(nuovaPreferenza);
    }

    public Preferenza findByIdAndUpdate(UUID idPreferenza, Preferenza body) {
        Preferenza found = this.findById(idPreferenza);

        this.securityUtils.checkOwnerOrAdmin(found.getUtente());

        found.setLivelloPreferenza(body.getLivelloPreferenza());

        return this.preferenzaRepository.save(found);
    }

    public void findByIdAndDelete(UUID idPreferenza) {
        Preferenza found = this.findById(idPreferenza);

        this.securityUtils.checkOwnerOrAdmin(found.getUtente());

        this.preferenzaRepository.delete(found);
    }
}