package matteobenetazzo.safestepbackend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "preferenze",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_preferenze_utente_caratteristica",
                        columnNames = {"utente_id", "caratteristica_id"})
        }
)
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = {"utente", "caratteristica"})
public class Preferenza {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
    @Column(name = "id_preferenza", nullable = false)
    private UUID idPreferenza;

    @ManyToOne
    @JoinColumn(name = "utente_id", nullable = false)
    private Utente utente;

    @ManyToOne
    @JoinColumn(name = "caratteristica_id", nullable = false)
    private Caratteristica caratteristica;

    @Column(name = "livello_preferenza", nullable = false)
    private String livelloPreferenza;

    @Column(name = "data_creazione", nullable = false)
    @Setter(AccessLevel.NONE)
    private LocalDateTime dataCreazione;

    public Preferenza(Utente utente, Caratteristica caratteristica, String livelloPreferenza) {
        this.utente = utente;
        this.caratteristica = caratteristica;
        this.livelloPreferenza = livelloPreferenza;
        this.dataCreazione = LocalDateTime.now();
    }
}
