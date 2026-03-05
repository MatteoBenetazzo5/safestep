package matteobenetazzo.safestepbackend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "utenti")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = {"profilo", "recensioni", "preferenze", "struttureSalvate", "struttureCreate"})
public class Utente {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
    @Column(name = "id_utente", nullable = false)
    private UUID idUtente;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "nome_visualizzato", nullable = false)
    private String nomeVisualizzato;

    private String telefono;

    @Column(columnDefinition = "text")
    private String avatar;

    @Column(nullable = false)
    private String ruolo;

    @Column(name = "data_creazione", nullable = false)
    @Setter(AccessLevel.NONE)
    private LocalDateTime dataCreazione;

    @Column(name = "data_aggiornamento")
    private LocalDateTime dataAggiornamento;

    // RELAZIONI
    @OneToOne(mappedBy = "utente")
    private Profilo profilo;

    @OneToMany(mappedBy = "utente")
    private List<Recensione> recensioni;

    @OneToMany(mappedBy = "utente")
    private List<Preferenza> preferenze;

    @OneToMany(mappedBy = "utente")
    private List<StrutturaSalvata> struttureSalvate;

    @OneToMany(mappedBy = "creataDa")
    private List<Struttura> struttureCreate;

    public Utente(String email,
                  String passwordHash,
                  String nomeVisualizzato,
                  String telefono,
                  String avatar,
                  String ruolo) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.nomeVisualizzato = nomeVisualizzato;
        this.telefono = telefono;
        this.avatar = avatar;
        this.ruolo = ruolo;
        this.dataCreazione = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        this.dataAggiornamento = LocalDateTime.now();
    }
}