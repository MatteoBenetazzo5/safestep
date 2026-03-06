package matteobenetazzo.safestepbackend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "profili")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = {"utente"})
public class Profilo {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
    @Column(name = "id_profilo", nullable = false)
    private UUID idProfilo;

    @OneToOne
    @JoinColumn(name = "utente_id", nullable = false, unique = true)
    private Utente utente;

    @Column(name = "tipo_mobilita", nullable = false)
    private String tipoMobilita;

    @Column(columnDefinition = "text")
    private String note;

    @Column(name = "colore_tema")
    private String coloreTema;

    @Column(name = "data_creazione", nullable = false)
    @Setter(AccessLevel.NONE)
    private LocalDateTime dataCreazione;

    @Column(name = "data_aggiornamento")
    private LocalDateTime dataAggiornamento;
    
    public Profilo(Utente utente, String tipoMobilita, String note) {
        this.utente = utente;
        this.tipoMobilita = tipoMobilita;
        this.note = note;
        this.dataCreazione = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        this.dataAggiornamento = LocalDateTime.now();
    }
}
