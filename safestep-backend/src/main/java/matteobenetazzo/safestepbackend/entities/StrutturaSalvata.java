package matteobenetazzo.safestepbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "strutture_salvate",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_salvate_utente_struttura",
                        columnNames = {"utente_id", "struttura_id"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = {"utente", "struttura"})
public class StrutturaSalvata {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
    @Column(name = "id_struttura_salvata", nullable = false)
    private UUID idStrutturaSalvata;

    @ManyToOne
    @JoinColumn(name = "utente_id", nullable = false)
    @JsonIgnoreProperties({"passwordHash", "profilo", "recensioni", "preferenze", "struttureSalvate", "struttureCreate"})
    private Utente utente;

    @ManyToOne
    @JoinColumn(name = "struttura_id", nullable = false)
    @JsonIgnoreProperties({"recensioni", "accessibilita", "salvateDaUtenti", "immagini", "creataDa"})
    private Struttura struttura;

    @Column(name = "data_creazione", nullable = false)
    @Setter(AccessLevel.NONE)
    private LocalDateTime dataCreazione;

    public StrutturaSalvata(Utente utente, Struttura struttura) {
        this.utente = utente;
        this.struttura = struttura;
        this.dataCreazione = LocalDateTime.now();
    }
}