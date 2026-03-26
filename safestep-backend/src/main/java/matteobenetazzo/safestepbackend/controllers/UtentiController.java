package matteobenetazzo.safestepbackend.controllers;

import jakarta.validation.Valid;
import matteobenetazzo.safestepbackend.entities.Utente;
import matteobenetazzo.safestepbackend.payloads.UtenteUpdateDTO;
import matteobenetazzo.safestepbackend.services.UtentiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/utenti")
public class UtentiController {

    @Autowired
    private UtentiService utentiService;

    @GetMapping
    public List<Utente> findAll() {
        return this.utentiService.findAll();
    }

    @GetMapping("/{id}")
    public Utente findById(@PathVariable UUID id) {
        return this.utentiService.findById(id);
    }

    @GetMapping("/me")
    public Utente findMe() {
        return this.utentiService.findMe();
    }

    @PutMapping("/{id}")
    public Utente update(@PathVariable UUID id, @RequestBody @Valid UtenteUpdateDTO body) {
        return this.utentiService.findByIdAndUpdate(id, body);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        this.utentiService.findByIdAndDelete(id);
    }
}
