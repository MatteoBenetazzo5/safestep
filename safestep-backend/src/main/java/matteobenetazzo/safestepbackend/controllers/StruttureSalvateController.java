package matteobenetazzo.safestepbackend.controllers;

import jakarta.validation.Valid;
import matteobenetazzo.safestepbackend.entities.StrutturaSalvata;
import matteobenetazzo.safestepbackend.payloads.StrutturaSalvataCreateDTO;
import matteobenetazzo.safestepbackend.services.StruttureSalvateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/strutture-salvate")
public class StruttureSalvateController {

    @Autowired
    private StruttureSalvateService struttureSalvateService;

    @GetMapping
    public List<StrutturaSalvata> findAll() {
        return this.struttureSalvateService.findAll();
    }

    @GetMapping("/{id}")
    public StrutturaSalvata findById(@PathVariable UUID id) {
        return this.struttureSalvateService.findById(id);
    }

    @GetMapping("/utente/{idUtente}")
    public List<StrutturaSalvata> findByUtente(@PathVariable UUID idUtente) {
        return this.struttureSalvateService.findByUtente(idUtente);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public StrutturaSalvata create(@RequestBody @Valid StrutturaSalvataCreateDTO body) {
        return this.struttureSalvateService.save(body);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        this.struttureSalvateService.findByIdAndDelete(id);
    }

    @DeleteMapping("/utente/{idUtente}/struttura/{idStruttura}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeByUtenteAndStruttura(@PathVariable UUID idUtente, @PathVariable UUID idStruttura) {
        this.struttureSalvateService.removeByUtenteAndStruttura(idUtente, idStruttura);
    }
}