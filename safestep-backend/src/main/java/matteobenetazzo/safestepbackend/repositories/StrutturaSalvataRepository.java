package matteobenetazzo.safestepbackend.repositories;

import matteobenetazzo.safestepbackend.entities.StrutturaSalvata;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface StrutturaSalvataRepository extends JpaRepository<StrutturaSalvata, UUID> {

    List<StrutturaSalvata> findByUtente_IdUtente(UUID idUtente);

    boolean existsByUtente_IdUtenteAndStruttura_IdStruttura(UUID idUtente, UUID idStruttura);

    void deleteByUtente_IdUtenteAndStruttura_IdStruttura(UUID idUtente, UUID idStruttura);

    void deleteByStruttura_IdStruttura(UUID idStruttura);
}
