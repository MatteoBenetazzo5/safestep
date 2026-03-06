package matteobenetazzo.safestepbackend.services;

import matteobenetazzo.safestepbackend.entities.Utente;
import matteobenetazzo.safestepbackend.exceptions.NotFoundException;
import matteobenetazzo.safestepbackend.repositories.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UtentiService {

    @Autowired
    private UtenteRepository utenteRepository;

    public List<Utente> findAll() {
        return this.utenteRepository.findAll();
    }

    public Utente findById(UUID idUtente) {
        return this.utenteRepository.findById(idUtente)
                .orElseThrow(() -> new NotFoundException("Utente con id " + idUtente + " non trovato"));
    }

    public Utente findByEmail(String email) {
        return this.utenteRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Utente con email " + email + " non trovato"));
    }

    public Utente save(Utente utente) {
        return this.utenteRepository.save(utente);
    }

    public Utente findByIdAndUpdate(UUID idUtente, Utente body) {
        Utente found = this.findById(idUtente);

        found.setEmail(body.getEmail());
        found.setNomeVisualizzato(body.getNomeVisualizzato());
        found.setTelefono(body.getTelefono());
        found.setAvatar(body.getAvatar());
        found.setRuolo(body.getRuolo());

        return this.utenteRepository.save(found);
    }

    public void findByIdAndDelete(UUID idUtente) {
        Utente found = this.findById(idUtente);
        this.utenteRepository.delete(found);
    }
}
