package matteobenetazzo.safestepbackend.controllers;

import matteobenetazzo.safestepbackend.entities.Caratteristica;
import matteobenetazzo.safestepbackend.services.CaratteristicheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/caratteristiche")
public class CaratteristicheController {

    @Autowired
    private CaratteristicheService caratteristicheService;

    @GetMapping
    public List<Caratteristica> findAll() {
        return this.caratteristicheService.findAll();
    }

    @GetMapping("/{id}")
    public Caratteristica findById(@PathVariable UUID id) {
        return this.caratteristicheService.findById(id);
    }

    @GetMapping("/codice/{codice}")
    public Caratteristica findByCodice(@PathVariable String codice) {
        return this.caratteristicheService.findByCodice(codice);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Caratteristica create(@RequestBody Caratteristica body) {
        return this.caratteristicheService.save(body);
    }

    @PutMapping("/{id}")
    public Caratteristica update(@PathVariable UUID id, @RequestBody Caratteristica body) {
        return this.caratteristicheService.findByIdAndUpdate(id, body);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        this.caratteristicheService.findByIdAndDelete(id);
    }
}
