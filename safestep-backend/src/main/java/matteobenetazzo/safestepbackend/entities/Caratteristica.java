package matteobenetazzo.safestepbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "caratteristiche")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = {"accessibilita", "preferenze"})
public class Caratteristica {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
    @Column(name = "id_caratteristiche", nullable = false)
    private UUID idCaratteristiche;

    @Column(nullable = false, unique = true)
    private String codice;

    @Column(nullable = false)
    private String etichetta;

    @Column(name = "data_creazione", nullable = false)
    @Setter(AccessLevel.NONE)
    private LocalDateTime dataCreazione;

    @OneToMany(mappedBy = "caratteristica")
    @JsonIgnoreProperties({"caratteristica", "struttura"})
    private List<Accessibilita> accessibilita;

    @OneToMany(mappedBy = "caratteristica")
    @JsonIgnoreProperties({"caratteristica", "utente"})
    private List<Preferenza> preferenze;

    public Caratteristica(String codice, String etichetta) {
        this.codice = codice;
        this.etichetta = etichetta;
        this.dataCreazione = LocalDateTime.now();
    }
}