package matteobenetazzo.safestepbackend.repositories;

import matteobenetazzo.safestepbackend.entities.ImmagineStruttura;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ImmagineStrutturaRepository extends JpaRepository<ImmagineStruttura, UUID> {

    List<ImmagineStruttura> findByStruttura_IdStruttura(UUID idStruttura);

    void deleteByStruttura_IdStruttura(UUID idStruttura);
}
