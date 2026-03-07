package matteobenetazzo.safestepbackend.controllers;

import matteobenetazzo.safestepbackend.entities.Struttura;
import matteobenetazzo.safestepbackend.services.StruttureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/strutture")
public class StruttureController {

    @Autowired
    private StruttureService struttureService;

    @GetMapping
    public List<Struttura> findAll() {
        return this.struttureService.findAll();
    }

    @GetMapping("/{id}")
    public Struttura findById(@PathVariable UUID id) {
        return this.struttureService.findById(id);
    }

    @GetMapping("/categoria/{categoria}")
    public List<Struttura> findByCategoria(@PathVariable String categoria) {
        return this.struttureService.findByCategoria(categoria);
    }

    @GetMapping("/stato/{stato}")
    public List<Struttura> findByStato(@PathVariable String stato) {
        return this.struttureService.findByStato(stato);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Struttura create(@RequestBody Struttura body) {
        return this.struttureService.save(body);
    }

    @PutMapping("/{id}")
    public Struttura update(@PathVariable UUID id, @RequestBody Struttura body) {
        return this.struttureService.findByIdAndUpdate(id, body);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        this.struttureService.findByIdAndDelete(id);
    }
}