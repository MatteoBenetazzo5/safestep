package matteobenetazzo.safestepbackend.services;

import jakarta.validation.Valid;
import matteobenetazzo.safestepbackend.entities.Profilo;
import matteobenetazzo.safestepbackend.exceptions.NotFoundException;
import matteobenetazzo.safestepbackend.payloads.ProfiloCreateDTO;
import matteobenetazzo.safestepbackend.repositories.ProfiloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProfiliService {

    @Autowired
    private ProfiloRepository profiloRepository;

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

    public Profilo save(@Valid ProfiloCreateDTO profilo) {
        return this.profiloRepository.save(profilo);
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
