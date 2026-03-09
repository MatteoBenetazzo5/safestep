package matteobenetazzo.safestepbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "accessibilita",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_accessibilita_struttura_caratteristica",
                        columnNames = {"struttura_id", "caratteristica_id"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = {"struttura", "caratteristica"})
public class Accessibilita {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
    @Column(name = "id_accessibilita", nullable = false)
    private UUID idAccessibilita;

    @ManyToOne
    @JoinColumn(name = "struttura_id", nullable = false)
    @JsonIgnoreProperties({"recensioni", "accessibilita", "salvateDaUtenti", "immagini", "creataDa"})
    private Struttura struttura;

    @ManyToOne
    @JoinColumn(name = "caratteristica_id", nullable = false)
    @JsonIgnoreProperties({"accessibilita", "preferenze"})
    private Caratteristica caratteristica;

    @Column(nullable = false)
    private String valore;

    @Column(columnDefinition = "text")
    private String nota;

    @Column(name = "data_aggiornamento")
    private LocalDateTime dataAggiornamento;

    public Accessibilita(Struttura struttura, Caratteristica caratteristica, String valore, String nota) {
        this.struttura = struttura;
        this.caratteristica = caratteristica;
        this.valore = valore;
        this.nota = nota;
        this.dataAggiornamento = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        this.dataAggiornamento = LocalDateTime.now();
    }
}
