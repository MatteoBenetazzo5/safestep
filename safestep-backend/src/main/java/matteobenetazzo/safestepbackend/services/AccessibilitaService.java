package matteobenetazzo.safestepbackend.services;

import jakarta.validation.Valid;
import matteobenetazzo.safestepbackend.entities.Accessibilita;
import matteobenetazzo.safestepbackend.exceptions.NotFoundException;
import matteobenetazzo.safestepbackend.payloads.AccessibilitaCreateDTO;
import matteobenetazzo.safestepbackend.repositories.AccessibilitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AccessibilitaService {

    @Autowired
    private AccessibilitaRepository accessibilitaRepository;

    public List<Accessibilita> findAll() {
        return this.accessibilitaRepository.findAll();
    }

    public Accessibilita findById(UUID idAccessibilita) {
        return this.accessibilitaRepository.findById(idAccessibilita)
                .orElseThrow(() -> new NotFoundException("Accessibilita con id " + idAccessibilita + " non trovata"));
    }

    public List<Accessibilita> findByStruttura(UUID idStruttura) {
        return this.accessibilitaRepository.findByStruttura_IdStruttura(idStruttura);
    }

    public Accessibilita save(@Valid AccessibilitaCreateDTO accessibilita) {
        return this.accessibilitaRepository.save(accessibilita);
    }

    public Accessibilita findByIdAndUpdate(UUID idAccessibilita, Accessibilita body) {
        Accessibilita found = this.findById(idAccessibilita);

        found.setValore(body.getValore());
        found.setNota(body.getNota());

        return this.accessibilitaRepository.save(found);
    }

    public void findByIdAndDelete(UUID idAccessibilita) {
        Accessibilita found = this.findById(idAccessibilita);
        this.accessibilitaRepository.delete(found);
    }
}