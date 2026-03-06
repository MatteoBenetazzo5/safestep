package matteobenetazzo.safestepbackend.repositories;

import matteobenetazzo.safestepbackend.entities.Struttura;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface StrutturaRepository extends JpaRepository<Struttura, UUID> {

    List<Struttura> findByStato(String stato);

    List<Struttura> findByCategoria(String categoria);

    List<Struttura> findByCreataDa_IdUtente(UUID idUtente);

    boolean existsByNomeAndIndirizzo(String nome, String indirizzo);
}
