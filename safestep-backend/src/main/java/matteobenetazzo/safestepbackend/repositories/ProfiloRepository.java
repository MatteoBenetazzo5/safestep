package matteobenetazzo.safestepbackend.repositories;

import matteobenetazzo.safestepbackend.entities.Profilo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ProfiloRepository extends JpaRepository<Profilo, UUID> {

    Optional<Profilo> findByUtente_IdUtente(UUID idUtente);

    boolean existsByUtente_IdUtente(UUID idUtente);
}