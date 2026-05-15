package matteobenetazzo.safestepbackend.services;

import matteobenetazzo.safestepbackend.entities.Struttura;
import matteobenetazzo.safestepbackend.entities.Utente;
import matteobenetazzo.safestepbackend.exceptions.NotFoundException;
import matteobenetazzo.safestepbackend.payloads.StrutturaCreateDTO;
import matteobenetazzo.safestepbackend.payloads.StrutturaUpdateDTO;
import matteobenetazzo.safestepbackend.repositories.*;
import matteobenetazzo.safestepbackend.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class StruttureService {

    @Autowired
    private StrutturaRepository strutturaRepository;

    @Autowired
    private UtentiService utentiService;

    @Autowired
    private AccessibilitaRepository accessibilitaRepository;

    @Autowired
    private ImmagineStrutturaRepository immagineStrutturaRepository;

    @Autowired
    private StrutturaSalvataRepository strutturaSalvataRepository;

    @Autowired
    private RecensioneRepository recensioneRepository;

    @Autowired
    private SecurityUtils securityUtils;

    public List<Struttura> findAll() {
        if (this.securityUtils.isAdmin()) {
            return this.strutturaRepository.findAll();
        }

        return this.strutturaRepository.findByStato("APPROVATA");
    }

    public Struttura findById(UUID idStruttura) {
        Struttura found = this.strutturaRepository.findById(idStruttura)
                .orElseThrow(() -> new NotFoundException("Struttura con id " + idStruttura + " non trovata"));

        if (!"APPROVATA".equals(found.getStato()) && !this.securityUtils.isAdmin()) {
            throw new AccessDeniedException("Struttura non disponibile");
        }

        return found;
    }

    public List<Struttura> findByCategoria(String categoria) {
        List<Struttura> strutture = this.strutturaRepository.findByCategoria(categoria);

        if (this.securityUtils.isAdmin()) {
            return strutture;
        }

        return strutture.stream()
                .filter(struttura -> "APPROVATA".equals(struttura.getStato()))
                .toList();
    }

    public List<Struttura> findByStato(String stato) {
        this.securityUtils.checkAdmin();
        return this.strutturaRepository.findByStato(stato);
    }

    public List<Struttura> findByCreatore(UUID idUtente) {
        Utente utente = this.utentiService.findById(idUtente);
        this.securityUtils.checkOwnerOrAdmin(utente);

        return this.strutturaRepository.findByCreataDa_IdUtente(idUtente);
    }

    public Struttura save(StrutturaCreateDTO body) {
        if (this.strutturaRepository.existsByNomeAndIndirizzo(body.nome(), body.indirizzo())) {
            throw new IllegalArgumentException("Esiste gia una struttura con questo nome e indirizzo");
        }

        Utente creatore = this.securityUtils.getCurrentAuthenticatedUser();

        Struttura nuovaStruttura = new Struttura(
                body.categoria(),
                body.nome(),
                body.descrizione(),
                body.indirizzo(),
                body.citta(),
                body.paese(),
                body.telefono(),
                body.sitoWeb(),
                body.immagineCopertina(),
                body.stato(),
                creatore
        );

        nuovaStruttura.setLatitudine(body.latitudine());
        nuovaStruttura.setLongitudine(body.longitudine());

        return this.strutturaRepository.save(nuovaStruttura);
    }

    public Struttura findByIdAndUpdate(UUID idStruttura, StrutturaUpdateDTO body) {
        Struttura found = this.findById(idStruttura);

        found.setCategoria(body.categoria());
        found.setNome(body.nome());
        found.setDescrizione(body.descrizione());
        found.setIndirizzo(body.indirizzo());
        found.setCitta(body.citta());
        found.setPaese(body.paese());
        found.setTelefono(body.telefono());
        found.setSitoWeb(body.sitoWeb());
        found.setImmagineCopertina(body.immagineCopertina());
        found.setLatitudine(body.latitudine());
        found.setLongitudine(body.longitudine());
        found.setStato(body.stato());

        return this.strutturaRepository.save(found);
    }

    @Transactional
    public void findByIdAndDelete(UUID idStruttura) {
        Struttura found = this.findById(idStruttura);

        this.accessibilitaRepository.deleteByStruttura_IdStruttura(idStruttura);
        this.immagineStrutturaRepository.deleteByStruttura_IdStruttura(idStruttura);
        this.strutturaSalvataRepository.deleteByStruttura_IdStruttura(idStruttura);
        this.recensioneRepository.deleteByStruttura_IdStruttura(idStruttura);

        this.strutturaRepository.delete(found);
    }
}
