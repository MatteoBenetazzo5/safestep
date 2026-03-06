package matteobenetazzo.safestepbackend.repositories;

import matteobenetazzo.safestepbackend.entities.Accessibilita;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AccessibilitaRepository extends JpaRepository<Accessibilita, UUID> {

    List<Accessibilita> findByStruttura_IdStruttura(UUID idStruttura);

    boolean existsByStruttura_IdStrutturaAndCaratteristica_IdCaratteristiche(UUID idStruttura, UUID idCaratteristica);
}
