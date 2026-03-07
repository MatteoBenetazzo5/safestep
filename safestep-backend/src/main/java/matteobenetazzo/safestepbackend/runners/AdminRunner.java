package matteobenetazzo.safestepbackend.runners;

import matteobenetazzo.safestepbackend.entities.Utente;
import matteobenetazzo.safestepbackend.repositories.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminRunner implements CommandLineRunner {

    @Autowired
    private UtenteRepository utenteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${EMAIL_ADMIN}")
    private String emailAdmin;

    @Value("${PASSWORD_ADMIN}")
    private String passwordAdmin;

    @Value("${NOME_ADMIN}")
    private String nomeAdmin;

    @Value("${COGNOME_ADMIN}")
    private String cognomeAdmin;

    @Override
    public void run(String... args) throws Exception {
        boolean adminEsisteGia = this.utenteRepository.existsByEmail(emailAdmin);

        if (!adminEsisteGia) {
            Utente admin = new Utente(
                    emailAdmin,
                    this.passwordEncoder.encode(passwordAdmin),
                    nomeAdmin + " " + cognomeAdmin,
                    null,
                    null,
                    "ADMIN"
            );

            this.utenteRepository.save(admin);
            System.out.println("Admin creato con successo");
        } else {
            System.out.println("Admin gia presente nel database");
        }
    }
}
