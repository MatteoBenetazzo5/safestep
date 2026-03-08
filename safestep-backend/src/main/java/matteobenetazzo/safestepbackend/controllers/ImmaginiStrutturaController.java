package matteobenetazzo.safestepbackend.controllers;

import matteobenetazzo.safestepbackend.entities.ImmagineStruttura;
import matteobenetazzo.safestepbackend.services.ImmaginiStrutturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/immagini-struttura")
public class ImmaginiStrutturaController {

    @Autowired
    private ImmaginiStrutturaService immaginiStrutturaService;

    @GetMapping
    public List<ImmagineStruttura> findAll() {
        return this.immaginiStrutturaService.findAll();
    }

    @GetMapping("/{id}")
    public ImmagineStruttura findById(@PathVariable UUID id) {
        return this.immaginiStrutturaService.findById(id);
    }

    @GetMapping("/struttura/{idStruttura}")
    public List<ImmagineStruttura> findByStruttura(@PathVariable UUID idStruttura) {
        return this.immaginiStrutturaService.findByStruttura(idStruttura);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ImmagineStruttura create(@RequestBody ImmagineStruttura body) {
        return this.immaginiStrutturaService.save(body);
    }

    @PutMapping("/{id}")
    public ImmagineStruttura update(@PathVariable UUID id, @RequestBody ImmagineStruttura body) {
        return this.immaginiStrutturaService.findByIdAndUpdate(id, body);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        this.immaginiStrutturaService.findByIdAndDelete(id);
    }
}
