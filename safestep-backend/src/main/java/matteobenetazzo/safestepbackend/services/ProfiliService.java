package matteobenetazzo.safestepbackend.services;

import matteobenetazzo.safestepbackend.entities.Profilo;
import matteobenetazzo.safestepbackend.entities.Utente;
import matteobenetazzo.safestepbackend.exceptions.NotFoundException;
import matteobenetazzo.safestepbackend.payloads.ProfiloCreateDTO;
import matteobenetazzo.safestepbackend.repositories.ProfiloRepository;
import matteobenetazzo.safestepbackend.repositories.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProfiliService {

    @Autowired
    private ProfiloRepository profiloRepository;

    @Autowired
    private UtenteRepository utenteRepository;

    public List<Profilo> findAll() {
        return this.profiloRepository.findAll();
    }

    public Profilo findById(UUID idProfilo) {
        return this.profiloRepository.findById(idProfilo)
                .orElseThrow(() -> new NotFoundException("Profilo con id " + idProfilo + " non trovato"));
    }

    public Profilo findByUtente(UUID idUtente) {
        return this.profiloRepository.findByUtente_IdUtente(idUtente)
                .orElseThrow(() -> new NotFoundException("Profilo utente non trovato"));
    }

    public Profilo save(ProfiloCreateDTO body) {
        Utente utente = this.utenteRepository.findById(body.utenteId())
                .orElseThrow(() -> new NotFoundException("Utente non trovato"));

        boolean esisteGia = this.profiloRepository.existsByUtente_IdUtente(body.utenteId());

        if (esisteGia) {
            throw new IllegalArgumentException("Questo utente ha gia un profilo");
        }

        Profilo nuovoProfilo = new Profilo(
                utente,
                body.tipoMobilita(),
                body.note()
        );

        nuovoProfilo.setColoreTema(body.coloreTema());

        return this.profiloRepository.save(nuovoProfilo);
    }

    public Profilo findByIdAndUpdate(UUID idProfilo, Profilo body) {
        Profilo found = this.findById(idProfilo);

        found.setTipoMobilita(body.getTipoMobilita());
        found.setNote(body.getNote());
        found.setColoreTema(body.getColoreTema());

        return this.profiloRepository.save(found);
    }

    public void findByIdAndDelete(UUID idProfilo) {
        Profilo found = this.findById(idProfilo);
        this.profiloRepository.delete(found);
    }
}
