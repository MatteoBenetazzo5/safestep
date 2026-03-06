package matteobenetazzo.safestepbackend.services;

import matteobenetazzo.safestepbackend.entities.Caratteristica;
import matteobenetazzo.safestepbackend.exceptions.NotFoundException;
import matteobenetazzo.safestepbackend.repositories.CaratteristicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CaratteristicheService {

    @Autowired
    private CaratteristicaRepository caratteristicaRepository;

    public List<Caratteristica> findAll() {
        return this.caratteristicaRepository.findAll();
    }

    public Caratteristica findById(UUID idCaratteristica) {
        return this.caratteristicaRepository.findById(idCaratteristica)
                .orElseThrow(() -> new NotFoundException("Caratteristica con id " + idCaratteristica + " non trovata"));
    }

    public Caratteristica findByCodice(String codice) {
        return this.caratteristicaRepository.findByCodice(codice)
                .orElseThrow(() -> new NotFoundException("Caratteristica con codice " + codice + " non trovata"));
    }

    public Caratteristica save(Caratteristica caratteristica) {
        return this.caratteristicaRepository.save(caratteristica);
    }

    public Caratteristica findByIdAndUpdate(UUID idCaratteristica, Caratteristica body) {
        Caratteristica found = this.findById(idCaratteristica);

        found.setCodice(body.getCodice());
        found.setEtichetta(body.getEtichetta());

        return this.caratteristicaRepository.save(found);
    }

    public void findByIdAndDelete(UUID idCaratteristica) {
        Caratteristica found = this.findById(idCaratteristica);
        this.caratteristicaRepository.delete(found);
    }
}
