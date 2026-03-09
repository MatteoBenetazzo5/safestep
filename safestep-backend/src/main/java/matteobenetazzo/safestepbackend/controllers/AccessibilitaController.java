package matteobenetazzo.safestepbackend.controllers;

import jakarta.validation.Valid;
import matteobenetazzo.safestepbackend.entities.Accessibilita;
import matteobenetazzo.safestepbackend.payloads.AccessibilitaCreateDTO;
import matteobenetazzo.safestepbackend.services.AccessibilitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/accessibilita")
public class AccessibilitaController {

    @Autowired
    private AccessibilitaService accessibilitaService;

    @GetMapping
    public List<Accessibilita> findAll() {
        return this.accessibilitaService.findAll();
    }

    @GetMapping("/struttura/{idStruttura}")
    public List<Accessibilita> findByStruttura(@PathVariable UUID idStruttura) {
        return this.accessibilitaService.findByStruttura(idStruttura);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Accessibilita create(@RequestBody @Valid AccessibilitaCreateDTO body) {
        return this.accessibilitaService.save(body);
    }

    @PutMapping("/{id}")
    public Accessibilita update(@PathVariable UUID id, @RequestBody Accessibilita body) {
        return this.accessibilitaService.findByIdAndUpdate(id, body);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        this.accessibilitaService.findByIdAndDelete(id);
    }
}
