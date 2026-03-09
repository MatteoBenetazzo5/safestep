package matteobenetazzo.safestepbackend.controllers;

import jakarta.validation.Valid;
import matteobenetazzo.safestepbackend.entities.Recensione;
import matteobenetazzo.safestepbackend.payloads.RecensioneCreateDTO;
import matteobenetazzo.safestepbackend.payloads.RecensioneUpdateDTO;
import matteobenetazzo.safestepbackend.services.RecensioniService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/recensioni")
public class RecensioniController {

    @Autowired
    private RecensioniService recensioniService;

    @GetMapping
    public List<Recensione> findAll() {
        return this.recensioniService.findAll();
    }

    @GetMapping("/{id}")
    public Recensione findById(@PathVariable UUID id) {
        return this.recensioniService.findById(id);
    }

    @GetMapping("/struttura/{idStruttura}")
    public List<Recensione> findByStruttura(@PathVariable UUID idStruttura) {
        return this.recensioniService.findByStruttura(idStruttura);
    }

    @GetMapping("/utente/{idUtente}")
    public List<Recensione> findByUtente(@PathVariable UUID idUtente) {
        return this.recensioniService.findByUtente(idUtente);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Recensione create(@RequestBody @Valid RecensioneCreateDTO body) {
        return this.recensioniService.save(body);
    }

    @PutMapping("/{id}")
    public Recensione update(@PathVariable UUID id, @RequestBody @Valid RecensioneUpdateDTO body) {
        return this.recensioniService.findByIdAndUpdate(id, body);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        this.recensioniService.findByIdAndDelete(id);
    }
}
