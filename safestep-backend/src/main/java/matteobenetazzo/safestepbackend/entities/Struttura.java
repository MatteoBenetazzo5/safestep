package matteobenetazzo.safestepbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "strutture")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = {"recensioni", "accessibilita", "salvateDaUtenti", "creataDa", "immagini"})
public class Struttura {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
    @Column(name = "id_struttura", nullable = false)
    private UUID idStruttura;

    @Column(nullable = false)
    private String categoria;

    @Column(nullable = false)
    private String nome;

    @Column(columnDefinition = "text")
    private String descrizione;

    private String indirizzo;
    private String citta;
    private String paese;
    private String telefono;

    @Column(name = "sito_web", columnDefinition = "text")
    private String sitoWeb;

    @Column(name = "immagine_copertina", columnDefinition = "text")
    private String immagineCopertina;

    @Column
    private Double latitudine;

    @Column
    private Double longitudine;

    @Column(nullable = false)
    private String stato;

    @ManyToOne
    @JoinColumn(name = "creata_da", nullable = false)
    @JsonIgnoreProperties({"passwordHash", "profilo", "recensioni", "preferenze", "struttureSalvate", "struttureCreate"})
    private Utente creataDa;

    @Column(name = "data_creazione", nullable = false)
    @Setter(AccessLevel.NONE)
    private LocalDateTime dataCreazione;

    @Column(name = "data_aggiornamento")
    private LocalDateTime dataAggiornamento;

    @OneToMany(mappedBy = "struttura")
    @JsonIgnoreProperties({"struttura", "utente"})
    private List<Recensione> recensioni;

    @OneToMany(mappedBy = "struttura")
    @JsonIgnoreProperties({"struttura", "caratteristica"})
    private List<Accessibilita> accessibilita;

    @OneToMany(mappedBy = "struttura")
    @JsonIgnoreProperties({"struttura", "utente"})
    private List<StrutturaSalvata> salvateDaUtenti;

    @OneToMany(mappedBy = "struttura")
    @JsonIgnoreProperties({"struttura"})
    private List<ImmagineStruttura> immagini;

    public Struttura(String categoria,
                     String nome,
                     String descrizione,
                     String indirizzo,
                     String citta,
                     String paese,
                     String telefono,
                     String sitoWeb,
                     String immagineCopertina,
                     String stato,
                     Utente creataDa) {
        this.categoria = categoria;
        this.nome = nome;
        this.descrizione = descrizione;
        this.indirizzo = indirizzo;
        this.citta = citta;
        this.paese = paese;
        this.telefono = telefono;
        this.sitoWeb = sitoWeb;
        this.immagineCopertina = immagineCopertina;
        this.stato = stato;
        this.creataDa = creataDa;
        this.dataCreazione = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        this.dataAggiornamento = LocalDateTime.now();
    }
}
