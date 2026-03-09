package matteobenetazzo.safestepbackend.services;

import matteobenetazzo.safestepbackend.entities.Accessibilita;
import matteobenetazzo.safestepbackend.entities.Caratteristica;
import matteobenetazzo.safestepbackend.entities.Struttura;
import matteobenetazzo.safestepbackend.exceptions.NotFoundException;
import matteobenetazzo.safestepbackend.payloads.AccessibilitaCreateDTO;
import matteobenetazzo.safestepbackend.repositories.AccessibilitaRepository;
import matteobenetazzo.safestepbackend.repositories.CaratteristicaRepository;
import matteobenetazzo.safestepbackend.repositories.StrutturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AccessibilitaService {

    @Autowired
    private AccessibilitaRepository accessibilitaRepository;

    @Autowired
    private StrutturaRepository strutturaRepository;

    @Autowired
    private CaratteristicaRepository caratteristicaRepository;

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

    public Accessibilita save(AccessibilitaCreateDTO body) {
        Struttura struttura = this.strutturaRepository.findById(body.strutturaId())
                .orElseThrow(() -> new NotFoundException("Struttura non trovata"));

        Caratteristica caratteristica = this.caratteristicaRepository.findById(body.caratteristicaId())
                .orElseThrow(() -> new NotFoundException("Caratteristica non trovata"));

        boolean esisteGia = this.accessibilitaRepository
                .existsByStruttura_IdStrutturaAndCaratteristica_IdCaratteristiche(
                        body.strutturaId(),
                        body.caratteristicaId()
                );

        if (esisteGia) {
            throw new IllegalArgumentException("Questa caratteristica esiste gia per la struttura");
        }

        Accessibilita nuovaAccessibilita = new Accessibilita(
                struttura,
                caratteristica,
                body.valore(),
                body.nota()
        );

        return this.accessibilitaRepository.save(nuovaAccessibilita);
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