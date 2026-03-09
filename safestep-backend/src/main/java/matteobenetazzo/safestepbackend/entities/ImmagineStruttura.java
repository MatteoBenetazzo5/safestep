package matteobenetazzo.safestepbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "immagini_struttura")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = "struttura")
public class ImmagineStruttura {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
    @Column(name = "id_immagine_struttura", nullable = false)
    private UUID idImmagineStruttura;

    @ManyToOne
    @JoinColumn(name = "struttura_id", nullable = false)
    @JsonIgnoreProperties({"recensioni", "accessibilita", "salvateDaUtenti", "immagini", "creataDa"})
    private Struttura struttura;

    @Column(nullable = false, columnDefinition = "text")
    private String url;

    @Column(name = "ordine_visualizzazione")
    private int ordineVisualizzazione;

    @Column(nullable = false)
    private boolean copertina;

    @Column(name = "data_creazione", nullable = false)
    private LocalDateTime dataCreazione;

    public ImmagineStruttura(Struttura struttura, String url, int ordineVisualizzazione, boolean copertina) {
        this.struttura = struttura;
        this.url = url;
        this.ordineVisualizzazione = ordineVisualizzazione;
        this.copertina = copertina;
        this.dataCreazione = LocalDateTime.now();
    }
}