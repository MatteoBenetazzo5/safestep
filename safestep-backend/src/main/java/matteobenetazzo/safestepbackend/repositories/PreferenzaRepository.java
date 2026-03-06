package matteobenetazzo.safestepbackend.repositories;

import matteobenetazzo.safestepbackend.entities.Preferenza;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PreferenzaRepository extends JpaRepository<Preferenza, UUID> {

    List<Preferenza> findByUtente_IdUtente(UUID idUtente);

    boolean existsByUtente_IdUtenteAndCaratteristica_IdCaratteristiche(UUID idUtente, UUID idCaratteristica);
}
