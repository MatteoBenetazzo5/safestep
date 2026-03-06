package matteobenetazzo.safestepbackend.repositories;

import matteobenetazzo.safestepbackend.entities.Caratteristica;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CaratteristicaRepository extends JpaRepository<Caratteristica, UUID> {

    boolean existsByCodice(String codice);

    Optional<Caratteristica> findByCodice(String codice);
}
