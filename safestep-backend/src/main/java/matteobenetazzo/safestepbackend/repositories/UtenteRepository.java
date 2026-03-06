package matteobenetazzo.safestepbackend.repositories;

import matteobenetazzo.safestepbackend.entities.Utente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UtenteRepository extends JpaRepository<Utente, UUID> {

    boolean existsByEmail(String email);

    Optional<Utente> findByEmail(String email);

    List<Utente> findByRuolo(String ruolo);
}