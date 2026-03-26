package matteobenetazzo.safestepbackend.services;

import matteobenetazzo.safestepbackend.entities.Utente;
import matteobenetazzo.safestepbackend.exceptions.NotFoundException;
import matteobenetazzo.safestepbackend.payloads.UtenteUpdateDTO;
import matteobenetazzo.safestepbackend.repositories.UtenteRepository;
import matteobenetazzo.safestepbackend.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UtentiService {

    @Autowired
    private UtenteRepository utenteRepository;

    @Autowired
    private SecurityUtils securityUtils;

    public List<Utente> findAll() {
        if (!this.securityUtils.isAdmin()) {
            throw new IllegalArgumentException("Solo admin possono vedere tutti gli utenti");
        }

        return this.utenteRepository.findAll();
    }

    public Utente findById(UUID idUtente) {
        Utente found = this.utenteRepository.findById(idUtente)
                .orElseThrow(() -> new NotFoundException("Utente con id " + idUtente + " non trovato"));

        this.securityUtils.checkOwnerOrAdmin(found);

        return found;
    }

    public Utente findByEmail(String email) {
        return this.utenteRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Utente con email " + email + " non trovato"));
    }

    public Utente findMe() {
        return this.securityUtils.getCurrentAuthenticatedUser();
    }

    public Utente save(Utente utente) {
        return this.utenteRepository.save(utente);
    }

    public Utente findByIdAndUpdate(UUID idUtente, UtenteUpdateDTO body) {
        Utente found = this.findById(idUtente);

        this.securityUtils.checkOwnerOrAdmin(found);

        found.setEmail(body.email());
        found.setNomeVisualizzato(body.nomeVisualizzato());
        found.setTelefono(body.telefono());
        found.setAvatar(body.avatar());

        return this.utenteRepository.save(found);
    }

    public void findByIdAndDelete(UUID idUtente) {
        Utente found = this.findById(idUtente);

        this.securityUtils.checkOwnerOrAdmin(found);

        this.utenteRepository.delete(found);
    }
}
