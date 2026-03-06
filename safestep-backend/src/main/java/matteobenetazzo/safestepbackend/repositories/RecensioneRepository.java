package matteobenetazzo.safestepbackend.repositories;

import matteobenetazzo.safestepbackend.entities.Recensione;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RecensioneRepository extends JpaRepository<Recensione, UUID> {

    List<Recensione> findByStruttura_IdStruttura(UUID idStruttura);

    List<Recensione> findByUtente_IdUtente(UUID idUtente);

    boolean existsByUtente_IdUtenteAndStruttura_IdStruttura(UUID idUtente, UUID idStruttura);
}
