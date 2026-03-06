package matteobenetazzo.safestepbackend.services;

import matteobenetazzo.safestepbackend.entities.StrutturaSalvata;
import matteobenetazzo.safestepbackend.exceptions.NotFoundException;
import matteobenetazzo.safestepbackend.repositories.StrutturaSalvataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class StruttureSalvateService {

    @Autowired
    private StrutturaSalvataRepository strutturaSalvataRepository;

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

    public StrutturaSalvata save(StrutturaSalvata strutturaSalvata) {
        return this.strutturaSalvataRepository.save(strutturaSalvata);
    }

    public void removeByUtenteAndStruttura(UUID idUtente, UUID idStruttura) {
        this.strutturaSalvataRepository.deleteByUtente_IdUtenteAndStruttura_IdStruttura(idUtente, idStruttura);
    }

    public void findByIdAndDelete(UUID idStrutturaSalvata) {
        StrutturaSalvata found = this.findById(idStrutturaSalvata);
        this.strutturaSalvataRepository.delete(found);
    }
}
