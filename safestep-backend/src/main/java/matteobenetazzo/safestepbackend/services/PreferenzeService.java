package matteobenetazzo.safestepbackend.services;

import matteobenetazzo.safestepbackend.entities.Preferenza;
import matteobenetazzo.safestepbackend.exceptions.NotFoundException;
import matteobenetazzo.safestepbackend.repositories.PreferenzaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PreferenzeService {

    @Autowired
    private PreferenzaRepository preferenzaRepository;

    public List<Preferenza> findAll() {
        return this.preferenzaRepository.findAll();
    }

    public Preferenza findById(UUID idPreferenza) {
        return this.preferenzaRepository.findById(idPreferenza)
                .orElseThrow(() -> new NotFoundException("Preferenza con id " + idPreferenza + " non trovata"));
    }

    public List<Preferenza> findByUtente(UUID idUtente) {
        return this.preferenzaRepository.findByUtente_IdUtente(idUtente);
    }

    public Preferenza save(Preferenza preferenza) {
        return this.preferenzaRepository.save(preferenza);
    }

    public Preferenza findByIdAndUpdate(UUID idPreferenza, Preferenza body) {
        Preferenza found = this.findById(idPreferenza);

        found.setLivelloPreferenza(body.getLivelloPreferenza());

        return this.preferenzaRepository.save(found);
    }

    public void findByIdAndDelete(UUID idPreferenza) {
        Preferenza found = this.findById(idPreferenza);
        this.preferenzaRepository.delete(found);
    }
}