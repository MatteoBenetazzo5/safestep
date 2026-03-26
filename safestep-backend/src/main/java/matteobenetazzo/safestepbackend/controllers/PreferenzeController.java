package matteobenetazzo.safestepbackend.controllers;

import jakarta.validation.Valid;
import matteobenetazzo.safestepbackend.entities.Preferenza;
import matteobenetazzo.safestepbackend.payloads.PreferenzaCreateDTO;
import matteobenetazzo.safestepbackend.services.PreferenzeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/preferenze")
public class PreferenzeController {

    @Autowired
    private PreferenzeService preferenzeService;

    @GetMapping
    public List<Preferenza> findAll() {
        return this.preferenzeService.findAll();
    }

    @GetMapping("/{id}")
    public Preferenza findById(@PathVariable UUID id) {
        return this.preferenzeService.findById(id);
    }

    @GetMapping("/utente/{idUtente}")
    public List<Preferenza> findByUtente(@PathVariable UUID idUtente) {
        return this.preferenzeService.findByUtente(idUtente);
    }

    @GetMapping("/mie")
    public List<Preferenza> findMine() {
        return this.preferenzeService.findMine();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Preferenza create(@RequestBody @Valid PreferenzaCreateDTO body) {
        return this.preferenzeService.save(body);
    }

    @PutMapping("/{id}")
    public Preferenza update(@PathVariable UUID id, @RequestBody Preferenza body) {
        return this.preferenzeService.findByIdAndUpdate(id, body);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        this.preferenzeService.findByIdAndDelete(id);
    }
}
