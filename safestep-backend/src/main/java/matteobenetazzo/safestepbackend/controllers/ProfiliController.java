package matteobenetazzo.safestepbackend.controllers;

import matteobenetazzo.safestepbackend.entities.Profilo;
import matteobenetazzo.safestepbackend.services.ProfiliService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/profili")
public class ProfiliController {

    @Autowired
    private ProfiliService profiliService;

    @GetMapping
    public List<Profilo> findAll() {
        return this.profiliService.findAll();
    }

    @GetMapping("/{id}")
    public Profilo findById(@PathVariable UUID id) {
        return this.profiliService.findById(id);
    }

    @GetMapping("/utente/{idUtente}")
    public Profilo findByUtente(@PathVariable UUID idUtente) {
        return this.profiliService.findByUtente(idUtente);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Profilo create(@RequestBody Profilo body) {
        return this.profiliService.save(body);
    }

    @PutMapping("/{id}")
    public Profilo update(@PathVariable UUID id, @RequestBody Profilo body) {
        return this.profiliService.findByIdAndUpdate(id, body);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        this.profiliService.findByIdAndDelete(id);
    }
}
