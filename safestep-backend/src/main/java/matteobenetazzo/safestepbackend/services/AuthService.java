package matteobenetazzo.safestepbackend.services;

import matteobenetazzo.safestepbackend.entities.Utente;
import matteobenetazzo.safestepbackend.payloads.LoginDTO;
import matteobenetazzo.safestepbackend.payloads.LoginResponseDTO;
import matteobenetazzo.safestepbackend.payloads.RegisterDTO;
import matteobenetazzo.safestepbackend.repositories.UtenteRepository;
import matteobenetazzo.safestepbackend.tools.JwtTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UtenteRepository utenteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTool jwtTool;

    public Utente register(RegisterDTO body) {
        if (this.utenteRepository.existsByEmail(body.email())) {
            throw new IllegalArgumentException("Email gia in uso");
        }

        Utente nuovoUtente = new Utente(
                body.email(),
                this.passwordEncoder.encode(body.password()),
                body.nomeVisualizzato(),
                body.telefono(),
                body.avatar(),
                "USER"
        );

        return this.utenteRepository.save(nuovoUtente);
    }

    public LoginResponseDTO login(LoginDTO body) {

        Utente found = this.utenteRepository.findByEmail(body.email())
                .orElseThrow(() -> new IllegalArgumentException("Credenziali non valide"));

        boolean passwordMatches = this.passwordEncoder.matches(body.password(), found.getPasswordHash());

        if (!passwordMatches) {
            throw new IllegalArgumentException("Credenziali non valide");
        }

        String token = this.jwtTool.createToken(found);

        return new LoginResponseDTO(
                token,
                found.getIdUtente(),
                found.getEmail(),
                found.getNomeVisualizzato(),
                found.getRuolo()
        );
    }
}
