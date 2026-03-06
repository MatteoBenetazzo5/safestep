package matteobenetazzo.safestepbackend.tools;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import matteobenetazzo.safestepbackend.entities.Utente;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTool {

    private final SecretKey secretKey;

    public JwtTool(@Value("${jwt.secret}") String secret) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String createToken(Utente utente) {
        return Jwts.builder()
                .subject(utente.getIdUtente().toString())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 7))
                .claim("email", utente.getEmail())
                .claim("ruolo", utente.getRuolo())
                .signWith(this.secretKey)
                .compact();
    }
}