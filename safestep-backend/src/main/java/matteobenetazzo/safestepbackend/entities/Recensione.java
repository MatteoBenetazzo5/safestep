package matteobenetazzo.safestepbackend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "recensioni",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_recensione_utente_struttura",
                        columnNames = {"utente_id", "struttura_id"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = {"struttura", "utente"})
public class Recensione {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
    @Column(name = "id_recensione", nullable = false)
    private UUID idRecensione;

    @ManyToOne
    @JoinColumn(name = "struttura_id", nullable = false)
    private Struttura struttura;

    @ManyToOne
    @JoinColumn(name = "utente_id", nullable = false)
    private Utente utente;

    @Column(nullable = false)
    private int voto;

    @Column(columnDefinition = "text", nullable = false)
    private String testo;

    @Column(name = "data_creazione", nullable = false)
    @Setter(AccessLevel.NONE)
    private LocalDateTime dataCreazione;

    @Column(name = "data_aggiornamento")
    private LocalDateTime dataAggiornamento;

    public Recensione(Struttura struttura, Utente utente, int voto, String testo) {
        this.struttura = struttura;
        this.utente = utente;
        this.voto = voto;
        this.testo = testo;
        this.dataCreazione = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        this.dataAggiornamento = LocalDateTime.now();
    }
}
